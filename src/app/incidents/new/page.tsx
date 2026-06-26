'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IncidentForm } from '@/presentation/components/incidents/incident-form'
import { createIncident } from '@/infrastructure/supabase/queries/incidents'
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
      await createIncident(data, reporterId)

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
        <Link href="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft size={18} />
            Volver
          </Button>
        </Link>
        <IncidentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
