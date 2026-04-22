import Image from 'next/image'
import Link from 'next/link'
import MobileHorizontalScroller from '@/components/ui/MobileHorizontalScroller'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface ProjectsSectionProps {
  className?: string
}

const PROJECT_ITEMS = [
  {
    title: 'BUSA Trips',
    description: "Koreyaning eng go'zal joylariga do'stona sayohatlar va unutilmas xotiralar.",
    category: 'TRAVEL',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To',
    alt: 'A group of students hiking on a scenic cliff overlooking the ocean in Busan, bright sunny day',
  },
  {
    title: 'Speaking Class',
    description: "Koreys va Ingliz tillarini jonli muloqot orqali o'rganish darslari.",
    category: 'EDUCATION',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE',
    alt: 'Close up of students in a modern classroom setting engaged in a lively discussion with books and coffee',
  },
  {
    title: 'BUSA Sport',
    description: "Muntazam sport uchrashuvlari orqali sog'lom turmush va jamoaviy ruhni oshiramiz.",
    category: 'SPORT',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw',
    alt: 'Energetic shot of students playing football on a rooftop pitch at night under bright stadium lights',
  },
  {
    title: 'Hayriya Tadbirlari',
    description: 'Jamiyat uchun foydali tashabbuslar va ijtimoiy yordam loyihalari.',
    category: 'SOCIAL IMPACT',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU',
    alt: 'Community volunteers and students supporting each other in a social initiative',
  },
] as const

