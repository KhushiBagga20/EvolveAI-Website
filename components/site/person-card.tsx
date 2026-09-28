import Image from 'next/image'
import type { Person } from '@/lib/team'
import { cn } from '@/lib/utils'

export function PersonCard({
  person,
  size = 'md',
  tag,
  className,
}: {
  person: Person
  size?: 'md' | 'sm'
  tag?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'group relative overflow-hidden bg-white/60 ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(60,20,120,0.55)]',
        size === 'md' ? 'rounded-[26px]' : 'rounded-[20px]',
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-lilac/40">
        <Image
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          fill
          sizes={size === 'md' ? '(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw' : '(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw'}
          className="object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span
          aria-hidden="true"
          className="bg-iridescent absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        />
        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink backdrop-blur">
            {tag}
          </span>
        )}
        <figcaption className={cn('absolute inset-x-0 bottom-0 text-white', size === 'md' ? 'p-5' : 'p-3.5')}>
          <p className={cn('font-semibold leading-tight tracking-tight', size === 'md' ? 'text-lg' : 'text-sm')}>{person.name}</p>
          {person.role && (
            <p className={cn('mt-1 font-mono uppercase tracking-widest text-white/65', size === 'md' ? 'text-[11px]' : 'text-[10px]')}>
              {person.role}
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  )
}
