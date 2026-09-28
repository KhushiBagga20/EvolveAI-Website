import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { TeamHero } from '@/components/team/team-hero'
import { FacultyCard } from '@/components/team/faculty-card'
import { LeadRoster } from '@/components/team/lead-roster'
import { ExecutiveGroups } from '@/components/team/executive-groups'
import { SquadSwitcher } from '@/components/team/squad-switcher'
import { executives, faculty, leads, squads, teamCount } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Our People — Team',
  description: 'Different talents, shared curiosity. Meet the faculty mentors, student leads, executives and six squads behind Evolve AI at Chitkara University.',
  alternates: { canonical: '/teams' },
}

function SectionHead({ index, label, title, accent, note, id }: { index: string; label: string; title: string; accent: string; note: string; id: string }) {
  return (
    <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 id={id} className="mt-4 text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] md:text-6xl">
          {title} <span className="text-violet">{accent}</span>
        </h2>
      </div>
      <p className="max-w-72 text-sm leading-relaxed text-ink/60">{note}</p>
    </Reveal>
  )
}

export default function TeamPage() {
  const faces = [...leads, ...executives].slice(0, 11)
  const squadCount = squads.reduce((n, s) => n + s.members.length, 0)

  return (
    <div className="bg-[#f8f7f2] px-5 pb-20 md:px-8 md:pb-24">
      <TeamHero
        faces={faces}
        count={teamCount}
        stats={[
          { value: String(faculty.length).padStart(2, '0'), label: 'Faculty mentors', href: '#mentors' },
          { value: String(leads.length).padStart(2, '0'), label: 'Student leads', href: '#leads' },
          { value: String(executives.length).padStart(2, '0'), label: 'Executives', href: '#executives' },
          { value: String(squadCount).padStart(2, '0'), label: 'Across 6 squads', href: '#squads' },
        ]}
      />

      <div className="mx-auto max-w-6xl">
        <section id="mentors" aria-labelledby="mentors-title" className="relative scroll-mt-24 overflow-hidden rounded-[32px] bg-ink px-5 py-12 text-white md:rounded-[40px] md:px-12 md:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-violet/40 blur-[110px]" />
          <Reveal className="relative mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionLabel index="01" className="text-white/60">In good hands</SectionLabel>
              <h2 id="mentors-title" className="mt-4 text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] md:text-6xl">
                A little guidance. <span className="text-lilac">A world of possibility.</span>
              </h2>
            </div>
            <p className="max-w-72 text-sm leading-relaxed text-white/60">Our faculty mentors — the people who open doors, ask the right questions and believe in what comes next.</p>
          </Reveal>
          <div className="relative grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {faculty.map((person, index) => (
              <FacultyCard key={person.name} faculty={person} index={index} />
            ))}
          </div>
        </section>

        <section id="leads" aria-labelledby="leads-title" className="scroll-mt-24 pt-16 md:pt-24">
          <SectionHead id="leads-title" index="02" label="Leading the way" title="The core" accent="ten." note="The people setting direction — and bringing everyone along." />
          <LeadRoster leads={leads} />
        </section>

        <section id="executives" aria-labelledby="executives-title" className="scroll-mt-24 pt-16 md:pt-24">
          <SectionHead id="executives-title" index="03" label="Making it happen" title="Behind every event," accent="an executive." note="Media, content and operations — the ones who make sure the idea actually ships." />
          <ExecutiveGroups executives={executives} />
        </section>

        <section id="squads" aria-labelledby="squads-title" className="scroll-mt-24 pt-16 md:pt-24">
          <SectionHead id="squads-title" index="04" label="Six squads" title="Pick a squad." accent="Meet the crew." note="The people who build, research, shoot, write, design and run the show." />
          <SquadSwitcher squads={squads} />
        </section>

        <aside className="mt-20 flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-lilac/60 px-7 py-10 md:mt-24 md:flex-row md:items-center md:px-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/65">There&apos;s room for your kind of curious.</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Your people are here.</h2>
          </div>
          <Link href="/#contact" className="inline-flex w-fit items-center gap-8 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-violet">
            Become part of the story <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  )
}
