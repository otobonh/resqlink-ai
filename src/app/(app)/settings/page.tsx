'use client'

import { useState } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/presentation/providers/auth-provider'
import { createClient } from '@/infrastructure/supabase/client'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { profile } = useAuth()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!profile) return
    setLoading(true)
    try {
      const supabase = createClient()
      await supabase
        .from('users')
        .update({ full_name: fullName, phone, updated_at: new Date().toISOString() })
        .eq('id', profile.id)

      toast.success('Perfil actualizado')
    } catch {
      toast.error('Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra tu perfil</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email || ''} disabled className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Input value={profile?.role || ''} disabled className="h-12 rounded-xl capitalize" />
          </div>
          <Button onClick={handleSave} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Guardar cambios
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
