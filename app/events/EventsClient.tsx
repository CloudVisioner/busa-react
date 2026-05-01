'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiCalendar, FiMapPin, FiTag, FiUsers } from 'react-icons/fi'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import { GET_FEATURED_EVENT, PAGINATED_EVENTS } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatDate } from '@/lib/utils/formatDate'

interface EventItem {
  id: string
  title: string
  slug: string
  type: string
  date: string
  location: string
  description: string
  coverPhoto?: string | null
  attendance?: string | null
  isFeatured?: boolean
}

interface PaginatedEventsData {
  paginatedEvents: {
    items: EventItem[]
    total: number
    hasMore: boolean
  }
}

interface FeaturedEventData {
  featuredEvent: EventItem | null
}

const LIMIT = 12
const TYPES = ['ALL', 'MADANIY', 'TRIP', 'SPORT', 'WORKSHOP', 'EDUCATION'] as const
type EventTimelineStatus = 'UPCOMING' | 'PAST'

function toPlainText(html: string): string {
  const withoutTags = html.replace(/<[^>]*>/g, ' ')
  const normalizedEntities = withoutTags.replace(/&nbsp;/gi, ' ')
  return normalizedEntities.replace(/\s+/g, ' ').trim()
}

function EventCard({ event, isMain = false }: { event: EventItem; isMain?: boolean }) {
  const eventType = event.type?.trim() || 'TURI KIRITILMAGAN'
  const eventDate = event.date ? formatDate(event.date) : 'Sana kiritilmagan'
  const eventLocation = event.location?.trim() || 'Joylashuv kiritilmagan'
  const eventTitle = event.title?.trim() || "Nomsiz tadbir"
  const eventAttendance = event.attendance?.trim() || ''

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`block rounded-xl overflow-hidden bg-white border hover:shadow-md transition-shadow ${
        isMain ? 'border-[#00236f]/30 shadow-[0_8px_24px_rgba(0,35,111,0.12)]' : 'border-black/10 shadow-sm'
      }`}
    >
      {event.coverPhoto ? (
        <Image
          src={event.coverPhoto}
          alt={event.title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="w-full h-auto"
        />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-blue-900 to-blue-700" />
      )}
      <div className="font-body p-4">
        <div className="flex flex-wrap items-center gap-2">
          {isMain ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#00236f] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              ★ Asosiy tadbir
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800">
            <FiTag className="h-3 w-3" />
            {eventType}
          </span>
        </div>
        <h3 className="mt-2 font-semibold line-clamp-2 text-[#1d1d1f] text-lg">{eventTitle}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <FiCalendar className="h-3.5 w-3.5 shrink-0" />
          <span>{eventDate}</span>
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <FiMapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{eventLocation}</span>
        </p>
        {eventAttendance ? (
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <FiUsers className="h-3.5 w-3.5 shrink-0" />
            <span>{eventAttendance}</span>
          </p>
        ) : null}
      </div>
    </Link>
  )
}

