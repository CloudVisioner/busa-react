import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import EventsManager from './pageClient'

export default function AdminEventsPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <EventsManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
