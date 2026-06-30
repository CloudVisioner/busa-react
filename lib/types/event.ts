export interface Event {
  id: string
  title: string
  slug: string
  date: string
  location: string
  type: string
  description: string
  coverPhoto?: string | null
  photos: string[]
  attendance?: string | null
}
