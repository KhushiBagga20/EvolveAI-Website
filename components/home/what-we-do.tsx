import Image from 'next/image'
import { CalendarDays, Code2, MessagesSquare, Mic, Rocket, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { activities } from '@/lib/data'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  events: CalendarDays,
  hackathons: Code2,
  workshops: Wrench,
  talks: Mic,
  projects: Rocket,
  learning: MessagesSquare,
}

const layout: Record<string, string> = {
  hackathons: 'md:col-span-2 md:row-span-2',
  events: '',
  workshops: '',
  talks: 'md:col-span-1',
  projects: 'md:col-span-1',
  learning: 'md:col-span-1',
}

const order = ['hackathons', 'workshops', 'talks', 'events', 'projects', 'learning']

export function WhatWeDo() {
  const sorted = order.map((id) => activities.find((a) => a.id === id)!)

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02">What we do</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="work-title" className="mt-6 text-5xl font-semibold tracking-tight text-ink md:text-7xl">
                Six ways to <span className="text-iridescent">evolve.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-pretty leading-relaxed text-ink/70">
              {"We don't just organise events — we create opportunities. Pick your format, bring your curiosity."}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-3">
          {sorted.map((a, i) => {
            const Icon = icons[a.id]
            const featured = a.id === 'hackathons'
            return (
              <Reveal key={a.id} delay={0.06 * i} className={cn(layout[a.id])}>
                <article
                  className={cn(
                    'group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-all duration-500 hover:-translate-y-1 md:p-7',
                    featured ? 'bg-ink text-white' : 'glass text-ink',
                  )}
                >
                  {featured && (
                    <>
                      <div aria-hidden="true" className="absolute -bottom-10 -right-4 size-80 rounded-full bg-sky/30 blur-3xl" />
                      <Image
                        src="/images/neural-orb.png"
                        alt=""
                        width={1024}
                        height={1024}
                        className="pointer-events-none absolute -bottom-28 -right-24 w-[85%] max-w-[520px] transition-transform duration-700 [mask-image:radial-gradient(closest-side,black_60%,transparent_64%)] group-hover:rotate-12 group-hover:scale-105"
                      />
                      <div aria-hidden="true" className="absolute -left-20 -top-20 size-72 rounded-full bg-violet/40 blur-3xl" />
                    </>
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        'flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-12',
                        featured ? 'bg-iridescent text-white' : 'bg-ink text-white',
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        'rotate-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest',
                        featured ? 'bg-white/10 text-white/80' : 'bg-white/80 text-ink/60',
                      )}
                    >
                      {a.tag}
                    </span>
                  </div>

                  <div className="relative mt-10">
                    <p className={cn('font-mono text-xs', featured ? 'text-white/40' : 'text-ink/40')}>
                      {String(i + 1).padStart(2, '0')} /
                    </p>
                    <h3
                      className={cn(
                        'mt-2 font-semibold tracking-tight',
                        featured ? 'max-w-xs text-4xl md:text-6xl' : 'text-2xl',
                      )}
                    >
                      {a.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-3 text-pretty leading-relaxed',
                        featured ? 'max-w-sm text-white/70' : 'text-sm text-ink/60',
                      )}
                    >
                      {a.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
