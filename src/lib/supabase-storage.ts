import { createBrowserClient } from './supabase'

export async function uploadProductImage(file: File, userId: string): Promise<string> {
  const supabase = createBrowserClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path)
  
  return publicUrl
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
