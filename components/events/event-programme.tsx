'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, type ClubEvent, type EventKind } from '@/lib/events'
import { cn } from '@/lib/utils'

function dateParts(iso?: string) {
  if (!iso) return null
  return {
    day: formatDate(iso, { day: '2-digit' }),
    month: formatDate(iso, { month: 'short' }),
    year: formatDate(iso, { year: 'numeric' }),
  }
}

export function EventProgramme({ events }: { events: ClubEvent[] }) {
  const kinds = Array.from(new Set(events.map((e) => e.kind)))
  const [filter, setFilter] = useState<EventKind | 'All'>('All')
  const [hovered, setHovered] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 28 })
  const y = useSpring(my, { stiffness: 260, damping: 28 })

  const visible = filter === 'All' ? events : events.filter((e) => e.kind === filter)
  const preview = events.find((e) => e.slug === hovered)

  function onMove(event: React.PointerEvent<HTMLOListElement>) {
    if (event.pointerType !== 'mouse' || !listRef.current) return
    const rect = listRef.current.getBoundingClientRect()
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  return (
    <div>
      <div role="group" aria-label="Filter events by type" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {(['All', ...kinds] as const).map((k) => {
          const count = k === 'All' ? events.length : events.filter((e) => e.kind === k).length
          const selected = filter === k
          return (
            <button
              key={k}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(k)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                selected ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white/60 text-ink/75 hover:border-ink/40 hover:text-ink',
              )}
            >
              {k === 'All' ? 'Everything' : k}
              <span className={cn('font-mono text-[10px]', selected ? 'text-white/60' : 'text-ink/40')}>{String(count).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>

      <ol ref={listRef} onPointerMove={onMove} onPointerLeave={() => setHovered(null)} className="relative mt-8 border-t border-ink/20">
        {visible.map((event) => {
          const d = dateParts(event.date)
          return (
            <li key={event.slug} className="border-b border-ink/20">
              <Link
                href={`/events/${event.slug}`}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(event.slug)}
                onFocus={() => setHovered(null)}
                className="group grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 py-5 transition-colors hover:text-violet sm:grid-cols-[92px_minmax(0,1fr)_auto] md:grid-cols-[120px_minmax(0,1fr)_200px_auto] md:gap-6 md:py-6"
              >
                <span className="flex flex-col leading-none">
                  {d ? (
                    <>
                      <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{d.day}</span>
                      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/55">
                        {d.month} {d.year}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-display text-3xl font-semibold tracking-tight text-ink/25 md:text-5xl">—</span>
                      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/55">Archive</span>
                    </>
                  )}
                </span>

                <span className="flex min-w-0 items-center gap-4">
                  <span className="relative hidden h-16 w-12 shrink-0 overflow-hidden rounded-md bg-ink sm:block md:hidden">
                    <Image src={event.poster} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-pretty font-display text-xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{event.title}</span>
                    {event.partner && <span className="mt-1.5 block truncate text-xs text-ink/55">with {event.partner}</span>}
                  </span>
                </span>

                <span className="hidden md:block">
                  <span className="inline-flex rounded-full border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink/70 transition-colors group-hover:border-violet/40 group-hover:text-violet">{event.kind}</span>
                </span>

                <span className="grid size-10 place-items-center rounded-full border border-ink/15 transition-all group-hover:border-violet group-hover:bg-violet group-hover:text-white md:size-12">
                  <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:rotate-45" />
                  <span className="sr-only">Open {event.title}</span>
                </span>
              </Link>
            </li>
          )
        })}

        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
          >
            <div
              className={cn(
                'relative -translate-x-1/2 -translate-y-[60%] h-64 w-48 overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-25px_rgba(28,10,51,0.7)] transition-[opacity,transform] duration-300',
                preview ? 'rotate-[-4deg] scale-100 opacity-100' : 'rotate-0 scale-75 opacity-0',
              )}
            >
              {events.map((e) => (
                <Image key={e.slug} src={e.poster} alt="" fill sizes="192px" className={cn('object-cover transition-opacity duration-300', preview?.slug === e.slug ? 'opacity-100' : 'opacity-0')} />
              ))}
            </div>
          </motion.div>
        )}
      </ol>
    </div>
  )
}
