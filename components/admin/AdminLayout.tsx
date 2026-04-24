import Sidebar, { type SidebarLinkGroup } from './Sidebar'
import TopBar from './TopBar'

interface AdminLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const ADMIN_GROUPS: SidebarLinkGroup[] = [
  {
    title: 'UMUMIY',
    links: [{ href: '/admin/dashboard', label: 'Dashboard' }],
  },
  {
    title: 'KONTENT',
    links: [
      { href: '/admin/events', label: 'Tadbirlar' },
      { href: '/admin/projects', label: 'Loyihalar' },
      { href: '/admin/gallery', label: 'Galereya' },
    ],
  },
  {
    title: 'HAMJAMIYAT',
    links: [
      { href: '/admin/team', label: 'Jamoa' },
      { href: '/admin/timeline', label: "Vaqt chizig'i" },
    ],
  },
  {
    title: 'VIZA',
    links: [{ href: '/admin/visa-articles', label: 'Viza maqolalari' }],
  },
  {
    title: 'TIZIM',
    links: [{ href: '/admin/settings', label: 'Sozlamalar' }],
  },
]

export default function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
  const dateLabel = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Sidebar brand="BUSA ADMIN" groups={ADMIN_GROUPS} />
      <div className="ml-[220px]">
        <TopBar userName="Super Admin" userEmail="administrator@busa.uz" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-[#6e6e73]">{subtitle ?? dateLabel}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
