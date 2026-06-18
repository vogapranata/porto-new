import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import type { Project } from '../types'

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return []

  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data || []) as Project[]
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null

  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Project
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function deleteProject(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = getSupabase()
  if (!supabase) return

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}
