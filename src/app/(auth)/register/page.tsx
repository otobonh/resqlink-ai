'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Phone, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Logo } from '@/presentation/components/common/logo'
import { createClient } from '@/infrastructure/supabase/client'
import { toast } from 'sonner'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'citizen',
  })
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            phone: form.phone,
            role: form.role,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        await supabase.from('users').insert({
          id: data.user.id,
          email: form.email,
          full_name: form.full_name,
          phone: form.phone,
          role: form.role,
        })
      }

      toast.success('Cuenta creada', {
        description: 'Bienvenido a ResQLink AI',
      })
      router.push('/dashboard')
    } catch (err: unknown) {
      toast.error('Error al registrarse', {
        description: err instanceof Error ? err.message : 'Intenta de nuevo',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <CardTitle>Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  value={form.full_name}
                  onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                  placeholder="Tu nombre"
                  className="h-12 pl-10 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="tu@email.com"
                  className="h-12 pl-10 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+57 300 123 4567"
                  className="h-12 pl-10 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                  className="h-12 pl-10 rounded-xl"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v ?? 'citizen' }))}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Ciudadano</SelectItem>
                  <SelectItem value="volunteer">Voluntario</SelectItem>
                  <SelectItem value="organization">Organización</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl">
              {loading && <Loader2 className="animate-spin mr-2" size={18} />}
              Crear cuenta
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
