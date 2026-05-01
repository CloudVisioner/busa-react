'use client'

import { cn } from '@/lib/utils/cn'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal({ open, title, onClose, children, className }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 pt-8 md:pt-12">
      <button aria-label="Yopish" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn('relative z-[121] w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto', className)}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1d1d1f]">{title}</h3>
          <button className="rounded-lg px-2 py-1 text-sm text-[#6e6e73] hover:bg-[#f5f5f7]" onClick={onClose} type="button">
            Yopish
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
