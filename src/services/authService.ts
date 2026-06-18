import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import type { User } from '../types'

export async function signIn(email: string, password: string): Promise<User> {
  if (!isSupabaseConfigured()) {
    // Fallback: mock auth for local development
    if (email === 'admin@kikivoga.com' && password === 'admin123') {
      return { id: 'local-admin', email, role: 'admin' }
    }
    throw new Error('Invalid credentials')
  }

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error

  return {
    id: data.user.id,
    email: data.user.email || '',
    role: 'admin',
  }
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) return
  const supabase = getSupabase()
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null

  return {
    id: data.user.id,
    email: data.user.email || '',
    role: 'admin',
  }
}
