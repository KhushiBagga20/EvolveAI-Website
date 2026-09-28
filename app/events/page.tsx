import type { Metadata } from 'next'
import Image from 'next/image'
import { EventsBrowser } from '@/components/events/events-browser'
import { SectionLabel } from '@/components/site/reveal'
import { events } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Hackathons, workshops, expert talks and tech events by Evolve AI. Browse and register.',
}

export default function EventsPage() {
  const openCount = events.filter((e) => e.status === 'open').length

  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <header className="relative flex flex-col gap-6 pb-12">
          <Image
            src="/images/hero-glass.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="pointer-events-none absolute -right-16 -top-24 -z-10 w-72 mix-blend-multiply animate-float [mask-image:radial-gradient(closest-side,black_72%,transparent)] md:-top-32 md:w-[440px]"
          />
          <SectionLabel index="EV">Events</SectionLabel>
          <h1 className="max-w-3xl text-balance text-6xl font-bold leading-[0.9] tracking-[-0.05em] text-ink md:text-8xl">
            Pick your <span className="text-iridescent">next build.</span>
          </h1>
          <p className="max-w-lg text-pretty text-lg leading-relaxed text-ink/70">
            Hackathons, workshops, expert talks and tech events. Register in under a minute — the organising team
            approves entries and keeps you posted.
          </p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-white">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            {openCount} open for registration
          </p>
        </header>

        <EventsBrowser events={events} />
      </div>
    </div>
  )
}
