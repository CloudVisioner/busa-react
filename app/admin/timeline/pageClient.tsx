'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import Modal from '@/components/admin/Modal'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_TIMELINE, CREATE_TIMELINE_ENTRY, DELETE_TIMELINE_ENTRY, UPDATE_TIMELINE_ENTRY } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { uploadImage } from '@/lib/upload'
import { formatTableDate } from '@/lib/utils/date'
import { hasRichTextContent } from '@/lib/utils/richText'

interface TimelineItem {
  id: string
  year: string
  description: string
  presidentName?: string | null
  quote?: string | null
  coverPhoto?: string | null
  createdAt?: string
}

interface TimelineQueryData {
  timelines: {
    items: TimelineItem[]
  }
}

interface TimelineFormState {
  id?: string
  year: string
  description: string
  presidentName: string
  quote: string
  coverPhoto: string
}

const initialState: TimelineFormState = {
  year: '',
  description: '',
  presidentName: '',
  quote: '',
  coverPhoto: '',
}

export default function TimelineManager() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [form, setForm] = useState<TimelineFormState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('')
  const { showToast } = useToast()

  const { data, loading, refetch } = useQuery<TimelineQueryData>(ADMIN_GET_TIMELINE, { fetchPolicy: 'network-only' })
  const [createEntry, { loading: creating }] = useMutation(CREATE_TIMELINE_ENTRY)
  const [updateEntry, { loading: updating }] = useMutation(UPDATE_TIMELINE_ENTRY)
  const [deleteEntry, { loading: deleting }] = useMutation(DELETE_TIMELINE_ENTRY)

  const debouncedSearch = useDebouncedValue(search, 400)
  const filteredRows = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    return [...(data?.timelines.items ?? [])]
      .filter((item) => {
        const matchesType = typeFilter === 'ALL' ? true : item.year === typeFilter
        if (!query) return matchesType
        return (
          matchesType &&
          `${item.year} ${item.description} ${item.presidentName ?? ''} ${item.quote ?? ''}`.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => Number(b.year) - Number(a.year))
  }, [data?.timelines.items, debouncedSearch, typeFilter])
  const total = filteredRows.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const rows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const yearOptions = Array.from(new Set((data?.timelines.items ?? []).map((item) => item.year))).sort((a, b) => Number(b) - Number(a))

  function openCreate() {
    setForm(initialState)
    setCoverPhotoFile(null)
    setCoverPhotoPreview('')
    setIsModalOpen(true)
  }

  function openEdit(item: TimelineItem) {
    setForm({
      id: item.id,
      year: String(item.year),
      description: item.description ?? '',
      presidentName: item.presidentName ?? '',
      quote: item.quote ?? '',
      coverPhoto: item.coverPhoto ?? '',
    })
    setCoverPhotoFile(null)
    setCoverPhotoPreview(item.coverPhoto ?? '')
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.year.trim()) {
      showToast('Year majburiy', 'error')
      return
    }
    if (form.year.length !== 4) {
      showToast('Year 4 ta raqam bo\'lishi kerak', 'error')
      return
    }
    if (!hasRichTextContent(form.description)) {
      showToast('Description kiriting', 'error')
      return
    }

    const input = {
      year: form.year.trim(),
      description: form.description.trim(),
      presidentName: form.presidentName.trim() || undefined,
      quote: form.quote.trim() || undefined,
      coverPhoto: form.coverPhoto || undefined,
    }

    try {
      if (coverPhotoFile) {
        input.coverPhoto = await uploadImage(coverPhotoFile)
      }
      if (form.id) {
        await updateEntry({ variables: { id: form.id, input } })
        showToast('Entry yangilandi')
      } else {
        await createEntry({ variables: { input } })
        showToast("Entry qo'shildi")
      }
      setIsModalOpen(false)
      setForm(initialState)
      setCoverPhotoFile(null)
      setCoverPhotoPreview('')
      await refetch()
    } catch (error) {
      console.error(error)
      showToast('Saqlashda xatolik', 'error')
    }
  }

  async function removeSelected() {
    if (!deleteId) return
    try {
      await deleteEntry({ variables: { id: deleteId } })
      setDeleteId(null)
      await refetch()
      showToast("Entry o'chirildi")
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Vaqt chizig'i">
      <div className="mb-4 space-y-3">
        <p className="text-sm text-[#6e6e73]">Jami: {total} ta timeline</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <FormInput label="Qidirish" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} />
          </div>
          <div className="w-full max-w-xs">
            <FormSelect label="Year filter" value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(1) }}>
              <option value="ALL">Barchasi</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
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
          <button className="ml-auto rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          Qo&apos;shish
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        {loading ? (
          <p className="py-6 text-center text-sm text-[#6e6e73]">Yuklanmoqda...</p>
        ) : (
          <div className="space-y-3">
            {rows.map((item) => (
              <div className="flex min-w-0 items-start justify-between gap-3 overflow-hidden rounded-xl border border-black/5 p-3" key={item.id}>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-base font-bold text-[#00236f]">{item.year}</p>
                  {item.presidentName ? (
                    <p className="mt-1 break-words text-sm font-semibold text-[#1d1d1f]">{item.presidentName}</p>
                  ) : null}
                  <p className="mt-1 line-clamp-4 break-words text-sm text-[#6e6e73] [overflow-wrap:anywhere]">{item.description}</p>
                  {item.quote?.trim() ? (
                    <p className="mt-1 line-clamp-2 text-sm italic text-[#6e6e73]">{item.quote}</p>
                  ) : null}
                  <p className={`mt-1 text-xs ${formatTableDate(item.createdAt).invalid ? 'text-red-600' : 'text-[#6e6e73]'}`}>
                    {formatTableDate(item.createdAt).label}
                  </p>
                </div>
                <div className="ml-3 flex gap-2">
                  <button className="rounded-lg border border-black/10 px-2.5 py-1 text-xs hover:bg-[#f5f5f7]" onClick={() => openEdit(item)} type="button">
                    Edit
                  </button>
                  <button className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50" onClick={() => setDeleteId(item.id)} type="button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1} className="rounded-lg border border-black/10 px-3 py-1 text-sm disabled:opacity-50">
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
        <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page >= totalPages} className="rounded-lg border border-black/10 px-3 py-1 text-sm disabled:opacity-50">
          Keyingi
        </button>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? "Entry tahrirlash" : "Yangi entry"}>
        <div className="space-y-3">
          <FormInput
            label="Year"
            inputMode="numeric"
            maxLength={4}
            onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value.replace(/\D/g, '').slice(0, 4) }))}
            placeholder="YYYY"
            value={form.year}
          />
          <FormInput label="President Name" onChange={(event) => setForm((prev) => ({ ...prev, presidentName: event.target.value }))} value={form.presidentName} />
          <RichTextEditor
            label="Description"
            content={form.description}
            onChange={(description) => setForm((prev) => ({ ...prev, description }))}
          />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">Quote (italic block on About)</span>
            <textarea
              className="min-h-[88px] w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-[#1d1d1f] outline-none transition focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/20"
              onChange={(event) => setForm((prev) => ({ ...prev, quote: event.target.value }))}
              placeholder="Masalan: “Jamoa kuchi individual qiyinchiliklarni yengadi.”"
              rows={4}
              value={form.quote}
            />
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">Cover Photo</span>
            <input
              type="file"
              accept="image/*"
              className="block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                setCoverPhotoFile(file)
                setCoverPhotoPreview(URL.createObjectURL(file))
              }}
            />
            {(coverPhotoPreview || form.coverPhoto) && (
              <div className="relative mt-2 h-56 overflow-hidden rounded-xl border border-black/10 bg-[#f8f9fc]">
                <Image
                  src={coverPhotoPreview || form.coverPhoto}
                  alt="Timeline preview"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-xl border border-black/10 px-4 py-2 text-sm" onClick={() => setIsModalOpen(false)} type="button">
            Bekor qilish
          </button>
          <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white" disabled={creating || updating} onClick={submit} type="button">
            {creating || updating ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </Modal>

      <ConfirmModal open={Boolean(deleteId)} onCancel={() => setDeleteId(null)} onConfirm={removeSelected} loading={deleting} title="Entry o'chirasizmi?" />
    </AdminLayout>
  )
}
