'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import { PAGINATED_GALLERY_PHOTOS } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'

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

const LIMIT = 12

export default function GalleryClient() {
  const [items, setItems] = useState<GalleryPhoto[]>([])
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [total, setTotal] = useState(0)
  const debouncedSearch = useDebouncedValue(search, 400)

  const pagination = useMemo(
    () => ({
      limit: LIMIT,
      offset,
      search: debouncedSearch.trim() || undefined,
      type: typeFilter === 'ALL' ? undefined : typeFilter,
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
      offset === 0
        ? data.paginatedGalleryPhotos.items
        : [...prev, ...data.paginatedGalleryPhotos.items],
    )
  }, [data, offset])

  const hasMore = items.length < total
  const typeOptions = Array.from(new Set(items.map((item) => item.event).filter(Boolean)))

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-24 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Galereya</h1>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <FormInput label="Qidirish" value={search} onChange={(event) => setSearch(event.target.value)} />
          <FormSelect label="Type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="ALL">Barchasi</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FormSelect>
        </div>
        <p className="mb-6 text-sm text-[#6e6e73]">{items.length} / {total} ko'rsatilmoqda</p>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {items.map((item) => (
            <article key={item.id} className="break-inside-avoid overflow-hidden rounded-xl shadow-sm bg-white border border-black/10">
              <div>
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt || item.eventName}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-[#00236f] via-[#3c5fb2] to-[#90a8ff]" />
                )}
              </div>
              <div className="p-4">
                <span className="inline-flex text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800">
                  {item.event}
                </span>
                <p className="mt-2 text-base font-semibold line-clamp-2">{item.eventName || item.event}</p>
                <p className="mt-1 text-sm text-[#6e6e73]">{item.year}</p>
              </div>
            </article>
          ))}
        </div>

        {hasMore ? (
          <button
            type="button"
            onClick={() => setOffset(items.length)}
            disabled={loading}
            className="mx-auto mt-8 block rounded-xl bg-[#00236f] px-5 py-2 text-white disabled:opacity-60"
          >
            Ko'proq ko'rsatish
          </button>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
