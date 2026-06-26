'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { PriorityBadge, StatusBadge } from '@/presentation/components/common/status-badge'
import type { Incident } from '@/domain/entities'
import { IncidentPriority, IncidentStatus } from '@/domain/enums'
import { INCIDENT_CATEGORY_LABELS } from '@/shared/constants'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { slideUp } from '@/presentation/animations'

interface IncidentCardProps {
  incident: Incident
  onClick?: () => void
}

export function IncidentCard({ incident, onClick }: IncidentCardProps) {
  return (
    <motion.div {...slideUp}>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow border-l-4"
        style={{ borderLeftColor: getBorderColor(incident.priority) }}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm line-clamp-1">
              {INCIDENT_CATEGORY_LABELS[incident.category as keyof typeof INCIDENT_CATEGORY_LABELS] || incident.category}
            </h3>
            <div className="flex gap-1.5 shrink-0">
              <PriorityBadge priority={incident.priority as IncidentPriority} />
              <StatusBadge status={incident.status as IncidentStatus} />
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {incident.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {incident.address}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} />
              {incident.affected_people}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Clock size={12} />
              {formatDistanceToNow(new Date(incident.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getBorderColor(priority: string) {
  const colors: Record<string, string> = {
    critical: '#EF4444',
    high: '#F97316',
    medium: '#EAB308',
    low: '#22C55E',
  }
  return colors[priority] || '#6B7280'
}
