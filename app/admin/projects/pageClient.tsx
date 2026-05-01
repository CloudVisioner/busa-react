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
import {
  CREATE_PROJECT,
  GET_PAGINATED_PROJECTS,
  REMOVE_PROJECT,
  SET_FEATURED_PROJECT,
  UPDATE_PROJECT,
} from '@/lib/apollo/projects'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { uploadImage } from '@/lib/upload'
import { formatTableDate } from '@/lib/utils/date'
import { hasRichTextContent } from '@/lib/utils/richText'

type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'UPCOMING'

interface ProjectItem {
  id: string
  title: string
  slug: string
  description: string
  coverPhoto?: string | null
  photos: string[]
  icon: string
  status: ProjectStatus
  startDate?: string | null
  endDate?: string | null
  members: string[]
  isFeatured?: boolean
  createdAt?: string
}

interface ProjectsQueryData {
  paginatedProjects: {
    items: ProjectItem[]
    total: number
    hasMore: boolean
  }
}

interface ProjectInputState {
  id?: string
  title: string
  icon: string
  status: ProjectStatus
  startDate: string
  endDate: string
  members: string[]
  description: string
  coverPhoto: string
  photos: string[]
}

const ICON_OPTIONS = [
  { value: '📚', label: "📚 Ta'lim (Education)" },
  { value: '⚽', label: '⚽ Sport (Sports)' },
  { value: '🎨', label: '🎨 Madaniyat (Culture)' },
  { value: '💻', label: '💻 Texnologiya (Technology)' },
  { value: '🤝', label: '🤝 Volontyorlik (Volunteer)' },
  { value: '🎓', label: '🎓 Akademik (Academic)' },
  { value: '📰', label: '📰 Media' },
  { value: '🎭', label: "🎭 San'at (Art)" },
  { value: '🏆', label: '🏆 Musobaqa (Competition)' },
  { value: '🌍', label: '🌍 Xalqaro (International)' },
] as const

const initialState: ProjectInputState = {
  title: '',
  icon: '📚',
  status: 'ACTIVE',
  startDate: '',
  endDate: '',
  members: [],
  description: '',
  coverPhoto: '',
  photos: [],
}

function normalizeDateInput(value: string): string {
  const match = value.match(/^(\d{0,4})(?:-(\d{0,2}))?(?:-(\d{0,2}))?/)
  if (!match) return ''
  const [, year = '', month = '', day = ''] = match
  if (!month) return year
  if (!day) return `${year}-${month}`
  return `${year}-${month}-${day}`
}

function getStatusVariant(status: ProjectStatus): 'green' | 'gray' | 'navy' {
  if (status === 'ACTIVE') return 'green'
  if (status === 'COMPLETED') return 'gray'
  return 'navy'
}

