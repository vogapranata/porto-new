import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import SaveIndicator from '../../components/shared/SaveIndicator'
import ImageUpload from '../../components/shared/ImageUpload'
import {
  FormField, FormInput, FormTextArea, FormActions, FormButton
} from '../../components/shared/ReusableForm'

export default function SEOManager() {
  const { cmsData, saveCMS } = useCMSStore()
  const [seo, setSeo] = useState(cmsData.seo)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await saveCMS({ seo })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your SEO and meta settings</p>
        </div>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-6">
        <FormField label="Meta Title">
          <FormInput
            value={seo.meta_title}
            onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
            placeholder="Your portfolio meta title"
          />
        </FormField>

        <FormField label="Meta Description">
          <FormTextArea
            value={seo.meta_description}
            onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
            rows={4}
            placeholder="Description for search engines"
          />
        </FormField>

        <FormField label="Keywords">
          <FormInput
            value={seo.keywords}
            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            placeholder="portfolio, design, marketing, ..."
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="OG Image">
            <ImageUpload
              value={seo.og_image_url}
              onChange={(url: string) => setSeo({ ...seo, og_image_url: url })}
              folder="seo"
              label="OG Image"
            />
          </FormField>

          <FormField label="Favicon">
            <ImageUpload
              value={seo.favicon_url}
              onChange={(url: string) => setSeo({ ...seo, favicon_url: url })}
              folder="seo"
              label="Favicon"
            />
          </FormField>
        </div>

        <FormActions>
          <FormButton variant="secondary" onClick={() => setSeo(cmsData.seo)}>Reset</FormButton>
          <FormButton onClick={handleSave} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save SEO Settings'}
          </FormButton>
        </FormActions>
      </div>

      <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate">{seo.meta_title || 'No title set'}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">https://kikivoga.com</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{seo.meta_description || 'No description set'}</p>
        </div>
      </div>
    </div>
  )
}
