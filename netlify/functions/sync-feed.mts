import type { Config } from "@netlify/functions"

export default async () => {
  const appUrl = process.env.URL || 'https://resqlink-ai.netlify.app'

  try {
    const [feedRes, statsRes] = await Promise.all([
      fetch(`${appUrl}/api/social-feed/sync`),
      fetch(`${appUrl}/api/stats-sync`),
    ])
    const feedData = await feedRes.json()
    const statsData = await statsRes.json()
    console.log('Feed sync:', feedData)
    console.log('Stats sync:', statsData)
  } catch (err) {
    console.error('Sync failed:', err)
  }
}

export const config: Config = {
  schedule: "@hourly",
}
