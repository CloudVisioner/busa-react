import { FaGraduationCap, FaPeopleGroup } from 'react-icons/fa6'
import { HiRocketLaunch } from 'react-icons/hi2'
import { MdCelebration } from 'react-icons/md'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { cn } from '@/lib/utils/cn'

interface WhyBusaProps {
  className?: string
}

export function WhyBusa({ className }: WhyBusaProps) {
  const cards = [
    {
      key: 'community',
      title: "Kuchli Hamjamiyat",
      text: "Koreyaning har bir burchagidan kelgan vatandoshlar bilan mustahkam aloqalar o'rnating. Biz bir oilamiz va doimo bir-birimizga tayanchmiz.",
      icon: <FaPeopleGroup className="h-7 w-7" />,
      iconClass: 'bg-[#e8f1ff] text-[#0a66ff]',
    },
    {
      key: 'academic',
      title: "Akademik Qo'llab-quvvatlash",
      text: "O'qish jarayonidagi qiyinchiliklarni birgalikda yengamiz. Tajribali talabalardan darslar va maslahatlar oling.",
      icon: <FaGraduationCap className="h-7 w-7" />,
      iconClass: 'bg-[#e8f1ff] text-[#0a66ff]',
    },
    {
      key: 'career',
      title: 'Karyera Imkoniyatlari',
      text: "Koreyadagi yirik kompaniyalarda amaliyot va ish topishda hamjamiyatning o'rni beqiyos. Networking kuchidan foydalaning.",
      icon: <HiRocketLaunch className="h-7 w-7" />,
      iconClass: 'bg-[#0a66ff] text-white',
    },
    {
      key: 'culture',
      title: 'Kultural Tadbirlar',
      text: "Milliy bayramlarimizni birgalikda nishonlaymiz va o'zbek madaniyatini Koreyada targ'ib qilamiz.",
      icon: <MdCelebration className="h-7 w-7" />,
      iconClass: 'bg-[#e8f1ff] text-[#0a66ff]',
    },
  ] as const

  return (
    <section className={cn('bg-surface-container-low px-6 py-16 md:px-8 md:py-32', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">BUSA afzalliklari</p>
          <h2 className="mb-6 font-headline text-3xl font-bold tracking-tight text-primary md:text-5xl">Nega bizga qo&apos;shilishingiz kerak?</h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <MobileHorizontalScroller className="-mx-6" viewportClassName="gap-4 px-6 pb-2">
          {cards.map((card) => (
            <article
              key={card.key}
              className="w-[85vw] shrink-0 snap-center rounded-3xl border border-black/5 bg-surface-container-lowest p-6 shadow-[0_8px_24px_rgba(25,28,30,0.08)]"
            >
              <div className={cn('mb-6 flex h-12 w-12 items-center justify-center rounded-xl', card.iconClass)}>{card.icon}</div>
              <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">{card.title}</h3>
              <p className="leading-7 text-on-surface-variant">{card.text}</p>
            </article>
          ))}
        </MobileHorizontalScroller>

        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          {cards.map((card) => (
            <article
              key={`desktop-${card.key}`}
              className="flex flex-col rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(25,28,30,0.14)]"
            >
              <div className={cn('mb-6 flex h-12 w-12 items-center justify-center rounded-xl', card.iconClass)}>{card.icon}</div>
              <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">{card.title}</h3>
              <p className="leading-7 text-on-surface-variant">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyBusa
