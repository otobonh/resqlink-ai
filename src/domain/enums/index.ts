export enum IncidentPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum IncidentStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum IncidentCategory {
  TRAPPED = 'trapped',
  MEDICAL = 'medical',
  FIRE = 'fire',
  STRUCTURAL = 'structural',
  FLOOD = 'flood',
  LANDSLIDE = 'landslide',
  MISSING = 'missing',
  SHELTER = 'shelter',
  FOOD_WATER = 'food_water',
  OTHER = 'other',
}

export enum ResourceType {
  FOOD = 'food',
  WATER = 'water',
  MEDICINE = 'medicine',
  CLOTHING = 'clothing',
  SHELTER = 'shelter',
  TRANSPORT = 'transport',
  EQUIPMENT = 'equipment',
  PERSONNEL = 'personnel',
  BLOOD = 'blood',
  OTHER = 'other',
}

export enum UserRole {
  ADMIN = 'admin',
  ORGANIZATION = 'organization',
  VOLUNTEER = 'volunteer',
  CITIZEN = 'citizen',
}

export enum VolunteerStatus {
  AVAILABLE = 'available',
  ASSIGNED = 'assigned',
  UNAVAILABLE = 'unavailable',
}

export enum OrganizationType {
  NGO = 'ngo',
  HOSPITAL = 'hospital',
  GOVERNMENT = 'government',
  PRIVATE = 'private',
  VOLUNTEER_GROUP = 'volunteer_group',
}
