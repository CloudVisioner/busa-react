import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { ROUTES } from '@/lib/constants/routes'
import type { Project } from '@/lib/types/project'
import { cn } from '@/lib/utils/cn'

interface ProjectCardProps {
  project: Project
  className?: string
}

function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `${ROUTES.PROJECTS}/${project.slug}`

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-lg border border-slate-100 bg-white shadow-[0_4px_20px_rgba(30,58,138,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(30,58,138,0.12)]',
        className
      )}
    >
      <Link
        className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#00236f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fa]"
        href={href}
      >
        <span className="relative block h-64 w-full overflow-hidden">
          <Image
            src={project.coverPhoto}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </span>

        <span className="flex flex-1 flex-col bg-white p-8">
          <span className="mb-3 font-headline text-2xl font-bold tracking-tight text-slate-900">{project.title}</span>
          <span className="mb-6 line-clamp-2 flex-1 text-left font-body text-[#44474e]">{project.summary}</span>
          <span className="group/link inline-flex items-center gap-2 font-headline font-bold text-[#00236f]">
            Learn More
            <FiArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
          </span>
        </span>
      </Link>
    </article>
  )
}

export default ProjectCard
