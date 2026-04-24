import Footer from '@/components/layout/Footer'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import Navbar from '@/components/layout/Navbar'
import FilterPill from '@/components/ui/FilterPill'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { HiOutlineCalendarDays, HiOutlineMapPin } from 'react-icons/hi2'
import { queryApollo } from '@/lib/apollo/client'
import { GET_EVENTS, GET_UPCOMING_EVENTS } from '@/lib/apollo/queries'
import { ROUTES } from '@/lib/constants/routes'
import { normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const EVENTS_PER_PAGE = 9
const EVENTS_TOTAL_COUNT = 87

interface FeaturedEvent {
  badge: string
  title: string
  date: string
  location: string
  description: string
  image: string
  alt: string
}

interface UpcomingEvent {
  badge: string
  badgeClassName: string
  title: string
  date: string
  location: string
  image: string
  alt: string
}

interface ArchiveEvent {
  category: string
  date: string
  title: string
  description?: string
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

function toEventSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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

function getMobilePaginationItems(current: number, total: number): Array<number | '...'> {
  if (total <= 1) {
    return [1]
  }
  const items: Array<number | '...'> = [1]
  if (current > 2) {
    items.push('...')
  }
  if (current !== 1 && current !== total) {
    items.push(current)
  }
  if (current < total - 1) {
    items.push('...')
  }
  if (total !== 1) {
    items.push(total)
  }
  return items
}

interface EventsPageProps {
  searchParams?: Promise<{
    page?: string
    year?: string
    type?: string
  }>
}

async function getEventsData(page: number, year: string, type: string): Promise<EventsApiResponse> {
  let rawEvents: any[] = []
  let rawUpcoming: any[] = []
  try {
    const [eventsData, upcomingData] = await Promise.all([
      queryApollo({
        query: GET_EVENTS,
        variables: { page, limit: EVENTS_PER_PAGE },
        fetchPolicy: 'no-cache',
      }),
      queryApollo({ query: GET_UPCOMING_EVENTS, fetchPolicy: 'no-cache' }),
    ])
    rawEvents = (eventsData as any)?.events ?? []
    rawUpcoming = (upcomingData as any)?.upcomingEvents ?? []
  } catch (error) {
    console.error('Failed to load events page data:', error)
  }

  const archive: ArchiveEvent[] = rawEvents.map((event: any) => ({
    category: event.type ?? 'Madaniy',
    date: event.date,
    title: event.title,
    description: event.description ?? '',
    image: normalizeRemoteImageUrl(event.coverPhoto),
    alt: event.title,
  }))

  const upcoming: UpcomingEvent[] = rawUpcoming.map((event: any) => ({
    badge: (event.type ?? 'EVENT').toUpperCase(),
    badgeClassName: 'bg-secondary-container text-on-secondary-container',
    title: event.title,
    date: event.date,
    location: event.location,
    image: normalizeRemoteImageUrl(event.coverPhoto),
    alt: event.title,
  }))

  const firstUpcoming = rawUpcoming[0]
  const featured: FeaturedEvent = firstUpcoming
    ? {
        badge: 'KELGUSI TADBIR',
        title: firstUpcoming.title,
        date: firstUpcoming.date,
        location: firstUpcoming.location,
        description: firstUpcoming.description ?? '',
        image: normalizeRemoteImageUrl(firstUpcoming.coverPhoto),
        alt: firstUpcoming.title,
      }
    : {
        badge: 'KELGUSI TADBIR',
        title: rawEvents[0]?.title ?? '',
        date: rawEvents[0]?.date ?? '',
        location: rawEvents[0]?.location ?? '',
        description: rawEvents[0]?.description ?? '',
        image: normalizeRemoteImageUrl(rawEvents[0]?.coverPhoto),
        alt: rawEvents[0]?.title ?? '',
      }

  const totalItems = EVENTS_TOTAL_COUNT
  const totalPages = Math.max(1, Math.ceil(totalItems / EVENTS_PER_PAGE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const startIndex = (safePage - 1) * EVENTS_PER_PAGE
  const start = archive.length === 0 ? 0 : startIndex + 1
  const end = archive.length === 0 ? 0 : startIndex + archive.length

  return {
    featured,
    upcoming,
    archive,
    pagination: {
      page: safePage,
      perPage: EVENTS_PER_PAGE,
      totalItems,
      totalPages,
      start,
      end,
      year,
      type,
    },
  }
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
  const mobilePaginationItems = getMobilePaginationItems(pagination.page, pagination.totalPages)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-24 pt-20 font-body text-on-background md:px-8 md:pt-32">
        <header className="mb-20">
          <h1 className="mb-6 font-headline text-4xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Tadbirlar</h1>
          <p className="max-w-2xl text-base font-light leading-relaxed text-outline md:text-xl">
            BUSA ning barcha o&apos;tgan va kelgusi tadbirlari - talabalar hamjamiyati hayotining digital arxivi.
          </p>
        </header>

        <div className="mb-12">
          <p className="text-[12px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">KELAYOTGAN TADBIRLAR</p>
        </div>

        <section className="mb-24">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="relative h-[220px] md:h-[500px] lg:col-span-7">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center bg-white p-4 md:p-12 lg:col-span-5">
                <h2 className="mb-3 font-headline text-[28px] font-bold leading-tight tracking-tight text-primary md:mb-4 md:text-5xl">{featured.title}</h2>
                <div className="mb-6 space-y-3 text-outline md:mb-10 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <HiOutlineCalendarDays className="h-5 w-5 text-primary-container" />
                    <span className="font-medium text-on-surface">{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiOutlineMapPin className="h-5 w-5 text-primary-container" />
                    <span className="font-medium text-on-surface">{featured.location}</span>
                  </div>
                  <p className="pt-1 text-[13px] leading-relaxed text-on-surface-variant md:pt-2 md:text-base">{featured.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    className="inline-flex self-start items-center rounded-full bg-[#dc2626] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#b91c1c]"
                    href={`${ROUTES.EVENTS}/${toEventSlug(featured.title)}`}
                  >
                    Batafsil
                    <FiArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <MobileHorizontalScroller className="-mx-4" viewportClassName="gap-4 px-4 pb-2">
            {upcoming.map((event) => (
              <Link
                key={`mobile-${event.title}`}
                href={`${ROUTES.EVENTS}/${toEventSlug(event.title)}`}
                className="group block w-[88vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300"
              >
                <div className="relative h-[180px] overflow-hidden bg-surface-container">
                  <Image src={event.image} alt={event.alt} fill sizes="88vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider shadow-sm ${event.badgeClassName}`}>{event.badge}</span>
                  </div>
                  <h3 className="mb-2 font-headline text-[22px] font-bold leading-[1.15] tracking-tight text-primary">{event.title}</h3>
                  <div className="space-y-1 text-[13px] text-outline">
                    <p className="font-medium text-on-surface">{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                  <span className="mt-3 inline-flex items-center text-xs font-bold text-outline">
                    BATAFSIL
                    <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </MobileHorizontalScroller>

          <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-2">
            {upcoming.map((event) => (
              <Link
                key={event.title}
                href={`${ROUTES.EVENTS}/${toEventSlug(event.title)}`}
                className="group block cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.1)]"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-container">
                  <Image src={event.image} alt={event.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className={`rounded-full px-4 py-1.5 font-headline text-xs font-bold tracking-wider shadow-sm ${event.badgeClassName}`}>{event.badge}</span>
                  </div>
                  <h3 className="mb-3 font-headline text-[32px] font-bold leading-[1.1] tracking-tight text-primary">{event.title}</h3>
                  <div className="mb-6 space-y-2 text-sm text-outline">
                    <p className="font-medium text-on-surface">{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold text-outline transition-colors group-hover:text-primary">
                    BATAFSIL
                    <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-12">
            <p className="text-[12px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">TADBIRLAR ARXIVI</p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-[6px] md:gap-[12px]">
            <FilterPill active={year === 'all'} href={buildPageHref(1, 'all', type)}>
              Barchasi
            </FilterPill>
            <FilterPill active={year === '2024'} href={buildPageHref(1, '2024', type)}>
              2024
            </FilterPill>
            <FilterPill active={year === '2023'} href={buildPageHref(1, '2023', type)}>
              2023
            </FilterPill>
          </div>

          <div className="my-[16px] h-[1px] bg-[rgba(0,0,0,0.06)]" />

          <div className="mb-6 flex flex-wrap items-center gap-[6px] md:gap-[12px]">
            <FilterPill active={type === 'all'} className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]" href={buildPageHref(1, year, 'all')}>
              All
            </FilterPill>
            <FilterPill active={type === 'madaniy'} className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]" href={buildPageHref(1, year, 'madaniy')}>
              Madaniy
            </FilterPill>
            <FilterPill active={type === 'trip'} className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]" href={buildPageHref(1, year, 'trip')}>
              Trip
            </FilterPill>
            <FilterPill active={type === 'sport'} className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]" href={buildPageHref(1, year, 'sport')}>
              Sport
            </FilterPill>
            <FilterPill active={type === 'workshop'} className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]" href={buildPageHref(1, year, 'workshop')}>
              Workshop
            </FilterPill>
            <p className="mt-[8px] block w-full text-[12px] font-normal text-[#86868b] md:ml-auto md:mt-0 md:block md:w-auto md:text-[13px]">
              Ko&apos;rsatilmoqda: {pagination.start}-{pagination.end} / {pagination.totalItems} ta
            </p>
          </div>

          <MobileHorizontalScroller className="-mx-4" viewportClassName="gap-4 px-4 pb-2">
            {archive.map((event, index) => (
              <Link
                key={`mobile-${event.title}-${index}`}
                href={`${ROUTES.EVENTS}/${toEventSlug(event.title)}`}
                className="group block w-[88vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300"
              >
                <div className="relative h-[180px] overflow-hidden bg-surface-container">
                  <Image src={event.image} alt={event.alt} fill sizes="88vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{event.category}</span>
                    <span className="text-[10px] font-medium uppercase text-outline">{event.date}</span>
                  </div>
                  <h4 className="font-headline text-[18px] font-semibold text-primary">{event.title}</h4>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-on-surface-variant">{event.description}</p>
                  <span className="mt-3 inline-flex items-center text-xs font-bold text-outline">
                    BATAFSIL
                    <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </MobileHorizontalScroller>

          <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {archive.map((event, index) => (
              <Link
                key={`${event.title}-${index}`}
                href={`${ROUTES.EVENTS}/${toEventSlug(event.title)}`}
                className="group block cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.09)]"
              >
                <div className="relative h-[180px] overflow-hidden bg-surface-container md:aspect-[4/3] md:h-auto">
                  <Image src={event.image} alt={event.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4 md:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{event.category}</span>
                    <span className="text-[10px] font-medium uppercase text-outline">{event.date}</span>
                  </div>
                  <h4 className="font-headline text-[18px] font-semibold text-primary transition-colors group-hover:text-primary-container md:text-xl md:font-bold">
                    {event.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-on-surface-variant md:hidden">{event.description}</p>
                  <span className="mt-3 inline-flex items-center text-xs font-bold text-outline transition-colors group-hover:text-primary">
                    BATAFSIL
                    <FiArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 hidden items-center justify-center gap-[8px] text-[14px] md:flex md:gap-2 md:text-sm">
            {pagination.page > 1 ? (
              <Link className="rounded-md px-3 py-2 font-medium text-primary transition-colors hover:bg-surface-container" href={buildPageHref(pagination.page - 1, year, type)}>
                ← Previous
              </Link>
            ) : (
              <span className="rounded-md px-3 py-2 text-slate-400">← Previous</span>
            )}

            {mobilePaginationItems.map((item, index) =>
              item === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-outline">
                  ...
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildPageHref(item, year, type)}
                  className={`rounded-md px-3 py-2 font-medium transition-colors md:hidden ${
                    item === pagination.page ? 'bg-[#1e3a8a] text-white' : 'text-primary hover:bg-surface-container'
                  }`}
                >
                  {item}
                </Link>
              )
            )}

            {paginationItems.map((item, index) =>
              item === '...' ? (
                <span key={`desktop-ellipsis-${index}`} className="hidden px-2 text-outline md:inline">
                  ...
                </span>
              ) : (
                <Link
                  key={`desktop-${item}`}
                  href={buildPageHref(item, year, type)}
                  className={`hidden rounded-md px-3 py-2 font-medium transition-colors md:inline-flex ${
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