export default function ProjectsManager() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | ProjectStatus>('ALL')
  const [form, setForm] = useState<ProjectInputState>(initialState)
  const [memberInput, setMemberInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('')
  const [photosFiles, setPhotosFiles] = useState<File[]>([])
  const [photosPreview, setPhotosPreview] = useState<string[]>([])
  const { showToast } = useToast()
  const debouncedSearch = useDebouncedValue(search, 400)
  const offset = (page - 1) * pageSize
  const queryPagination = {
    limit: pageSize,
    offset,
    search: debouncedSearch.trim() || undefined,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  }

  const { data, loading, refetch } = useQuery<ProjectsQueryData>(GET_PAGINATED_PROJECTS, {
    variables: { pagination: queryPagination },
    fetchPolicy: 'network-only',
  })
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT)
  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT)
  const [removeProject, { loading: deleting }] = useMutation(REMOVE_PROJECT)
  const [setFeaturedProject, { loading: featuring }] = useMutation(SET_FEATURED_PROJECT)

  const rows = data?.paginatedProjects.items ?? []
  const total = data?.paginatedProjects.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const editing = useMemo(() => Boolean(form.id), [form.id])

  function resetFiles() {
    setCoverPhotoFile(null)
    setCoverPhotoPreview('')
    setPhotosFiles([])
    setPhotosPreview([])
  }

  function openCreate() {
    setForm(initialState)
    setMemberInput('')
    resetFiles()
    setIsModalOpen(true)
  }

  function openEdit(project: ProjectItem) {
    setForm({
      id: project.id,
      title: project.title,
      icon: project.icon || '📚',
      status: project.status || 'ACTIVE',
      startDate: project.startDate ? project.startDate.slice(0, 10) : '',
      endDate: project.endDate ? project.endDate.slice(0, 10) : '',
      members: Array.isArray(project.members) ? project.members : [],
      description: project.description ?? '',
      coverPhoto: project.coverPhoto ?? '',
      photos: Array.isArray(project.photos) ? project.photos.filter(Boolean) : [],
    })
    setMemberInput('')
    setCoverPhotoFile(null)
    setCoverPhotoPreview(project.coverPhoto ?? '')
    setPhotosFiles([])
    setPhotosPreview(Array.isArray(project.photos) ? project.photos.filter(Boolean) : [])
    setIsModalOpen(true)
  }

  function addMember() {
    const value = memberInput.trim()
    if (!value) return
    if (form.members.includes(value)) {
      setMemberInput('')
      return
    }
    setForm((prev) => ({ ...prev, members: [...prev.members, value] }))
    setMemberInput('')
  }

  function removeMember(member: string) {
    setForm((prev) => ({ ...prev, members: prev.members.filter((item) => item !== member) }))
  }

  async function submit() {
    if (!form.title.trim()) {
      showToast('Title majburiy', 'error')
      return
    }
    if (!hasRichTextContent(form.description)) {
      showToast('Description kiriting', 'error')
      return
    }
    if (form.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(form.startDate)) {
      showToast('Start Date formati YYYY-MM-DD bo\'lishi kerak', 'error')
      return
    }
    if (form.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(form.endDate)) {
      showToast('End Date formati YYYY-MM-DD bo\'lishi kerak', 'error')
      return
    }

    try {
      let coverPhoto = form.coverPhoto || undefined
      if (coverPhotoFile) {
        coverPhoto = await uploadImage(coverPhotoFile)
      }

      const uploadedPhotos: string[] = []
      for (const file of photosFiles) {
        uploadedPhotos.push(await uploadImage(file))
      }

      const input = {
        ...(form.id ? { id: form.id } : {}),
        title: form.title.trim(),
        icon: form.icon,
        status: form.status,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : undefined,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
        members: form.members.map((member) => member.trim()).filter(Boolean),
        description: form.description.trim(),
        coverPhoto,
        photos: [...form.photos, ...uploadedPhotos].filter(Boolean),
      }

      if (form.id) {
        await updateProject({ variables: { input } })
        showToast('Loyiha yangilandi')
      } else {
        await createProject({ variables: { input } })
        showToast('Loyiha yaratildi')
      }

      setIsModalOpen(false)
      setForm(initialState)
      setMemberInput('')
      resetFiles()
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
      await removeProject({ variables: { id: deleteId } })
      setDeleteId(null)
      showToast("Loyiha o'chirildi")
      await refetch({ pagination: queryPagination })
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik yuz berdi", 'error')
    }
  }

  async function markAsFeatured(id: string) {
    try {
      await setFeaturedProject({ variables: { id } })
      showToast('Asosiy loyiha yangilandi')
      await refetch({ pagination: queryPagination })
    } catch (error) {
      console.error(error)
      showToast('Asosiy loyihani belgilashda xatolik', 'error')
    }
  }

  return (
    <AdminLayout title="Loyihalar">
      <div className="mb-4 space-y-3">
        <p className="text-sm text-[#6e6e73]">Jami: {total} ta loyiha</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <FormInput
              label="Qidirish"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
            />
          </div>
          <div className="w-full max-w-xs">
            <FormSelect
              label="Status"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as 'ALL' | ProjectStatus)
                setPage(1)
              }}
            >
              <option value="ALL">Barchasi</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="UPCOMING">UPCOMING</option>
            </FormSelect>
          </div>
          <div className="w-28">
            <FormSelect
              label="Per page"
              value={String(pageSize)}
              onChange={(event) => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </FormSelect>
          </div>
          <button
            className="ml-auto rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            onClick={openCreate}
            type="button"
          >
            Yangi loyiha
          </button>
        </div>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Sarlavha', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'icon', header: 'Icon', render: (item) => <span className="text-lg leading-none">{item.icon || '📚'}</span> },
          { key: 'status', header: 'Status', render: (item) => <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge> },
          {
            key: 'startDate',
            header: 'Boshlanish',
            render: (item) => {
              const formatted = formatTableDate(item.startDate)
              return <span className={formatted.invalid ? 'text-red-600' : ''}>{formatted.label}</span>
            },
          },
          {
            key: 'endDate',
            header: 'Tugash',
            render: (item) => {
              const formatted = formatTableDate(item.endDate)
              return <span className={formatted.invalid ? 'text-red-600' : ''}>{formatted.label}</span>
            },
          },
          { key: 'members', header: "A'zolar", render: (item) => `${item.members?.length ?? 0}` },
          {
            key: 'actions',
            header: 'Amallar',
            render: (item) => (
              <div className="flex gap-2">
                <button
                  className="rounded-lg border border-black/10 px-2.5 py-1 text-xs hover:bg-[#f5f5f7]"
                  onClick={() => openEdit(item)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className={`rounded-lg border px-2.5 py-1 text-xs ${
                    item.isFeatured ? 'border-amber-300 bg-amber-50 text-amber-600' : 'border-black/10 text-[#6e6e73] hover:bg-[#f5f5f7]'
                  }`}
                  onClick={() => markAsFeatured(item.id)}
                  title={item.isFeatured ? 'Asosiy loyiha' : 'Asosiy qilish'}
                  type="button"
                  disabled={featuring}
                >
                  {item.isFeatured ? '★' : '☆'}
                </button>
                <button
                  className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50"
                  onClick={() => setDeleteId(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        emptyText={loading ? 'Yuklanmoqda...' : "Loyihalar topilmadi"}
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

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Loyihani tahrirlash' : 'Yangi loyiha'}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormInput
            label="Title"
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            value={form.title}
          />
          <FormSelect
            label="Icon"
            value={form.icon}
            onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
          >
            {ICON_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            label="Status"
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as ProjectStatus }))}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="UPCOMING">UPCOMING</option>
          </FormSelect>
          <FormInput
            label="Start Date"
            min="1000-01-01"
            max="9999-12-31"
            type="date"
            value={form.startDate}
            onChange={(event) => setForm((prev) => ({ ...prev, startDate: normalizeDateInput(event.target.value) }))}
          />
          <FormInput
            label="End Date"
            min="1000-01-01"
            max="9999-12-31"
            type="date"
            value={form.endDate}
            onChange={(event) => setForm((prev) => ({ ...prev, endDate: normalizeDateInput(event.target.value) }))}
          />

          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">A&apos;zolar</span>
            <div className="flex gap-2">
              <input
                value={memberInput}
                onChange={(event) => setMemberInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addMember()
                  }
                }}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#00236f] focus:ring-2 focus:ring-[#00236f]/20"
                placeholder="Ism kiriting"
              />
              <button
                type="button"
                className="rounded-xl border border-black/10 px-3 py-2 text-sm hover:bg-[#f5f5f7]"
                onClick={addMember}
              >
                Qo&apos;shish
              </button>
            </div>
            {form.members.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.members.map((member) => (
                  <span key={member} className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-medium text-[#00236f]">
                    {member}
                    <button type="button" className="text-[#6e6e73] hover:text-red-600" onClick={() => removeMember(member)}>
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <RichTextEditor
              label="Description"
              content={form.description}
              onChange={(description) => setForm((prev) => ({ ...prev, description }))}
            />
          </div>

          <div className="sm:col-span-2">
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

          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">Photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? [])
                if (files.length === 0) return
                setPhotosFiles(files)
                setPhotosPreview(files.map((file) => URL.createObjectURL(file)))
              }}
            />
            {(photosPreview.length > 0 || form.photos.length > 0) && (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[...(photosPreview.length > 0 ? photosPreview : []), ...(photosPreview.length === 0 ? form.photos : [])].map((src, index) => (
                  <div key={`${src}-${index}`} className="relative h-24 overflow-hidden rounded-lg border border-black/10 bg-[#f8f9fc]">
                    <Image src={src} alt={`Photo preview ${index + 1}`} fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
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
