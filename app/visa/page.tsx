'use client'

import { useState } from 'react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import JoinCTA from '@/components/sections/about/JoinCTA'
import VisaArticlesSection from '@/components/sections/visa/VisaArticlesSection'
import VisaHero from '@/components/sections/visa/VisaHero'
import VisaTypesSection from '@/components/sections/visa/VisaTypesSection'

export default function VisaPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl bg-background px-8 pb-24 pt-32 font-body text-on-background">
        <VisaHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <VisaTypesSection />
        <VisaArticlesSection searchQuery={searchQuery} />
        <JoinCTA
          variant="plain"
          eyebrow="Viza"
          title="Savolingiz bormi?"
          description="Viza mutaxassislarimiz va jamoamiz a'zolari sizga yordam berishga tayyor."
        />
      </main>
      <Footer />
    </>
  )
}
