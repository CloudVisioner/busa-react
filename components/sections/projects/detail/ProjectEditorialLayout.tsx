import JoinCTA from '@/components/sections/about/JoinCTA'
import ProjectEditorialAbout from '@/components/sections/projects/detail/ProjectEditorialAbout'
import ProjectEditorialGallery from '@/components/sections/projects/detail/ProjectEditorialGallery'
import ProjectEditorialHero from '@/components/sections/projects/detail/ProjectEditorialHero'
import ProjectEditorialProcess from '@/components/sections/projects/detail/ProjectEditorialProcess'
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
    </article>
  )
}

export default ProjectEditorialLayout
