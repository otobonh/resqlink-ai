import type { Config } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"

export default async () => {
  const appUrl = process.env.URL || 'https://resqlink-ai.netlify.app'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // 1. Sync news feed via existing API route
  try {
    const res = await fetch(`${appUrl}/api/social-feed/sync`)
    const data = await res.json()
    console.log('Feed sync:', data)
  } catch (err) {
    console.error('Feed sync failed:', err)
  }

  // 2. Sync USGS earthquakes + extract figures directly
  const supabase = createClient(supabaseUrl, supabaseKey)
  let incidentsCreated = 0

  // Fetch USGS earthquakes for Venezuela region
  try {
    const usgsRes = await fetch(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=1&maxlatitude=13&minlongitude=-74&maxlongitude=-59&minmagnitude=4&orderby=time&limit=10',
      { signal: AbortSignal.timeout(10_000) }
    )
    if (usgsRes.ok) {
      const json = await usgsRes.json()
      const earthquakes = json.features || []

      for (const eq of earthquakes) {
        const props = eq.properties
        const coords = eq.geometry?.coordinates
        if (!coords || props.mag < 4) continue

        const eqTitle = `Sismo M${props.mag} - ${props.place || 'Venezuela'}`
        const { data: existing } = await supabase
          .from('incidents')
          .select('id')
          .ilike('title', `%Sismo M${props.mag}%`)
          .limit(1)

        if (existing && existing.length > 0) continue

        const { error } = await supabase.from('incidents').insert({
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
        if (!error) incidentsCreated++
      }
      console.log('USGS:', earthquakes.length, 'earthquakes,', incidentsCreated, 'new incidents')
    }
  } catch (err) {
    console.error('USGS fetch failed:', err)
  }

  // Extract death/affected figures from news
  try {
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
        await supabase.from('incidents')
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
          description: `Cifra de fallecidos actualizada a ${bestDeaths.toLocaleString()}. Última actualización: ${new Date().toISOString()}.`,
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
      }
    }

    console.log('Stats extracted - Deaths:', bestDeaths, 'Affected:', bestAffected)
  } catch (err) {
    console.error('Stats extraction failed:', err)
  }
}

export const config: Config = {
  schedule: "@hourly",
}
