import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { Person } from '@/lib/team'
import { SectionLabel } from '@/components/site/reveal'

const fan = [
  { rotate: -14, x: '-58%', y: '10%', z: 1 },
  { rotate: -6, x: '-28%', y: '0%', z: 2 },
  { rotate: 2, x: '0%', y: '-4%', z: 5 },
  { rotate: 9, x: '28%', y: '2%', z: 3 },
  { rotate: 15, x: '56%', y: '12%', z: 2 },
]

export function AlumniHero({ faces, total, batches }: { faces: Person[]; total: number; batches: number }) {
  return (
    <header className="mx-auto max-w-6xl pb-10 pt-28 md:pb-14 md:pt-36">
      <div className="flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
        <SectionLabel index="AL">The alumni yearbook</SectionLabel>
        <Link href="/teams" className="flex items-center gap-2 text-xs text-ink/65 transition-colors hover:text-violet">
          Meet today&apos;s team <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <h1 className="text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Once Evolve.
            <br />
            <span className="text-violet">
              Always
              <br />
              one of us.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65">
            Every journey has an origin story. Our alumni are the foundation Evolve AI stands on — their ideas became our traditions, and their legacy still guides how we build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
            <a href="#chapters" className="inline-flex items-center gap-6 border-b border-ink pb-2 text-sm font-medium transition-colors hover:border-violet hover:text-violet">
              Open the yearbook <ArrowDown size={16} aria-hidden="true" />
            </a>
            <dl className="flex gap-8">
              <div className="flex flex-col-reverse">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/55">Alumni</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight">{String(total).padStart(2, '0')}</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/55">Batches</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight">{String(batches).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto h-[300px] w-full max-w-[520px] sm:h-[380px]">
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-[40%_40%_24px_24px] bg-lilac/70" />
          {faces.slice(0, 5).map((person, i) => {
            const f = fan[i]
            return (
              <figure
                key={person.name}
                className="absolute left-1/2 top-1/2 w-[38%] bg-white p-2 pb-8 shadow-[0_20px_40px_-24px_rgba(28,10,51,0.55)] sm:w-[34%]"
                style={{ transform: `translate(calc(-50% + ${f.x}), calc(-50% + ${f.y})) rotate(${f.rotate}deg)`, zIndex: f.z }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e6e1ed]">
                  <Image src={person.photo} alt="" fill priority={i === 2} sizes="200px" className="object-cover object-top" />
                </div>
                <figcaption className="absolute inset-x-2 bottom-2 truncate text-[11px] font-medium">{person.name}</figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </header>
  )
}
