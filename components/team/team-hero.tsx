import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { Person } from '@/lib/team'
import { shapeClasses } from '@/lib/shapes'
import { SectionLabel } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export function TeamHero({ faces, count, stats }: { faces: Person[]; count: number; stats: { value: string; label: string; href: string }[] }) {
  return (
    <header className="mx-auto max-w-6xl pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
        <SectionLabel index="TM">Pillars of Evolve AI / 2025–26</SectionLabel>
        <Link href="/alumni" className="flex items-center gap-2 text-xs text-ink/65 transition-colors hover:text-violet">
          Meet our alumni <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            The minds
            <br />
            behind <span className="text-violet">the machine.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
            Mentors, leads, executives and six squads. Different talents, shared curiosity — the people turning ambitious ideas into something real.
          </p>
          <a href="#leads" className="mt-7 inline-flex items-center gap-6 border-b border-ink pb-2 text-sm font-medium transition-colors hover:border-violet hover:text-violet">
            Find your people <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>

        <ul aria-label="A few of our team members" className="grid grid-cols-4 gap-2 sm:gap-3">
          {faces.map((person, i) => (
            <li
              key={person.name}
              className={cn(
                'group relative aspect-square overflow-hidden bg-lilac transition-transform duration-500 hover:-translate-y-1',
                shapeClasses[i % 4],
              )}
            >
              <Image src={person.photo} alt={person.name} fill sizes="(min-width: 1024px) 130px, 22vw" className="object-cover object-top saturate-[0.85] transition-[filter] duration-500 group-hover:saturate-100" />
            </li>
          ))}
          <li className="col-span-1 flex aspect-square flex-col justify-between rounded-full bg-violet p-3 text-white sm:p-4">
            <span className="sr-only">Team size:</span>
            <span className="m-auto text-center">
              <span className="block font-display text-2xl font-semibold leading-none tracking-tight sm:text-4xl">{count}+</span>
              <span className="mt-1 block font-mono text-[8px] uppercase tracking-widest text-white/75 sm:text-[9px]">minds</span>
            </span>
          </li>
        </ul>
      </div>

      <nav aria-label="Team sections" className="mt-12 grid grid-cols-2 border-y border-ink/20 md:grid-cols-4">
        {stats.map((stat, i) => (
          <a
            key={stat.label}
            href={stat.href}
            className={cn(
              'group flex items-end justify-between gap-3 py-5 pr-4 transition-colors hover:text-violet md:pl-6',
              i > 0 && 'md:border-l md:border-ink/20',
              i % 2 === 1 && 'border-l border-ink/20 pl-4 md:pl-6',
              i < 2 && 'border-b border-ink/20 md:border-b-0',
              i === 0 && 'md:pl-0',
            )}
          >
            <span>
              <span className="block font-display text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink/55">{stat.label}</span>
            </span>
            <ArrowDown size={16} aria-hidden="true" className="mb-1 shrink-0 transition-transform group-hover:translate-y-0.5" />
          </a>
        ))}
      </nav>
    </header>
  )
}
