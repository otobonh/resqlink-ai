-- Social feed items (tweets from X via RSS proxy)
CREATE TABLE social_feed_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL DEFAULT 'x',
  author_name TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  original_url TEXT NOT NULL,
  search_query TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_social_feed_published ON social_feed_items (published_at DESC);
CREATE INDEX idx_social_feed_query ON social_feed_items (search_query);

-- RLS: anyone can read
ALTER TABLE social_feed_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social feed" ON social_feed_items FOR SELECT USING (true);
CREATE POLICY "Service insert social feed" ON social_feed_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update social feed" ON social_feed_items FOR UPDATE USING (true);
CREATE POLICY "Service delete social feed" ON social_feed_items FOR DELETE USING (true);
