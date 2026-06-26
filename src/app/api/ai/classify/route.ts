import { NextRequest, NextResponse } from 'next/server'
import { classifyPriority } from '@/infrastructure/ai/openai'

export async function POST(request: NextRequest) {
  try {
    const { description, category, affected_people } = await request.json()

    if (!description || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const priority = await classifyPriority(description, category, affected_people || 1)
    return NextResponse.json({ priority })
  } catch (error) {
    console.error('AI classify error:', error)
    return NextResponse.json({ error: 'Classification failed' }, { status: 500 })
  }
}
