'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSocialFeedItems } from '@/infrastructure/supabase/queries/social-feed'
import { useRealtime } from '@/presentation/hooks/use-realtime'
import type { SocialFeedItem } from '@/domain/entities'

const SEARCH_QUERIES = [
  'terremoto venezuela',
  'sismo venezuela ayuda',
  'venezuela earthquake',
  'emergencia venezuela',
]

export function XFeed() {
  const [items, setItems] = useState<SocialFeedItem[]>([])
  const [activeQuery, setActiveQuery] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  const loadItems = useCallback(async () => {
    const data = await getSocialFeedItems(50)
    setItems(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  useRealtime('social_feed_items', () => loadItems(), () => loadItems())

  const triggerSync = async () => {
    setSyncing(true)
    try {
      await fetch('/api/social-feed/sync')
      await loadItems()
    } catch (err) {
      console.error('Sync failed:', err)
    } finally {
      setSyncing(false)
    }
  }

  // Auto-sync each hour
  useEffect(() => {
    triggerSync()
    const interval = setInterval(triggerSync, 60 * 60 * 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = activeQuery
    ? items.filter((i) => i.search_query === activeQuery)
    : items

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 60) return `hace ${diffMin}m`
    const diffH = Math.floor(diffMin / 60)
    if (diffH < 24) return `hace ${diffH}h`
    return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
          </svg>
          Noticias en vivo — Venezuela
        </h2>
        <button
          onClick={triggerSync}
          disabled={syncing}
          className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
        >
          {syncing ? 'Sincronizando...' : 'Actualizar'}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveQuery(null)}
          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
            activeQuery === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
          }`}
        >
          Todos
        </button>
        {SEARCH_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => setActiveQuery(activeQuery === q ? null : q)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              activeQuery === q
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay publicaciones aún.</p>
            <button onClick={triggerSync} className="text-primary text-sm mt-2 underline">
              Sincronizar ahora
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {filtered.map((item) => (
              <a
                key={item.id}
                href={item.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {item.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm truncate">{item.author_name}</span>
                      <span className="text-xs text-muted-foreground">{item.author_handle}</span>
                      <span className="text-xs text-muted-foreground">· {formatTime(item.published_at)}</span>
                    </div>
                    <p className="text-sm mt-1 text-foreground/90 line-clamp-3">{item.content}</p>
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {item.search_query}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <p className="text-[11px] text-muted-foreground text-right">
          {filtered.length} publicaciones · Última sync:{' '}
          {formatTime(items[0].fetched_at)}
        </p>
      )}
    </div>
  )
}
