'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import Modal from '@/components/admin/Modal'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_EVENTS, CREATE_EVENT, DELETE_EVENT, SET_FEATURED_EVENT, UPDATE_EVENT } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { uploadImage } from '@/lib/upload'
import { formatTableDate } from '@/lib/utils/date'
import { hasRichTextContent } from '@/lib/utils/richText'

type EventType = 'MADANIY' | 'TRIP' | 'SPORT' | 'WORKSHOP' | 'EDUCATION'
type EventTimelineStatus = 'UPCOMING' | 'PAST'

interface EventItem {
  id: string
  slug: string
  title: string
  type: EventType
  date: string
  location: string
  description: string
  attendance?: string | null
  coverPhoto?: string | null
  isFeatured?: boolean
  photos: string[]
}

interface EventsQueryData {
  paginatedEvents: {
    items: EventItem[]
    total: number
    hasMore: boolean
  }
}

interface EventInputState {
  id?: string
  title: string
  type: EventType
  date: string
  location: string
  description: string
  attendance: string
  coverPhoto: string
}

const initialState: EventInputState = {
  title: '',
  type: 'MADANIY',
  date: '',
  location: '',
  description: '',
  attendance: '',
  coverPhoto: '',
}

function normalizeDateInput(value: string): string {
  const match = value.match(/^(\d{0,4})(?:-(\d{0,2}))?(?:-(\d{0,2}))?/)
  if (!match) return ''
  const [, year = '', month = '', day = ''] = match
  if (!month) return year
  if (!day) return `${year}-${month}`
  return `${year}-${month}-${day}`
}

