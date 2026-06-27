import { createClient } from '@/infrastructure/supabase/client'
import { v4 as uuid } from 'uuid'

const BUCKET = 'incident-photos'

export async function uploadPhotos(files: File[]): Promise<string[]> {
  if (files.length === 0) return []

  const supabase = createClient()
  const urls: string[] = []

  for (const file of files) {
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${uuid()}.${ext}`

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false })

    if (error) {
      console.error('Upload error:', error)
      continue
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    urls.push(data.publicUrl)
  }

  return urls
}
