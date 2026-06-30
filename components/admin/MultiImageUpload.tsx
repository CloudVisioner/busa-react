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
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      setUploading(true)
      setUploadError(null)
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
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
            // keep default
          }
          throw new Error(message)
        }
        const data = (await response.json()) as { url?: string }
        if (data.url) {
          uploadedUrls.push(data.url)
        }
      }

      onChange([...value, ...uploadedUrls])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setUploadError(message)
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  function removeUrl(urlToRemove: string) {
    onChange(value.filter((url) => url !== urlToRemove))
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">{label}</span>
      <input accept="image/*" className="block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm" multiple onChange={handleChange} type="file" />
      {uploading ? <p className="mt-1 text-xs text-[#6e6e73]">Yuklanmoqda...</p> : null}
      {value.length > 0 ? (
        <ul className="mt-2 space-y-1">
          {value.map((url) => (
            <li className="flex items-center gap-2" key={url}>
              <span className="min-w-0 flex-1 truncate text-xs text-[#00236f]">{url}</span>
              <button className="shrink-0 text-xs text-red-500 hover:text-red-700" onClick={() => removeUrl(url)} type="button">
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {uploadError ? <p className="mt-1 text-xs text-red-600">{uploadError}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
