'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now)
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    mins: Math.floor((ms / 60_000) % 60),
    secs: Math.floor((ms / 1000) % 60),
  }
}

export function Countdown({ to, variant = 'light', className }: { to: string; variant?: 'light' | 'dark'; className?: string }) {
  const target = new Date(to).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const t = now === null ? null : diff(target, now)
  const units = [
    { label: 'days', value: t?.days },
    { label: 'hrs', value: t?.hours },
    { label: 'min', value: t?.mins },
    { label: 'sec', value: t?.secs },
  ]

  return (
    <div className={cn('grid grid-cols-4 gap-2', className)} role="timer" aria-label="Time until event starts">
      {units.map((u) => (
        <div
          key={u.label}
          className={cn(
            'flex flex-col items-center rounded-2xl px-2 py-3',
            variant === 'dark' ? 'glass-dark text-white' : 'bg-white/80 text-ink',
          )}
        >
          <span className="font-mono text-2xl font-semibold tabular-nums md:text-3xl">
            {u.value === undefined ? '--' : String(u.value).padStart(2, '0')}
          </span>
          <span className={cn('font-mono text-[10px] uppercase tracking-widest', variant === 'dark' ? 'text-white/50' : 'text-ink/50')}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
