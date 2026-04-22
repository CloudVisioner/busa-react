'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FilterPill from '@/components/ui/FilterPill'
import { GALLERY_PHOTOS } from '@/lib/constants/gallery'

type YearFilter = 'barchasi' | 2025 | 2024 | 2023 | 2022 | 2021
type EventFilter = 'barchasi' | 'navruz' | 'trips' | 'bookclub' | 'speakingclub'

const YEAR_FILTERS: readonly YearFilter[] = ['barchasi', 2025, 2024, 2023, 2022, 2021]
const EVENT_FILTERS: ReadonlyArray<{ id: EventFilter; label: string }> = [
  { id: 'barchasi', label: 'BARCHASI' },
  { id: 'navruz', label: "NAVRO'Z" },
  { id: 'trips', label: 'TRIPS' },
  { id: 'bookclub', label: 'BOOK CLUB' },
  { id: 'speakingclub', label: 'SPEAKING CLUB' },
]

export function GalleryPage() {
  const [activeYear, setActiveYear] = useState<YearFilter>('barchasi')
  const [activeEvent, setActiveEvent] = useState<EventFilter>('barchasi')
  const [visible, setVisible] = useState<number>(9)
  const [activeId, setActiveId] = useState<string | null>(null)

  const filteredPhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => {
      const yearMatch = activeYear === 'barchasi' ? true : photo.year === activeYear
      const eventMatch = activeEvent === 'barchasi' ? true : photo.event === activeEvent
      return yearMatch && eventMatch
    })
  }, [activeYear, activeEvent])

  const visiblePhotos = filteredPhotos.slice(0, visible)

  return (
    <>
      <Navbar />
      <main className="bg-white text-[#1d1d1f]">
        <section className="mx-auto mb-20 max-w-[1200px] px-[24px] pt-24 md:pt-28">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Galereya</h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
              BUSA tarixidagi eng yorqin lahzalarni tadbirlar va yillar kesimida tomosha qiling.
            </p>
          </div>
        </section>

        <section className="sticky top-[48px] z-40 border-b border-[rgba(0,0,0,0.06)] bg-white/90 py-[24px] backdrop-blur-md">
          <div className="mx-auto max-w-[1200px] px-[24px]">
            <p className="mb-[10px] text-[11px] text-[#86868b] md:hidden">Filtrlarni yon tomonga suring &rarr;</p>
            <div className="scrollbar-hide flex flex-nowrap items-center gap-[6px] overflow-x-auto pb-[4px] md:flex-wrap md:gap-[12px] md:overflow-visible md:pb-0">
              <span className="mr-[8px] text-[11px] font-normal uppercase tracking-[0.12em] text-[#6e6e73]">YILLAR</span>
              {YEAR_FILTERS.map((year) => (
                <FilterPill
                  key={year}
                  active={activeYear === year}
                  className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]"
                  onClick={() => {
                    setActiveYear(year)
                    setVisible(9)
                    setActiveId(null)
                  }}
                >
                  {year === 'barchasi' ? 'BARCHASI' : year}
                </FilterPill>
              ))}
            </div>

            <div className="my-[16px] h-[1px] w-full bg-[rgba(0,0,0,0.05)]" />

            <div className="scrollbar-hide flex flex-nowrap items-center gap-[6px] overflow-x-auto pb-[4px] md:flex-wrap md:gap-[12px] md:overflow-visible md:pb-0">
              <span className="mr-[8px] text-[11px] font-normal uppercase tracking-[0.12em] text-[#6e6e73]">TADBIRLAR</span>
              {EVENT_FILTERS.map((eventItem) => (
                <FilterPill
                  key={eventItem.id}
                  active={activeEvent === eventItem.id}
                  className="shrink-0 px-[12px] py-[6px] text-[13px] md:px-[16px] md:py-[8px] md:text-[14px]"
                  onClick={() => {
                    setActiveEvent(eventItem.id)
                    setVisible(9)
                    setActiveId(null)
                  }}
                >
                  {eventItem.label}
                </FilterPill>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-[48px] px-[24px] pb-[96px]">
          <div className="mx-auto max-w-[1200px]">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-[16px] space-y-[16px]">
              {visiblePhotos.map((photo) => (
                <article
                  key={photo.id}
                  onClick={() => setActiveId((prev) => (prev === photo.id ? null : photo.id))}
                  className="break-inside-avoid group relative cursor-pointer"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-[16px] group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 rounded-[16px] bg-gradient-to-t from-[#00236f]/70 to-transparent flex flex-col justify-end p-[12px] md:p-[16px] transition-opacity duration-300 ${
                      activeId === photo.id ? 'opacity-100' : 'opacity-0'
                    } md:opacity-0 md:group-hover:opacity-100`}
                  >
                    <p className="text-white text-[14px] font-semibold">{photo.eventName}</p>
                    <span className="text-white/70 text-[11px] mt-[2px]">{photo.year}</span>
                  </div>
                </article>
              ))}
            </div>

            {filteredPhotos.length > visible ? (
              <button
                type="button"
                onClick={() => setVisible((prev) => prev + 9)}
                className="mx-auto mt-[48px] block cursor-pointer text-[17px] font-normal text-[#00236f] underline-offset-4 transition duration-200 hover:underline"
              >
                Ko&apos;proq yuklash
              </button>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default GalleryPage
