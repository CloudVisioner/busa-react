'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { cn } from '@/lib/utils/cn'

export interface ImageLightboxProps {
  images: string[]
  isOpen: boolean
  startIndex: number
  onClose: () => void
  altPrefix?: string
  getAlt?: (index: number) => string
}

export function ImageLightbox({
  images,
  isOpen,
  startIndex,
  onClose,
  altPrefix = 'Image',
  getAlt,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isOpen || images.length === 0) return
    setIndex(Math.min(Math.max(0, startIndex), images.length - 1))
  }, [isOpen, startIndex, images.length])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (images.length <= 1) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex((i) => (i - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setIndex((i) => (i + 1) % images.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, images.length, onClose])

  if (!isOpen || images.length === 0) return null

  const src = images[index]!
  const alt = getAlt?.(index) ?? `${altPrefix} ${index + 1}`

  const showNav = images.length > 1

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={alt}>
      <button
        type="button"
        className="absolute inset-0 border-0 bg-black/88"
        aria-label="Yopish"
        onClick={onClose}
      />

      <div className="relative z-[1] flex max-h-[min(90vh,920px)] max-w-[min(96vw,1200px)] flex-col items-center">
        <button
          type="button"
          className="absolute -top-1 right-0 z-[2] flex h-11 w-11 translate-y-[-100%] items-center justify-center rounded-full border-0 bg-white/15 text-white transition-colors hover:bg-white/25 md:right-0 md:top-0 md:translate-x-[calc(100%+8px)] md:translate-y-0"
          aria-label="Yopish"
          onClick={onClose}
        >
          <FiX className="h-6 w-6" aria-hidden />
        </button>

        <div
          className="relative flex max-h-[min(90vh,920px)] w-full max-w-[min(96vw,1200px)] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {showNav ? (
            <button
              type="button"
              className="absolute left-0 z-[2] flex h-12 w-12 -translate-x-1 items-center justify-center rounded-full border-0 bg-white/15 text-white transition-colors hover:bg-white/25 md:-translate-x-2"
              aria-label="Oldingi rasm"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            >
              <FiChevronLeft className="h-7 w-7" aria-hidden />
            </button>
          ) : null}

          <div className="relative mx-10 min-h-[200px] min-w-[200px] md:mx-14">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1200}
              className={cn('h-auto max-h-[min(90vh,920px)] w-auto max-w-[min(92vw,1120px)] object-contain')}
              sizes="(max-width: 768px) 92vw, 1120px"
              priority
            />
          </div>

          {showNav ? (
            <button
              type="button"
              className="absolute right-0 z-[2] flex h-12 w-12 translate-x-1 items-center justify-center rounded-full border-0 bg-white/15 text-white transition-colors hover:bg-white/25 md:translate-x-2"
              aria-label="Keyingi rasm"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
            >
              <FiChevronRight className="h-7 w-7" aria-hidden />
            </button>
          ) : null}
        </div>

        {showNav ? (
          <p className="mt-3 text-center text-sm font-medium text-white/80">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </div>
    </div>
  )
}
