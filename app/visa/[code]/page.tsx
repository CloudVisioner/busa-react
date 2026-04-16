import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { cn } from '@/lib/utils/cn'

interface VisaDetailConfig {
  title: string
  subtitle: string
  summary: string[]
  bullets: string[]
}

const VISA_DETAILS: Record<string, VisaDetailConfig> = {
  'd-2': {
    title: 'D-2 — Talabalik vizasi',
    subtitle: "O'qish davomiyligi bo'yicha uzaytirish imkoniyati",
    summary: [
      "D-2 viza oliy ta'lim muassasalarida o'qiyotgan talabalar uchun mo'ljallangan bo'lib, o'qish davomiyligiga qarab uzaytirib boriladi.",
      "Part-time ish imkoniyatlari, kreditlar va uzaytirish talablari universitet va migratsiya xizmatining qo'llanmalariga asoslanadi.",
    ],
    bullets: [
      "Haftasiga ma'lum soatgacha part-time ishlash huquqi (odatda 20 soat atrofida).",
      "TOPIK yoki universitet ichki til imtihonlari orqali til talablari.",
      "Semestrlar bo'yicha o'qish natijalari (GPA) viza uzaytirishga ta'sir qiladi.",
      "O'qishdan keyin D-10 yoki boshqa vizaga o'tish uchun asos bo'lib xizmat qilishi mumkin.",
    ],
  },
  'd-10': {
    title: 'D-10 — Ish izlash vizasi',
    subtitle: '6 oygacha ish qidirish huquqi',
    summary: [
      "D-10 viza bitiruvchilar va malakali mutaxassislar uchun Koreyada ish qidirish davrini rasmiylashtirish imkonini beradi.",
      "Vaqtinchalik bo'lsa-da, bu viza ish suhbatlari, stajirovka va professional networking uchun qulay huquqiy maydon yaratadi.",
    ],
    bullets: [
      'Odatda 6 oygacha beriladi, ayrim holatlarda ball tizimi orqali uzaytirilishi mumkin.',
      'Stajirovka yoki qisqa muddatli professional faoliyatni rasmiylashtirish imkoniyati.',
      "Rezyume va portfolioni Koreya bozoriga moslashtirish D-10 davrining eng samarali foydalanish yo'li hisoblanadi.",
      "Kelgusida E-7 kabi ish vizalariga o'tish jarayonida muhim bosqich sifatida qaraladi.",
    ],
  },
  'e-7': {
    title: 'E-7 — Professional ishchi vizasi',
    subtitle: 'Kompaniya bilan rasmiy shartnoma talabi',
    summary: [
      'E-7 viza Koreyada malakali mutaxassis sifatida rasmiy ish faoliyatini olib borish imkonini beradi.',
      "Bu viza ko'pincha IT, muhandislik, ilm-fan, ta'lim va boshqa yuqori malaka talab qilinadigan sohalarda qo'llaniladi.",
    ],
    bullets: [
      'Talab etiladigan minimal maosh va malaka mezonlari mavjud.',
      'Ish beruvchi kompaniya migratsiya xizmatida ro‘yxatdan o‘tgan bo‘lishi kerak.',
      "Uzoq muddatli istiqbol uchun doimiy yashash (F-seriya vizalar) yo'nalishiga olib borishi mumkin.",
      'Ko‘pincha oila a’zolarini ham viza orqali olib kelish huquqini beradi.',
    ],
  },
}

interface VisaDetailPageProps {
  params: Promise<{ code: string }>
}

export default async function VisaDetailPage({ params }: VisaDetailPageProps) {
  const { code } = await params
  const config = VISA_DETAILS[code]

  if (!config) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-4xl px-6 py-32 font-body">
          <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight text-on-surface">Viza topilmadi</h1>
          <p className="text-on-surface-variant">Bu viza turi hozircha qo&apos;llanma sahifasiga ega emas.</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-28 font-body text-on-surface md:px-8">
        <header className="mb-10 md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00236f]">Viza qo&apos;llanmasi</p>
          <h1 className="mb-3 font-headline text-4xl font-bold tracking-tight md:text-5xl">{config.title}</h1>
          <p className="text-base text-on-surface-variant md:text-lg">{config.subtitle}</p>
        </header>

        <section className="mb-10 space-y-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
          {config.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 font-headline text-xl font-semibold text-on-surface md:text-2xl">Nimalarga e&apos;tibor berish kerak?</h2>
          <ul className="space-y-3 text-sm text-on-surface-variant md:text-base">
            {config.bullets.map((item) => (
              <li key={item} className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00236f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

