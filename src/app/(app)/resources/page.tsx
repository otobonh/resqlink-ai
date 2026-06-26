'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/presentation/components/common/loading'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import { getResources } from '@/infrastructure/supabase/queries/resources'
import { RESOURCE_TYPE_LABELS } from '@/shared/constants'
import type { Resource } from '@/domain/entities'
import Link from 'next/link'

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>('')

  const loadResources = useCallback(async () => {
    try {
      const data = await getResources({
        type: typeFilter || undefined,
      })
      setResources(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [typeFilter])

  useEffect(() => {
    loadResources()
  }, [loadResources])

  useRealtime('resources', () => loadResources(), () => loadResources())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recursos</h1>
          <p className="text-muted-foreground">{resources.length} disponibles</p>
        </div>
        <Link href="/resources/new">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus size={18} />
            Ofrecer recurso
          </Button>
        </Link>
      </div>

      <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? '')}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Tipo de recurso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(RESOURCE_TYPE_LABELS).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-blue-500" />
                    <h3 className="font-semibold text-sm">{resource.name}</h3>
                  </div>
                  <Badge variant={resource.available ? 'default' : 'secondary'}>
                    {resource.available ? 'Disponible' : 'Agotado'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {RESOURCE_TYPE_LABELS[resource.type as keyof typeof RESOURCE_TYPE_LABELS]} · {resource.quantity} {resource.unit}
                </p>
                <p className="text-xs text-muted-foreground">{resource.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{resource.contact_phone}</p>
              </CardContent>
            </Card>
          ))}
          {resources.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-16">
              No hay recursos registrados
            </p>
          )}
        </div>
      )}
    </div>
  )
}
