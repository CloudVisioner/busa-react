import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ArticleContent from '@/components/sections/visa/ArticleContent'
import ArticleFeedback from '@/components/sections/visa/ArticleFeedback'
import ArticleHeader from '@/components/sections/visa/ArticleHeader'
import ArticleRelated from '@/components/sections/visa/ArticleRelated'
import { ARTICLE_DETAILS } from '@/lib/constants/articleDetails'

interface VisaArticleDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function VisaArticleDetailPage({ params }: VisaArticleDetailPageProps) {
  const { slug } = await params
  const article = ARTICLE_DETAILS.find((item) => item.slug === slug)

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
