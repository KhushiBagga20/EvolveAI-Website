import Image from 'next/image'
import type { Person } from '@/lib/team'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-[-1.5deg]', 'rotate-[1.5deg]']
const tapes = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-6']

export function AlumniChapter({ year, members, chapter, title, note }: { year: string; members: Person[]; chapter: number; title: string; note: string }) {
  return (
    <section id={`batch-${year}`} aria-labelledby={`batch-${year}-title`} className="scroll-mt-40 pt-14 md:pt-20">
      <Reveal className="relative">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none font-display text-[clamp(6rem,24vw,18rem)] font-bold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(103,64,216,0.35)]"
        >
          {year}
        </p>
        <div className="-mt-6 flex flex-col justify-between gap-4 border-b border-ink/20 pb-6 md:-mt-10 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-violet">
              Chapter {String(chapter).padStart(2, '0')} · Batch of {year} · {String(members.length).padStart(2, '0')} alumni
            </p>
            <h2 id={`batch-${year}-title`} className="mt-2 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-80 text-sm leading-relaxed text-ink/60">{note}</p>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
        {members.map((person, i) => (
          <li key={person.name} className="flex justify-center">
            <figure
              className={cn(
                'group relative w-full max-w-64 bg-white p-2.5 pb-4 shadow-[0_18px_40px_-26px_rgba(28,10,51,0.5)] transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.03]',
                tilts[i % tilts.length],
              )}
            >
              <span aria-hidden="true" className={cn('absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-lilac/70 backdrop-blur-sm', tapes[i % tapes.length])} />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e6e1ed]">
                <Image
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover object-top grayscale-[0.35] transition-[filter] duration-500 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="flex items-end justify-between gap-2 px-0.5 pt-3">
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-semibold leading-tight tracking-tight md:text-lg">{person.name}</span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-ink/50">Class of {year}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 font-mono text-[10px] text-violet">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
