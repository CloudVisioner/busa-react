import AdminLayout from '@/components/admin/AdminLayout'

export const dynamic = 'force-dynamic'

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Sozlamalar">
      <div className="rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-semibold text-[#1d1d1f]">Settings</h2>
        <p className="mt-2 text-sm text-[#6e6e73]">Bu bo&apos;lim keyingi bosqichda backend bilan to&apos;liq ulanadi.</p>
      </div>
    </AdminLayout>
  )
}
