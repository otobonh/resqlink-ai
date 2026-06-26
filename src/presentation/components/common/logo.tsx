'use client'

import { Heart } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 20, text: 'text-lg' },
  md: { icon: 28, text: 'text-2xl' },
  lg: { icon: 40, text: 'text-4xl' },
}

export function Logo({ size = 'md' }: LogoProps) {
  const s = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Heart
          size={s.icon}
          className="text-red-500 fill-red-500"
          strokeWidth={2.5}
        />
        <div className="absolute inset-0 animate-ping">
          <Heart
            size={s.icon}
            className="text-red-500 opacity-30"
            strokeWidth={2.5}
          />
        </div>
      </div>
      <span className={`${s.text} font-bold tracking-tight`}>
        Res<span className="text-red-500">Q</span>Link
        <span className="text-blue-500 ml-1 font-light">AI</span>
      </span>
    </div>
  )
}
