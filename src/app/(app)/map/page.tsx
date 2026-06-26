'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MapFilters } from '@/presentation/components/map/map-filters'
import { LoadingSpinner } from '@/presentation/components/common/loading'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import { getIncidents } from '@/infrastructure/supabase/queries/incidents'
import { getResources } from '@/infrastructure/supabase/queries/resources'
import type { Incident, Resource } from '@/domain/entities'
import type { MapMarker, MapFilter } from '@/shared/types'

const EmergencyMap = dynamic(
  () => import('@/presentation/components/map/emergency-map').then((m) => m.EmergencyMap),
  { ssr: false, loading: () => <LoadingSpinner /> }
)

export default function MapPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [resources, setResources] = useState<Resource[]>([])
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
      const [inc, res] = await Promise.all([getIncidents(), getResources()])
      setIncidents(inc)
      setResources(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('incidents', () => loadData(), () => loadData())
  useRealtime('resources', () => loadData(), () => loadData())

  const markers: MapMarker[] = [
    ...incidents.map((i): MapMarker => ({
      id: i.id,
      type: 'incident',
      lat: i.location?.lat || 0,
      lng: i.location?.lng || 0,
      title: i.title,
      priority: i.priority,
      data: i,
    })),
    ...resources.map((r): MapMarker => ({
      id: r.id,
      type: 'resource',
      lat: r.location?.lat || 0,
      lng: r.location?.lng || 0,
      title: r.name,
      data: r,
    })),
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mapa de emergencias</h1>
        <MapFilters filters={filters} onChange={setFilters} />
      </div>
      <EmergencyMap
        markers={markers}
        filters={filters}
        className="h-[calc(100vh-200px)] w-full"
      />
    </div>
  )
}
