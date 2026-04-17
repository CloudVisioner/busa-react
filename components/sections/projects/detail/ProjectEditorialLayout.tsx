import Link from 'next/link'
import JoinCTA from '@/components/sections/about/JoinCTA'
import ProjectEditorialAbout from '@/components/sections/projects/detail/ProjectEditorialAbout'
import ProjectEditorialGallery from '@/components/sections/projects/detail/ProjectEditorialGallery'
import ProjectEditorialHero from '@/components/sections/projects/detail/ProjectEditorialHero'
import ProjectEditorialProcess from '@/components/sections/projects/detail/ProjectEditorialProcess'
import { ROUTES } from '@/lib/constants/routes'
import type { ProjectDetailContent } from '@/lib/types/projectDetail'

interface ProjectEditorialLayoutProps {
  detail: ProjectDetailContent
}

function ProjectEditorialLayout({ detail }: ProjectEditorialLayoutProps) {
  return (
    <article className="bg-surface">
      <ProjectEditorialHero detail={detail} />
      <ProjectEditorialAbout detail={detail} />
      <ProjectEditorialProcess detail={detail} />
      <ProjectEditorialGallery detail={detail} />
      <JoinCTA
        variant="plain"
        eyebrow="Loyihalar"
        title="Loyihalarimizga qo'shiling"
        description="O'zingizni rivojlantiring, yangi do'stlar orttiring va Busan talabalar hamjamiyatining faol a'zosiga aylaning."
      />
      <div className="mx-auto max-w-7xl px-8 pb-8 md:px-20">
        <Link
          className="inline-flex items-center rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 font-headline text-base font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_8px_24px_rgba(0,35,111,0.14)]"
          href={ROUTES.PROJECTS}
        >
          ← Barcha loyihalar
        </Link>
      </div>
    </article>
  )
}

export default ProjectEditorialLayout
