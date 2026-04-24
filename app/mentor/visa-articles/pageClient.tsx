'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import Badge from '@/components/admin/Badge'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import FormTextarea from '@/components/admin/FormTextarea'
import MentorLayout from '@/components/admin/MentorLayout'
import Modal from '@/components/admin/Modal'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_VISA_ARTICLES, CREATE_VISA_ARTICLE, DELETE_VISA_ARTICLE, UPDATE_VISA_ARTICLE } from '@/lib/apollo/queries'
import { toSlug } from '@/lib/utils/toSlug'

type VisaType = 'D2' | 'D10' | 'E7' | 'GENERAL'

interface VisaArticleItem {
  id: string
  slug: string
  title: string
  visaType: VisaType
  summary: string
  content: string
  author: string
  authorRole: string
}

interface VisaArticlesQueryData {
  visaArticles: {
    items: VisaArticleItem[]
    total: number
    page: number
    limit: number
  }
}

interface FormState {
  id?: string
  title: string
  slug: string
  visaType: VisaType
  summary: string
  content: string
  author: string
  authorRole: string
}

const mentorName = process.env.NEXT_PUBLIC_MENTOR_NAME ?? 'Mentor'

const initialState: FormState = {
  title: '',
  slug: '',
  visaType: 'GENERAL',
  summary: '',
  content: '',
  author: mentorName,
  authorRole: "Viza bo'yicha mentor",
}

export default function MentorVisaArticlesManager() {
  const [page, setPage] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()
  const limit = 10

  const { data, loading, refetch } = useQuery<VisaArticlesQueryData>(ADMIN_GET_VISA_ARTICLES, {
    variables: { page, limit: 100 },
    fetchPolicy: 'network-only',
  })
  const [createArticle, { loading: creating }] = useMutation(CREATE_VISA_ARTICLE)
  const [updateArticle, { loading: updating }] = useMutation(UPDATE_VISA_ARTICLE)
  const [deleteArticle, { loading: deleting }] = useMutation(DELETE_VISA_ARTICLE)

  const mentorRows = useMemo(() => (data?.visaArticles.items ?? []).filter((item) => item.author === mentorName), [data?.visaArticles.items])
  const total = mentorRows.length
  const pageRows = mentorRows.slice((page - 1) * limit, page * limit)

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
      summary: article.summary ?? '',
      content: article.content ?? '',
      author: article.author ?? mentorName,
      authorRole: article.authorRole ?? "Viza bo'yicha mentor",
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.title.trim() || !form.slug.trim() || !form.summary.trim()) {
      showToast('Majburiy maydonlarni to\'ldiring', 'error')
      return
    }
    const input = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      visaType: form.visaType,
      summary: form.summary.trim(),
      content: form.content.trim(),
      author: mentorName,
      authorRole: form.authorRole.trim(),
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
    <MentorLayout title="Viza maqolalari">
      <div className="mb-4 flex justify-end">
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          Yangi maqola
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'title', header: 'Title', render: (item) => <span className="font-medium">{item.title}</span> },
          { key: 'visaType', header: 'Visa Type', render: (item) => <Badge>{item.visaType}</Badge> },
          { key: 'summary', header: 'Summary', render: (item) => <span className="line-clamp-1 max-w-xs">{item.summary}</span> },
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
        limit={limit}
        onNext={() => setPage((current) => current + 1)}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        page={page}
        rows={pageRows}
        total={total}
      />

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
          <FormInput label="Author" readOnly value={mentorName} />
          <div className="sm:col-span-2">
            <FormInput label="Author Role" onChange={(event) => setForm((prev) => ({ ...prev, authorRole: event.target.value }))} value={form.authorRole} />
          </div>
          <div className="sm:col-span-2">
            <FormTextarea label="Summary" onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))} value={form.summary} />
          </div>
          <div className="sm:col-span-2">
            <FormTextarea label="Content" onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} value={form.content} />
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
    </MentorLayout>
  )
}
