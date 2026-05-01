import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { FiCalendar, FiMapPin, FiStar, FiUsers } from 'react-icons/fi'
import { queryApollo } from '@/lib/apollo/client'
import { GET_EVENT } from '@/lib/apollo/queries'
import { ROUTES } from '@/lib/constants/routes'

export const dynamic = 'force-dynamic'

const FALLBACK_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAXt2abFkFh6yEwy_3ey2qEUQCv9amOCHWZY8me8Y5SM74QrfuQefp3mKTURYRh0d0UapnfrQdEeWLrxkGmk6X5iMEf8BIvpCc7KstV11jwVjCwcTpVVZNg2UpprF0L-GoIbNJAqIamermAf50BwXe7L9K90iSE8SZUAHU_5HfzLgj2tJvAwSu5d0vkRd_aQvR3IUd1H2JKS5xciMugYmaHA-zFAokR8QClk5jPbRmwMGfAZ8FYkSQvInuaGy01ikJepfpxI3YDvNU'

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function resolveEvent(slug: string) {
  try {
    const data = await queryApollo<{ event: { title: string; date: string; location: string; attendance?: string; type: string; description: string; coverPhoto?: string; photos?: string[] } | null }>({
      query: GET_EVENT,
      variables: { slug },
      admin: true,
      fetchPolicy: 'network-only',
    })
    if (data?.event) return data.event
  } catch (error) {
    console.error('Failed to load event detail:', error)
  }
  return null
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await resolveEvent(slug)
  return {
    title: `${event?.title ?? slugToTitle(slug)} | BUSA Events`,
    description: event?.description ?? 'BUSA event details',
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const event = await resolveEvent(slug)
  const title = event?.title ?? slugToTitle(slug)
  const heroImage = event?.coverPhoto ?? FALLBACK_IMAGE
  const date = event?.date
    ? new Date(event.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '-'
  const location = event?.location ?? '-'
  const attendance = event?.attendance ?? 'N/A'
  const eventType = event?.type ?? 'EVENT'
  const galleryPhotos = (event?.photos ?? []).filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f9fb] font-body text-[#191c1e]">
        <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-[#00236f]">
          <Image src={heroImage} alt={title} fill priority sizes="100vw" className="object-contain bg-[#0f172a] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00236f] via-[#00236f]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-8 pb-16">
            <h1 className="font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:text-8xl">{title}</h1>
          </div>
        </section>

        <section className="border-b border-[#c5c5d3]/20 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-8 py-8 md:grid-cols-4">
            <EventInfo label="Date & Time" value={date} icon={FiCalendar} />
            <EventInfo label="Location" value={location} icon={FiMapPin} />
            <EventInfo label="Attendance" value={attendance} icon={FiUsers} />
            <EventInfo label="Event Type" value={eventType} icon={FiStar} />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-20 lg:grid-cols-12">
          <article className="min-w-0 space-y-6 text-lg font-light leading-relaxed text-slate-600 lg:col-span-7">
            {event?.description ? (
              <div
                className="prose prose-slate max-w-none break-words prose-p:leading-relaxed [overflow-wrap:anywhere]"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            ) : (
              <p>
                Event details are being prepared. Please check updates and registration
                information on BUSA&apos;s events page.
              </p>
            )}
            {galleryPhotos.length > 0 ? (
              <section className="mt-8">
                <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight text-[#00236f]">Event Photos</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryPhotos.map((photo, index) => (
                    <div
                      key={`${photo}-${index}`}
                      className={`relative overflow-hidden rounded-xl border border-black/10 bg-[#f8f9fc] ${
                        index % 5 === 0 ? 'h-56 sm:col-span-2' : index % 5 === 1 ? 'h-40' : index % 5 === 2 ? 'h-48' : index % 5 === 3 ? 'h-64' : 'h-44'
                      }`}
                    >
                      <Image
                        src={photo}
                        alt={`${title} photo ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[20px] border border-[#c5c5d3]/40 bg-white p-[32px] text-[#1d1d1f] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <h3 className="mb-4 font-headline text-2xl font-semibold text-[#1d1d1f]">Registration Open</h3>
              <p className="mb-6 font-light text-[#444651]">Secure your place at the most anticipated event of the academic calendar.</p>
              <Button
                href={ROUTES.EVENTS}
                variant="ghost"
                className="w-full rounded-full bg-[#dc2626] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#b91c1c]"
              >
                Book Your Ticket
              </Button>
            </div>
          </aside>
        </section>

      </main>
      <Footer />
    </>
  )
}

function EventInfo({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500">
        <Icon className="h-3.5 w-3.5 text-slate-500" />
        {label}
      </span>
      <span className="font-headline font-semibold text-[#00236f]">{value}</span>
    </div>
  )
}
