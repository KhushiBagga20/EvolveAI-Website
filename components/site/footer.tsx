import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Brand } from './brand'
import { navLinks, socials } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-violet/40 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 size-[480px] rounded-full bg-magenta/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Brand className="text-white [&_span]:text-white" />
            <p className="max-w-sm text-pretty leading-relaxed text-white/60">
              The student-driven AI community at Chitkara University. Hackathons, workshops, expert talks and
              real-world projects — since 2021.
            </p>
            <Link
              href="/events"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lilac"
            >
              Browse upcoming events
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/40">Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-white/80 transition-colors hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <address className="mt-6 not-italic leading-relaxed text-white/50">
              Chitkara University
              <br />
              NH-64, Rajpura, Punjab 140401
            </address>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 select-none text-center text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent md:text-[17vw] lg:text-[15rem]"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}
        >
          EVOLVE
        </p>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/50 md:flex-row md:items-center">
          <p>© 2026 Evolve AI, Chitkara University.</p>
          <p className="font-mono text-xs uppercase tracking-widest">Where innovation meets evolution</p>
        </div>
      </div>
    </footer>
  )
}
