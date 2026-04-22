import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface SharedButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButtonProps = SharedButtonProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: never
  }

type ButtonAsLinkProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
    href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#dc2626] text-white hover:bg-[#b91c1c]',
  secondary: 'bg-[#00236f] text-white hover:bg-[#001b57]',
  ghost: 'bg-transparent text-[#00236f] hover:bg-[#00236f]/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

function getButtonClassName(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return cn(
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    className
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = getButtonClassName(variant, size, className)

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { type = 'button', ...rest } = props as ButtonAsButtonProps
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
