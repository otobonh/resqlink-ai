import { createClient } from '@/infrastructure/supabase/client'
import type { SocialFeedItem } from '@/domain/entities'

export async function getSocialFeedItems(limit = 30): Promise<SocialFeedItem[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('social_feed_items')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching social feed:', error)
    return []
  }

  return data as SocialFeedItem[]
}

export async function getLastFetchTime(): Promise<string | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('social_feed_items')
    .select('fetched_at')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .single()

  return data?.fetched_at ?? null
}
