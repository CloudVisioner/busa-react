import { FaGraduationCap, FaPeopleGroup } from 'react-icons/fa6'
import { HiRocketLaunch } from 'react-icons/hi2'
import { MdCelebration } from 'react-icons/md'
import { cn } from '@/lib/utils/cn'

interface WhyBusaProps {
  className?: string
}

export function WhyBusa({ className }: WhyBusaProps) {
  return (
    <section className={cn('bg-surface-container-low py-24 md:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">BUSA afzalliklari</p>
          <h2 className="mb-6 font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">Nega bizga qo&apos;shilishingiz kerak?</h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(25,28,30,0.14)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#0a66ff]">
              <FaPeopleGroup className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">Kuchli Hamjamiyat</h3>
            <p className="leading-7 text-on-surface-variant">
              Koreyaning har bir burchagidan kelgan vatandoshlar bilan mustahkam aloqalar o&apos;rnating. Biz bir oilamiz va doimo
              bir-birimizga tayanchmiz.
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(25,28,30,0.14)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#0a66ff]">
                <FaGraduationCap className="h-7 w-7" />
              </div>
            <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">Akademik Qo&apos;llab-quvvatlash</h3>
            <p className="leading-7 text-on-surface-variant">
              O&apos;qish jarayonidagi qiyinchiliklarni birgalikda yengamiz. Tajribali talabalardan darslar va maslahatlar oling.
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(25,28,30,0.14)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a66ff] text-white">
              <HiRocketLaunch className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">Karyera Imkoniyatlari</h3>
            <p className="leading-7 text-on-surface-variant">
              Koreyadagi yirik kompaniyalarda amaliyot va ish topishda hamjamiyatning o&apos;rni beqiyos. Networking kuchidan
              foydalaning.
            </p>
          </article>

          <article className="flex flex-col rounded-3xl border border-black/5 bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(25,28,30,0.14)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#0a66ff]">
              <MdCelebration className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-headline text-2xl font-semibold text-on-surface">Kultural Tadbirlar</h3>
            <p className="leading-7 text-on-surface-variant">
              Milliy bayramlarimizni birgalikda nishonlaymiz va o&apos;zbek madaniyatini Koreyada targ&apos;ib qilamiz.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default WhyBusa
