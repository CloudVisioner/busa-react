import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { FiCalendar, FiFlag, FiUsers } from 'react-icons/fi'
import { queryApollo } from '@/lib/apollo/client'
import { GET_PROJECT_BY_SLUG } from '@/lib/apollo/projects'
import { formatDate } from '@/lib/utils/formatDate'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'UPCOMING'

interface ProjectDetail {
  id: string
  title: string
  slug: string
  description: string
  coverPhoto?: string | null
  photos: string[]
  icon: string
  status: ProjectStatus
  startDate?: string | null
  endDate?: string | null
  members: string[]
  isFeatured?: boolean
}

interface ProjectQueryResult {
  projectBySlug: ProjectDetail | null
}

function statusClass(status: ProjectStatus): string {
  if (status === 'ACTIVE') return 'bg-emerald-100 text-emerald-700'
  if (status === 'COMPLETED') return 'bg-slate-100 text-slate-700'
  return 'bg-blue-100 text-blue-700'
}

function formatDateRange(startDate?: string | null, endDate?: string | null): string {
  if (!startDate && !endDate) return 'Sana kiritilmagan'
  const start = startDate ? formatDate(startDate) : '-'
  const end = endDate ? formatDate(endDate) : '-'
  return `${start} - ${end}`
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
  return {
    title: `${project?.title ?? 'Loyiha'} | BUSA Projects`,
    description: project?.description ?? 'BUSA project details',
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await resolveProject(slug)
  const title = project?.title ?? 'Nomsiz loyiha'
  const coverPhoto = project?.coverPhoto ?? ''
  const photos = project?.photos?.filter(Boolean) ?? []
  const members = project?.members?.filter(Boolean) ?? []
  const status = project?.status ?? 'UPCOMING'
  const dates = formatDateRange(project?.startDate, project?.endDate)

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f9fb] font-body text-[#191c1e]">
        <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-[#00236f]">
          {coverPhoto ? (
            <Image src={coverPhoto} alt={title} fill priority sizes="100vw" className="object-contain bg-[#0f172a] opacity-90" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-900 to-blue-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00236f] via-[#00236f]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-8 pb-16">
            <h1 className="font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:text-8xl">
              <span className="mr-3">{project?.icon || '📚'}</span>
              {title}
            </h1>
            <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(status)}`}>
              {status}
            </span>
          </div>
        </section>

        <section className="border-b border-[#c5c5d3]/20 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-8 py-8 md:grid-cols-4">
            <Info label="Start Date" value={project?.startDate ? formatDate(project.startDate) : '-'} icon={FiCalendar} />
            <Info label="End Date" value={project?.endDate ? formatDate(project.endDate) : '-'} icon={FiCalendar} />
            <Info label="Members" value={String(members.length)} icon={FiUsers} />
            <Info label="Status" value={status} icon={FiFlag} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-16">
          <article className="min-w-0 text-lg font-light leading-relaxed text-slate-600">
            {project?.description ? (
              <div
                className="prose prose-slate max-w-none break-words prose-p:leading-relaxed [overflow-wrap:anywhere]"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            ) : (
              <p>Project tafsilotlari tez orada yangilanadi.</p>
            )}
          </article>

          <section className="mt-10">
            <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight text-[#00236f]">A&apos;zolar</h2>
            {members.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                  <span key={member} className="rounded-full bg-[#eef3ff] px-3 py-1.5 text-sm font-medium text-[#00236f]">
                    {member}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#6e6e73]">A&apos;zolar hali qo&apos;shilmagan</p>
            )}
          </section>

          {photos.length > 0 ? (
            <section className="mt-10">
              <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight text-[#00236f]">Loyiha rasmlari</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo, index) => (
                  <a
                    key={`${photo}-${index}`}
                    href={photo}
                    target="_blank"
                    rel="noreferrer"
                    className={`relative overflow-hidden rounded-xl border border-black/10 bg-[#f8f9fc] ${
                      index % 5 === 0 ? 'h-56 sm:col-span-2' : index % 5 === 1 ? 'h-40' : index % 5 === 2 ? 'h-48' : index % 5 === 3 ? 'h-64' : 'h-44'
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`${title} photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <p className="mt-8 text-sm text-[#6e6e73]">Davomiylik: {dates}</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Info({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500">
        <Icon className="h-3.5 w-3.5 text-slate-500" />
        {label}
      </span>
      <span className="font-headline font-semibold text-[#00236f]">{value}</span>
    </div>
  )
}
