import { ApolloClientProvider, ToastProvider } from '@/components/admin'
import ProjectsManager from './pageClient'

export default function AdminProjectsPage() {
  return (
    <ApolloClientProvider>
      <ToastProvider>
        <ProjectsManager />
      </ToastProvider>
    </ApolloClientProvider>
  )
}
