import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { ProjectsBrowser } from '@/components/projects/projects-browser'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'What Evolve AI members are building right now, and what is on the roadmap.',
}

export default function ProjectsPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <PageHero
          index="PR"
          label="Projects"
          title="Things we"
          accent="actually ship."
          description="Built by members, reviewed by peers, mentored by faculty. Here's what's in development and what's on the roadmap."
        />
        <ProjectsBrowser projects={projects} />
      </div>
    </div>
  )
}
