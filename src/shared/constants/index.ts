import { IncidentCategory, IncidentPriority, ResourceType } from '@/domain/enums'

export const INCIDENT_CATEGORY_LABELS: Record<IncidentCategory, string> = {
  [IncidentCategory.TRAPPED]: 'Personas atrapadas',
  [IncidentCategory.MEDICAL]: 'Emergencia médica',
  [IncidentCategory.FIRE]: 'Incendio',
  [IncidentCategory.STRUCTURAL]: 'Daño estructural',
  [IncidentCategory.FLOOD]: 'Inundación',
  [IncidentCategory.LANDSLIDE]: 'Deslizamiento',
  [IncidentCategory.MISSING]: 'Personas desaparecidas',
  [IncidentCategory.SHELTER]: 'Necesidad de refugio',
  [IncidentCategory.FOOD_WATER]: 'Alimento / Agua',
  [IncidentCategory.OTHER]: 'Otro',
}

export const INCIDENT_PRIORITY_LABELS: Record<IncidentPriority, string> = {
  [IncidentPriority.CRITICAL]: 'Crítica',
  [IncidentPriority.HIGH]: 'Alta',
  [IncidentPriority.MEDIUM]: 'Media',
  [IncidentPriority.LOW]: 'Baja',
}

export const PRIORITY_COLORS: Record<IncidentPriority, string> = {
  [IncidentPriority.CRITICAL]: '#EF4444',
  [IncidentPriority.HIGH]: '#F97316',
  [IncidentPriority.MEDIUM]: '#EAB308',
  [IncidentPriority.LOW]: '#22C55E',
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  [ResourceType.FOOD]: 'Alimentos',
  [ResourceType.WATER]: 'Agua',
  [ResourceType.MEDICINE]: 'Medicinas',
  [ResourceType.CLOTHING]: 'Ropa',
  [ResourceType.SHELTER]: 'Refugio',
  [ResourceType.TRANSPORT]: 'Transporte',
  [ResourceType.EQUIPMENT]: 'Equipamiento',
  [ResourceType.PERSONNEL]: 'Personal',
  [ResourceType.BLOOD]: 'Sangre',
  [ResourceType.OTHER]: 'Otro',
}

export const DEFAULT_MAP_CENTER = { lat: 4.711, lng: -74.0721 }
export const DEFAULT_MAP_ZOOM = 12
export const MAX_PHOTO_SIZE_MB = 5
export const MAX_PHOTOS_PER_INCIDENT = 4
