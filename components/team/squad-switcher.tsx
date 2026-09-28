import type { squads as squadsData } from '@/lib/team'
import { MemberPass } from './member-pass'
import { cn } from '@/lib/utils'

const accents: Record<string, string> = {
  Technical: 'bg-violet',
  Research: 'bg-sky',
  Media: 'bg-magenta',
  Content: 'bg-lilac',
  Graphics: 'bg-primary',
  Operations: 'bg-ink',
}

const glows: Record<string, string> = {
  Technical: 'from-violet/20 to-violet/5',
  Research: 'from-sky/20 to-sky/5',
  Media: 'from-magenta/20 to-magenta/5',
  Content: 'from-lilac/30 to-lilac/10',
  Graphics: 'from-primary/20 to-primary/5',
  Operations: 'from-ink/10 to-ink/5',
}

export function SquadSwitcher({ squads }: { squads: typeof squadsData }) {
  return (
    <div className="space-y-24">
      {squads.map((squad, squadIndex) => (
        <div key={squad.name} className="relative">
          {/* Decorative background blob */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -left-20 -top-16 size-72 rounded-full bg-gradient-radial opacity-60 blur-3xl',
              glows[squad.name],
            )}
            style={{
              background: `radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%, transparent 100%)`,
            }}
          />
          {/* Subtle grid pattern behind cards */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-8 h-64 w-80 opacity-[0.03] grid-lines" />

          <div className="relative grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
            {/* Left — Squad info */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-widest text-violet">
                Squad {String(squadIndex + 1).padStart(2, '0')} / {String(squads.length).padStart(2, '0')}
              </p>
              <h3 className="mt-3 text-5xl font-semibold leading-none tracking-[-0.045em] md:text-6xl">
                {squad.name}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/65">{squad.blurb}</p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-lilac/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/70">
                <span className={cn('size-2 rounded-full', accents[squad.name])} aria-hidden="true" />
                {squad.members.length} members
              </p>
              {/* Decorative line */}
              <div className="mt-8 hidden h-px w-full bg-gradient-to-r from-ink/15 to-transparent lg:block" />
            </div>

            {/* Right — Member pass cards */}
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {squad.members.map((person, i) => (
                <li key={person.name}>
                  <MemberPass
                    person={person}
                    code={`EA-${squad.name.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(2, '0')}`}
                    label={`${squad.name} squad`}
                    accent={accents[squad.name]}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom divider between squads */}
          {squadIndex < squads.length - 1 && (
            <div aria-hidden="true" className="mx-auto mt-20 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
              <span className={cn('size-1.5 rounded-full', accents[squad.name])} />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
