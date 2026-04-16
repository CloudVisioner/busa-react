import { getProjectFeatureIcon } from '@/lib/utils/projectFeatureIcons'
import { cn } from '@/lib/utils/cn'

interface ProjectFeatureGlyphProps {
  iconName: string
  className?: string
}

function ProjectFeatureGlyph({ iconName, className }: ProjectFeatureGlyphProps) {
  const Icon = getProjectFeatureIcon(iconName)
  return <Icon className={cn('h-10 w-10 shrink-0 text-primary', className)} aria-hidden />
}

export default ProjectFeatureGlyph
