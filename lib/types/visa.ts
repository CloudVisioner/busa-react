export interface VisaType {
  id: string
  type: string
  title: string
  summary: string
  requirements: string[]
  steps: string[]
}

export interface VisaArticle {
  id: string
  slug: string
  title: string
  category: string
  publishedAt: string
  content: string
}

export type VisaTypeCode = 'D2' | 'D10' | 'E7'

export interface ArticleDetail {
  slug: string
  title: string
  visaType: VisaTypeCode | 'GENERAL'
  readTime: number
  createdAt: string
  isOutdated: boolean
  outdatedLink?: string
  author: string
  featureImage: string
  pullQuote: string
  content: string
}
