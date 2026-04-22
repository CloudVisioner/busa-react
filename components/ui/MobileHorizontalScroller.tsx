'use client'

import { Children, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface MobileHorizontalScrollerProps {
  className?: string
  viewportClassName?: string
  children: ReactNode
}

export default function MobileHorizontalScroller({ className, viewportClassName, children }: MobileHorizontalScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const itemCount = Children.count(children)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateActiveIndex = () => {
      const items = Array.from(viewport.children) as HTMLElement[]
      if (items.length === 0) return

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
      let nearest = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      items.forEach((item, index) => {
        const center = item.offsetLeft + item.offsetWidth / 2
        const distance = Math.abs(center - viewportCenter)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearest = index
        }
      })

      setActiveIndex(nearest)
    }

    updateActiveIndex()
    viewport.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateActiveIndex)

    return () => {
      viewport.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [itemCount])

  return (
    <div className={cn('md:hidden', className)}>
      <div ref={viewportRef} className={cn('scrollbar-hide flex snap-x snap-mandatory flex-nowrap overflow-x-auto', viewportClassName)}>
        {children}
      </div>
      <div className="mt-[12px] flex items-center justify-center gap-[6px]">
        {Array.from({ length: itemCount }).map((_, index) => (
          <span
            key={`dot-${index}`}
            className={cn(
              'h-[4px] rounded-full transition-all duration-300',
              index === activeIndex ? 'w-[20px] bg-[#00236f]' : 'w-[6px] bg-[#00236f]/20'
            )}
          />
        ))}
      </div>
    </div>
  )
}
