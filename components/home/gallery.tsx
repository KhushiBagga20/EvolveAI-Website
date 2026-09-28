import Image from 'next/image'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { gallery } from '@/lib/data'
import { cn } from '@/lib/utils'

const sizes = [
  'w-[78vw] md:w-[520px] aspect-[3/2]',
  'w-[56vw] md:w-[300px] aspect-[3/4]',
  'w-[78vw] md:w-[460px] aspect-[3/2]',
  'w-[78vw] md:w-[420px] aspect-[4/3]',
  'w-[56vw] md:w-[300px] aspect-[3/4]',
  'w-[78vw] md:w-[480px] aspect-[3/2]',
  'w-[56vw] md:w-[300px] aspect-[3/4]',
  'w-[78vw] md:w-[480px] aspect-[3/2]',
]

const radii = ['rounded-[32px]', 'rounded-t-full rounded-b-[32px]', 'rounded-[32px] rounded-tr-[120px]', 'rounded-[32px]', 'rounded-full', 'rounded-[32px] rounded-bl-[120px]', 'rounded-t-full rounded-b-[32px]', 'rounded-[32px]']

export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="05">Memories</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="gallery-title" className="mt-6 max-w-3xl text-balance text-[clamp(2.5rem,10vw,3rem)] font-semibold tracking-tight text-ink md:text-7xl">
                {"Things we've "}
                <span className="text-iridescent">built</span>, run and celebrated.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
              {'Scroll sideways →'}
            </p>
          </Reveal>
        </div>
      </div>

      <div
        className="no-scrollbar mt-14 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto pb-6"
        style={{
          paddingInline: 'max(1.25rem, calc((100vw - 72rem) / 2 + 2rem))',
          scrollPaddingInline: 'max(1.25rem, calc((100vw - 72rem) / 2 + 2rem))',
        }}
      >
        {gallery.map((g, i) => (
          <figure key={g.src} className={cn('group relative shrink-0 snap-start overflow-hidden', sizes[i], radii[i])}>
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(min-width: 768px) 520px, 80vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="glass absolute inset-x-3 bottom-3 flex flex-col rounded-2xl px-4 py-2.5">
              <span className="text-sm font-semibold text-ink">{g.title}</span>
              <span className="font-mono text-[11px] text-ink/60">{g.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
