import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ProjectEditorialLayout from '@/components/sections/projects/detail/ProjectEditorialLayout'
import { getProjectBySlug, PROJECTS } from '@/lib/constants/projects'
import { getResolvedProjectDetail } from '@/lib/constants/projectDetails'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return { title: 'Loyiha | BUSA' }
  }
  const detail = getResolvedProjectDetail(project)
  return {
    title: detail.pageTitle,
    description: detail.heroSubtitle,
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    notFound()
  }

  const detail = getResolvedProjectDetail(project)

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-surface font-body text-on-surface [color-scheme:light]">
        <ProjectEditorialLayout detail={detail} />
      </main>
      <Footer />
    </>
  )
}
