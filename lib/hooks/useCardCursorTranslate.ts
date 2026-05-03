'use client'

import type { PointerEvent, RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'

const EPS = 0.02

export type CardCursorTranslateHandlers = {
  onPointerEnter: () => void
  onPointerLeave: () => void
  onPointerMove: (e: PointerEvent<HTMLElement>) => void
}

/**
 * Whole-card 2D translate toward pointer via RAF + lerp (no CSS transform transitions).
 * Hover: target follows cursor (clamped). Leave: target is 0; slower lerp back.
 */
export function useCardCursorTranslate(
  maxPx = 6,
  hoverLerp = 0.03,
  leaveLerp = 0.02,
): { ref: RefObject<HTMLElement | null>; handlers: CardCursorTranslateHandlers } {
  const ref = useRef<HTMLElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const hoveringRef = useRef(false)
  const rafRef = useRef(0)

  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  const tick = useCallback(() => {
    const el = ref.current
    if (!el) {
      stopRaf()
      return
    }

    const hovering = hoveringRef.current
    const lerp = hovering ? hoverLerp : leaveLerp
    const tx = hovering ? targetRef.current.x : 0
    const ty = hovering ? targetRef.current.y : 0

    const cx = currentRef.current.x
    const cy = currentRef.current.y
    currentRef.current.x = cx + (tx - cx) * lerp
    currentRef.current.y = cy + (ty - cy) * lerp

    const nx = currentRef.current.x
    const ny = currentRef.current.y
    el.style.transform = `translate(${nx}px, ${ny}px)`

    const settled =
      !hovering && Math.abs(nx) < EPS && Math.abs(ny) < EPS && Math.abs(tx) < EPS && Math.abs(ty) < EPS

    if (settled) {
      currentRef.current.x = 0
      currentRef.current.y = 0
      el.style.transform = ''
      stopRaf()
      return
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [hoverLerp, leaveLerp, stopRaf])

  const ensureLoop = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const onPointerEnter = useCallback(() => {
    hoveringRef.current = true
    ensureLoop()
  }, [ensureLoop])

  const onPointerLeave = useCallback(() => {
    hoveringRef.current = false
    targetRef.current.x = 0
    targetRef.current.y = 0
    ensureLoop()
  }, [ensureLoop])

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const el = ref.current
      if (!el || !hoveringRef.current) return

      const rect = el.getBoundingClientRect()
      const halfW = rect.width / 2 || 1
      const halfH = rect.height / 2 || 1
      const px = (e.clientX - rect.left - halfW) / halfW
      const py = (e.clientY - rect.top - halfH) / halfH
      const clamp = (v: number) => Math.max(-1, Math.min(1, v))

      targetRef.current.x = clamp(px) * maxPx
      targetRef.current.y = clamp(py) * maxPx
      ensureLoop()
    },
    [maxPx, ensureLoop],
  )

  useEffect(() => () => stopRaf(), [stopRaf])

  return {
    ref,
    handlers: { onPointerEnter, onPointerLeave, onPointerMove },
  }
}
