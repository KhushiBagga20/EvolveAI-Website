import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { PersonCard } from '@/components/site/person-card'
import { FacultyCard } from '@/components/team/faculty-card'
import { SquadDirectory } from '@/components/team/squad-directory'
import { executives, faculty, leads, squads, teamCount } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the faculty mentors, leads, executives and squads behind Evolve AI, Chitkara University.',
}

function GroupHeading({ id, title, count, note }: { id: string; title: string; count: number; note: string }) {
  return (
    <div className="mb-8 flex flex-col gap-2 border-b border-ink/10 pb-5 md:flex-row md:items-end md:justify-between">
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        {title} <span className="font-mono text-base font-normal text-violet md:text-lg">[{String(count).padStart(2, '0')}]</span>
      </h2>
      <p className="max-w-sm text-pretty text-ink/60">{note}</p>
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <PageHero
          index="TM"
          label="Team 2025–26"
          title="Pillars of"
          accent="Evolve AI."
          description="Our strength is the people behind the technology — mentors who guide, leads who steer and squads who ship."
        >
          <dl className="flex flex-wrap gap-3">
            {[
              { k: 'Faculty', v: faculty.length },
              { k: 'Members', v: teamCount },
              { k: 'Squads', v: squads.length },
            ].map((s) => (
              <div key={s.k} className="glass flex items-baseline gap-2 rounded-full px-4 py-2">
                <dd className="text-lg font-bold text-ink">{s.v}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/55">{s.k}</dt>
              </div>
            ))}
          </dl>
        </PageHero>

        <section aria-labelledby="faculty" className="py-10">
          <GroupHeading id="faculty" title="Faculty mentors" count={faculty.length} note="The people who founded, guide and back the club." />
          <div className="flex flex-col gap-4">
            {faculty.map((f, i) => (
              <Reveal key={f.name} delay={0.05 * i}>
                <FacultyCard faculty={f} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="leads" className="py-10">
          <GroupHeading id="leads" title="Leads" count={leads.length} note="Heads of every function, steering the club this session." />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {leads.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={0.03 * i}>
                  <PersonCard person={m} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="executives" className="py-10">
          <GroupHeading id="executives" title="Executives" count={executives.length} note="Running media, content and operations day-to-day." />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {executives.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={0.03 * i}>
                  <PersonCard person={m} size="sm" />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="squads" className="py-10">
          <GroupHeading
            id="squads"
            title="Squads"
            count={squads.reduce((n, s) => n + s.members.length, 0)}
            note="Six squads, one club. Pick a squad to meet its members."
          />
          <SquadDirectory squads={squads} />
        </section>
      </div>
    </div>
  )
}
