'use client'

import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import FormInput from '@/components/admin/FormInput'
import FormSelect from '@/components/admin/FormSelect'
import { PAGINATED_VISA_ARTICLES } from '@/lib/apollo/queries'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'

interface VisaArticle {
  id: string
  title: string
  slug: string
  visaType: string
  description: string
}

interface PaginatedVisaData {
  paginatedVisaArticles: {
    items: VisaArticle[]
    total: number
    hasMore: boolean
  }
}

const LIMIT = 12
const TYPES = ['ALL', 'D2', 'D10', 'E7', 'GENERAL'] as const

export default function VisaClient() {
  const [items, setItems] = useState<VisaArticle[]>([])
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<(typeof TYPES)[number]>('ALL')
  const [total, setTotal] = useState(0)
  const debouncedSearch = useDebouncedValue(search, 400)

  const pagination = useMemo(
    () => ({
      limit: LIMIT,
      offset,
      search: debouncedSearch.trim() || undefined,
      type: typeFilter === 'ALL' ? undefined : typeFilter,
    }),
    [offset, debouncedSearch, typeFilter],
  )

  const { data, loading } = useQuery<PaginatedVisaData>(PAGINATED_VISA_ARTICLES, {
    variables: { pagination },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    setOffset(0)
    setItems([])
  }, [debouncedSearch, typeFilter])

  useEffect(() => {
    if (!data?.paginatedVisaArticles) return
    setTotal(data.paginatedVisaArticles.total)
    setItems((prev) =>
      offset === 0 ? data.paginatedVisaArticles.items : [...prev, ...data.paginatedVisaArticles.items],
    )
  }, [data, offset])

  const hasMore = items.length < total

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-4 pb-24 pt-24 md:px-8">
        <h1 className="mb-6 font-headline text-5xl font-bold text-primary md:text-7xl">Visa Articles</h1>
        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <FormInput label="Qidirish" value={search} onChange={(event) => setSearch(event.target.value)} />
          <FormSelect label="Type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as (typeof TYPES)[number])}>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>
        </div>
        <p className="mb-6 text-sm text-[#6e6e73]">{items.length} / {total} ko'rsatilmoqda</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((article) => (
            <Link
              key={article.id}
              href={`/visa/articles/${article.slug}`}
              className="rounded-2xl border border-black/10 bg-white p-4"
            >
              <p className="text-xs font-semibold text-[#6e6e73]">{article.visaType}</p>
              <h3 className="mt-1 text-lg font-bold text-[#1d1d1f]">{article.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-[#6e6e73]">{article.description}</p>
            </Link>
          ))}
        </div>

        {hasMore ? (
          <button
            type="button"
            onClick={() => setOffset(items.length)}
            disabled={loading}
            className="mx-auto mt-8 block rounded-xl bg-[#00236f] px-5 py-2 text-white disabled:opacity-60"
          >
            Ko'proq ko'rsatish
          </button>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
