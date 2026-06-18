import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import type { GalleryItem } from '../types'

export async function fetchGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return []

  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data || []) as GalleryItem[]
}

export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem> {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('gallery')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data as GalleryItem
}

export async function updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('gallery')
    .update(item)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as GalleryItem
}

export async function deleteGalleryItem(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase.from('gallery').delete().eq('id', id)
  if (error) throw error
}
