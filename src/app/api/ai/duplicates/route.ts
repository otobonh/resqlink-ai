import { NextRequest, NextResponse } from 'next/server'
import { detectDuplicates } from '@/infrastructure/ai/openai'

export async function POST(request: NextRequest) {
  try {
    const { description, existing_incidents } = await request.json()

    if (!description) {
      return NextResponse.json({ error: 'Missing description' }, { status: 400 })
    }

    const duplicates = await detectDuplicates(description, existing_incidents || [])
    return NextResponse.json({ duplicates })
  } catch (error) {
    console.error('AI duplicates error:', error)
    return NextResponse.json({ error: 'Detection failed' }, { status: 500 })
  }
}