export default function EventsClient() {
  const [upcomingItems, setUpcomingItems] = useState<EventItem[]>([])
  const [pastItems, setPastItems] = useState<EventItem[]>([])
  const [upcomingOffset, setUpcomingOffset] = useState(0)
  const [pastOffset, setPastOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>('ALL')
  const debouncedSearch = useDebouncedValue(search, 400)
  const [upcomingTotal, setUpcomingTotal] = useState(0)
  const [pastTotal, setPastTotal] = useState(0)

  const baseFilters = useMemo(
    () => ({
      search: debouncedSearch.trim() || undefined,
      type: typeFilter === 'ALL' ? undefined : typeFilter,
    }),
    [debouncedSearch, typeFilter],
  )

  const upcomingPagination = useMemo(
    () => ({ ...baseFilters, limit: LIMIT, offset: upcomingOffset, status: 'UPCOMING' as EventTimelineStatus }),
    [baseFilters, upcomingOffset],
  )
  const pastPagination = useMemo(
    () => ({ ...baseFilters, limit: LIMIT, offset: pastOffset, status: 'PAST' as EventTimelineStatus }),
    [baseFilters, pastOffset],
  )

  const { data: upcomingData, loading: loadingUpcoming } = useQuery<PaginatedEventsData>(PAGINATED_EVENTS, {
    variables: { pagination: upcomingPagination },
    fetchPolicy: 'network-only',
  })
  const { data: featuredData } = useQuery<FeaturedEventData>(GET_FEATURED_EVENT, {
    fetchPolicy: 'network-only',
  })
  const { data: pastData, loading: loadingPast } = useQuery<PaginatedEventsData>(PAGINATED_EVENTS, {
    variables: { pagination: pastPagination },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    setUpcomingOffset(0)
    setPastOffset(0)
    setUpcomingItems([])
    setPastItems([])
  }, [debouncedSearch, typeFilter])

  useEffect(() => {
    if (!upcomingData?.paginatedEvents) return
    setUpcomingTotal(upcomingData.paginatedEvents.total)
    setUpcomingItems((prev) =>
      upcomingOffset === 0 ? upcomingData.paginatedEvents.items : [...prev, ...upcomingData.paginatedEvents.items],
    )
  }, [upcomingData, upcomingOffset])

  useEffect(() => {
    if (!pastData?.paginatedEvents) return
    setPastTotal(pastData.paginatedEvents.total)
    setPastItems((prev) =>
      pastOffset === 0 ? pastData.paginatedEvents.items : [...prev, ...pastData.paginatedEvents.items],
    )
  }, [pastData, pastOffset])

  const hasMoreUpcoming = upcomingItems.length < upcomingTotal
  const hasMorePast = pastItems.length < pastTotal
  const featuredEvent = featuredData?.featuredEvent ?? null
  const isFeaturedUpcoming = featuredEvent ? new Date(featuredEvent.date).getTime() > Date.now() : false
  const selectedMainEvent = isFeaturedUpcoming ? featuredEvent : null
  const upcomingCards = selectedMainEvent
    ? [selectedMainEvent, ...upcomingItems.filter((item) => item.id !== selectedMainEvent.id)]
    : upcomingItems

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-20 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Tadbirlar</h1>
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6e6e73]">Upcoming Events</h2>
          {upcomingItems.length === 0 && !loadingUpcoming ? (
            <p className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#6e6e73]">Hozircha rejalashtirilgan tadbirlar yo&apos;q</p>
          ) : (
            upcomingCards.length > 0 ? (
              <section className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {upcomingCards.map((item, index) => {
                  const isMain = Boolean(selectedMainEvent) && index === 0
                  return (
                    <div key={item.id} className="break-inside-avoid">
                      <EventCard event={{ ...item, description: toPlainText(item.description || '') }} isMain={isMain} />
                    </div>
                  )
                })}
              </section>
            ) : null
          )}
          {hasMoreUpcoming ? (
            <button
              type="button"
              onClick={() => setUpcomingOffset(upcomingItems.length)}
              disabled={loadingUpcoming}
              className="mx-auto mt-8 block rounded-xl bg-[#00236f] px-5 py-2 text-white disabled:opacity-60"
            >
              Ko&apos;proq ko&apos;rsatish
            </button>
          ) : null}
        </section>

        <section>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6e6e73]">Arxiv / O&apos;tgan tadbirlar</h3>
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <FormInput label="Qidirish" value={search} onChange={(event) => setSearch(event.target.value)} />
            <FormSelect label="Type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as (typeof TYPES)[number])}>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormSelect>
          </div>
          <p className="mb-6 text-sm text-[#6e6e73]">{pastItems.length} / {pastTotal} ko'rsatilmoqda</p>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {pastItems.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <EventCard event={item} />
              </div>
            ))}
          </div>
        </section>

        {hasMorePast ? (
          <button
            type="button"
            onClick={() => setPastOffset(pastItems.length)}
            disabled={loadingPast}
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
