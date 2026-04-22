import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface FilterPillButtonProps extends ComponentPropsWithoutRef<'button'> {
  href?: never
  active?: boolean
  children: ReactNode
}

interface FilterPillLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> {
  href: string
  active?: boolean
  children: ReactNode
}

type FilterPillProps = FilterPillButtonProps | FilterPillLinkProps

export function FilterPill({ active = false, className, children, ...props }: FilterPillProps) {
  const classes = cn(
    'cursor-pointer rounded-full px-[16px] py-[8px] text-[14px] font-normal transition duration-200',
    active ? 'bg-[#00236f] text-white' : 'border border-[#00236f]/25 bg-transparent text-[#00236f] hover:border-[#00236f] hover:bg-[#00236f]/5',
    className
  )

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { type = 'button', ...rest } = props as FilterPillButtonProps
  return (
    <button
      type={type}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  )
}

export default FilterPill
