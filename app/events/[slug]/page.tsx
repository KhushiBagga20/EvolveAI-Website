import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Handshake, MapPin, Trophy, Users } from 'lucide-react'
import { events, formatDate, getEvent } from '@/lib/events'

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) return {}
  return { title: event.title, description: event.description.slice(0, 160), openGraph: { images: [event.poster] } }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) notFound()

  const i = events.findIndex((e) => e.slug === slug)
  const next = events[(i + 1) % events.length]

  const facts = [
    { icon: CalendarDays, label: 'Date', value: formatDate(event.date) },
    event.venue && { icon: MapPin, label: 'Venue', value: event.venue },
    event.partner && { icon: Handshake, label: 'With', value: event.partner },
    event.prize && { icon: Trophy, label: 'Rewards', value: event.prize },
    event.audience && { icon: Users, label: 'Open to', value: event.audience },
  ].filter(Boolean) as { icon: typeof CalendarDays; label: string; value: string }[]

  return (
    <div className="px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href="/events" className="group inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          All events
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[32px] bg-ink shadow-[0_40px_80px_-40px_rgba(60,20,120,0.7)]">
              <Image
                src={event.poster}
                alt={`${event.title} poster`}
                width={1131}
                height={1600}
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>

          <article className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">{event.kind}</span>
              <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink/60">
                {event.live ? 'Live' : 'Concluded'}
              </span>
            </div>
            <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-ink md:text-6xl">{event.title}</h1>

            <dl className="grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="glass flex items-start gap-4 rounded-3xl p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
                    <f.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/50">{f.label}</dt>
                    <dd className="mt-1 font-semibold text-ink">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <section aria-labelledby="about-event" className="glass rounded-[28px] p-6 md:p-8">
              <h2 id="about-event" className="text-2xl font-semibold tracking-tight text-ink">
                About this event
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink/70">{event.description}</p>
              <p className="mt-6 font-mono text-sm text-violet">~ Keep Evolving</p>
            </section>

            <Link
              href={`/events/${next.slug}`}
              className="group flex items-center justify-between gap-6 rounded-[28px] bg-ink p-6 text-white transition-colors hover:bg-violet md:p-8"
            >
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-white/50">Next event</span>
                <span className="mt-1 block text-xl font-semibold tracking-tight md:text-2xl">{next.title}</span>
              </span>
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </div>
  )
}
