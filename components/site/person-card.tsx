import Image from 'next/image'
import type { Person } from '@/lib/team'
import { cn } from '@/lib/utils'

export function PersonCard({ person, size = 'md', tag, className }: { person: Person; size?: 'md' | 'sm'; tag?: string; className?: string }) {
  return (
    <figure className={cn('group min-w-0', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#e6e1ed]">
        <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw" className="object-cover object-top saturate-[0.8] transition-[transform,filter] duration-500 group-hover:scale-[1.035] group-hover:saturate-100" />
        {tag && <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] bg-[#f8f7f2] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-ink">{tag}</span>}
      </div>
      <figcaption className="border-t border-ink/20 pb-2 pt-3 mt-3">
        <h3 className={cn('font-medium leading-snug tracking-tight text-ink', size === 'md' ? 'text-lg md:text-xl' : 'text-base md:text-lg')}>{person.name}</h3>
        {person.role && <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{person.role}</p>}
      </figcaption>
    </figure>
  )
}
