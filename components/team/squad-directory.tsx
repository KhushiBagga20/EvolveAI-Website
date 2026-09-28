'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Squad, squads as squadsData } from '@/lib/team'
import { PersonCard } from '@/components/site/person-card'
import { cn } from '@/lib/utils'

export function SquadDirectory({ squads }: { squads: typeof squadsData }) {
  const [active, setActive] = useState<Squad | 'All'>('All')
  const visible = active === 'All' ? squads : squads.filter((s) => s.name === active)
  const current = squads.find((s) => s.name === active)

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Filter by squad" className="glass no-scrollbar flex gap-1 overflow-x-auto rounded-full p-1.5">
        {(['All', ...squads.map((s) => s.name)] as const).map((name) => {
          const selected = active === name
          const count = name === 'All' ? squads.reduce((n, s) => n + s.members.length, 0) : squads.find((s) => s.name === name)!.members.length
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(name)}
              className={cn(
                'relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selected ? 'text-white' : 'text-ink/65 hover:text-ink',
              )}
            >
              {selected && (
                <motion.span layoutId="squad-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              <span className="relative">{name}</span>
              <span className={cn('relative font-mono text-[10px]', selected ? 'text-white/60' : 'text-ink/40')}>{count}</span>
            </button>
          )
        })}
      </div>

      {current && <p className="-mt-3 font-mono text-sm text-ink/60">{`// ${current.blurb}`}</p>}

      <AnimatePresence mode="popLayout">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6"
        >
          {visible.flatMap((s) =>
            s.members.map((m) => (
              <li key={`${s.name}-${m.name}`}>
                <PersonCard person={m} size="sm" tag={active === 'All' ? s.name : undefined} />
              </li>
            )),
          )}
        </motion.ul>
      </AnimatePresence>
    </div>
  )
}
