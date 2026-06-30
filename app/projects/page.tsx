import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import JoinCTA from '@/components/sections/about/JoinCTA'
import ProjectsHero from '@/components/sections/ProjectsHero'
import ProjectsListing from '@/components/sections/ProjectsListing'
import { queryApollo } from '@/lib/apollo/client'
import { GET_PROJECTS } from '@/lib/apollo/queries'
import type { Project } from '@/lib/types/project'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Loyihalar | BUSA',
  description: "BUSA akademik, madaniy va professional loyihalari — Busan o'zbek talabalar jamiyati.",
}

interface ProjectsQueryData {
  projects: Project[]
}

export default async function ProjectsPage() {
  let projects: Project[] | null = null
  try {
    const data = await queryApollo<ProjectsQueryData>({
      query: GET_PROJECTS,
      fetchPolicy: 'network-only',
    })
    projects = data?.projects ?? []
  } catch (error) {
    console.error('Failed to load projects:', error)
  }

  return (
    <div className="[color-scheme:light] min-h-screen bg-background text-on-background">
      <Navbar />
      <main className="mx-auto max-w-7xl overflow-x-clip bg-background px-8 pb-24 pt-32 font-body text-on-background">
        <ProjectsHero />
        <ProjectsListing projects={projects} />
        <JoinCTA
          variant="plain"
          eyebrow="Loyihalar"
          title="Loyihalarimizga qo'shiling"
          description="O'zingizni rivojlantiring, yangi do'stlar orttiring va Busan talabalar hamjamiyatining faol a'zosiga aylaning."
        />
      </main>
      <Footer />
    </div>
  )
}
