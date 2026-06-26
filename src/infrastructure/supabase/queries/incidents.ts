import { createClient } from '@/infrastructure/supabase/client'
import type { Incident } from '@/domain/entities'
import type { IncidentFormData } from '@/shared/types'
import { parseLocationField } from '@/shared/utils/geo'

export async function getIncidents(filters?: {
  status?: string
  priority?: string
  category?: string
}) {
  const supabase = createClient()
  let query = supabase
    .from('incidents')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') query = query.eq('status', filters.status)
  if (filters?.priority && filters.priority !== 'all') query = query.eq('priority', filters.priority)
  if (filters?.category && filters.category !== 'all') query = query.eq('category', filters.category)

  const { data, error } = await query
  if (error) throw error
  return (data || []).map(parseLocationField) as unknown as Incident[]
}

export async function getIncidentById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return parseLocationField(data) as unknown as Incident
}

export async function createIncident(form: IncidentFormData, reporterId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('incidents')
    .insert({
      reporter_id: reporterId,
      title: `${form.category} - ${form.address}`,
      description: form.description,
      category: form.category,
      priority: 'medium',
      status: 'pending',
      location: `POINT(${form.lng} ${form.lat})`,
      address: form.address,
      affected_people: form.affected_people,
      photos: [],
    })
    .select()
    .single()

  if (error) throw error
  return data as Incident
}

export async function updateIncident(id: string, updates: Partial<Incident>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('incidents')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Incident
}

export async function getDashboardStats() {
  const supabase = createClient()
  const [incidents, resources, volunteers, shelters, hospitals] =
    await Promise.all([
      supabase.from('incidents').select('status, affected_people'),
      supabase.from('resources').select('id').eq('available', true),
      supabase.from('volunteers').select('id').eq('status', 'available'),
      supabase.from('shelters').select('id').eq('active', true),
      supabase.from('hospitals').select('id'),
    ])

  const allIncidents = incidents.data || []
  const active = allIncidents.filter((i) => i.status !== 'resolved' && i.status !== 'closed')
  const resolved = allIncidents.filter((i) => i.status === 'resolved' || i.status === 'closed')
  const affected = active.reduce((sum, i) => sum + (i.affected_people || 0), 0)

  return {
    active_incidents: active.length,
    affected_people: affected,
    available_resources: resources.data?.length || 0,
    active_volunteers: volunteers.data?.length || 0,
    shelters: shelters.data?.length || 0,
    hospitals: hospitals.data?.length || 0,
    resolved_cases: resolved.length,
  }
}
