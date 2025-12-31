import { createBrowserClient } from '@supabase/ssr'

/**
 * Get Supabase browser client instance
 */
export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Upload image to Supabase Storage
 * @param file - Image file to upload
 * @param bucket - Storage bucket name (default: 'product-images')
 * @returns Public URL of uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'product-images'
): Promise<string> {
  const supabase = getSupabaseBrowserClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = fileName

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

/**
 * Upload multiple images to Supabase Storage
 * @param files - Array of image files
 * @param bucket - Storage bucket name (default: 'product-images')
 * @returns Array of public URLs
 */
export async function uploadImages(
  files: File[],
  bucket: string = 'product-images'
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket))
  return Promise.all(uploadPromises)
}

/**
 * Delete image from Supabase Storage
 * @param imageUrl - Public URL of the image
 * @param bucket - Storage bucket name (default: 'product-images')
 */
export async function deleteImage(
  imageUrl: string,
  bucket: string = 'product-images'
): Promise<void> {
  const supabase = getSupabaseBrowserClient()
  
  // Extract file path from public URL
  const urlParts = imageUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    throw error
  }
}

/**
 * Delete multiple images from Supabase Storage
 * @param imageUrls - Array of public URLs
 * @param bucket - Storage bucket name (default: 'product-images')
 */
export async function deleteImages(
  imageUrls: string[],
  bucket: string = 'product-images'
): Promise<void> {
  const deletePromises = imageUrls.map(url => deleteImage(url, bucket))
  await Promise.all(deletePromises)
}
