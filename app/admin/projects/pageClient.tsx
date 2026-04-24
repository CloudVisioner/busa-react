'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import FormTextarea from '@/components/admin/FormTextarea'
import ImageUpload from '@/components/admin/ImageUpload'
import Modal from '@/components/admin/Modal'
import MultiImageUpload from '@/components/admin/MultiImageUpload'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from '@/lib/apollo/queries'
import { toSlug } from '@/lib/utils/toSlug'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'UPCOMING'

interface ProjectItem {
  id: string
  title: string
  slug: string
  description: string
  status: ProjectStatus
  category: string
  coverImage?: string | null
  gallery?: string[] | null
}

interface ProjectsQueryData {
  projects: {
    items: ProjectItem[]
    total: number
    page: number
    limit: number
  }
}

interface ProjectInputState {
  id?: string
  title: string
  slug: string
  description: string
  status: ProjectStatus
  category: string
  coverImage: string
  gallery: string[]
}

const initialState: ProjectInputState = {
  title: '',
  slug: '',
  description: '',
  status: 'ACTIVE',
  category: '',
  coverImage: '',
  gallery: [],
}

export default function ProjectsManager() {
  const [page, setPage] = useState(1)
  const [form, setForm] = useState<ProjectInputState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()
  const limit = 10

  const { data, loading, refetch } = useQuery<ProjectsQueryData>(ADMIN_GET_PROJECTS, { variables: { page, limit }, fetchPolicy: 'network-only' })
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT)
  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT)
  const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT)

  const rows = data?.projects.items ?? []
  const total = data?.projects.total ?? 0

  function openCreate() {
    setForm(initialState)
    setIsModalOpen(true)
  }

  function openEdit(project: ProjectItem) {
    setForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description ?? '',
      status: project.status ?? 'ACTIVE',
      category: project.category ?? '',
      coverImage: project.coverImage ?? '',
      gallery: project.gallery ?? [],
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.title.trim() || !form.slug.trim()) {
      showToast('Majburiy maydonlarni to\'ldiring', 'error')
      return
    }

    const input = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      status: form.status,
      category: form.category.trim(),
      coverImage: form.coverImage.trim(),
      gallery: form.gallery,
    }

    try {
      if (form.id) {
        await updateProject({ variables: { id: form.id, input } })
        showToast('Loyiha yangilandi')
      } else {
        await createProject({ variables: { input } })
        showToast('Loyiha yaratildi')
      }
      setIsModalOpen(false)
      setForm(initialState)
      await refetch({ page, limit })
    } catch (error) {
      console.error(error)
      showToast('Saqlashda xatolik', 'error')
    }
  }

  async function removeSelected() {
    if (!deleteId) return
    try {
      await deleteProject({ variables: { id: deleteId } })
      setDeleteId(null)
      showToast("Loyiha o'chirildi")
      await refetch({ page, limit })
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Loyihalar">
      <div className="mb-4 flex justify-end">
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          Yangi loyiha
        </button>
      </div>

      <DataTable
        columns={[
          {
            key: 'cover',
            header: 'Cover',
            render: (item) => (
              <Image
                alt={item.title}
                className="h-10 w-14 rounded-md object-cover"
                height={40}
                src={item.coverImage || FALLBACK_REMOTE_IMAGE}
                width={56}
              />
            ),
          },
          { key: 'title', header: 'Sarlavha', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'category', header: 'Category', render: (item) => item.category || '-' },
          { key: 'status', header: 'Status', render: (item) => <Badge variant={item.status === 'ACTIVE' ? 'green' : item.status === 'UPCOMING' ? 'orange' : 'gray'}>{item.status}</Badge> },
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
        emptyText={loading ? 'Yuklanmoqda...' : "Loyihalar topilmadi"}
        limit={limit}
        onNext={() => setPage((current) => current + 1)}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        page={page}
        rows={rows}
        total={total}
      />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? 'Loyihani tahrirlash' : 'Yangi loyiha'}>
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
          <FormSelect label="Status" onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProjectStatus }))} value={form.status}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="UPCOMING">UPCOMING</option>
          </FormSelect>
          <FormInput label="Category" onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} value={form.category} />
          <div className="sm:col-span-2">
            <FormTextarea label="Description" onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} value={form.description} />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Cover Image" onChange={(coverImage) => setForm((prev) => ({ ...prev, coverImage }))} value={form.coverImage} />
          </div>
          <div className="sm:col-span-2">
            <MultiImageUpload label="Gallery Images" onChange={(gallery) => setForm((prev) => ({ ...prev, gallery }))} value={form.gallery} />
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
        description="Ushbu loyiha butunlay o'chiriladi."
        loading={deleting}
        onCancel={() => setDeleteId(null)}
        onConfirm={removeSelected}
        open={Boolean(deleteId)}
        title="Loyihani o'chirasizmi?"
      />
    </AdminLayout>
  )
}
