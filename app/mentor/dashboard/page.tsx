import MentorLayout from '@/components/admin/MentorLayout'
import Badge from '@/components/admin/Badge'
import { queryApollo } from '@/lib/apollo/client'
import { ADMIN_GET_VISA_ARTICLES } from '@/lib/apollo/queries'

interface VisaArticleItem {
  id: string
  title: string
  visaType: string
  summary: string
  author: string
}

interface VisaQueryData {
  visaArticles: {
    items: VisaArticleItem[]
    total: number
    page: number
    limit: number
  }
}

const mentorName = process.env.NEXT_PUBLIC_MENTOR_NAME ?? 'Mentor'

export default async function MentorDashboardPage() {
  let data: VisaQueryData | null = null
  try {
    data = await queryApollo<VisaQueryData>({ query: ADMIN_GET_VISA_ARTICLES, variables: { page: 1, limit: 100 } })
  } catch (error) {
    console.error('Failed to load mentor dashboard data:', error)
  }
  const allArticles = data?.visaArticles?.items ?? []
  const ownArticles = allArticles.filter((article) => article.author === mentorName)

  return (
    <MentorLayout title="Mentor Dashboard">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-[#6e6e73]">Mening maqolalarim</p>
          <p className="mt-1 text-3xl font-semibold text-[#1d1d1f]">{ownArticles.length}</p>
        </div>
      </div>

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        <h2 className="mb-4 text-lg font-semibold text-[#1d1d1f]">So&apos;nggi maqolalarim</h2>
        <div className="space-y-2">
          {ownArticles.slice(0, 5).map((article) => (
            <div className="rounded-xl border border-black/5 p-3" key={article.id}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#1d1d1f]">{article.title}</p>
                <Badge>{article.visaType}</Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-[#6e6e73]">{article.summary}</p>
            </div>
          ))}
          {ownArticles.length === 0 ? <p className="text-sm text-[#6e6e73]">Hozircha maqolalar yo&apos;q.</p> : null}
        </div>
      </section>
    </MentorLayout>
  )
}
