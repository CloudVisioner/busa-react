'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ImageLightbox } from '@/components/media/ImageLightbox'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { CursorDrift } from '@/components/ui/CursorDrift'
import { premiumHoverShadowTileSoft } from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'

const hoverEase = 'duration-[1150ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]'

interface ProjectDetailPhotoBentoProps {
  photos: string[]
  title: string
  className?: string
}

function ProjectDetailPhotoBento({ photos, title, className }: ProjectDetailPhotoBentoProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const normalized = useMemo(
    () =>
      photos
        .filter(Boolean)
        .map((src, index) => ({
          src: normalizeRemoteImageUrl(src),
          alt: `${title} — ${index + 1}`,
        })),
    [photos, title],
  )

  if (normalized.length === 0) return null

  const urls = normalized.map((p) => p.src)
  const openAt = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const rest = normalized.slice(4)
  const fourBentoPhotos = normalized.length >= 4 ? normalized.slice(0, 4) : null

  /** Mobile: horizontal strip of photos (cap for perf) */
  const mobileStrip = normalized.slice(0, 12)

  const tileButtonClass = cn(
    'group relative cursor-zoom-in overflow-hidden rounded-xl border-0 bg-[#ececf0] p-0 text-left shadow-[0_8px_24px_rgba(25,28,30,0.1)]',
    premiumHoverShadowTileSoft,
  )

  const renderImage = (photo: { src: string; alt: string }, sizes: string) => (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={cn('object-cover transition-transform group-hover:scale-[1.02]', hoverEase)}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-[#00236f]/0 opacity-0 transition-[opacity,background-color] group-hover:bg-[#00236f]/12 group-hover:opacity-100',
          hoverEase,
        )}
      />
    </>
  )

  return (
    <div className={cn(className)}>
      <MobileHorizontalScroller className="-mx-2 md:hidden" viewportClassName="gap-3 px-2 pb-2">
        {mobileStrip.map((photo, index) => (
          <CursorDrift
            as="button"
            key={`${photo.src}-m-${index}`}
            type="button"
            className={cn(tileButtonClass, 'w-[82vw] shrink-0 snap-center sm:w-[70vw]')}
            onClick={() => openAt(index)}
          >
            <div className="relative aspect-[4/3] w-full">
              {renderImage(photo, '82vw')}
            </div>
          </CursorDrift>
        ))}
      </MobileHorizontalScroller>

      {/* md+: Japanese bento / editorial-style masonry (4 tiles) */}
      <div className="hidden md:block">
        {normalized.length === 1 ? (
          <CursorDrift
            as="button"
            type="button"
            className={cn(tileButtonClass, 'relative aspect-[16/10] w-full max-w-4xl')}
            onClick={() => openAt(0)}
          >
            {renderImage(normalized[0]!, '(max-width:1200px) 80vw, 896px')}
          </CursorDrift>
        ) : normalized.length === 2 ? (
          <div className="grid max-w-5xl gap-4 md:grid-cols-2 md:gap-4">
            {normalized.slice(0, 2).map((photo, index) => (
              <CursorDrift
                as="button"
                key={`${photo.src}-${index}`}
                type="button"
                className={cn(tileButtonClass, 'relative aspect-[4/3] w-full')}
                onClick={() => openAt(index)}
              >
                {renderImage(photo, '45vw')}
              </CursorDrift>
            ))}
          </div>
        ) : normalized.length === 3 ? (
          <div className="grid max-w-6xl gap-4 md:auto-rows-[minmax(160px,1fr)] md:grid-cols-4 md:gap-4">
            {[
              { photo: normalized[0]!, span: 'md:col-span-2 md:row-span-2 md:h-full min-h-[280px]', i: 0 },
              { photo: normalized[1]!, span: 'md:col-span-2 md:h-full min-h-[200px]', i: 1 },
              { photo: normalized[2]!, span: 'md:col-span-2 md:h-full min-h-[200px]', i: 2 },
            ].map(({ photo, span, i }) => (
              <CursorDrift
                as="button"
                key={`${photo.src}-t-${i}`}
                type="button"
                className={cn(tileButtonClass, 'relative', span)}
                onClick={() => openAt(i)}
              >
                {renderImage(photo, '50vw')}
              </CursorDrift>
            ))}
          </div>
        ) : fourBentoPhotos ? (
          <div className="grid max-w-6xl gap-4 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
            {(
              [
                { photo: fourBentoPhotos[0], span: 'md:col-span-2 md:row-span-2 md:h-full h-72', i: 0 },
                { photo: fourBentoPhotos[1], span: 'md:col-span-2 md:h-full h-64', i: 1 },
                { photo: fourBentoPhotos[2], span: 'md:h-full h-64', i: 2 },
                { photo: fourBentoPhotos[3], span: 'md:h-full h-64', i: 3 },
              ] as const
            ).map(({ photo, span, i }) => (
              <CursorDrift
                as="button"
                key={`${photo.src}-bento-${i}`}
                type="button"
                className={cn(tileButtonClass, 'relative', span)}
                onClick={() => openAt(i)}
              >
                {renderImage(photo, '(max-width:768px) 100vw, 50vw')}
              </CursorDrift>
            ))}
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((photo, j) => {
              const globalIndex = 4 + j
              return (
                <CursorDrift
                  as="button"
                  key={`${photo.src}-rest-${globalIndex}`}
                  type="button"
                  className={cn(tileButtonClass, 'relative aspect-[4/3] w-full')}
                  onClick={() => openAt(globalIndex)}
                >
                  {renderImage(photo, '33vw')}
                </CursorDrift>
              )
            })}
          </div>
        ) : null}
      </div>

      <ImageLightbox
        images={urls}
        isOpen={lightboxOpen}
        startIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        altPrefix={title}
        getAlt={(i) => normalized[i]?.alt ?? `Image ${i + 1}`}
      />
    </div>
  )
}

export default ProjectDetailPhotoBento
