import { Reveal, SectionLabel } from '@/components/site/reveal'
import { timeline } from '@/lib/data'
import { cn } from '@/lib/utils'

const shapes = [
  'rounded-none',
  'rounded-tr-full',
  'rounded-tr-full rounded-bl-full',
  'rounded-tl-full rounded-tr-full rounded-bl-full',
  'rounded-full',
]

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-24 px-5 pb-12 pt-16 md:px-8 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">Our story</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="story-title" className="mt-6 text-5xl font-semibold tracking-tight text-ink md:text-7xl">
                How we <span className="text-iridescent">evolved.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-pretty leading-relaxed text-ink/70">
              A square that keeps growing corners. Every year, the shape gets a little more interesting.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12">
        <div
          aria-hidden="true"
          className="bg-iridescent absolute left-6 top-0 h-full w-px opacity-40 md:left-0 md:top-[27px] md:h-px md:w-full"
        />
        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-4">
          {timeline.map((t, i) => {
            const now = i === timeline.length - 1
            return (
              <li key={t.year} className="relative pl-16 md:pl-0">
                <Reveal delay={0.1 * i}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'bg-iridescent absolute left-0 top-0 block size-12 shadow-lg md:relative md:size-14',
                      shapes[i],
                      now && 'animate-spin-slow',
                    )}
                  />
                  <div className="md:mt-6">
                    <p className="font-mono text-sm text-violet">{t.year}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-ink">{t.title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-ink/60">{t.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
        </div>
      </div>
    </section>
  )
}
