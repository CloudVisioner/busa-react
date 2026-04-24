'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import FormInput from '@/components/admin/FormInput'
import ImageUpload from '@/components/admin/ImageUpload'
import Modal from '@/components/admin/Modal'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_GALLERY, CREATE_GALLERY_PHOTO, DELETE_GALLERY_PHOTO } from '@/lib/apollo/queries'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
}

interface GalleryQueryData {
  gallery: {
    items: GalleryItem[]
    total: number
    page: number
    limit: number
  }
}

export default function GalleryManager() {
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const [category, setCategory] = useState('')
  const { showToast } = useToast()
  const limit = 12

  const { data, loading, refetch } = useQuery<GalleryQueryData>(ADMIN_GET_GALLERY, {
    variables: { page, limit },
    fetchPolicy: 'network-only',
  })
  const [createGalleryPhoto, { loading: creating }] = useMutation(CREATE_GALLERY_PHOTO)
  const [deleteGalleryPhoto, { loading: deleting }] = useMutation(DELETE_GALLERY_PHOTO)

  const rows = data?.gallery.items ?? []
  const total = data?.gallery.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  async function submit() {
    if (!src.trim() || !alt.trim()) {
      showToast('Rasm va alt matn majburiy', 'error')
      return
    }
    try {
      await createGalleryPhoto({ variables: { input: { src: src.trim(), alt: alt.trim(), category: category.trim() } } })
      setIsModalOpen(false)
      setSrc('')
      setAlt('')
      setCategory('')
      await refetch({ page, limit })
      showToast('Rasm yuklandi')
    } catch (error) {
      console.error(error)
      showToast('Rasm yuklashda xatolik', 'error')
    }
  }

  async function removeSelected() {
    if (!deleteId) return
    try {
      await deleteGalleryPhoto({ variables: { id: deleteId } })
      setDeleteId(null)
      await refetch({ page, limit })
      showToast("Rasm o'chirildi")
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Galereya">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#6e6e73]">{loading ? 'Yuklanmoqda...' : `${total} ta rasm`}</p>
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={() => setIsModalOpen(true)} type="button">
          Rasm yuklash
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {rows.map((item) => (
          <article className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]" key={item.id}>
            <div className="relative h-40">
              <Image alt={item.alt || 'Gallery image'} className="object-cover" fill src={item.src || FALLBACK_REMOTE_IMAGE} />
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-[#1d1d1f]">{item.alt || 'No alt text'}</p>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant="purple">{item.category || 'general'}</Badge>
                <button className="text-xs font-semibold text-red-600 hover:underline" onClick={() => setDeleteId(item.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button className="rounded-lg border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} type="button">
          Oldingi
        </button>
        <button className="rounded-lg border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} type="button">
          Keyingi
        </button>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Rasm yuklash">
        <div className="space-y-3">
          <ImageUpload label="Image file" onChange={setSrc} value={src} />
          <FormInput label="Alt text" onChange={(event) => setAlt(event.target.value)} value={alt} />
          <FormInput label="Category" onChange={(event) => setCategory(event.target.value)} value={category} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-xl border border-black/10 px-4 py-2 text-sm" onClick={() => setIsModalOpen(false)} type="button">
            Bekor qilish
          </button>
          <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white" disabled={creating} onClick={submit} type="button">
            {creating ? 'Yuklanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </Modal>

      <ConfirmModal
        confirmText="Ha, o'chirish"
        description="Ushbu rasm butunlay o'chiriladi."
        loading={deleting}
        onCancel={() => setDeleteId(null)}
        onConfirm={removeSelected}
        open={Boolean(deleteId)}
        title="Rasmni o'chirasizmi?"
      />
    </AdminLayout>
  )
}
