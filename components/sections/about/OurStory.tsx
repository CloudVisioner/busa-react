import { cn } from '@/lib/utils/cn'

interface OurStoryProps {
  className?: string
}

export function OurStory({ className }: OurStoryProps) {
  return (
    <section className={cn('bg-surface px-6 py-24 md:py-28', className)}>
      <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-black/5 bg-white p-8 shadow-[0_18px_50px_rgba(25,28,30,0.08)] md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">Bizning hikoya</p>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">Kichik uchrashuvdan katta harakatga</h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-on-surface-variant md:text-lg">
          <p>
            BUSA bir necha faol talaba tashabbusi sifatida boshlangan. Maqsad oddiy edi: yangi kelgan o&apos;zbek talabalariga yo&apos;l ko&apos;rsatish va ularni
            jamiyatga tezroq moslashtirish.
          </p>
          <p>
            Bugun esa BUSA tadbirlar, ta&apos;lim dasturlari, networking uchrashuvlari va ijtimoiy loyihalar orqali yuzlab yoshlar uchun ishonchli platformaga
            aylandi.
          </p>
        </div>
      </div>
    </section>
  )
}

export default OurStory
