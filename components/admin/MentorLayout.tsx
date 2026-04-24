import Sidebar, { type SidebarLinkGroup } from './Sidebar'
import TopBar from './TopBar'

interface MentorLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const MENTOR_GROUPS: SidebarLinkGroup[] = [
  {
    title: 'UMUMIY',
    links: [{ href: '/mentor/dashboard', label: 'Dashboard' }],
  },
  {
    title: 'VIZA',
    links: [{ href: '/mentor/visa-articles', label: 'Viza maqolalari' }],
  },
]

export default function MentorLayout({ title, subtitle, children }: MentorLayoutProps) {
  const dateLabel = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Sidebar brand="BUSA MENTOR" groups={MENTOR_GROUPS} />
      <div className="ml-[220px]">
        <TopBar userName="Mentor" userEmail="mentor@busa.uz" />
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
