export interface SocialFeedItem {
  id: string
  external_id: string
  source: string
  author_name: string
  author_handle: string
  author_avatar: string | null
  content: string
  media_url: string | null
  original_url: string
  search_query: string
  published_at: string
  fetched_at: string
  created_at: string
}
