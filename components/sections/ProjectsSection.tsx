import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface ProjectsSectionProps {
  className?: string
}

export function ProjectsSection({ className }: ProjectsSectionProps) {
  return (
    <section className={cn('bg-surface px-6 py-32', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-label text-base font-extrabold tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">LOYIHALARIMIZ</span>
            <h2 className="mt-4 font-headline text-4xl font-bold text-primary md:text-5xl">Biz amalga oshirayotgan ishlar</h2>
          </div>
          <Link
            className="hidden rounded-full border border-primary/30 px-5 py-2.5 font-bold text-primary transition-colors hover:bg-primary hover:text-white md:block"
            href={ROUTES.PROJECTS}
          >
            Hammasini ko&apos;rish
          </Link>
        </div>

        <div className="grid min-h-[760px] grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2">
          <article className="group relative overflow-hidden rounded-3xl shadow-[0_10px_35px_rgba(25,28,30,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(25,28,30,0.22)] md:col-span-2 md:row-span-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To"
              alt="A group of students hiking on a scenic cliff overlooking the ocean in Busan, bright sunny day"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-8 md:p-10">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-widest text-slate-900 backdrop-blur-sm">
                TRAVEL
              </span>
              <h3 className="mb-4 font-headline text-3xl font-bold text-white">BUSA Trips</h3>
              <p className="max-w-md text-white/90">Koreyaning eng go&apos;zal joylariga do&apos;stona sayohatlar va unutilmas xotiralar.</p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)] md:col-span-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE"
              alt="Close up of students in a modern classroom setting engaged in a lively discussion with books and coffee"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent p-8">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-widest text-slate-900 backdrop-blur-sm">
                EDUCATION
              </span>
              <h3 className="mb-2 font-headline text-2xl font-bold text-white">Speaking Class</h3>
              <p className="text-sm text-white/90">Koreys va Ingliz tillarini jonli muloqot orqali o&apos;rganish darslari.</p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw"
              alt="Energetic shot of students playing football on a rooftop pitch at night under bright stadium lights"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-widest text-slate-900 backdrop-blur-sm">
                SPORT
              </span>
              <h3 className="font-headline text-xl font-bold text-white">BUSA Sport</h3>
              <p className="mt-2 text-sm text-white/90">Muntazam sport uchrashuvlari orqali sog&apos;lom turmush va jamoaviy ruhni oshiramiz.</p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(25,28,30,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,28,30,0.16)]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU"
              alt="Community volunteers and students supporting each other in a social initiative"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
              <span className="mb-2 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-widest text-slate-900 backdrop-blur-sm">
                SOCIAL IMPACT
              </span>
              <h3 className="font-headline text-xl font-bold text-white">Hayriya Tadbirlari</h3>
              <p className="mt-2 text-sm text-white/90">Jamiyat uchun foydali tashabbuslar va ijtimoiy yordam loyihalari.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
