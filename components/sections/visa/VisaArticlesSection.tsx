'use client'

import Link from 'next/link'
import { HiOutlineClock } from 'react-icons/hi2'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface VisaArticlesSectionProps {
  className?: string
  searchQuery?: string
}

interface VisaArticle {
  title: string
  slug: string
  type: string
  timeAgo: string
  readTime: string
  description: string
}

const ARTICLES: VisaArticle[] = [
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
]

function VisaArticlesSection({ className, searchQuery = '' }: VisaArticlesSectionProps) {
  const normalizedQuery = searchQuery.toLowerCase().trim()
  const filteredArticles = ARTICLES.filter((article) => article.title.toLowerCase().includes(normalizedQuery))

  return (
    <section className={cn('bg-[#f5f5f7] py-[80px]', className)}>
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="mb-[32px] flex flex-col justify-between gap-[24px] md:flex-row md:items-end">
          <h2 className="text-[40px] font-semibold tracking-[-0.003em] text-[#1d1d1f]">Bilimlar bazasi</h2>
          <div className="scrollbar-hide flex flex-nowrap gap-[6px] overflow-x-auto pb-[4px] md:flex-wrap md:gap-[8px] md:overflow-visible md:pb-0">
            <button className="shrink-0 rounded-[980px] bg-[#00236f] px-[12px] py-[6px] text-[13px] font-normal text-white md:px-[16px] md:py-[8px] md:text-[14px]">
              Barchasi
            </button>
            <button className="shrink-0 rounded-[980px] border border-[rgba(0,0,0,0.12)] bg-transparent px-[12px] py-[6px] text-[13px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] md:px-[16px] md:py-[8px] md:text-[14px]">
              D-2
            </button>
            <button className="shrink-0 rounded-[980px] border border-[rgba(0,0,0,0.12)] bg-transparent px-[12px] py-[6px] text-[13px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] md:px-[16px] md:py-[8px] md:text-[14px]">
              D-10
            </button>
            <button className="shrink-0 rounded-[980px] border border-[rgba(0,0,0,0.12)] bg-transparent px-[12px] py-[6px] text-[13px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] md:px-[16px] md:py-[8px] md:text-[14px]">
              E-7
            </button>
            <button className="shrink-0 rounded-[980px] border border-[rgba(0,0,0,0.12)] bg-transparent px-[12px] py-[6px] text-[13px] font-normal text-[#1d1d1f] transition duration-200 hover:border-[#00236f] hover:text-[#00236f] md:px-[16px] md:py-[8px] md:text-[14px]">
              Umumiy
            </button>
          </div>
        </div>

        <div className="divide-y divide-[rgba(0,0,0,0.04)]">
          {filteredArticles.map((article, index) => (
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
              {index !== filteredArticles.length - 1 && <div className="h-px w-full bg-[rgba(0,0,0,0.04)]" />}
            </div>
          ))}
          {filteredArticles.length === 0 ? <p className="py-[32px] text-center text-[15px] text-[#86868b]">Hech narsa topilmadi</p> : null}
        </div>

        <div className="mt-[48px] text-center">
          <button className="text-[17px] font-normal text-[#00236f] hover:underline hover:underline-offset-4">Ko&apos;proq yuklash</button>
        </div>
      </div>
    </section>
  )
}

export default VisaArticlesSection
