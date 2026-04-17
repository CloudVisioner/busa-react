import { cn } from '@/lib/utils/cn'

interface AboutHeroProps {
  className?: string
}

export function AboutHero({ className }: AboutHeroProps) {
  return (
    <header className={cn('mx-auto mb-20 max-w-7xl px-6 pt-24 md:px-8 md:pt-28', className)}>
      <div className="max-w-3xl">
        <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">BUSA</h1>
        <p className="mb-5 max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
          Koreyadagi o&apos;zbek talabalarining akademik, ijtimoiy va professional rivojlanishini qo&apos;llab-quvvatlaydigan hamjamiyat.
        </p>
      </div>
    </header>
  )
}

export default AboutHero
