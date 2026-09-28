'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Person } from '@/lib/team'
import { shapeRadii } from '@/lib/shapes'
import { cn } from '@/lib/utils'

export function LeadRoster({ leads }: { leads: Person[] }) {
  const [active, setActive] = useState(0)
  const current = leads[active]

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-lilac transition-[border-radius] duration-700 ease-[cubic-bezier(0.22,0.8,0.24,1)]"
          style={{ borderRadius: shapeRadii[active % shapeRadii.length] }}
        >
          {leads.map((lead, i) => (
            <Image
              key={lead.name}
              src={lead.photo}
              alt={i === active ? `Portrait of ${lead.name}` : ''}
              fill
              sizes="40vw"
              className={cn('object-cover object-top transition-[opacity,transform] duration-700', i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0')}
            />
          ))}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-ink/60" aria-live="polite">
          <span>{current.role}</span>
          <span>
            {String(active + 1).padStart(2, '0')} / {String(leads.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <ol className="border-t border-ink/20">
        {leads.map((lead, i) => {
          const isActive = i === active
          return (
            <li key={lead.name} className="border-b border-ink/20">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn('group flex w-full items-center gap-4 py-4 text-left transition-colors md:gap-6 md:py-5', isActive ? 'lg:text-violet' : 'text-ink')}
              >
                <span className="w-6 shrink-0 font-mono text-[11px] text-ink/45">{String(i + 1).padStart(2, '0')}</span>
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-lilac lg:hidden">
                  <Image src={lead.photo} alt="" fill sizes="56px" className="object-cover object-top" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-2xl font-semibold tracking-[-0.03em] md:text-4xl">{lead.name}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-ink/55 lg:hidden">{lead.role}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink/55 lg:block">{lead.role}</span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className={cn('hidden shrink-0 transition-all duration-300 lg:block', isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0')}
                />
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
