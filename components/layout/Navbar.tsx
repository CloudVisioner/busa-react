'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineMenu } from 'react-icons/hi'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface NavbarProps {
  className?: string
}

const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Asosiy' },
  { href: ROUTES.ABOUT, label: 'BUSA' },
  { href: ROUTES.EVENTS, label: 'Tadbirlar' },
  { href: ROUTES.PROJECTS, label: 'Loyihalar' },
  { href: ROUTES.GALLERY, label: 'Galereya' },
  { href: ROUTES.VISA, label: 'Viza' },
] as const

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b border-black/5 bg-white/78 backdrop-blur-xl', className)}>
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 font-headline tracking-tight md:h-[70px]">
        <Link className="justify-self-start text-2xl font-bold tracking-tighter text-[#E53935]" href={ROUTES.HOME}>
          BUSA
        </Link>

        <div className="hidden items-center gap-7 justify-self-center md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === ROUTES.PROJECTS
                ? pathname === ROUTES.PROJECTS || pathname.startsWith(`${ROUTES.PROJECTS}/`)
                : pathname === item.href
            return (
              <Link
                key={item.href}
                className={cn(
                  'border-b-2 pb-1 text-sm transition-colors',
                  isActive ? 'border-primary font-semibold text-primary' : 'border-transparent text-slate-600 hover:text-primary'
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            className="inline-flex rounded-lg bg-[#dc2626] px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:bg-[#b91c1c] md:px-7 md:py-3 md:text-xs"
            href={ROUTES.HOME}
          >
            A&apos;ZO BO&apos;LISH
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden flex items-center justify-center rounded-full border border-outline-variant/30 p-2 text-primary"
          >
            <HiOutlineMenu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
