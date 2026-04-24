import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ProjectEditorialLayout from '@/components/sections/projects/detail/ProjectEditorialLayout'
import { apolloClient } from '@/lib/apollo/client'
import { GET_PROJECT } from '@/lib/apollo/queries'
import { getProjectBySlug, PROJECTS } from '@/lib/constants/projects'
import { getResolvedProjectDetail } from '@/lib/constants/projectDetails'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

type ProjectQueryResult = {
  project: Record<string, any> | null
}

export function generateStaticParams(): { slug: string }[] {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

function buildDetailFromApiProject(
  project: Record<string, any>,
  fallbackDetail: ProjectDetailContent | null
): ProjectDetailContent {
  return {
    pageTitle: project.title ? `${project.title} | BUSA` : (fallbackDetail?.pageTitle ?? 'Loyiha | BUSA'),
    heroImage: project.heroImage ?? fallbackDetail?.heroImage ?? project.coverPhoto ?? '',
    heroEyebrow: project.heroEyebrow ?? fallbackDetail?.heroEyebrow ?? project.category ?? '',
    heroDisplayTitle: project.heroDisplayTitle ?? fallbackDetail?.heroDisplayTitle ?? project.title ?? '',
    heroSubtitle: project.heroSubtitle ?? fallbackDetail?.heroSubtitle ?? project.summary ?? '',
    aboutTitle: project.aboutTitle ?? fallbackDetail?.aboutTitle ?? "Nima u o'zi?",
    aboutParagraphs: project.aboutParagraphs ?? fallbackDetail?.aboutParagraphs ?? [project.description ?? ''],
    features: project.features ?? fallbackDetail?.features ?? [],
    processTitle: project.processTitle ?? fallbackDetail?.processTitle ?? 'Qanday amalga oshiriladi?',
    processSteps: project.processSteps ?? fallbackDetail?.processSteps ?? [],
    galleryTitle: project.galleryTitle ?? fallbackDetail?.galleryTitle ?? 'Galereya',
    gallerySubtitle: project.gallerySubtitle ?? fallbackDetail?.gallerySubtitle ?? '',
    galleryImages: project.galleryImages ?? fallbackDetail?.galleryImages ?? [],
    ctaTitle: project.ctaTitle ?? fallbackDetail?.ctaTitle ?? 'Loyihamizga qo‘shiling',
    ctaSubtitle: project.ctaSubtitle ?? fallbackDetail?.ctaSubtitle ?? '',
    ctaPrimaryLabel: project.ctaPrimaryLabel ?? fallbackDetail?.ctaPrimaryLabel ?? "A'zo bo'lish",
    ctaSecondaryLabel: project.ctaSecondaryLabel ?? fallbackDetail?.ctaSecondaryLabel ?? 'Nizom bilan tanishish',
  }
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const staticProject = getProjectBySlug(slug)
  const fallbackDetail = staticProject ? getResolvedProjectDetail(staticProject) : null

  let project: Record<string, any> | null = null
  if (apolloClient) {
    try {
      const { data } = await apolloClient.query<ProjectQueryResult>({
        query: GET_PROJECT,
        variables: { slug },
      })
      project = data?.project ?? null
    } catch (error) {
      console.error('Failed to load project metadata:', error)
    }
  }

  if (!project && !fallbackDetail) {
    return { title: 'Loyiha | BUSA' }
  }

  const detail = project ? buildDetailFromApiProject(project, fallbackDetail) : fallbackDetail
  return {
    title: detail?.pageTitle ?? 'Loyiha | BUSA',
    description: detail?.heroSubtitle,
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const staticProject = getProjectBySlug(slug)
  const fallbackDetail = staticProject ? getResolvedProjectDetail(staticProject) : null

  let project: Record<string, any> | null = null
  if (apolloClient) {
    try {
      const { data } = await apolloClient.query<ProjectQueryResult>({
        query: GET_PROJECT,
        variables: { slug },
      })
      project = data?.project ?? null
    } catch (error) {
      console.error('Failed to load project:', error)
    }
  }

  if (!project && !fallbackDetail) {
    notFound()
  }

  const detail = project ? buildDetailFromApiProject(project, fallbackDetail) : fallbackDetail

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-surface font-body text-on-surface [color-scheme:light]">
        {detail ? <ProjectEditorialLayout detail={detail} /> : null}
      </main>
      <Footer />
    </>
  )
}
