'use client'

import { useEffect } from 'react'
import { subscribeToTable, unsubscribe } from '@/infrastructure/supabase/realtime'

export function useRealtime(
  table: string,
  onInsert?: (record: unknown) => void,
  onUpdate?: (record: unknown) => void,
  onDelete?: (record: unknown) => void
) {
  useEffect(() => {
    const channel = subscribeToTable(table, (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsert?.(payload.new)
          break
        case 'UPDATE':
          onUpdate?.(payload.new)
          break
        case 'DELETE':
          onDelete?.(payload.old)
          break
      }
    })

    return () => {
      unsubscribe(channel)
    }
  }, [table, onInsert, onUpdate, onDelete])
}
