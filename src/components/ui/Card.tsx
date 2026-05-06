'use client'

import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-[#1a1a2e] border border-[#2d2d44] rounded-xl',
        hover && 'transition-all duration-300 hover:border-[#e94560] hover:shadow-lg hover:shadow-[#e94560]/10',
        {
          'p-0': padding === 'none',
          'p-3': padding === 'sm',
          'p-5': padding === 'md',
          'p-6': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}