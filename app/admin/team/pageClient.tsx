'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import AdminLayout from '@/components/admin/AdminLayout'
import ConfirmModal from '@/components/admin/ConfirmModal'
import DataTable from '@/components/admin/DataTable'
import FormInput from '@/components/admin/FormInput'
import FormTextarea from '@/components/admin/FormTextarea'
import ImageUpload from '@/components/admin/ImageUpload'
import Modal from '@/components/admin/Modal'
import { useToast } from '@/components/admin/ToastProvider'
import { ADMIN_GET_TEAM, CREATE_TEAM_MEMBER, DELETE_TEAM_MEMBER, UPDATE_TEAM_MEMBER } from '@/lib/apollo/queries'
import { FALLBACK_REMOTE_IMAGE } from '@/lib/utils/remoteImage'

interface TeamMember {
  id: string
  name: string
  role: string
  department?: string | null
  bio?: string | null
  photo?: string | null
}

interface TeamQueryData {
  team: {
    items: TeamMember[]
  }
}

interface TeamFormState {
  id?: string
  name: string
  role: string
  department: string
  bio: string
  photo: string
}

const initialState: TeamFormState = {
  name: '',
  role: '',
  department: '',
  bio: '',
  photo: '',
}

export default function TeamManager() {
  const [form, setForm] = useState<TeamFormState>(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { showToast } = useToast()

  const { data, loading, refetch } = useQuery<TeamQueryData>(ADMIN_GET_TEAM, { fetchPolicy: 'network-only' })
  const [createTeamMember, { loading: creating }] = useMutation(CREATE_TEAM_MEMBER)
  const [updateTeamMember, { loading: updating }] = useMutation(UPDATE_TEAM_MEMBER)
  const [deleteTeamMember, { loading: deleting }] = useMutation(DELETE_TEAM_MEMBER)

  const rows = data?.team.items ?? []

  function openCreate() {
    setForm(initialState)
    setIsModalOpen(true)
  }

  function openEdit(member: TeamMember) {
    setForm({
      id: member.id,
      name: member.name,
      role: member.role ?? '',
      department: member.department ?? '',
      bio: member.bio ?? '',
      photo: member.photo ?? '',
    })
    setIsModalOpen(true)
  }

  async function submit() {
    if (!form.name.trim() || !form.role.trim()) {
      showToast("Name va role majburiy", 'error')
      return
    }

    const input = {
      name: form.name.trim(),
      role: form.role.trim(),
      department: form.department.trim(),
      bio: form.bio.trim(),
      photo: form.photo.trim(),
    }

    try {
      if (form.id) {
        await updateTeamMember({ variables: { id: form.id, input } })
        showToast("A'zo yangilandi")
      } else {
        await createTeamMember({ variables: { input } })
        showToast("A'zo qo'shildi")
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
      await deleteTeamMember({ variables: { id: deleteId } })
      setDeleteId(null)
      await refetch()
      showToast("A'zo o'chirildi")
    } catch (error) {
      console.error(error)
      showToast("O'chirishda xatolik", 'error')
    }
  }

  return (
    <AdminLayout title="Jamoa">
      <div className="mb-4 flex justify-end">
        <button className="rounded-xl bg-[#00236f] px-4 py-2 text-sm font-semibold text-white hover:opacity-95" onClick={openCreate} type="button">
          A&apos;zo qo&apos;shish
        </button>
      </div>

      <DataTable
        columns={[
          {
            key: 'photo',
            header: 'Photo',
            render: (item) => <Image alt={item.name} className="h-9 w-9 rounded-full object-cover" height={36} src={item.photo || FALLBACK_REMOTE_IMAGE} width={36} />,
          },
          { key: 'name', header: 'Ism', render: (item) => <span className="font-medium">{item.name}</span> },
          { key: 'role', header: 'Role', render: (item) => item.role || '-' },
          { key: 'department', header: 'Department', render: (item) => item.department || '-' },
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
        emptyText={loading ? 'Yuklanmoqda...' : "A'zolar topilmadi"}
        limit={10}
        onNext={() => {}}
        onPrev={() => {}}
        page={1}
        rows={rows}
        total={rows.length}
      />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title={form.id ? "A'zoni tahrirlash" : "Yangi a'zo"}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormInput label="Name" onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} value={form.name} />
          <FormInput label="Role" onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} value={form.role} />
          <FormInput label="Department" onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} value={form.department} />
          <div className="sm:col-span-2">
            <FormTextarea label="Bio" onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} value={form.bio} />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload label="Photo" onChange={(photo) => setForm((prev) => ({ ...prev, photo }))} value={form.photo} />
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

      <ConfirmModal open={Boolean(deleteId)} onCancel={() => setDeleteId(null)} onConfirm={removeSelected} loading={deleting} title="A'zoni o'chirasizmi?" />
    </AdminLayout>
  )
}
