import { cn } from '@/lib/utils/cn'

interface ProjectsHeroProps {
  className?: string
}

function ProjectsHero({ className }: ProjectsHeroProps) {
  return (
    <header className={cn('mb-20', className)}>
      <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Loyihalar</h1>
      <p className="max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
        BUSA akademik, madaniy va professional yo&apos;nalishdagi tashabbuslari - talabalar rivoji uchun yagona platforma.
      </p>
    </header>
  )
}

export default ProjectsHero
