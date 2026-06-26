import type { Incident, Resource, Volunteer, Organization, Hospital, Shelter } from '@/domain/entities'

export type MapMarkerType = 'incident' | 'resource' | 'hospital' | 'shelter' | 'blocked_road'

export interface MapMarker {
  id: string
  type: MapMarkerType
  lat: number
  lng: number
  title: string
  priority?: string
  data?: Incident | Resource | Hospital | Shelter
}

export interface MapFilter {
  incidents: boolean
  resources: boolean
  hospitals: boolean
  shelters: boolean
  blocked_roads: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface IncidentFormData {
  category: string
  description: string
  address: string
  affected_people: number
  lat: number
  lng: number
  photos: File[]
}

export interface ResourceFormData {
  type: string
  name: string
  description: string
  quantity: number
  unit: string
  address: string
  lat: number
  lng: number
  contact_phone: string
}

export interface VolunteerFormData {
  skills: string[]
  availability_start: string
  availability_end: string
}

export interface OrganizationFormData {
  name: string
  type: string
  description: string
  phone: string
  email: string
  address: string
  website?: string
}
