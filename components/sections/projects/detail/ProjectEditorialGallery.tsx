import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialGalleryProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialGallery({ detail, className }: ProjectEditorialGalleryProps) {
  const [a, b, c, d] = detail.galleryImages

  return (
    <section className={cn('mx-auto max-w-7xl px-8 py-24 md:px-20', className)}>
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">{detail.galleryTitle}</h2>
          <p className="mt-4 max-w-xl font-body text-on-surface-variant">{detail.gallerySubtitle}</p>
        </div>
        <Link
          className="border-b-2 border-primary/20 pb-1 font-headline font-bold text-primary transition-all hover:border-primary"
          href={ROUTES.GALLERY}
        >
          Barchasini ko&apos;rish
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:auto-rows-[250px] md:grid-cols-4">
        <div className="group relative h-72 overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:h-full">
          <Image
            src={a.src}
            alt={a.alt}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-end bg-primary/0 p-6 opacity-0 transition-opacity duration-300 group-hover:bg-primary/20 group-hover:opacity-100">
            {a.label ? <span className="font-headline font-bold text-white">{a.label}</span> : null}
          </div>
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
