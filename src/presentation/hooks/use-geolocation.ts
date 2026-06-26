'use client'

import { useState, useCallback } from 'react'
import type { GeoPoint } from '@/domain/entities'

interface GeolocationState {
  location: GeoPoint | null
  loading: boolean
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocalización no soportada' }))
      return
    }

    setState((s) => ({ ...s, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
          error: null,
        })
      },
      (err) => {
        setState({
          location: null,
          loading: false,
          error:
            err.code === 1
              ? 'Permiso de ubicación denegado'
              : 'No se pudo obtener la ubicación',
        })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  return { ...state, requestLocation }
}
