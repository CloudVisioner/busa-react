import ProjectCard from '@/components/features/projects/ProjectCard'
import { PROJECTS } from '@/lib/constants/projects'
import { cn } from '@/lib/utils/cn'

interface ProjectsListingProps {
  className?: string
}

function ProjectsListing({ className }: ProjectsListingProps) {
  const countLabel = String(PROJECTS.length).padStart(2, '0')

  return (
    <section className={cn('pb-28 pt-0', className)}>
      <div className="mb-10 flex justify-end md:mb-12">
        <div className="hidden md:block" aria-hidden>
          <span className="font-headline text-9xl font-black text-[#1e3a8a] opacity-10">{countLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsListing
