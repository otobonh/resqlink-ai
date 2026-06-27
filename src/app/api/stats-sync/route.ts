import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface NewsItem {
  content: string
  author_name: string
  published_at: string
}

interface ExtractedStats {
  deaths: number | null
  affected: number | null
  rescued: number | null
  shelters: number | null
  magnitude: string | null
}

function extractNumbers(text: string): ExtractedStats {
  const stats: ExtractedStats = {
    deaths: null,
    affected: null,
    rescued: null,
    shelters: null,
    magnitude: null,
  }

  const normalize = (s: string) => s.toLowerCase().replace(/,/g, '').replace(/\./g, '')

  const deathPatterns = [
    /(\d[\d,.]*)\s*(?:muert[oa]s|fallecid[oa]s|killed|dead|deaths|víctimas\s*mortales|fatalities)/i,
    /(?:death\s*toll|cifra\s*de\s*muertos|muertes)\s*(?:asciende\s*a|reaches?|of)?\s*(\d[\d,.]*)/i,
  ]
  for (const p of deathPatterns) {
    const m = text.match(p)
    if (m) {
      const n = parseInt(normalize(m[1] || m[2]))
      if (!isNaN(n) && n > 0) { stats.deaths = n; break }
    }
  }

  const affectedPatterns = [
    /(\d[\d,.]*)\s*(?:million|millones)\s*(?:people|personas)?\s*(?:affected|afectad[oa]s|impactad[oa]s)/i,
    /(?:affected|afectad[oa]s|impactad[oa]s)\s*[:.]?\s*(\d[\d,.]*)\s*(?:million|millones)?/i,
    /up\s*to\s*(\d[\d,.]*)\s*(?:million|millones)/i,
  ]
  for (const p of affectedPatterns) {
    const m = text.match(p)
    if (m) {
      const rawMatch = (m[1] || m[2]).replace(/,/g, '')
      let n = parseFloat(rawMatch)
      if (text.match(/million|millones/i) && n < 1000) n *= 1_000_000
      if (!isNaN(n) && n > 0) { stats.affected = Math.round(n); break }
    }
  }

  const rescuedPatterns = [
    /(\d[\d,.]*)\s*(?:rescued|rescatad[oa]s|salvad[oa]s|extraíd[oa]s)/i,
    /(?:rescued|rescatad[oa]s)\s*[:.]?\s*(\d[\d,.]*)/i,
  ]
  for (const p of rescuedPatterns) {
    const m = text.match(p)
    if (m) {
      const n = parseInt(normalize(m[1] || m[2]))
      if (!isNaN(n) && n > 0) { stats.rescued = n; break }
    }
  }

  return stats
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchNewsFromSupabase(supabase: any): Promise<NewsItem[]> {
  const { data } = await supabase
    .from('social_feed_items')
    .select('content, author_name, published_at')
    .order('published_at', { ascending: false })
    .limit(50)

  return (data || []) as NewsItem[]
}

async function fetchUSGSEarthquakes() {
  try {
    const res = await fetch(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=1&maxlatitude=13&minlongitude=-74&maxlongitude=-59&minmagnitude=4&orderby=time&limit=10',
      { signal: AbortSignal.timeout(10_000) }
    )
    if (!res.ok) return []
    const json = await res.json()
    return json.features || []
  } catch {
    return []
  }
}

export async function GET() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const [newsItems, earthquakes] = await Promise.all([
    fetchNewsFromSupabase(supabase),
    fetchUSGSEarthquakes(),
  ])

  let bestStats: ExtractedStats = {
    deaths: null,
    affected: null,
    rescued: null,
    shelters: null,
    magnitude: null,
  }

  for (const item of newsItems) {
    const stats = extractNumbers(item.content)

    if (stats.deaths && (!bestStats.deaths || stats.deaths > bestStats.deaths)) {
      bestStats.deaths = stats.deaths
    }
    if (stats.affected && (!bestStats.affected || stats.affected > bestStats.affected)) {
      bestStats.affected = stats.affected
    }
    if (stats.rescued && (!bestStats.rescued || stats.rescued > bestStats.rescued)) {
      bestStats.rescued = stats.rescued
    }
  }

  let incidentsCreated = 0

  // Create incidents from USGS earthquakes (real seismic events)
  for (const eq of earthquakes) {
    const props = eq.properties
    const coords = eq.geometry?.coordinates
    if (!coords || props.mag < 4) continue

    const externalId = `usgs-${eq.id}`
    const { data: existing } = await supabase
      .from('incidents')
      .select('id')
      .eq('title', externalId)
      .limit(1)

    if (existing && existing.length > 0) continue

    const { error } = await supabase.from('incidents').insert({
      reporter_id: '00000000-0000-0000-0000-000000000000',
      title: `Sismo M${props.mag} - ${props.place || 'Venezuela'}`,
      description: `Magnitud ${props.mag} detectado por USGS. ${props.place || ''}. Profundidad: ${coords[2]}km.`,
      category: 'structural',
      priority: props.mag >= 6 ? 'critical' : props.mag >= 5 ? 'high' : 'medium',
      status: 'pending',
      location: `POINT(${coords[0]} ${coords[1]})`,
      address: props.place || 'Venezuela',
      affected_people: Math.round(props.mag >= 7 ? 5_000_000 : props.mag >= 6 ? 500_000 : 50_000),
      photos: [],
    })

    if (!error) incidentsCreated++
  }

  // Update affected_people on existing critical incidents with latest official figures
  if (bestStats.affected && bestStats.affected > 0) {
    const { data: criticalIncidents } = await supabase
      .from('incidents')
      .select('id, affected_people')
      .eq('priority', 'critical')
      .order('created_at', { ascending: false })
      .limit(1)

    if (criticalIncidents && criticalIncidents.length > 0) {
      const current = criticalIncidents[0].affected_people || 0
      if (bestStats.affected > current) {
        await supabase
          .from('incidents')
          .update({
            affected_people: bestStats.affected,
            updated_at: new Date().toISOString(),
          })
          .eq('id', criticalIncidents[0].id)
      }
    }
  }

  // Create incident from ReliefWeb reports with death toll updates
  if (bestStats.deaths) {
    const deathTitle = `Víctimas confirmadas: ${bestStats.deaths.toLocaleString()} fallecidos`
    const { data: existingDeath } = await supabase
      .from('incidents')
      .select('id, description')
      .ilike('title', '%Víctimas confirmadas%')
      .limit(1)

    if (existingDeath && existingDeath.length > 0) {
      await supabase
        .from('incidents')
        .update({
          title: deathTitle,
          description: `Cifra oficial de fallecidos actualizada a ${bestStats.deaths.toLocaleString()} según fuentes de OCHA/ReliefWeb. Última actualización: ${new Date().toISOString()}.`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingDeath[0].id)
    } else {
      await supabase.from('incidents').insert({
        reporter_id: '00000000-0000-0000-0000-000000000000',
        title: deathTitle,
        description: `Cifra oficial de fallecidos: ${bestStats.deaths.toLocaleString()} según fuentes de OCHA/ReliefWeb.`,
        category: 'other',
        priority: 'critical',
        status: 'in_progress',
        location: 'POINT(-66.9036 10.4806)',
        address: 'Venezuela (Nacional)',
        affected_people: bestStats.deaths,
        photos: [],
      })
      incidentsCreated++
    }
  }

  return NextResponse.json({
    success: true,
    stats_extracted: bestStats,
    news_analyzed: newsItems.length,
    usgs_earthquakes: earthquakes.length,
    incidents_created: incidentsCreated,
    timestamp: new Date().toISOString(),
  })
}
