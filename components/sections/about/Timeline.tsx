'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface TimelineProps {
  className?: string
}

const ITEMS = [
  {
    year: '2021',
    president: 'Azamat Karimov',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE',
    did: 'BUSA asosiy strukturasini yaratdi va birinchi mentorlik uchrashuvlarini yo\'lga qo\'ydi.',
    changed: 'Yangi kelgan talabalar uchun moslashuv jarayonini tizimli shaklga keltirdi.',
    philosophy: '“Jamoa kuchi individual qiyinchiliklarni yengadi.”',
    vision: 'Barqaror va bir-birini qo\'llaydigan talabalar ekotizimini qurish.',
  },
  {
    year: '2022',
    president: 'Madina Islomova',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU',
    did: 'Speaking club va akademik workshoplarni oyma-oy formatga o\'tkazdi.',
    changed: 'Talabalarning o\'qishdagi hamkorligini kuchaytiradigan madaniyat shakllantirdi.',
    philosophy: '“Bilim bo\'lishilganda yanada qadrlidir.”',
    vision: 'Har bir a\'zoga akademik o\'sish uchun aniq yo\'l ko\'rsatish.',
  },
  {
    year: '2023',
    president: 'Jahongir To\'raev',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To',
    did: 'Koreyadagi hamkor tashkilotlar bilan qo\'shma tadbirlarni boshladi.',
    changed: 'BUSA’ni ichki klublardan tashqariga olib chiqib, tashqi tarmoqlar bilan bog\'ladi.',
    philosophy: '“Networking — bu imkoniyatlarni tezlashtiruvchi kuch.”',
    vision: 'BUSA ni xalqaro talabalar ekotizimida ko\'rinadigan brendga aylantirish.',
  },
  {
    year: '2024',
    president: 'Shahnoza Abduqodirova',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw',
    did: 'Media va PR yo\'nalishida BUSA faoliyatining sifatli hujjatlashtirilishini yo\'lga qo\'ydi.',
    changed: 'Hamjamiyat ichidagi jarayonlarni ochiq, shaffof va foydali kontentga aylantirdi.',
    philosophy: '“Aniq kommunikatsiya — kuchli ishonch asosi.”',
    vision: 'BUSA tarixini va natijalarini tizimli raqamli merosga aylantirish.',
  },
  {
    year: '2025',
    president: 'Yangi avlod yetakchisi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU',
    did: 'Strategik transformatsiya bosqichida karyera va hamkorlik platformalarini chuqurlashtirmoqda.',
    changed: 'BUSA ni yoshlar uchun professional launchpad formatiga olib chiqmoqda.',
    philosophy: '“Katta natija — kichik, ammo izchil qadamlar yig\'indisi.”',
    vision: 'BUSA a\'zolari uchun global miqyosda raqobatbardosh imkoniyatlar yaratish.',
  },
]

export function Timeline({ className }: TimelineProps) {
  const [activeYear, setActiveYear] = useState('2021')
  const activeItem = ITEMS.find((item) => item.year === activeYear) ?? ITEMS[0]

  return (
    <section className={cn('bg-[#f5f5f7] px-6 py-28 md:px-8 md:py-32', className)}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-center font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">
          BUSA tarixi
        </p>
        <h2 className="mb-5 text-center font-headline text-[2rem] font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-[3rem]">
          2021–2025 prezidentlar va o&apos;zgarishlar
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-[1.05rem] leading-relaxed text-slate-600 md:mb-14 md:text-lg md:leading-8">
          Har bir yil uchun alohida president kartasini tanlang va o&apos;sha davrdagi asosiy o&apos;zgarishlarni ko&apos;ring.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-2.5 md:mb-12 md:gap-3">
          {ITEMS.map((item) => {
            const isActive = item.year === activeYear
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveYear(item.year)}
                className={cn(
                  'min-w-[4.5rem] rounded-full border px-5 py-2.5 text-lg font-bold tabular-nums tracking-tight transition md:min-w-[5rem] md:px-6 md:py-3 md:text-xl',
                  isActive ? 'border-[#00236f] bg-[#00236f] text-white' : 'border-black/10 bg-white text-slate-700 hover:border-[#00236f]/40 hover:text-[#00236f]'
                )}
              >
                {item.year}
              </button>
            )
          })}
        </div>

        <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_18px_52px_rgba(25,28,30,0.12)] md:p-7 lg:p-8">
          <article className="grid items-center gap-6 md:grid-cols-[250px_1fr] md:gap-7">
            <div className="rounded-2xl border border-black/5 bg-white p-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={activeItem.image} alt={`${activeItem.president} portreti`} fill sizes="(max-width: 768px) 100vw, 250px" className="object-cover" />
              </div>
              <div className="px-4 py-5 text-center">
                <h3 className="text-2xl font-bold text-slate-900 md:text-[1.75rem]">{activeItem.president}</h3>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0a66ff] md:text-sm">Prezident</p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-center">
              <div className="mb-7 text-center md:text-center">
                <h3 className="font-headline text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">{activeItem.president}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">BUSA rivojlanishidagi asosiy iz va yetakchilik ruhi</p>
              </div>

              <div className="grid gap-5">
                <div className="group rounded-2xl border border-black/5 bg-[#f9fafb] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(10,102,255,0.14)] md:p-8">
                  <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-[#0a66ff] md:text-base">Nima qildi</p>
                  <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-8">{activeItem.did}</p>
                </div>
                <div className="group rounded-2xl border border-black/5 bg-[#f9fafb] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(10,102,255,0.14)] md:p-8">
                  <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-[#0a66ff] md:text-base">Falsafa</p>
                  <p className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-8">{activeItem.philosophy}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Timeline
