'use client'

import type { IconType } from 'react-icons'
import {
  SiAirbnb,
  SiApple,
  SiGithub,
  SiGoogle,
  SiMeta,
  SiNetflix,
  SiNvidia,
  SiSamsung,
  SiSpotify,
  SiStripe,
  SiTesla,
  SiUber,
} from 'react-icons/si'
import { cn } from '@/lib/utils/cn'

interface LogoItem {
  name: string
  icon: IconType
  colorClass: string
}

interface MarqueeSectionProps {
  className?: string
}

const LOGO_ROW_ONE: LogoItem[] = [
  { name: 'Google', icon: SiGoogle, colorClass: 'hover:text-[#4285F4]' },
  { name: 'Apple', icon: SiApple, colorClass: 'hover:text-[#000000]' },
  { name: 'Samsung', icon: SiSamsung, colorClass: 'hover:text-[#1428A0]' },
  { name: 'Tesla', icon: SiTesla, colorClass: 'hover:text-[#CC0000]' },
  { name: 'Meta', icon: SiMeta, colorClass: 'hover:text-[#0467DF]' },
  { name: 'Netflix', icon: SiNetflix, colorClass: 'hover:text-[#E50914]' },
]

const LOGO_ROW_TWO: LogoItem[] = [
  { name: 'Spotify', icon: SiSpotify, colorClass: 'hover:text-[#1DB954]' },
  { name: 'Airbnb', icon: SiAirbnb, colorClass: 'hover:text-[#FF5A5F]' },
  { name: 'Nvidia', icon: SiNvidia, colorClass: 'hover:text-[#76B900]' },
  { name: 'Uber', icon: SiUber, colorClass: 'hover:text-[#000000]' },
  { name: 'GitHub', icon: SiGithub, colorClass: 'hover:text-[#181717]' },
  { name: 'Stripe', icon: SiStripe, colorClass: 'hover:text-[#635BFF]' },
]

export function MarqueeSection({ className }: MarqueeSectionProps) {
  const logoLoop = [...LOGO_ROW_ONE, ...LOGO_ROW_TWO]
  const baseIconClass = 'h-10 w-10 cursor-pointer text-slate-400 opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'

  return (
    <section className={cn('bg-surface py-20 md:py-24', className)}>
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center md:mb-14">
        <h2 className="font-headline text-2xl font-bold leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl lg:text-5xl">
          HAMKORLARIMIZ VA HOMIYILARIMIZ
        </h2>
      </div>

      <div className="overflow-hidden whitespace-nowrap">
        <div className="group flex w-max animate-scroll hover:[animation-play-state:paused]">
          <div className="flex items-center gap-16 px-8">
            {logoLoop.map((logo) => (
              <logo.icon
                key={`${logo.name}-first`}
                title={logo.name}
                className={cn(baseIconClass, logo.colorClass)}
              />
            ))}
          </div>
          <div className="flex items-center gap-16 px-8">
            {logoLoop.map((logo) => (
              <logo.icon
                key={`${logo.name}-second`}
                title={logo.name}
                className={cn(baseIconClass, logo.colorClass)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
