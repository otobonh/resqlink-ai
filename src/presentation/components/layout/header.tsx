'use client'

import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/presentation/providers/auth-provider'
import Link from 'next/link'

export function Header() {
  const { profile, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 md:pl-72">
      <div />

      <div className="flex items-center gap-3">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {profile?.full_name?.charAt(0) || <User size={16} />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link href="/settings">Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-destructive">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
