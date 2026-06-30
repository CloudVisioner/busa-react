import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import EventsManager from './pageClient'

export const dynamic = 'force-dynamic'

export default function AdminEventsPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <EventsManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