export function ProjectsSection({ className }: ProjectsSectionProps) {
  return (
    <section className={cn('bg-surface px-4 py-16 md:px-8 md:py-32', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-label text-base font-extrabold tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">LOYIHALARIMIZ</span>
            <h2 className="mt-4 font-headline text-3xl font-bold text-primary md:text-5xl">Biz amalga oshirayotgan ishlar</h2>
          </div>
          <Link
            className="hidden rounded-full border border-[#00236f]/35 px-7 py-3 text-sm font-bold text-[#00236f] transition hover:bg-[#00236f]/5 md:block"
            href={ROUTES.PROJECTS}
          >
            Hammasini ko&apos;rish
          </Link>
        </div>

        <MobileHorizontalScroller className="-mx-4" viewportClassName="gap-[16px] px-[16px] pb-[16px]">
          {PROJECT_ITEMS.map((item) => (
            <article key={item.title} className="w-[85vw] shrink-0 snap-center overflow-hidden rounded-[16px] bg-white shadow-[0_10px_30px_rgba(25,28,30,0.12)]">
              <div className="relative h-[220px] w-full">
                <Image src={item.image} alt={item.alt} fill sizes="85vw" className="object-cover" />
              </div>
              <div className="bg-[#f1f1f3] p-[16px]">
                <span className="mb-2 inline-flex w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-900 backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="font-headline text-[19px] font-semibold text-black">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-black">{item.description}</p>
                <Link className="mt-[8px] inline-flex text-[14px] text-[#00236f]" href={ROUTES.PROJECTS}>
                  BATAFSIL
                </Link>
              </div>
            </article>
          ))}
        </MobileHorizontalScroller>

        <div className="mt-6 px-[16px] md:hidden">
          <Link
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#00236f]/35 px-6 py-3 text-sm font-bold text-[#00236f] transition hover:bg-[#00236f]/5"
            href={ROUTES.PROJECTS}
          >
            Hammasini ko&apos;rish
          </Link>
        </div>

        <div className="hidden md:grid md:min-h-[760px] md:grid-cols-4 md:grid-rows-2 md:gap-6">
          <article className="group relative w-full overflow-hidden rounded-[16px] shadow-[0_10px_35px_rgba(25,28,30,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(25,28,30,0.22)] md:rounded-3xl md:col-span-2 md:row-span-2">
            <div className="relative h-[200px] w-full md:absolute md:inset-0 md:h-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To"
                alt="A group of students hiking on a scenic cliff overlooking the ocean in Busan, bright sunny day"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-[16px] object-cover transition-transform duration-700 group-hover:scale-110 md:rounded-none"
              />
            </div>
            <div className="relative min-h-[140px] flex flex-col justify-end bg-[#f1f1f3] p-5 md:absolute md:inset-0 md:min-h-0 md:bg-gradient-to-t md:from-black/85 md:via-black/30 md:to-transparent md:p-10">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-900 backdrop-blur-sm md:text-xs md:tracking-widest">
                TRAVEL
              </span>
              <h3 className="mb-2 font-headline text-[19px] font-semibold text-black md:mb-4 md:text-3xl md:font-bold md:text-white">BUSA Trips</h3>
              <p className="max-w-md line-clamp-2 text-[14px] leading-relaxed text-black md:line-clamp-none md:text-base md:text-white/90">
                Koreyaning eng go&apos;zal joylariga do&apos;stona sayohatlar va unutilmas xotiralar.
              </p>
            </div>
          </article>

          <article className="group relative w-full overflow-hidden rounded-[16px] shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)] md:rounded-3xl md:col-span-2">
            <div className="relative h-[200px] w-full md:absolute md:inset-0 md:h-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE"
                alt="Close up of students in a modern classroom setting engaged in a lively discussion with books and coffee"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-[16px] object-cover transition-transform duration-700 group-hover:scale-110 md:rounded-none"
              />
            </div>
            <div className="relative min-h-[140px] flex flex-col justify-end bg-[#f1f1f3] p-5 md:absolute md:inset-0 md:min-h-0 md:bg-gradient-to-t md:from-black/80 md:via-black/25 md:to-transparent md:p-8">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-900 backdrop-blur-sm md:text-xs md:tracking-widest">
                EDUCATION
              </span>
              <h3 className="mb-2 font-headline text-[19px] font-semibold text-black md:text-2xl md:font-bold md:text-white">Speaking Class</h3>
              <p className="line-clamp-2 text-[14px] leading-relaxed text-black md:line-clamp-none md:text-sm md:text-white/90">
                Koreys va Ingliz tillarini jonli muloqot orqali o&apos;rganish darslari.
              </p>
            </div>
          </article>

          <article className="group relative w-full overflow-hidden rounded-[16px] shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)] md:rounded-3xl">
            <div className="relative h-[200px] w-full md:absolute md:inset-0 md:h-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw"
                alt="Energetic shot of students playing football on a rooftop pitch at night under bright stadium lights"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-[16px] object-cover transition-transform duration-500 group-hover:scale-110 md:rounded-none"
              />
            </div>
            <div className="relative min-h-[140px] flex flex-col justify-end bg-[#f1f1f3] p-5 md:absolute md:inset-0 md:min-h-0 md:bg-gradient-to-t md:from-black/80 md:via-black/25 md:to-transparent md:p-6">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-900 backdrop-blur-sm md:text-xs md:tracking-widest">
                SPORT
              </span>
              <h3 className="font-headline text-[19px] font-semibold text-black md:text-xl md:font-bold md:text-white">BUSA Sport</h3>
              <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-black md:line-clamp-none md:text-sm md:text-white/90">
                Muntazam sport uchrashuvlari orqali sog&apos;lom turmush va jamoaviy ruhni oshiramiz.
              </p>
            </div>
          </article>

          <article className="group relative w-full overflow-hidden rounded-[16px] shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)] md:rounded-3xl">
            <div className="relative h-[200px] w-full md:absolute md:inset-0 md:h-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU"
                alt="Community volunteers and students supporting each other in a social initiative"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-[16px] object-cover transition-transform duration-700 group-hover:scale-110 md:rounded-none"
              />
            </div>
            <div className="relative min-h-[140px] flex flex-col justify-end bg-[#f1f1f3] p-5 md:absolute md:inset-0 md:min-h-0 md:bg-gradient-to-t md:from-black/80 md:via-black/30 md:to-transparent md:p-6">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-900 backdrop-blur-sm md:text-xs md:tracking-widest">
                SOCIAL IMPACT
              </span>
              <h3 className="font-headline text-[19px] font-semibold text-black md:text-xl md:font-bold md:text-white">Hayriya Tadbirlari</h3>
              <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-black md:line-clamp-none md:text-sm md:text-white/90">
                Jamiyat uchun foydali tashabbuslar va ijtimoiy yordam loyihalari.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
