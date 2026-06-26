import {
  IncidentPriority,
  IncidentStatus,
  IncidentCategory,
  ResourceType,
  UserRole,
  VolunteerStatus,
  OrganizationType,
} from '@/domain/enums'

export interface User {
  id: string
  email: string
  full_name: string
  phone: string | null
  role: UserRole
  avatar_url: string | null
  location: GeoPoint | null
  created_at: string
  updated_at: string
}

export interface GeoPoint {
  lat: number
  lng: number
}

export interface Incident {
  id: string
  reporter_id: string
  title: string
  description: string
  category: IncidentCategory
  priority: IncidentPriority
  status: IncidentStatus
  location: GeoPoint
  address: string
  affected_people: number
  photos: string[]
  created_at: string
  updated_at: string
  resolved_at: string | null
  assigned_to: string | null
  organization_id: string | null
}

export interface Resource {
  id: string
  provider_id: string
  organization_id: string | null
  type: ResourceType
  name: string
  description: string
  quantity: number
  unit: string
  location: GeoPoint
  address: string
  available: boolean
  contact_phone: string
  created_at: string
  updated_at: string
}

export interface Volunteer {
  id: string
  user_id: string
  organization_id: string | null
  skills: string[]
  status: VolunteerStatus
  location: GeoPoint | null
  availability_start: string | null
  availability_end: string | null
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  type: OrganizationType
  description: string
  logo_url: string | null
  website: string | null
  phone: string
  email: string
  location: GeoPoint | null
  address: string
  verified: boolean
  created_at: string
  updated_at: string
}

export interface Assignment {
  id: string
  incident_id: string
  volunteer_id: string | null
  organization_id: string | null
  resource_id: string | null
  notes: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  created_at: string
  updated_at: string
}

export interface Hospital {
  id: string
  name: string
  location: GeoPoint
  address: string
  phone: string
  capacity: number
  available_beds: number
  has_emergency: boolean
  specialties: string[]
  created_at: string
  updated_at: string
}

export interface Shelter {
  id: string
  name: string
  organization_id: string | null
  location: GeoPoint
  address: string
  capacity: number
  current_occupancy: number
  amenities: string[]
  contact_phone: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'incident' | 'assignment' | 'resource' | 'system'
  read: boolean
  data: Record<string, unknown> | null
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface DashboardStats {
  active_incidents: number
  affected_people: number
  available_resources: number
  active_volunteers: number
  shelters: number
  hospitals: number
  resolved_cases: number
}
