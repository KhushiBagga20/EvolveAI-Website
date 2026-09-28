import Image from 'next/image'
import { Plus } from 'lucide-react'
import type { Faculty } from '@/lib/team'

export function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-lilac/30">
        <Image src={faculty.photo} alt={`Portrait of ${faculty.name}`} fill sizes="(min-width: 768px) 30vw, 95vw" className="object-cover object-[center_25%]" />
        <span className="absolute left-3 top-3 bg-[#f8f7f2] px-2 py-1 font-mono text-[10px]">Mentor / 0{index + 1}</span>
      </div>
      <div className="pt-5"><p className="font-mono text-[10px] uppercase tracking-wider text-violet">{faculty.role}</p><h3 className="mt-2 text-2xl font-medium tracking-tight">{faculty.name}</h3><p className="mt-4 text-sm leading-relaxed text-ink/65">{faculty.bio[1]}</p></div>
      <details className="group mt-5 border-y border-ink/20"><summary className="flex items-center justify-between gap-3 py-3 text-xs font-medium [&::-webkit-details-marker]:hidden">About {faculty.name}<Plus size={15} className="shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" /></summary><p className="pb-5 text-sm leading-relaxed text-ink/65">{faculty.bio[0]}</p></details>
    </article>
  )
}
