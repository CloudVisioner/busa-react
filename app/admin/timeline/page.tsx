import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import TimelineManager from './pageClient'

export default function AdminTimelinePage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <TimelineManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
