'use client'

import { Bell, User } from 'lucide-react'
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
        <Link
          href="/notifications"
          className="relative inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-muted transition-colors cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {profile?.full_name?.charAt(0) || <User size={16} />}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">Configuracion</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
              Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
