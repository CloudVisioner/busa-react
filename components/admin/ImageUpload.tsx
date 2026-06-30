'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

interface ImageUploadProps {
  label?: string
  value?: string
  onChange: (url: string) => void
  error?: string
  /** Full-width preview card (same pattern as admin gallery). */
  showPreview?: boolean
}

export default function ImageUpload({ label = 'Rasm', value, onChange, error, showPreview = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploading(true)
      setUploadError(null)
      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        let message = 'Upload failed'
        try {
          const payload = (await response.json()) as { error?: string; message?: string }
          message = payload.error || payload.message || message
        } catch {
          // Ignore JSON parsing failure and keep default message.
        }
        throw new Error(message)
      }

      const data = (await response.json()) as { url?: string }
      if (!data.url) {
        throw new Error('Missing upload URL')
      }

      onChange(data.url)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setUploadError(message)
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">{label}</span>
      <input accept="image/*" className="block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" onChange={handleChange} type="file" />
      {uploading ? <p className="mt-1 text-xs text-[#6e6e73]">Yuklanmoqda...</p> : null}
      {value && !uploading && showPreview ? (
        <div className="relative mt-3 w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
          <Image
            alt="Yuklangan rasm"
            className="h-auto max-h-[min(420px,70vh)] w-full object-contain"
            height={600}
            sizes="100vw"
            src={value || FALLBACK_REMOTE_IMAGE}
            width={800}
          />
        </div>
      ) : null}
      {value && !uploading && !showPreview ? <p className="mt-1 truncate text-xs text-[#00236f]">{value}</p> : null}
      {uploadError ? <p className="mt-1 text-xs text-red-600">{uploadError}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
