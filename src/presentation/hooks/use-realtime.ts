'use client'

import { useEffect, useRef } from 'react'
import { subscribeToTable, unsubscribe } from '@/infrastructure/supabase/realtime'

export function useRealtime(
  table: string,
  onInsert?: (record: unknown) => void,
  onUpdate?: (record: unknown) => void,
  onDelete?: (record: unknown) => void
) {
  const onInsertRef = useRef(onInsert)
  const onUpdateRef = useRef(onUpdate)
  const onDeleteRef = useRef(onDelete)

  onInsertRef.current = onInsert
  onUpdateRef.current = onUpdate
  onDeleteRef.current = onDelete

  useEffect(() => {
    const channel = subscribeToTable(table, (payload) => {
      switch (payload.eventType) {
        case 'INSERT':
          onInsertRef.current?.(payload.new)
          break
        case 'UPDATE':
          onUpdateRef.current?.(payload.new)
          break
        case 'DELETE':
          onDeleteRef.current?.(payload.old)
          break
      }
    })

    return () => {
      unsubscribe(channel)
    }
  }, [table])
}
