import Link from 'next/link'
import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={cn('size-6', className)}>
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4f8bff" />
          <stop offset="0.5" stopColor="#8b3dff" />
          <stop offset="1" stopColor="#e23fcf" />
        </linearGradient>
      </defs>
      <g fill="url(#brand-grad)">
        <path d="M0 0H13V13H0Z" />
        <path d="M15 13V0A13 13 0 0 1 28 13Z" />
        <path d="M6.5 15H13V21.5A6.5 6.5 0 0 1 6.5 28A6.5 6.5 0 0 1 0 21.5A6.5 6.5 0 0 1 6.5 15Z" />
        <circle cx="21.5" cy="21.5" r="6.5" />
      </g>
    </svg>
  )
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Evolve AI home"
      className={cn('group inline-flex items-center gap-2.5 font-bold tracking-tight text-ink', className)}
    >
      <BrandMark className="transition-transform duration-500 group-hover:rotate-90" />
      <span className="text-lg">
        Evolve<span className="text-iridescent">AI</span>
      </span>
    </Link>
  )
}
