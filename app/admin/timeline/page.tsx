import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import TimelineManager from './pageClient'

export const dynamic = 'force-dynamic'

export default function AdminTimelinePage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <TimelineManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
