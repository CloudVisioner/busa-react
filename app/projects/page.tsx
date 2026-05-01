import type { Metadata } from 'next'
import { ApolloClientProvider } from '@/components/admin'
import ProjectsClient from './ProjectsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Loyihalar | BUSA',
  description: "BUSA akademik, madaniy va professional loyihalari — Busan o'zbek talabalar jamiyati.",
}

export default function ProjectsPage() {
  return (
    <ApolloClientProvider>
      <ProjectsClient />
    </ApolloClientProvider>
  )
}
