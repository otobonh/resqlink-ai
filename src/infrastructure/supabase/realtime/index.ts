import { createClient } from '@/infrastructure/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

type RealtimeCallback = (payload: { eventType: string; new: unknown; old: unknown }) => void

export function subscribeToTable(
  table: string,
  callback: RealtimeCallback
): RealtimeChannel {
  const supabase = createClient()

  return supabase
    .channel(`${table}-changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => callback(payload as unknown as Parameters<RealtimeCallback>[0])
    )
    .subscribe()
}

export function unsubscribe(channel: RealtimeChannel) {
  const supabase = createClient()
  supabase.removeChannel(channel)
}
