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
import { GET_FEATURED_EVENT, PAST_EVENTS, UPCOMING_EVENTS } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatDate } from '@/lib/utils/formatDate'
import { CursorDrift } from '@/components/ui/CursorDrift'
import {
  premiumHoverMedia,
  premiumHoverRing,
  premiumHoverShadowCard,
  premiumHoverShadowEase,
} from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { isRenderableCoverPhoto } from '@/lib/utils/coverPhoto'

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
  status?: string | null
}

interface UpcomingEventsData {
  upcomingEvents: EventItem[]
}

interface PastEventsData {
  pastEvents: {
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
    <CursorDrift
      className={cn(
        'group overflow-hidden rounded-xl border bg-white',
        premiumHoverRing,
        isMain
          ? cn(
              'border-[#00236f]/30 shadow-[0_8px_24px_rgba(0,35,111,0.12)]',
              premiumHoverShadowEase,
              'hover:shadow-[0_22px_48px_-10px_rgba(0,35,111,0.28)]',
            )
          : cn('border-black/10 shadow-sm', premiumHoverShadowCard),
      )}
    >
      <Link
        href={`/events/${event.slug}`}
        className="block text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#00236f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
      <span className="relative block w-full overflow-hidden bg-slate-900/5">
        {isRenderableCoverPhoto(event.coverPhoto) ? (
          <Image
            src={event.coverPhoto!.trim()}
            alt={event.title}
            width={800}
            height={600}
            priority={isMain}
            sizes={isMain ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'}
            className={cn('h-auto w-full', premiumHoverMedia)}
          />
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-blue-900 to-blue-700" />
        )}
      </span>
      <div className="min-w-0 p-4 font-body">
        <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
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
        <h3 className="mt-2 text-center font-semibold leading-snug text-[#1d1d1f] [overflow-wrap:anywhere] line-clamp-3 break-words text-base sm:text-lg">
          {eventTitle}
        </h3>
        <p className="mt-1 flex items-center justify-center gap-1 text-sm text-gray-500">
          <FiCalendar className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 break-words text-center">{eventDate}</span>
        </p>
        <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
          <FiMapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 break-words text-center">{eventLocation}</span>
        </p>
        {eventAttendance ? (
          <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
            <FiUsers className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 break-words text-center">{eventAttendance}</span>
          </p>
        ) : null}
      </div>
      </Link>
    </CursorDrift>
  )
}

export default function EventsClient() {
  const [pastItems, setPastItems] = useState<EventItem[]>([])
  const [pastOffset, setPastOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>('ALL')
  const debouncedSearch = useDebouncedValue(search, 400)
  const [pastTotal, setPastTotal] = useState(0)

  const { data: upcomingData, loading: loadingUpcoming } = useQuery<UpcomingEventsData>(UPCOMING_EVENTS, {
    fetchPolicy: 'network-only',
  })
  const { data: featuredData } = useQuery<FeaturedEventData>(GET_FEATURED_EVENT, {
    fetchPolicy: 'network-only',
  })
  const { data: pastData, loading: loadingPast, refetch: refetchPast } = useQuery<PastEventsData>(PAST_EVENTS, {
    variables: { limit: LIMIT, offset: pastOffset },
    fetchPolicy: 'network-only',
  })

  const upcomingItems = useMemo(() => upcomingData?.upcomingEvents ?? [], [upcomingData])

  useEffect(() => {
    if (!pastData?.pastEvents) return
    /* eslint-disable react-hooks/set-state-in-effect -- merge paginated pastEvents pages */
    setPastTotal(pastData.pastEvents.total)
    setPastItems((prev) =>
      pastOffset === 0 ? pastData.pastEvents.items : [...prev, ...pastData.pastEvents.items],
    )
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pastData, pastOffset])

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reset archive when filters change */
    setPastOffset(0)
    setPastItems([])
    /* eslint-enable react-hooks/set-state-in-effect */
    void refetchPast({ limit: LIMIT, offset: 0 })
  }, [debouncedSearch, typeFilter, refetchPast])

  const filteredPastItems = useMemo(() => {
    let list = pastItems
    const q = debouncedSearch.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description && toPlainText(e.description).toLowerCase().includes(q)) ||
          e.slug.toLowerCase().includes(q),
      )
    }
    if (typeFilter !== 'ALL') {
      list = list.filter((e) => e.type === typeFilter)
    }
    return list
  }, [pastItems, debouncedSearch, typeFilter])

  const hasMorePast = pastData?.pastEvents?.hasMore ?? pastItems.length < pastTotal
  const featuredEvent = featuredData?.featuredEvent ?? null
  const selectedMainEvent =
    featuredEvent && (featuredEvent.status ?? 'UPCOMING').toUpperCase() === 'UPCOMING' ? featuredEvent : null
  const upcomingCards = selectedMainEvent
    ? [selectedMainEvent, ...upcomingItems.filter((item) => item.id !== selectedMainEvent.id)]
    : upcomingItems

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-20 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Tadbirlar</h1>
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6e6e73]">Bo&apos;lajak tadbirlar</h2>
          {!loadingUpcoming && upcomingCards.length === 0 ? (
            <p className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#6e6e73]">Hozircha rejalashtirilgan tadbirlar yo&apos;q</p>
          ) : upcomingCards.length > 0 ? (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingCards.map((item, index) => {
                const isMain = Boolean(selectedMainEvent) && index === 0
                return (
                  <div key={item.id}>
                    <EventCard event={{ ...item, description: toPlainText(item.description || '') }} isMain={isMain} />
                  </div>
                )
              })}
            </section>
          ) : null}
        </section>

        <section>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6e6e73]">Arxiv</h3>
          {pastItems.length === 0 && !loadingPast ? (
            <p className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#6e6e73]">Hozircha arxiv bo&apos;sh</p>
          ) : (
            <>
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
              <p className="mb-6 text-sm text-[#6e6e73]">
                {pastItems.length} / {pastTotal} ko&apos;rsatilmoqda
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPastItems.map((item) => (
                  <div key={item.id}>
                    <EventCard event={item} />
                  </div>
                ))}
              </div>
            </>
          )}
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
