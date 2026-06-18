import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import SaveIndicator from '../../components/shared/SaveIndicator'
import {
  FormField, FormInput, FormSelect, FormActions, FormButton, FormToggle
} from '../../components/shared/ReusableForm'
import type { Language } from '../../types'

export default function SettingsPage() {
  const { cmsData, saveCMS } = useCMSStore()
  const [settings, setSettings] = useState(cmsData.settings)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await saveCMS({ settings })
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure your website preferences</p>
        </div>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-6">
        <FormField label="Website Name">
          <FormInput
            value={settings.website_name}
            onChange={(e) => setSettings({ ...settings, website_name: e.target.value })}
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Default Language">
            <FormSelect
              value={settings.default_language}
              onChange={(e) => setSettings({ ...settings, default_language: e.target.value as Language })}
              options={[
                { value: 'id', label: 'Indonesian' },
                { value: 'en', label: 'English' },
              ]}
            />
          </FormField>

          <FormField label="Default Theme">
            <FormSelect
              value={settings.default_theme}
              onChange={(e) => setSettings({ ...settings, default_theme: e.target.value as 'light' | 'dark' })}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
            />
          </FormField>
        </div>

        <FormField label="Primary Color">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
              className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <FormInput
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
              className="w-32"
            />
          </div>
        </FormField>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Options</p>
          <FormToggle
            checked={settings.dark_mode}
            onChange={(v) => setSettings({ ...settings, dark_mode: v })}
            label="Enable Dark Mode"
          />
          <FormToggle
            checked={settings.light_mode}
            onChange={(v) => setSettings({ ...settings, light_mode: v })}
            label="Enable Light Mode"
          />
        </div>

        <FormActions>
          <FormButton variant="secondary" onClick={() => setSettings(cmsData.settings)}>Reset</FormButton>
          <FormButton onClick={handleSave} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
          </FormButton>
        </FormActions>
      </div>
    </div>
  )
}
