import type { IconType } from 'react-icons'

interface StatsCardProps {
  icon: IconType
  label: string
  value: number | string
  accent?: 'navy' | 'green' | 'orange' | 'purple'
  trend?: string
}

const accentClass = {
  navy: 'bg-blue-50 text-[#00236f]',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function StatsCard({ icon: Icon, label, value, accent = 'navy', trend }: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-lg p-2 ${accentClass[accent]}`}>
          <Icon className="text-lg" />
        </div>
        {trend ? <span className="rounded-full bg-[#f5f5f7] px-2 py-0.5 text-[11px] font-semibold text-[#6e6e73]">{trend}</span> : null}
      </div>
      <p className="text-[12px] font-semibold uppercase tracking-wider text-[#6e6e73]">{label}</p>
      <h3 className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{value}</h3>
    </div>
  )
}
