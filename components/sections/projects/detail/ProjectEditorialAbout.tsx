import ProjectFeatureGlyph from '@/components/features/projects/ProjectFeatureGlyph'
import { CursorDrift } from '@/components/ui/CursorDrift'
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
            <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-slate-700 md:text-lg">
              {detail.aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-6">
            {detail.features.map((f) => (
              <CursorDrift
                key={f.title}
                className="group flex min-h-[220px] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100/90 bg-white p-5 shadow-[0_10px_40px_rgba(0,35,111,0.06)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-slate-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:p-8"
              >
                <div className="mb-4">
                  <ProjectFeatureGlyph iconName={f.icon} className="h-9 w-9 transition-transform duration-300 group-hover:scale-105 md:h-12 md:w-12" />
                </div>
                <h3 className="mb-2 break-words font-headline text-base font-bold tracking-tight text-primary md:text-xl">{f.title}</h3>
                <p className="break-words font-body text-[13px] leading-relaxed text-slate-700 [overflow-wrap:anywhere] md:text-[0.9375rem]">
                  {f.description}
                </p>
              </CursorDrift>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectEditorialAbout
