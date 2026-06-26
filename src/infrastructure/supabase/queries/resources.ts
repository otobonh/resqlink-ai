import { createClient } from '@/infrastructure/supabase/client'
import type { Resource } from '@/domain/entities'

const supabase = createClient()

export async function getResources(filters?: {
  type?: string
  available?: boolean
}) {
  let query = supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.available !== undefined)
    query = query.eq('available', filters.available)

  const { data, error } = await query
  if (error) throw error
  return data as Resource[]
}

export async function createResource(resource: Omit<Resource, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('resources')
    .insert({
      ...resource,
      location: `POINT(${resource.location.lng} ${resource.location.lat})`,
    })
    .select()
    .single()

  if (error) throw error
  return data as Resource
}

export async function updateResource(id: string, updates: Partial<Resource>) {
  const { data, error } = await supabase
    .from('resources')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Resource
}
