import { createBrowserClient } from '@/lib/supabase'

export async function uploadProductImage(file: File, userId: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bucket', 'product-images')
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Upload failed')
  }
  
  const { url } = await response.json()
  return url
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const supabase = createBrowserClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path)
  
  return publicUrl
}

export function getProductImageUrl(path: string): string {
  const supabase = createBrowserClient()
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)
  return publicUrl
}

export function getAvatarUrl(path: string): string {
  const supabase = createBrowserClient()
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(path)
  return publicUrl
}
