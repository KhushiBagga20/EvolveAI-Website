import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { formatEventDate, type ClubEvent } from '@/lib/data'
import { StatusBadge } from './status-badge'
import { cn } from '@/lib/utils'

export function EventCard({ event, className }: { event: ClubEvent; className?: string }) {
  const past = event.status === 'past'
  const fill = event.seats && event.registered ? Math.round((event.registered / event.seats) * 100) : 0

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        'glass group flex h-full flex-col overflow-hidden rounded-[28px] p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(139,61,255,0.55)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={cn('object-cover transition-transform duration-700 group-hover:scale-105', past && 'grayscale-[60%]')}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink backdrop-blur">
            {event.type}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <StatusBadge status={event.status} />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatEventDate(event.date)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-balance text-xl font-semibold leading-tight tracking-tight text-ink">{event.title}</h3>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-violet">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
        <p className="text-pretty text-sm leading-relaxed text-ink/60">{event.summary}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-ink/50">
          <MapPin className="size-3.5" aria-hidden="true" />
          {event.venue}
        </p>
        {event.status === 'open' && event.seats ? (
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div className="bg-iridescent h-full rounded-full" style={{ width: `${fill}%` }} />
            </div>
            <p className="font-mono text-[11px] text-ink/50">
              {event.registered}/{event.seats} spots taken
            </p>
          </div>
        ) : null}
      </div>
    </Link>
  )
}
