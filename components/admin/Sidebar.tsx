'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdLogout, MdSchool } from 'react-icons/md'
import { cn } from '@/lib/utils/cn'

export interface SidebarLinkGroup {
  title: string
  links: Array<{ href: string; label: string }>
}

interface SidebarProps {
  brand: string
  groups: SidebarLinkGroup[]
}

export default function Sidebar({ brand, groups }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-black/5 bg-white p-4">
      <div className="mb-8 flex items-center gap-3 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00236f]">
          <MdSchool className="text-xl text-white" />
        </div>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#00236f]">{brand}</p>
          <p className="text-[10px] text-[#86868b]">Busan Uzbek Students</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 px-2 text-[11px] font-bold uppercase tracking-widest text-[#86868b]">{group.title}</h3>
            <div className="space-y-1">
              {group.links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    className={cn(
                      'block rounded-lg px-3 py-2 text-[13px] font-medium transition',
                      active ? 'bg-[#00236f] text-white' : 'text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                    )}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <form action="/api/admin/logout" method="post">
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm text-[#6e6e73] transition hover:bg-red-50 hover:text-[#dc2626]" type="submit">
          <MdLogout className="text-base" />
          Chiqish
        </button>
      </form>
    </aside>
  )
}
