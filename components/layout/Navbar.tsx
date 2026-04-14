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
  { href: ROUTES.ABOUT, label: 'Nega BUSA?' },
  { href: ROUTES.EVENTS, label: 'Statistika' },
  { href: ROUTES.PROJECTS, label: 'Loyihalar' },
  { href: ROUTES.GALLERY, label: 'Galereya' },
  { href: ROUTES.VISA, label: 'Viza' },
] as const

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b border-black/5 bg-white/78 backdrop-blur-xl', className)}>
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 font-headline tracking-tight md:h-[70px]">
        <Link className="justify-self-start text-2xl font-bold text-blue-900 tracking-tighter" href={ROUTES.HOME}>
          BUSA
        </Link>

        <div className="hidden items-center gap-7 justify-self-center md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                className={cn(
                  'border-b-2 pb-1 text-sm transition-colors',
                  isActive ? 'border-blue-700 font-semibold text-blue-700' : 'border-transparent text-slate-600 hover:text-blue-900'
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
            className="inline-flex rounded-full bg-primary px-5 py-2 text-[11px] font-extrabold tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#0854d1] md:px-6 md:py-2.5 md:text-xs"
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
