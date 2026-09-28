'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { alumni as alumniData } from '@/lib/team'
import { PersonCard } from '@/components/site/person-card'
import { cn } from '@/lib/utils'

export function AlumniBrowser({ batches }: { batches: typeof alumniData }) {
  const [year, setYear] = useState(batches[0].year)
  const batch = batches.find((b) => b.year === year)!

  return (
    <section aria-labelledby="batch-title" className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <h2 id="batch-title" className="sr-only">
          Batch of {year}
        </h2>
        <div role="tablist" aria-label="Choose a batch" className="flex gap-3 lg:flex-col">
          {batches.map((b) => {
            const selected = b.year === year
            return (
              <button
                key={b.year}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setYear(b.year)}
                className={cn(
                  'group relative flex flex-1 items-end justify-between overflow-hidden rounded-[24px] px-5 py-4 text-left transition-all lg:flex-none',
                  selected ? 'bg-ink text-white shadow-[0_24px_50px_-24px_rgba(60,20,120,0.8)]' : 'glass text-ink hover:bg-white',
                )}
              >
                <span>
                  <span className={cn('block font-mono text-[11px] uppercase tracking-widest', selected ? 'text-white/50' : 'text-ink/45')}>Batch</span>
                  <span className="block text-4xl font-bold tracking-tighter md:text-5xl">{b.year}</span>
                </span>
                <span className={cn('font-mono text-xs', selected ? 'text-white/60' : 'text-ink/45')}>{b.members.length} people</span>
                {selected && <span aria-hidden="true" className="bg-iridescent absolute inset-x-0 bottom-0 h-1" />}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={year}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
        >
          {batch.members.map((m, i) => (
            <motion.li key={m.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
              <PersonCard person={{ ...m, role: `Class of ${year}` }} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  )
}
