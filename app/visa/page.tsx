import { ApolloClientProvider } from '@/components/admin'
import VisaClient from './VisaClient'

export const dynamic = 'force-dynamic'

export default function VisaPage() {
  return (
    <ApolloClientProvider>
      <VisaClient />
    </ApolloClientProvider>
  )
}
