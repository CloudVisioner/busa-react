import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import GalleryManager from './pageClient'

export default function AdminGalleryPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <GalleryManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
