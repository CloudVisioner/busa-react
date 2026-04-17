import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import type { ArticleDetail } from '@/lib/types/visa'

interface ArticleHeaderProps {
  article: ArticleDetail
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <>
      <Link
        className="mb-12 inline-flex items-center gap-2 text-primary transition-transform duration-300 hover:translate-x-[-2px]"
        href={ROUTES.VISA}
      >
        <span className="text-sm">←</span>
        <span className="text-sm uppercase tracking-wide">Viza sahifasiga qaytish</span>
      </Link>

      {article.isOutdated ? (
        <div className="mb-12 rounded-[12px] border border-[#f59e0b] bg-[#fff8f0] p-[20px] text-[#92400e]">
          <p className="text-sm">
            Bu maqola eskirgan.{' '}
            {article.outdatedLink ? (
              <Link className="font-semibold underline underline-offset-4" href={article.outdatedLink}>
                Yangilangan versiyani ochish
              </Link>
            ) : null}
          </p>
        </div>
      ) : null}

      <header className="mb-16">
        <div className="mb-6 inline-block rounded-full bg-[#00236f]/8 px-[12px] py-[6px] text-[12px] font-medium tracking-[0.08em] text-[#00236f]">
          {article.visaType}
        </div>
        <h1 className="mb-8 text-[56px] font-semibold tracking-[-0.003em] text-[#1d1d1f]">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#86868b]">
          <span>{article.author}</span>
          <span>•</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>•</span>
          <span>{article.readTime} daqiqa o&apos;qish</span>
        </div>
      </header>
    </>
  )
}

export default ArticleHeader
