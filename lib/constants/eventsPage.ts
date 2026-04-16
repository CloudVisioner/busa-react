export interface UpcomingEvent {
  badge: string
  badgeClassName: string
  title: string
  date: string
  location: string
  image: string
  alt: string
}

export interface ArchiveEvent {
  category: string
  date: string
  title: string
  image: string
  alt: string
}

export const FEATURED_EVENT = {
  badge: 'KELGUSI TADBIR',
  title: "Navro'z 2025",
  date: '21 Mart 2025',
  location: 'Busan PNUK',
  description: "BUSA ning barcha o'tgan va kelgusi tadbirlari - talabalar hamjamiyati hayotining digital arxivi.",
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAM1Im5y_2GgxIVSKlAQfBN5j9-4gxIpPEJ2vtdd1lD2Xna17zzi1KcXfeB2_Ice0aDViqG3UyPcM_IuFp0TEsUAB0aoY9VhmHwGr3PoyxHlNqNUcaPRiju74csfDrocn326b1MxjZRsZYCPfNogIT_aCaTXX7aoKa1gVQfYOp8pZ33kJ4fWAvi8iPdZqDEOhOFYUnT-iRgBcNQD1se1y6dENqdh1-wP3WeiniZUC1eSoMtjUZLfF28RhFMFOnw8v-8AMjuSpDr0yA',
  alt: "Navro'z festival",
} as const

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    badge: 'TRIP',
    badgeClassName: 'bg-secondary-container text-on-secondary-container',
    title: 'Summer Trip 2025',
    date: 'Iyun 2025',
    location: 'Geoje & Busan Coast',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8XAK0oXNaYQ8em-mnVgXLSQzc7IyVg5AD1TiXh0rAzSZNONA9WmRW699FBmuU2yusOFrePREma5FfQu9qAM5U07Vmg0PJszLtPWjum5J6_nug06y8Sx3PdjUYjlUPYgNh6q4EjEMYHcoT5jzE_MxqeM7r1FzlySSvKyuKekkAr1VdmdmaibYB7DCT_eZM7Oy7si7i2W7ivddAv1tNJQQy1C_Riuj9SV6wm_FL5lLoja6-uDrNykHWy9FHrvH4-dzl93hnuCtGZh8',
    alt: 'Summer Trip 2025 sayohat manzarasi',
  },
  {
    badge: 'EDUCATION',
    badgeClassName: 'bg-[#ffdbcb] text-[#773205]',
    title: 'Study Night: Finals',
    date: 'Aprel 2025',
    location: 'PNUK Study Hall',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCZPjLThJGBVE71wL6Hp2LUCduo3aFxdubxKhq30N_TOg5cKrSKXjJFmep9SJpA-qN4iDDRVvWqUPX4W1ggNOSfynPevZFM_OBldJGWt4zRpxK9wB4pNDaKzia5Hx7Lt0kdgAjdKmuufeZW6arVFiwyoUOWAMCWjf9DG9XaLP8Kv0aO6Ugz6tn654RVV79VV1SK7kY-toEEK15t1RuEz53T68zlCep3FTVDxYMOg7cL1DGWgTAEXXLQ0OFefily9tyD1mb7rCIaaM',
    alt: 'Study Night: Finals dars muhitidan lavha',
  },
]

