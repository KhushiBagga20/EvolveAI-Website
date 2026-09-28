import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, MapPin, Trophy, Users } from 'lucide-react'
import { formatDate, type ClubEvent } from '@/lib/events'

export function PastEventCard({ event, index }: { event: ClubEvent; index: number }) {
  const meta = [
    { icon: CalendarDays, value: formatDate(event.date) },
    event.venue && { icon: MapPin, value: event.venue },
    event.prize && { icon: Trophy, value: event.prize },
    event.audience && { icon: Users, value: event.audience },
  ].filter(Boolean) as { icon: typeof CalendarDays; value: string }[]

  return (
    <article className="group relative grid overflow-hidden rounded-[32px] border border-white/80 bg-[#f7f5fe] shadow-[0_30px_70px_-40px_rgba(60,20,120,0.55)] md:grid-cols-[300px_1fr]">
      <div className="relative aspect-[3/4] overflow-hidden bg-ink md:aspect-auto md:min-h-[400px]">
        <Image
          src={event.poster}
          alt={`${event.title} poster`}
          fill
          sizes="(min-width: 768px) 300px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="relative flex flex-col gap-6 p-7 md:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-2 select-none text-[8rem] font-bold leading-none tracking-tighter text-transparent md:text-[11rem]"
          style={{ WebkitTextStroke: '1.5px rgba(28,10,51,0.1)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex flex-wrap items-center gap-2">
          <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">{event.kind}</span>
          {event.partner && (
            <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink/70">with {event.partner}</span>
          )}
        </div>

        <h3 className="relative max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          {event.title}
        </h3>

        <ul className="relative flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
          {meta.map((m) => (
            <li key={m.value} className="inline-flex items-center gap-2 text-sm font-medium text-ink/70">
              <m.icon className="size-4 text-violet" aria-hidden="true" />
              {m.value}
            </li>
          ))}
        </ul>

        <p className="relative line-clamp-4 max-w-2xl text-pretty leading-relaxed text-ink/65">{event.description}</p>

        <Link
          href={`/events/${event.slug}`}
          className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet"
        >
          Read the recap
          <span className="sr-only">: {event.title}</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
