'use client'

import Link from 'next/link'
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface VisaTypesSectionProps {
  className?: string
}

interface VisaTypeCard {
  code: string
  slug: string
  label: string
  subtitle: string
  items: string[]
  icon: React.ComponentType<{ className?: string }>
}

const VISA_TYPES: VisaTypeCard[] = [
  {
    code: 'D-2',
    slug: 'd-2',
    label: 'Student Visa',
    subtitle: "O'qish davomiyligi bo'yicha uzaytirish imkoniyati",
    items: [
      "O'qish davomiyligi bo'yicha uzaytirish imkoniyati",
      'Ishlash huquqi (Part-time) haftasiga 20 soat',
      'TOPIK sertifikati talab qilinadi',
    ],
    icon: HiOutlineAcademicCap,
  },
  {
    code: 'D-10',
    slug: 'd-10',
    label: 'Job Seeker',
    subtitle: '6 oygacha ish qidirish huquqi',
    items: ['6 oygacha ish qidirish huquqi', 'Ball tizimi asosida uzaytirish', 'Internship (stajirovka) qilish imkoniyati'],
    icon: HiOutlineBriefcase,
  },
  {
    code: 'E-7',
    slug: 'e-7',
    label: 'Professional Worker',
    subtitle: 'Kompaniya bilan rasmiy shartnoma talabi',
    items: ['Kompaniya bilan rasmiy shartnoma talabi', 'Oylik maosh minimum talablari', 'Oilani olib kelish huquqi'],
    icon: HiOutlineWrenchScrewdriver,
  },
]

function VisaTypesSection({ className }: VisaTypesSectionProps) {
  return (
    <section className={cn('mx-auto max-w-[1400px] px-6 py-20 md:py-24', className)}>
      <div className="mb-10 flex flex-col gap-3 md:mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00236f]">Viza turlari</p>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">Asosiy viza toifalari</h2>
        <p className="max-w-2xl text-sm text-on-surface-variant md:text-base">
          Talabalik, ish izlash va professional faoliyat uchun Koreyada eng ko&apos;p uchraydigan viza turlari.
        </p>
      </div>
      <MobileHorizontalScroller className="-mx-6" viewportClassName="gap-[16px] px-[16px] pb-[16px]">
        {VISA_TYPES.map((visa) => {
          const Icon = visa.icon
          return (
            <article
              key={visa.code}
              className="group w-[85vw] shrink-0 snap-center rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white p-[24px] shadow-sm transition-all duration-200"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6 text-[#00236f]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{visa.label}</span>
              </div>
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">{visa.code}</h3>
              <p className="mb-5 text-sm text-on-surface-variant">{visa.subtitle}</p>
              <ul className="mb-6 space-y-3 text-sm text-on-surface-variant">
                {visa.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00236f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${ROUTES.VISA}/${visa.slug}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-[#00236f] bg-transparent py-[12px] text-[15px] font-normal text-[#00236f] transition hover:opacity-90"
              >
                Batafsil
              </Link>
            </article>
          )
        })}
      </MobileHorizontalScroller>

      <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-3">
        {VISA_TYPES.map((visa) => {
          const Icon = visa.icon
          return (
            <article
              key={visa.code}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6 text-[#00236f]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{visa.label}</span>
              </div>
              <h3 className="mb-2 font-headline text-2xl font-bold tracking-tight text-on-surface">{visa.code}</h3>
              <p className="mb-5 text-sm text-on-surface-variant">{visa.subtitle}</p>
              <ul className="mb-6 space-y-3 text-sm text-on-surface-variant">
                {visa.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00236f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${ROUTES.VISA}/${visa.slug}`}
                className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-[#00236f] px-7 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Batafsil
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default VisaTypesSection
