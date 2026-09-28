import Image from 'next/image'
import Link from 'next/link'
import { formatDate, type ClubEvent } from '@/lib/events'
import { cn } from '@/lib/utils'

const tilts = ['md:-rotate-2', 'md:rotate-1', 'md:rotate-[-1deg]', 'md:rotate-2']

export function PosterWall({ events }: { events: ClubEvent[] }) {
  return (
    <ul className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
      {events.map((e, i) => (
        <li key={e.slug} className="mb-3 break-inside-avoid md:mb-5">
          <Link
            href={`/events/${e.slug}`}
            className={cn(
              'group relative block overflow-hidden rounded-[18px] bg-ink shadow-[0_20px_45px_-30px_rgba(28,10,51,0.6)] transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.02]',
              tilts[i % tilts.length],
              e.posterRatio === 'tall' ? 'aspect-[9/16]' : 'aspect-[4/5]',
            )}
          >
            <Image src={e.poster} alt={`${e.title} poster`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent p-3 pt-12 text-white opacity-100 transition-opacity duration-300 md:p-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/65">
                {e.kind} · {formatDate(e.date, { month: 'short', year: 'numeric' })}
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-tight">{e.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
