'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bot, Braces, Database, Eye, Globe, type LucideIcon } from 'lucide-react'
import type { Project, ProjectStage } from '@/lib/projects'
import { cn } from '@/lib/utils'

const domainIcon: Record<Project['domain'], LucideIcon> = {
  LLMs: Braces,
  Vision: Eye,
  Agents: Bot,
  Data: Database,
  Web: Globe,
}

const tabs: { id: ProjectStage; label: string; hint: string }[] = [
  { id: 'current', label: 'Current projects', hint: 'in development' },
  { id: 'future', label: 'Future enhancements', hint: 'on the roadmap' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = domainIcon[project.domain]
  return (
    <article className="glass group relative flex h-full flex-col gap-6 overflow-hidden rounded-[28px] p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7">
      <div
        aria-hidden="true"
        className="bg-iridescent absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
      />
      <div className="relative flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-white">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="relative flex flex-1 flex-col gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-violet">
          {project.domain} <span className="text-ink/30">/</span> {project.status}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="font-medium text-ink/80">{project.tagline}</p>
        <p className="text-pretty text-sm leading-relaxed text-ink/60">{project.description}</p>
      </div>

      {project.progress !== undefined && (
        <div className="relative">
          <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-widest text-ink/50">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${project.title} progress`}>
            <motion.div
              className="bg-iridescent h-full rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
            />
          </div>
        </div>
      )}

      <ul className="relative flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <li key={t} className="rounded-md border border-ink/10 bg-white/70 px-2 py-0.5 font-mono text-[11px] text-ink/70">
            {t}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [stage, setStage] = useState<ProjectStage>('current')
  const visible = projects.filter((p) => p.stage === stage)

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Project stage" className="grid gap-3 sm:grid-cols-2">
        {tabs.map((t) => {
          const selected = t.id === stage
          const count = projects.filter((p) => p.stage === t.id).length
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setStage(t.id)}
              className={cn(
                'flex items-center justify-between rounded-[24px] px-6 py-5 text-left transition-all',
                selected ? 'bg-ink text-white shadow-[0_24px_50px_-24px_rgba(60,20,120,0.8)]' : 'glass text-ink hover:bg-white',
              )}
            >
              <span>
                <span className="block text-xl font-semibold tracking-tight">{t.label}</span>
                <span className={cn('font-mono text-xs', selected ? 'text-white/55' : 'text-ink/50')}>{`// ${t.hint}`}</span>
              </span>
              <span className={cn('text-4xl font-bold tracking-tighter', selected ? 'text-iridescent' : 'text-ink/25')}>
                {String(count).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={stage}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <p className="glass rounded-[24px] px-6 py-5 text-pretty text-ink/70">
        <span className="font-semibold text-ink">Have an idea?</span> Members can pitch a project any time — the Technical
        and Research squads help scope it, and faculty mentors review progress.
      </p>
    </div>
  )
}
