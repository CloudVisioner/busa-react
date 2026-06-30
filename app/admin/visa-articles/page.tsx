import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import AdminVisaArticlesManager from './pageClient'

export const dynamic = 'force-dynamic'

export default function AdminVisaArticlesPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <AdminVisaArticlesManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
