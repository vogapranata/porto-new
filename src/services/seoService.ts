import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import type { SEOSettings } from '../types'

export async function fetchSEO(): Promise<SEOSettings | null> {
  if (!isSupabaseConfigured()) return null

  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('seo_settings')
    .select('*')
    .single()

  if (error) return null
  return data as SEOSettings
}

export async function saveSEO(seo: Partial<SEOSettings>): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase.from('seo_settings').upsert(seo)
  if (error) throw error
}
