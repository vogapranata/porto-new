import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Eye, EyeOff, Pencil, Trash2, ArrowUp, ArrowDown, Star
} from 'lucide-react'
import ReusableModal from '../../components/shared/ReusableModal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import {
  FormField, FormInput, FormTextArea, FormActions, FormButton, FormToggle
} from '../../components/shared/ReusableForm'
import type { Project } from '../../types'
import EmptyState from '../../components/shared/EmptyState'
import ImageUpload from '../../components/shared/ImageUpload'

export default function ProjectManager() {
  const { cmsData, saveCMS } = useCMSStore()
  const [projects, setProjects] = useState(cmsData.projects)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (project: Project) => {
    setSaveStatus('saving')
    const updated = editingProject
      ? projects.map(p => p.id === project.id ? project : p)
      : [...projects, project]
    setProjects(updated)
    try {
      await saveCMS({ projects: updated })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
      setIsModalOpen(false)
      setEditingProject(null)
    } catch {
      setSaveStatus('idle')
    }
  }

  const handleDelete = async (id: string) => {
    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    await saveCMS({ projects: updated })
    setDeleteConfirm(null)
  }

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === projects.length - 1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...projects]
    const [moved] = updated.splice(index, 1)
    updated.splice(newIndex, 0, moved)
    updated.forEach((p, i) => p.sort_order = i + 1)
    setProjects(updated)
    saveCMS({ projects: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => { setEditingProject(null); setIsModalOpen(true) }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={search ? 'No projects match your search.' : 'No projects yet. Add your first project!'}
          actionLabel="Add Project"
          onAction={() => { setEditingProject(null); setIsModalOpen(true) }}
        />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400 shrink-0">
                  {project.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{project.title}</h3>
                    {project.is_featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" />}
                    {project.is_published ? <Eye className="h-3.5 w-3.5 text-green-500 shrink-0" /> : <EyeOff className="h-3.5 w-3.5 text-gray-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.category} · {project.client} · {project.year}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowUp className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => moveProject(index, 'down')} disabled={index === projects.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowDown className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => { setEditingProject(project); setIsModalOpen(true) }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => setDeleteConfirm(project.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'New Project'}
        size="lg"
      >
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
          saveStatus={saveStatus}
        />
      </ReusableModal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isDestructive
      />
    </div>
  )
}

function ProjectForm({ project, onSave, onCancel, saveStatus }: {
  project: Project | null
  onSave: (p: Project) => void
  onCancel: () => void
  saveStatus: 'idle' | 'saving' | 'saved'
}) {
  const [form, setForm] = useState<Project>(project || {
    id: `proj-${Date.now()}`,
    title: '',
    slug: '',
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    role: '',
    description: '',
    challenge: '',
    solution: '',
    result: '',
    thumbnail_url: '',
    banner_url: '',
    gallery_urls: [],
    tech_stack: [],
    is_featured: false,
    is_published: true,
    sort_order: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Title" required>
          <FormInput value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </FormField>
        <FormField label="Slug" required>
          <FormInput value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} required />
        </FormField>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <FormField label="Category">
          <FormInput value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </FormField>
        <FormField label="Client">
          <FormInput value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
        </FormField>
        <FormField label="Year">
          <FormInput value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        </FormField>
      </div>
      <FormField label="Role">
        <FormInput value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
      </FormField>
      <FormField label="Description">
        <FormTextArea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Challenge">
          <FormTextArea value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} rows={3} />
        </FormField>
        <FormField label="Solution">
          <FormTextArea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} rows={3} />
        </FormField>
      </div>
      <FormField label="Result">
        <FormTextArea value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} rows={3} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Thumbnail">
          <ImageUpload
            value={form.thumbnail_url}
            onChange={(url) => setForm({ ...form, thumbnail_url: url })}
            folder="projects"
            label="Thumbnail"
          />
        </FormField>
        <FormField label="Banner">
          <ImageUpload
            value={form.banner_url}
            onChange={(url) => setForm({ ...form, banner_url: url })}
            folder="projects"
            label="Banner"
          />
        </FormField>
      </div>
      <FormField label="Tech Stack (comma separated)">
        <FormInput
          value={form.tech_stack.join(', ')}
          onChange={e => setForm({ ...form, tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
        />
      </FormField>
      <div className="flex gap-6">
        <FormToggle checked={form.is_featured} onChange={v => setForm({ ...form, is_featured: v })} label="Featured" />
        <FormToggle checked={form.is_published} onChange={v => setForm({ ...form, is_published: v })} label="Published" />
      </div>
      <FormActions>
        <FormButton variant="secondary" type="button" onClick={onCancel}>Cancel</FormButton>
        <FormButton type="submit" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save Project'}
        </FormButton>
      </FormActions>
    </form>
  )
}
