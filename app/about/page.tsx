import AboutHero from '@/components/sections/about/AboutHero'
import FounderSpotlight from '@/components/sections/about/FounderSpotlight'
import JoinCTA from '@/components/sections/about/JoinCTA'
import OurStory from '@/components/sections/about/OurStory'
import TeamSection from '@/components/sections/about/TeamSection'
import Timeline from '@/components/sections/about/Timeline'
import Values from '@/components/sections/about/Values'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-surface font-body text-on-surface">
        <AboutHero />
        <OurStory />
        <Timeline />
        <Values />
        <FounderSpotlight />
        <TeamSection />
        <JoinCTA />
        <Footer />
      </main>
    </>
  )
}
