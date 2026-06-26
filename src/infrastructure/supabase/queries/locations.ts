import { createClient } from '@/infrastructure/supabase/client'
import type { Hospital, Shelter } from '@/domain/entities'
import { parseLocationField } from '@/shared/utils/geo'

export async function getHospitals() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select('*')
    .order('name')

  if (error) throw error
  return (data || []).map(parseLocationField) as unknown as Hospital[]
}

export async function getShelters() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shelters')
    .select('*')
    .eq('active', true)
    .order('name')

  if (error) throw error
  return (data || []).map(parseLocationField) as unknown as Shelter[]
}
