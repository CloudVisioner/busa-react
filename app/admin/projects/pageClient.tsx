'use client'

import { useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import Modal from '@/components/admin/Modal'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useToast } from '@/components/admin/ToastProvider'
import { CoverPhotoPlaceholder } from '@/components/media/CoverPhotoPlaceholder'
import { GET_PROJECTS } from '@/lib/apollo/queries'
import { CREATE_PROJECT, REMOVE_PROJECT, SET_FEATURED_PROJECT, UPDATE_PROJECT } from '@/lib/apollo/projects'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { uploadImage } from '@/lib/upload'
import { isRenderableCoverPhoto } from '@/lib/utils/coverPhoto'
import { hasRichTextContent } from '@/lib/utils/richText'

const MAX_GALLERY_PHOTOS = 5

interface ProjectItem {
  id: string
  title: string
  slug: string
  description: string
  coverPhoto?: string | null
  photos: string[]
  isFeatured?: boolean
  createdAt?: string
  updatedAt?: string
}

interface ProjectsQueryData {
  projects: ProjectItem[]
}

interface ProjectInputState {
  id?: string
  title: string
  description: string
  coverPhoto: string
  photos: string[]
}

const initialState: ProjectInputState = {
  title: '',
  description: '',
  coverPhoto: '',
  photos: [],
}

/**
 * Build CreateProjectInput / UpdateProjectInput: only title, description, coverPhoto?, photos.
 * - No slug, id, icon, status, dates, members (slug is server-generated).
 * - Omit coverPhoto when empty — many APIs reject "" for optional URL fields (400 Bad Request).
 * - photos: only non-empty strings (URLs), never File or other types.
 */
function buildProjectInput(form: ProjectInputState, coverPhotoUrl: string | undefined, photosRaw: unknown[]) {
  const title = form.title.trim()
  const description = form.description.trim()

  const photos: string[] = (Array.isArray(photosRaw) ? photosRaw : [])
    .filter((item): item is string => typeof item === 'string')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_GALLERY_PHOTOS)

  const cover = (coverPhotoUrl ?? '').trim()

  const input: { title: string; description: string; coverPhoto?: string; photos: string[] } = {
    title,
    description,
    photos,
  }
  if (cover) {
    input.coverPhoto = cover
  }
  return input
}

