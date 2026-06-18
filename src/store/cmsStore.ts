import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CMSData, Language, CMSState } from '../types'
import { defaultSeedData } from '../data/seedData'
import { isSupabaseConfigured } from '../lib/supabase'
import * as cmsService from '../services/cmsService'

const STORAGE_KEY = 'cms_cache'

function getStoredData(): CMSData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as CMSData
  } catch { /* ignore corrupted storage */ }
  return null
}

function getInitialCMSData(): CMSData {
  const stored = getStoredData()
  if (stored) return stored
  return defaultSeedData
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      cmsData: getInitialCMSData(),
      loading: true,
      error: null,
      language: (localStorage.getItem('language') as Language) || 'id',
      theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',

      initializeCMS: async () => {
        // Always set loading false after init, even if Supabase fails
        if (!isSupabaseConfigured()) {
          set({ loading: false })
          return
        }
        try {
          const data = await cmsService.fetchAllCMSData()
          if (data) {
            set({ cmsData: data, loading: false })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          } else {
            set({ loading: false })
          }
        } catch {
          set({ loading: false })
        }
      },

      fetchCMS: async () => {
        set({ loading: true, error: null })
        try {
          const data = await cmsService.fetchAllCMSData()
          if (data) {
            set({ cmsData: data, loading: false })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          } else {
            set({ loading: false })
          }
        } catch (err) {
          const error = err instanceof Error ? err.message : 'Failed to fetch CMS data'
          set({ loading: false, error })
          throw new Error(error)
        }
      },

      saveCMS: async (partialData) => {
        set({ loading: true, error: null })
        try {
          const current = get().cmsData
          const updated = { ...current, ...partialData }

          // Step 1: Always persist to localStorage first (never fails)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

          // Step 2: Try Supabase if configured (optional, can fail silently)
          if (isSupabaseConfigured()) {
            try {
              await cmsService.saveCMSData(partialData)
            } catch (err) {
              console.warn('Supabase save failed, localStorage is authoritative:', err)
            }
          }

          // Step 3: Update React state immediately after localStorage
          set({ cmsData: updated as CMSData, loading: false })
        } catch (err) {
          const error = err instanceof Error ? err.message : 'Failed to save CMS data'
          set({ loading: false, error })
          throw new Error(error)
        }
      },

      refreshCMS: () => {
        const stored = getStoredData()
        if (stored) {
          set({ cmsData: stored })
        }
      },

      setLanguage: (lang) => {
        set({ language: lang })
        localStorage.setItem('language', lang)
      },

      setTheme: (theme) => {
        set({ theme })
        localStorage.setItem('theme', theme)
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }),
    {
      name: 'cms-store',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
      }),
    }
  )
)

// getLocalizedCMSData: return cmsData as-is for all languages.
// Do NOT override with englishSeedData. Admin edits must be preserved.
export function getLocalizedCMSData(data: CMSData, _lang: Language): CMSData {
  return data
}
