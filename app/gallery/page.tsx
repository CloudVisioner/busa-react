import { ApolloClientProvider } from '@/components/admin'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-dynamic'

export default function GalleryPage() {
  return (
    <ApolloClientProvider>
      <GalleryClient />
    </ApolloClientProvider>
  )
}
