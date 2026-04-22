import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import StatsSection from '@/components/sections/StatsSection'
import WhatIsBusa from '@/components/sections/WhatIsBusa'
import WhyBusa from '@/components/sections/WhyBusa'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-surface font-body text-on-surface">
        <HeroSection />
        <MarqueeSection />
        <WhatIsBusa />
        <WhyBusa />
        <ProjectsSection />
        <StatsSection />
        <Footer />
      </main>
    </>
  )
}
