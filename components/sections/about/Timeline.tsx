'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ImageLightbox } from '@/components/media/ImageLightbox'
import { cn } from '@/lib/utils/cn'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

export interface TimelineItem {
  year: string
  president: string
  image: string
  did: string
  changed: string
  philosophy: string
  vision: string
}

interface TimelineProps {
  className?: string
  items?: TimelineItem[]
}

const STATIC_ITEMS: TimelineItem[] = [
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

const HTML_FRAGMENT_RE = /<[a-z][\s\S]*>/i

function TimelineDidBlock({ did, changed, vision }: { did: string; changed: string; vision: string }) {
  const safeDid = did ?? ''
  const tail = [changed, vision].filter(Boolean).join(' ')
  const isRichHtml = HTML_FRAGMENT_RE.test(safeDid)

  return (
    <div className="min-w-0 max-w-full space-y-2">
      <p className="text-[17px] leading-relaxed md:text-[18px] md:leading-8">
        <span className="font-bold text-slate-900 text-[17px] md:text-[19px]">Nima qildi:</span>
      </p>
      {isRichHtml ? (
        <>
          <div
            className={cn(
              'prose prose-slate max-w-none min-w-0 text-slate-700',
              'prose-p:my-2 prose-p:text-[17px] prose-p:leading-relaxed md:prose-p:text-[18px]',
              '[&_img]:h-auto [&_img]:max-w-full [&_img]:object-contain',
              '[&_video]:max-w-full',
              '[&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:break-words',
              '[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto',
            )}
            dangerouslySetInnerHTML={{ __html: safeDid }}
          />
          {tail ? (
            <p className="break-words text-[17px] leading-relaxed text-slate-700 [overflow-wrap:anywhere] md:text-[18px] md:leading-8">
              {tail}
            </p>
          ) : null}
        </>
      ) : (
        <p className="break-words text-[17px] leading-relaxed text-slate-700 [overflow-wrap:anywhere] md:text-[18px] md:leading-8">
          {[safeDid, changed, vision].filter(Boolean).join(' ')}
        </p>
      )}
    </div>
  )
}

export function Timeline({ className, items }: TimelineProps) {
  const data = items ?? STATIC_ITEMS
  const [activeYear, setActiveYear] = useState(data[0]?.year ?? '2021')
  const [portraitLightbox, setPortraitLightbox] = useState(false)
  const activeItem = data.find((item) => item.year === activeYear) ?? data[0]
  const portraitSrc = activeItem.image?.trim() ? activeItem.image.trim() : FALLBACK_REMOTE_IMAGE

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- close lightbox when year chip changes */
    setPortraitLightbox(false)
  }, [activeYear])

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
          Har bir yil bo&apos;yicha prezidentning to&apos;liq ismi, qilgan ishlari, qanday yondashuv qo&apos;llagani va nima uchun bu yo&apos;nalish
          tanlangani haqida qisqa, aniq va professional ma&apos;lumot bilan tanishing.
        </p>

        <div className="mb-10 flex flex-nowrap justify-start gap-[6px] overflow-x-auto pb-[4px] scrollbar-hide md:mb-12 md:justify-center md:gap-3 md:overflow-visible md:pb-0">
          {data.map((item) => {
            const isActive = item.year === activeYear
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveYear(item.year)}
                className={cn(
                  'shrink-0 rounded-full border px-[12px] py-[6px] text-[13px] font-bold tabular-nums tracking-tight transition-[border-color,background-color,color,transform] duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] md:min-w-[5rem] md:px-6 md:py-3 md:text-xl',
                  isActive ? 'border-[#00236f] bg-[#00236f] text-white' : 'border-black/10 bg-white text-slate-700 hover:border-[#00236f]/40 hover:text-[#00236f]'
                )}
              >
                {item.year}
              </button>
            )
          })}
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_18px_52px_rgba(25,28,30,0.12)] md:p-8 lg:p-10">
          <article className="flex min-w-0 flex-col items-center gap-8 overflow-hidden md:grid md:grid-cols-[minmax(0,250px)_minmax(0,1fr)] md:items-stretch md:gap-10">
            <div className="w-full min-w-0 rounded-[16px] border border-black/5 bg-white md:w-auto md:max-w-[250px] md:rounded-2xl">
              <button
                type="button"
                className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-t-[16px] border-0 bg-transparent p-0 md:rounded-2xl"
                onClick={() => setPortraitLightbox(true)}
              >
                <Image
                  src={portraitSrc}
                  alt={`${activeItem.president} portreti`}
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover object-top transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.02]"
                />
              </button>
              <div className="min-w-0 p-[20px] text-left md:px-4 md:py-5 md:text-center">
                <h3 className="break-words text-[19px] font-semibold text-[#1d1d1f]">{activeItem.president}</h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#86868b]">Prezident</p>
                <p className="mt-1 text-[12px] text-[#86868b]">{activeItem.year}</p>
              </div>
            </div>

            <div className="flex w-full min-w-0 max-w-full flex-col justify-center space-y-5 overflow-hidden text-left md:h-full md:min-h-0 md:space-y-6">
              <TimelineDidBlock did={activeItem.did} changed={activeItem.changed} vision={activeItem.vision} />
              {activeItem.philosophy?.trim() ? (
                <>
                  <div className="h-px w-full min-w-0 shrink-0 bg-black/10" />
                  <p className="min-w-0 max-w-full break-words text-[18px] italic leading-relaxed text-[#6e6e73] [overflow-wrap:anywhere] md:text-[19px] md:leading-8">
                    {activeItem.philosophy}
                  </p>
                </>
              ) : null}
            </div>
          </article>
        </div>
      </div>

      <ImageLightbox
        images={[portraitSrc]}
        isOpen={portraitLightbox}
        startIndex={0}
        onClose={() => setPortraitLightbox(false)}
        altPrefix="Portrait"
        getAlt={() => `${activeItem.president} — ${activeItem.year}`}
      />
    </section>
  )
}

export default Timeline
