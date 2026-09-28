import type { EventStatus } from '@/lib/data'
import { cn } from '@/lib/utils'

const config: Record<EventStatus, { label: string; className: string; dot: string }> = {
  open: { label: 'Registrations open', className: 'bg-white text-ink', dot: 'bg-emerald-500' },
  soon: { label: 'Opening soon', className: 'bg-white/90 text-ink', dot: 'bg-amber-400' },
  closed: { label: 'Closed', className: 'bg-white/90 text-ink/70', dot: 'bg-ink/40' },
  past: { label: 'Past event', className: 'bg-ink/70 text-white', dot: 'bg-white/60' },
}

export function StatusBadge({ status, className }: { status: EventStatus; className?: string }) {
  const c = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur',
        c.className,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', c.dot, status === 'open' && 'animate-pulse')} aria-hidden="true" />
      {c.label}
    </span>
  )
}
