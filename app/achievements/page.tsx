import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Flag, Handshake, Megaphone, type LucideIcon } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { achievements, achievementStats, type AchievementCategory } from '@/lib/achievements'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Awards, partnerships and milestones from Evolve AI, the AI tech club of Chitkara University.',
}

const categoryIcon: Record<AchievementCategory, LucideIcon> = {
  Award,
  Milestone: Flag,
  Partnership: Handshake,
  Hosted: Megaphone,
}

export default function AchievementsPage() {
  const [featured, ...rest] = achievements
  const years = [...new Set(rest.map((a) => a.year))]

  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <PageHero
          index="AC"
          label="Achievements"
          title="Proof of"
          accent="work."
          description="Awards, industry partnerships and milestones — the record of what the club has built since 2021."
        />

        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {achievementStats.map((s, i) => (
            <Reveal key={s.value} delay={0.05 * i}>
              <div className={cn('flex h-full flex-col justify-between gap-8 rounded-[28px] p-6', i === 0 ? 'bg-ink text-white' : 'glass')}>
                <dd className={cn('text-5xl font-bold tracking-tighter md:text-6xl', i === 0 ? 'text-iridescent' : 'text-ink')}>{s.value}</dd>
                <dt className={cn('text-pretty text-sm leading-relaxed', i === 0 ? 'text-white/65' : 'text-ink/60')}>{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-4">
          <article className="relative grid overflow-hidden rounded-[36px] bg-ink text-white md:grid-cols-[1fr_380px]">
            <div aria-hidden="true" className="absolute -left-20 -top-20 size-96 rounded-full bg-violet/40 blur-[110px]" />
            <div className="relative flex flex-col justify-between gap-10 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="bg-iridescent rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest">Latest</span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                  {featured.year} · {featured.category}
                </span>
              </div>
              <div>
                <h2 className="max-w-lg text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{featured.title}</h2>
                <p className="mt-4 max-w-lg text-pretty leading-relaxed text-white/70">{featured.description}</p>
              </div>
            </div>
            {featured.image && (
              <div className="relative aspect-[3/4] md:aspect-auto">
                <Image src={featured.image} alt={featured.imageAlt ?? ''} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
              </div>
            )}
          </article>
        </Reveal>

        <section aria-labelledby="timeline-title" className="mt-24">
          <h2 id="timeline-title" className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            The record, year by year
          </h2>

          <ol className="mt-12 flex flex-col">
            {years.map((year) => (
              <li key={year} className="grid gap-6 border-t border-ink/10 py-10 md:grid-cols-[200px_1fr]">
                <p
                  className="text-6xl font-bold tracking-tighter text-transparent md:sticky md:top-32 md:self-start md:text-7xl"
                  style={{ WebkitTextStroke: '1.5px var(--ink)' }}
                >
                  {year}
                </p>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {rest
                    .filter((a) => a.year === year)
                    .map((a, i) => {
                      const Icon = categoryIcon[a.category]
                      return (
                        <li key={a.title} className={cn(a.image && 'sm:col-span-2')}>
                          <Reveal delay={0.05 * i}>
                            <article
                              className={cn(
                                'glass group flex h-full overflow-hidden rounded-[28px]',
                                a.image ? 'flex-col sm:flex-row' : 'flex-col',
                              )}
                            >
                              {a.image && (
                                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-2/5">
                                  <Image
                                    src={a.image}
                                    alt={a.imageAlt ?? ''}
                                    fill
                                    sizes="(min-width: 768px) 30vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                </div>
                              )}
                              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink/70">
                                  <Icon className="size-3.5 text-violet" aria-hidden="true" />
                                  {a.category}
                                </p>
                                <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{a.title}</h3>
                                <p className="text-pretty leading-relaxed text-ink/65">{a.description}</p>
                              </div>
                            </article>
                          </Reveal>
                        </li>
                      )
                    })}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
