import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { stats } from '@/lib/data'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 bg-[#f8f7f2] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-8 border-t border-ink/20 pt-5 md:flex-row md:justify-between">
          <SectionLabel index="01">The human side of AI</SectionLabel>
          <p className="max-w-64 text-sm leading-relaxed text-ink/65">A little curiosity. A lot of collaboration. Something bigger than a classroom.</p>
        </Reveal>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 id="about-title" className="text-[clamp(3rem,6.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.065em]">Serious about AI.<br /><span className="text-violet">Even more<br />about people.</span></h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">We&apos;re the students who stay after the workshop. Who turn a &ldquo;what if&rdquo; into a weekend project. At Chitkara University, we learn artificial intelligence by making things — together.</p>
            <Link href="/team" className="mt-7 inline-flex items-center gap-8 border-b border-ink pb-2 text-sm font-medium transition-colors hover:text-violet">Get to know us <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </Reveal>
          <Reveal className="relative pb-7 pr-4 md:pr-7">
            <figure className="relative z-10 -rotate-2 bg-white p-3 shadow-[0_12px_35px_-20px_rgba(28,10,51,0.35)]">
              <div className="relative aspect-[5/4] overflow-hidden"><Image src="/gallery/community-group-photo.webp" alt="The Evolve AI community gathered in the university auditorium" fill sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover" /></div>
              <figcaption className="flex items-center justify-between gap-3 px-1 pb-1 pt-4 font-mono text-[10px] uppercase tracking-wider text-ink/65"><span>Different minds. Shared energy.</span><span>Chitkara, Punjab</span></figcaption>
            </figure>
            <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-1 rotate-3 bg-lilac" />
          </Reveal>
        </div>
        <dl className="mt-20 grid grid-cols-2 border-t border-ink/20 md:grid-cols-4">
          {stats.map((stat) => <div key={stat.value} className="border-b border-ink/20 py-7 pr-6 md:border-b-0 md:not-first:border-l md:not-first:pl-8"><dd className="text-5xl font-medium tracking-[-0.06em] md:text-6xl">{stat.value}</dd><dt className="mt-3 max-w-48 text-sm leading-relaxed text-ink/60">{stat.label}</dt></div>)}
        </dl>
      </div>
    </section>
  )
}
