import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AlumniHero } from '@/components/alumni/alumni-hero'
import { AlumniChapter } from '@/components/alumni/alumni-chapter'
import { alumni } from '@/lib/team'
import { socials } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Alumni — Always One of Us',
  description: 'Once Evolve, always one of us. Flip through the Evolve AI yearbook and meet the alumni batches who shaped our student AI community at Chitkara University.',
}

const chapterCopy: Record<string, { title: string; note: string }> = {
  '2023': { title: 'The builders.', note: 'They turned a club into a community — more events, bigger stages and a culture of shipping things together.' },
  '2022': { title: 'The first believers.', note: 'The first ones through the door. They took Evolve AI from an idea to a place people wanted to be.' },
}

export default function AlumniPage() {
  const total = alumni.reduce((count, batch) => count + batch.members.length, 0)
  const faces = [alumni[0].members[4], alumni[0].members[1], alumni[0].members[0], alumni[1].members[3], alumni[1].members[0]]

  return (
    <div className="bg-[#f8f7f2] px-5 pb-20 md:px-8 md:pb-24">
      <AlumniHero faces={faces} total={total} batches={alumni.length} />

      <div className="mx-auto max-w-6xl">
        <div id="chapters" className="scroll-mt-24">
          {alumni.map((batch, i) => (
            <AlumniChapter
              key={batch.year}
              year={batch.year}
              members={batch.members}
              chapter={i + 1}
              title={chapterCopy[batch.year]?.title ?? `Class of ${batch.year}.`}
              note={chapterCopy[batch.year]?.note ?? 'Different paths, the same roots.'}
            />
          ))}

          <nav aria-label="Jump to a batch" className="sticky bottom-5 z-20 mx-auto mt-12 flex w-fit items-center gap-1 rounded-full bg-ink p-1 text-white shadow-[0_20px_40px_-18px_rgba(28,10,51,0.7)]">
            <span className="px-3 font-mono text-[10px] uppercase tracking-widest text-white/55">Chapters</span>
            {alumni.map((batch) => (
              <a key={batch.year} href={`#batch-${batch.year}`} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-ink">
                {batch.year}
                <span className="font-mono text-[10px] opacity-60">{String(batch.members.length).padStart(2, '0')}</span>
              </a>
            ))}
          </nav>
        </div>

        <aside className="relative mt-20 overflow-hidden rounded-[32px] bg-ink px-7 py-12 text-white md:mt-24 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-violet/45 blur-[110px]" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-lilac">The story doesn&apos;t end at graduation.</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-5xl">
                Still part of
                <br />
                the conversation.
              </h2>
            </div>
            <div>
              <p className="max-w-sm text-sm leading-relaxed text-white/65">Different paths, new places, the same community. Stay close to what we&apos;re building — and the people building it.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={socials[1].href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-lilac">
                  Connect on LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link href="/#contact" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10">
                  Say hello <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
