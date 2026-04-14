import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface AboutHeroProps {
  className?: string
}

export function AboutHero({ className }: AboutHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[#f5f5f7] px-6 py-24 md:py-32',
        className
      )}
    >
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To"
        alt="BUSA about hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,245,247,0.74)_0%,rgba(245,245,247,0.88)_60%,rgba(245,245,247,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(10,102,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(10,102,255,0.10),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">BUSA haqida</p>
        <h1 className="font-headline text-5xl font-black tracking-tight text-on-surface md:text-7xl">Busandagi o&apos;zbek talabalarining professional hamjamiyati</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant md:text-xl">
          Biz talabalarni birlashtiramiz, akademik va karyera yo&apos;lida qo&apos;llab-quvvatlaymiz, hamda Koreyada kuchli o&apos;zbek yoshlar tarmog&apos;ini
          rivojlantiramiz.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link className="rounded-full bg-[#0a66ff] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#0854d1]" href={ROUTES.HOME}>
            Bosh sahifaga qaytish
          </Link>
          <Link className="rounded-full border border-[#0a66ff]/30 px-7 py-3 text-sm font-bold text-[#0a66ff] transition hover:bg-[#0a66ff]/5" href={ROUTES.EVENTS}>
            Biz bilan bog&apos;lanish
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
