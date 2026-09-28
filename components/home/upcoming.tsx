import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Trophy, Users } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { EventCard } from '@/components/events/event-card'
import { Countdown } from '@/components/events/countdown'
import { events, formatEventDate } from '@/lib/data'

export function Upcoming() {
  const upcoming = events.filter((e) => e.status === 'open' || e.status === 'soon')
  const [featured, ...rest] = upcoming

  return (
    <section id="events" aria-labelledby="events-title" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="04">Up next</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="events-title" className="mt-6 text-5xl font-semibold tracking-tight text-ink md:text-7xl">
                {"Don't miss the "}
                <span className="text-iridescent">next one.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/events"
              className="glass group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-ink"
            >
              All events
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {featured && (
          <Reveal delay={0.1} className="mt-14">
            <article className="relative grid overflow-hidden rounded-[32px] bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 -top-32 size-96 rounded-full bg-violet/50 blur-[100px]" />
                <div className="absolute -bottom-32 left-1/3 size-80 rounded-full bg-sky/30 blur-[100px]" />
              </div>
              <div className="relative flex flex-col gap-6 p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest">
                    Featured · {featured.type}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/80">
                    {formatEventDate(featured.date, false)}
                    {featured.endDate ? ` – ${formatEventDate(featured.endDate)}` : ''}
                  </span>
                </div>
                <h3 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">{featured.title}</h3>
                <p className="max-w-md text-pretty leading-relaxed text-white/70">{featured.summary}</p>
                <div className="flex flex-wrap gap-2 text-sm text-white/80">
                  {featured.teamSize && (
                    <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                      <Users className="size-4" aria-hidden="true" /> {featured.teamSize}
                    </span>
                  )}
                  {featured.prize && (
                    <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
                      <Trophy className="size-4" aria-hidden="true" /> {featured.prize}
                    </span>
                  )}
                </div>
                <Countdown to={featured.date} variant="dark" className="max-w-md" />
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/events/${featured.slug}#register`}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-lilac"
                  >
                    Register your team
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={`/events/${featured.slug}`}
                    className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Details
                  </Link>
                </div>
              </div>
              <div className="relative min-h-72 lg:min-h-full">
                <Image
                  src={featured.image}
                  alt="Participants of a previous Evolve AI hackathon with their certificates"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r" />
              </div>
            </article>
          </Reveal>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {rest.map((e, i) => (
            <Reveal key={e.slug} delay={0.08 * i}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
