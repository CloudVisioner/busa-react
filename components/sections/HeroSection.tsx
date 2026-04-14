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
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdM7M0LrHxpBBpWhHmFLUFRWvrXXGnXRHlDci4_f5KEb2Phr-HBlQMZStD8qdsd5dgk5ylNhOsg-2upPwQOgF1wZnZYARqlNYtT-fuqqZbBg0Cj7yUjsjSyHTIEgMy0BzYcSeY3U6U818tEVzuMxr5qihBb5kaQ1uQb23SXc4Jt3I_ICxXiKV8MKeiiJpb8A35Pe-Zl54bmnAObBhXkwobjpbF8pXRYybZY5YXPLpLTTqsddmdpAFXXefQcXOlwoasIw69sDw7nrE"
          alt="Wide angle shot of a large group of diverse students laughing and walking together on a modern Busan university campus during sunset"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-8 font-headline text-5xl font-bold leading-none tracking-tighter text-white md:text-8xl">
          Koreyadagi O&apos;zbek Talabalar Hamjamiyati
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl">
          Busan shahrida tahsil olayotgan vatandoshlarimizni birlashtiruvchi, qo&apos;llab-quvvatlovchi va rivojlantiruvchi yagona
          platforma.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            className="min-w-[200px] rounded-full bg-[linear-gradient(135deg,#00236f_0%,#1e3a8a_100%)] px-10 py-5 text-lg font-bold text-white transition-all hover:shadow-xl active:scale-95"
            href={ROUTES.ABOUT}
          >
            Batafsil ma&apos;lumot
          </Link>
          <Link
            className="min-w-[200px] rounded-full border border-white/20 bg-surface-container-lowest/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:text-white active:scale-95"
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
