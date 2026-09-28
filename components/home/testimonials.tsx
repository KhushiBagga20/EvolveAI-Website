import { Reveal, SectionLabel } from '@/components/site/reveal'
import { testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'

const tones = ['glass text-ink', 'bg-ink text-white', 'bg-iridescent text-white', 'glass text-ink']

export function Testimonials() {
  return (
    <section aria-labelledby="voices-title" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionLabel index="06">Community</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="voices-title" className="mt-6 text-balance text-5xl font-semibold tracking-tight text-ink md:text-6xl">
              Built by people, <span className="text-iridescent">not prompts.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-ink/70">
              {"Evolve AI isn't just technology. It's the people in the room — asking questions, judging, performing, building."}
            </p>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-4">
          {testimonials.map((t, i) => (
            <li key={t.name} className={cn('flex', i % 2 === 1 ? 'justify-end' : 'justify-start')}>
              <Reveal delay={0.05 * i} className="w-full max-w-lg">
                <figure
                  className={cn(
                    'flex flex-col gap-5 rounded-[28px] p-6 md:p-7',
                    i % 2 === 1 ? 'rounded-br-md' : 'rounded-bl-md',
                    tones[i % tones.length],
                  )}
                >
                  <blockquote className="text-pretty text-lg leading-relaxed">
                    <p>{`"${t.quote}"`}</p>
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-10 items-center justify-center rounded-full font-semibold',
                        i % tones.length === 0 || i % tones.length === 3 ? 'bg-ink text-white' : 'bg-white/20 text-white',
                      )}
                    >
                      {t.name[0]}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{t.name}</span>
                      <span className="font-mono text-xs opacity-60">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
