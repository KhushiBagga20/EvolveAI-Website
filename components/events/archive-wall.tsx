import Image from 'next/image'
import Link from 'next/link'
import { formatDate, type ClubEvent } from '@/lib/events'
import { cn } from '@/lib/utils'

function Row({ items, reverse }: { items: ClubEvent[]; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <ul
        className={cn(
          'flex w-max shrink-0 gap-4 pr-4 [animation-duration:60s] hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {row.map((e, i) => {
          const duplicate = i >= items.length
          return (
            <li key={`${e.slug}-${i}`} aria-hidden={duplicate || undefined}>
              <Link
                href={`/events/${e.slug}`}
                tabIndex={duplicate ? -1 : undefined}
                className="group relative block h-72 w-52 overflow-hidden rounded-[22px] bg-ink md:h-96 md:w-68"
              >
                <Image
                  src={e.poster}
                  alt={duplicate ? '' : `${e.title} poster`}
                  fill
                  sizes="272px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink via-ink/80 to-transparent p-4 pt-10 text-white transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">{formatDate(e.date, { month: 'short', year: 'numeric' })}</p>
                  <p className="mt-1 line-clamp-2 font-semibold leading-tight">{e.title}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ArchiveWall({ events }: { events: ClubEvent[] }) {
  const half = Math.ceil(events.length / 2)
  const rowA = [...events]
  const rowB = [...events.slice(half), ...events.slice(0, half)]
  return (
    <div className="flex -rotate-1 flex-col gap-4">
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </div>
  )
}
