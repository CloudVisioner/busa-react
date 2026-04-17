export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  event: 'navruz' | 'trips' | 'bookclub' | 'speakingclub' | 'general'
  year: 2021 | 2022 | 2023 | 2024 | 2025
  eventName: string
  width: number
  height: number
}
