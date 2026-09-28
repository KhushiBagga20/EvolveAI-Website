import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PeopleHero } from '@/components/site/people-hero'
import { SectionLabel } from '@/components/site/reveal'
import { FacultyCard } from '@/components/team/faculty-card'
import { SquadDirectory } from '@/components/team/squad-directory'
import { executives, faculty, leads, squads, teamCount } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Our People — Team',
  description: 'Different talents, shared curiosity. Meet the student leads, executives, six squads and faculty mentors behind Evolve AI at Chitkara University.',
}

export default function TeamPage() {
  return (
    <div className="bg-[#f8f7f2] px-5 pb-20 md:px-8 md:pb-28">
      <PeopleHero variant="team" portraits={[leads[0], leads[1], leads[2]]} count={teamCount} />
      <div className="mx-auto max-w-6xl">
        <section id="directory" aria-labelledby="directory-title" className="scroll-mt-28 pb-20 pt-5">
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><SectionLabel index="01">The people behind it</SectionLabel><h2 id="directory-title" className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-5xl">Many talents. <span className="text-violet">One team.</span></h2></div><p className="max-w-64 text-sm leading-relaxed text-ink/60">Find a familiar face, meet a new collaborator, or get to know a squad.</p></div>
          <SquadDirectory squads={squads} leads={leads} executives={executives} />
        </section>
        <section id="mentors" aria-labelledby="mentors-title" className="scroll-mt-28 border-t border-ink/20 py-14 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><SectionLabel index="02">In good hands</SectionLabel><h2 id="mentors-title" className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-5xl">A little guidance.<br />A world of possibility.</h2></div><p className="max-w-72 text-sm leading-relaxed text-ink/60">Our faculty mentors. The people who open doors, ask the right questions, and believe in what comes next.</p></div>
          <div className="grid gap-8 md:grid-cols-3">{faculty.map((person, index) => <FacultyCard key={person.name} faculty={person} index={index} />)}</div>
        </section>
        <aside className="flex flex-col justify-between gap-8 bg-lilac/60 px-7 py-10 md:flex-row md:items-center md:px-12"><div><p className="font-mono text-[10px] uppercase tracking-widest text-ink/65">There&apos;s room for your kind of curious.</p><h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">Your people are here.</h2></div><Link href="/#contact" className="inline-flex w-fit items-center gap-8 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-violet">Become part of the story <ArrowUpRight size={18} aria-hidden="true" /></Link></aside>
      </div>
    </div>
  )
}
