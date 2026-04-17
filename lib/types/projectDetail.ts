export interface ProjectFeatureBlock {
  icon: string
  title: string
  description: string
  elevated: boolean
}

export interface ProjectProcessStep {
  number: string
  title: string
  description: string
}

export interface ProjectGalleryImage {
  src: string
  alt: string
  label?: string
  layout: 'hero' | 'wide' | 'tall'
}

export interface ProjectDetailContent {
  pageTitle: string
  heroImage: string
  heroEyebrow: string
  heroDisplayTitle: string
  heroSubtitle: string
  aboutTitle: string
  aboutParagraphs: string[]
  features: ProjectFeatureBlock[]
  processTitle: string
  processSteps: ProjectProcessStep[]
  galleryTitle: string
  gallerySubtitle: string
  galleryImages: ProjectGalleryImage[]
  ctaTitle: string
  ctaSubtitle: string
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
}
