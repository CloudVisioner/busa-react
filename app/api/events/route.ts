import { NextRequest, NextResponse } from 'next/server'
import {
  buildArchivePool,
  EVENTS_PER_PAGE,
  EVENTS_TOTAL_COUNT,
  FEATURED_EVENT,
  getYearFromDate,
  UPCOMING_EVENTS,
} from '@/lib/constants/eventsPage'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pageParam = Number(searchParams.get('page') ?? '1')
  const year = searchParams.get('year') ?? 'all'
  const type = searchParams.get('type') ?? 'all'
  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1

  const allArchive = buildArchivePool(EVENTS_TOTAL_COUNT)
  const yearFilteredArchive = year === 'all' ? allArchive : allArchive.filter((event) => getYearFromDate(event.date) === year)
  const filteredArchive = type === 'all' ? yearFilteredArchive : yearFilteredArchive.filter((event) => event.category.toLowerCase() === type.toLowerCase())

  const totalItems = filteredArchive.length
  const totalPages = Math.max(1, Math.ceil(totalItems / EVENTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * EVENTS_PER_PAGE
  const end = Math.min(start + EVENTS_PER_PAGE, totalItems)
  const archive = filteredArchive.slice(start, end)

  return NextResponse.json({
    featured: FEATURED_EVENT,
    upcoming: UPCOMING_EVENTS,
    archive,
    pagination: {
      page: safePage,
      perPage: EVENTS_PER_PAGE,
      totalItems,
      totalPages,
      start: totalItems === 0 ? 0 : start + 1,
      end,
      year,
      type,
    },
  })
}
