'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Send, Loader2, HandHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGeolocation } from '@/presentation/hooks/use-geolocation'
import { RESOURCE_TYPE_LABELS } from '@/shared/constants'
import { slideUp } from '@/presentation/animations'
import type { ResourceFormData } from '@/shared/types'

interface ResourceFormProps {
  onSubmit: (data: ResourceFormData) => Promise<void>
  loading?: boolean
}

export function ResourceForm({ onSubmit, loading }: ResourceFormProps) {
  const { location, loading: geoLoading, requestLocation } = useGeolocation()
  const [form, setForm] = useState<ResourceFormData>({
    type: '',
    name: '',
    description: '',
    quantity: 1,
    unit: '',
    address: '',
    lat: 0,
    lng: 0,
    contact_phone: '',
  })

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  useEffect(() => {
    if (location) {
      setForm((f) => ({ ...f, lat: location.lat, lng: location.lng }))
    }
  }, [location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  const isValid = form.type && form.name && form.address && form.contact_phone

  return (
    <motion.div {...slideUp}>
      <Card className="max-w-lg mx-auto border-blue-500/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <HandHeart size={24} />
            Ofrecer ayuda
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Registra los recursos que puedes ofrecer
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Tipo de recurso *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v ?? '' }))}
              >
                <SelectTrigger className="h-14 text-base rounded-xl">
                  <SelectValue placeholder="¿Qué ofreces?" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RESOURCE_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="text-base py-3">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nombre / Descripción corta *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ej: 100 litros de agua potable"
                className="h-14 text-base rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Cantidad</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quantity: parseInt(e.target.value) || 1 }))
                  }
                  className="h-14 text-base rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Unidad</Label>
                <Input
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  placeholder="litros, kg, unidades"
                  className="h-14 text-base rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ubicación *</Label>
              <div className="flex gap-2">
                <Input
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Dirección de entrega"
                  className="h-14 text-base rounded-xl flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 w-14 rounded-xl shrink-0"
                  onClick={requestLocation}
                  disabled={geoLoading}
                >
                  <MapPin size={20} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Teléfono de contacto *</Label>
              <Input
                type="tel"
                value={form.contact_phone}
                onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
                placeholder="+57 300 123 4567"
                className="h-14 text-base rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Detalles adicionales</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Horarios de disponibilidad, condiciones, etc."
                className="min-h-[80px] text-base rounded-xl resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid || loading}
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={24} />
              ) : (
                <Send className="mr-2" size={24} />
              )}
              Registrar recurso
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
