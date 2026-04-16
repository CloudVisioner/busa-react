import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface AboutHeroProps {
  className?: string
}

export function AboutHero({ className }: AboutHeroProps) {
  return (
    <section className={cn('mx-auto max-w-7xl px-6 pt-24 pb-16 md:px-8 md:pt-28 md:pb-20', className)}>
      <div className="max-w-4xl">
        <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-surface-variant md:text-lg">BUSA haqida</p>
        <h1 className="font-headline text-5xl font-black tracking-tight text-on-surface md:text-7xl">
          Busandagi o&apos;zbek talabalarining professional hamjamiyati
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant md:text-xl">
          Biz talabalarni birlashtiramiz, akademik va karyera yo&apos;lida qo&apos;llab-quvvatlaymiz, hamda Koreyada kuchli o&apos;zbek yoshlar
          tarmog&apos;ini rivojlantiramiz.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            className="rounded-full bg-[#E53935] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C62828]"
            href={ROUTES.HOME}
          >
            Bosh sahifaga qaytish
          </Link>
          <Link
            className="rounded-full border border-[#00236f]/35 px-7 py-3 text-sm font-bold text-[#00236f] transition hover:bg-[#00236f]/5"
            href={ROUTES.EVENTS}
          >
            Biz bilan bog&apos;lanish
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
