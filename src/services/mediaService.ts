import { getSupabase, isSupabaseConfigured } from '../lib/supabase'

const BUCKET_NAME = 'portfolio-media'

export async function uploadImage(
  file: File,
  folder: string
): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured. Image upload requires Supabase Storage.')
  }

  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not initialized')

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) throw uploadError

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}

export async function deleteImage(filePath: string): Promise<void> {
  if (!isSupabaseConfigured()) return

  const supabase = getSupabase()
  if (!supabase) return

  const path = filePath.split('/').slice(-2).join('/')
  await supabase.storage.from(BUCKET_NAME).remove([path])
}

export async function replaceImage(
  oldUrl: string | null,
  newFile: File,
  folder: string
): Promise<string> {
  if (oldUrl) {
    try {
      await deleteImage(oldUrl)
    } catch {
      // ignore deletion errors
    }
  }
  return uploadImage(newFile, folder)
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File must be PNG, JPG, JPEG, WEBP, or SVG.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB.' }
  }

  return { valid: true }
}
