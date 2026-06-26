'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex flex-col items-center gap-4"
      >
        <Heart size={48} className="text-red-500 fill-red-500" />
        <p className="text-muted-foreground text-lg">Cargando...</p>
      </motion.div>
    </div>
  )
}

export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  )
}
