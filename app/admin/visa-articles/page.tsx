import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import AdminVisaArticlesManager from './pageClient'

export default function AdminVisaArticlesPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <AdminVisaArticlesManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
