'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, PRIORITY_COLORS } from '@/shared/constants'
import type { MapMarker, MapFilter } from '@/shared/types'
import { IncidentPriority } from '@/domain/enums'
import 'leaflet/dist/leaflet.css'

function createIcon(color: string, size: number = 12) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size + 6, size + 6],
    iconAnchor: [(size + 6) / 2, (size + 6) / 2],
  })
}

const markerIcons: Record<string, L.DivIcon> = {
  incident_critical: createIcon(PRIORITY_COLORS[IncidentPriority.CRITICAL], 16),
  incident_high: createIcon(PRIORITY_COLORS[IncidentPriority.HIGH], 14),
  incident_medium: createIcon(PRIORITY_COLORS[IncidentPriority.MEDIUM], 12),
  incident_low: createIcon(PRIORITY_COLORS[IncidentPriority.LOW], 10),
  resource: createIcon('#3B82F6', 10),
  hospital: createIcon('#8B5CF6', 14),
  shelter: createIcon('#06B6D4', 12),
  blocked_road: createIcon('#1F2937', 10),
}

function getMarkerIcon(marker: MapMarker): L.DivIcon {
  if (marker.type === 'incident' && marker.priority) {
    return markerIcons[`incident_${marker.priority}`] || markerIcons.incident_medium
  }
  return markerIcons[marker.type] || markerIcons.resource
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

  if (!mounted) {
    return (
      <div className={`${className} bg-muted animate-pulse rounded-xl flex items-center justify-center`}>
        <p className="text-muted-foreground">Cargando mapa...</p>
      </div>
    )
  }

  const filtered = markers.filter((m) => {
    if (!filters) return true
    return filters[m.type === 'blocked_road' ? 'blocked_roads' : `${m.type}s` as keyof MapFilter]
  })

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      className={`${className} rounded-xl z-0`}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} />

      {filtered.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={getMarkerIcon(marker)}
          eventHandlers={{
            click: () => onMarkerClick?.(marker),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{marker.title}</p>
              <p className="text-gray-500 capitalize">{marker.type}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
