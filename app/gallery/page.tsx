import { queryApollo } from '@/lib/apollo/client'
import { GET_GALLERY_PHOTOS } from '@/lib/apollo/queries'
import GalleryClient from './GalleryClient'

export default async function GalleryPage() {
  let photos: any[] = []
  try {
    const data = await queryApollo({ query: GET_GALLERY_PHOTOS })
    photos = (data as any)?.galleryPhotos ?? []
  } catch (error) {
    console.error('Failed to load gallery photos:', error)
  }

  return <GalleryClient photos={photos} />
}
