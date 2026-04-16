import type { Project } from '@/lib/types/project'
import type { ProjectDetailContent, ProjectGalleryImage } from '@/lib/types/projectDetail'
import { PROJECTS } from '@/lib/constants/projects'

function projectBySlug(slug: string): Project {
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) {
    throw new Error(`Unknown project slug: ${slug}`)
  }
  return p
}

function galleryFromCover(project: Project): ProjectGalleryImage[] {
  const base = project.coverPhoto
  return [
    { src: base, alt: `${project.title} — 1`, label: 'BUSA', layout: 'hero' },
    { src: base, alt: `${project.title} — 2`, layout: 'wide' },
    { src: base, alt: `${project.title} — 3`, layout: 'tall' },
    { src: base, alt: `${project.title} — 4`, layout: 'tall' },
  ]
}

const BOOK_CLUB_DETAIL: ProjectDetailContent = {
  pageTitle: 'BUSA Book Club — The Intellectual Anchor',
  heroImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5VnqLOBm6G2qU8-eecLuIrUAvLtJO8AZA5GHz1SnuURpo-nihmVevQrxjbRCLnBle0OQYULFeazJZHLnUM6cNXkFsN1fqacIReh1DjnDriN00B7DQKIEPXWlhxZzRpk8lianHWcIxMZ-RHmIkMSXnBDGopii2XmRL7R-O7DOgbc3x55MrFwJ4FUXBLqdA3AMIjKXZDndUT08dQKx6U_vuq0h1DzBs34OMvyOV04xiOjeGRd3sSm6GlSb25ar9VR64O9sJN0A_MC4',
  heroEyebrow: 'Intellectual Series',
  heroDisplayTitle: 'Book Club',
  heroSubtitle:
    'A sanctuary for the mind. Where classical literature meets modern discourse in the heart of our community.',
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "BUSA Book Club shunchaki kitobxonlar davrasi emas. Bu — talabalarning tanqidiy fikrlashini shakllantirish, intellektual salohiyatini oshirish va mazmunli muloqot muhitini yaratishga qaratilgan fundamental loyihadir.",
    "Biz klassik asarlardan tortib, zamonaviy biznes-adabiyotlargacha bo'lgan keng qamrovli asarlarni tahlil qilamiz va har bir uchrashuvda yangi g'oyalarni kashf etamiz.",
  ],
  features: [
    {
      icon: 'menu_book',
      title: 'Haftalik mutolaa',
      description: "Har hafta bitta saralangan asar ustida chuqur tahliliy ishlash tizimi.",
      elevated: true,
    },
    {
      icon: 'forum',
      title: 'Jonli debatlar',
      description:
        "Asar qahramonlari va g'oyalari atrofida professional moderatorlar boshchiligidagi bahslar.",
      elevated: false,
    },
    {
      icon: 'psychology',
      title: 'Networking',
      description: 'Intellektual tengdoshlar va soha mutaxassislari bilan yaqindan tanishuv.',
      elevated: false,
    },
    {
      icon: 'award_star',
      title: 'Sertifikatlash',
      description: "Kurs yakunida faol ishtirokchilar uchun rasmiy BUSA diplomlari.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: "Ro'yxatdan o'tish",
      description:
        "Portal orqali klubga a'zo bo'ling va o'zingizga qulay bo'lgan vaqt zonasi va adabiyot yo'nalishini tanlang.",
    },
    {
      number: '02',
      title: 'Mustaqil mutolaa',
      description:
        "Har haftalik reja asosida kitobni o'qing va tahlil uchun o'zingizning qisqacha tezislaringizni tayyorlang.",
    },
    {
      number: '03',
      title: 'Kollektiv tahlil',
      description:
        "Offline yoki online formatdagi uchrashuvlarda ishtirok eting va o'z qarashlaringizni himoya qiling.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: "Klubimizning eng esda qolarli uchrashuvlari va samimiy muloqot lahzalari.",
  galleryImages: [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQPZGC2uKtrOB_K7VL9rACgckkIdYnDo5mHECldJQc59u3H3Pp_mgjnklClkuiSndHTKgZh7M-zI-GK3m16oacOwNGEyKMlkQIyoTUAcBWx3KzctAp7ntv-vfj9yC-r8dVkQB1mRlkGlRChbyS7yJqNZC8aSqdCq9GxNCqTZBFyS0KZb2imgEPwO7qhyEp4g6mq3FjbgiqHJt_iDsNgDu-yS-LZ1Uiak2tcWZT4BrtoU6twTt-0yA8qduD9N7kBqP8rCWW_VBOrxM',
      alt: 'Talabalar zamonaviy zalda muhokama',
      label: 'Kuzgi sessiya, 2023',
      layout: 'hero',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqJO3gXjmfY1kPF2i9_iSPoxGD5tHtIz2X0d4IGqlnbeOjjo5LpZHEz9u6ZywcRBthXsSxhtTSgJr5FFAxBHDSMhaW2kSCGfA2kqDM5CxP7SYEmLCP6POVfeltLlShaPIJR--MIru0HEDAusJgfKwld3FQhZE0lz2p2cXkQYbv7A7EFkosCt1iKfV3rSwNLZlvYhaIEeX2nL2JHCsevg-f7twSBY9X2KazrIr9ZwQd41AzbZ1dMjVJg9GLYHT2tOiHSbKxRYL1XHU',
      alt: 'Kitoblar va ko‘zoynaklar',
      layout: 'wide',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBty4fjVb8QvaznxpvvIzRmtYL3kxUdBAHJC_2SIercUwa03b-nNjcs4LPUi7UCXtGA8-7nnECZxhCanm3VAGkE7poadJL0wHjK2vZ3jJBaLXQRojQElFPsrbcgcVjJGD7s4x9MxuAyZPq8rAR-GjvQVS5ZJWHuYf39Pe0d5Qwh5N6ScN5J8V9KAbcCjkkdFkYJoOGRhfCwxysc5bSVZZYCkjWP5UxzWgr-Pxw6N29L88A0KSjnUf6bqFVJhyvZFwPj0ABMZPUEz4',
      alt: 'Talabalar kitob bilan',
      layout: 'tall',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWWxSzoTxEmSuyyLM6NYP9GG3SguATwH8W3jUD43bHLHD7oMUyxwaII4Ji2wUbo2eoBO-lOT9-tsM0Nt-2qmntt9IzDr0_iS-0_0-FeJVj8ZOoUjxYa5UwEvdSp1mM9zu4fGuJQGw06_g23WaOOPvBo9750i6vOHM6U8pdks7B6GXnn0aUjAUwPHBrj6-yzWXnG7zKt1xCj9rAH_KpHd66tEe9XLvj-AA0L8BYrL6iCRnAeitTuXUp1yYxNtjOPo2A3xMlI5yleXE',
      alt: 'Spiker va auditoriya',
      layout: 'tall',
    },
  ],
  ctaTitle: 'Sizning fikringiz biz uchun muhim',
  ctaSubtitle:
    "Klubning yangi mavsumiga a'zo bo'ling va intellektual sayohatimizning bir qismiga aylaning.",
  ctaPrimaryLabel: "A'zo bo'lish",
  ctaSecondaryLabel: 'Nizom bilan tanishish',
}

