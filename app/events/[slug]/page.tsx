import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, MapPin, Trophy, Users } from 'lucide-react'
import { events, formatEventDate, getEvent } from '@/lib/data'
import { StatusBadge } from '@/components/events/status-badge'
import { Countdown } from '@/components/events/countdown'
import { RegistrationForm } from '@/components/events/registration-form'

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) return {}
  return { title: event.title, description: event.summary }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) notFound()

  const facts = [
    { icon: CalendarDays, label: 'Date', value: `${formatEventDate(event.date)}${event.endDate ? ` – ${formatEventDate(event.endDate)}` : ''}` },
    { icon: Clock, label: 'Time', value: event.time },
    { icon: MapPin, label: 'Venue', value: event.venue },
    ...(event.teamSize ? [{ icon: Users, label: 'Team', value: event.teamSize }] : []),
    ...(event.prize ? [{ icon: Trophy, label: 'Rewards', value: event.prize }] : []),
  ]

  return (
    <div className="px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link href="/events" className="group inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          All events
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-[36px] bg-ink text-white">
          <Image src={event.image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-96 rounded-full bg-violet/40 blur-[100px]" />
          <div className="relative flex min-h-[420px] flex-col justify-end gap-5 p-7 md:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest">{event.type}</span>
              <StatusBadge status={event.status} />
              {event.partner && (
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/80">
                  with {event.partner}
                </span>
              )}
            </div>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl">{event.title}</h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/75">{event.summary}</p>
            {event.status !== 'past' && <Countdown to={event.date} variant="dark" className="max-w-md" />}
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="flex flex-col gap-8">
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
              <p className="mt-4 text-pretty leading-relaxed text-ink/70">{event.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {event.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ink">
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {event.agenda && (
              <section aria-labelledby="agenda" className="glass rounded-[28px] p-6 md:p-8">
                <h2 id="agenda" className="text-2xl font-semibold tracking-tight text-ink">
                  Agenda
                </h2>
                <ol className="mt-6 flex flex-col">
                  {event.agenda.map((a, i) => (
                    <li key={a.time} className="grid grid-cols-[auto_1fr] gap-4">
                      <div className="flex flex-col items-center">
                        <span className="bg-iridescent mt-1.5 size-3 rounded-full" aria-hidden="true" />
                        {i < event.agenda!.length - 1 && <span className="w-px flex-1 bg-ink/15" aria-hidden="true" />}
                      </div>
                      <div className="pb-6">
                        <p className="font-mono text-xs text-violet">{a.time}</p>
                        <p className="mt-1 font-medium text-ink">{a.item}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside id="register" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <RegistrationForm event={event} />
          </aside>
        </div>
      </div>
    </div>
  )
}
