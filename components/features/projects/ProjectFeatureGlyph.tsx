import { createElement } from 'react'
import { getProjectFeatureIcon } from '@/lib/utils/projectFeatureIcons'
import { cn } from '@/lib/utils/cn'

interface ProjectFeatureGlyphProps {
  iconName: string
  className?: string
}

function ProjectFeatureGlyph({ iconName, className }: ProjectFeatureGlyphProps) {
  return createElement(getProjectFeatureIcon(iconName), {
    className: cn('h-10 w-10 shrink-0 text-primary', className),
    'aria-hidden': true,
  })
}

export default ProjectFeatureGlyph
