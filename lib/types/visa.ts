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
