'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { activities } from '@/lib/data'
import { cn } from '@/lib/utils'

const formats = [
  { id: 'hackathons', photo: '/gallery/hackindia-2025-group.webp', caption: 'HackIndia 2025', alt: 'HackIndia participants together at Chitkara University' },
  { id: 'workshops', photo: '/gallery/ai-in-education-workshop-2024.webp', caption: 'AI in Education', alt: 'Participants at the AI in Education workshop' },
  { id: 'talks', photo: '/gallery/expert-session.webp', caption: 'Expert sessions', alt: 'A guest speaker addressing students in a seminar room' },
  { id: 'events', photo: '/gallery/ai-create-2.webp', caption: 'AI-Create 2.0', alt: 'Faculty and guests at AI-Create 2.0' },
  { id: 'projects', photo: '/gallery/project-showcase-drone.webp', caption: 'Project showcase', alt: 'Guests examining a student-built drone' },
  { id: 'learning', photo: '/gallery/qa-round.webp', caption: 'Open discussions', alt: 'A student asking a question in the auditorium' },
]

export function WhatWeDo() {
  const [active, setActive] = useState('hackathons')

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 bg-[#eeeaf8] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="02">Less theory. More doing.</SectionLabel>
            <h2 id="work-title" className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-7xl">
              Find your <span className="text-violet">kind of spark.</span>
            </h2>
          </div>
          <p className="max-w-72 text-sm leading-relaxed text-ink/65">
            Six ways to get involved. No two experiences the same. Bring your curiosity; we&apos;ll bring the people.
          </p>
        </Reveal>

        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:h-[500px] lg:gap-2.5 lg:overflow-visible lg:px-0">
          {formats.map((format, index) => {
            const activity = activities.find((item) => item.id === format.id)!
            const expanded = active === format.id
            const href = format.id === 'projects' ? '/projects' : '/events'
            return (
              <li
                key={format.id}
                onMouseEnter={() => setActive(format.id)}
                onFocus={() => setActive(format.id)}
                onClick={() => setActive(format.id)}
                className={cn(
                  'group relative h-[440px] w-[78vw] max-w-sm shrink-0 snap-start overflow-hidden rounded-[22px] bg-ink text-white sm:w-[46vw] lg:h-full lg:w-auto lg:max-w-none lg:shrink lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.22,0.8,0.24,1)]',
                  expanded ? 'lg:grow-[5]' : 'lg:grow',
                )}
              >
                <Image
                  src={format.photo}
                  alt={format.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 80vw"
                  className={cn('object-cover transition-[transform,filter] duration-700', expanded ? 'lg:scale-100' : 'lg:scale-110 lg:grayscale-[0.6]')}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />

                <span className="absolute left-5 top-5 font-mono text-[11px] tracking-wider text-white/75">0{index + 1}</span>

                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-6 hidden justify-center transition-opacity duration-300 lg:flex',
                    expanded ? 'lg:opacity-0' : 'lg:opacity-100',
                  )}
                >
                  <span className="font-display text-2xl font-semibold tracking-tight [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">{activity.title}</span>
                </div>

                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:p-7 lg:w-[min(100%,440px)] lg:transition-[opacity,transform] lg:duration-500',
                    expanded ? 'lg:translate-y-0 lg:opacity-100 lg:delay-200' : 'lg:pointer-events-none lg:translate-y-4 lg:opacity-0',
                  )}
                >
                  <p className="w-fit rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-md">{format.caption}</p>
                  <h3 className="text-3xl font-semibold leading-none tracking-[-0.03em] md:text-4xl">{activity.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-white/75">{activity.description}</p>
                  <Link
                    href={href}
                    className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-lilac"
                  >
                    {format.id === 'projects' ? 'Explore projects' : 'Explore events'}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink/45 lg:hidden">Swipe to explore</p>
      </div>
    </section>
  )
}
