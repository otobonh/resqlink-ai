'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  Package,
  Radio,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/presentation/components/common/logo'
import { useAuth } from '@/presentation/providers/auth-provider'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/map', label: 'Mapa', icon: MapPin },
  { href: '/incidents', label: 'Incidentes', icon: AlertTriangle },
  { href: '/resources', label: 'Recursos', icon: Package },
  { href: '/operations', label: 'Operaciones', icon: Radio },
  { href: '/settings', label: 'Configuración', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Logo size="sm" />
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={signOut}
            >
              <LogOut size={20} />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
