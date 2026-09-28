import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { EventsHero } from '@/components/events/events-hero'
import { FeaturedTicket } from '@/components/events/featured-ticket'
import { EventProgramme } from '@/components/events/event-programme'
import { PosterWall } from '@/components/events/poster-wall'
import { events, liveEvents, pastEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Hackathons, workshops, expert talks and competitions by Evolve AI — what’s live, the latest drop, the full programme and every poster we’ve made.',
}

function Heading({ index, label, title, accent, note, id }: { index: string; label: string; title: string; accent: string; note: string; id: string }) {
  return (
    <Reveal className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 id={id} className="mt-4 text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] md:text-6xl">
          {title} <span className="text-violet">{accent}</span>
        </h2>
      </div>
      <p className="max-w-72 text-sm leading-relaxed text-ink/60">{note}</p>
    </Reveal>
  )
}

export default function EventsPage() {
  const featured = pastEvents.find((e) => e.date) ?? events[0]
  const count = (kinds: string[]) => events.filter((e) => kinds.includes(e.kind)).length

  return (
    <div className="bg-[#f8f7f2] px-5 pb-20 md:px-8 md:pb-24">
      <EventsHero
        live={liveEvents[0]}
        counts={[
          { label: 'Events run', value: events.length },
          { label: 'Hackathons', value: count(['Hackathon']) },
          { label: 'Workshops', value: count(['Workshop']) },
          { label: 'Expert talks', value: count(['Expert Talk']) },
          { label: 'Competitions', value: count(['Competition']) },
        ]}
      />

      <div className="mx-auto max-w-6xl">
        <section aria-labelledby="featured-title">
          <Heading id="featured-title" index="01" label="The latest drop" title="Fresh off" accent="the stage." note="Our most recent event — the full ticket, from venue to prize pool." />
          <FeaturedTicket event={featured} />
        </section>

        <section id="programme" aria-labelledby="programme-title" className="scroll-mt-24 pt-16 md:pt-24">
          <Heading id="programme-title" index="02" label="The programme" title="Every event," accent="one list." note="Filter by format. Hover a row to peek at the poster, click to read the recap." />
          <EventProgramme events={events} />
        </section>

        <section aria-labelledby="posters-title" className="pt-16 md:pt-24">
          <Heading id="posters-title" index="03" label="Poster wall" title="Every poster" accent="we've dropped." note="Designed by our graphics squad. Each one a reason to show up." />
          <PosterWall events={events} />
        </section>

        <aside className="relative mt-20 overflow-hidden rounded-[32px] bg-ink px-7 py-12 text-white md:mt-24 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-violet/45 blur-[110px]" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-lilac">Partners, speakers, sponsors</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-5xl">Want to build the next one with us?</h2>
            </div>
            <Link href="/#contact" className="inline-flex w-fit shrink-0 items-center gap-6 rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition-colors hover:bg-lilac">
              Pitch an event <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
