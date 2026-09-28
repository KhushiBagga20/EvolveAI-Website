import Image from 'next/image'
import type { Person } from '@/lib/team'

export function ExecutiveGroups({ executives }: { executives: Person[] }) {
  const groups = executives.reduce<Record<string, Person[]>>((acc, person) => {
    const key = person.role ?? 'Executive'
    ;(acc[key] ??= []).push(person)
    return acc
  }, {})

  return (
    <div className="space-y-14">
      {Object.entries(groups).map(([role, people]) => (
        <div key={role}>
          <div className="mb-6 flex items-baseline gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">{role.replace(' Executive', '')}</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
              {String(people.length).padStart(2, '0')} {people.length === 1 ? 'executive' : 'executives'}
            </span>
          </div>
          <div className="flex flex-wrap justify-start gap-5">
            {people.map((person) => (
              <div
                key={person.name}
                className="group relative w-[calc(50%-0.625rem)] overflow-hidden rounded-2xl shadow-lg sm:w-[calc(33.33%-0.85rem)] lg:w-[calc(25%-0.95rem)]"
              >
                <div className="relative aspect-[3/4] bg-lilac">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <h4 className="truncate text-sm font-semibold leading-tight text-white md:text-base">
                    {person.name}
                  </h4>
                  <p className="mt-0.5 truncate text-xs text-white/70">
                    {role.replace(' Executive', '')} Executive
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
