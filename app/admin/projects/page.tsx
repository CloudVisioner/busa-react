import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import ProjectsManager from './pageClient'

export const dynamic = 'force-dynamic'

export default function AdminProjectsPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <ProjectsManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
