'use client'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Users,
  Package,
  UserCheck,
  Home,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { DashboardStats } from '@/domain/entities'
import { staggerContainer, slideUp } from '@/presentation/animations'

interface StatsGridProps {
  stats: DashboardStats
}

const statCards = [
  { key: 'active_incidents' as const, label: 'Incidentes activos', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
  { key: 'affected_people' as const, label: 'Personas afectadas', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { key: 'available_resources' as const, label: 'Recursos disponibles', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { key: 'active_volunteers' as const, label: 'Voluntarios activos', icon: UserCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
  { key: 'shelters' as const, label: 'Refugios', icon: Home, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { key: 'hospitals' as const, label: 'Hospitales', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { key: 'resolved_cases' as const, label: 'Casos resueltos', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
]

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
    >
      {statCards.map((card) => (
        <motion.div key={card.key} variants={slideUp}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`${card.bg} ${card.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                <card.icon size={20} />
              </div>
              <p className="text-2xl font-bold">{stats[card.key].toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
