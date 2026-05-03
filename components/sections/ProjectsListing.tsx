import ProjectCard from '@/components/features/projects/ProjectCard'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { PROJECTS as STATIC_PROJECTS } from '@/lib/constants/projects'
import type { Project } from '@/lib/types/project'
import { cn } from '@/lib/utils/cn'

interface ProjectsListingProps {
  className?: string
  /** `null` = fetch failed (show static fallback). `[]` = loaded, none yet. Non-empty = CMS list. */
  projects: Project[] | null
}

function ProjectsListing({ className, projects }: ProjectsListingProps) {
  const data = projects === null ? STATIC_PROJECTS : projects
  const countLabel = String(data.length).padStart(2, '0')

  return (
    <section className={cn('pb-28 pt-0', className)}>
      <div className="mb-10 flex justify-end md:mb-12">
        <div className="hidden md:block" aria-hidden>
          <span className="font-headline text-9xl font-black text-[#1e3a8a] opacity-10">{countLabel}</span>
        </div>
      </div>

      <MobileHorizontalScroller className="-mx-4" viewportClassName="gap-4 px-4 pb-2">
        {data.map((project) => (
          <ProjectCard key={`mobile-${project.id}`} project={project} className="w-[88vw] shrink-0 snap-center" />
        ))}
      </MobileHorizontalScroller>

      <div className="hidden gap-8 md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} className="h-full" />
        ))}
      </div>
    </section>
  )
}

export default ProjectsListing
