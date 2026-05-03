import { cn } from '@/lib/utils/cn'

/** Very slow, heavy easing — apple.com-style product tiles (long deceleration). */
export const premiumHoverLift = cn(
  'transition-[transform,box-shadow] duration-[1100ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
  'hover:-translate-y-[2px] hover:shadow-[0_28px_60px_-14px_rgba(15,23,42,0.16)]',
)

export const premiumHoverMedia = cn(
  'transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
  'group-hover:scale-[1.015]',
)

export const premiumHoverRing = cn(
  'transition-[border-color,background-color] duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
)

/** Box-shadow only (pairs with JS cursor translate — no CSS transform on the card). */
export const premiumHoverShadowEase = cn(
  'transition-[box-shadow] duration-[1100ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
)

export const premiumHoverShadowCard = cn(
  premiumHoverShadowEase,
  'hover:shadow-[0_28px_60px_-14px_rgba(15,23,42,0.16)]',
)

export const premiumHoverShadowTile = cn(
  premiumHoverShadowEase,
  'hover:shadow-[0_20px_44px_-10px_rgba(15,23,42,0.18)]',
)

export const premiumHoverShadowTileSoft = cn(
  premiumHoverShadowEase,
  'hover:shadow-[0_20px_44px_-10px_rgba(15,23,42,0.16)]',
)

export const premiumHoverShadowTeam = cn(
  premiumHoverShadowEase,
  'hover:shadow-[0_24px_52px_-12px_rgba(15,23,42,0.14)]',
)
