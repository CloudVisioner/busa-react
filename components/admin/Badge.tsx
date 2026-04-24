'use client'

import { cn } from '@/lib/utils/cn'

type BadgeVariant = 'default' | 'navy' | 'green' | 'orange' | 'purple' | 'red' | 'gray'

const badgeVariantClass: Record<BadgeVariant, string> = {
  default: 'bg-[#e8edf8] text-[#00236f]',
  navy: 'bg-[#e8edf8] text-[#00236f]',
  green: 'bg-emerald-50 text-emerald-700',
  orange: 'bg-orange-50 text-orange-700',
  purple: 'bg-purple-50 text-purple-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-slate-100 text-slate-700',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
        badgeVariantClass[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
