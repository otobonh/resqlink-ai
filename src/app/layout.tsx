import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ResQLink AI — Respuesta Humanitaria en Tiempo Real',
  description:
    'Plataforma gratuita de respuesta a emergencias. Reporta incidentes, ofrece ayuda y coordina recursos con IA.',
  manifest: '/manifest.json',
  icons: { apple: '/icons/icon-192.png' },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
