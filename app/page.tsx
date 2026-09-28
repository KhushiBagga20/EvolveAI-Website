import { Hero } from '@/components/home/hero'
import { Marquee } from '@/components/home/marquee'
import { About } from '@/components/home/about'
import { WhatWeDo } from '@/components/home/what-we-do'
import { Story } from '@/components/home/story'
import { Upcoming } from '@/components/home/upcoming'
import { Gallery } from '@/components/home/gallery'
import { Testimonials } from '@/components/home/testimonials'
import { Faq } from '@/components/home/faq'
import { Contact } from '@/components/home/contact'
import { partners } from '@/lib/data'

const vibes = ['Hackathons', 'Workshops', 'Expert talks', 'Real projects', 'Generative AI', 'Computer vision', 'Agents', 'Community']

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="-rotate-1 scale-[1.02]">
        <Marquee items={vibes} />
      </div>
      <About />
      <WhatWeDo />
      <Story />
      <Upcoming />
      <section aria-labelledby="partners-title" className="py-10">
        <h2 id="partners-title" className="mb-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
          Beyond the classroom, with
        </h2>
        <Marquee items={partners} variant="light" reverse />
      </section>
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
