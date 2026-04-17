import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import JoinCTA from '@/components/sections/about/JoinCTA'
import VisaArticlesSection from '@/components/sections/visa/VisaArticlesSection'
import Image from 'next/image'

interface VisaDetailConfig {
  categoryLabel: string
  title: string
  heroDescription: string
  heroImage: string
  quickFacts: Array<{ label: string; value: string }>
  checklist: string[]
  warningTitle: string
  warningDescription: string
  steps: Array<{ title: string; description: string }>
}

const VISA_DETAILS: Record<string, VisaDetailConfig> = {
  'd-2': {
    categoryLabel: 'Visa Category',
    title: 'D-2 - Talaba vizasi',
    heroDescription:
      "Koreya universitetida bakalavr, magistratura yoki tadqiqot o'qish uchun mo'ljallangan rasmiy ruxsatnoma.",
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIDaJDJjVW2yoqNDhkzcjsYwtZXGoMjkNUQcUtgFLdxeY6x3AgzuxCLqFZ5908ROHOZj0w3nO8nieLw1kZfKcHIrcdZDigCr7hv70NiZoLrrOxNlbuxslTLaV6xdD4B9MKV9-SNdsD_A-cNL6SpzmflXc9nSH64fHfz2pb9-VB6HT94kjT9sXw7Ca-kTDj07Q_4ILajtBrvaJX2xcxNeC0Pc93Wq5Ny7JjhhLLY_Sn-hQm4b3cbeg33TlDXIG8tLfvdMlLOfF_oPg',
    quickFacts: [
      { label: 'Muddat', value: '1-2 yil' },
      { label: 'Narx', value: '130,000 KRW' },
      { label: 'Yangilash', value: '6 oy' },
      { label: 'Ishlash', value: '25 soat' },
    ],
    checklist: [
      "Xorijga chiqish pasporti (asli)",
      'Universitet qabul xati (Standard Admission Letter)',
      "Bank hisobidan ko'chirma (oxirgi 6 oy)",
      "Oq fondagi rasm (3.5x4.5)",
    ],
    warningTitle: 'Muhim ogohlantirish',
    warningDescription:
      "Bank hisobida kam mablag' bo'lishi eng ko'p rad etilish sababi. Kamida 20,000 USD ekvivalent mablag' tavsiya etiladi.",
    steps: [
      {
        title: 'Universitetga hujjat topshirish',
        description:
          "Tanlagan universitetning xalqaro bo'limiga hujjat yuboring va Certificate of Admission hujjatini oling.",
      },
      {
        title: 'Moliyaviy tayyorgarlik',
        description: "Bank hisobingizda o'qish va yashash xarajatlarini qoplaydigan mablag'ni oldindan shakllantiring.",
      },
      {
        title: 'Elchixonaga ariza',
        description:
          "KVAC yoki elchixonadan navbat olib, tayyorlangan hujjatlarni topshiring va ariza jarayonini boshlang.",
      },
      {
        title: 'Suhbat va natija',
        description: "Zarurat bo'lsa konsullik suhbatidan o'ting. Jarayon odatda 10-15 ish kuni davom etadi.",
      },
    ],
  },
  'd-10': {
    categoryLabel: 'Visa Category',
    title: 'D-10 - Ish izlash vizasi',
    heroDescription:
      "Bitiruvdan keyin Koreyada qonuniy ravishda ish qidirish, suhbatlarda qatnashish va professional tarmoqni kengaytirish uchun viza turi.",
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBinAeXp6ZaadaK-FxHxsIWmeG2X0ZeJbnjj6OglUtYfFthulebKditqy0UdRBvWZn00KHmWIYBLVPSbL6oAruKHz-1lepWr7Xz7en9LqxTBG22OEtKGILyrIbyb77hF-BAZWU98mOZDgSZGw1S8vVuJZEwP-QD7NHo3B_DbMM1xQNbx8nx6eFDNBv9br88sHNKWAElBSRrmnFvr7l-l44v_8LnypqCsUjYwOHnAHDz7zZABx9HgPC7QebWa1NqAr21wtBss3lsHCg',
    quickFacts: [
      { label: 'Muddat', value: '6 oy' },
      { label: 'Narx', value: '100,000 KRW' },
      { label: 'Yangilash', value: 'Ball tizimi' },
      { label: 'Ishlash', value: 'Cheklangan' },
    ],
    checklist: [
      'Bitiruvni tasdiqlovchi hujjat (diplom yoki ma`lumotnoma)',
      "Avvalgi viza va ARC ma'lumotlari",
      "Faol ish qidiruv rejasi (CV, cover letter, reja)",
      "Moliyaviy barqarorlikni ko'rsatuvchi hujjatlar",
    ],
    warningTitle: 'Muhim ogohlantirish',
    warningDescription:
      "D-10 vaqtinchalik viza bo'lgani uchun ish qidiruv faoliyati hujjatlar bilan isbotlangan bo'lishi kerak.",
    steps: [
      {
        title: "Talablarni tekshirish",
        description: "Bitiruv holati, avvalgi viza turi va ariza muddatlarini migratsiya mezonlari bo'yicha tekshiring.",
      },
      {
        title: 'Hujjatlarni tayyorlash',
        description: "CV, portfolio, ish reja va moliyaviy hujjatlarni bir paketga tayyorlang.",
      },
      {
        title: 'Migratsiyaga ariza',
        description: "Online navbat olib, immigration ofisida D-10 ga o'tish yoki uzaytirish arizasini topshiring.",
      },
      {
        title: "Ish topish va o'tish",
        description: "Ish taklifi olgach E-7 kabi ish vizasiga o'tish jarayonini darhol boshlang.",
      },
    ],
  },
  'e-7': {
    categoryLabel: 'Visa Category',
    title: 'E-7 - Professional ishchi vizasi',
    heroDescription:
      "Koreyada malakali mutaxassis sifatida rasmiy ish faoliyatini boshlash uchun ish beruvchi homiyligidagi asosiy viza turi.",
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAF_arXmESAuR8LjY1_G59-CIcd0LnnLhWcR28Q4BeyiGg8cPNYss3ZSM1bXJg73JC3byxJp3PJx_4L9ArakeIgVYU704PlHh8jUFAmQZnn3pfqTHccy3CadwXku_uYYu8NnRhp1JsCp5gRUNRUXys-2i8ZXpTr5OVHb6a4NVi76TpQxDCwWrOH7YkNs9cKxHI6MErjri2HquIhf51qXVx607cKGNiBVLlKVpWiPE74Va0qTAGTT3iS-jYyrt59Pg78GPTX-zLpRPo',
    quickFacts: [
      { label: 'Muddat', value: '1-3 yil' },
      { label: 'Narx', value: '120,000 KRW' },
      { label: 'Yangilash', value: 'Shartnoma asosida' },
      { label: 'Ishlash', value: 'To`liq vaqt' },
    ],
    checklist: [
      'Ish beruvchi bilan rasmiy mehnat shartnomasi',
      'Diplom va malaka sertifikatlari',
      "Kompaniya ro'yxatdan o'tganligini tasdiqlovchi hujjatlar",
      'Kasbiy tajriba yoki portfolio dalillari',
    ],
    warningTitle: 'Muhim ogohlantirish',
    warningDescription:
      "Lavozim, maosh va malaka talablari mos kelmasa E-7 rad etilishi mumkin. Ish beruvchi hujjatlari to'liq bo'lishi shart.",
    steps: [
      {
        title: 'Ish taklifini olish',
        description: "Rasmiy kompaniyadan lavozim tavsifi aniq ko'rsatilgan offer va shartnoma oling.",
      },
      {
        title: 'Malaka mosligini tekshirish',
        description: 'Diplom, tajriba va lavozim E-7 klassifikatsiyasiga mos kelishini oldindan tahlil qiling.',
      },
      {
        title: 'Ariza paketi topshirish',
        description:
          "Ish beruvchi va xodim hujjatlari bilan migratsiya bo'limiga ariza yuborilib, ko'rib chiqish jarayoni boshlanadi.",
      },
      {
        title: 'Viza rasmiylashtirish',
        description: "Tasdiqdan so'ng viza beriladi va to'liq vaqt ishlash huquqi kuchga kiradi.",
      },
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
      <main className="bg-surface text-on-surface">
        <section className="relative overflow-hidden px-8 pb-32 pt-20">
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block rounded-full bg-secondary-container px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                {config.categoryLabel}
              </span>
              <h1 className="mb-8 font-headline text-5xl font-bold leading-[0.9] tracking-tighter text-primary md:text-7xl">{config.title}</h1>
              <p className="max-w-lg text-xl font-light leading-relaxed text-on-surface-variant">{config.heroDescription}</p>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={config.heroImage}
                alt={config.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </section>

        <div className="relative z-20 mx-auto -mt-16 max-w-7xl px-8">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-[0_10px_40px_rgba(0,35,111,0.06)] md:grid-cols-4">
            {config.quickFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{fact.label}</span>
                <span className="text-xl font-bold text-primary">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="mx-auto grid max-w-7xl gap-16 px-8 py-32 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <div className="sticky top-28">
              <h3 className="mb-8 px-2 font-headline text-2xl font-bold text-primary">Hujjatlar ro&apos;yxati</h3>
              <div className="space-y-6 rounded-2xl bg-surface-container-low p-8">
                {config.checklist.map((item) => (
                  <label key={item} className="group flex cursor-pointer items-start gap-4">
                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary" />
                    <span className="font-medium text-on-surface transition-colors group-hover:text-primary">{item}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex gap-4 rounded-2xl bg-tertiary-fixed p-6">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant">warning</span>
                <div>
                  <h4 className="mb-1 font-bold text-on-tertiary-fixed">{config.warningTitle}</h4>
                  <p className="text-sm leading-snug text-on-tertiary-fixed-variant">{config.warningDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="mb-12 font-headline text-4xl font-bold text-primary">Viza olish bosqichlari</h2>
            <div className="relative space-y-12 before:absolute before:bottom-4 before:left-8 before:top-4 before:w-px before:bg-outline-variant/30">
              {config.steps.map((step, index) => (
                <div key={step.title} className="group relative pl-24">
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface bg-surface-container-highest text-2xl font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    {index + 1}
                  </div>
                  <h3 className="mb-3 font-headline text-2xl font-bold text-primary">{step.title}</h3>
                  <p className="leading-relaxed text-on-surface-variant">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <VisaArticlesSection className="rounded-none bg-surface-container-low py-24" />

        <JoinCTA
          variant="plain"
          eyebrow="Viza yordami"
          title="Savolingiz bormi?"
          description="BUSA jamoasi sizga D-2, D-10 va E-7 vizalari bo'yicha amaliy yo'l-yo'riq beradi."
        />
      </main>
      <Footer />
    </>
  )
}

