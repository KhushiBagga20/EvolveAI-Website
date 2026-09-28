import { Reveal, SectionLabel } from './reveal'

export function PageHero({
  index,
  label,
  title,
  accent,
  description,
  children,
}: {
  index: string
  label: string
  title: string
  accent: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <header className="relative flex flex-col gap-6 pb-14">
      <div aria-hidden="true" className="grid-lines mask-fade-b pointer-events-none absolute -inset-x-20 -top-40 -z-10 h-[520px]" />
      <Reveal>
        <SectionLabel index={index}>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="max-w-4xl text-balance text-6xl font-bold leading-[0.9] tracking-[-0.05em] text-ink md:text-8xl">
          {title} <span className="text-iridescent">{accent}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink/70">{description}</p>
      </Reveal>
      {children && <Reveal delay={0.15}>{children}</Reveal>}
    </header>
  )
}
