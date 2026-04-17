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
          className="inline-flex font-headline text-sm font-bold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-container"
          href={ROUTES.PROJECTS}
        >
          ← Barcha loyihalar
        </Link>
      </div>
    </article>
  )
}

export default ProjectEditorialLayout
