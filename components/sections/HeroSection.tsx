import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn('relative flex min-h-[700px] h-screen items-center justify-center overflow-hidden', className)}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Koreya, kechqurun shahar manzarasi — BUSA jamiyati uchun hero fon"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.62]"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-primary/30 to-primary/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-slate-900/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-8 font-headline text-5xl font-bold leading-none tracking-tighter text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-8xl">
          Koreyadagi O&apos;zbek Talabalar Hamjamiyati
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-white/95 drop-shadow-md md:text-2xl">
          Busan shahrida tahsil olayotgan vatandoshlarimizni birlashtiruvchi, qo&apos;llab-quvvatlovchi va rivojlantiruvchi yagona
          platforma.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            className="rounded-full bg-[#E53935] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C62828]"
            href={ROUTES.ABOUT}
          >
            Batafsil ma&apos;lumot
          </Link>
          <Link
            className="rounded-full border border-white/80 bg-white px-7 py-3 text-sm font-bold text-black transition hover:bg-white/90"
            href={ROUTES.ABOUT}
          >
            Bizga qo&apos;shiling
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
