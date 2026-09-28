'use client'

import { useState } from 'react'
import { ArrowDownRight, Search, X } from 'lucide-react'
import type { alumni as alumniData } from '@/lib/team'
import { PersonCard } from '@/components/site/person-card'
import { cn } from '@/lib/utils'

export function AlumniBrowser({ batches }: { batches: typeof alumniData }) {
  const [year, setYear] = useState(batches[0].year)
  const [query, setQuery] = useState('')
  const batch = batches.find((item) => item.year === year)!
  const term = query.trim().toLowerCase()
  const members = batch.members.filter((person) => person.name.toLowerCase().includes(term))

  return (
    <section id="alumni-directory" aria-labelledby="alumni-directory-title" className="scroll-mt-28 grid grid-cols-1 gap-10 pt-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <h2 id="alumni-directory-title" className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65">Find your chapter</h2>
        <div role="group" aria-label="Choose an alumni batch" className="mt-5 flex gap-3 lg:flex-col lg:gap-0">
          {batches.map((item) => <button key={item.year} type="button" aria-pressed={item.year === year} onClick={() => { setYear(item.year); setQuery('') }} className={cn('flex min-w-0 flex-1 items-center justify-between gap-2 border-y border-ink/15 px-2 py-5 text-left transition-colors sm:gap-5 sm:px-4 lg:border-t-0 lg:px-0', item.year === year ? 'text-violet' : 'text-ink/45 hover:text-ink')}><span><span className="block font-mono text-[9px] uppercase tracking-widest">Batch of</span><span className="mt-1 block text-4xl font-medium leading-none tracking-[-0.07em] sm:text-6xl">{item.year}</span></span><span className="flex flex-col items-end gap-4"><span className="font-mono text-[10px]">0{item.members.length}</span><ArrowDownRight size={22} className={cn('transition-transform', item.year !== year && '-rotate-45')} aria-hidden="true" /></span></button>)}
        </div>
        <p className="mt-7 hidden max-w-48 text-sm leading-relaxed text-ink/60 lg:block">The first ideas.<br />The late-night builds.<br />The people we won&apos;t forget.</p>
      </aside>
      <div>
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-ink/20 pb-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-wider text-violet">The Evolve AI yearbook</p><h2 className="mt-2 text-4xl font-medium tracking-[-0.05em]">Class of {year}<span className="ml-3 align-top font-mono text-xs text-ink/45">[{String(batch.members.length).padStart(2, '0')}]</span></h2></div><div className="flex items-center border-b border-ink/30 sm:w-48"><Search size={15} aria-hidden="true" className="shrink-0 text-ink/50" /><label htmlFor="alumni-search" className="sr-only">Search this alumni batch</label><input id="alumni-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a familiar face" className="min-w-0 flex-1 bg-transparent px-2 py-3 text-xs outline-none placeholder:text-ink/50" />{query && <button onClick={() => setQuery('')} type="button" className="p-2" aria-label="Clear alumni search"><X size={14} /></button>}</div></div>
        <p role="status" aria-live="polite" className="mb-5 font-mono text-[10px] uppercase tracking-wider text-ink/60">{members.length} {members.length === 1 ? 'alumnus' : 'alumni'}{term ? ` matching “${query.trim()}”` : ` · Batch ${year}`}</p>
        {members.length ? <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:gap-x-6">{members.map((person, index) => <li key={`${year}-${person.name}`}><div aria-hidden="true" className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-ink/45"><span>EA / {year}</span><span>{String(index + 1).padStart(2, '0')}</span></div><PersonCard person={{ ...person, role: `Class of ${year}` }} /></li>)}</ul> : <div className="py-20 text-center"><p className="text-2xl font-medium tracking-tight">No matches in this chapter.</p><p className="mt-3 text-sm text-ink/60">Try a different name or choose another batch.</p><button type="button" onClick={() => setQuery('')} className="mt-6 border-b border-ink pb-1 text-sm font-medium">Clear search</button></div>}
      </div>
    </section>
  )
}
