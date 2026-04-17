import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { ROUTES } from '@/lib/constants/routes'
import type { ArticleDetail } from '@/lib/types/visa'

interface ArticleRelatedProps {
  currentArticle: ArticleDetail
  articles: ArticleDetail[]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}

export function ArticleRelated({ currentArticle, articles }: ArticleRelatedProps) {
  const related = articles
    .filter((article) => article.slug !== currentArticle.slug && article.visaType === currentArticle.visaType)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-[32px] font-semibold text-[#1d1d1f]">O&apos;xshash maqolalar</h2>
      <div className="divide-y divide-[rgba(0,0,0,0.04)]">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`${ROUTES.VISA}/articles/${article.slug}`}
            className="group flex items-center justify-between rounded-[12px] bg-transparent px-[24px] py-[20px] transition duration-150 hover:bg-[#f5f5f7]"
          >
            <div className="flex-1">
              <div className="flex items-center">
                <span className="mr-[12px] rounded-[6px] bg-[#00236f]/8 px-[10px] py-[4px] text-[11px] font-normal tracking-[0.04em] text-[#00236f]">
                  {article.visaType}
                </span>
                <span className="text-[17px] font-semibold tracking-[-0.022em] text-[#1d1d1f] transition duration-150 group-hover:text-[#00236f]">
                  {article.title}
                </span>
              </div>
              <div className="mt-[6px] text-[13px] font-normal text-[#86868b]">
                {formatDate(article.createdAt)} • {article.readTime} daqiqa
              </div>
            </div>
            <FiArrowRight className="ml-[16px] h-5 w-5 text-[#86868b] transition duration-200 group-hover:translate-x-[4px] group-hover:text-[#00236f]" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ArticleRelated
