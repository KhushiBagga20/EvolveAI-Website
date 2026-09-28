import Image from 'next/image'
import type { Faculty } from '@/lib/team'
import { cn } from '@/lib/utils'

export function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  const flipped = index % 2 === 1
  return (
    <article className="glass group grid overflow-hidden rounded-[32px] md:grid-cols-[320px_1fr]">
      <div className={cn('relative aspect-[4/5] overflow-hidden bg-lilac/40 md:aspect-auto md:min-h-[360px]', flipped && 'md:order-2')}>
        <Image
          src={faculty.photo}
          alt={`Portrait of ${faculty.name}`}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="relative flex flex-col justify-between gap-8 p-7 md:p-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-2 select-none text-[9rem] font-bold leading-none tracking-tighter text-ink/[0.05] md:text-[12rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative">
          <p className="inline-flex rounded-full bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">{faculty.role}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{faculty.name}</h3>
        </div>
        <div className="relative flex max-w-2xl flex-col gap-3 text-pretty leading-relaxed text-ink/70">
          {faculty.bio.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