export default function ProjectsManager() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState<ProjectInputState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('')
  const [galleryUploading, setGalleryUploading] = useState(false)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const galleryPhotosRef = useRef<string[]>([])
  galleryPhotosRef.current = form.photos
  const { showToast } = useToast()
  const debouncedSearch = useDebouncedValue(search, 400)

  const { data, loading, refetch } = useQuery<ProjectsQueryData>(GET_PROJECTS, {
    fetchPolicy: 'network-only',
  })
  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT)
  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT)
  const [removeProject, { loading: deleting }] = useMutation(REMOVE_PROJECT)
  const [setFeaturedProject, { loading: featuring }] = useMutation(SET_FEATURED_PROJECT)

  const allItems = data?.projects ?? []

  const filteredItems = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter(
      (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q),
    )
  }, [allItems, debouncedSearch])

  const total = filteredItems.length

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredItems.slice(start, start + pageSize)
  }, [filteredItems, page, pageSize])
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const editing = useMemo(() => Boolean(form.id), [form.id])

  function resetFiles() {
    setCoverPhotoFile(null)
    setCoverPhotoPreview('')
  }

  function openCreate() {
    setForm(initialState)
    resetFiles()
    setIsModalOpen(true)
  }

  function openEdit(project: ProjectItem) {
    setForm({
      id: project.id,
      title: project.title,
      description: project.description ?? '',
      coverPhoto: project.coverPhoto ?? '',
      photos: Array.isArray(project.photos) ? project.photos.filter(Boolean).slice(0, MAX_GALLERY_PHOTOS) : [],
    })
    setCoverPhotoFile(null)
    setCoverPhotoPreview(project.coverPhoto ?? '')
    setIsModalOpen(true)
  }

  function removeGalleryPhoto(index: number) {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  async function handleGalleryFilesSelected(fileList: FileList | null) {
    if (!fileList?.length) return
    const picked = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (!picked.length) {
      showToast('Faqat rasm fayllari', 'error')
      return
    }

    setGalleryUploading(true)
    try {
      for (const file of picked) {
        if (galleryPhotosRef.current.length >= MAX_GALLERY_PHOTOS) break
        const url = await uploadImage(file)
        setForm((prev) => {
          if (prev.photos.length >= MAX_GALLERY_PHOTOS) return prev
          const photos = [...prev.photos, url]
          galleryPhotosRef.current = photos
          return { ...prev, photos }
        })
      }
    } catch (error) {
      console.error(error)
      const msg = error instanceof Error ? error.message : 'Rasm yuklashda xatolik'
      showToast(msg, 'error')
    } finally {
      setGalleryUploading(false)
      if (galleryInputRef.current) galleryInputRef.current.value = ''
    }
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

    try {
      let coverPhotoUrl = form.coverPhoto.trim()
      if (coverPhotoFile) {
        coverPhotoUrl = await uploadImage(coverPhotoFile)
      }

      if (form.id) {
        const input = { id: form.id, ...buildProjectInput(form, coverPhotoUrl, form.photos) }
        await updateProject({ variables: { input } })
        showToast('Loyiha yangilandi')
      } else {
        const input = buildProjectInput(form, coverPhotoUrl, form.photos)
        await createProject({ variables: { input } })
        showToast('Loyiha yaratildi')
      }

      setIsModalOpen(false)
      setForm(initialState)
      resetFiles()
      await refetch()
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
      await refetch()
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik yuz berdi", 'error')
    }
  }

  async function markAsFeatured(id: string) {
    try {
      await setFeaturedProject({ variables: { id } })
      showToast('Asosiy loyiha yangilandi')
      await refetch()
    } catch (error) {
      console.error(error)
      showToast('Asosiy loyihani belgilashda xatolik', 'error')
    }
  }

  const gallerySlotsLeft = MAX_GALLERY_PHOTOS - form.photos.length

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
          {
            key: 'cover',
            header: 'Rasm',
            render: (item) => (
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-[#f5f5f7]">
                {isRenderableCoverPhoto(item.coverPhoto) ? (
                  <Image
                    src={item.coverPhoto!}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="eager"
                  />
                ) : (
                  <CoverPhotoPlaceholder className="h-full w-full" />
                )}
              </div>
            ),
          },
          { key: 'title', header: 'Sarlavha', render: (item) => <span className="font-medium">{item.title}</span> },
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
          <div className="sm:col-span-2">
            <FormInput
              label="Title"
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              value={form.title}
            />
          </div>

          <div className="sm:col-span-2">
            <RichTextEditor
              label="Description"
              content={form.description}
              onChange={(description) => setForm((prev) => ({ ...prev, description }))}
            />
          </div>

          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">Cover photo</span>
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
            <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">
              Rasmlar (maks. {MAX_GALLERY_PHOTOS}) — {form.photos.length} / {MAX_GALLERY_PHOTOS}
            </span>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => {
                void handleGalleryFilesSelected(event.target.files)
              }}
            />
            <button
              type="button"
              disabled={gallerySlotsLeft <= 0 || galleryUploading}
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#00236f] hover:bg-[#f5f5f7] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => galleryInputRef.current?.click()}
            >
              {galleryUploading ? 'Yuklanmoqda...' : "Rasmlar qo'shish"}
            </button>
            {gallerySlotsLeft <= 0 ? (
              <p className="mt-2 text-xs text-[#6e6e73]">Limit to‘ldi ({MAX_GALLERY_PHOTOS} ta).</p>
            ) : null}

            {form.photos.length > 0 ? (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {form.photos.map((src, index) => (
                  <div key={`${src}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 bg-[#f8f9fc]">
                    <Image src={src} alt={`Rasm ${index + 1}`} fill sizes="120px" className="object-cover" />
                    <button
                      type="button"
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white hover:bg-black/80"
                      onClick={() => removeGalleryPhoto(index)}
                      aria-label="Rasmni olib tashlash"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
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
