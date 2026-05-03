'use client'

import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { useCardCursorTranslate } from '@/lib/hooks/useCardCursorTranslate'
import { cn } from '@/lib/utils/cn'

export type CursorDriftProps<T extends ElementType> = {
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/**
 * Applies cursor-following 2D translate (RAF + lerp) to any host element.
 * Pointer handlers override any passed in `...rest` so the drift always wins.
 */
export function CursorDrift<T extends ElementType = 'div'>({ as, className, ...rest }: CursorDriftProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const { ref, handlers } = useCardCursorTranslate(6, 0.03, 0.02)
  return (
    <Tag
      {...rest}
      ref={ref as never}
      className={cn(className)}
      onPointerEnter={handlers.onPointerEnter}
      onPointerLeave={handlers.onPointerLeave}
      onPointerMove={handlers.onPointerMove}
    />
  )
}
