'use client'

import { AuthProvider } from '@/presentation/providers/auth-provider'
import { Sidebar } from '@/presentation/components/layout/sidebar'
import { Header } from '@/presentation/components/layout/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
