import AboutHero from '@/components/sections/about/AboutHero'
import JoinCTA from '@/components/sections/about/JoinCTA'
import OurStory from '@/components/sections/about/OurStory'
import TeamSection from '@/components/sections/about/TeamSection'
import type { TeamMember } from '@/components/sections/about/TeamSection'
import Timeline from '@/components/sections/about/Timeline'
import type { TimelineItem } from '@/components/sections/about/Timeline'
import Values from '@/components/sections/about/Values'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { queryApollo } from '@/lib/apollo/client'
import { GET_TEAM_MEMBERS, GET_TIMELINE } from '@/lib/apollo/queries'
import { normalizeRemoteImageUrl } from '@/lib/utils/remoteImage'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  let teamMembersRaw: any[] = []
  let timelineRaw: any[] = []

  try {
    const teamData = await queryApollo({
      query: GET_TEAM_MEMBERS,
      variables: { page: 1, limit: 200 },
      fetchPolicy: 'network-only',
    })
    teamMembersRaw = (teamData as any)?.teamMembers?.items ?? []
  } catch (error) {
    console.error('Failed to load team members:', error)
  }

  try {
    const timelineData = await queryApollo({
      query: GET_TIMELINE,
      variables: { page: 1, limit: 100 },
      fetchPolicy: 'network-only',
    })
    timelineRaw = (timelineData as any)?.timelines?.items ?? []
  } catch (error) {
    console.error('Failed to load timeline:', error)
  }

  const members: TeamMember[] = teamMembersRaw
    .slice()
    .sort((a: any, b: any) => {
      const oa = a.order ?? 0
      const ob = b.order ?? 0
      if (oa !== ob) return Number(oa) - Number(ob)
      return Number(a.year ?? 0) - Number(b.year ?? 0)
    })
    .map((m: any) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      joined: m.year != null ? String(m.year) : '',
      photo: normalizeRemoteImageUrl(m.photo),
    }))

  const timelineItems: TimelineItem[] = timelineRaw
    .slice()
    .sort((a: any, b: any) => Number(a.year ?? 0) - Number(b.year ?? 0))
    .map((t: any) => ({
      year: String(t.year),
      president: t.presidentName ?? 'BUSA Team',
      image: normalizeRemoteImageUrl(t.coverPhoto),
      did: t.description ?? '',
      changed: '',
      philosophy: '',
      vision: '',
    }))

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-surface font-body text-on-surface">
        <AboutHero />
        <OurStory />
        <Timeline items={timelineItems.length > 0 ? timelineItems : undefined} />
        <Values />
        <TeamSection members={members} />
        <JoinCTA variant="plain" />
        <Footer />
      </main>
    </>
  )
}
