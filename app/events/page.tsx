import { ApolloClientProvider } from '@/components/admin'
import EventsClient from './EventsClient'

export const dynamic = 'force-dynamic'

export default function EventsPage() {
  return (
    <ApolloClientProvider>
      <EventsClient />
    </ApolloClientProvider>
  )
}
