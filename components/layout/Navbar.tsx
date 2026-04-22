'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiBars3 } from 'react-icons/hi2'
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
  { href: ROUTES.GUIDE, label: "Yo'riqnoma" },
] as const

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isDetailPage =
    pathname.startsWith(`${ROUTES.EVENTS}/`) ||
    pathname.startsWith(`${ROUTES.PROJECTS}/`) ||
    pathname.startsWith(`${ROUTES.VISA}/articles/`) ||
    (pathname.startsWith(`${ROUTES.VISA}/`) && pathname !== ROUTES.VISA)

  const detailBackHref = pathname.startsWith(`${ROUTES.EVENTS}/`)
    ? ROUTES.EVENTS
    : pathname.startsWith(`${ROUTES.PROJECTS}/`)
      ? ROUTES.PROJECTS
      : ROUTES.VISA

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b border-black/5 bg-white/78 backdrop-blur-xl', className)}>
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-6 font-headline tracking-tight md:h-[70px] md:grid-cols-[1fr_auto_1fr]">
        <Link className="justify-self-start text-2xl font-bold tracking-tighter text-[#E53935]" href={ROUTES.HOME}>
          BUSA
        </Link>

        <div className="hidden justify-self-center items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === ROUTES.PROJECTS
                ? pathname === ROUTES.PROJECTS || pathname.startsWith(`${ROUTES.PROJECTS}/`)
                : item.href === ROUTES.EVENTS
                  ? pathname === ROUTES.EVENTS || pathname.startsWith(`${ROUTES.EVENTS}/`)
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
          {isDetailPage && (
            <Link
              href={detailBackHref}
              className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-3 py-1.5 text-[13px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] md:hidden"
            >
              &larr; Orqaga
            </Link>
          )}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="block p-0 text-[#1d1d1f] md:hidden"
          >
            <HiBars3 className="h-6 w-6" />
          </button>
          <Link
            className="hidden rounded-lg bg-[#dc2626] px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:bg-[#b91c1c] md:inline-flex md:px-7 md:py-3 md:text-xs"
            href={ROUTES.HOME}
          >
            A&apos;ZO BO&apos;LISH
          </Link>
        </div>
      </nav>
      {menuOpen && (
        <div className="w-full border-b border-[rgba(0,0,0,0.08)] bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-0">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-4 text-[17px] font-normal text-[#1d1d1f]",
                  index === NAV_ITEMS.length - 1 ? 'border-b-0' : 'border-b border-[rgba(0,0,0,0.06)]'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.HOME}
              onClick={() => setMenuOpen(false)}
              className="mt-4 w-full rounded-full bg-[#dc2626] py-3 text-center text-[17px] font-normal text-white"
            >
              A&apos;ZO BO&apos;LISH
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
