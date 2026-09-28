'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Search } from 'lucide-react'
import { EventCard } from './event-card'
import type { ClubEvent, EventType } from '@/lib/data'
import { cn } from '@/lib/utils'

const types: ('All' | EventType)[] = ['All', 'Hackathon', 'Workshop', 'Expert Talk', 'Tech Event']
const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
] as const

export function EventsBrowser({ events }: { events: ClubEvent[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('upcoming')
  const [type, setType] = useState<(typeof types)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      const inTab = tab === 'past' ? e.status === 'past' : e.status !== 'past'
      const inType = type === 'All' || e.type === type
      const inQuery = !q || e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q)
      return inTab && inType && inQuery
    })
  }, [events, tab, type, query])

  return (
    <div className="flex flex-col gap-8">
      <div className="glass flex flex-col gap-3 rounded-[28px] p-2 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Event timeframe" className="flex gap-1 rounded-full bg-ink/5 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className="relative rounded-full px-5 py-2 text-sm font-semibold"
            >
              {tab === t.id && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
              )}
              <span className={cn('relative', tab === t.id ? 'text-white' : 'text-ink/70')}>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-1" aria-label="Filter by type">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={cn(
                'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
                type === t ? 'bg-iridescent text-white' : 'text-ink/70 hover:bg-white/70',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <label className="relative flex items-center lg:w-64">
          <span className="sr-only">Search events</span>
          <Search className="pointer-events-none absolute left-4 size-4 text-ink/40" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events"
            className="w-full rounded-full bg-white/80 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 outline-none focus:ring-4 focus:ring-violet/20"
          />
        </label>
      </div>

      <motion.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((e) => (
            <motion.li
              key={e.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard event={e} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="glass flex flex-col items-center gap-2 rounded-[28px] px-6 py-16 text-center">
          <p className="text-xl font-semibold text-ink">Nothing here yet.</p>
          <p className="text-sm text-ink/60">Try another filter — or follow us on Instagram for drops.</p>
        </div>
      )}
    </div>
  )
}
