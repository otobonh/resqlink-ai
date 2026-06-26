import OpenAI from 'openai'
import { IncidentPriority } from '@/domain/enums'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function classifyPriority(description: string, category: string, affectedPeople: number): Promise<IncidentPriority> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `You are an emergency triage AI. Classify the priority of an incident as one of: critical, high, medium, low.
Rules:
- critical: immediate life threat, trapped people, active fire, structural collapse with people inside
- high: injuries needing medical attention, large groups affected (>10), infrastructure damage
- medium: displacement, resource needs, minor injuries
- low: property damage only, non-urgent needs
Respond with ONLY the priority level word.`,
      },
      {
        role: 'user',
        content: `Category: ${category}\nAffected people: ${affectedPeople}\nDescription: ${description}`,
      },
    ],
  })

  const result = response.choices[0]?.message?.content?.trim().toLowerCase()
  if (result && Object.values(IncidentPriority).includes(result as IncidentPriority)) {
    return result as IncidentPriority
  }
  return affectedPeople > 10 ? IncidentPriority.HIGH : IncidentPriority.MEDIUM
}

export async function detectDuplicates(
  newDescription: string,
  existingIncidents: { id: string; description: string; address: string }[]
): Promise<string[]> {
  if (existingIncidents.length === 0) return []

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `You detect duplicate emergency reports. Given a new report and existing ones, return IDs of likely duplicates as a JSON array. If none, return [].`,
      },
      {
        role: 'user',
        content: `New report: ${newDescription}\n\nExisting:\n${existingIncidents.map((i) => `ID:${i.id} - ${i.address} - ${i.description}`).join('\n')}`,
      },
    ],
  })

  try {
    return JSON.parse(response.choices[0]?.message?.content || '[]')
  } catch {
    return []
  }
}

export async function summarizeIncident(description: string, updates: string[]): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      {
        role: 'system',
        content: 'Summarize the emergency incident in 2-3 sentences in Spanish. Include current status and key details.',
      },
      {
        role: 'user',
        content: `Description: ${description}\nUpdates: ${updates.join('; ')}`,
      },
    ],
  })

  return response.choices[0]?.message?.content || description
}

export async function recommendResources(
  category: string,
  affectedPeople: number,
  description: string
): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'Given an emergency, recommend resource types needed. Return a JSON array of resource type strings from: food, water, medicine, clothing, shelter, transport, equipment, personnel, blood, other.',
      },
      {
        role: 'user',
        content: `Category: ${category}, Affected: ${affectedPeople}, Description: ${description}`,
      },
    ],
  })

  try {
    return JSON.parse(response.choices[0]?.message?.content || '[]')
  } catch {
    return ['water', 'food', 'medicine']
  }
}
