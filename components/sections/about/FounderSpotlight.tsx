import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface FounderSpotlightProps {
  className?: string
}

export function FounderSpotlight({ className }: FounderSpotlightProps) {
  return (
    <section className={cn('bg-[#eff2f6] px-6 py-24 md:py-28', className)}>
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_24px_60px_rgba(25,28,30,0.12)] md:p-10">
        <div className="grid items-center gap-10 md:grid-cols-[380px_1fr]">
          <div className="relative h-[460px] overflow-hidden rounded-3xl shadow-[0_16px_45px_rgba(25,28,30,0.18)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU"
              alt="BUSA founder portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </div>
          <div className="rounded-3xl border border-black/5 bg-[#f8f9fb] p-8 md:p-10">
            <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">Founder spotlight</p>
            <h2 className="mb-6 font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">“Talabalar birlashsa, imkoniyatlar kengayadi.”</h2>
            <div className="rounded-2xl border border-[#0a66ff]/20 bg-[#eaf2ff] p-6">
              <p className="text-lg leading-8 text-[#0b3f8c]">
                “BUSA ni tashkil etishdagi asosiy g&apos;oya — Koreyaga kelgan har bir o&apos;zbek talabasi o&apos;zini yolg&apos;iz his qilmasin, o&apos;z yo&apos;lini tezroq
                topa olsin va boshqalarga ham turtki bo&apos;lsin.”
              </p>
            </div>

            <div className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-[#0a66ff]">BUSA Leadership</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FounderSpotlight
