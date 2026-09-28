'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { activities } from '@/lib/data'
import { cn } from '@/lib/utils'

const formats = [
  { id: 'hackathons', photo: '/gallery/hackindia-2025-group.webp', caption: 'HackIndia 2025 · Made of late nights & big ideas', alt: 'HackIndia participants together at Chitkara University' },
  { id: 'workshops', photo: '/gallery/ai-in-education-workshop-2024.webp', caption: 'AI in Education · Learning by doing', alt: 'Participants at the AI in Education workshop' },
  { id: 'talks', photo: '/gallery/expert-session.webp', caption: 'Expert sessions · Fresh perspectives, real conversations', alt: 'A guest speaker addressing students in a seminar room' },
  { id: 'events', photo: '/gallery/ai-create-2.webp', caption: 'AI-Create 2.0 · A reason to get together', alt: 'Faculty and guests at AI-Create 2.0' },
  { id: 'projects', photo: '/gallery/project-showcase-drone.webp', caption: 'Project showcase · From an idea to a working prototype', alt: 'Guests examining a student-built drone' },
  { id: 'learning', photo: '/gallery/qa-round.webp', caption: 'Open discussions · Every question belongs here', alt: 'A student asking a question in the auditorium' },
]

export function WhatWeDo() {
  const [active, setActive] = useState('hackathons')
  const selected = formats.find((format) => format.id === active)!
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 bg-[#eeeaf8] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><SectionLabel index="02">Less theory. More doing.</SectionLabel><h2 id="work-title" className="mt-7 text-5xl font-medium leading-none tracking-[-0.055em] md:text-7xl">Find your<br /><span className="text-violet">kind of spark.</span></h2></div>
          <p className="max-w-72 text-sm leading-relaxed text-ink/65">Six ways to get involved. No two experiences the same. Bring your curiosity; we&apos;ll bring the people.</p>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          <figure className="flex flex-col self-start bg-ink p-3 text-white lg:sticky lg:top-28">
            <div className="relative aspect-[5/4] overflow-hidden"><Image key={selected.id} src={selected.photo} alt={selected.alt} fill sizes="(min-width: 1024px) 48vw, 95vw" className="object-cover" /></div>
            <figcaption className="flex items-center justify-between gap-6 px-2 py-5"><span className="max-w-80 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/80">{selected.caption}</span><ArrowUpRight aria-hidden="true" className="size-6 shrink-0 text-lilac" /></figcaption>
          </figure>
          <div className="border-t border-ink/20">
            {formats.map((format, index) => {
              const activity = activities.find((item) => item.id === format.id)!
              const expanded = active === format.id
              return <div key={format.id} className="border-b border-ink/20">
                <h3><button type="button" onClick={() => setActive(format.id)} aria-expanded={expanded} aria-controls={`format-${format.id}`} className={cn('flex w-full items-center gap-5 py-5 text-left transition-colors hover:text-violet', expanded && 'text-violet')}><span className="font-mono text-[11px] text-ink/50">0{index + 1}</span><span className="flex-1 text-2xl font-medium tracking-tight md:text-3xl">{activity.title}</span>{expanded ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}</button></h3>
                <div id={`format-${format.id}`} hidden={!expanded} className="pb-6 pl-9"><p className="max-w-sm text-sm leading-relaxed text-ink/65">{activity.description}</p><Link href={format.id === 'projects' ? '/projects' : '/events'} className="mt-5 inline-flex items-center gap-6 text-sm font-medium hover:text-violet">{format.id === 'projects' ? 'Explore our projects' : 'Explore our events'}<ArrowRight size={16} aria-hidden="true" /></Link></div>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
