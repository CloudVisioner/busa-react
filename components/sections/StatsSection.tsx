import { cn } from '@/lib/utils/cn'
import Ballpit from '@/components/sections/Ballpit'

interface StatsSectionProps {
  className?: string
}

export function StatsSection({ className }: StatsSectionProps) {
  return (
    <section className={cn('relative overflow-hidden px-6 py-32 md:py-40', className)}>
      <div className="absolute inset-0 bg-[#eceef1]" />
      <div className="absolute inset-0">
        <Ballpit count={100} gravity={0.01} friction={0.9975} wallBounce={0.95} followCursor={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-white/58" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="mb-3 font-label text-sm font-extrabold uppercase tracking-[0.16em] text-[#00236f] md:text-base">BUSA statistikasi</p>
          <h2 className="mb-4 font-headline text-4xl font-bold tracking-tight text-on-surface md:text-5xl">Ishonchli o&apos;sish, real natijalar</h2>
          <p className="text-sm leading-7 text-on-surface-variant md:text-base">
            BUSA platformasi orqali talabalar o&apos;rtasida professional tarmoq, tadbirlar sifati va universitetlar bilan hamkorlik
            barqaror ravishda kengaymoqda.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/5 bg-white/85 p-8 shadow-[0_18px_45px_rgba(25,28,30,0.12)] backdrop-blur-sm md:p-12">
          <div className="grid grid-cols-1 gap-14 text-center md:grid-cols-3">
            <div className="space-y-3">
              <div className="font-headline text-6xl font-black text-[#00236f] md:text-8xl">700+</div>
              <div className="text-[13px] font-normal uppercase tracking-[0.12em] text-[#6e6e73]">Ro&apos;yxatdan o&apos;tgan a&apos;zolar</div>
            </div>
            <div className="space-y-3">
              <div className="font-headline text-6xl font-black text-[#00236f] md:text-8xl">80+</div>
              <div className="text-[13px] font-normal uppercase tracking-[0.12em] text-[#6e6e73]">Yakunlangan tadbirlar</div>
            </div>
            <div className="space-y-3">
              <div className="font-headline text-6xl font-black text-[#00236f] md:text-8xl">15+</div>
              <div className="text-[13px] font-normal uppercase tracking-[0.12em] text-[#6e6e73]">Akademik hamkorlar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
