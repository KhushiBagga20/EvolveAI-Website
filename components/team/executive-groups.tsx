import Image from 'next/image'
import type { Person } from '@/lib/team'

export function ExecutiveGroups({ executives }: { executives: Person[] }) {
  const groups = executives.reduce<Record<string, Person[]>>((acc, person) => {
    const key = person.role ?? 'Executive'
    ;(acc[key] ??= []).push(person)
    return acc
  }, {})

  return (
    <div className="border-t border-ink/20">
      {Object.entries(groups).map(([role, people]) => (
        <div key={role} className="grid gap-4 border-b border-ink/20 py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
          <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
            <h3 className="text-xl font-semibold tracking-tight">{role.replace(' Executive', '')}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
              {String(people.length).padStart(2, '0')} {people.length === 1 ? 'executive' : 'executives'}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {people.map((person) => (
              <li key={person.name} className="group flex items-center gap-3 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-5 transition-colors hover:border-violet/40 hover:bg-lilac/40">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-lilac">
                  <Image src={person.photo} alt={`Portrait of ${person.name}`} fill sizes="44px" className="object-cover object-top" />
                </span>
                <span className="text-sm font-medium">{person.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
