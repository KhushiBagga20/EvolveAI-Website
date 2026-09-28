import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { AlumniBrowser } from '@/components/alumni/alumni-browser'
import { alumni } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Alumni',
  description: 'The founding batches of Evolve AI — the alumni whose vision turned ideas into a tech club.',
}

export default function AlumniPage() {
  const total = alumni.reduce((n, b) => n + b.members.length, 0)
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <PageHero
          index="AL"
          label="Alumni"
          title="Where it"
          accent="all began."
          description="Every journey has an origin story. Our alumni are the foundation Evolve AI stands on — their vision turned ideas into reality, and their legacy still guides how we build."
        >
          <p className="font-mono text-sm text-ink/60">
            <span className="text-violet">{total}</span> alumni <span className="text-ink/30">·</span>{' '}
            <span className="text-violet">{alumni.length}</span> founding batches
          </p>
        </PageHero>
        <AlumniBrowser batches={alumni} />
      </div>
    </div>
  )
}
