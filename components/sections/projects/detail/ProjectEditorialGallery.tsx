'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ImageLightbox } from '@/components/media/ImageLightbox'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { CursorDrift } from '@/components/ui/CursorDrift'
import { premiumHoverShadowTile } from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { FALLBACK_REMOTE_IMAGE, normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

const hoverEase = 'duration-[1150ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]'

interface ProjectEditorialGalleryProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialGallery({ detail, className }: ProjectEditorialGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const photos = useMemo(() => {
    const normalized = (detail.galleryImages ?? [])
      .filter(Boolean)
      .map((photo, index) => ({
        src: normalizeRemoteImageUrl(photo?.src),
        alt: photo?.alt?.trim() || `Project image ${index + 1}`,
      }))
    while (normalized.length < 4) {
      normalized.push({
        src: FALLBACK_REMOTE_IMAGE,
        alt: `Project image ${normalized.length + 1}`,
      })
    }
    return normalized.slice(0, 4)
  }, [detail.galleryImages])

  const [a, b, c, d] = photos
  const urls = photos.map((p) => p.src)

  return (
    <section className={cn('mx-auto max-w-7xl px-8 py-24 md:px-20', className)}>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">{detail.galleryTitle}</h2>
          <p className="mt-4 max-w-xl font-body text-on-surface-variant">{detail.gallerySubtitle}</p>
        </div>
      </div>

      <MobileHorizontalScroller className="-mx-8 md:hidden" viewportClassName="gap-4 px-8 pb-2">
        {[a, b, c, d].map((photo, index) => (
          <CursorDrift
            as="button"
            key={`${photo.src}-${index}`}
            type="button"
            className={cn(
              'w-[85vw] shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-xl border-0 bg-white p-0 text-left shadow-[0_8px_24px_rgba(25,28,30,0.12)]',
              premiumHoverShadowTile,
            )}
            onClick={() => {
              setLightboxIndex(index)
              setLightboxOpen(true)
            }}
          >
            <div className="relative h-[220px] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="85vw"
                className={cn('object-cover transition-transform hover:scale-[1.02]', hoverEase)}
              />
            </div>
          </CursorDrift>
        ))}
      </MobileHorizontalScroller>

      <div className="hidden grid-cols-1 gap-4 md:auto-rows-[250px] md:grid md:grid-cols-4">
        {[
          { photo: a, span: 'md:col-span-2 md:row-span-2 md:h-full h-72' },
          { photo: b, span: 'md:col-span-2 md:h-full h-64' },
          { photo: c, span: 'md:h-full h-64' },
          { photo: d, span: 'md:h-full h-64' },
        ].map(({ photo, span }, index) => (
          <CursorDrift
            as="button"
            key={`${photo.src}-grid-${index}`}
            type="button"
            className={cn(
              'group relative cursor-zoom-in overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left shadow-[0_8px_24px_rgba(25,28,30,0.1)]',
              premiumHoverShadowTile,
              span,
            )}
            onClick={() => {
              setLightboxIndex(index)
              setLightboxOpen(true)
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className={cn('object-cover transition-transform group-hover:scale-[1.02]', hoverEase)}
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-0 bg-primary/0 opacity-0 transition-[opacity,background-color] group-hover:bg-primary/15 group-hover:opacity-100',
                hoverEase,
              )}
            />
          </CursorDrift>
        ))}
      </div>

      <ImageLightbox
        images={urls}
        isOpen={lightboxOpen}
        startIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        altPrefix={detail.galleryTitle || 'Project'}
        getAlt={(i) => photos[i]?.alt ?? `Image ${i + 1}`}
      />
    </section>
  )
}

export default ProjectEditorialGallery
