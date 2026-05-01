import Image from 'next/image'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { cn } from '@/lib/utils/cn'
import { FALLBACK_REMOTE_IMAGE, normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialGalleryProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialGallery({ detail, className }: ProjectEditorialGalleryProps) {
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

  const [a, b, c, d] = normalized

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
          <article key={`${photo.src}-${index}`} className="w-[85vw] shrink-0 snap-center overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(25,28,30,0.12)]">
            <div className="relative h-[220px] w-full">
              <Image src={photo.src} alt={photo.alt} fill sizes="85vw" className="object-cover" />
            </div>
          </article>
        ))}
      </MobileHorizontalScroller>

      <div className="hidden grid-cols-1 gap-4 md:auto-rows-[250px] md:grid md:grid-cols-4">
        <div className="group relative h-72 overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:h-full">
          <Image
            src={a.src}
            alt={a.alt}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/20 group-hover:opacity-100" />
        </div>
        <div className="group relative h-64 overflow-hidden rounded-xl md:col-span-2 md:h-full">
          <Image
            src={b.src}
            alt={b.alt}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/20 group-hover:opacity-100" />
        </div>
        <div className="group relative h-64 overflow-hidden rounded-xl md:h-full">
          <Image
            src={c.src}
            alt={c.alt}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/20 group-hover:opacity-100" />
        </div>
        <div className="group relative h-64 overflow-hidden rounded-xl md:h-full">
          <Image
            src={d.src}
            alt={d.alt}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/20 group-hover:opacity-100" />
        </div>
      </div>
    </section>
  )
}

export default ProjectEditorialGallery
