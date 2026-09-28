import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from '@/components/site/reveal'
import { formatDate, type ClubEvent } from '@/lib/events'
import { socials } from '@/lib/data'

export function EventsHero({ live, counts }: { live?: ClubEvent; counts: { label: string; value: number }[] }) {
  const instagram = socials.find((s) => s.label === 'Instagram')!

  return (
    <header className="mx-auto max-w-6xl pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
        <SectionLabel index="EV">Events &amp; programme</SectionLabel>
        <a href="#programme" className="flex items-center gap-2 text-xs text-ink/65 transition-colors hover:text-violet">
          Browse the programme <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div>
          <h1 className="text-[clamp(3.4rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
            Built on
            <br />
            <span className="text-iridescent">stage.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
            Two or three big ones a year, done properly. Hackathons, expert talks, workshops and competitions — here&apos;s what&apos;s live and everything we&apos;ve run.
          </p>
        </div>

        <section aria-labelledby="live-title" className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-white md:p-7">
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-magenta/30 blur-[90px]" />
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60">
                <span className={live ? 'size-2 animate-pulse rounded-full bg-emerald-400' : 'size-2 rounded-full bg-white/40'} aria-hidden="true" />
                {live ? 'Live now' : 'Live status'}
              </p>
              <h2 id="live-title" className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {live ? live.title : <>Nothing live <span className="text-white/45">right now.</span></>}
              </h2>
              <p className="mt-2 font-mono text-xs text-white/55">{live ? formatDate(live.date) : 'The next drop is being cooked.'}</p>
            </div>
            <span aria-hidden="true" className="relative mt-1 grid size-16 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full border border-white/15" />
              <span className="absolute inset-3 rounded-full border border-white/15" />
              <span className="absolute inset-0 animate-spin-slow rounded-full [background:conic-gradient(from_0deg,transparent_0deg,rgba(139,61,255,0.6)_70deg,transparent_72deg)]" />
              <span className="bg-iridescent relative size-2.5 rounded-full" />
            </span>
          </div>
          {live ? (
            <Link href={live.registerUrl ?? `/events/${live.slug}`} className="relative mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lilac">
              Register now <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="relative mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lilac">
              Get notified on Instagram <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </section>
      </div>

      <dl className="mt-12 grid grid-cols-2 border-y border-ink/20 sm:grid-cols-3 md:grid-cols-5">
        {counts.map((c, i) => (
          <div key={c.label} className={`flex flex-col-reverse py-5 ${i > 0 ? 'sm:border-l sm:border-ink/20 sm:pl-5' : ''} ${i % 2 === 1 ? 'border-l border-ink/20 pl-4' : ''}`}>
            <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/55">{c.label}</dt>
            <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{String(c.value).padStart(2, '0')}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
