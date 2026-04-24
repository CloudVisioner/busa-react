'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import FormInput from '@/components/admin/FormInput'
import FormTextarea from '@/components/admin/FormTextarea'
import Modal from '@/components/admin/Modal'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_TIMELINE, CREATE_TIMELINE_ENTRY, DELETE_TIMELINE_ENTRY, UPDATE_TIMELINE_ENTRY } from '@/lib/apollo/queries'

interface TimelineItem {
  id: string
  year: number
  title: string
  description: string
}

interface TimelineQueryData {
  timeline: {
    items: TimelineItem[]
  }
}

interface TimelineFormState {
  id?: string
  year: string
  title: string
  description: string
}

const initialState: TimelineFormState = {
  year: '',
  title: '',
  description: '',
}

export default function TimelineManager() {
  const [form, setForm] = useState<TimelineFormState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()

  const { data, loading, refetch } = useQuery<TimelineQueryData>(ADMIN_GET_TIMELINE, { fetchPolicy: 'network-only' })
  const [createEntry, { loading: creating }] = useMutation(CREATE_TIMELINE_ENTRY)
  const [updateEntry, { loading: updating }] = useMutation(UPDATE_TIMELINE_ENTRY)
  const [deleteEntry, { loading: deleting }] = useMutation(DELETE_TIMELINE_ENTRY)

  const rows = useMemo(() => {
    return [...(data?.timeline.items ?? [])].sort((a, b) => Number(b.year) - Number(a.year))
  }, [data?.timeline.items])

  function openCreate() {
    setForm(initialState)
    setIsModalOpen(true)
  }

  function openEdit(item: TimelineItem) {
    setForm({
      id: item.id,
      year: String(item.year),
      title: item.title ?? '',
      description: item.description ?? '',
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.year.trim() || !form.title.trim()) {
      showToast("Year va title majburiy", 'error')
      return
    }

    const input = {
      year: Number(form.year),
      title: form.title.trim(),
      description: form.description.trim(),
    }

    try {
      if (form.id) {
        await updateEntry({ variables: { id: form.id, input } })
        showToast('Entry yangilandi')
      } else {
        await createEntry({ variables: { input } })
        showToast("Entry qo'shildi")
      }
      setIsModalOpen(false)
      setForm(initialState)
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
      <div className="mb-4 flex justify-end">
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          Qo&apos;shish
        </button>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        {loading ? (
          <p className="py-6 text-center text-sm text-[#6e6e73]">Yuklanmoqda...</p>
        ) : (
          <div className="space-y-3">
            {rows.map((item) => (
              <div className="flex items-start justify-between rounded-xl border border-black/5 p-3" key={item.id}>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold text-[#00236f]">{item.year}</p>
                  <p className="mt-1 text-sm font-semibold text-[#1d1d1f]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#6e6e73]">{item.description}</p>
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

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? "Entry tahrirlash" : "Yangi entry"}>
        <div className="space-y-3">
          <FormInput label="Year" onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))} type="number" value={form.year} />
          <FormInput label="Title" onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} value={form.title} />
          <FormTextarea label="Description" onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} value={form.description} />
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
