import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { FiCalendar, FiMapPin, FiStar, FiUsers } from 'react-icons/fi'
import { ROUTES } from '@/lib/constants/routes'

const EVENT_DETAILS = {
  'navroz-2025': {
    title: "Navro'z 2025",
    subtitle:
      "A celebration of renewal, cultural heritage, and academic unity. Join the BUSA community for our flagship spring equinox festival.",
    badge: 'Academic Azure - Annual Tradition',
    date: '21 March, 2025',
    location: 'Grand Assembly Hall',
    attendance: '1,200+ Members',
    type: 'Cultural Gala',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXt2abFkFh6yEwy_3ey2qEUQCv9amOCHWZY8me8Y5SM74QrfuQefp3mKTURYRh0d0UapnfrQdEeWLrxkGmk6X5iMEf8BIvpCc7KstV11jwVjCwcTpVVZNg2UpprF0L-GoIbNJAqIamermAf50BwXe7L9K90iSE8SZUAHU_5HfzLgj2tJvAwSu5d0vkRd_aQvR3IUd1H2JKS5xciMugYmaHA-zFAokR8QClk5jPbRmwMGfAZ8FYkSQvInuaGy01ikJepfpxI3YDvNU',
  },
} as const

type EventSlug = keyof typeof EVENT_DETAILS

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function resolveEvent(slug: string) {
  const defaultEvent = EVENT_DETAILS['navroz-2025']
  const event = EVENT_DETAILS[slug as EventSlug]
  if (event) return event
  return {
    ...defaultEvent,
    title: slugToTitle(slug),
    subtitle: "Event details are being prepared. Please check updates and registration information on BUSA's events page.",
  }
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = resolveEvent(slug)
  return {
    title: `${event.title} | BUSA Events`,
    description: event.subtitle,
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const event = resolveEvent(slug)

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f9fb] font-body text-[#191c1e]">
        <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-[#00236f]">
          <Image src={event.heroImage} alt={event.title} fill priority sizes="100vw" className="object-cover opacity-60 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00236f] via-[#00236f]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-8 pb-16">
            <h1 className="font-headline text-6xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl">{event.title}</h1>
            <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-blue-100">{event.subtitle}</p>
          </div>
        </section>

        <section className="border-b border-[#c5c5d3]/20 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-8 py-8 md:grid-cols-4">
            <EventInfo label="Date & Time" value={event.date} icon={FiCalendar} />
            <EventInfo label="Location" value={event.location} icon={FiMapPin} />
            <EventInfo label="Attendance" value={event.attendance} icon={FiUsers} />
            <EventInfo label="Event Type" value={event.type} icon={FiStar} />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-20 lg:grid-cols-12">
          <article className="space-y-6 text-lg font-light leading-relaxed text-slate-600 lg:col-span-7">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-[#00236f]">Renaissance of the Spirit</h2>
            <p>
              Navro&apos;z marks the beginning of the new year in many cultures across the Silk Road. For BUSA, it is more than a holiday - it is a moment
              of reflection and collective vision. This year&apos;s theme, <span className="font-medium text-[#00236f]">Academic Azure</span>, bridges
              the gap between ancient traditions and modern intellectual pursuits.
            </p>
            <p>
              The evening will feature a curated program of traditional music reimagined with contemporary arrangements, guest speakers from across the
              academic spectrum, and a showcase of student-led cultural initiatives.
            </p>
            <blockquote className="rounded-2xl border-l-4 border-[#00236f] bg-[#f2f4f6] p-8 font-medium italic text-[#90a8ff]">
              The spring equinox reminds us that knowledge, like nature, is a cycle of constant renewal.
            </blockquote>
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
