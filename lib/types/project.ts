export interface Project {
  id: string
  title: string
  slug: string
  description: string
  coverPhoto: string
  photos: string[]
  isFeatured: boolean
  createdAt?: string
  updatedAt?: string
}
