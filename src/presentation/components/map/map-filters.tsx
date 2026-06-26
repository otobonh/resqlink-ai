'use client'

import { AlertTriangle, Package, Building2, Home, Construction } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MapFilter } from '@/shared/types'
import { cn } from '@/lib/utils'

interface MapFiltersProps {
  filters: MapFilter
  onChange: (filters: MapFilter) => void
}

const filterButtons = [
  { key: 'incidents' as const, label: 'Emergencias', icon: AlertTriangle, color: 'text-red-500' },
  { key: 'resources' as const, label: 'Recursos', icon: Package, color: 'text-blue-500' },
  { key: 'hospitals' as const, label: 'Hospitales', icon: Building2, color: 'text-purple-500' },
  { key: 'shelters' as const, label: 'Refugios', icon: Home, color: 'text-cyan-500' },
  { key: 'blocked_roads' as const, label: 'Vías bloqueadas', icon: Construction, color: 'text-gray-500' },
]

export function MapFilters({ filters, onChange }: MapFiltersProps) {
  const toggle = (key: keyof MapFilter) => {
    onChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filterButtons.map((f) => (
        <Button
          key={f.key}
          variant={filters[f.key] ? 'default' : 'outline'}
          size="sm"
          className={cn('gap-2 rounded-full', !filters[f.key] && f.color)}
          onClick={() => toggle(f.key)}
        >
          <f.icon size={14} />
          {f.label}
        </Button>
      ))}
    </div>
  )
}
