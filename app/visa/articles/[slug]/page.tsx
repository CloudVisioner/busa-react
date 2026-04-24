import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ArticleContent from '@/components/sections/visa/ArticleContent'
import ArticleFeedback from '@/components/sections/visa/ArticleFeedback'
import ArticleHeader from '@/components/sections/visa/ArticleHeader'
import ArticleRelated from '@/components/sections/visa/ArticleRelated'
import { apolloClient } from '@/lib/apollo/client'
import { GET_VISA_ARTICLE } from '@/lib/apollo/queries'
import { ARTICLE_DETAILS } from '@/lib/constants/articleDetails'
import type { ArticleDetail } from '@/lib/types/visa'

interface VisaArticleDetailPageProps {
  params: Promise<{ slug: string }>
}

interface VisaArticleApiModel {
  slug: string
  title: string
  visaType: ArticleDetail['visaType']
  readTime: number
  createdAt: string
  isOutdated: boolean
  outdatedLink?: string | null
  author: string
  featureImage: string
  description?: string | null
  content: string
}

type VisaArticleQueryResult = {
  visaArticle: VisaArticleApiModel | null
}

export default async function VisaArticleDetailPage({ params }: VisaArticleDetailPageProps) {
  const { slug } = await params
  const fallbackArticle = ARTICLE_DETAILS.find((item) => item.slug === slug)
  let article: ArticleDetail | null = null

  if (apolloClient) {
    try {
      const { data } = await apolloClient.query<VisaArticleQueryResult>({
        query: GET_VISA_ARTICLE,
        variables: { slug },
      })
      const apiArticle = data?.visaArticle ?? null
      if (apiArticle) {
        article = {
          slug: apiArticle.slug,
          title: apiArticle.title,
          visaType: apiArticle.visaType,
          readTime: apiArticle.readTime,
          createdAt: apiArticle.createdAt,
          isOutdated: apiArticle.isOutdated,
          outdatedLink: apiArticle.outdatedLink ?? undefined,
          author: apiArticle.author,
          featureImage: apiArticle.featureImage,
          pullQuote: apiArticle.description ?? fallbackArticle?.pullQuote ?? '',
          content: apiArticle.content,
        }
      }
    } catch (error) {
      console.error('Failed to load visa article:', error)
    }
  }

  if (!article) {
    article = fallbackArticle ?? null
  }

  if (!article) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        <ArticleHeader article={article} />
        <ArticleContent article={article} />
        <ArticleFeedback />
        <ArticleRelated currentArticle={article} articles={ARTICLE_DETAILS} />
      </main>
      <Footer />
    </>
  )
}
