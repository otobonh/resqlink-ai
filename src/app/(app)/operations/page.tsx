'use client'

import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, Clock, AlertTriangle, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PriorityBadge, StatusBadge } from '@/presentation/components/common/status-badge'
import { LoadingSpinner } from '@/presentation/components/common/loading'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import { getIncidents, updateIncident } from '@/infrastructure/supabase/queries/incidents'
import type { Incident } from '@/domain/entities'
import { IncidentPriority, IncidentStatus } from '@/domain/enums'
import { INCIDENT_CATEGORY_LABELS } from '@/shared/constants'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'

export default function OperationsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [priorityFilter, setPriorityFilter] = useState<string>('')

  const loadData = useCallback(async () => {
    try {
      const data = await getIncidents({
        priority: priorityFilter || undefined,
      })
      setIncidents(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [priorityFilter])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('incidents', () => loadData(), () => loadData())

  const handleStatusChange = async (id: string, status: IncidentStatus) => {
    try {
      await updateIncident(id, {
        status,
        ...(status === IncidentStatus.RESOLVED
          ? { resolved_at: new Date().toISOString() }
          : {}),
      })
      toast.success('Estado actualizado')
      loadData()
    } catch {
      toast.error('Error al actualizar')
    }
  }

  const byStatus = (status: string) =>
    incidents.filter((i) => i.status === status)

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Centro de Operaciones</h1>
          <p className="text-muted-foreground">Gestión y seguimiento de incidentes</p>
        </div>
        <div className="flex gap-2 items-center">
          <Filter size={16} className="text-muted-foreground" />
          <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v ?? '')}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="critical">Crítica</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock size={14} />
            Pendientes ({byStatus('pending').length})
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="gap-2">
            <AlertTriangle size={14} />
            En progreso ({byStatus('in_progress').length + byStatus('assigned').length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2">
            <CheckCircle size={14} />
            Resueltos ({byStatus('resolved').length + byStatus('closed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {byStatus('pending').map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-3 mt-4">
          {[...byStatus('assigned'), ...byStatus('in_progress')].map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-3 mt-4">
          {[...byStatus('resolved'), ...byStatus('closed')].map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IncidentRow({
  incident,
  onStatusChange,
}: {
  incident: Incident
  onStatusChange: (id: string, status: IncidentStatus) => void
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-sm truncate">
              {INCIDENT_CATEGORY_LABELS[incident.category as keyof typeof INCIDENT_CATEGORY_LABELS] || incident.category}
            </p>
            <PriorityBadge priority={incident.priority as IncidentPriority} />
            <StatusBadge status={incident.status as IncidentStatus} />
          </div>
          <p className="text-xs text-muted-foreground truncate">{incident.address}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(incident.created_at), { addSuffix: true, locale: es })}
            {' · '}
            {incident.affected_people} personas
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          {incident.status === 'pending' && (
            <Button
              size="sm"
              onClick={() => onStatusChange(incident.id, IncidentStatus.IN_PROGRESS)}
            >
              Atender
            </Button>
          )}
          {(incident.status === 'in_progress' || incident.status === 'assigned') && (
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-600"
              onClick={() => onStatusChange(incident.id, IncidentStatus.RESOLVED)}
            >
              Resolver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