export default function EventsManager() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'ALL' | EventTimelineStatus>('ALL')
  const [form, setForm] = useState<EventInputState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('')
  const { showToast } = useToast()
  const debouncedSearch = useDebouncedValue(search, 400)
  const offset = (page - 1) * pageSize
  const queryPagination = {
    limit: pageSize,
    offset,
    search: debouncedSearch.trim() || undefined,
    status: typeFilter === 'ALL' ? undefined : typeFilter,
  }

  const { data, loading, refetch } = useQuery<EventsQueryData>(ADMIN_GET_EVENTS, {
    variables: { pagination: queryPagination },
    fetchPolicy: 'network-only',
  })
  const { data: upcomingSummaryData } = useQuery<EventsQueryData>(ADMIN_GET_EVENTS, {
    variables: { pagination: { limit: 1, offset: 0, status: 'UPCOMING' as EventTimelineStatus } },
    fetchPolicy: 'network-only',
  })
  const { data: archiveSummaryData } = useQuery<EventsQueryData>(ADMIN_GET_EVENTS, {
    variables: { pagination: { limit: 1, offset: 0, status: 'PAST' as EventTimelineStatus } },
    fetchPolicy: 'network-only',
  })
  const [createEvent, { loading: creating }] = useMutation(CREATE_EVENT)
  const [updateEvent, { loading: updating }] = useMutation(UPDATE_EVENT)
  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT)
  const [setFeaturedEvent, { loading: featuring }] = useMutation(SET_FEATURED_EVENT)

  const rows = data?.paginatedEvents.items ?? []
  const total = data?.paginatedEvents.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const upcomingTotal = upcomingSummaryData?.paginatedEvents.total ?? 0
  const archiveTotal = archiveSummaryData?.paginatedEvents.total ?? 0

  const editing = useMemo(() => Boolean(form.id), [form.id])

  function openCreate() {
    setForm(initialState)
    setCoverPhotoFile(null)
    setCoverPhotoPreview('')
    setIsModalOpen(true)
  }

  function openEdit(event: EventItem) {
    setForm({
      id: event.id,
      title: event.title,
      type: event.type,
      date: event.date ? event.date.slice(0, 10) : '',
      location: event.location ?? '',
      description: event.description ?? '',
      attendance: event.attendance ?? '',
      coverPhoto: event.coverPhoto ?? event.photos?.[0] ?? '',
    })
    setCoverPhotoFile(null)
    setCoverPhotoPreview(event.coverPhoto ?? '')
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.title.trim() || !form.type || !form.date.trim() || !form.location.trim()) {
      showToast('Majburiy maydonlar: title, type, sana, location', 'error')
      return
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
      showToast('Sana formati YYYY-MM-DD bo\'lishi kerak', 'error')
      return
    }
    if (!hasRichTextContent(form.description)) {
      showToast('Description kiriting', 'error')
      return
    }

    try {
      let coverPhotoUrl = form.coverPhoto || undefined
      if (coverPhotoFile) {
        coverPhotoUrl = await uploadImage(coverPhotoFile)
      }

      const input = {
        title: form.title.trim(),
        type: form.type,
        date: new Date(form.date).toISOString(),
        location: form.location.trim(),
        attendance: form.attendance.trim() || undefined,
        description: form.description.trim(),
        coverPhoto: coverPhotoUrl,
      }

      if (form.id) {
        await updateEvent({ variables: { id: form.id, input } })
        showToast('Tadbir yangilandi')
      } else {
        await createEvent({ variables: { input } })
        showToast('Tadbir yaratildi')
      }
      setIsModalOpen(false)
      setForm(initialState)
      setCoverPhotoFile(null)
      setCoverPhotoPreview('')
      await refetch({ pagination: queryPagination })
    } catch (error) {
      console.error(error)
      const err = error as { graphQLErrors?: Array<{ message?: string }>; networkError?: { message?: string }; message?: string }
      const msg = err.graphQLErrors?.[0]?.message || err.networkError?.message || err.message || 'Amal bajarilmadi'
      showToast(msg, 'error')
    }
  }

  async function removeSelected() {
    if (!deleteId) return
    try {
      await deleteEvent({ variables: { id: deleteId } })
      setDeleteId(null)
      showToast("Tadbir o'chirildi")
      await refetch({ pagination: queryPagination })
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik yuz berdi", 'error')
    }
  }

  async function markAsFeatured(id: string) {
    try {
      await setFeaturedEvent({ variables: { id } })
      showToast('Asosiy tadbir yangilandi')
      await refetch({ pagination: queryPagination })
    } catch (error) {
      console.error(error)
      showToast('Asosiy tadbirni belgilashda xatolik', 'error')
    }
  }

  return (
    <AdminLayout title="Tadbirlar">
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setTypeFilter('UPCOMING')
            setPage(1)
          }}
          className={`rounded-2xl border p-5 text-left transition ${
            typeFilter === 'UPCOMING'
              ? 'border-[#00236f] bg-[#eef3ff] shadow-[0_8px_24px_rgba(0,35,111,0.1)]'
              : 'border-black/10 bg-white hover:bg-[#f8f9fc]'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Upcoming</p>
          <p className="mt-2 text-3xl font-bold text-[#1d1d1f]">{upcomingTotal}</p>
          <p className="mt-1 text-sm text-[#6e6e73]">Kelajakdagi tadbirlar</p>
        </button>

        <button
          type="button"
          onClick={() => {
            setTypeFilter('PAST')
            setPage(1)
          }}
          className={`rounded-2xl border p-5 text-left transition ${
            typeFilter === 'PAST'
              ? 'border-[#00236f] bg-[#eef3ff] shadow-[0_8px_24px_rgba(0,35,111,0.1)]'
              : 'border-black/10 bg-white hover:bg-[#f8f9fc]'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">Archive</p>
          <p className="mt-2 text-3xl font-bold text-[#1d1d1f]">{archiveTotal}</p>
          <p className="mt-1 text-sm text-[#6e6e73]">O&apos;tgan tadbirlar</p>
        </button>
      </div>

      <div className="mb-4 space-y-3">
        <p className="text-sm text-[#6e6e73]">Jami: {total} ta tadbir</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <FormInput label="Qidirish" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} />
          </div>
          <div className="w-full max-w-xs">
            <FormSelect label="Type" value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value as 'ALL' | EventTimelineStatus); setPage(1) }}>
              <option value="ALL">Barchasi</option>
              <option value="UPCOMING">UPCOMING</option>
              <option value="PAST">PAST</option>
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
            Yangi tadbir
          </button>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Sarlavha', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'type', header: 'Turi', render: (item) => <Badge>{item.type}</Badge> },
          {
            key: 'date',
            header: 'Sana',
            render: (item) => {
              const formatted = formatTableDate(item.date)
              return <span className={formatted.invalid ? 'text-red-600' : ''}>{formatted.label}</span>
            },
          },
          { key: 'location', header: 'Joylashuv', render: (item) => item.location },
          {
            key: 'actions',
            header: 'Amallar',
            render: (item) => (
              <div className="flex gap-2">
                <button className="rounded-lg border border-black/10 px-2.5 py-1 text-xs hover:bg-[#f5f5f7]" onClick={() => openEdit(item)} type="button">
                  Edit
                </button>
                <button
                  className={`rounded-lg border px-2.5 py-1 text-xs ${
                    item.isFeatured
                      ? 'border-amber-300 bg-amber-50 text-amber-600'
                      : 'border-black/10 text-[#6e6e73] hover:bg-[#f5f5f7]'
                  }`}
                  onClick={() => markAsFeatured(item.id)}
                  title={item.isFeatured ? 'Asosiy tadbir' : 'Asosiy qilish'}
                  type="button"
                  disabled={featuring}
                >
                  {item.isFeatured ? '★' : '☆'}
                </button>
                <button className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50" onClick={() => setDeleteId(item.id)} type="button">
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        emptyText={loading ? 'Yuklanmoqda...' : "Tadbirlar topilmadi"}
        limit={pageSize}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        page={page}
        rows={rows}
        total={total}
      />
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1}
          className="rounded-lg border border-black/10 px-3 py-1 text-sm disabled:opacity-50"
        >
          Oldingi
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1)
          .map((value, index, list) => (
            <span key={value} className="inline-flex items-center gap-2">
              {index > 0 && value - list[index - 1] > 1 ? <span className="px-1">...</span> : null}
              <button
                type="button"
                onClick={() => setPage(value)}
                className={`rounded-lg border px-3 py-1 text-sm ${value === page ? 'border-[#00236f] bg-[#00236f] text-white' : 'border-black/10'}`}
              >
                {value}
              </button>
            </span>
          ))}
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages}
          className="rounded-lg border border-black/10 px-3 py-1 text-sm disabled:opacity-50"
        >
          Keyingi
        </button>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Tadbirni tahrirlash' : 'Yangi tadbir'}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormInput
            label="Title"
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            value={form.title}
          />
          <FormSelect label="Type" onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as EventType }))} value={form.type}>
            <option value="MADANIY">MADANIY</option>
            <option value="TRIP">TRIP</option>
            <option value="SPORT">SPORT</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="EDUCATION">EDUCATION</option>
          </FormSelect>
          <FormInput
            label="Date"
            min="1000-01-01"
            max="9999-12-31"
            onChange={(event) => setForm((prev) => ({ ...prev, date: normalizeDateInput(event.target.value) }))}
            type="date"
            value={form.date}
          />
          <FormInput label="Location" onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} value={form.location} />
          <FormInput
            label="Attendance"
            placeholder="Masalan: 1200"
            inputMode="numeric"
            onChange={(event) =>
              setForm((prev) => ({ ...prev, attendance: event.target.value.replace(/\D/g, '') }))
            }
            value={form.attendance}
          />
          <div className="sm:col-span-2">
            <RichTextEditor
              label="Description"
              content={form.description}
              onChange={(description) => setForm((prev) => ({ ...prev, description }))}
            />
          </div>
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">
              Cover Photo
            </span>
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
              <div className="relative mt-2 h-56 w-full overflow-hidden rounded-xl border border-black/10 bg-[#f8f9fc]">
                <Image
                  src={coverPhotoPreview || form.coverPhoto}
                  alt="Cover preview"
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

      <ConfirmModal
        confirmText="Ha, o'chirish"
        description="Ushbu tadbir butunlay o'chiriladi."
        loading={deleting}
        onCancel={() => setDeleteId(null)}
        onConfirm={removeSelected}
        open={Boolean(deleteId)}
        title="Tadbirni o'chirasizmi?"
      />
    </AdminLayout>
  )
}
