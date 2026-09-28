import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, type ClubEvent } from '@/lib/events'

export function FeaturedTicket({ event }: { event: ClubEvent }) {
  const facts = [
    { label: 'Date', value: formatDate(event.date) },
    event.venue && { label: 'Venue', value: event.venue },
    event.partner && { label: 'With', value: event.partner },
    event.prize && { label: 'Rewards', value: event.prize },
    event.audience && { label: 'Open to', value: event.audience },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article className="group relative grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-45px_rgba(60,20,120,0.6)] ring-1 ring-ink/5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink md:aspect-auto md:min-h-[480px]">
        <Image src={event.poster} alt={`${event.title} poster`} fill priority sizes="(min-width: 768px) 42vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 rounded-full bg-[#f8f7f2] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink">Latest drop</span>
      </div>

      <div className="relative flex flex-col gap-6 border-t-2 border-dashed border-ink/15 p-6 md:border-l-2 md:border-t-0 md:p-10">
        <span aria-hidden="true" className="absolute -left-3 -top-3 size-6 rounded-full bg-[#f8f7f2]" />
        <span aria-hidden="true" className="absolute -right-3 -top-3 size-6 rounded-full bg-[#f8f7f2] md:-bottom-3 md:-left-3 md:right-auto md:top-auto" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">{event.kind}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45">Admit one · EA-{event.date?.slice(0, 4) ?? 'ARC'}-001</span>
        </div>

        <h3 className="text-balance text-3xl font-semibold leading-[1] tracking-[-0.04em] md:text-5xl">{event.title}</h3>

        <dl className="grid grid-cols-2 gap-x-5 gap-y-4 md:gap-x-8">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-ink/10 pt-3">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-violet">{f.label}</dt>
              <dd className="mt-1 text-sm font-medium leading-snug text-ink/80">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="line-clamp-3 max-w-xl text-pretty text-sm leading-relaxed text-ink/65">{event.description}</p>

        <Link href={`/events/${event.slug}`} className="mt-auto inline-flex w-fit items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet">
          Read the recap
          <span className="sr-only">: {event.title}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
