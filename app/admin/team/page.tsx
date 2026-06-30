import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import TeamManager from './pageClient'

export const dynamic = 'force-dynamic'

export default function AdminTeamPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <TeamManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
