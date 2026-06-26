import { NextRequest, NextResponse } from 'next/server'
import { recommendResources } from '@/infrastructure/ai/openai'

export async function POST(request: NextRequest) {
  try {
    const { category, affected_people, description } = await request.json()

    if (!category || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const resources = await recommendResources(category, affected_people || 1, description)
    return NextResponse.json({ resources })
  } catch (error) {
    console.error('AI recommend error:', error)
    return NextResponse.json({ error: 'Recommendation failed' }, { status: 500 })
  }
}
