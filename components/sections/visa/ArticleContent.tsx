import Image from 'next/image'
import type { ReactNode } from 'react'
import type { ArticleDetail } from '@/lib/types/visa'

interface ArticleContentProps {
  article: ArticleDetail
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const chunks = text.split(/(\*\*.*?\*\*)/g)
  return chunks.map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={index}>{chunk.slice(2, -2)}</strong>
    }
    return <span key={index}>{chunk}</span>
  })
}

function renderMarkdownBlocks(content: string): ReactNode[] {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const rawLine = lines[i]
    const line = rawLine.trim()

    if (!line) {
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`}>{line.slice(3)}</h2>)
      i += 1
      continue
    }

    if (line === ':::callout') {
      i += 1
      const calloutLines: string[] = []
      while (i < lines.length && lines[i].trim() !== ':::') {
        calloutLines.push(lines[i])
        i += 1
      }
      if (i < lines.length && lines[i].trim() === ':::') i += 1
      elements.push(
        <div key={`callout-${i}`} className="callout">
          <p>{renderInlineMarkdown(calloutLines.join(' ').trim())}</p>
        </div>
      )
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i += 1
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    elements.push(<p key={`p-${i}`}>{renderInlineMarkdown(line)}</p>)
    i += 1
  }

  return elements
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <>
      <div className="mb-16 w-full overflow-hidden rounded-[20px]">
        <div className="relative aspect-[21/9]">
          <Image src={article.featureImage} alt={article.title} fill sizes="100vw" className="object-cover" />
        </div>
      </div>

      <article className="article-content mx-auto max-w-2xl">
        <p className="mb-12 border-l-4 border-[#00236f] pl-[24px] text-[19px] italic text-[#6e6e73]">{article.pullQuote}</p>
        {renderMarkdownBlocks(article.content)}
      </article>
    </>
  )
}

export default ArticleContent