export const BASE_ARCHIVE_EVENTS: ArchiveEvent[] = [
  {
    category: 'Madaniy',
    date: '28 Dek 2024',
    title: 'BUSA New Year Gala',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEOS-0Wy_DCZQ_dCEYA07aJ1f3dPaV-0X4UdHjTrGWOtc2eOgNvA2LLwcw52j9gvc6yJQzkkiRs1ymsWnY_GCb1m-hSoIvFeqe_kdXgkJxKIhsAZiLR5ngJmXD9O_Due_WEquDXkhg-G2zPN0NhNatZrrVLy2inINPk8mzMcRmQV6LrIYWeHJxE-H21ZXBE6oKgsqMD7GDiQPAvXwNMcZ_YfWSkLR3JVMVcIDhzpthuh0h_wSsMKTM_8hOoqBGuuTrQkuonF-hvao',
    alt: 'BUSA New Year Gala tadbiridan lavha',
  },
  {
    category: 'Trip',
    date: '15 Avg 2024',
    title: 'Jeju Island Expedition',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8XAK0oXNaYQ8em-mnVgXLSQzc7IyVg5AD1TiXh0rAzSZNONA9WmRW699FBmuU2yusOFrePREma5FfQu9qAM5U07Vmg0PJszLtPWjum5J6_nug06y8Sx3PdjUYjlUPYgNh6q4EjEMYHcoT5jzE_MxqeM7r1FzlySSvKyuKekkAr1VdmdmaibYB7DCT_eZM7Oy7si7i2W7ivddAv1tNJQQy1C_Riuj9SV6wm_FL5lLoja6-uDrNykHWy9FHrvH4-dzl93hnuCtGZh8',
    alt: 'Jeju Island sayohatidan lavha',
  },
  {
    category: 'Sport',
    date: '12 May 2024',
    title: 'Mini-Football Cup 2024',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3NxSNNT8e7gUcvpL7qxX4lKDQT5J9viEf4nRQ4a-UAcrAbPqjXGLxKpbgxJCP3uy2EgQT4IdN0Ykbddd_IJnfAIW_KI_LC0aTmBlB3oNa1c92rEuSLazwnEf3R7ROJSr83EctPyXOaBjw2lqq37UOQ73gP4kldqAJZICSD7s3mHuPYZM8ePpTQelBejwvZHN5UqDoqHkGF5MaWCcW5B48L4op8giCbIRTMYa8C3GFzsvDfoGYl7CdHFWk_lmZ8-Wm51k9km3U1GY',
    alt: "Mini football cup o'yinidan lavha",
  },
  {
    category: 'Madaniy',
    date: '03 Mar 2024',
    title: "Navro'z Celebration",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKt-7ap2eUC2ncjdX9Uuj1m-odqQONi31i9zJY3O8xntQoiInuQaEoZcZpQh5dlj_20_fy9Ryn9VJM0CYLzELP2_PeHn5kCnqZdd-pvljqYKE5jMeknSvmUb_3eUl-fsJkwrA8iLM0urJ3ZdeOlDHmm3ly0kLTznWJZZbafa89zlONfLIxdxeoeUSDx9WAO8pX9-r5zDRX7lAW5tca3JTtfqtofaK5shZv7xpMqfcAPagiHayy15fNmHTfm5bM8yMEzdrubjJ9Y6Q',
    alt: "Navro'z bayramidan dasturxon lavhasi",
  },
  {
    category: 'Workshop',
    date: '18 Yan 2024',
    title: 'CV & Interview Workshop',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCZPjLThJGBVE71wL6Hp2LUCduo3aFxdubxKhq30N_TOg5cKrSKXjJFmep9SJpA-qN4iDDRVvWqUPX4W1ggNOSfynPevZFM_OBldJGWt4zRpxK9wB4pNDaKzia5Hx7Lt0kdgAjdKmuufeZW6arVFiwyoUOWAMCWjf9DG9XaLP8Kv0aO6Ugz6tn654RVV79VV1SK7kY-toEEK15t1RuEz53T68zlCep3FTVDxYMOg7cL1DGWgTAEXXLQ0OFefily9tyD1mb7rCIaaM',
    alt: 'CV va suhbat workshopidan lavha',
  },
  {
    category: 'Madaniy',
    date: '30 Noy 2023',
    title: 'BUSA Winter Gala 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyzrvoIrs5q5m5Hwu4_R7D5TCbZLhRAayisxJnlT2TSIOHt81LbP_S2CE5fxpnE5OGmyL5XIyS2UT6NjuXu35HoQtyJPdAaFHbEIWA3tl1e7OFqHnhi7Xagjby6p02SwMimL1rEkcP2QVynkRXbAimqZg2lPWOufbRxuOCPdOV9tlv3JDv2isM7VJjdhyWpIJ_9wHz2gaa7Of5GVQp95JdfoIuiCYg5XI3EefRmUC_FNTgOxXP__IuvzUIlVi7gz7KPEcTFaQce_I',
    alt: 'BUSA Winter Gala 2023 tadbiridan lavha',
  },
]

export const EVENTS_TOTAL_COUNT = 87
export const EVENTS_PER_PAGE = 9

export function getYearFromDate(dateText: string): '2024' | '2023' {
  return dateText.includes('2023') ? '2023' : '2024'
}

export function buildArchivePool(total: number): ArchiveEvent[] {
  const result: ArchiveEvent[] = []
  for (let i = 0; i < total; i += 1) {
    result.push(BASE_ARCHIVE_EVENTS[i % BASE_ARCHIVE_EVENTS.length])
  }
  return result
}
