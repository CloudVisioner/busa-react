import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import TeamManager from './pageClient'

export default function AdminTeamPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <TeamManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
