'use client'

import Image from 'next/image'
import type { Person } from '@/lib/team'
import { cn } from '@/lib/utils'

const deptStyle: Record<string, { blob: string; badge: string; badgeText: string; icon: string; deco: React.ReactNode }> = {
  Media: {
    blob: 'bg-[#d5c8f7]',
    badge: 'bg-violet/10',
    badgeText: 'text-violet',
    icon: '📸',
    deco: (
      <svg className="absolute left-[8%] top-[12%] size-10 text-white/40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M10 8L18 16" /><path d="M18 8L10 16" />
        <path d="M24 8L32 16" /><path d="M32 8L24 16" />
      </svg>
    ),
  },
  Content: {
    blob: 'bg-[#bdd6fb]',
    badge: 'bg-sky/10',
    badgeText: 'text-sky',
    icon: '✏️',
    deco: (
      <svg className="absolute left-[10%] top-[10%] size-10 text-white/40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M8 12L16 8" /><path d="M8 18L20 12" /><path d="M8 24L16 20" />
      </svg>
    ),
  },
  Operations: {
    blob: 'bg-[#fad7a8]',
    badge: 'bg-amber-500/10',
    badgeText: 'text-amber-600',
    icon: '⚙️',
    deco: (
      <svg className="absolute right-[15%] top-[10%] size-8 text-amber-400/50" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M16 4L20 12L28 14L22 20L23 28L16 24L9 28L10 20L4 14L12 12Z" />
      </svg>
    ),
  },
}

export function ExecutiveGroups({ executives }: { executives: Person[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
      {executives.map((person) => {
        const dept = (person.role ?? 'Media Executive').replace(' Executive', '')
        const style = deptStyle[dept] ?? deptStyle.Media
        return <ExecCard key={person.name} person={person} dept={dept} style={style} />
      })}
    </div>
  )
}

function ExecCard({
  person,
  dept,
  style,
}: {
  person: Person
  dept: string
  style: typeof deptStyle.Media
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] bg-white p-3.5 shadow-[0_4px_24px_-8px_rgba(28,10,51,0.08)] ring-1 ring-ink/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-10px_rgba(28,10,51,0.15)] md:rounded-[28px] md:p-4">
      {/* ── Photo area ── */}
      <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px]">
        {/* Photo */}
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
          className="relative z-10 object-cover object-bottom"
        />

        {/* Active badge */}
        <span className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-medium text-ink/70 shadow-sm ring-1 ring-ink/[0.04]">
          <span className="size-[6px] rounded-full bg-[#10b981]" />
          Active
        </span>

        {/* Department badge */}
        <span
          className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2c1b54]/80 to-[#4a2b8e]/80 px-3 py-1.5 text-[11.5px] font-semibold text-white shadow-md backdrop-blur-md ring-1 ring-white/10"
        >
          <span className="text-[11px] opacity-90">{style.icon}</span>
          {dept}
        </span>
      </div>

      {/* ── Info ── */}
      <div className="mt-4 flex-1 px-1">
        <h4 className="truncate text-[17px] font-bold tracking-tight text-ink md:text-[19px]">{person.name}</h4>
        <p className={cn('mt-0.5 text-[13px] font-medium', style.badgeText)}>{dept} Executive</p>
      </div>

      {/* ── Bottom row ── */}
      <div className="mt-4 flex items-center justify-between px-1 pb-1">
        {/* Social icons */}
        <div className="flex items-center gap-2.5">
          <span className="flex size-[34px] items-center justify-center rounded-full bg-[#f4f4f5] text-ink/40 transition-colors hover:bg-violet/10 hover:text-violet">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </span>
          <span className="flex size-[34px] items-center justify-center rounded-full bg-[#f4f4f5] text-ink/40 transition-colors hover:bg-violet/10 hover:text-violet">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </span>
        </div>

        {/* Arrow button */}
        <span className="flex size-10 items-center justify-center rounded-full bg-[#1c0a33] text-white shadow-md transition-all group-hover:bg-violet group-hover:shadow-violet/25">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  )
}
