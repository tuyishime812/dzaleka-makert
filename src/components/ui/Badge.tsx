'use client'

import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-[#2d2d44] text-white': variant === 'default',
          'bg-green-500/20 text-green-400': variant === 'success',
          'bg-amber-500/20 text-amber-400': variant === 'warning',
          'bg-red-500/20 text-red-400': variant === 'danger',
          'bg-[#e94560]/20 text-[#e94560]': variant === 'accent',
        },
        className
      )}
    >
      {children}
    </span>
  )
}