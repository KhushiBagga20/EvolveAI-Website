import Image from 'next/image'
import type { Person } from '@/lib/team'
import { cn } from '@/lib/utils'

export function MemberPass({ person, code, label, accent = 'bg-violet', className }: { person: Person; code: string; label: string; accent?: string; className?: string }) {
  return (
    <article className={cn('group relative rounded-[18px] bg-white p-2 shadow-[0_18px_40px_-28px_rgba(28,10,51,0.45)] ring-1 ring-ink/5 transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]', className)}>
      <span aria-hidden="true" className="mx-auto mb-2 mt-0.5 block h-1.5 w-9 rounded-full bg-ink/10" />
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-[#e6e1ed]">
        <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw" className="object-cover object-top saturate-[0.85] transition-[transform,filter] duration-500 group-hover:scale-[1.04] group-hover:saturate-100" />
        <span className={cn('absolute right-2 top-2 size-2.5 rounded-full ring-2 ring-white', accent)} aria-hidden="true" />
      </div>
      <div className="px-1.5 pb-1.5 pt-3">
        <p className="font-mono text-[9px] uppercase tracking-widest text-ink/45">{code}</p>
        <h3 className="mt-1 truncate text-base font-semibold leading-tight tracking-tight md:text-lg">{person.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-dashed border-ink/15 pt-2.5">
          <p className="truncate text-xs text-ink/60">{label}</p>
          <span aria-hidden="true" className="flex h-3 shrink-0 items-stretch gap-[2px]">
            {[2, 1, 3, 1, 2, 1, 1, 3].map((w, i) => (
              <span key={i} className="bg-ink/70" style={{ width: w }} />
            ))}
          </span>
        </div>
      </div>
    </article>
  )
}
