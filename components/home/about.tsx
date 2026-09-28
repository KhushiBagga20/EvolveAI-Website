import Image from 'next/image'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { stats } from '@/lib/data'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="01">Who we are</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="about-title"
            className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl"
          >
            A student-driven community exploring{' '}
            <span className="text-iridescent">artificial intelligence</span>, technology and creativity — by learning and
            building <em className="font-medium not-italic underline decoration-violet decoration-wavy decoration-2 underline-offset-8">together.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={0.08 * i}>
              <div className="glass group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[28px] p-6 transition-transform duration-500 hover:-translate-y-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-5xl font-bold tracking-tighter text-ink md:text-6xl">{s.value}</p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink/60">{s.label}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="bg-iridescent absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-4">
          <div className="relative grid overflow-hidden rounded-[32px] bg-ink text-white md:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 flex flex-col justify-center gap-5 p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Our motive</p>
              <p className="text-pretty text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                Empower future AI leaders with exceptional opportunities to learn, grow and contribute in the dynamic
                realm of AI.
              </p>
              <p className="text-sm leading-relaxed text-white/60">
                Guided by Dr. Sushil Kumar Narang, and driven by Dr. Kamal Deep Garg and Dr. Vandana Sood.
              </p>
            </div>
            <div className="relative min-h-72">
              <Image
                src="/gallery/community-group-photo.webp"
                alt="A large group of Evolve AI members in an auditorium"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent md:via-ink/10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
