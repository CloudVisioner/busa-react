'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import Modal from '@/components/admin/Modal'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_VISA_ARTICLES, CREATE_VISA_ARTICLE, DELETE_VISA_ARTICLE, UPDATE_VISA_ARTICLE } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { toSlug } from '@/lib/utils/toSlug'
import { formatTableDate } from '@/lib/utils/date'
import { hasRichTextContent } from '@/lib/utils/richText'

type VisaType = 'D2' | 'D10' | 'E7' | 'GENERAL'

interface VisaArticleItem {
  id: string
  slug: string
  title: string
  visaType: VisaType
  description: string
  content: string
  author: string
  readTime: number
  createdAt?: string
}

interface VisaArticlesQueryData {
  paginatedVisaArticles: {
    items: VisaArticleItem[]
    total: number
    hasMore: boolean
  }
}

interface FormState {
  id?: string
  title: string
  slug: string
  visaType: VisaType
  description: string
  content: string
  author: string
  readTime: string
}

const initialState: FormState = {
  title: '',
  slug: '',
  visaType: 'GENERAL',
  description: '',
  content: '',
  author: '',
  readTime: '5',
}

export default function AdminVisaArticlesManager() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'ALL' | VisaType>('ALL')
  const [pageSize, setPageSize] = useState(10)
  const [form, setForm] = useState<FormState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()
  const debouncedSearch = useDebouncedValue(search, 400)
  const offset = (page - 1) * pageSize

  const { data, loading, refetch } = useQuery<VisaArticlesQueryData>(ADMIN_GET_VISA_ARTICLES, {
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
  const [createArticle, { loading: creating }] = useMutation(CREATE_VISA_ARTICLE)
  const [updateArticle, { loading: updating }] = useMutation(UPDATE_VISA_ARTICLE)
  const [deleteArticle, { loading: deleting }] = useMutation(DELETE_VISA_ARTICLE)

  const rows = data?.paginatedVisaArticles.items ?? []
  const total = data?.paginatedVisaArticles.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function openCreate() {
    setForm(initialState)
    setIsModalOpen(true)
  }

  function openEdit(article: VisaArticleItem) {
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      visaType: article.visaType ?? 'GENERAL',
      description: article.description ?? '',
      content: article.content ?? '',
      author: article.author ?? '',
      readTime: String(article.readTime ?? 5),
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.title.trim() || !form.slug.trim() || !form.readTime.trim()) {
      showToast('Majburiy maydonlarni to\'ldiring', 'error')
      return
    }
    if (!hasRichTextContent(form.description) || !hasRichTextContent(form.content)) {
      showToast('Description va Content majburiy', 'error')
      return
    }
    const input = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      visaType: form.visaType,
      description: form.description.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
      readTime: Number(form.readTime),
    }
    try {
      if (form.id) {
        await updateArticle({ variables: { id: form.id, input } })
        showToast('Maqola yangilandi')
      } else {
        await createArticle({ variables: { input } })
        showToast('Maqola yaratildi')
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
      await deleteArticle({ variables: { id: deleteId } })
      setDeleteId(null)
      await refetch()
      showToast("Maqola o'chirildi")
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Viza maqolalari">
      <div className="mb-4 space-y-3">
        <p className="text-sm text-[#6e6e73]">Jami: {total} ta maqola</p>
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full max-w-xs">
            <FormInput label="Qidirish" onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Title, slug yoki author" value={search} />
          </div>
          <div className="w-full max-w-xs">
            <FormSelect label="Visa type" onChange={(event) => { setTypeFilter(event.target.value as 'ALL' | VisaType); setPage(1) }} value={typeFilter}>
            <option value="ALL">Barchasi</option>
            <option value="D2">D2</option>
            <option value="D10">D10</option>
            <option value="E7">E7</option>
            <option value="GENERAL">GENERAL</option>
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
            Yangi maqola
          </button>
        </div>
      </div>
      <DataTable
        columns={[
          { key: 'title', header: 'Title', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'visaType', header: 'Visa Type', render: (item) => <Badge>{item.visaType}</Badge> },
          { key: 'description', header: 'Description', render: (item) => <span className="line-clamp-1 max-w-xs">{item.description}</span> },
          { key: 'author', header: 'Author', render: (item) => item.author || '-' },
          {
            key: 'createdAt',
            header: 'Sana',
            render: (item) => {
              const formatted = formatTableDate(item.createdAt)
              return <span className={formatted.invalid ? 'text-red-600' : ''}>{formatted.label}</span>
            },
          },
          {
            key: 'actions',
            header: 'Actions',
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
        emptyText={loading ? 'Yuklanmoqda...' : 'Maqolalar topilmadi'}
        limit={pageSize}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        page={page}
        rows={rows}
        total={total}
      />
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

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? 'Maqolani tahrirlash' : 'Yangi maqola'}>
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
          <FormSelect label="Visa Type" onChange={(event) => setForm((prev) => ({ ...prev, visaType: event.target.value as VisaType }))} value={form.visaType}>
            <option value="D2">D2</option>
            <option value="D10">D10</option>
            <option value="E7">E7</option>
            <option value="GENERAL">GENERAL</option>
          </FormSelect>
          <FormInput label="Author" onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))} value={form.author} />
          <FormInput label="Read Time (min)" onChange={(event) => setForm((prev) => ({ ...prev, readTime: event.target.value }))} type="number" value={form.readTime} />
          <div className="sm:col-span-2">
            <RichTextEditor label="Description" onChange={(description) => setForm((prev) => ({ ...prev, description }))} content={form.description} />
          </div>
          <div className="sm:col-span-2">
            <RichTextEditor label="Content" onChange={(content) => setForm((prev) => ({ ...prev, content }))} content={form.content} />
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

      <ConfirmModal open={Boolean(deleteId)} onCancel={() => setDeleteId(null)} onConfirm={removeSelected} loading={deleting} title="Maqolani o'chirasizmi?" />
    </AdminLayout>
  )
}
