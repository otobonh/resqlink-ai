'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, HandHeart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/presentation/components/common/logo'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg w-full"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <p className="text-muted-foreground text-lg mb-2">
          Plataforma de respuesta humanitaria
        </p>
        <p className="text-muted-foreground/70 text-sm mb-12">
          Conectamos necesidades con recursos en tiempo real
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link href="/incidents/new" className="block">
              <Button
                size="lg"
                className="w-full h-20 text-xl bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-500/25 active:scale-[0.98] transition-transform"
              >
                <ShieldAlert className="mr-3" size={28} />
                🆘 Necesito ayuda
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <Link href="/resources/new" className="block">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-20 text-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
              >
                <HandHeart className="mr-3" size={28} />
                🤝 Quiero ayudar
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <Link href="/map" className="hover:text-foreground transition-colors">
            Ver mapa
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Iniciar sesión
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-xs text-muted-foreground/50">
          Plataforma gratuita de respuesta a emergencias • Potenciada por IA
        </p>
      </motion.div>
    </div>
  )
}
