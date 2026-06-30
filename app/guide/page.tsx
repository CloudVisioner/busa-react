import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import GuideChecklistPage from '@/components/sections/GuideChecklistPage'

export const revalidate = 3600

export default function GuidePage() {
  return (
    <>
      <Navbar />
      <GuideChecklistPage />
      <Footer />
    </>
  )
}
