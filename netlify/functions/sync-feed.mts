import type { Config } from "@netlify/functions"

export default async () => {
  const appUrl = process.env.URL || 'https://resqlink-ai.netlify.app'

  try {
    const res = await fetch(`${appUrl}/api/social-feed/sync`)
    const data = await res.json()
    console.log('Feed sync result:', data)
  } catch (err) {
    console.error('Feed sync failed:', err)
  }
}

export const config: Config = {
  schedule: "@hourly",
}
