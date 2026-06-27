import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const SEARCH_QUERIES = [
  'terremoto venezuela',
  'sismo venezuela ayuda',
  'venezuela earthquake',
  'emergencia venezuela',
]

interface RSSItem {
  title: string
  link: string
  pubDate: string
  creator: string
  description: string
}

function parseRSSItems(xml: string): RSSItem[] {
  const items: RSSItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const get = (tag: string) => {
      const m = itemXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
      return m ? (m[1] || m[2] || '').trim() : ''
    }

    items.push({
      title: get('title'),
      link: get('link'),
      pubDate: get('pubDate'),
      creator: get('dc:creator') || get('creator') || get('source'),
      description: get('description'),
    })
  }

  return items
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function extractSource(creator: string, link: string): { name: string; handle: string } {
  if (creator.startsWith('@')) return { name: creator.slice(1), handle: creator }

  const twitterMatch = link.match(/x\.com\/(\w+)|twitter\.com\/(\w+)|nitter\.\w+\/(\w+)/)
  if (twitterMatch) {
    const handle = twitterMatch[1] || twitterMatch[2] || twitterMatch[3]
    return { name: handle, handle: `@${handle}` }
  }

  const domainMatch = link.match(/https?:\/\/(?:www\.)?([^/]+)/)
  const domain = domainMatch ? domainMatch[1] : 'web'

  return { name: creator || domain, handle: `@${domain}` }
}

function generateExternalId(link: string, pubDate: string): string {
  return Buffer.from(`${link}:${pubDate}`).toString('base64').slice(0, 64)
}

function buildRSSUrls(query: string): string[] {
  const encoded = encodeURIComponent(query)
  return [
    `https://news.google.com/rss/search?q=${encoded}&hl=es-419&gl=VE&ceid=VE:es-419`,
    `https://news.google.com/rss/search?q=${encoded}&hl=es&gl=CO&ceid=CO:es`,
    `https://rsshub.app/twitter/search/${encoded}`,
  ]
}

async function fetchRSSFeed(query: string): Promise<RSSItem[]> {
  const sources = buildRSSUrls(query)

  for (const url of sources) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'ResQLink-AI/1.0' },
        signal: AbortSignal.timeout(10_000),
      })
      if (!res.ok) continue
      const xml = await res.text()
      const items = parseRSSItems(xml)
      if (items.length > 0) return items.slice(0, 15)
    } catch {
      continue
    }
  }

  return []
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  let totalInserted = 0

  for (const query of SEARCH_QUERIES) {
    const items = await fetchRSSFeed(query)

    const rows = items.map((item) => {
      const src = extractSource(item.creator, item.link)
      return {
      external_id: generateExternalId(item.link, item.pubDate),
      source: item.link.includes('x.com') || item.link.includes('twitter.com') ? 'x' : 'news',
      author_name: src.name,
      author_handle: src.handle,
      author_avatar: null,
      content: stripHtml(item.description || item.title),
      media_url: null,
      original_url: item.link,
      search_query: query,
      published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      fetched_at: new Date().toISOString(),
    }})

    if (rows.length === 0) continue

    const { data, error } = await supabase
      .from('social_feed_items')
      .upsert(rows, { onConflict: 'external_id', ignoreDuplicates: true })
      .select('id')

    if (error) {
      console.error(`Error inserting feed for "${query}":`, error)
    } else {
      totalInserted += data?.length || 0
    }
  }

  return NextResponse.json({
    success: true,
    inserted: totalInserted,
    queries: SEARCH_QUERIES.length,
    timestamp: new Date().toISOString(),
  })
}
