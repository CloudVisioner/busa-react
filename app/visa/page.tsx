import { queryApollo } from '@/lib/apollo/client'
import { GET_VISA_ARTICLES } from '@/lib/apollo/queries'
import VisaClient from './VisaClient'

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Bugun'
  if (diffDays === 1) return 'Kecha'
  if (diffDays < 7) return `${diffDays} kun oldin`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta oldin`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} oy oldin`
  return `${Math.floor(diffDays / 365)} yil oldin`
}

export default async function VisaPage() {
  let rawArticles: any[] = []
  try {
    const data = await queryApollo({ query: GET_VISA_ARTICLES })
    rawArticles = (data as any)?.visaArticles ?? []
  } catch (error) {
    console.error('Failed to load visa articles:', error)
  }

  const articles = rawArticles.map((article: any) => ({
    title: article.title,
    slug: article.slug,
    type: article.visaType,
    timeAgo: article.createdAt ? formatTimeAgo(article.createdAt) : '',
    readTime: typeof article.readTime === 'number' ? `${article.readTime} daqiqa` : article.readTime,
    description: article.description ?? '',
  }))

  return <VisaClient articles={articles} />
}
