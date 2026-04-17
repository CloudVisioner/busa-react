'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
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

function getPillClass(isActive: boolean): string {
  return isActive
    ? 'bg-[#00236f] text-white px-[16px] py-[8px] rounded-full text-[14px] font-normal transition duration-200'
    : 'bg-transparent text-[#00236f] border border-[#00236f]/25 px-[16px] py-[8px] rounded-full text-[14px] font-normal hover:border-[#00236f] hover:bg-[#00236f]/5 transition duration-200'
}

export function GalleryPage() {
  const [activeYear, setActiveYear] = useState<YearFilter>('barchasi')
  const [activeEvent, setActiveEvent] = useState<EventFilter>('barchasi')
  const [visible, setVisible] = useState<number>(9)

  const filteredPhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => {
      const yearMatch = activeYear === 'barchasi' ? true : photo.year === activeYear
      const eventMatch = activeEvent === 'barchasi' ? true : photo.event === activeEvent
      return yearMatch && eventMatch
    })
  }, [activeYear, activeEvent])

  useEffect(() => {
    setVisible(9)
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
            <div className="flex flex-wrap items-center gap-[12px]">
              <span className="mr-[8px] text-[11px] font-normal uppercase tracking-[0.12em] text-[#86868b]">YILLAR</span>
              {YEAR_FILTERS.map((year) => (
                <button key={year} type="button" className={getPillClass(activeYear === year)} onClick={() => setActiveYear(year)}>
                  {year === 'barchasi' ? 'BARCHASI' : year}
                </button>
              ))}
            </div>

            <div className="my-[16px] h-[1px] w-full bg-[rgba(0,0,0,0.05)]" />

            <div className="flex flex-wrap items-center gap-[12px]">
              <span className="mr-[8px] text-[11px] font-normal uppercase tracking-[0.12em] text-[#86868b]">TADBIRLAR</span>
              {EVENT_FILTERS.map((eventItem) => (
                <button key={eventItem.id} type="button" className={getPillClass(activeEvent === eventItem.id)} onClick={() => setActiveEvent(eventItem.id)}>
                  {eventItem.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-[48px] px-[24px] pb-[96px]">
          <div className="mx-auto max-w-[1200px]">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-[16px] space-y-[16px]">
              {visiblePhotos.map((photo) => (
                <article key={photo.id} className="break-inside-avoid group relative cursor-pointer">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-[16px] group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 rounded-[16px] bg-gradient-to-t from-[#00236f]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-[16px]">
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
                className="mx-auto mt-[48px] block text-[17px] font-normal text-[#00236f] underline-offset-4 transition duration-200 hover:underline"
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