const sayohat = projectBySlug('sayohat-trip')
const SAYOHAT_DETAIL: ProjectDetailContent = {
  pageTitle: 'Sayohat (Trip) | BUSA',
  heroImage: sayohat.coverPhoto,
  heroEyebrow: 'Jamiyat sayohatlari',
  heroDisplayTitle: 'Sayohat (Trip)',
  heroSubtitle:
    "Koreyaning tarixiy va tabiiy go'zalliklarini birgalikda kashf eting — xavfsiz reja, do'stona jamoa.",
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "Sayohat loyihasi talabalarni Koreyaning mashhur va kamraba maskanlariga tashkil etilgan guruh sayohatlari bilan bog'laydi. Bu — yangi joylarni birga ko'rish, yo'l-yo'riq va tajriba almashish uchun qulay muhit.",
    "Har bir chiqish oldindan rejalashtiriladi: transport, marshrut, vaqt jadvali va xavfsizlik masalalari shaffof muhokama qilinadi; ishtirokchilar esa foto, video va xotiralar bilan uylariga boyroq qaytadilar.",
  ],
  features: [
    {
      icon: 'map',
      title: 'Tashkillashtirilgan marshrut',
      description: "Kun tartibi, ko'rish nuqtalari va tanaffuslar oldindan e'lon qilinadi.",
      elevated: true,
    },
    {
      icon: 'shield',
      title: 'Xavfsizlik va yo‘riqnomalar',
      description: "Guruh bilan harakat, aloqa kanallari va favqulodda vaziyatlar bo'yicha qisqa qoidalar.",
      elevated: false,
    },
    {
      icon: 'photo_camera',
      title: 'Foto va xotiralar',
      description: "Umumiy albom va ijtimoiy tarmoqlar uchun rasmiy lavhalar — ishtirokchilar bilan bo'lishiladi.",
      elevated: false,
    },
    {
      icon: 'groups',
      title: 'Jamoa va networking',
      description: "Yangi do'stlar, birga ovqatlanish va suhbatlar — sayohatdan keyin ham davom etadigan aloqalar.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: 'Elon va ro‘yxat',
      description:
        "Telegram va saytda sanalar e'lon qilinadi; cheklangan o'rinlar uchun oldindan ro'yxatdan o'tiladi.",
    },
    {
      number: '02',
      title: 'To‘lov va tasdiq',
      description: "Narxlarni aniqlash, to'lov usuli va chiqishdan oldin yakuniy tasdiqlash.",
    },
    {
      number: '03',
      title: 'Chiqish va fikr-mulohaza',
      description: "Sayohatdan keyin qisqa so'rov va keyingi marshrutlar bo'yicha takliflar to'planadi.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: "So'nggi sayohatlardan lavhalar.",
  galleryImages: galleryFromCover(sayohat),
  ctaTitle: 'Keyingi sayohatga qo‘shiling',
  ctaSubtitle: "Ro'yxatdan o'ting va yangi marshrutlar haqida birinchi bo'lib xabar toping.",
  ctaPrimaryLabel: "Ro'yxatdan o'tish",
  ctaSecondaryLabel: 'Savol berish',
}

const speaking = projectBySlug('speaking-class')
const SPEAKING_DETAIL: ProjectDetailContent = {
  pageTitle: 'Speaking Class | BUSA',
  heroImage: speaking.coverPhoto,
  heroEyebrow: 'Til amaliyoti',
  heroDisplayTitle: 'Speaking Class',
  heroSubtitle:
    "Ingliz va Koreys tillarida erkin gapirish — kichik guruhlarda mashq, jonli muhokama va mentor qo'llab-quvvatlashi.",
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "Speaking Class — grammatikadan ko'ra, og'zaki nutq va tinglashni rivojlantirishga qaratilgan amaliy darslar seriyasi. Mavzular kundalik hayot, universitet va ish muhitiga yaqin tanlanadi.",
    "Har bir sessiyada qisqa mini-leksiya, juftlik va guruh mashqlari, keyin esa erkin muloqot bloki bo'ladi. Xatolarni tuzatish qoidalarga bosiq, muloqotga yo'naltirilgan tarzda amalga oshiriladi.",
  ],
  features: [
    {
      icon: 'record_voice_over',
      title: 'Haftalik amaliyot',
      description: "Muntazam jadval: mavzu, leksika va rolli o'yinlar bilan mustahkam mashq.",
      elevated: true,
    },
    {
      icon: 'group',
      title: 'Kichik guruhlar',
      description: "Har bir ishtirokchi gapirish vaqtiga ega bo'lishi uchun guruh hajmi cheklanadi.",
      elevated: false,
    },
    {
      icon: 'translate',
      title: 'Ingliz va Koreys',
      description: "Alohida yoki aralash guruhlar — darajangizga mos ro'yxatdan o'tish.",
      elevated: false,
    },
    {
      icon: 'support_agent',
      title: 'Moderator va feedback',
      description: "Har dars oxirida qisqa tahlil: nima yaxshi chiqdi va keyingi safar nima ustida ishlash kerak.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: 'Darajani aniqlash',
      description: "Qisqa suhbat yoki mini-test orqali guruhga joylashtirish.",
    },
    {
      number: '02',
      title: 'Dars formati',
      description: "Haftada 1–2 marta, 60–90 daqiqa: mashq + erkin nutq.",
    },
    {
      number: '03',
      title: 'Uy vazifasi',
      description: "Qisqa audio yoki yozma topshiriqlar — keyingi darsga tayyorgarlik.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: 'Dars va muloqotdan lavhalar.',
  galleryImages: galleryFromCover(speaking),
  ctaTitle: 'Gapirishni mashq qiling',
  ctaSubtitle: "Ro'yxatdan o'ting va sizga mos guruhni tanlang.",
  ctaPrimaryLabel: "Ro'yxatdan o'tish",
  ctaSecondaryLabel: 'Jadvalni ko‘rish',
}

const korean = projectBySlug('korean-club')
const KOREAN_DETAIL: ProjectDetailContent = {
  pageTitle: 'Korean Club | BUSA',
  heroImage: korean.coverPhoto,
  heroEyebrow: 'Madaniyat va til',
  heroDisplayTitle: 'Korean Club',
  heroSubtitle:
    "Koreya madaniyati, urf-odatlari va zamonaviy hayotini chuqurroq tushunish uchun maxsus to'garak.",
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "Korean Club — faqat til emas: tarix, san'at, oshxona madaniyati, bayramlar va kundalik etiket haqida suhbatlar. Talabalar o'z tajribalari va savollari bilan faol ishtirok etadi.",
    "Uchrashuvlar oylik tematik bloklar bilan o'tadi: masalan, K-drama va ijtimoiy masalalar, an'anaviy san'at yoki zamonaviy Koreya shaharlari. Maqsad — madaniy kompetensiya va o'zaro hurmatni oshirish.",
  ],
  features: [
    {
      icon: 'temple_buddhist',
      title: 'Madaniyat darslari',
      description: "Qisqa ma'ruzalar, multimedia va muhokama — har safar yangi mavzu.",
      elevated: true,
    },
    {
      icon: 'restaurant',
      title: 'Etiket va kundalik hayot',
      description: "Oshxona, salomlashish, universitet va ish muhitidagi kichik lekin muhim qoidalar.",
      elevated: false,
    },
    {
      icon: 'celebration',
      title: 'Tadbirlar va bayramlar',
      description: "Chuseok, Seollal yoki klub ichidagi tematik kechalar — birgalikda tayyorlash va nishonlash.",
      elevated: false,
    },
    {
      icon: 'menu_book',
      title: 'A’zo jamoasi',
      description: "Tavsiyalar, film va kitob ro'yxatlari, guruh chatlarida doimiy aloqa.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: "To'garakka qo'shilish",
      description: "Telegram orqali e'lonlar va ro'yxatdan o'tish.",
    },
    {
      number: '02',
      title: 'Tematik sessiyalar',
      description: "Har oy yangi yo'nalish: til bo'limi + madaniyat bo'limi.",
    },
    {
      number: '03',
      title: 'Loyiha va tadbirlar',
      description: "Kichik loyiha (masalan, taqdimot) yoki birgalikda tadbir tashkil etish.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: 'Klub uchrashuvlari va tadbirlardan lavhalar.',
  galleryImages: galleryFromCover(korean),
  ctaTitle: 'Madaniyat sayohatiga qo‘shiling',
  ctaSubtitle: "Korean Club a'zosi bo'ling va keyingi mavzularni birgalikda tanlang.",
  ctaPrimaryLabel: "A'zo bo'lish",
  ctaSecondaryLabel: 'Mavzular',
}

const academy = projectBySlug('busa-academy')
const ACADEMY_DETAIL: ProjectDetailContent = {
  pageTitle: 'BUSA Academy | BUSA',
  heroImage: academy.coverPhoto,
  heroEyebrow: 'Professional rivojlanish',
  heroDisplayTitle: 'BUSA Academy',
  heroSubtitle:
    "Soft skills, prezentatsiya, vaqt boshqaruvi va shaxsiy brend — talaba va bitiruvchilar uchun amaliy bloklar.",
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "BUSA Academy — qisqa modullar, workshoplar va mehmon spikerlar orqali professional ko'nikmalarni rivojlantirish platformasi. Nazariya bilan cheklanmaymiz: har modulda vazifa, namuna va jamoaviy tahlil bo'ladi.",
    "Mavzular talab va so'rov bo'yicha yangilanadi: masalan, rezyume va suhbat, loyiha boshqaruvi asoslari, ijtimoiy tarmoqlarda professional ko'rinish. Maqsad — Koreyadagi o'qish va keyingi ish qidirishda mustahkam tayanch.",
  ],
  features: [
    {
      icon: 'psychology',
      title: 'Soft skills',
      description: "Muloqot, jamoa ishi, konfliktlarni boshqarish va o'zini ifodalash.",
      elevated: true,
    },
    {
      icon: 'school',
      title: 'Mahorat darslari',
      description: "Prezentatsiya, vaqt boshqaruvi, yozma va og'zaki nutq — amaliy mashqlar bilan.",
      elevated: false,
    },
    {
      icon: 'person_search',
      title: 'Mentorlar va mehmonlar',
      description: "Soha mutaxassislari bilan sessiyalar: savol-javob va real misollar.",
      elevated: false,
    },
    {
      icon: 'verified',
      title: 'Sertifikat va portfolio',
      description: "Modulni tugatganlar uchun BUSA tasdig'i va tavsiya qilinadigan portfolio elementlari.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: 'Modul tanlash',
      description: "E'lon qilingan modullardan birini yoki ketma-ket bir nechtasini tanlang.",
    },
    {
      number: '02',
      title: 'Workshop va vazifalar',
      description: "Jonli yoki yozma formatda mashqlar; mentorlar feedback beradi.",
    },
    {
      number: '03',
      title: 'Yakun va sertifikat',
      description: "Modul talablarini bajargan ishtirokchilar uchun rasmiy tasdiq.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: 'Darslar va workshoplardan lavhalar.',
  galleryImages: galleryFromCover(academy),
  ctaTitle: 'Keyingi modulga yoziling',
  ctaSubtitle: "Ro'yxatdan o'ting va yangi e'lonlardan xabardor bo'ling.",
  ctaPrimaryLabel: "Ro'yxatdan o'tish",
  ctaSecondaryLabel: 'Modullar',
}

const tech = projectBySlug('tech-talk')
const TECH_DETAIL: ProjectDetailContent = {
  pageTitle: 'Tech Talk | BUSA',
  heroImage: tech.coverPhoto,
  heroEyebrow: 'IT va innovatsiya',
  heroDisplayTitle: 'Tech Talk',
  heroSubtitle:
    "Dasturlash, sun'iy intellekt, kiberxavfsizlik va startaplar — soha mutaxassislari bilan ochiq suhbatlar.",
  aboutTitle: "Nima u o'zi?",
  aboutParagraphs: [
    "Tech Talk — texnologiya bilan qiziqadigan talabalar uchun muntazam uchrashuvlar. Har bir sessiyada bitta asosiy mavzu: qisqa kirish, spiker taqdimoti va erkin savollar.",
    "Biz eng so'nggi trendlar bilan cheklanmaymiz: karyera yo'llari, o'qishdan keyingi imkoniyatlar va amaliy maslahatlar ham muhokama qilinadi. Maqsad — bilim almashish va professional tarmoqni kengaytirish.",
  ],
  features: [
    {
      icon: 'terminal',
      title: 'Soha ekspertlari',
      description: "Tajribali dasturchilar, mahsulot menejerlari va tadqiqotchilar bilan suhbat.",
      elevated: true,
    },
    {
      icon: 'trending_up',
      title: 'Dolzarb mavzular',
      description: "AI, bulut, mobil, ma'lumotlar va Koreya texnologiya muhiti.",
      elevated: false,
    },
    {
      icon: 'hub',
      title: 'Networking',
      description: "Sessiyadan keyin qisqa tanishuv: loyiha, staj va hamkorlik takliflari.",
      elevated: false,
    },
    {
      icon: 'video_library',
      title: 'Materiallar',
      description: "Ayrim uchrashuvlar yozib olinadi; slaydlar va havolalar jamoat bilan ulashiladi.",
      elevated: true,
    },
  ],
  processTitle: 'Qanday amalga oshiriladi?',
  processSteps: [
    {
      number: '01',
      title: 'E’lon va ro‘yxat',
      description: "Mavzu, spiker va format (online/offline) oldindan e'lon qilinadi.",
    },
    {
      number: '02',
      title: 'Taqdimot va savollar',
      description: "40–60 daqiqa asosiy qism, keyin ochiq savol-javob.",
    },
    {
      number: '03',
      title: 'Davom etish',
      description: "Telegram guruhida muhokuma va keyingi uchrashuvlar bo'yicha ovoz berish.",
    },
  ],
  galleryTitle: 'Galereya',
  gallerySubtitle: 'Tech Talk uchrashuvlaridan lavhalar.',
  galleryImages: galleryFromCover(tech),
  ctaTitle: 'Keyingi sessiyaga qo‘shiling',
  ctaSubtitle: "Ro'yxatdan o'ting va mavzularni taklif qiling.",
  ctaPrimaryLabel: "Ro'yxatdan o'tish",
  ctaSecondaryLabel: 'Mavzular',
}

const DETAIL_BY_SLUG: Record<string, ProjectDetailContent> = {
  'book-club': BOOK_CLUB_DETAIL,
  'sayohat-trip': SAYOHAT_DETAIL,
  'speaking-class': SPEAKING_DETAIL,
  'korean-club': KOREAN_DETAIL,
  'busa-academy': ACADEMY_DETAIL,
  'tech-talk': TECH_DETAIL,
}

export function buildDefaultProjectDetail(project: Project): ProjectDetailContent {
  return {
    pageTitle: `${project.title} | BUSA`,
    heroImage: project.coverPhoto,
    heroEyebrow: project.category,
    heroDisplayTitle: project.title,
    heroSubtitle: project.summary,
    aboutTitle: "Nima u o'zi?",
    aboutParagraphs: [project.description],
    features: [
      {
        icon: 'groups',
        title: 'Jamoa va tarmoq',
        description: "Talabalar va mentorlar bilan doimiy aloqa, guruh chatlari va yo'riqnomalar.",
        elevated: true,
      },
      {
        icon: 'event',
        title: 'Muntazam uchrashuvlar',
        description: 'Haftalik yoki oylik rejada tashkil etiladigan amaliyot va uchrashuvlar.',
        elevated: false,
      },
      {
        icon: 'lightbulb',
        title: "Rivojlanish va tajriba",
        description: "Yangi ko'nikmalar, workshoplar va real loyiha ustida ishlash imkoniyati.",
        elevated: false,
      },
      {
        icon: 'verified',
        title: 'Rasmiy qo‘llab-quvvatlash',
        description: "BUSA tomonidan tasdiqlangan sertifikat va tavsiyanomalar (loyihaga qarab).",
        elevated: true,
      },
    ],
    processTitle: 'Qanday amalga oshiriladi?',
    processSteps: [
      {
        number: '01',
        title: "Ro'yxatdan o'tish",
        description:
          "Telegram yoki sayt orqali loyiha rahbariga murojaat qiling va qisqa anketani to'ldiring.",
      },
      {
        number: '02',
        title: 'Tanishuv va reja',
        description: "Birinchi uchrashuvda maqsadlar, jadval va ishtirok shartlari aniqlanadi.",
      },
      {
        number: '03',
        title: 'Faol ishtirok',
        description: "Doimiy uchrashuvlarda ishtirok eting, vazifalarni bajaring va jamoaga qo'shiling.",
      },
    ],
    galleryTitle: 'Galereya',
    gallerySubtitle: 'Loyiha doirasidagi uchrashuvlar va tadbirlar dan foto lavhalar.',
    galleryImages: galleryFromCover(project),
    ctaTitle: 'Loyihamizga qo‘shiling',
    ctaSubtitle: "O'zingizni rivojlantiring va BUSA jamoasining faol a'zosiga aylaning.",
    ctaPrimaryLabel: "A'zo bo'lish",
    ctaSecondaryLabel: 'Nizom bilan tanishish',
  }
}

export function getResolvedProjectDetail(project: Project): ProjectDetailContent {
  const custom = DETAIL_BY_SLUG[project.slug]
  if (custom) {
    return custom
  }
  return buildDefaultProjectDetail(project)
}

export function getProjectDetailContent(slug: string): ProjectDetailContent | undefined {
  return DETAIL_BY_SLUG[slug]
}
