import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { stats } from '@/lib/data'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 bg-[#f8f7f2] px-5 pb-16 pt-20 md:px-8 md:pb-20 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Reveal>
            <SectionLabel index="01">The human side of AI</SectionLabel>
            <h2 id="about-title" className="mt-6 text-[clamp(2.75rem,5.6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              Serious about AI.
              <br />
              <span className="text-violet">Even more about people.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
              We&apos;re the students who stay after the workshop. Who turn a &ldquo;what if&rdquo; into a weekend project. At Chitkara University, we learn artificial intelligence by making things — together.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/teams" className="inline-flex items-center gap-6 border-b border-ink pb-2 text-sm font-medium transition-colors hover:border-violet hover:text-violet">
                Get to know us <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink/50">Curiosity · Collaboration · Craft</p>
            </div>
          </Reveal>
          <Reveal className="relative pb-6 pr-4 md:pr-6">
            <figure className="relative z-10 -rotate-2 bg-white p-3 shadow-[0_12px_35px_-20px_rgba(28,10,51,0.35)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image src="/gallery/community-group-photo.webp" alt="The Evolve AI community gathered in the university auditorium" fill sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover" />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-1 pb-1 pt-4 font-mono text-[10px] uppercase tracking-wider text-ink/65">
                <span>Different minds. Shared energy.</span>
                <span>Chitkara, Punjab</span>
              </figcaption>
            </figure>
            <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-1 rotate-3 bg-lilac" />
          </Reveal>
        </div>
        <dl className="mt-14 grid grid-cols-2 border-t border-ink/20 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col-reverse border-b border-ink/20 py-6 pr-6 md:border-b-0 md:not-first:border-l md:not-first:pl-8">
              <dt className="mt-2 max-w-48 text-sm leading-relaxed text-ink/60">{stat.label}</dt>
              <dd className="font-display text-5xl font-semibold tracking-[-0.05em] md:text-6xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
