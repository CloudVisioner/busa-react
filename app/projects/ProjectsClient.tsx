'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiCalendar, FiUsers } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FormSelect from '@/components/admin/FormSelect'
import { GET_FEATURED_PROJECT, GET_PAGINATED_PROJECTS } from '@/lib/apollo/projects'
import { formatDate } from '@/lib/utils/formatDate'

type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'UPCOMING'
type FilterStatus = 'ALL' | ProjectStatus

interface ProjectItem {
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

interface PaginatedProjectsData {
  paginatedProjects: {
    items: ProjectItem[]
    total: number
    hasMore: boolean
  }
}

interface FeaturedProjectData {
  featuredProject: ProjectItem | null
}

const LIMIT = 12

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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {project.coverPhoto ? (
        <Image
          src={project.coverPhoto}
          alt={project.title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="h-auto w-full"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-blue-900 to-blue-700" />
      )}
      <div className="p-4 font-body">
        <h3 className="line-clamp-2 text-lg font-semibold text-[#1d1d1f]">
          <span className="mr-2">{project.icon || '📚'}</span>
          {project.title}
        </h3>
        <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(project.status)}`}>
          {project.status}
        </span>
        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <FiCalendar className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDateRange(project.startDate, project.endDate)}</span>
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <FiUsers className="h-3.5 w-3.5 shrink-0" />
          <span>{project.members?.length ?? 0} members</span>
        </p>
      </div>
    </Link>
  )
}

export default function ProjectsClient() {
  const [items, setItems] = useState<ProjectItem[]>([])
  const [offset, setOffset] = useState(0)
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL')
  const [total, setTotal] = useState(0)

  const pagination = useMemo(
    () => ({
      limit: LIMIT,
      offset,
      status: statusFilter === 'ALL' ? undefined : statusFilter,
    }),
    [offset, statusFilter],
  )

  const { data, loading } = useQuery<PaginatedProjectsData>(GET_PAGINATED_PROJECTS, {
    variables: { pagination },
    fetchPolicy: 'network-only',
  })
  const { data: featuredData } = useQuery<FeaturedProjectData>(GET_FEATURED_PROJECT, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    setOffset(0)
    setItems([])
  }, [statusFilter])

  useEffect(() => {
    if (!data?.paginatedProjects) return
    setTotal(data.paginatedProjects.total)
    setItems((prev) => (offset === 0 ? data.paginatedProjects.items : [...prev, ...data.paginatedProjects.items]))
  }, [data, offset])

  const featured = featuredData?.featuredProject ?? null
  const fallbackActive = items.find((item) => item.status === 'ACTIVE') ?? null
  const heroProject = featured ?? fallbackActive
  const hasMore = items.length < total

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-20 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Loyihalar</h1>

        {heroProject ? (
          <section className="relative mb-10 h-[450px] overflow-hidden rounded-2xl bg-[#00236f]">
            {heroProject.coverPhoto ? (
              <Image src={heroProject.coverPhoto} alt={heroProject.title} fill priority sizes="100vw" className="object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-blue-900 to-blue-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00236f] via-[#00236f]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <Link href={`/projects/${heroProject.slug}`} className="block">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  <span className="mr-2">{heroProject.icon || '📚'}</span>
                  {heroProject.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-white/95">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(heroProject.status)}`}>
                    {heroProject.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm">
                    <FiCalendar className="h-3.5 w-3.5" />
                    {formatDateRange(heroProject.startDate, heroProject.endDate)}
                  </span>
                </div>
              </Link>
            </div>
          </section>
        ) : null}

        <div className="mb-6 max-w-xs">
          <FormSelect label="Holat bo'yicha filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as FilterStatus)}>
            <option value="ALL">Barchasi</option>
            <option value="ACTIVE">Faol</option>
            <option value="COMPLETED">Yakunlangan</option>
            <option value="UPCOMING">Rejalashtirilgan</option>
          </FormSelect>
        </div>

        {items.length === 0 && !loading ? (
          <p className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#6e6e73]">Hozircha loyihalar mavjud emas</p>
        ) : (
          <section className="columns-1 space-y-6 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {items.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <ProjectCard project={item} />
              </div>
            ))}
          </section>
        )}

        {hasMore ? (
          <button
            type="button"
            onClick={() => setOffset(items.length)}
            disabled={loading}
            className="mx-auto mt-8 block rounded-xl bg-[#00236f] px-5 py-2 text-white disabled:opacity-60"
          >
            Ko&apos;proq ko&apos;rsatish
          </button>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
