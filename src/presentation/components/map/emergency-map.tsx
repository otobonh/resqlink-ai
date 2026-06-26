'use client'

import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, useMap, CircleMarker, Popup } from 'react-leaflet'
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, INCIDENT_CATEGORY_LABELS } from '@/shared/constants'
import type { MapMarker, MapFilter } from '@/shared/types'
import type { Incident } from '@/domain/entities'
import 'leaflet/dist/leaflet.css'

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  high: '#EA580C',
  medium: '#CA8A04',
  low: '#16A34A',
}

const TYPE_COLORS: Record<string, string> = {
  resource: '#2563EB',
  hospital: '#7C3AED',
  shelter: '#0891B2',
  blocked_road: '#374151',
}

const CATEGORY_EMOJI: Record<string, string> = {
  trapped: '🏚️ Atrapados',
  medical: '🚑 Médica',
  fire: '🔥 Incendio',
  structural: '🏗️ Estructural',
  flood: '🌊 Inundación',
  landslide: '⛰️ Deslizamiento',
  missing: '🔍 Desaparecidos',
  shelter: '🏕️ Refugio',
  food_water: '💧 Agua/Alimento',
  other: '⚠️ Otro',
}

const TYPE_EMOJI: Record<string, string> = {
  resource: '📦 Recurso',
  hospital: '🏥 Hospital',
  shelter: '⛺ Refugio',
  blocked_road: '🚧 Vía bloqueada',
}

function getMarkerColor(marker: MapMarker): string {
  if (marker.type === 'incident') {
    return PRIORITY_COLORS[marker.priority || 'medium'] || '#CA8A04'
  }
  return TYPE_COLORS[marker.type] || '#6B7280'
}

function getMarkerRadius(marker: MapMarker): number {
  if (marker.type === 'incident') {
    const sizes: Record<string, number> = { critical: 10, high: 8, medium: 7, low: 6 }
    return sizes[marker.priority || 'medium'] || 7
  }
  if (marker.type === 'hospital') return 7
  if (marker.type === 'shelter') return 7
  return 6
}

function MapUpdater({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom())
  }, [center, map])
  return null
}

interface EmergencyMapProps {
  markers?: MapMarker[]
  center?: { lat: number; lng: number }
  zoom?: number
  filters?: MapFilter
  onMarkerClick?: (marker: MapMarker) => void
  className?: string
}

export function EmergencyMap({
  markers = [],
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  filters,
  onMarkerClick,
  className = 'h-[500px] w-full',
}: EmergencyMapProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filtered = useMemo(() => {
    return markers.filter((m) => {
      if (m.lat === 0 && m.lng === 0) return false
      if (!filters) return true
      const key = m.type === 'blocked_road' ? 'blocked_roads' : `${m.type}s`
      return filters[key as keyof MapFilter]
    })
  }, [markers, filters])

  if (!mounted) {
    return (
      <div className={`${className} bg-muted animate-pulse rounded-xl flex items-center justify-center`}>
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    )
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      className={`${className} rounded-xl z-0`}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} />

      {filtered.map((marker) => {
        const incident = marker.data as Incident | undefined
        const category = incident?.category as string | undefined
        const color = getMarkerColor(marker)
        const radius = getMarkerRadius(marker)

        return (
          <CircleMarker
            key={marker.id}
            center={[marker.lat, marker.lng]}
            radius={radius}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.8,
              color: '#FFFFFF',
              weight: 2,
              opacity: 0.9,
            }}
            eventHandlers={{
              click: () => onMarkerClick?.(marker),
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'Arial, sans-serif', minWidth: '220px', padding: '4px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '15px', margin: '0 0 6px 0', color: '#111' }}>
                  {marker.title}
                </p>

                {marker.type === 'incident' && (
                  <>
                    <p style={{ fontSize: '13px', margin: '0 0 4px 0', color: '#555' }}>
                      {CATEGORY_EMOJI[category || 'other'] || category}
                    </p>
                    {incident?.affected_people && (
                      <p style={{ fontSize: '13px', margin: '0 0 4px 0', color: '#555' }}>
                        👥 {incident.affected_people.toLocaleString()} personas afectadas
                      </p>
                    )}
                    {incident?.description && (
                      <p style={{ fontSize: '12px', margin: '0 0 6px 0', color: '#777', lineHeight: '1.4' }}>
                        {incident.description.substring(0, 150)}...
                      </p>
                    )}
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: '#FFF',
                      backgroundColor: color,
                    }}>
                      {marker.priority === 'critical' ? '🔴 CRÍTICA' :
                       marker.priority === 'high' ? '🟠 ALTA' :
                       marker.priority === 'medium' ? '🟡 MEDIA' : '🟢 BAJA'}
                    </span>
                  </>
                )}

                {marker.type !== 'incident' && (
                  <p style={{ fontSize: '13px', margin: '0', color: color, fontWeight: '600' }}>
                    {TYPE_EMOJI[marker.type] || marker.type}
                  </p>
                )}

                {incident?.address && (
                  <p style={{ fontSize: '11px', margin: '6px 0 0 0', color: '#999' }}>
                    📍 {incident.address}
                  </p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
