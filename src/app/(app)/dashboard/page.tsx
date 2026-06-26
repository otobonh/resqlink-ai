'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { StatsGrid } from '@/presentation/components/dashboard/stats-grid'
import { IncidentCard } from '@/presentation/components/incidents/incident-card'
import { LoadingSpinner } from '@/presentation/components/common/loading'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import { getDashboardStats, getIncidents } from '@/infrastructure/supabase/queries/incidents'
import type { DashboardStats, Incident } from '@/domain/entities'
import type { MapMarker, MapFilter } from '@/shared/types'
import { MapFilters } from '@/presentation/components/map/map-filters'

const EmergencyMap = dynamic(
  () =>
    import('@/presentation/components/map/emergency-map').then(
      (m) => m.EmergencyMap
    ),
  { ssr: false, loading: () => <div className="h-[400px] bg-muted animate-pulse rounded-xl" /> }
)

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<MapFilter>({
    incidents: true,
    resources: true,
    hospitals: true,
    shelters: true,
    blocked_roads: true,
  })

  const loadData = useCallback(async () => {
    try {
      const [statsData, incidentsData] = await Promise.all([
        getDashboardStats(),
        getIncidents({ status: 'pending' }),
      ])
      setStats(statsData)
      setIncidents(incidentsData)
    } catch (err) {
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('incidents', () => loadData(), () => loadData())

  if (loading) return <LoadingSpinner />

  const markers: MapMarker[] = incidents.map((i) => ({
    id: i.id,
    type: 'incident',
    lat: i.location?.lat || 0,
    lng: i.location?.lng || 0,
    title: i.title,
    priority: i.priority,
    data: i,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vista general de la emergencia</p>
      </div>

      {stats && <StatsGrid stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mapa en tiempo real</h2>
            <MapFilters filters={filters} onChange={setFilters} />
          </div>
          <EmergencyMap markers={markers} filters={filters} className="h-[400px] w-full" />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Incidentes recientes ({incidents.length})
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {incidents.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No hay incidentes pendientes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
