import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/site/reveal'
import { cn } from '@/lib/utils'
import { TeamHeroComposite } from '@/components/team/team-hero-composite'

export function TeamHero({ count, stats }: { count: number; stats: { value: string; label: string; href: string }[] }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
      <div className="flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
        <SectionLabel index="TM">PILLARS OF EVOLVE AI / 2025–26</SectionLabel>
        <Link href="/alumni" className="flex items-center gap-2 text-xs font-medium text-ink/75 transition-colors hover:text-[#5E17EB]">
          Meet our alumni <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:grid-cols-[1fr_1.1fr]">
        <div className="max-w-xl">
          <h1 className="text-[clamp(2.75rem,7vw,6.4rem)] font-bold leading-[0.92] tracking-[-0.045em] text-[#120524]">
            The minds
            <br />
            behind <span className="text-[#5E17EB]">the</span>
            <br />
            <span className="text-[#5E17EB]">machine.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Mentors, leads, executives and six squads. Different talents, shared curiosity — the people turning ambitious ideas into something real.
          </p>
          <a
            href="#leads"
            className="mt-8 inline-flex items-center gap-6 border-b-2 border-[#120524] pb-1.5 text-base font-semibold text-[#120524] transition-colors hover:border-[#5E17EB] hover:text-[#5E17EB]"
          >
            Find your people <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>

        <TeamHeroComposite />
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
