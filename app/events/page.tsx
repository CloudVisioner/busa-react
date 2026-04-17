import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { HiOutlineCalendarDays, HiOutlineMapPin } from 'react-icons/hi2'
import { ROUTES } from '@/lib/constants/routes'
import type { ArchiveEvent, UpcomingEvent } from '@/lib/constants/eventsPage'

interface FeaturedEvent {
  badge: string
  title: string
  date: string
  location: string
  description: string
  image: string
  alt: string
}

interface EventsApiResponse {
  featured: FeaturedEvent
  upcoming: UpcomingEvent[]
  archive: ArchiveEvent[]
  pagination: {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
    start: number
    end: number
    year: string
    type: string
  }
}

function buildPageHref(page: number, year: string, type: string): string {
  const params = new URLSearchParams()
  params.set('page', String(page))
  if (year !== 'all') {
    params.set('year', year)
  }
  if (type !== 'all') {
    params.set('type', type)
  }
  return `/events?${params.toString()}`
}

function getPaginationItems(current: number, total: number): Array<number | '...'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }
  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }
  return [1, '...', current - 1, current, current + 1, '...', total]
}

interface EventsPageProps {
  searchParams?: Promise<{
    page?: string
    year?: string
    type?: string
  }>
}

async function getEventsData(page: number, year: string, type: string): Promise<EventsApiResponse> {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const url = `${proto}://${host}/api/events?page=${page}&year=${year}&type=${type}`
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Failed to load events data')
  }
  return response.json()
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedParams = (await searchParams) ?? {}
  const rawPage = Number(resolvedParams.page ?? '1')
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1
  const year = resolvedParams.year === '2024' || resolvedParams.year === '2023' ? resolvedParams.year : 'all'
  const allowedTypes = ['all', 'madaniy', 'trip', 'sport', 'workshop'] as const
  const type = allowedTypes.includes((resolvedParams.type ?? 'all').toLowerCase() as (typeof allowedTypes)[number]) ? (resolvedParams.type ?? 'all').toLowerCase() : 'all'
  const data = await getEventsData(page, year, type)
  const { featured, upcoming, archive, pagination } = data
  const paginationItems = getPaginationItems(pagination.page, pagination.totalPages)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-8 pb-24 pt-32 font-body text-on-background">
        <header className="mb-20">
          <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Tadbirlar</h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
            BUSA ning barcha o'tgan va kelgusi tadbirlari - talabalar hamjamiyati hayotining digital arxivi.
          </p>
        </header>

        <section className="mb-24">
          <div className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="relative h-[500px] lg:col-span-7">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-12 lg:col-span-5">
                <div className="mb-6 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="h-px w-8 bg-primary" />
                  <span>{featured.badge}</span>
                </div>
                <h2 className="mb-4 font-headline text-5xl font-bold tracking-tight text-primary">{featured.title}</h2>
                <div className="mb-10 space-y-4 text-outline">
                  <div className="flex items-center gap-3">
                    <HiOutlineCalendarDays className="h-5 w-5 text-primary-container" />
                    <span className="font-medium text-on-surface">{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiOutlineMapPin className="h-5 w-5 text-primary-container" />
                    <span className="font-medium text-on-surface">{featured.location}</span>
                  </div>
                  <p className="pt-2 text-on-surface-variant">{featured.description}</p>
                </div>
                <Link
                  className="inline-flex self-start items-center rounded-full bg-[#E53935] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C62828]"
                  href={ROUTES.HOME}
                >
                  Telegram orqali
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {upcoming.map((event) => (
              <div
                key={event.title}
                className="group overflow-hidden rounded-xl border border-[#e2e8f0] bg-white"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-container">
                  <Image src={event.image} alt={event.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-7">
                  <div className="mb-5 flex items-start justify-between">
                    <span className={`rounded-full px-4 py-1.5 font-headline text-xs font-bold tracking-wider ${event.badgeClassName}`}>{event.badge}</span>
                    <FiArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mb-3 font-headline text-3xl font-bold tracking-tight text-primary">{event.title}</h3>
                  <div className="mb-5 space-y-2 text-sm text-outline">
                    <p className="font-medium text-on-surface">{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                  <Link className="inline-flex items-center text-xs font-bold text-outline transition-colors group-hover:text-primary" href={ROUTES.EVENTS}>
                    BATAFSIL
                    <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tighter text-primary">ARXIV</h2>
            </div>
            <div className="flex space-x-8 text-sm font-bold uppercase tracking-widest text-outline">
              <Link className={`pb-2 ${year === 'all' ? 'border-b-2 border-primary text-primary' : 'transition-colors hover:text-primary'}`} href={buildPageHref(1, 'all', type)}>
                Barchasi
              </Link>
              <Link className={`pb-2 ${year === '2024' ? 'border-b-2 border-primary text-primary' : 'transition-colors hover:text-primary'}`} href={buildPageHref(1, '2024', type)}>
                2024
              </Link>
              <Link className={`pb-2 ${year === '2023' ? 'border-b-2 border-primary text-primary' : 'transition-colors hover:text-primary'}`} href={buildPageHref(1, '2023', type)}>
                2023
              </Link>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-outline">
            <span className="mr-2 text-on-surface">Event type:</span>
            <Link className={`rounded-full px-3 py-1.5 ${type === 'all' ? 'bg-primary text-white' : 'bg-surface-container text-primary hover:bg-surface-container-high'}`} href={buildPageHref(1, year, 'all')}>
              All
            </Link>
            <Link className={`rounded-full px-3 py-1.5 ${type === 'madaniy' ? 'bg-primary text-white' : 'bg-surface-container text-primary hover:bg-surface-container-high'}`} href={buildPageHref(1, year, 'madaniy')}>
              Madaniy
            </Link>
            <Link className={`rounded-full px-3 py-1.5 ${type === 'trip' ? 'bg-primary text-white' : 'bg-surface-container text-primary hover:bg-surface-container-high'}`} href={buildPageHref(1, year, 'trip')}>
              Trip
            </Link>
            <Link className={`rounded-full px-3 py-1.5 ${type === 'sport' ? 'bg-primary text-white' : 'bg-surface-container text-primary hover:bg-surface-container-high'}`} href={buildPageHref(1, year, 'sport')}>
              Sport
            </Link>
            <Link className={`rounded-full px-3 py-1.5 ${type === 'workshop' ? 'bg-primary text-white' : 'bg-surface-container text-primary hover:bg-surface-container-high'}`} href={buildPageHref(1, year, 'workshop')}>
              Workshop
            </Link>
          </div>

          <p className="mb-6 text-sm text-outline">
            Ko'rsatilmoqda: {pagination.start}-{pagination.end} / {pagination.totalItems} ta
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((event, index) => (
              <article
                key={`${event.title}-${index}`}
                className="group rounded-xl border border-[#e2e8f0] bg-white p-3 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-surface-container">
                  <Image src={event.image} alt={event.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-surface-container px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{event.category}</span>
                  <span className="text-[10px] font-medium uppercase text-outline">{event.date}</span>
                </div>
                <h4 className="font-headline text-lg font-bold text-primary transition-colors group-hover:text-primary-container">{event.title}</h4>
                <Link className="mt-3 inline-flex items-center text-xs font-bold text-outline transition-colors group-hover:text-primary" href={ROUTES.EVENTS}>
                  BATAFSIL
                  <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm">
            {pagination.page > 1 ? (
              <Link className="rounded-md px-3 py-2 font-medium text-primary transition-colors hover:bg-surface-container" href={buildPageHref(pagination.page - 1, year, type)}>
                ← Previous
              </Link>
            ) : (
              <span className="rounded-md px-3 py-2 text-slate-400">← Previous</span>
            )}

            {paginationItems.map((item, index) =>
              item === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-outline">
                  ...
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildPageHref(item, year, type)}
                  className={`rounded-md px-3 py-2 font-medium transition-colors ${
                    item === pagination.page ? 'bg-[#1e3a8a] text-white' : 'text-primary hover:bg-surface-container'
                  }`}
                >
                  {item}
                </Link>
              )
            )}

            {pagination.page < pagination.totalPages ? (
              <Link className="rounded-md px-3 py-2 font-medium text-primary transition-colors hover:bg-surface-container" href={buildPageHref(pagination.page + 1, year, type)}>
                Next →
              </Link>
            ) : (
              <span className="rounded-md px-3 py-2 text-slate-400">Next →</span>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
