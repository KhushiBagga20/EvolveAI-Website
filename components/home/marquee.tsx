import { BrandMark } from '@/components/site/brand'
import { cn } from '@/lib/utils'

export function Marquee({
  items,
  reverse = false,
  variant = 'dark',
  className,
}: {
  items: readonly string[]
  reverse?: boolean
  variant?: 'dark' | 'light'
  className?: string
}) {
  const row = [...items, ...items]
  return (
    <div
      className={cn(
        'mask-fade-x relative flex overflow-hidden py-5',
        variant === 'dark' ? 'bg-ink text-white' : 'text-ink',
        className,
      )}
    >
      <ul
        className={cn(
          'flex w-max shrink-0 items-center gap-10 pr-10 hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {row.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 whitespace-nowrap text-2xl font-semibold tracking-tight md:text-4xl"
          >
            {item}
            <BrandMark className="size-5 md:size-6" />
          </li>
        ))}
      </ul>
    </div>
  )
}
