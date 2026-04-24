'use client'

import { useState } from 'react'

interface MultiImageUploadProps {
  label?: string
  value: string[]
  onChange: (urls: string[]) => void
  error?: string
}

export default function MultiImageUpload({ label = 'Rasmlar', value, onChange, error }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          credentials: 'same-origin',
          body: formData,
        })
        if (!response.ok) {
          throw new Error('Upload failed')
        }
        const data = (await response.json()) as { url?: string }
        if (data.url) {
          uploadedUrls.push(data.url)
        }
      }

      onChange([...value, ...uploadedUrls])
    } catch (uploadError) {
      console.error(uploadError)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">{label}</span>
      <input accept="image/*" className="block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" multiple onChange={handleChange} type="file" />
      {uploading ? <p className="mt-1 text-xs text-[#6e6e73]">Yuklanmoqda...</p> : null}
      {value.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {value.map((url) => (
            <li className="truncate text-xs text-[#00236f]" key={url}>
              {url}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
