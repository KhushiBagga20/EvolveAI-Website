import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { leads, teamCount } from '@/lib/team'
import { projects } from '@/lib/projects'
import { achievements } from '@/lib/achievements'
import { pastEvents } from '@/lib/events'

const faces = leads.slice(0, 5)

export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="04">Inside the club</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="explore-title" className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            People, projects and <span className="text-iridescent">proof of work.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <Link href="/team" className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-7 text-white md:p-9">
              <div aria-hidden="true" className="absolute -right-24 -top-24 size-80 rounded-full bg-violet/40 blur-[90px]" />
              <div className="relative flex items-start justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Team</p>
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-6xl font-bold tracking-tighter md:text-7xl">{teamCount}+</p>
                  <p className="mt-2 max-w-xs text-white/60">Students across technical, research, media, content, graphics and ops.</p>
                </div>
                <div className="flex -space-x-3" aria-hidden="true">
                  {faces.map((m) => (
                    <Image
                      key={m.name}
                      src={m.photo}
                      alt=""
                      width={96}
                      height={96}
                      className="size-14 rounded-full border-2 border-ink object-cover object-top transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.05}>
            <Link href="/achievements" className="glass group flex h-full min-h-72 flex-col justify-between rounded-[32px] p-7">
              <div className="flex items-start justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Achievements</p>
                <ArrowUpRight className="size-5 text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <div>
                <p className="text-6xl font-bold tracking-tighter text-ink">{achievements.length}</p>
                <p className="mt-2 text-ink/60">Awards, partnerships and milestones since 2021.</p>
              </div>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.1}>
            <Link href="/projects" className="glass group flex h-full min-h-60 flex-col justify-between rounded-[32px] p-7">
              <div className="flex items-start justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Projects</p>
                <ArrowUpRight className="size-5 text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-sm text-violet">
                  {projects.filter((p) => p.stage === 'current').length} in progress
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">Built by members, not for marks.</p>
              </div>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.15}>
            <Link href="/alumni" className="glass group flex h-full min-h-60 flex-col justify-between rounded-[32px] p-7">
              <div className="flex items-start justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Alumni</p>
                <ArrowUpRight className="size-5 text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-ink">The founders who started it all.</p>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.2}>
            <Link href="/events" className="group relative flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-[32px] p-7 text-white">
              <Image src={pastEvents[0].poster} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              <div className="relative flex items-start justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Events archive</p>
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="relative text-2xl font-semibold tracking-tight">Every hackathon, talk and workshop.</p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
