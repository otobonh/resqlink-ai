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

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

    const sourceMatch = itemXml.match(/<source[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/source>/)
    const sourceAttr = itemXml.match(/<source[^>]*url="([^"]*)"/)

    const rawTitle = get('title')
    const cleanTitle = stripHtml(rawTitle)

    items.push({
      title: cleanTitle,
      link: get('link') || (sourceAttr ? sourceAttr[1] : ''),
      pubDate: get('pubDate'),
      creator: sourceMatch ? stripHtml(sourceMatch[1]) : get('dc:creator') || get('creator') || '',
      description: cleanTitle,
    })
  }

  return items
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
      .upsert(rows, { onConflict: 'external_id', ignoreDuplicates: false })
      .select('id')

    if (error) {
      console.error(`Error inserting feed for "${query}":`, error)
    } else {
      totalInserted += data?.length || 0
    }
  }

  // === STATS SYNC: USGS earthquakes + extract figures from news ===
  let incidentsCreated = 0

  // Fetch USGS earthquakes for Venezuela region
  let earthquakes: any[] = [] // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const usgsRes = await fetch(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=1&maxlatitude=13&minlongitude=-74&maxlongitude=-59&minmagnitude=4&orderby=time&limit=10',
      { signal: AbortSignal.timeout(10_000) }
    )
    if (usgsRes.ok) {
      const json = await usgsRes.json()
      earthquakes = json.features || []
    }
  } catch { /* USGS unavailable */ }

  // Create incidents from real seismic events
  for (const eq of earthquakes) {
    const props = eq.properties
    const coords = eq.geometry?.coordinates
    if (!coords || props.mag < 4) continue

    const eqTitle = `Sismo M${props.mag} - ${props.place || 'Venezuela'}`
    const { data: existing } = await supabase
      .from('incidents')
      .select('id')
      .ilike('title', `%Sismo M${props.mag}%${(props.place || 'Venezuela').slice(0, 20)}%`)
      .limit(1)

    if (existing && existing.length > 0) continue

    const { error: eqErr } = await supabase.from('incidents').insert({
      reporter_id: '00000000-0000-0000-0000-000000000000',
      title: eqTitle,
      description: `Magnitud ${props.mag} detectado por USGS. ${props.place || ''}. Profundidad: ${coords[2]}km.`,
      category: 'structural',
      priority: props.mag >= 6 ? 'critical' : props.mag >= 5 ? 'high' : 'medium',
      status: 'pending',
      location: `POINT(${coords[0]} ${coords[1]})`,
      address: props.place || 'Venezuela',
      affected_people: Math.round(props.mag >= 7 ? 5_000_000 : props.mag >= 6 ? 500_000 : 50_000),
      photos: [],
    })
    if (!eqErr) incidentsCreated++
  }

  // Extract death/affected figures from collected news
  const { data: newsItems } = await supabase
    .from('social_feed_items')
    .select('content')
    .order('published_at', { ascending: false })
    .limit(50)

  let bestDeaths: number | null = null
  let bestAffected: number | null = null

  for (const item of (newsItems || [])) {
    const text = item.content || ''
    const deathMatch = text.match(/(\d[\d,.]*)\s*(?:muert[oa]s|fallecid[oa]s|killed|dead|deaths|fatalities)/i)
      || text.match(/(?:death\s*toll|cifra\s*de\s*muertos)\s*(?:asciende\s*a|reaches?)?\s*(\d[\d,.]*)/i)
    if (deathMatch) {
      const n = parseInt((deathMatch[1] || deathMatch[2]).replace(/[,.]/g, ''))
      if (!isNaN(n) && n > 0 && (!bestDeaths || n > bestDeaths)) bestDeaths = n
    }

    const affectedMatch = text.match(/(\d[\d,.]*)\s*(?:million|millones)\s*(?:people|personas)?\s*(?:affected|afectad[oa]s)/i)
      || text.match(/up\s*to\s*(\d[\d,.]*)\s*(?:million|millones)/i)
    if (affectedMatch) {
      let n = parseFloat((affectedMatch[1] || affectedMatch[2]).replace(/,/g, ''))
      if (n < 1000) n *= 1_000_000
      if (!isNaN(n) && n > 0 && (!bestAffected || n > bestAffected)) bestAffected = Math.round(n)
    }
  }

  // Update critical incident with latest affected figure
  if (bestAffected && bestAffected > 0) {
    const { data: critical } = await supabase
      .from('incidents')
      .select('id, affected_people')
      .eq('priority', 'critical')
      .order('created_at', { ascending: false })
      .limit(1)

    if (critical && critical.length > 0 && bestAffected > (critical[0].affected_people || 0)) {
      await supabase
        .from('incidents')
        .update({ affected_people: bestAffected, updated_at: new Date().toISOString() })
        .eq('id', critical[0].id)
    }
  }

  // Update or create death toll incident
  if (bestDeaths) {
    const deathTitle = `Víctimas confirmadas: ${bestDeaths.toLocaleString()} fallecidos`
    const { data: existingDeath } = await supabase
      .from('incidents')
      .select('id')
      .ilike('title', '%Víctimas confirmadas%')
      .limit(1)

    if (existingDeath && existingDeath.length > 0) {
      await supabase.from('incidents').update({
        title: deathTitle,
        description: `Cifra de fallecidos actualizada a ${bestDeaths.toLocaleString()} según fuentes de noticias. Última actualización: ${new Date().toISOString()}.`,
        updated_at: new Date().toISOString(),
      }).eq('id', existingDeath[0].id)
    } else {
      await supabase.from('incidents').insert({
        reporter_id: '00000000-0000-0000-0000-000000000000',
        title: deathTitle,
        description: `Cifra de fallecidos: ${bestDeaths.toLocaleString()} según fuentes de noticias.`,
        category: 'other', priority: 'critical', status: 'in_progress',
        location: 'POINT(-66.9036 10.4806)', address: 'Venezuela (Nacional)',
        affected_people: bestDeaths, photos: [],
      })
      incidentsCreated++
    }
  }

  return NextResponse.json({
    success: true,
    feed_inserted: totalInserted,
    usgs_earthquakes: earthquakes.length,
    incidents_created: incidentsCreated,
    stats: { deaths: bestDeaths, affected: bestAffected },
    timestamp: new Date().toISOString(),
  })
}
