import type { ArticleDetail } from '@/lib/types/visa'

export const ARTICLE_D2_RENEWAL: ArticleDetail = {
  slug: 'd-2-vizasini-qanday-uzaytirish-mumkin',
  title: 'D-2 vizasini qanday uzaytirish mumkin',
  visaType: 'D2',
  readTime: 5,
  createdAt: '2024-01-15',
  isOutdated: false,
  author: 'Admin',
  featureImage: '/images/visa/d2-renewal.jpg',
  pullQuote: "Viza muddatini o'z vaqtida uzaytirish akademik jarayonning muhim qismi bo'lib, hujjatlarni oldindan to'g'ri tayyorlash kechikishlarning oldini oladi.",
  content: `## Kerakli hujjatlar ro'yxati
Viza uzaytirish uchun arizani viza muddati tugashidan kamida 2 oy oldin topshirish tavsiya etiladi. Sizga quyidagi asosiy hujjatlar kerak bo'ladi:

- **Pasport** va uning nusxasi
- **Foreign Registration Card (ARC)**
- **O'qish to'g'risida ma'lumotnoma** (Certificate of Enrollment)
- **Transkript** (akademik natijalar)
- **Turar joy shartnomasi**

## Moliyaviy talablar
Siz Koreyada yashash uchun yetarli mablag'ga ega ekanligingizni isbotlashingiz kerak. Odatda bu bank hisob raqamidagi ko'chirma orqali amalga oshiriladi.

:::callout
**Eslatma:** Agar o'rtacha bahoyingiz (GPA) 2.0 dan past bo'lsa, immigratsiya xizmati qo'shimcha tushuntirish xati talab qilishi mumkin.
:::

## Ariza topshirish usullari
Siz arizani ikki xil usulda topshirishingiz mumkin: **HiKorea** portali orqali onlayn yoki hududiy immigratsiya idorasiga shaxsan borib. Onlayn topshirishda davlat boji biroz arzonroq bo'lishi mumkin.`,
}

export const ARTICLE_D2_WORK_PERMIT: ArticleDetail = {
  slug: 'd-2-talabalar-uchun-ishlash-ruxsatnomasi',
  title: "D-2 talabalar uchun ishlash ruxsatnomasi",
  visaType: 'D2',
  readTime: 4,
  createdAt: '2024-02-02',
  isOutdated: false,
  author: 'Admin',
  featureImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  pullQuote: "D-2 talabalari uchun part-time ishlash qoidalari universitet va immigratsiya talablariga mos bo'lishi kerak.",
  content: `## Qisqacha
D-2 viza egalari haftalik ruxsat etilgan soatlar doirasida part-time ishlashi mumkin.`,
}

export const ARTICLE_D2_TO_D10: ArticleDetail = {
  slug: 'd-2-dan-d-10-ga-otish-tartibi',
  title: "D-2 dan D-10 ga o'tish tartibi",
  visaType: 'D2',
  readTime: 6,
  createdAt: '2024-03-10',
  isOutdated: false,
  author: 'Admin',
  featureImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  pullQuote: "Bitiruvdan keyingi bosqichda D-10 vizaga o'tish ish qidiruv jarayonini qonuniy davom ettirishga yordam beradi.",
  content: `## Qisqacha
D-2 vizasidan D-10 ga o'tishda muddatlar va hujjatlar mosligi hal qiluvchi omildir.`,
}

export const ARTICLE_D2_ARC_FIRST: ArticleDetail = {
  slug: 'arc-kartasini-birinchi-marta-olish',
  title: 'ARC kartasini birinchi marta olish',
  visaType: 'D2',
  readTime: 5,
  createdAt: '2024-01-28',
  isOutdated: false,
  author: 'Admin',
  featureImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  pullQuote: "ARC karta Koreyadagi kundalik hayot va rasmiy jarayonlar uchun eng muhim hujjatlardan biridir.",
  content: `## Qisqacha
Yangi kelgan talabalar ARC olish uchun immigratsiya navbati va hujjatlarni oldindan tayyorlashi kerak.`,
}

export const ARTICLE_DETAILS: ArticleDetail[] = [ARTICLE_D2_RENEWAL, ARTICLE_D2_WORK_PERMIT, ARTICLE_D2_TO_D10, ARTICLE_D2_ARC_FIRST]

export default ARTICLE_DETAILS
