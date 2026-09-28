import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Radio } from 'lucide-react'
import { formatDate, type ClubEvent } from '@/lib/events'
import { socials } from '@/lib/data'

export function LiveStatus({ live }: { live: ClubEvent[] }) {
  if (live.length > 0) {
    const e = live[0]
    return (
      <section aria-labelledby="live-title" className="relative grid overflow-hidden rounded-[36px] bg-ink text-white md:grid-cols-[1fr_340px]">
        <div aria-hidden="true" className="absolute -left-24 -top-24 size-96 rounded-full bg-violet/40 blur-[110px]" />
        <div className="relative flex flex-col justify-between gap-8 p-8 md:p-12">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-emerald-300">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            Live now
          </p>
          <div>
            <h2 id="live-title" className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">{e.title}</h2>
            <p className="mt-3 font-mono text-sm text-white/60">{formatDate(e.date)}</p>
          </div>
          <Link
            href={e.registerUrl ?? `/events/${e.slug}`}
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-lilac"
          >
            Register now
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="relative aspect-[3/4] md:aspect-auto">
          <Image src={e.poster} alt={`${e.title} poster`} fill sizes="340px" className="object-cover" />
        </div>
      </section>
    )
  }

  const instagram = socials.find((s) => s.label === 'Instagram')!

  return (
    <section aria-labelledby="live-title" className="relative overflow-hidden rounded-[36px] bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div aria-hidden="true" className="absolute -right-20 -top-20 size-96 rounded-full bg-magenta/30 blur-[110px]" />

      <div className="relative grid items-center gap-10 p-8 md:grid-cols-[1fr_auto] md:p-12">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/70">
            <Radio className="size-3.5" aria-hidden="true" />
            Live status
          </p>
          <h2 id="live-title" className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            No live events <span className="text-white/40">right now.</span>
          </h2>
          <div className="font-mono text-sm leading-7 text-white/60">
            <p>
              <span className="text-emerald-300">~/events</span> <span className="text-white/40">$</span> evolve status --live
            </p>
            <p>
              <span className="text-amber-300">0</span> events found. next drop is being cooked.
            </p>
          </div>
          <p className="max-w-lg text-pretty text-white/70">
            Stay tuned for our next event. Meanwhile, scroll down to see what we&apos;ve been up to.
          </p>
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-lilac"
          >
            Get notified on Instagram
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div aria-hidden="true" className="relative mx-auto hidden size-56 items-center justify-center md:flex">
          <span className="absolute inset-0 rounded-full border border-white/15" />
          <span className="absolute inset-8 rounded-full border border-white/15" />
          <span className="absolute inset-16 rounded-full border border-white/15" />
          <span className="absolute inset-0 animate-spin-slow rounded-full [background:conic-gradient(from_0deg,transparent_0deg,rgba(139,61,255,0.55)_60deg,transparent_62deg)]" />
          <span className="absolute inset-0 rounded-full bg-violet/30 animate-pulse-ring" />
          <span className="bg-iridescent relative size-4 rounded-full" />
        </div>
      </div>
    </section>
  )
}
