import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { Backdrop } from '@/components/site/backdrop'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Evolve AI',
    template: '%s · Evolve AI',
  },
  description:
    'Meet Evolve AI, the student-driven AI community at Chitkara University. Discover our team, alumni, hackathons, workshops and real-world projects. Learn by building, together.',
  metadataBase: new URL('https://evolveai.chitkara.edu.in'),
  icons: { icon: '/icon.jpg' },
  openGraph: {
    title: 'Evolve AI — Where innovation meets evolution',
    description: 'The student AI community at Chitkara University.',
    images: ['/images/hero-glass.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f8f7f2',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="relative min-h-dvh overflow-x-clip font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Backdrop />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
