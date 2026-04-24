import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import StatsCard from '@/components/admin/StatsCard'
import { queryApollo } from '@/lib/apollo/client'
import { ADMIN_GET_EVENTS, ADMIN_GET_GALLERY, ADMIN_GET_PROJECTS, ADMIN_GET_TEAM, ADMIN_GET_VISA_ARTICLES } from '@/lib/apollo/queries'
import { MdArticle, MdCalendarMonth, MdPhotoLibrary, MdRocketLaunch } from 'react-icons/md'

type PagedItemsResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
}

type EventItem = { id: string }
type ProjectItem = { id: string; status?: string | null }
type VisaArticleItem = { id: string; author?: string | null }
type GalleryItem = { id: string }
type TeamItem = { id: string; name: string; role?: string | null }

const RECENT_ACTIVITY = [
  { initials: 'DM', author: 'Dilnoza M.', action: "D-2 maqolasi qo'shdi", time: '14:20', category: 'Viza', variant: 'navy' as const },
  { initials: 'AS', author: 'Azizbek S.', action: "Yangi a'zo qo'shdi", time: '12:45', category: 'Hamjamiyat', variant: 'green' as const },
  { initials: 'JS', author: 'Jasur Sh.', action: 'Galereya albom yaratdi', time: 'Kecha', category: 'Galereya', variant: 'purple' as const },
  { initials: 'NK', author: 'Nodira K.', action: 'Tadbir ma\'lumotini yangiladi', time: 'Kecha', category: 'Tadbir', variant: 'orange' as const },
  { initials: 'OM', author: 'Olim M.', action: 'Hisobot faylini yukladi', time: '2 kun oldin', category: 'Tizim', variant: 'gray' as const },
]

export default async function AdminDashboardPage() {
  let eventsData: { events: PagedItemsResponse<EventItem> } | null = null
  let projectsData: { projects: PagedItemsResponse<ProjectItem> } | null = null
  let visaData: { visaArticles: PagedItemsResponse<VisaArticleItem> } | null = null
  let galleryData: { gallery: PagedItemsResponse<GalleryItem> } | null = null
  let teamData: { team: { items: TeamItem[] } } | null = null

  try {
    ;[eventsData, projectsData, visaData, galleryData, teamData] = await Promise.all([
      queryApollo<{ events: PagedItemsResponse<EventItem> }>({ query: ADMIN_GET_EVENTS, variables: { page: 1, limit: 10 } }),
      queryApollo<{ projects: PagedItemsResponse<ProjectItem> }>({ query: ADMIN_GET_PROJECTS, variables: { page: 1, limit: 10 } }),
      queryApollo<{ visaArticles: PagedItemsResponse<VisaArticleItem> }>({ query: ADMIN_GET_VISA_ARTICLES, variables: { page: 1, limit: 200 } }),
      queryApollo<{ gallery: PagedItemsResponse<GalleryItem> }>({ query: ADMIN_GET_GALLERY, variables: { page: 1, limit: 10 } }),
      queryApollo<{ team: { items: TeamItem[] } }>({ query: ADMIN_GET_TEAM }),
    ])
  } catch (error) {
    console.error('Failed to load admin dashboard data:', error)
  }

  const totalEvents = eventsData?.events?.total ?? 0
  const totalProjects = projectsData?.projects?.total ?? 0
  const activeProjectsCount = (projectsData?.projects?.items ?? []).filter((project) => project.status?.toUpperCase() === 'ACTIVE').length || totalProjects
  const totalVisaArticles = visaData?.visaArticles?.total ?? 0
  const totalGalleryPhotos = galleryData?.gallery?.total ?? 0
  const visaItems = visaData?.visaArticles?.items ?? []

  return (
    <AdminLayout title="Boshqaruv paneli">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard icon={MdCalendarMonth} label="Jami tadbirlar" value={totalEvents} accent="navy" />
        <StatsCard icon={MdRocketLaunch} label="Faol loyihalar" value={activeProjectsCount} accent="green" />
        <StatsCard icon={MdArticle} label="Viza maqolalari" value={totalVisaArticles} accent="orange" />
        <StatsCard icon={MdPhotoLibrary} label="Galereya rasmlari" value={totalGalleryPhotos} accent="purple" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-[#1d1d1f]">So&apos;nggi harakatlar</h2>
          <div className="space-y-2">
            {RECENT_ACTIVITY.map((activity) => (
              <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-[#f5f5f7]" key={`${activity.initials}-${activity.time}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8edf8] text-xs font-bold text-[#00236f]">{activity.initials}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#1d1d1f]">
                    <span className="font-semibold">{activity.author}</span> {activity.action}
                  </p>
                  <p className="text-xs text-[#86868b]">{activity.time}</p>
                </div>
                <Badge variant={activity.variant}>{activity.category}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h2 className="mb-4 text-lg font-semibold text-[#1d1d1f]">Mentorlar holati</h2>
          <div className="space-y-3">
            {(teamData?.team?.items ?? []).slice(0, 5).map((mentor) => {
              const articleCount = visaItems.filter((article) => article.author === mentor.name).length
              const status = articleCount > 0 ? 'Faol' : 'Nofaol'
              return (
                <div className="flex items-center justify-between rounded-xl border border-black/5 p-3" key={mentor.id}>
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">{mentor.name}</p>
                    <p className="text-xs text-[#86868b]">{mentor.role ?? 'Mentor'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{articleCount} ta</p>
                    <Badge variant={status === 'Faol' ? 'green' : 'gray'}>{status}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
