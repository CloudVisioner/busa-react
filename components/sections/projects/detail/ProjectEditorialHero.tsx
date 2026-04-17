import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialHeroProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialHero({ detail, className }: ProjectEditorialHeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[420px] flex-col justify-end overflow-hidden px-6 py-24 md:min-h-[480px] md:py-32',
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={detail.heroImage}
          alt={detail.heroDisplayTitle}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="glass-panel mb-6 inline-block rounded-full px-4 py-1 font-label text-sm font-bold uppercase tracking-widest text-primary">
          {detail.heroEyebrow}
        </div>
        <h1 className="mb-6 font-headline text-5xl font-bold leading-none tracking-tighter text-white drop-shadow-md md:text-7xl">
          {detail.heroDisplayTitle}
        </h1>
        <p className="max-w-3xl font-body text-lg font-light leading-8 text-blue-100/90 md:text-xl">{detail.heroSubtitle}</p>
      </div>
    </section>
  )
}

export default ProjectEditorialHero
