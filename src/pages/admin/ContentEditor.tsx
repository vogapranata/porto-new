import { useState } from 'react'
import { useCMSStore } from '../../store/cmsStore'
import SaveIndicator from '../../components/shared/SaveIndicator'
import ImageUpload from '../../components/shared/ImageUpload'
import {
  FormField, FormInput, FormTextArea, FormActions, FormButton
} from '../../components/shared/ReusableForm'
import { Globe, User, Mail, FileText } from 'lucide-react'

export default function ContentEditor() {
  const { cmsData, saveCMS } = useCMSStore()
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'footer'>('hero')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const [hero, setHero] = useState(cmsData.hero)
  const [about, setAbout] = useState(cmsData.about)
  const [contact, setContact] = useState(cmsData.contact)
  const [footer, setFooter] = useState(cmsData.footer)

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await saveCMS({ hero, about, contact, footer })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('error')
    }
  }

  const tabs = [
    { id: 'hero' as const, label: 'Hero', icon: Globe },
    { id: 'about' as const, label: 'About', icon: User },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
    { id: 'footer' as const, label: 'Footer', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Editor</h1>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-6">
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <FormField label="Name">
              <FormInput value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
            </FormField>
            <FormField label="Subtitle">
              <FormInput value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
            </FormField>
            <FormField label="Description">
              <FormTextArea value={hero.description} onChange={(e) => setHero({ ...hero, description: e.target.value })} rows={4} />
            </FormField>
            <FormField label="Image URL">
              <ImageUpload
                value={hero.image_url}
                onChange={(url) => setHero({ ...hero, image_url: url })}
                folder="hero"
                label="Hero Image"
              />
            </FormField>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Primary Button Text">
                <FormInput value={hero.primary_button_text} onChange={(e) => setHero({ ...hero, primary_button_text: e.target.value })} />
              </FormField>
              <FormField label="Primary Button Link">
                <FormInput value={hero.primary_button_link} onChange={(e) => setHero({ ...hero, primary_button_link: e.target.value })} />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Secondary Button Text">
                <FormInput value={hero.secondary_button_text} onChange={(e) => setHero({ ...hero, secondary_button_text: e.target.value })} />
              </FormField>
              <FormField label="Secondary Button Link">
                <FormInput value={hero.secondary_button_link} onChange={(e) => setHero({ ...hero, secondary_button_link: e.target.value })} />
              </FormField>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-5">
            <FormField label="Title">
              <FormInput value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
            </FormField>
            <FormField label="Description">
              <FormTextArea value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} rows={6} />
            </FormField>
            <FormField label="Profile Image URL">
              <ImageUpload
                value={about.image_url}
                onChange={(url) => setAbout({ ...about, image_url: url })}
                folder="about"
                label="About Image"
              />
            </FormField>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-5">
            <FormField label="Title">
              <FormInput value={contact.title} onChange={(e) => setContact({ ...contact, title: e.target.value })} />
            </FormField>
            <FormField label="Description">
              <FormTextArea value={contact.description} onChange={(e) => setContact({ ...contact, description: e.target.value })} rows={4} />
            </FormField>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Email">
                <FormInput value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              </FormField>
              <FormField label="WhatsApp">
                <FormInput value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Instagram">
                <FormInput value={contact.instagram} onChange={(e) => setContact({ ...contact, instagram: e.target.value })} />
              </FormField>
              <FormField label="LinkedIn">
                <FormInput value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="GitHub">
                <FormInput value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} />
              </FormField>
              <FormField label="Address">
                <FormInput value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
              </FormField>
            </div>
          </div>
        )}

        {activeTab === 'footer' && (
          <div className="space-y-5">
            <FormField label="Logo Text">
              <FormInput value={footer.logo} onChange={(e) => setFooter({ ...footer, logo: e.target.value })} />
            </FormField>
            <FormField label="Description">
              <FormTextArea value={footer.description} onChange={(e) => setFooter({ ...footer, description: e.target.value })} rows={3} />
            </FormField>
            <FormField label="Copyright">
              <FormInput value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} />
            </FormField>
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</p>
              {footer.social_links.map((link, index) => (
                <div key={index} className="grid grid-cols-3 gap-3">
                  <FormInput
                    placeholder="Name"
                    value={link.name}
                    onChange={(e) => {
                      const updated = [...footer.social_links]
                      updated[index] = { ...link, name: e.target.value }
                      setFooter({ ...footer, social_links: updated })
                    }}
                  />
                  <FormInput
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => {
                      const updated = [...footer.social_links]
                      updated[index] = { ...link, url: e.target.value }
                      setFooter({ ...footer, social_links: updated })
                    }}
                  />
                  <FormInput
                    placeholder="Icon"
                    value={link.icon}
                    onChange={(e) => {
                      const updated = [...footer.social_links]
                      updated[index] = { ...link, icon: e.target.value }
                      setFooter({ ...footer, social_links: updated })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <FormActions>
          <FormButton variant="secondary" onClick={() => window.location.reload()}>
            Reset
          </FormButton>
          <FormButton onClick={handleSave} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
          </FormButton>
        </FormActions>
      </div>
    </div>
  )
}
