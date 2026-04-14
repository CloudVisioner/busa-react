import type { Metadata } from 'next'
import { Roboto, Space_Grotesk } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'BUSA',
  description: 'BUSA community platform for Uzbek students in Busan.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uz" className="light">
      <body className={`${roboto.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
