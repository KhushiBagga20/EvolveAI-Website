import Image from 'next/image'
import { Plus } from 'lucide-react'
import type { Faculty } from '@/lib/team'

export function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-white/10">
        <Image src={faculty.photo} alt={`Portrait of ${faculty.name}`} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-[center_20%]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-[#f8f7f2] px-2.5 py-1 font-mono text-[10px] text-ink">Mentor / 0{index + 1}</span>
      </div>
      <div className="pt-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-lilac">{faculty.role}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{faculty.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{faculty.bio[1]}</p>
      </div>
      <details className="group mt-5 border-y border-white/15">
        <summary className="flex list-none items-center justify-between gap-3 py-3 text-xs font-medium text-white/85 [&::-webkit-details-marker]:hidden">
          More about {faculty.name.replace('Dr. ', '')}
          <Plus size={15} className="shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
        </summary>
        <p className="pb-5 text-sm leading-relaxed text-white/65">{faculty.bio[0]}</p>
      </details>
    </article>
  )
}
