'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResourceForm } from '@/presentation/components/resources/resource-form'
import { createResource } from '@/infrastructure/supabase/queries/resources'
import { createClient } from '@/infrastructure/supabase/client'
import type { ResourceFormData } from '@/shared/types'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewResourcePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: ResourceFormData) => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      await createResource({
        provider_id: user?.id || 'anonymous',
        organization_id: null,
        type: data.type as never,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        unit: data.unit,
        location: { lat: data.lat, lng: data.lng },
        address: data.address,
        available: true,
        contact_phone: data.contact_phone,
      })

      toast.success('Recurso registrado', {
        description: '¡Gracias por tu ayuda! Tu recurso ya está visible.',
      })
      router.push('/map')
    } catch (err) {
      console.error(err)
      toast.error('Error al registrar', {
        description: 'Intenta de nuevo.',
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
        <ResourceForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
