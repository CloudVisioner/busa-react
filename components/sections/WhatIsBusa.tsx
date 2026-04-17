'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface WhatIsBusaProps {
  className?: string
}

export function WhatIsBusa({ className }: WhatIsBusaProps) {
  return (
    <section
      id="about"
      className={cn(
        'relative bg-surface bg-[radial-gradient(circle_at_top_left,rgba(0,35,111,0.04),transparent_50%)] py-24 md:py-32',
        className
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8 lg:pr-6">
          <span className="inline-flex w-fit rounded-full bg-primary/10 px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.16em] text-primary md:text-base">
            Biz haqimizda
          </span>

          <div>
            <h2 className="font-headline text-5xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl">
              Koreyadagi o&apos;zbek talabalar hamjamiyati.
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-primary" />
          </div>

          <p className="max-w-xl text-lg leading-8 text-on-surface-variant md:text-xl">
            Bu hamjamiyat Busan shahridagi o&apos;zbek talabalarini birlashtirib, yangi kelganlarga moslashuvda yordam beradi, ta&apos;lim va
            karyera bo&apos;yicha amaliy yo&apos;naltirish beradi hamda hamkorlikdagi loyihalar orqali professional va ijtimoiy o&apos;sishni qo&apos;llab-quvvatlaydi.
          </p>

          <Link
            className="group mt-2 inline-flex items-center gap-2 text-base font-bold text-primary underline decoration-primary/40 underline-offset-4"
            href={ROUTES.ABOUT}
          >
            Biz haqimizda ko&apos;proq
            <FiArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="group relative h-[420px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-white to-surface-container-lowest shadow-[0_12px_40px_rgba(0,35,111,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,35,111,0.18)] md:h-[560px]">
          <div className="absolute inset-0 -z-20 rounded-3xl bg-primary/5" />
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-3xl bg-primary/8" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU"
            alt="Professional candid group photo of smiling Uzbek students holding a flag in front of a modern Busan landmark"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-surface/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/25 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default WhatIsBusa
