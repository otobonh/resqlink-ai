'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IncidentCard } from '@/presentation/components/incidents/incident-card'
import { LoadingSpinner } from '@/presentation/components/common/loading'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import { getIncidents } from '@/infrastructure/supabase/queries/incidents'
import type { Incident } from '@/domain/entities'
import Link from 'next/link'

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [priorityFilter, setPriorityFilter] = useState<string>('')

  const loadIncidents = useCallback(async () => {
    try {
      const data = await getIncidents({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      })
      setIncidents(data)
    } catch (err) {
      console.error('Error loading incidents:', err)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, priorityFilter])

  useEffect(() => {
    loadIncidents()
  }, [loadIncidents])

  useRealtime('incidents', () => loadIncidents(), () => loadIncidents())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Incidentes</h1>
          <p className="text-muted-foreground">{incidents.length} registrados</p>
        </div>
        <Link href="/incidents/new">
          <Button className="bg-red-600 hover:bg-red-700 gap-2">
            <Plus size={18} />
            Reportar
          </Button>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Filter size={16} className="text-muted-foreground" />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? '')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="assigned">Asignado</SelectItem>
            <SelectItem value="in_progress">En progreso</SelectItem>
            <SelectItem value="resolved">Resuelto</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v ?? '')}>
          <SelectTrigger className="w-40">
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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-3">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          {incidents.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No hay incidentes con los filtros seleccionados
            </p>
          )}
        </div>
      )}
    </div>
  )
}
