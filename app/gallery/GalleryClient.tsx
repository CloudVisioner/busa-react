'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import { GET_PROJECTS, PAGINATED_GALLERY_PHOTOS } from '@/lib/apollo/queries'
import { GALLERY_OTHERS_EVENT, GALLERY_OTHERS_FILTER, normalizeGalleryEvent } from '@/lib/constants/galleryEvent'
import { CursorDrift } from '@/components/ui/CursorDrift'
import { premiumHoverMedia, premiumHoverShadowCard } from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import type { Project } from '@/lib/types/project'

interface GalleryPhoto {
  id: string
  src: string
  alt: string
  event: string
  year: number
  eventName: string
}

interface PaginatedGalleryData {
  paginatedGalleryPhotos: {
    items: GalleryPhoto[]
    total: number
    hasMore: boolean
  }
}

interface ProjectsQueryData {
  projects: Project[]
}

const LIMIT = 12

function GalleryMasonry({ items }: { items: GalleryPhoto[] }) {
  if (!items.length) return null
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {items.map((item) => (
        <CursorDrift
          key={item.id}
          as="figure"
          className={cn('group m-0 mb-4 break-inside-avoid overflow-hidden rounded-sm', premiumHoverShadowCard)}
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={item.alt || item.eventName || 'Galereya rasmi'}
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={cn('h-auto w-full rounded-sm', premiumHoverMedia)}
            />
          ) : (
            <div className="aspect-video w-full rounded-sm bg-gradient-to-br from-[#00236f] via-[#3c5fb2] to-[#90a8ff]" />
          )}
        </CursorDrift>
      ))}
    </div>
  )
}

export default function GalleryClient() {
  const [items, setItems] = useState<GalleryPhoto[]>([])
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [total, setTotal] = useState(0)
  const debouncedSearch = useDebouncedValue(search, 400)

  const { data: projectsData } = useQuery<ProjectsQueryData>(GET_PROJECTS, {
    fetchPolicy: 'cache-first',
  })
  const projects = projectsData?.projects ?? []

  const projectSlugSet = useMemo(
    () => new Set(projects.map((p) => normalizeGalleryEvent(p.slug))),
    [projects],
  )

  const belongsToProjectBucket = (event: string, slug: string) =>
    normalizeGalleryEvent(event) === normalizeGalleryEvent(slug)

  const belongsToOthersBucket = (event: string) => {
    const n = normalizeGalleryEvent(event)
    if (n === normalizeGalleryEvent(GALLERY_OTHERS_EVENT)) return true
    if (!n) return true
    return !projectSlugSet.has(n)
  }

  const pagination = useMemo(
    () => ({
      limit: LIMIT,
      offset,
      search: debouncedSearch.trim() || undefined,
      type: typeFilter === 'ALL' || typeFilter === GALLERY_OTHERS_FILTER ? undefined : typeFilter,
    }),
    [offset, debouncedSearch, typeFilter],
  )

  const { data, loading } = useQuery<PaginatedGalleryData>(PAGINATED_GALLERY_PHOTOS, {
    variables: { pagination },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    setOffset(0)
    setItems([])
  }, [debouncedSearch, typeFilter])

  useEffect(() => {
    if (!data?.paginatedGalleryPhotos) return
    setTotal(data.paginatedGalleryPhotos.total)
    setItems((prev) =>
      offset === 0 ? data.paginatedGalleryPhotos.items : [...prev, ...data.paginatedGalleryPhotos.items],
    )
  }, [data, offset])

  const displayedItems = useMemo(() => {
    if (typeFilter === GALLERY_OTHERS_FILTER) {
      return items.filter((item) => belongsToOthersBucket(item.event))
    }
    return items
  }, [items, typeFilter, projectSlugSet])

  const hasMore = items.length < total

  const filterOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [{ value: 'ALL', label: 'Barchasi' }]
    for (const p of projects) {
      opts.push({ value: p.slug, label: p.title })
    }
    opts.push({ value: GALLERY_OTHERS_FILTER, label: 'Boshqalar' })
    return opts
  }, [projects])

  const sections = useMemo(() => {
    if (typeFilter !== 'ALL') return null
    const list: { key: string; title: string; photos: GalleryPhoto[] }[] = []
    for (const p of projects) {
      const photos = items.filter((it) => belongsToProjectBucket(it.event, p.slug))
      if (photos.length) list.push({ key: p.id, title: p.title, photos })
    }
    const otherPhotos = items.filter((it) => belongsToOthersBucket(it.event))
    if (otherPhotos.length) {
      list.push({ key: 'boshqalar', title: 'Boshqalar', photos: otherPhotos })
    }
    return list
  }, [items, projects, typeFilter, projectSlugSet])

  const showSectioned = typeFilter === 'ALL' && sections && sections.length > 0

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-24 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Galereya</h1>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <FormInput label="Qidirish" value={search} onChange={(event) => setSearch(event.target.value)} />
          <FormSelect label="Tur" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
        </div>
        <p className="mb-6 text-sm text-[#6e6e73]">
          {typeFilter === GALLERY_OTHERS_FILTER
            ? `${displayedItems.length} ta (boshqalar, yuklangan sahifalar)`
            : `${items.length} / ${total} ko'rsatilmoqda`}
        </p>

        {showSectioned ? (
          <div className="space-y-16">
            {sections!.map((section) => (
              <section key={section.key}>
                <h2 className="mb-6 font-headline text-2xl font-bold tracking-tight text-[#00236f] md:text-3xl">
                  {section.title}
                </h2>
                <GalleryMasonry items={section.photos} />
              </section>
            ))}
          </div>
        ) : (
          <>
            {!displayedItems.length && !loading ? (
              <p className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-[#6e6e73]">
                Rasmlar topilmadi.
              </p>
            ) : (
              <GalleryMasonry items={displayedItems} />
            )}
          </>
        )}

        {hasMore ? (
          <button
            type="button"
            onClick={() => setOffset(items.length)}
            disabled={loading}
            className="mx-auto mt-8 block rounded-full bg-[#00236f] px-6 py-2.5 text-sm font-semibold text-white transition-[transform,opacity,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,0.06,0.19,1)] hover:shadow-[0_18px_40px_-14px_rgba(0,35,111,0.35)] disabled:opacity-60"
          >
            Ko&apos;proq ko&apos;rsatish
          </button>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
