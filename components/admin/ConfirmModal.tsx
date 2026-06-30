'use client'

import Modal from './Modal'

interface ConfirmModalProps {
  open: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'danger' | 'primary'
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmModal({
  open,
  title = 'Tasdiqlaysizmi?',
  description = "Bu amalni ortga qaytarib bo'lmaydi.",
  confirmText = "Ha, o'chirish",
  cancelText = 'Bekor qilish',
  confirmVariant = 'danger',
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} className="max-w-md">
      <p className="text-sm text-[#6e6e73]">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button className="rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-[#1d1d1f] hover:bg-[#f5f5f7]" onClick={onCancel} type="button">
          {cancelText}
        </button>
        <button
          className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${confirmVariant === 'danger' ? 'bg-[#dc2626] hover:bg-red-700' : 'bg-[#00236f] hover:opacity-95'}`}
          disabled={loading}
          onClick={onConfirm}
          type="button"
        >
          {loading ? 'Kutilmoqda...' : confirmText}
        </button>
      </div>
    </Modal>
  )
}
