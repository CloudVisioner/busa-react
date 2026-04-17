import { cn } from '@/lib/utils/cn'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialProcessProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialProcess({ detail, className }: ProjectEditorialProcessProps) {
  return (
    <section
      className={cn(
        'border-t border-slate-200/60 bg-[#f5f5f7] py-20 md:py-28',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h2 className="mb-14 text-center font-headline text-3xl font-bold tracking-tight text-primary md:mb-20 md:text-4xl lg:text-5xl">
          {detail.processTitle}
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
          {detail.processSteps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <p
                className="mb-4 font-headline text-6xl font-bold leading-none tracking-tight text-slate-300 md:text-7xl lg:text-8xl"
                aria-hidden
              >
                {step.number}
              </p>
              <h3 className="mb-3 font-headline text-xl font-bold tracking-tight text-primary md:text-2xl">{step.title}</h3>
              <p className="font-body text-base leading-relaxed text-slate-600 md:text-[1.0625rem]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectEditorialProcess
