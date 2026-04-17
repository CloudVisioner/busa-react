import Link from 'next/link'
import Galaxy from '@/components/sections/Galaxy'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface JoinCTAProps {
  className?: string
  /** `plain` = no Galaxy animation (Visa / Loyihalar pages) */
  variant?: 'default' | 'plain'
  eyebrow?: string
  title?: string
  description?: string
}

const DEFAULT_EYEBROW = 'Join busa'
const DEFAULT_TITLE = "Biz bilan birga o'sing, bog'laning, ilhomlaning"
const DEFAULT_DESCRIPTION =
  "Yangi kelgan bo'lsangiz ham, tajribali talaba bo'lsangiz ham BUSA siz uchun ochiq. Bugun hamjamiyatga qo'shiling."

export function JoinCTA({
  className,
  variant = 'default',
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: JoinCTAProps) {
  const isPlain = variant === 'plain'

  return (
    <section className={cn('relative overflow-hidden bg-[#f5f5f7] px-6 py-20 md:py-24', className)}>
      {!isPlain && (
        <>
          <div className="absolute inset-0">
            <Galaxy
              mouseRepulsion
              mouseInteraction
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.5}
              speed={1}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-white/72" />
        </>
      )}

      <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white/88 p-8 text-center shadow-[0_20px_60px_rgba(25,28,30,0.1)] backdrop-blur-sm md:p-12">
        <p className="mb-4 font-label text-base font-extrabold uppercase tracking-[0.18em] text-on-primary-fixed-variant md:text-lg">{eyebrow}</p>
        <h2 className="font-headline text-4xl font-black tracking-tight text-on-surface md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-on-surface-variant md:text-lg">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="rounded-full bg-[#E53935] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C62828]" href={ROUTES.HOME}>
            A&apos;zo bo&apos;lish
          </Link>
          <Link
            className="rounded-full border border-[#00236f]/35 px-7 py-3 text-sm font-bold text-[#00236f] transition hover:bg-[#00236f]/5"
            href={ROUTES.EVENTS}
          >
            Tadbirlarni ko&apos;rish
          </Link>
        </div>
      </div>
    </section>
  )
}

export default JoinCTA
