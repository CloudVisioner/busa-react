'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { HiOutlineClock } from 'react-icons/hi2'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface VisaArticlesSectionProps {
  className?: string
  searchQuery?: string
  articles?: VisaArticle[]
}

export interface VisaArticle {
  title: string
  slug: string
  type: string
  timeAgo: string
  readTime: string
  description: string
}

type VisaFilter = 'ALL' | 'D2' | 'D10' | 'E7' | 'E9' | 'GENERAL'

const PAGE_SIZE = 10

const STATIC_ARTICLES: VisaArticle[] = [
  {
    title: "D-2 vizasini qanday uzaytirish mumkin",
    slug: 'd-2-vizasini-qanday-uzaytirish-mumkin',
    type: 'D-2',
    timeAgo: '2 kun oldin',
    readTime: '5 daqiqa',
    description: "Semestr yakunida hujjatlarni qanday tayyorlash va migratsiya bo'limiga topshirish bo'yicha qisqa qo'llanma.",
  },
  {
    title: 'E-7 uchun kerakli hujjatlar',
    slug: 'd-2-talabalar-uchun-ishlash-ruxsatnomasi',
    type: 'E-7',
    timeAgo: '1 hafta oldin',
    readTime: '4 daqiqa',
    description: "Kompaniya shartnomasi, diplom va boshqa asosiy hujjatlar ro'yxati va ularni tartibga keltirish tartibi.",
  },
  {
    title: "D-10 dan E-7 ga o'tish mumkinmi?",
    slug: 'd-2-dan-d-10-ga-otish-tartibi',
    type: 'D-10',
    timeAgo: '3 kun oldin',
    readTime: '3 daqiqa',
    description: "Ish topgandan so'ng ish izlash vizasidan professional ish vizasiga o'tishdagi asosiy bosqichlar.",
  },
  {
    title: 'E-9 vizasi uchun asosiy talablar',
    slug: 'e-9-vizasi-uchun-asosiy-talablar',
    type: 'E-9',
    timeAgo: '5 kun oldin',
    readTime: '6 daqiqa',
    description: "Ishchi vizasi bo'yicha eng muhim hujjatlar va topshirish ketma-ketligi.",
  },
]

function VisaArticlesSection({ className, searchQuery = '', articles }: VisaArticlesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<VisaFilter>('ALL')
  const [sectionSearch, setSectionSearch] = useState('')
  const [page, setPage] = useState(1)
  const source = articles ?? STATIC_ARTICLES
  const normalizedQuery = `${searchQuery} ${sectionSearch}`.toLowerCase().trim()
  const filteredArticles = useMemo(() => {
    return source.filter((article) => {
      const normalizedType = article.type.toUpperCase().replace('-', '')
      const matchesType =
        activeFilter === 'ALL'
          ? true
          : activeFilter === 'E9'
            ? normalizedType === 'E9'
            : normalizedType === activeFilter
      const matchesQuery = normalizedQuery
        ? article.title.toLowerCase().includes(normalizedQuery) || article.description.toLowerCase().includes(normalizedQuery)
        : true
      return matchesType && matchesQuery
    })
  }, [source, activeFilter, normalizedQuery])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const visibleArticles = filteredArticles.slice(pageStart, pageStart + PAGE_SIZE)

  function activateFilter(next: VisaFilter) {
    setActiveFilter(next)
    setPage(1)
  }

  return (
    <section className={cn('bg-[#f5f5f7] py-[80px]', className)}>
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="mb-[32px] flex flex-col justify-between gap-[24px] md:flex-row md:items-end">
          <h2 className="text-[40px] font-semibold tracking-[-0.003em] text-[#1d1d1f]">Bilimlar bazasi</h2>
          <div className="flex w-full max-w-md items-center rounded-full border border-slate-200 bg-white px-4 py-2">
            <input
              className="w-full bg-transparent text-sm text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              onChange={(event) => {
                setSectionSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Bilimlar bazasida qidiring..."
              value={sectionSearch}
            />
          </div>
        </div>
        <div className="mb-5 scrollbar-hide flex flex-nowrap gap-[6px] overflow-x-auto pb-[4px] md:flex-wrap md:gap-[8px] md:overflow-visible md:pb-0">
          {[
            { id: 'ALL' as const, label: 'Barchasi' },
            { id: 'D2' as const, label: 'D-2' },
            { id: 'D10' as const, label: 'D-10' },
            { id: 'E7' as const, label: 'E-7' },
            { id: 'E9' as const, label: 'E-9' },
            { id: 'GENERAL' as const, label: 'Umumiy' },
          ].map((filter) => (
            <button
              key={filter.id}
              className={cn(
                'shrink-0 rounded-[980px] border px-[12px] py-[6px] text-[13px] transition duration-200 md:px-[16px] md:py-[8px] md:text-[14px]',
                activeFilter === filter.id
                  ? 'border-[#00236f] bg-[#00236f] text-white'
                  : 'border-[rgba(0,0,0,0.12)] bg-transparent text-[#1d1d1f] hover:border-[#00236f] hover:text-[#00236f]'
              )}
              onClick={() => activateFilter(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="divide-y divide-[rgba(0,0,0,0.04)]">
          {visibleArticles.map((article, index) => (
            <div key={article.title} className={index === 0 ? '' : ''}>
              <Link
                href={`${ROUTES.VISA}/articles/${article.slug}`}
                className="group flex cursor-pointer items-center justify-between rounded-[12px] px-[24px] py-[20px] transition duration-150 hover:bg-[#f5f5f7]"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="mr-[12px] rounded-[6px] bg-[#00236f]/8 px-[10px] py-[4px] text-[11px] font-normal tracking-[0.04em] text-[#00236f]">
                      {article.type}
                    </span>
                    <span className="text-[17px] font-semibold tracking-[-0.022em] text-[#1d1d1f] transition duration-150 group-hover:text-[#00236f]">
                      {article.title}
                    </span>
                  </div>
                  <div className="mt-[6px] flex items-center gap-[12px] text-[13px] font-normal text-[#86868b]">
                    <span>{article.timeAgo}</span>
                    <span>•</span>
                    <span className="flex items-center gap-[4px]">
                      <HiOutlineClock className="h-4 w-4 text-[#86868b]" />
                      {article.readTime}
                    </span>
                  </div>
                  <p className="mt-[4px] text-[14px] text-[#6e6e73]">{article.description}</p>
                </div>
                <span className="ml-[16px] text-[20px] text-[#86868b] transition duration-200 group-hover:translate-x-[4px] group-hover:text-[#00236f]">
                  →
                </span>
              </Link>
              {index !== visibleArticles.length - 1 && <div className="h-px w-full bg-[rgba(0,0,0,0.04)]" />}
            </div>
          ))}
          {filteredArticles.length === 0 ? <p className="py-[32px] text-center text-[15px] text-[#86868b]">Hech narsa topilmadi</p> : null}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              className="rounded-md border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50"
              disabled={safePage <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              type="button"
            >
              Oldingi
            </button>
            <span className="text-sm text-[#6e6e73]">
              Sahifa {safePage} / {totalPages}
            </span>
            <button
              className="rounded-md border border-black/10 px-3 py-1.5 text-sm disabled:opacity-50"
              disabled={safePage >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              type="button"
            >
              Keyingi
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default VisaArticlesSection
