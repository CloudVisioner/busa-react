import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { queryApollo } from '@/lib/apollo/client'
import { GET_PROJECT_BY_SLUG } from '@/lib/apollo/projects'
import ProjectDetailPhotoBento from '@/components/features/projects/ProjectDetailPhotoBento'
import { isRenderableCoverPhoto } from '@/lib/utils/coverPhoto'
import { ROUTES } from '@/lib/constants/routes'
import { htmlToPlainText } from '@/lib/utils/richText'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

interface ProjectDetail {
  id: string
  title: string
  slug: string
  description: string
  coverPhoto?: string | null
  photos: string[]
  isFeatured?: boolean
}

interface ProjectQueryResult {
  projectBySlug: ProjectDetail | null
}

async function resolveProject(slug: string): Promise<ProjectDetail | null> {
  try {
    const data = await queryApollo<ProjectQueryResult>({
      query: GET_PROJECT_BY_SLUG,
      variables: { slug },
      admin: true,
      fetchPolicy: 'network-only',
    })
    if (data?.projectBySlug) return data.projectBySlug
  } catch (error) {
    console.error('Failed to load project detail:', error)
  }
  return null
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await resolveProject(slug)
  const plain = project?.description ? htmlToPlainText(project.description) : ''
  return {
    title: `${project?.title ?? 'Loyiha'} | BUSA Projects`,
    description: plain || 'BUSA project details',
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await resolveProject(slug)
  const title = project?.title ?? 'Nomsiz loyiha'
  const coverPhoto = project?.coverPhoto ?? ''
  const photos = project?.photos?.filter(Boolean) ?? []
  const hasDescription = Boolean(project?.description && htmlToPlainText(project.description).length > 0)

  return (
    <>
      <Navbar />
      <main className="bg-white font-body text-[#191c1e]">
        <section className="relative h-[450px] w-full overflow-hidden bg-[#1a237e]">
          {isRenderableCoverPhoto(coverPhoto) ? (
            <>
              <Image src={coverPhoto} alt={title} fill priority sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/35" />
            </>
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="text-center font-headline text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-[750px] px-6 py-[60px]">
          {hasDescription ? (
            <div
              className="prose prose-slate max-w-none break-words prose-p:leading-relaxed [overflow-wrap:anywhere]"
              dangerouslySetInnerHTML={{ __html: project!.description }}
            />
          ) : (
            <p className="text-center text-lg text-slate-600">Tez orada ma&apos;lumot qo&apos;shiladi.</p>
          )}
        </section>

        {photos.length > 0 ? (
          <section className="border-t border-slate-100 bg-[#f6f6f6] px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 text-center font-headline text-2xl font-bold tracking-tight text-[#00236f] md:mb-8 md:text-left md:text-3xl">
                Loyiha rasmlari
              </h2>
              <ProjectDetailPhotoBento photos={photos} title={title} />
              <div className="mt-10 flex justify-center">
                <Link
                  href={ROUTES.GALLERY}
                  className="inline-flex items-center rounded-full border border-[#00236f] bg-white px-6 py-3 text-sm font-semibold text-[#00236f] transition-[background-color,color,transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,0.06,0.19,1)] hover:bg-[#00236f] hover:text-white hover:shadow-[0_18px_40px_-14px_rgba(0,35,111,0.35)]"
                >
                  Ko&apos;proq ko&apos;rish →
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
