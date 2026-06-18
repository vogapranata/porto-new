import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Eye, EyeOff, Pencil, Trash2
} from 'lucide-react'
import ReusableModal from '../../components/shared/ReusableModal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'
import {
  FormField, FormInput, FormActions, FormButton, FormToggle
} from '../../components/shared/ReusableForm'
import EmptyState from '../../components/shared/EmptyState'
import type { GalleryItem } from '../../types'
import ImagePreview from '../../components/shared/ImagePreview'
import ImageUpload from '../../components/shared/ImageUpload'

export default function GalleryManager() {
  const { cmsData, saveCMS } = useCMSStore()
  const [gallery, setGallery] = useState(cmsData.gallery)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const filtered = gallery.filter(g =>
    g.caption.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (item: GalleryItem) => {
    setSaveStatus('saving')
    const updated = editingItem
      ? gallery.map(g => g.id === item.id ? item : g)
      : [...gallery, item]
    setGallery(updated)
    try {
      await saveCMS({ gallery: updated })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
      setIsModalOpen(false)
      setEditingItem(null)
    } catch {
      setSaveStatus('idle')
    }
  }

  const handleDelete = async (id: string) => {
    const updated = gallery.filter(g => g.id !== id)
    setGallery(updated)
    await saveCMS({ gallery: updated })
    setDeleteConfirm(null)
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your gallery images</p>
        </div>
        <button
          onClick={() => { setEditingItem(null); setIsModalOpen(true) }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Image
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          message={search ? 'No images match your search.' : 'No gallery images yet.'}
          actionLabel="Add Image"
          onAction={() => { setEditingItem(null); setIsModalOpen(true) }}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 transition-all"
              >
                <div className="aspect-square">
                  <ImagePreview src={item.image_url} alt={item.alt_text} className="w-full h-full" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-primary">{item.category}</span>
                    {item.is_published ? <Eye className="h-3 w-3 text-green-500" /> : <EyeOff className="h-3 w-3 text-gray-400" />}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{item.caption}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button onClick={() => { setEditingItem(item); setIsModalOpen(true) }} className="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-white">
                    <Pencil className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                  <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-white">
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
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
        title={editingItem ? 'Edit Image' : 'New Image'}
        size="md"
      >
        <GalleryForm
          item={editingItem}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
          saveStatus={saveStatus}
        />
      </ReusableModal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        confirmLabel="Delete"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        isDestructive
      />
    </div>
  )
}

function GalleryForm({ item, onSave, onCancel, saveStatus }: {
  item: GalleryItem | null
  onSave: (i: GalleryItem) => void
  onCancel: () => void
  saveStatus: 'idle' | 'saving' | 'saved'
}) {
  const [form, setForm] = useState<GalleryItem>(item || {
    id: `gal-${Date.now()}`,
    image_url: '',
    category: '',
    caption: '',
    alt_text: '',
    is_published: true,
    sort_order: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Image" required>
        <ImageUpload
          value={form.image_url}
          onChange={(url) => setForm({ ...form, image_url: url })}
          folder="gallery"
          label="Gallery Image"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category">
          <FormInput value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        </FormField>
        <FormField label="Caption">
          <FormInput value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} />
        </FormField>
      </div>
      <FormField label="Alt Text">
        <FormInput value={form.alt_text} onChange={e => setForm({ ...form, alt_text: e.target.value })} />
      </FormField>
      <FormToggle checked={form.is_published} onChange={v => setForm({ ...form, is_published: v })} label="Published" />
      <FormActions>
        <FormButton variant="secondary" type="button" onClick={onCancel}>Cancel</FormButton>
        <FormButton type="submit" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save Image'}
        </FormButton>
      </FormActions>
    </form>
  )
}
