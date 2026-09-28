'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import type { Person, squads as squadsData } from '@/lib/team'
import { PersonCard } from '@/components/site/person-card'
import { cn } from '@/lib/utils'

type Category = 'Everyone' | 'Leads' | 'Executives' | 'Squads'

export function SquadDirectory({ squads, leads, executives }: { squads: typeof squadsData; leads: Person[]; executives: Person[] }) {
  const [category, setCategory] = useState<Category>('Everyone')
  const [squad, setSquad] = useState('All squads')
  const [query, setQuery] = useState('')
  const groups = [
    { name: 'Leads', label: 'Leading the way', category: 'Leads', description: 'The people setting the direction — and bringing everyone along.', members: leads },
    { name: 'Executives', label: 'Making it happen', category: 'Executives', description: 'Behind every event, post and good idea is someone making it work.', members: executives },
    ...squads.map((item) => ({ ...item, label: item.name, category: 'Squads', description: item.blurb, members: item.members.map((member) => ({ ...member, role: `${item.name} squad` })) })),
  ]
  const term = query.trim().toLowerCase()
  const visible = groups.filter((group) => (category === 'Everyone' || group.category === category) && (category !== 'Squads' || squad === 'All squads' || group.name === squad)).map((group) => ({ ...group, members: group.members.filter((member) => `${member.name} ${member.role ?? ''} ${group.name}`.toLowerCase().includes(term)) })).filter((group) => group.members.length > 0)
  const count = visible.reduce((total, group) => total + group.members.length, 0)
  const counts = { Everyone: groups.reduce((total, group) => total + group.members.length, 0), Leads: leads.length, Executives: executives.length, Squads: squads.reduce((total, group) => total + group.members.length, 0) }

  function reset() { setQuery(''); setCategory('Everyone'); setSquad('All squads') }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 border-y border-ink/20 py-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter team members">
          {(['Everyone', 'Leads', 'Executives', 'Squads'] as const).map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={cn('flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors', category === item ? 'bg-ink text-white' : 'text-ink/65 hover:bg-lilac/50')}><span>{item}</span><span className={cn('font-mono text-[10px]', category === item ? 'text-white/65' : 'text-ink/45')}>{counts[item]}</span></button>)}
        </div>
        <div className="relative flex items-center border-b border-ink/30 lg:w-64"><Search size={16} className="shrink-0 text-ink/50" aria-hidden="true" /><label htmlFor="team-search" className="sr-only">Search team members</label><input id="team-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a name or a role" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-ink/50" />{query && <button type="button" onClick={() => setQuery('')} className="p-2" aria-label="Clear team search"><X size={15} /></button>}</div>
      </div>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" role="status" className="font-mono text-[10px] uppercase tracking-wider text-ink/60">{count} {count === 1 ? 'person' : 'people'}{term ? ` matching “${query.trim()}”` : ' to get to know'}</p>
        {category === 'Squads' && <div className="flex items-center gap-3"><label htmlFor="squad-filter" className="text-xs text-ink/60">Choose a squad</label><select id="squad-filter" value={squad} onChange={(event) => setSquad(event.target.value)} className="rounded-sm border border-ink/20 bg-transparent px-3 py-2 text-sm"><option>All squads</option>{squads.map((item) => <option key={item.name}>{item.name}</option>)}</select></div>}
      </div>
      {visible.length ? <div className="space-y-12">{visible.map((group) => <section key={group.name} aria-label={group.name}><div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><h3 className="text-2xl font-medium tracking-tight">{group.label}<span className="ml-3 align-top font-mono text-[10px] text-violet">{String(group.members.length).padStart(2, '0')}</span></h3><p className="max-w-96 text-sm leading-relaxed text-ink/60">{group.description}</p></div><ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">{group.members.map((person) => <li key={person.name}><PersonCard person={person} /></li>)}</ul></section>)}</div> : <div className="border-b border-ink/20 py-20 text-center"><p className="text-2xl font-medium tracking-tight">No familiar faces just yet.</p><p className="mt-3 text-sm text-ink/60">Try another name, role, or squad.</p><button onClick={reset} type="button" className="mt-6 border-b border-ink pb-1 text-sm font-medium">Clear all filters</button></div>}
    </div>
  )
}
