import { Badge } from '@/components/ui/badge'
import { IncidentPriority, IncidentStatus } from '@/domain/enums'
import { INCIDENT_PRIORITY_LABELS } from '@/shared/constants'

const priorityVariants: Record<IncidentPriority, string> = {
  [IncidentPriority.CRITICAL]: 'bg-red-600 text-white hover:bg-red-700',
  [IncidentPriority.HIGH]: 'bg-orange-500 text-white hover:bg-orange-600',
  [IncidentPriority.MEDIUM]: 'bg-yellow-500 text-black hover:bg-yellow-600',
  [IncidentPriority.LOW]: 'bg-green-500 text-white hover:bg-green-600',
}

const statusVariants: Record<IncidentStatus, string> = {
  [IncidentStatus.PENDING]: 'bg-gray-500 text-white',
  [IncidentStatus.ASSIGNED]: 'bg-blue-500 text-white',
  [IncidentStatus.IN_PROGRESS]: 'bg-purple-500 text-white',
  [IncidentStatus.RESOLVED]: 'bg-green-600 text-white',
  [IncidentStatus.CLOSED]: 'bg-gray-700 text-white',
}

const statusLabels: Record<IncidentStatus, string> = {
  [IncidentStatus.PENDING]: 'Pendiente',
  [IncidentStatus.ASSIGNED]: 'Asignado',
  [IncidentStatus.IN_PROGRESS]: 'En progreso',
  [IncidentStatus.RESOLVED]: 'Resuelto',
  [IncidentStatus.CLOSED]: 'Cerrado',
}

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  return (
    <Badge className={priorityVariants[priority]}>
      {INCIDENT_PRIORITY_LABELS[priority]}
    </Badge>
  )
}

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <Badge className={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  )
}
