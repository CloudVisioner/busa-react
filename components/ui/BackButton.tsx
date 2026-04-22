'use client'

import { useRouter } from 'next/navigation'

interface BackButtonProps {
  fallbackHref: string
  className?: string
}

export default function BackButton({ fallbackHref, className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }
    router.push(fallbackHref)
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-4 py-2 text-sm font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] ${className}`}
    >
      <span aria-hidden>&larr;</span>
      <span>Orqaga</span>
    </button>
  )
}
