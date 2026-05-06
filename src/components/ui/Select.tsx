'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full bg-[#1a1a2e] border border-[#2d2d44] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560] transition-colors appearance-none cursor-pointer',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1a1a2e]">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'