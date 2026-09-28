import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PeopleHero } from '@/components/site/people-hero'
import { AlumniBrowser } from '@/components/alumni/alumni-browser'
import { alumni } from '@/lib/team'
import { socials } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Alumni — Always One of Us',
  description: 'Once Evolve, always one of us. Explore the founding batches of Evolve AI and meet the alumni who helped shape our student AI community at Chitkara University.',
}

export default function AlumniPage() {
  const total = alumni.reduce((count, batch) => count + batch.members.length, 0)
  return (
    <div className="bg-[#f8f7f2] px-5 pb-20 md:px-8 md:pb-28">
      <PeopleHero variant="alumni" portraits={[alumni[0].members[0], alumni[0].members[1], alumni[1].members[0]]} count={total} />
      <div className="mx-auto max-w-6xl">
        <AlumniBrowser batches={alumni} />
        <aside className="mt-20 grid gap-8 border-t border-ink/20 pt-12 md:grid-cols-[1.2fr_1fr]"><div><p className="font-mono text-[10px] uppercase tracking-widest text-violet">The story doesn&apos;t end at graduation.</p><h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] md:text-5xl">Still part of<br />the conversation.</h2></div><div className="flex flex-col items-start justify-end"><p className="max-w-sm text-sm leading-relaxed text-ink/65">Different paths, new places, the same community. Stay close to what we&apos;re building, and the people building it.</p><div className="mt-6 flex flex-wrap gap-6"><a href={socials[1].href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 border-b border-ink pb-2 text-sm font-medium hover:text-violet">Connect on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a><Link href="/#contact" className="inline-flex items-center gap-4 border-b border-ink pb-2 text-sm font-medium hover:text-violet">Say hello<ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></aside>
      </div>
    </div>
  )
}
