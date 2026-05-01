'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

export interface TeamMember {
  name: string
  role: string
  joined: string
  photo: string
}

interface TeamSectionProps {
  className?: string
  members?: TeamMember[]
}

const LEADERS: TeamMember[] = [
  {
    name: 'Azamat Karimov',
    role: 'President',
    joined: '2021',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU',
  },
  {
    name: 'Madina Islomova',
    role: 'Vice President',
    joined: '2022',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE',
  },
  {
    name: 'Jahongir To\'raev',
    role: 'Project Manager',
    joined: '2022',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To',
  },
  {
    name: 'Shahnoza Abduqodirova',
    role: 'Project Manager',
    joined: '2023',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw',
  },
  {
    name: 'Nodirbek Yo\'ldoshev',
    role: 'Project Manager',
    joined: '2023',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2sVg0nxFlENa5D0eYVzU4RVe-O3AAoV-rpjlFkeb-Y_ho6uJaO8bpve9mhhvSAiNs07gQsRdXFP32x2J0H84rNwr5U6ZMDNf9CBmTfap302aoNEpa4aljHSYYdgIDzXmzfl6MrGj0mDW4yLV6Jl1LAq_cfBWzOvR1kf9e7y3nszzbnyJmQcG4HjCqCznPObPxHhFQHEU2qvI3ciKbPcEmVwvzZ7jU9-MIMFRY5541FY47p28Y0oVBycXWaO31UFRPYMmk1YL9-CU',
  },
  {
    name: 'Nilufar Qobilova',
    role: 'Project Manager',
    joined: '2024',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAejsHrwe5cJcl-o_rQyjxsIWSgxI_G1ZAUl4HgIXx91DSqyrzRHYdvSCqP_UTA3h2rpO8S3IuJ0rYhb996au_SZoJHmnSrFQUFeOuFnROsJh5D7iblA8C-DXZ2guy0esVUSTEuc1ZHp6lG9U3vnumcUkwOI0KuPMY90hQRoUaMJaQ2MvRgojrnPPJGbdPPDSR547NcD76R74_bIn1nlJ7PGKxsbjR9nzmhcF-VXT0cDETi9Znv1ayYhyUe9nrwsHAZ7NbTpA5-9mE',
  },
  {
    name: 'Bekzod Rasulov',
    role: 'Design Lead',
    joined: '2024',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDzwOQYJkfA507n6tYWdg4yio8kgd5aVM1Q6cNp0QTUiYEj-bOWXdyFBIEvmeOUJkkk6cY0LQRosjnhYGumi3BohFBH4jHW4QS9w-p0EA7zPUijqcvnqZvznt2rw63Kt2VbZTejHMlpOIocEQcp3-CkYZeVDLC8LPEDLUOnx1nmIrfUkcVfMtKmjo3g8GIkqdzUqSL5n32ne03GGsssKAxK6vHuewkKS_3VzdQ3jZT23cprHHogaAt9GCy0KDzKU-slAsc6RoOe9To',
  },
  {
    name: 'Gulruh Karimova',
    role: 'Tech Lead',
    joined: '2025',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfciktymY66UXpPX_bFzRN2AUdnER6kiPJbMBd_JnHjrko7ynfkW8zHV32iqIxxYDRtOZ__94JimfZTKXueAg_847d5w9wvH9Vhyg1MTCpozoHuuCoSWnruAEx4B5Nw0hG8wq04GBUZqUO4CHcjx7gsZnB_PWeZMXjtierLd_-ugCudfz47zn4ypfi6yA23jRHwVdQCPGodQI2kQgK2o63JXm93R1DIH3wdjkxLqP8UB_GEuhW2yHPcb1CjcwCuE3b5jLkDNkfHFw',
  },
]

export function TeamSection({ className, members }: TeamSectionProps) {
  const data = members ?? LEADERS

  return (
    <section className={cn('bg-surface px-6 py-24 md:py-28', className)}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">Jamoamiz</p>
        <h2 className="mb-6 text-center font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">BUSA ortidagi hozirgi yetakchilar</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-8 text-slate-600 md:text-lg">
          Kichik, kuchli va natijaga yo&apos;naltirilgan jamoa: President, Vice President, Project Managers, Design Lead va Tech Lead.
        </p>

        <div className="grid grid-cols-2 gap-[12px] md:gap-7 lg:grid-cols-4">
          {data.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-[12px] border border-black/5 bg-white pb-[12px] shadow-[0_12px_30px_rgba(25,28,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(10,102,255,0.16)] md:rounded-3xl md:pb-0"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] md:rounded-t-3xl">
                <Image
                  src={member.photo || FALLBACK_REMOTE_IMAGE}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 pt-2 text-center md:px-4 md:pb-5 md:pt-4 md:text-left">
                <h3 className="mt-[8px] text-[14px] font-semibold text-[#1d1d1f] md:mt-0 md:text-2xl md:font-bold md:text-slate-900">{member.name}</h3>
                <p className="text-[12px] text-[#86868b] md:mt-1 md:text-sm md:font-semibold md:uppercase md:tracking-[0.12em] md:text-[#0a66ff]">
                  {member.role}
                </p>
                <p className="mt-3 hidden text-sm font-medium text-slate-500 md:block">Joined {member.joined}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
