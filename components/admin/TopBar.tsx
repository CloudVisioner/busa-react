'use client'

import { MdNotificationsNone, MdSearch } from 'react-icons/md'

interface TopBarProps {
  userName?: string
  userEmail?: string
}

export default function TopBar({ userName = 'Admin', userEmail = 'admin@busa.uz' }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/5 bg-white/90 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-sm">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#86868b]">
          <MdSearch className="text-lg" />
        </span>
        <input className="w-full rounded-xl border border-black/10 bg-[#f5f5f7] py-2 pl-10 pr-3 text-sm text-[#1d1d1f] outline-none focus:border-[#00236f]" placeholder="Qidiruv..." type="text" />
      </div>

      <div className="ml-4 flex items-center gap-4">
        <button className="rounded-lg p-2 text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]" type="button">
          <MdNotificationsNone className="text-xl" />
        </button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#1d1d1f]">{userName}</p>
          <p className="text-xs text-[#86868b]">{userEmail}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8edf8] text-sm font-semibold text-[#00236f]">
          {userName.slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
