import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { Backdrop } from '@/components/site/backdrop'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Evolve AI — Student AI Community, Chitkara University',
    template: '%s · Evolve AI',
  },
  description:
    'Evolve AI is the student-driven AI community at Chitkara University. Hackathons, workshops, expert talks and real-world projects — register for events right here.',
  metadataBase: new URL('https://evolveai.chitkara.edu.in'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Evolve AI — Where innovation meets evolution',
    description: 'The student AI community at Chitkara University.',
    images: ['/images/hero-glass.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f2fd',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
