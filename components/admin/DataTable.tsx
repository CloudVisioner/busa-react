'use client'

interface DataTableProps<T> {
  columns: Array<{ key: string; header: string; render: (row: T) => React.ReactNode }>
  rows: T[]
  emptyText?: string
  page: number
  total: number
  limit: number
  onPrev: () => void
  onNext: () => void
}

export default function DataTable<T>({
  columns,
  rows,
  emptyText = "Ma'lumot topilmadi",
  page,
  total,
  limit,
  onPrev,
  onNext,
}: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-[#f8f9fc]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#86868b]">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-[#6e6e73]" colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className="border-t border-black/5">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-[#1d1d1f]">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-black/5 px-4 py-3">
        <p className="text-sm text-[#6e6e73]">
          Sahifa {page} / {totalPages}
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-black/10 px-3 py-1.5 text-sm text-[#1d1d1f] disabled:cursor-not-allowed disabled:opacity-50" disabled={page <= 1} onClick={onPrev} type="button">
            Oldingi
          </button>
          <button
            className="rounded-lg border border-black/10 px-3 py-1.5 text-sm text-[#1d1d1f] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={onNext}
            type="button"
          >
            Keyingi
          </button>
        </div>
      </div>
    </div>
  )
}
