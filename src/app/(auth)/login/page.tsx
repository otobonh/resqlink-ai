'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/presentation/components/common/logo'
import { createClient } from '@/infrastructure/supabase/client'
import { toast } from 'sonner'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) throw error
      router.push('/dashboard')
    } catch (err: unknown) {
      toast.error('Error al iniciar sesión', {
        description: err instanceof Error ? err.message : 'Verifica tus credenciales',
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
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="h-12 pl-10 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 pl-10 rounded-xl"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl">
              {loading && <Loader2 className="animate-spin mr-2" size={18} />}
              Entrar
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
