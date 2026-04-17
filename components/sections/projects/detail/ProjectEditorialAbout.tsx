import ProjectFeatureGlyph from '@/components/features/projects/ProjectFeatureGlyph'
import { cn } from '@/lib/utils/cn'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialAboutProps {
  detail: ProjectDetailContent
  className?: string
}

function ProjectEditorialAbout({ detail, className }: ProjectEditorialAboutProps) {
  return (
    <section className={cn('border-t border-slate-200/80 bg-[#f7f9fb] py-20 md:py-28', className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-4xl font-bold leading-[1.1] tracking-tight text-primary md:text-5xl">{detail.aboutTitle}</h2>
            <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-slate-600 md:text-lg">
              {detail.aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
            {detail.features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col rounded-2xl border border-slate-100/90 bg-white p-7 shadow-[0_10px_40px_rgba(0,35,111,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_44px_rgba(0,35,111,0.09)] md:p-8"
              >
                <div className="mb-5">
                  <ProjectFeatureGlyph iconName={f.icon} className="h-11 w-11 md:h-12 md:w-12" />
                </div>
                <h3 className="mb-2 font-headline text-lg font-bold tracking-tight text-primary md:text-xl">{f.title}</h3>
                <p className="font-body text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectEditorialAbout
