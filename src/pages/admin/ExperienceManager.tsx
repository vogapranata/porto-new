import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Pencil, Trash2, ArrowUp, ArrowDown, Briefcase
} from 'lucide-react'
import ReusableModal from '../../components/shared/ReusableModal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import {
  FormField, FormInput, FormTextArea, FormActions, FormButton, FormToggle
} from '../../components/shared/ReusableForm'
import EmptyState from '../../components/shared/EmptyState'
import type { Experience } from '../../types'

export default function ExperienceManager() {
  const { cmsData, saveCMS } = useCMSStore()
  const [experiences, setExperiences] = useState(cmsData.experience)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const filtered = experiences.filter(e =>
    e.position.toLowerCase().includes(search.toLowerCase()) ||
    e.company.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (exp: Experience) => {
    setSaveStatus('saving')
    const updated = editingExp
      ? experiences.map(e => e.id === exp.id ? exp : e)
      : [...experiences, exp]
    setExperiences(updated)
    try {
      await saveCMS({ experience: updated })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
      setIsModalOpen(false)
      setEditingExp(null)
    } catch {
      setSaveStatus('idle')
    }
  }

  const handleDelete = async (id: string) => {
    const updated = experiences.filter(e => e.id !== id)
    setExperiences(updated)
    await saveCMS({ experience: updated })
    setDeleteConfirm(null)
  }

  const moveExp = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === experiences.length - 1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...experiences]
    const [moved] = updated.splice(index, 1)
    updated.splice(newIndex, 0, moved)
    updated.forEach((e, i) => e.sort_order = i + 1)
    setExperiences(updated)
    saveCMS({ experience: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experience Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your work experience</p>
        </div>
        <button
          onClick={() => { setEditingExp(null); setIsModalOpen(true) }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search experience..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={search ? 'No results match your search.' : 'No experience entries yet.'}
          actionLabel="Add Experience"
          onAction={() => { setEditingExp(null); setIsModalOpen(true) }}
        />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filtered.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{exp.company} · {exp.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveExp(index, 'up')} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowUp className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => moveExp(index, 'down')} disabled={index === experiences.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowDown className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => { setEditingExp(exp); setIsModalOpen(true) }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => setDeleteConfirm(exp.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
        title={editingExp ? 'Edit Experience' : 'New Experience'}
        size="md"
      >
        <ExperienceForm
          experience={editingExp}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
          saveStatus={saveStatus}
        />
      </ReusableModal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry?"
        confirmLabel="Delete"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isDestructive
      />
    </div>
  )
}

function ExperienceForm({ experience, onSave, onCancel, saveStatus }: {
  experience: Experience | null
  onSave: (e: Experience) => void
  onCancel: () => void
  saveStatus: 'idle' | 'saving' | 'saved'
}) {
  const [form, setForm] = useState<Experience>(experience || {
    id: `exp-${Date.now()}`,
    position: '',
    company: '',
    date: '',
    description: '',
    image_url: '',
    sort_order: 0,
    is_visible: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Position" required>
        <FormInput value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required />
      </FormField>
      <FormField label="Company" required>
        <FormInput value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
      </FormField>
      <FormField label="Date">
        <FormInput value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. 2022 – Present" />
      </FormField>
      <FormField label="Description">
        <FormTextArea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
      </FormField>
      <FormField label="Image URL">
        <FormInput value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
      </FormField>
      <FormToggle checked={form.is_visible} onChange={v => setForm({ ...form, is_visible: v })} label="Visible" />
      <FormActions>
        <FormButton variant="secondary" type="button" onClick={onCancel}>Cancel</FormButton>
        <FormButton type="submit" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save Experience'}
        </FormButton>
      </FormActions>
    </form>
  )
}
