'use client'

import { useMemo, useState } from 'react'
import { HiCheck, HiExclamationTriangle } from 'react-icons/hi2'
import { cn } from '@/lib/utils/cn'

interface ChecklistItem {
  id: string
  phase: 'before' | 'after'
  category: 'documents' | 'finance' | 'housing' | 'health'
  title: string
  description: string
  important?: boolean
  note?: string
  sourceLabel?: string
  sourceUrl?: string
  sourceTel?: string
}

const FILTERS = [
  { id: 'all', label: 'Barchasi' },
  { id: 'documents', label: '📄 Hujjatlar' },
  { id: 'finance', label: '💰 Moliya' },
  { id: 'housing', label: '🏠 Yashash' },
  { id: 'health', label: "❤️ Sog'liq" },
] as const

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // ─── KELISHDAN OLDIN — HUJJATLAR ───
  {
    id: 'passport',
    phase: 'before',
    category: 'documents',
    title: "Passport — amal qilish muddati 6+ oy qolgan bo'lsin",
    description: "Koreyaga kirishda passportingizda kamida 6 oy muddati qolgan bo'lishi shart. Muddati o'tgan passport bilan viza berilmaydi va aeroportda qaytarib yuborilasiz.",
    important: true,
    note: "O'zbekiston fuqarolari uchun qo'shimcha: oilaviy aloqalarni tasdiqlovchi hujjatlar (nikohnoma, tug'ilish guvohnomasi) notarial tarjimasi bilan taqdim etiladi.",
    sourceLabel: 'Korea Embassy Tashkent',
    sourceUrl: 'https://overseas.mofa.go.kr/uz-uz/index.do',
  },
  {
    id: 'coa',
    phase: 'before',
    category: 'documents',
    title: 'Certificate of Admission (CoA) — universitet qabul xati',
    description: "Universitetning xalqaro bo'limi tomonidan chiqarilgan rasmiy qabul xati. Bu hujjatsiz D-2 viza arizasi qabul qilinmaydi.",
    note: "Hujjatda universitetning muhri va rahbarning imzosi bo'lishi shart. PDF formatda saqlang + 3 ta bosma nusxa oling. Viza noto'g'ri tur bilan chiqsa (D-2-1 o'rniga D-2-3) — darhol elchixonaga murojaat qiling.",
    sourceLabel: 'HiKorea rasmiy sayti',
    sourceUrl: 'https://www.hikorea.go.kr',
  },
  {
    id: 'financial',
    phase: 'before',
    category: 'finance',
    title: "Bank ko'chirmasi — kamida ₩20,000,000 (≈$15,000)",
    description: "So'nggi 6 oylik bank hisobi ko'chirmasi. Bu eng ko'p rad etilish sababidir — kamida 30% ariza shu sabab rad etiladi.",
    important: true,
    note: "Muhim: ko'chirma ariza topshirishdan 1 oydan eski bo'lmasin. Pul bir necha marta kirim-chiqim qilingan bo'lishi yaxshi — yig'ilib qo'yilgan pul shubha uyg'otishi mumkin. Miqdor o'quv haqi va yashash xarajatlaridan past bo'lsa rad etiladi.",
    sourceLabel: 'SNU OIA rasmiy talablar',
    sourceUrl: 'https://oia.snu.ac.kr/visa',
  },
  {
    id: 'school-cert',
    phase: 'before',
    category: 'documents',
    title: "Oxirgi o'quv yurtidan tamomlash guvohnomasi",
    description: "Maktab yoki kollej diplomingizning notarial tasdiqlangan tarjimasi. Ba'zi elchixonalar Apostille talab qiladi.",
    note: "O'zbekistonda chiqarilgan hujjatlar uchun: Tashqi Ishlar Vazirligi orqali apostille qiling. Jarayon 5-10 ish kunini oladi. Xorijda chiqarilgan hujjatlar: 9 oy ichida amal qiladi.",
    sourceLabel: "Korea Embassy hujjatlar ro'yxati",
    sourceUrl: 'https://overseas.mofa.go.kr/gb-en/brd/m_20265/view.do?seq=669256',
  },
  {
    id: 'photo',
    phase: 'before',
    category: 'documents',
    title: 'Rasm — 3.5×4.5 sm, oq fon, rangli',
    description: "So'nggi 6 oy ichida olingan, oq fonda, ko'zoynak va bosh kiyimsiz rasm. Kamida 6 ta oling — viza, ARC va boshqa hujjatlar uchun.",
    note: "Ko'zoynak taqilgan holda olingan rasm qabul qilinmaydi. Aeroportda yoki immigration office yaqinida foto budka bor — ₩3,000-5,000.",
  },

  // ─── KELISHDAN OLDIN — MOLIYA ───
  {
    id: 'cash-arrival',
    phase: 'before',
    category: 'finance',
    title: 'Naqd dollar — kamida $300-500 olib keling',
    description: "ARC olguncha (1-2 oy) Korean bank hisobi ochib bo'lmaydi. Birinchi kunlarda naqd pul hayot qutqaradi.",
    note: "Incheon aeroportida valyuta kursi yomon. Busan shahridagi KEB Hana yoki Shinhan bankida almashtiring — kurs 3-5% yaxshiroq. Dastlab faqat kerakli miqdorni almashtiring.",
  },
  {
    id: 'wise-setup',
    phase: 'before',
    category: 'finance',
    title: "Wise hisobini O'zbekistonda oldindan oching",
    description: "O'zbekistonga pul yuborishning eng arzon yo'li. Oddiy bank o'tkazmalari 10-15% komissiya oladi — Wise atigi 0.5-1% oladi.",
    note: "Hisob-kitob: ₩1,000,000 oddiy bank orqali = ≈$680. Wise orqali = ≈$748. Har bir o'tkazmada $68 tejaladi. Yiliga 12 marta = $816 tejash. wise.com",
  },
  {
    id: 'insurance-travel',
    phase: 'before',
    category: 'health',
    title: "Sayohat sug'urtasi — ARC chiqquncha (1-2 oy) majburiy",
    description: "NHIS (milliy sug'urta) ARC ro'yxatdan o'tgunga ishlamaydi. Shu 1-2 oy davomida davolanish to'liq o'z hisobingizdan bo'ladi.",
    important: true,
    note: "ARC chiqishi odatda 3-4 hafta oladi. Shu davrda biron baxtsizlik yuz bersa — sug'urtasiz davolanish ₩500,000-5,000,000 turadi. Safardan oldin Uzbekistonda sug'urta qiling.",
  },

  // ─── KELISHDAN OLDIN — YASHASH JOYI ───
  {
    id: 'housing-pre',
    phase: 'before',
    category: 'housing',
    title: 'Yashash joyini oldindan tasdiqlang',
    description: "Yotoqxona yoki kvartiraning to'liq manzili, check-in vaqti va aloqa raqamlarini safargacha aniq qilib oling. ARC uchun manzil tasdiqlovchi hujjat kerak.",
    note: "Kvartira ijarasida \"보증금\" (kafolat depoziti) ₩1,000,000-5,000,000 talab qilinishi mumkin. Bu vaqtinchalik — chiqishda qaytariladi. Imzolashdan oldin shartnomasini diqqat bilan o'qing yoki BUSA orqali yordam so'rang.",
  },

  // ─── KELISHDAN OLDIN — SOG'LIQ ───
  {
    id: 'medicines',
    phase: 'before',
    category: 'health',
    title: "Dorilar — zarur dorilaringizni O'zbekistonda olib keling",
    description: "Koreyada ko'p oddiy dorilar faqat retsept bilan beriladi. Surunkali kasallik uchun ishlatadigan dorilar Koreyada topilmasligi mumkin.",
    important: true,
    note: "Ayniqsa muhim: oshqozon, bosh og'riq, allergyia va antibiotiklar. Ingliz tilida yozilgan retsept va dori nomi olib keling. Koreyaga olib kirishga ruxsat etilmagan dorilar ro'yxatini tekshiring.",
    sourceLabel: 'Korea customs dori qoidalari',
    sourceUrl: 'https://www.customs.go.kr/english/main.do',
  },

  // ─── KELGANDAN KEYIN — HUJJATLAR ───
  {
    id: 'arc-register',
    phase: 'after',
    category: 'documents',
    title: "ARC ro'yxatdan o'tish — 90 kun ichida MAJBURIY",
    description: 'Koreyaga kelgandan 90 kun ichida hikorea.go.kr orqali navbat oling va Busan Immigration Office ga boring. Kechiksa — jarima va viza muammolari.',
    important: true,
    note: "Busan Immigration Office: 31, Chungjangdae-ro, Dong-gu, Busan. Tel: 051-461-0431. Dushanba-Juma 09:00-18:00. Navbat tez tugaydi — kelgandan 1-2 hafta ichida band qiling. ARC chiqishi 3-4 hafta oladi. To'lov: ₩30,000 (pochta) yoki ₩33,000 (o'zingiz olasiz).",
    sourceLabel: 'HiKorea navbat olish',
    sourceUrl: 'https://www.hikorea.go.kr',
  },
  {
    id: 'tb-test',
    phase: 'after',
    category: 'health',
    title: "Sil (TB) tekshiruvi — O'zbekiston fuqarolari uchun MAJBURIY",
    description: "O'zbekiston 19 mamlakat ro'yxatida. ARC arizasi oldidan mahalliy 보건소 (sog'liqni saqlash markazi)da sil tekshiruvidan o'ting.",
    important: true,
    note: "Busan Dong-gu Health Center (동구보건소): 부산시 동구 중앙대로 180. Tel: 051-440-6643. Bepul yoki ₩1,000-5,000. Natija 1-3 kun. Bu hujjatsiz ARC arizasi qabul qilinmaydi — ko'p talabalar bilmaydi va kech qoladi.",
    sourceLabel: 'Yonsei OIA ARC talablari',
    sourceUrl: 'https://oia.yonsei.ac.kr/campus/lifeImm.asp',
  },
  {
    id: 'address-update',
    phase: 'after',
    category: 'documents',
    title: "Manzil o'zgarsa — 14 kun ichida xabar bering",
    description: 'Yangi yashash manzilingizni HiKorea.go.kr orqali yoki Immigration Office ga borib 14 kun ichida yangilang. Kechiksa jarima.',
    note: "Ko'p talabalar yotoqxonadan kvartiraga ko'chganda buni unutadi. Viza uzaytirishda eski manzil ko'rinsa — muammo yuzaga keladi.",
    sourceLabel: 'HiKorea manzil yangilash',
    sourceUrl: 'https://www.hikorea.go.kr',
  },
  {
    id: 'part-time',
    phase: 'after',
    category: 'documents',
    title: "Part-time ish ruxsatnomasi (S-3) — ishdan OLDIN oling",
    description: "Ruxsatsiz ishlash qat'iyan taqiqlanadi. 1-marta: ₩1,000,000 jarima. 2-marta: deportatsiya va E-7 vizasiga ta'sir.",
    important: true,
    note: "Talablar: ARC + GPA 2.0+ + TOPIK 3+ (1-2 yil talabalar), TOPIK 4+ (3-4 yil). Soatlar: TOPIK 3 = haftada 20 soat. TOPIK 4+ = haftada 30 soat. Kanikul paytida cheklov yo'q. HiKorea yoki universitetingiz xalqaro bo'limi orqali ariza bering. Ish joyi o'zgarsa — yangi ariza kerak.",
    sourceLabel: "S-3 permit to'liq qo'llanma",
    sourceUrl: 'https://foreignerhome.com/blog/en/korea-student-work-permit-guide/',
  },

  // ─── KELGANDAN KEYIN — MOLIYA ───
  {
    id: 'bank-open',
    phase: 'after',
    category: 'finance',
    title: "Korean bank hisobi — ARC chiqqandan keyin oching",
    description: "ARC siz bank hisobi ochib bo'lmaydi. ARC chiqishi 3-4 hafta — shu muddatgacha naqd pul yetarli bo'lsin.",
    note: "Kakao Bank: app yuklab, ARC + passport bilan 10 daqiqada ochiladi — eng oson. IBK Industrial Bank: universitetga yaqin, talabalar uchun qulay. KEB Hana: xalqaro o'tkazmalar uchun yaxshi. Yillik to'lov yo'q — barchasi bepul.",
  },
  {
    id: 't-money',
    phase: 'after',
    category: 'finance',
    title: 'T-money transport karta — dastlab ₩50,000 yuklab oling',
    description: "Busan metro, avtobus va ba'zi taksilarda ishlatiladi. Kartasiz naqd pul bilan to'lash ₩100-200 qimmatroq.",
    note: "Istalgan편의점 (qulay do'kon) — GS25, CU, 7-Eleven — da ₩3,000 ga sotib oling. Telefon NFC orqali ham to'lash mumkin (Samsung Pay, Apple Pay).",
  },
  {
    id: 'nhis-insurance',
    phase: 'after',
    category: 'health',
    title: "NHIS sug'urtasi — ARC dan avtomatik boshlanadi",
    description: "2025 yildan oylik to'lov: ₩76,390. D-2 talabalar uchun 50% chegirma. Davolash xarajatlarining 80% qoplanadi.",
    note: "To'lovni kechiktirma — ₩500,000 qarzda viza uzaytirilmaydi. To'lov usullari: bank avtomatik o'tkazma, qulay do'kon, bank. Savol uchun: 1577-1000 → 7 raqamini bosing (o'zbek tili mavjud) yoki 033-811-2000.",
    sourceLabel: 'NHIS rasmiy sayti',
    sourceUrl: 'https://www.nhis.or.kr/english',
    sourceTel: '033-811-2000',
  },

  // ─── KELGANDAN KEYIN — SOG'LIQ ───
  {
    id: 'sim-card',
    phase: 'after',
    category: 'health',
    title: 'Korean SIM karta — passport bilan ham olish mumkin',
    description: 'SKT, KT, LG U+ operatorlari passport bilan ham prepaid SIM beradi. Shartnomali (postpaid) tarif uchun ARC kerak.',
    note: "Aeroportda SIM olmang — paketlar 2x qimmat. Busan shahridagi do'konlarda: SKT ₩33,000/oy (100GB). Dastlab prepaid SIM oling — ₩10,000 atrofida. ARC chiqqandan keyin arzon shartnomali tarifga o'ting.",
  },
  {
    id: 'busa',
    phase: 'after',
    category: 'documents',
    title: "BUSA Telegram guruhiga qo'shiling",
    description: "Busan o'zbek talabalari hamjamiyati. Savollar, yordam, tadbirlar va yangiliklar — barchasi bir joyda.",
    note: 'Telegram: t.me/busa_uz | Instagram: @busa_uz',
    sourceLabel: 'BUSA Telegram',
    sourceUrl: 'https://t.me/busa_uz',
  },
]

