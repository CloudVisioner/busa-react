'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import FormTextarea from '@/components/admin/FormTextarea'
import Modal from '@/components/admin/Modal'
import MultiImageUpload from '@/components/admin/MultiImageUpload'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_EVENTS, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from '@/lib/apollo/queries'
import { toSlug } from '@/lib/utils/toSlug'

type EventType = 'MADANIY' | 'TRIP' | 'SPORT' | 'WORKSHOP' | 'EDUCATION'

interface EventItem {
  id: string
  slug: string
  title: string
  type: EventType
  date: string
  location: string
  description: string
  photos: string[]
}

interface EventsQueryData {
  events: {
    items: EventItem[]
    total: number
    page: number
    limit: number
  }
}

interface EventInputState {
  id?: string
  title: string
  slug: string
  type: EventType
  date: string
  location: string
  description: string
  photos: string[]
}

const initialState: EventInputState = {
  title: '',
  slug: '',
  type: 'MADANIY',
  date: '',
  location: '',
  description: '',
  photos: [],
}

export default function EventsManager() {
  const [page, setPage] = useState(1)
  const [form, setForm] = useState<EventInputState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()
  const limit = 10

  const { data, loading, refetch } = useQuery<EventsQueryData>(ADMIN_GET_EVENTS, { variables: { page, limit }, fetchPolicy: 'network-only' })
  const [createEvent, { loading: creating }] = useMutation(CREATE_EVENT)
  const [updateEvent, { loading: updating }] = useMutation(UPDATE_EVENT)
  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT)

  const rows = data?.events.items ?? []
  const total = data?.events.total ?? 0

  const editing = useMemo(() => Boolean(form.id), [form.id])

  function openCreate() {
    setForm(initialState)
    setIsModalOpen(true)
  }

  function openEdit(event: EventItem) {
    setForm({
      id: event.id,
      title: event.title,
      slug: event.slug,
      type: event.type,
      date: event.date ? event.date.slice(0, 10) : '',
      location: event.location ?? '',
      description: event.description ?? '',
      photos: Array.isArray(event.photos) ? event.photos : [],
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.title.trim() || !form.slug.trim() || !form.date.trim() || !form.location.trim()) {
      showToast('Majburiy maydonlarni to\'ldiring', 'error')
      return
    }

    const input = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      type: form.type,
      date: form.date,
      location: form.location.trim(),
      description: form.description.trim(),
      photos: form.photos,
    }

    try {
      if (form.id) {
        await updateEvent({ variables: { id: form.id, input } })
        showToast('Tadbir yangilandi')
      } else {
        await createEvent({ variables: { input } })
        showToast('Tadbir yaratildi')
      }
      setIsModalOpen(false)
      setForm(initialState)
      await refetch({ page, limit })
    } catch (error) {
      console.error(error)
      showToast('Amal bajarilmadi', 'error')
    }
  }

  async function removeSelected() {
    if (!deleteId) return
    try {
      await deleteEvent({ variables: { id: deleteId } })
      setDeleteId(null)
      showToast("Tadbir o'chirildi")
      await refetch({ page, limit })
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik yuz berdi", 'error')
    }
  }

  return (
    <AdminLayout title="Tadbirlar">
      <div className="mb-4 flex justify-end">
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          Yangi tadbir
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Sarlavha', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'type', header: 'Turi', render: (item) => <Badge>{item.type}</Badge> },
          { key: 'date', header: 'Sana', render: (item) => item.date?.slice(0, 10) ?? '-' },
          { key: 'location', header: 'Joylashuv', render: (item) => item.location },
          {
            key: 'actions',
            header: 'Amallar',
            render: (item) => (
              <div className="flex gap-2">
                <button className="rounded-lg border border-black/10 px-2.5 py-1 text-xs hover:bg-[#f5f5f7]" onClick={() => openEdit(item)} type="button">
                  Edit
                </button>
                <button className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50" onClick={() => setDeleteId(item.id)} type="button">
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        emptyText={loading ? 'Yuklanmoqda...' : "Tadbirlar topilmadi"}
        limit={limit}
        onNext={() => setPage((current) => current + 1)}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        page={page}
        rows={rows}
        total={total}
      />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Tadbirni tahrirlash' : 'Yangi tadbir'}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormInput
            label="Title"
            onChange={(event) => {
              const title = event.target.value
              setForm((prev) => ({ ...prev, title, slug: prev.id ? prev.slug : toSlug(title) }))
            }}
            value={form.title}
          />
          <FormInput label="Slug" onChange={(event) => setForm((prev) => ({ ...prev, slug: toSlug(event.target.value) }))} value={form.slug} />
          <FormSelect label="Type" onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as EventType }))} value={form.type}>
            <option value="MADANIY">MADANIY</option>
            <option value="TRIP">TRIP</option>
            <option value="SPORT">SPORT</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="EDUCATION">EDUCATION</option>
          </FormSelect>
          <FormInput label="Date" onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))} type="date" value={form.date} />
          <FormInput label="Location" onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} value={form.location} />
          <div className="sm:col-span-2">
            <FormTextarea label="Description" onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} value={form.description} />
          </div>
          <div className="sm:col-span-2">
            <MultiImageUpload label="Photos" onChange={(photos) => setForm((prev) => ({ ...prev, photos }))} value={form.photos} />
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
