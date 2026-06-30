'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageLightbox } from '@/components/media/ImageLightbox'
import { CursorDrift } from '@/components/ui/CursorDrift'
import { premiumHoverShadowTeam } from '@/lib/ui/premiumHover'
import { cn } from '@/lib/utils/cn'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

export interface TeamMember {
  id?: string
  name: string
  role: string
  /** Cohort / year from API `year` */
  joined: string
  photo: string
}

interface TeamSectionProps {
  className?: string
  /** From GraphQL `teamMembers`; empty array shows placeholder until admin adds members */
  members?: TeamMember[]
}

export function TeamSection({ className, members = [] }: TeamSectionProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section className={cn('bg-surface px-6 py-24 md:py-28', className)}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">Jamoamiz</p>
        <h2 className="mb-6 text-center font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">BUSA ortidagi hozirgi yetakchilar</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-8 text-slate-600 md:text-lg">
          Kichik, kuchli va natijaga yo&apos;naltirilgan jamoa: President, Vice President, Project Managers, Design Lead va Tech Lead.
        </p>

        {members.length === 0 ? (
          <p className="mx-auto max-w-xl text-center text-base text-slate-500 md:text-lg">
            Hozircha jamoa a&apos;zolari ro&apos;yxati yangilanmoqda. Tez orada shu yerda ko&apos;rasiz.
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-[12px] md:gap-7 lg:grid-cols-4">
          {members.map((member) => (
            <CursorDrift
              as="article"
              key={member.id ?? member.name}
              className={cn(
                'group overflow-hidden rounded-[12px] border border-black/5 bg-white pb-[12px] shadow-[0_12px_30px_rgba(25,28,30,0.08)] md:rounded-3xl md:pb-0',
                premiumHoverShadowTeam,
              )}
            >
              <button
                type="button"
                className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-[12px] border-0 bg-transparent p-0 md:rounded-t-3xl"
                onClick={() =>
                  setLightbox({ src: member.photo || FALLBACK_REMOTE_IMAGE, alt: member.name })
                }
              >
                <Image
                  src={member.photo || FALLBACK_REMOTE_IMAGE}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-[1150ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]"
                />
              </button>
              <div className="min-w-0 px-3 pt-2 text-center md:px-4 md:pb-5 md:pt-4 md:text-left">
                <h3 className="mt-[8px] break-words text-[14px] font-semibold text-[#1d1d1f] md:mt-0 md:text-2xl md:font-bold md:text-slate-900">
                  {member.name}
                </h3>
                <p className="break-words text-[12px] text-[#86868b] md:mt-1 md:text-sm md:font-semibold md:uppercase md:tracking-[0.12em] md:text-[#0a66ff]">
                  {member.role}
                </p>
                {member.joined ? (
                  <p className="mt-3 hidden text-sm font-medium text-slate-500 md:block">{member.joined}-yildan BUSA bilan</p>
                ) : null}
              </div>
            </CursorDrift>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={lightbox ? [lightbox.src] : []}
        isOpen={Boolean(lightbox)}
        startIndex={0}
        onClose={() => setLightbox(null)}
        altPrefix="Team"
        getAlt={lightbox ? () => lightbox.alt : undefined}
      />
    </section>
  )
}

export default TeamSection
