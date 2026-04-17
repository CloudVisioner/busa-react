import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Image from 'next/image'

interface GalleryItem {
  id: string
  title: string
  badge: string
  src: string
  alt: string
  year: string
  category: 'navruz' | 'trip' | 'book-club' | 'speaking-club' | 'cultural' | 'gala'
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'navruz-2024',
    title: "Bahoriy bayram shukuhi",
    badge: "Navro'z 2024",
    year: '2024',
    category: 'navruz',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYC0u4Ep-EgL5tMeMytP2hgoOPMJXCJCuwFwG-F8jU7jXQM-x4JKATIyV9dybEclUMYgq7JGx6zl1DHbfMAB00OL05ysUXMUP6yJfOwromVUh-hABvsKr7PIRyUCqP1tPZYpCjZh2vuoSYk3Pr2z6IPjY163uoqPNa2m40sEfJdqqX2KKfPkgMHS01KNUiCkHYhuUy1Ss4db9qtRRz60tfVeC5PvfF7OKqNunichgxMpVnUZYdXRVJHMRRB0jTvUfOuIL9x_XhH4U',
    alt: "Navro'z bayrami tadbirida talabalar guruhi"
  },
  {
    id: 'book-club',
    title: 'Kitobxonlar uchrashuvi',
    badge: 'Book Club',
    year: '2024',
    category: 'book-club',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXDwMrOrGjWoTY4vQJuyhHWCRp4pxzmZ67kyqbcUud62QyMbwkQjwsbGPCZMlwMqaTV5nsAl69KDe4oq7kwmPSfXdIKU-YKCb8hZW3zjhTQhcuhaekmm88VlNi_Z4sh2gLwQpJuoYwzS4cCGCHbMjp_dH2sEdQ0AfR0VQdbLME8xarDeP1yMbe7ff4fX0ibB09s3h3ZRSdUqVsBnh7aaSeTkz1sKWTSvNVxAaTTnW2kx2WXMad7e87iYUKkfQ7zDyqpdtxs9xkBPI',
    alt: "Talabalar bilan kitob klubi uchrashuvi"
  },
  {
    id: 'trip-haeundae',
    title: 'Haeundae sayohati',
    badge: 'Trip',
    year: '2023',
    category: 'trip',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABDSKt6h3zxaOM2WF3KyGXSw-bxwaQqvQ2owcbdVxVMUvi05yBEqMmlj1mUCBkCK-baqFpTL_BFOfi-ieFKwFaduNHfHECEHruyZkzRV1xpr1zrRz6gS3MZqvlEwHVsTZhdwKc6tAXAdhHdW6_WFVpF0opHMOKEQlTXR07UuKZCJiFwQ16gyfOv2x1L3j1YerNUwGsSw6db0HREe2b3PcleffY1a5Ms4-oCM_9kb5VIrOvSu8gd9F8pA4xMWpFIpXT94Jh_0b0DMY',
    alt: 'Busan Haeundae sohiliga piyoda sayohat qilayotgan talabalar'
  },
  {
    id: 'osh-championship',
    title: 'Osh chempionati',
    badge: 'Cultural Forum',
    year: '2023',
    category: 'cultural',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRZRMkkWRv-hj1NlwwOaXlwyYFqgi9SjGoYTiOTq1MMMWYFJTnufDhzbq2w7OAfnPiIOzn-a-VycBq1VUDDB3qPp8AYHhFWObVCWOVRVY6E4LI7ZNK48pNmYENN4_t1GMMQsg0lIvYDQtJUYafcKbT4nIGoNSf1kdWWWzbrO7lo9L74Bu66AUgI88EBwOoW_4aXpjmkfpzwv3KtORUpmXoser2Sk9WXLY9dcrXJhmG3F2FXyU2jQ0ms5kC6Z8AOMpVpEPenT50xY',
    alt: "Osh tayyorlash bo'yicha madaniy tadbir"
  },
  {
    id: 'gala-night',
    title: 'Yil yakuni tantanasi',
    badge: 'Gala Night',
    year: '2022',
    category: 'gala',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpfXaZIYTHTb4lqcEIZI1JaxhxdQeVGbA0jOOC9LpXLackvI1HztqCrPuiy_jdUR6ULNlzoyLwjeeNfhcMmlh4_dtQWq9i9iTWDRM__ciaP3oVJJK_SiuBOmHs434LwPFfeVNfk0F61j_USPqiPlPrfFX9LVpIwiYxnvPz0uzbXgmXqNKo9Rb-eUTKEfz2E8hSRv5MioK7Vq1vb21Y9MrjD888ZBPZLlquZ_z3I0m_N4S1v99DXucCJTZaubhcX_LiOEhzuhqzbMM',
    alt: 'Rasmiy gala kechasida talabalar'
  },
  {
    id: 'speaking-club',
    title: "Notiqlik san'ati",
    badge: 'Speaking Club',
    year: '2022',
    category: 'speaking-club',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkqfeKJrRXXHYbDZl8zC0G8UZdYn9t88RJSE0pbWWFQCwYTDCookY2clgNjur5ZkHdVen6l6_CZARizzxx8gqfbV7WM3lMTs8nsyhZkld_7SG_0CwyJEzmmljrHyO1WMMofJy-4mVOJ86IdMhRD8AEJABupMgcnUC0-Co45uthE4SCKjMnc2m6rEsDH4OKatKLZLCsQfJ7fqh8iNtlGIJbElsXiBEAod0dDwRGFFTsKsV3DRa7-qLauYV5wY-1aUarnNG6FxB_WF4',
    alt: 'Speaking club tadbirida nutq so‘zlayotgan talaba'
  }
]

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-8 pb-24 pt-32 font-body text-on-background">
        <header className="mb-20">
          <h1 className="mb-6 font-headline text-7xl font-bold leading-none tracking-tighter text-primary md:text-9xl">Galereya</h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-outline md:text-xl">
            BUSA ning barcha lahzalari. Talabalar hamjamiyati hayotidan eng yorqin kadrlar bir joyda jamlangan.
          </p>
        </header>

        <section className="mb-12 space-y-8 rounded-2xl bg-surface-container-low p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-4 text-xs font-label uppercase tracking-[0.24em] text-outline">Yillar</span>
            <button className="rounded-full bg-on-surface px-5 py-2 text-xs font-semibold uppercase tracking-wide text-surface transition-colors hover:bg-on-surface/90">
              Barchasi
            </button>
            <button className="rounded-full bg-surface-container px-5 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface hover:bg-surface-container-high">
              2025
            </button>
            <button className="rounded-full bg-surface-container px-5 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface hover:bg-surface-container-high">
              2024
            </button>
            <button className="rounded-full bg-surface-container px-5 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface hover:bg-surface-container-high">
              2023
            </button>
            <button className="rounded-full bg-surface-container px-5 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface hover:bg-surface-container-high">
              2022
            </button>
            <button className="rounded-full bg-surface-container px-5 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface hover:bg-surface-container-high">
              2021
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-outline-variant pt-6">
            <span className="mr-4 text-xs font-label uppercase tracking-[0.24em] text-outline">Tadbirlar</span>
            <button className="border-b-2 border-on-surface pb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface">
              Barchasi
            </button>
            <button className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-outline transition-colors hover:text-on-surface">
              Navro'z
            </button>
            <button className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-outline transition-colors hover:text-on-surface">
              Trips
            </button>
            <button className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-outline transition-colors hover:text-on-surface">
              Book Club
            </button>
            <button className="pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-outline transition-colors hover:text-on-surface">
              Speaking Club
            </button>
          </div>
        </section>

        <section className="bg-[#f5f5f7]">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
            {GALLERY_ITEMS.map((item) => (
              <article
                key={item.id}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl bg-surface-container-low shadow-sm ring-1 ring-outline-variant/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={900}
                    height={1200}
                    className="h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5">
                    <span className="mb-1 text-[10px] font-label font-semibold uppercase tracking-[0.18em] text-primary-fixed-dim">
                      {item.badge}
                    </span>
                    <h3 className="text-base font-headline font-semibold tracking-tight text-surface md:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button className="text-[#00236f] text-[17px] font-normal hover:underline underline-offset-4 transition duration-200">
              Ko&apos;proq yuklash
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
