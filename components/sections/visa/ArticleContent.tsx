import Image from 'next/image'
import type { ArticleDetail } from '@/lib/types/visa'
import { normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'

interface ArticleContentProps {
  article: ArticleDetail
}

export function ArticleContent({ article }: ArticleContentProps) {
  const featureImage = normalizeRemoteImageUrl(article.featureImage)

  return (
    <>
      <div className="mb-16 w-full overflow-hidden rounded-[20px]">
        <div className="relative aspect-[21/9]">
          <Image src={featureImage} alt={article.title} fill sizes="100vw" className="object-cover" />
        </div>
      </div>

      <article className="article-content mx-auto max-w-2xl">
        <p className="mb-12 border-l-4 border-[#00236f] pl-[24px] text-[19px] italic text-[#6e6e73]">{article.pullQuote}</p>
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#1d1d1f] prose-a:text-[#00236f]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </>
  )
}

export default ArticleContent
