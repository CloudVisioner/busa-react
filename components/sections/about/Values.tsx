import { cn } from '@/lib/utils/cn'

interface ValuesProps {
  className?: string
}

const VALUES = [
  { title: 'Hamjihatlik', text: 'Har bir a\'zo jamoaning muhim qismi ekani va bir-birini ko\'tarishi biz uchun eng asosiy prinsip.' },
  { title: 'Mas\'uliyat', text: 'Vaqtga, va\'daga va natijaga bo\'lgan professional yondashuv har bir tashabbusning markazida turadi.' },
  { title: 'Halollik', text: 'Ichki jarayonlar, qarorlar va hamkorliklarda ochiqlik hamda shaffoflikni qat\'iy saqlaymiz.' },
  { title: 'Rivojlanish', text: 'A\'zolarimiz uchun yangi bilim, ko\'nikma va karyera imkoniyatlarini uzluksiz yaratamiz.' },
  { title: 'Yetakchilik', text: 'Har bir talaba tashabbus ko\'rsatishi, jamoani ilhomlantirishi va ijobiy ta\'sir qoldirishi kerak.' },
  { title: 'Vatanparvarlik', text: 'Koreyada bo\'lsak ham, O\'zbekiston sha\'nini bilim, madaniyat va odob bilan munosib namoyon etamiz.' },
]

export function Values({ className }: ValuesProps) {
  return (
    <section className={cn('bg-surface px-6 py-24 md:py-28', className)}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">Qadriyatlarimiz</p>
        <h2 className="mb-14 text-center font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">Nimani qadrlaymiz?</h2>
        <div className="grid grid-cols-2 gap-[12px] md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <article
              key={value.title}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-5 md:p-7 shadow-[0_12px_30px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(10,102,255,0.18)]',
                VALUES.length === 3 && index === VALUES.length - 1 ? 'col-span-2 mx-auto max-w-[50%]' : ''
              )}
            >
              <div className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f1ff] text-[13px] font-black text-[#0a66ff] md:h-9 md:w-9 md:text-sm">
                {index + 1}
              </div>
              <h3 className="mb-3 text-[15px] font-semibold text-on-surface transition-colors group-hover:text-[#0a66ff] md:text-2xl md:font-bold">
                {value.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-on-surface-variant md:text-base md:leading-7">{value.text}</p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#0a66ff] via-[#4f85ff] to-[#9ab9ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values
