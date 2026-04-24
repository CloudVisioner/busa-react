import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import MentorVisaArticlesManager from './pageClient'

export default function MentorVisaArticlesPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <MentorVisaArticlesManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
