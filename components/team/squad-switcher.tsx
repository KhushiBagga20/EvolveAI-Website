'use client'

import { useState } from 'react'
import type { squads as squadsData } from '@/lib/team'
import { MemberPass } from './member-pass'
import { cn } from '@/lib/utils'

const accents: Record<string, string> = {
  Technical: 'bg-violet',
  Research: 'bg-sky',
  Media: 'bg-magenta',
  Content: 'bg-lilac',
  Graphics: 'bg-primary',
  Operations: 'bg-ink',
}

export function SquadSwitcher({ squads }: { squads: typeof squadsData }) {
  const [active, setActive] = useState(squads[0].name)
  const squad = squads.find((s) => s.name === active)!
  const index = squads.findIndex((s) => s.name === active)

  return (
    <div>
      <div role="tablist" aria-label="Squads" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {squads.map((s) => {
          const selected = s.name === active
          return (
            <button
              key={s.name}
              type="button"
              role="tab"
              id={`tab-${s.name}`}
              aria-selected={selected}
              aria-controls={`panel-${s.name}`}
              onClick={() => setActive(s.name)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
                selected ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white/60 text-ink/75 hover:border-ink/40 hover:text-ink',
              )}
            >
              <span className={cn('size-2 rounded-full', accents[s.name])} aria-hidden="true" />
              {s.name}
              <span className={cn('font-mono text-[10px]', selected ? 'text-white/60' : 'text-ink/40')}>{String(s.members.length).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`panel-${squad.name}`} aria-labelledby={`tab-${squad.name}`} className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-widest text-violet">Squad {String(index + 1).padStart(2, '0')} / 06</p>
          <h3 className="mt-3 text-5xl font-semibold leading-none tracking-[-0.045em] md:text-6xl">{squad.name}</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/65">{squad.blurb}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-lilac/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/70">
            <span className={cn('size-2 rounded-full', accents[squad.name])} aria-hidden="true" />
            {squad.members.length} members
          </p>
        </div>
        <ul key={squad.name} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {squad.members.map((person, i) => (
            <li key={person.name} className="animate-[pass-in_0.6s_cubic-bezier(0.22,0.8,0.24,1)_both]" style={{ animationDelay: `${i * 50}ms` }}>
              <MemberPass
                person={person}
                code={`EA-${squad.name.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(2, '0')}`}
                label={`${squad.name} squad`}
                accent={accents[squad.name]}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
