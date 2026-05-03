'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CoverPhotoPlaceholder } from '@/components/media/CoverPhotoPlaceholder'
import { CursorDrift } from '@/components/ui/CursorDrift'
import { ROUTES } from '@/lib/constants/routes'
import type { Project } from '@/lib/types/project'
import { premiumHoverMedia, premiumHoverRing, premiumHoverShadowCard } from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { isRenderableCoverPhoto } from '@/lib/utils/coverPhoto'
import { htmlToPlainText } from '@/lib/utils/richText'

interface ProjectCardProps {
  project: Project
  className?: string
}

function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `${ROUTES.PROJECTS}/${project.slug}`
  const snippet = htmlToPlainText(project.description ?? '')
  return (
    <CursorDrift
      as="article"
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm',
        premiumHoverRing,
        premiumHoverShadowCard,
        'hover:border-black/[0.12]',
        className,
      )}
    >
      <Link
        className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#00236f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fa]"
        href={href}
      >
        <span className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#ececf0]">
          {isRenderableCoverPhoto(project.coverPhoto) ? (
            <Image
              src={project.coverPhoto}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn('object-cover', premiumHoverMedia)}
            />
          ) : (
            <CoverPhotoPlaceholder className="absolute inset-0 h-full w-full" />
          )}
        </span>

        <span className="flex flex-1 flex-col bg-white p-8">
          <span className="mb-3 font-headline text-2xl font-bold tracking-tight text-slate-900">{project.title}</span>
          <span className="mb-6 line-clamp-2 flex-1 text-left font-body text-[#44474e]">{snippet || project.title}</span>
          <span className="inline-block font-headline font-bold text-[#00236f] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,0.06,0.19,1)] group-hover:translate-x-1">
            Learn More →
          </span>
        </span>
      </Link>
    </CursorDrift>
  )
}

export default ProjectCard
