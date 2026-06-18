import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Pencil, Trash2, ArrowUp, ArrowDown, Target
} from 'lucide-react'
import ReusableModal from '../../components/shared/ReusableModal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import {
  FormField, FormInput, FormActions, FormButton, FormToggle, FormSelect
} from '../../components/shared/ReusableForm'
import EmptyState from '../../components/shared/EmptyState'
import type { Skill } from '../../types'

const categories = [
  'Marketing', 'Design', 'Development', 'Content', 'Other'
]

const iconOptions = [
  'Target', 'BarChart3', 'TrendingUp', 'Share2', 'Calendar',
  'Palette', 'Layout', 'Code2', 'FileCode', 'PenTool',
  'Image', 'Video', 'Search', 'PieChart'
]

export default function SkillsManager() {
  const { cmsData, saveCMS } = useCMSStore()
  const [skills, setSkills] = useState(cmsData.skills)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const filtered = skills.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (skill: Skill) => {
    setSaveStatus('saving')
    const updated = editingSkill
      ? skills.map(s => s.id === skill.id ? skill : s)
      : [...skills, skill]
    setSkills(updated)
    try {
      await saveCMS({ skills: updated })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
      setIsModalOpen(false)
      setEditingSkill(null)
    } catch {
      setSaveStatus('idle')
    }
  }

  const handleDelete = async (id: string) => {
    const updated = skills.filter(s => s.id !== id)
    setSkills(updated)
    await saveCMS({ skills: updated })
    setDeleteConfirm(null)
  }

  const moveSkill = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === skills.length - 1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...skills]
    const [moved] = updated.splice(index, 1)
    updated.splice(newIndex, 0, moved)
    updated.forEach((s, i) => s.sort_order = i + 1)
    setSkills(updated)
    saveCMS({ skills: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your skills and expertise</p>
        </div>
        <button
          onClick={() => { setEditingSkill(null); setIsModalOpen(true) }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={search ? 'No skills match your search.' : 'No skills yet.'}
          actionLabel="Add Skill"
          onAction={() => { setEditingSkill(null); setIsModalOpen(true) }}
        />
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {filtered.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400">{skill.category}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[200px]">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold text-primary w-8 text-right">{skill.level}%</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveSkill(index, 'up')} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowUp className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => moveSkill(index, 'down')} disabled={index === skills.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
                    <ArrowDown className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => { setEditingSkill(skill); setIsModalOpen(true) }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </button>
                  <button onClick={() => setDeleteConfirm(skill.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
        title={editingSkill ? 'Edit Skill' : 'New Skill'}
        size="md"
      >
        <SkillForm
          skill={editingSkill}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
          saveStatus={saveStatus}
        />
      </ReusableModal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        confirmLabel="Delete"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isDestructive
      />
    </div>
  )
}

function SkillForm({ skill, onSave, onCancel, saveStatus }: {
  skill: Skill | null
  onSave: (s: Skill) => void
  onCancel: () => void
  saveStatus: 'idle' | 'saving' | 'saved'
}) {
  const [form, setForm] = useState<Skill>(skill || {
    id: `skill-${Date.now()}`,
    name: '',
    category: 'Marketing',
    icon: 'Target',
    level: 80,
    is_visible: true,
    sort_order: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Name" required>
        <FormInput value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category">
          <FormSelect
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            options={categories.map(c => ({ value: c, label: c }))}
          />
        </FormField>
        <FormField label="Icon">
          <FormSelect
            value={form.icon}
            onChange={e => setForm({ ...form, icon: e.target.value })}
            options={iconOptions.map(i => ({ value: i, label: i }))}
          />
        </FormField>
      </div>
      <FormField label={`Level: ${form.level}%`}>
        <input
          type="range"
          min={0}
          max={100}
          value={form.level}
          onChange={e => setForm({ ...form, level: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </FormField>
      <FormToggle checked={form.is_visible} onChange={v => setForm({ ...form, is_visible: v })} label="Visible" />
      <FormActions>
        <FormButton variant="secondary" type="button" onClick={onCancel}>Cancel</FormButton>
        <FormButton type="submit" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save Skill'}
        </FormButton>
      </FormActions>
    </form>
  )
}
