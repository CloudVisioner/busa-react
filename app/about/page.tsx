import AboutHero from '@/components/sections/about/AboutHero'
import FounderSpotlight from '@/components/sections/about/FounderSpotlight'
import JoinCTA from '@/components/sections/about/JoinCTA'
import OurStory from '@/components/sections/about/OurStory'
import TeamSection from '@/components/sections/about/TeamSection'
import Timeline from '@/components/sections/about/Timeline'
import Values from '@/components/sections/about/Values'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <OurStory />
      <Timeline />
      <Values />
      <FounderSpotlight />
      <TeamSection />
      <JoinCTA />
      <Footer />
    </main>
  )
}
