import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { LiveStatus } from '@/components/events/live-status'
import { PastEventCard } from '@/components/events/past-event-card'
import { ArchiveWall } from '@/components/events/archive-wall'
import { events, featuredPast, liveEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Hackathons, workshops, expert talks and competitions by Evolve AI — live events, past events and the full archive.',
}

export default function EventsPage() {
  return (
    <div className="pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <PageHero
          index="EV"
          label="Events"
          title="Built on"
          accent="stage."
          description="Two or three big ones a year, done properly. Hackathons, expert talks, workshops and competitions — here's what's live and everything we've run."
        />

        <LiveStatus live={liveEvents} />

        <section aria-labelledby="past-title" className="mt-24">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 id="past-title" className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">
              Past events
            </h2>
            <p className="font-mono text-sm text-ink/55">{`// latest ${featuredPast.length}, newest first`}</p>
          </div>
          <ol className="flex flex-col gap-6">
            {featuredPast.map((e, i) => (
              <li key={e.slug} className="md:sticky" style={{ top: `${112 + i * 18}px` }}>
                <PastEventCard event={e} index={i} />
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="archive-title" className="mt-28">
        <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-3 px-5 md:flex-row md:items-end md:justify-between md:px-8">
          <h2 id="archive-title" className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Archives
          </h2>
          <p className="max-w-sm text-pretty text-ink/60">Every poster we&apos;ve dropped. Hover to pause, click to open.</p>
        </div>
        <ArchiveWall events={events} />
      </section>
    </div>
  )
}
