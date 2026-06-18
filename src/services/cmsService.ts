import type { SupabaseClient } from '@supabase/supabase-js'
import type { CMSData, Project, Skill, Experience, GalleryItem } from '../types'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

export async function fetchAllCMSData(): Promise<CMSData | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = getSupabase()
  if (!supabase) return null

  try {
    const [
      heroRes,
      aboutRes,
      contactRes,
      footerRes,
      projectsRes,
      skillsRes,
      experienceRes,
      galleryRes,
      seoRes,
      settingsRes,
    ] = await Promise.all([
      supabase.from('cms_hero').select('*').maybeSingle(),
      supabase.from('cms_about').select('*').maybeSingle(),
      supabase.from('cms_contact').select('*').maybeSingle(),
      supabase.from('cms_footer').select('*').maybeSingle(),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('skills').select('*').order('sort_order', { ascending: true }),
      supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabase.from('gallery').select('*').order('sort_order', { ascending: true }),
      supabase.from('seo_settings').select('*').maybeSingle(),
      supabase.from('site_settings').select('*').maybeSingle(),
    ])

    return {
      hero: heroRes.data || undefined,
      about: aboutRes.data || undefined,
      contact: contactRes.data || undefined,
      footer: footerRes.data || undefined,
      projects: projectsRes.data || [],
      skills: skillsRes.data || [],
      experience: experienceRes.data || [],
      gallery: galleryRes.data || [],
      seo: seoRes.data || undefined,
      settings: settingsRes.data || undefined,
    }
  } catch (err) {
    console.error('Error fetching CMS data:', err)
    return null
  }
}

// Helper: replace all items in a collection table (delete existing, insert new)
async function replaceCollection<T extends { id: string }>(
  supabase: SupabaseClient,
  table: string,
  items: T[]
): Promise<void> {
  // Delete all existing rows
  const { data: existing } = await supabase.from(table).select('id')
  if (existing && existing.length > 0) {
    const ids = existing.map((e: { id: string }) => e.id)
    await supabase.from(table).delete().in('id', ids)
  }
  // Insert new items if any
  if (items.length > 0) {
    await supabase.from(table).insert(items)
  }
}

export async function saveCMSData(data: Partial<CMSData>): Promise<void> {
  if (!isSupabaseConfigured()) return
  const supabase = getSupabase()
  if (!supabase) return

  // Singleton tables: always use id = 'main'
  if (data.hero) {
    await supabase.from('cms_hero').upsert({ id: 'main', ...data.hero })
  }
  if (data.about) {
    await supabase.from('cms_about').upsert({ id: 'main', ...data.about })
  }
  if (data.contact) {
    await supabase.from('cms_contact').upsert({ id: 'main', ...data.contact })
  }
  if (data.footer) {
    await supabase.from('cms_footer').upsert({ id: 'main', ...data.footer })
  }
  if (data.seo) {
    await supabase.from('seo_settings').upsert({ id: 'main', ...data.seo })
  }
  if (data.settings) {
    await supabase.from('site_settings').upsert({ id: 'main', ...data.settings })
  }

  // Collection tables: replace-all to handle deletions correctly
  if (data.projects) {
    await replaceCollection(supabase, 'projects', data.projects as Project[])
  }
  if (data.skills) {
    await replaceCollection(supabase, 'skills', data.skills as Skill[])
  }
  if (data.experience) {
    await replaceCollection(supabase, 'experiences', data.experience as Experience[])
  }
  if (data.gallery) {
    await replaceCollection(supabase, 'gallery', data.gallery as GalleryItem[])
  }
}

