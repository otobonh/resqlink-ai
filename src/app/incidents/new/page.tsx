'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { IncidentForm } from '@/presentation/components/incidents/incident-form'
import { createIncident } from '@/infrastructure/supabase/queries/incidents'
import { uploadPhotos } from '@/infrastructure/storage/upload'
import { createClient } from '@/infrastructure/supabase/client'
import type { IncidentFormData } from '@/shared/types'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewIncidentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: IncidentFormData) => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const reporterId = user?.id || 'anonymous'

      const photoUrls = await uploadPhotos(data.photos)

      const incident = await createIncident(data, reporterId, photoUrls)

      try {
        await fetch('/api/ai/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: data.description,
            category: data.category,
            affected_people: data.affected_people,
          }),
        })
          .then((r) => r.json())
          .then(async (res) => {
            if (res.priority && res.priority !== 'medium') {
              const { updateIncident } = await import('@/infrastructure/supabase/queries/incidents')
              await updateIncident(incident.id, { priority: res.priority } as never)
            }
          })
      } catch {
        // AI classification is best-effort
      }

      toast.success('Reporte enviado', {
        description: 'Tu emergencia ha sido registrada. Ayuda en camino.',
      })
      router.push('/map')
    } catch (err) {
      console.error(err)
      toast.error('Error al enviar', {
        description: 'Intenta de nuevo. Si persiste, llama al 123.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          Volver
        </Link>
        <IncidentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
