'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import ImageUpload from '@/components/admin/ImageUpload'
import Modal from '@/components/admin/Modal'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_GALLERY, CREATE_GALLERY_PHOTO, DELETE_GALLERY_PHOTO } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatTableDate } from '@/lib/utils/date'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

interface GalleryItem {
  id: string
  src: string
  alt: string
  event: string
  eventName: string
  year: number
  createdAt?: string
}

interface GalleryQueryData {
  paginatedGalleryPhotos: {
    items: GalleryItem[]
    total: number
    hasMore: boolean
  }
}

export default function GalleryManager() {
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [pageSize, setPageSize] = useState(10)
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const [event, setEvent] = useState('')
  const [eventName, setEventName] = useState('')
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const { showToast } = useToast()
  const debouncedSearch = useDebouncedValue(search, 400)
  const offset = (page - 1) * pageSize

  const { data, loading, refetch } = useQuery<GalleryQueryData>(ADMIN_GET_GALLERY, {
    variables: {
      pagination: {
        limit: pageSize,
        offset,
        search: debouncedSearch.trim() || undefined,
        type: typeFilter === 'ALL' ? undefined : typeFilter,
      },
    },
    fetchPolicy: 'network-only',
  })
  const [createGalleryPhoto, { loading: creating }] = useMutation(CREATE_GALLERY_PHOTO)
  const [deleteGalleryPhoto, { loading: deleting }] = useMutation(DELETE_GALLERY_PHOTO)

  const rows = data?.paginatedGalleryPhotos.items ?? []
  const total = data?.paginatedGalleryPhotos.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const typeOptions = Array.from(new Set(rows.map((item) => item.event).filter(Boolean)))

  async function submit() {
    if (!src.trim() || !alt.trim() || !event.trim() || !eventName.trim()) {
      showToast('Rasm, alt, turi va nomi majburiy', 'error')
      return
    }
    try {
      await createGalleryPhoto({ variables: { input: { src: src.trim(), alt: alt.trim(), event: event.trim(), eventName: eventName.trim(), year: Number(year) } } })
      setIsModalOpen(false)
      setSrc('')
      setAlt('')
      setEvent('')
      setEventName('')
      setYear(String(new Date().getFullYear()))
      await refetch()
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
      await refetch()
      showToast("Rasm o'chirildi")
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Galereya">
      <div className="mb-4 space-y-3">
        <p className="text-sm text-[#6e6e73]">{loading ? 'Yuklanmoqda...' : `Jami: ${total} ta rasm`}</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <FormInput label="Qidirish" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} />
          </div>
          <div className="w-full max-w-xs">
            <FormSelect label="Type" value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(1) }}>
              <option value="ALL">Barchasi</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className="w-28">
            <FormSelect label="Per page" value={String(pageSize)} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </FormSelect>
          </div>
          <button className="ml-auto rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={() => setIsModalOpen(true)} type="button">
          Rasm yuklash
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {rows.map((item) => (
          <article className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]" key={item.id}>
            <div className="relative h-40">
              <Image alt={item.alt || 'Gallery image'} className="object-cover" fill sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" src={item.src || FALLBACK_REMOTE_IMAGE} />
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-[#1d1d1f]">{item.alt || 'No alt text'}</p>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant="purple">{item.eventName || item.event || 'general'}</Badge>
                <span className={formatTableDate(item.createdAt).invalid ? 'text-xs text-red-600' : 'text-xs text-[#6e6e73]'}>
                  {formatTableDate(item.createdAt).label}
                </span>
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
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1)
          .map((value, index, list) => (
            <span key={value} className="inline-flex items-center gap-2">
              {index > 0 && value - list[index - 1] > 1 ? <span className="px-1">...</span> : null}
              <button type="button" onClick={() => setPage(value)} className={`rounded-lg border px-3 py-1 text-sm ${value === page ? 'border-[#00236f] bg-[#00236f] text-white' : 'border-black/10'}`}>
                {value}
              </button>
            </span>
          ))}
        <button className="rounded-lg border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} type="button">
          Keyingi
        </button>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Rasm yuklash">
        <div className="space-y-3">
          <ImageUpload label="Image file" onChange={setSrc} value={src} />
          <FormInput label="Alt text" onChange={(event) => setAlt(event.target.value)} value={alt} />
          <FormSelect label="Type" onChange={(event) => setEvent(event.target.value)} value={event}>
            <option value="">Tanlang</option>
            <option value="project">Project</option>
            <option value="navruz">Navruz</option>
            <option value="trips">Trips</option>
            <option value="bookclub">Book Club</option>
            <option value="speakingclub">Speaking Club</option>
            <option value="general">General</option>
          </FormSelect>
          <FormInput label="Event name" onChange={(event) => setEventName(event.target.value)} value={eventName} />
          <FormInput label="Year" onChange={(event) => setYear(event.target.value)} type="number" value={year} />
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