export default function GuideChecklistPage() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before')
  const [activeCategory, setActiveCategory] = useState<'all' | 'documents' | 'finance' | 'housing' | 'health'>('all')
  const [checked, setChecked] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem('busa-guide-v1')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleItem = (id: string) => {
    const next = checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id]
    setChecked(next)
    try {
      localStorage.setItem('busa-guide-v1', JSON.stringify(next))
    } catch {}
  }

  const filteredItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => {
      const tabMatch = item.phase === activeTab
      const categoryMatch = activeCategory === 'all' ? true : item.category === activeCategory
      return tabMatch && categoryMatch
    })
  }, [activeCategory, activeTab])

  const totalChecked = CHECKLIST_ITEMS.filter((item) => checked.includes(item.id)).length
  const totalItems = CHECKLIST_ITEMS.length
  const progressPercent = Math.round((totalChecked / totalItems) * 100)

  return (
    <>
      <main className="mx-auto max-w-7xl bg-white px-8 pb-20 pt-32 text-slate-900">
      <section className="mb-16">
        <h1 className="mb-6 max-w-3xl font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Yo&apos;riqnoma</h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-[#475569] md:text-xl">
          Koreyaga kelish jarayonida yangi talaba uchun kerak bo&apos;ladigan eng muhim qadamlar bir sahifada: safardan oldingi tayyorgarlik va
          kelgandan keyingi rasmiy ishlar.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="mx-auto max-w-md">
          <div className="mb-2 flex justify-between text-base font-medium text-slate-700">
            <span>Tayyorgarlik darajasi</span>
            <span>
              {totalChecked} / {totalItems} ta bajarildi
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-[#00236f] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </section>

      <div className="mb-8 flex items-start gap-3 rounded-[12px] border border-[#f59e0b]/20 bg-[#fff8f0] p-[16px]">
        <span className="mt-[2px] flex-shrink-0 text-xl text-[#d97706]">⚠</span>
        <p className="text-sm leading-7 text-[#92400e] md:text-base">
          Bu ma&apos;lumotlar 2025 yil holatiga ko&apos;ra tayyorlangan. Rasmiy talablar o&apos;zgarishi mumkin. Muhim qarorlar oldidan{' '}
          <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            hikorea.go.kr
          </a>{' '}
          yoki <span className="font-semibold">1345</span> {' '}raqamiga murojaat qiling (o&apos;zbek tilida xizmat mavjud).
        </p>
      </div>

      <div className="mx-auto mb-8 flex w-fit gap-[8px] justify-center">
        <button
          type="button"
          onClick={() => setActiveTab('before')}
          className={cn(
            'cursor-pointer rounded-full px-[24px] py-[10px] text-base font-medium',
            activeTab === 'before' ? 'bg-[#00236f] text-white' : 'bg-transparent text-[#00236f] border border-[#00236f]/25 hover:bg-[#00236f]/5'
          )}
        >
          Kelishdan oldin
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('after')}
          className={cn(
            'cursor-pointer rounded-full px-[24px] py-[10px] text-base font-medium',
            activeTab === 'after' ? 'bg-[#00236f] text-white' : 'bg-transparent text-[#00236f] border border-[#00236f]/25 hover:bg-[#00236f]/5'
          )}
        >
          Kelgandan keyin
        </button>
      </div>

      <div className="h-[1px] bg-[rgba(0,0,0,0.06)] my-[16px]" />

      <div className="mb-[8px] flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#86868b]">KATEGORIYA</span>
        <span className="text-[11px] text-[#86868b]">Yon tomonga suring &rarr;</span>
      </div>

      <div className="scrollbar-hide mb-8 overflow-x-auto whitespace-nowrap px-[4px] pl-[4px] py-1">
        <div className="flex space-x-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveCategory(filter.id)}
              className={cn(
                'cursor-pointer rounded-full px-5 py-2.5 text-base font-medium transition-colors',
                activeCategory === filter.id ? 'bg-[#00236f] text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <article key={item.id} onClick={() => toggleItem(item.id)} className="cursor-pointer flex items-start rounded-xl border border-slate-200 bg-white p-6">
            <div className="mr-5 mt-1 shrink-0">
              {checked.includes(item.id) ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#00236f] bg-[#00236f] text-white">
                  <HiCheck className="h-4 w-4" />
                </div>
              ) : (
                <div className="h-7 w-7 rounded-full border-2 border-slate-300" />
              )}
            </div>
            <div className="grow">
              <div className="mb-1 flex items-center">
                <h3 className={cn('text-xl font-semibold leading-relaxed', checked.includes(item.id) ? 'text-slate-400 line-through' : 'text-slate-900')}>{item.title}</h3>
                {item.important ? (
                  <span className="ml-3 inline-flex items-center rounded bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-700">
                    <HiExclamationTriangle className="mr-1 h-3 w-3" />
                    MUHIM
                  </span>
                ) : null}
              </div>
              <p className={cn('text-base leading-7', checked.includes(item.id) ? 'text-slate-400' : 'text-slate-700')}>{item.description}</p>
              {item.note ? (
                <div className="mt-4 rounded-lg border-l-4 border-[#00236f] bg-slate-50 p-4">
                  <p className="text-base italic leading-7 text-slate-700">{item.note}</p>
                </div>
              ) : null}
              {(item.sourceLabel || item.sourceTel) && (
                <div className="mt-[8px] flex items-center gap-[12px] flex-wrap">
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-[4px] text-sm text-[#00236f] underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      🔗 {item.sourceLabel}
                    </a>
                  )}
                  {item.sourceTel && (
                    <span className="text-sm text-[#6e6e73]">
                      📞 {item.sourceTel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      </main>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-[#00236f] text-white',
          'px-[32px] py-[16px]',
          'flex items-center justify-between',
          'shadow-[0_-8px_32px_rgba(0,35,111,0.2)]',
          'transition-transform duration-500',
          progressPercent === 100 ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <span className="text-lg font-semibold">🎉 Siz Koreya safariga tayyorsiz!</span>
        <a
          href="https://t.me/busa_uz"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-[20px] py-[8px] text-base font-medium text-[#00236f] transition-opacity hover:opacity-90"
        >
          BUSA ga qo&apos;shiling →
        </a>
      </div>
    </>
  )
}
