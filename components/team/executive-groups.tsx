'use client'

import Image from 'next/image'
import type { Person } from '@/lib/team'
import { cn } from '@/lib/utils'

export function ExecutiveGroups({ executives }: { executives: Person[] }) {
  const groups = executives.reduce<Record<string, Person[]>>((acc, person) => {
    const key = person.role ?? 'Executive'
    ;(acc[key] ??= []).push(person)
    return acc
  }, {})

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-ink px-5 py-10 md:rounded-[40px] md:px-10 md:py-14">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines opacity-[0.04]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-1/2 size-96 -translate-y-1/2 rounded-full bg-violet/12 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-magenta/10 blur-[100px]" />

      {/* Decorative floating rings */}
      <div aria-hidden="true" className="pointer-events-none absolute right-12 top-12 size-20 rounded-full border border-white/[0.06]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-8 size-28 rounded-full border border-white/[0.04]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 left-16 size-16 rounded-full border border-white/[0.05]" />

      <div className="relative space-y-10 md:space-y-12">
        {Object.entries(groups).map(([role, people], groupIdx) => {
          const dept = role.replace(' Executive', '')
          return (
            <div key={role}>
              {/* Department label row */}
              <div className="mb-6 flex items-center gap-4">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] text-white/50">
                  {String(groupIdx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-white">{dept}</h3>
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  {people.length} {people.length === 1 ? 'exec' : 'execs'}
                </span>
              </div>

              {/* People — circular portraits, all equal */}
              <div className="flex flex-wrap justify-start gap-x-8 gap-y-6 md:gap-x-10">
                {people.map((person) => (
                  <PersonCircle key={person.name} person={person} dept={dept} />
                ))}
              </div>

              {/* Divider between departments */}
              {groupIdx < Object.keys(groups).length - 1 && (
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent md:mt-12" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PersonCircle({ person, dept }: { person: Person; dept: string }) {
  return (
    <div className="group flex w-20 flex-col items-center gap-3 md:w-24">
      {/* Photo circle */}
      <div className="relative">
        <div className="relative size-20 overflow-hidden rounded-full bg-white/10 ring-2 ring-white/10 transition-all duration-500 group-hover:ring-violet/50 group-hover:ring-4 md:size-24">
          <Image
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="96px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Online-style dot */}
        <span className="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-ink bg-violet md:size-3.5" />
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-xs font-medium leading-tight text-white md:text-sm">{person.name}</p>
        <p className="mt-0.5 text-[10px] text-white/35">{dept}</p>
      </div>
    </div>
  )
}
