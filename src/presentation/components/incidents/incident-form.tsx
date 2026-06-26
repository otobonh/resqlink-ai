'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Camera, Send, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGeolocation } from '@/presentation/hooks/use-geolocation'
import { IncidentCategory } from '@/domain/enums'
import { INCIDENT_CATEGORY_LABELS, MAX_PHOTOS_PER_INCIDENT } from '@/shared/constants'
import { slideUp } from '@/presentation/animations'
import type { IncidentFormData } from '@/shared/types'

interface IncidentFormProps {
  onSubmit: (data: IncidentFormData) => Promise<void>
  loading?: boolean
}

export function IncidentForm({ onSubmit, loading }: IncidentFormProps) {
  const { location, loading: geoLoading, requestLocation } = useGeolocation()
  const [form, setForm] = useState<IncidentFormData>({
    category: '',
    description: '',
    address: '',
    affected_people: 1,
    lat: 0,
    lng: 0,
    photos: [],
  })

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  useEffect(() => {
    if (location) {
      setForm((f) => ({ ...f, lat: location.lat, lng: location.lng }))
    }
  }, [location])

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_PHOTOS_PER_INCIDENT)
    setForm((f) => ({ ...f, photos: files }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  const isValid = form.category && form.description && form.address && form.lat !== 0

  return (
    <motion.div {...slideUp}>
      <Card className="max-w-lg mx-auto border-red-500/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={24} />
            Reportar emergencia
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Completa la información lo más rápido posible
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Tipo de emergencia *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v ?? '' }))}
              >
                <SelectTrigger className="h-14 text-base rounded-xl">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INCIDENT_CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="text-base py-3">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ubicación *</Label>
              <div className="flex gap-2">
                <Input
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Dirección o referencia"
                  className="h-14 text-base rounded-xl flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 w-14 rounded-xl shrink-0"
                  onClick={requestLocation}
                  disabled={geoLoading}
                >
                  {geoLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <MapPin size={20} />
                  )}
                </Button>
              </div>
              {location && (
                <p className="text-xs text-green-600">
                  GPS: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Personas afectadas *</Label>
              <Input
                type="number"
                min={1}
                value={form.affected_people}
                onChange={(e) =>
                  setForm((f) => ({ ...f, affected_people: parseInt(e.target.value) || 1 }))
                }
                className="h-14 text-base rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe la situación brevemente"
                className="min-h-[100px] text-base rounded-xl resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Fotos (opcional)</Label>
              <label className="flex items-center justify-center gap-2 h-14 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors">
                <Camera size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {form.photos.length > 0
                    ? `${form.photos.length} foto(s)`
                    : 'Tomar o subir foto'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotos}
                />
              </label>
            </div>

            <Button
              type="submit"
              disabled={!isValid || loading}
              className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 rounded-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={24} />
              ) : (
                <Send className="mr-2" size={24} />
              )}
              Enviar reporte
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
