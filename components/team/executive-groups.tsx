'use client'

import Image from 'next/image'
import type { Person } from '@/lib/team'
import {
  Mail,
  ArrowUpRight,
  Camera,
  FileText,
  Palette,
  Settings,
  Code2,
  FlaskConical,
} from 'lucide-react'

const Linkedin = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)

const Instagram = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

const departmentConfig: Record<
  string,
  {
    icon: React.ElementType
    color: string
    bg: string
    blob: string
  }
> = {
  Media: {
    icon: Camera,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    blob: 'from-[#ddd4ff] to-[#eeeaff]',
  },
  Content: {
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    blob: 'from-[#dceeff] to-[#eff8ff]',
  },
  Graphics: {
    icon: Palette,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    blob: 'from-[#ffdceb] to-[#fff0f7]',
  },
  Operations: {
    icon: Settings,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    blob: 'from-[#ffe8bd] to-[#fff4df]',
  },
  Technical: {
    icon: Code2,
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    blob: 'from-[#d9f4e9] to-[#effcf6]',
  },
  Research: {
    icon: FlaskConical,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    blob: 'from-[#ddd4ff] to-[#eeeaff]',
  },
}

export function ExecutiveGroups({ executives }: { executives: Person[] }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {executives.map((member, idx) => (
        <ExecutiveCard key={member.name} person={member} index={idx} />
      ))}
    </div>
  )
}

function ExecutiveCard({ person, index }: { person: Person; index?: number }) {
  const department = (person.role ?? 'Media Executive').replace(' Executive', '')
  const config = departmentConfig[department] || departmentConfig.Media
  const DepartmentIcon = config.icon

  // Fallback quote since we don't have it in our data yet
  const quote = 'Turning moments into stories.'

  return (
    <article className="group relative w-full max-w-[300px] min-h-[450px] overflow-hidden rounded-[28px] border border-white bg-white p-4 shadow-[0_8px_35px_rgba(50,25,90,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(70,35,120,0.16)]">
      {/* Active Status */}
      <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-xs font-medium text-slate-500">Active</span>
      </div>

      {/* Image Area */}
      <div className="relative h-[230px] w-full overflow-hidden rounded-t-[22px]">
        {/* Abstract Blob */}
        <div
          className={`absolute inset-[12px] rounded-[45%_55%_48%_52%/48%_43%_57%_52%] bg-gradient-to-br ${config.blob} transition-transform duration-700 group-hover:scale-[1.06]`}
        />

        {/* Decorative blob */}
        <div className="absolute -bottom-8 -left-5 h-28 w-36 rounded-full bg-white/25 blur-[1px]" />

        {/* Person */}
        <div className="absolute bottom-0 left-1/2 z-10 h-[215px] w-full -translate-x-1/2 transition-transform duration-500 group-hover:scale-[1.04]">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="250px"
            priority={index !== undefined && index < 4}
            className="object-contain object-bottom"
          />
        </div>

        {/* Department Badge */}
        <div
          className={`absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full ${config.bg} px-3.5 py-2 shadow-sm backdrop-blur-md`}
        >
          <DepartmentIcon size={15} strokeWidth={2.2} className={config.color} />
          <span className={`text-xs font-semibold ${config.color}`}>{department}</span>
        </div>

        {/* Decorative Arrow */}
        <div className="absolute right-8 top-12 z-10 text-purple-500/50 transition-transform duration-500 group-hover:rotate-12">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 28C15 20 20 15 29 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M21 10L30 10L29 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 pt-4">
        <h3 className="text-[21px] font-bold tracking-[-0.03em] text-[#20104d]">{person.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-slate-500">{person.role}</p>

        {/* Quote */}
        <div className="mt-4 min-h-[52px]">
          <p className="text-[13px] italic leading-5 text-slate-500">“ {quote} ”</p>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between">
          {/* Social Links (Placeholders for now since we don't have them in Person type) */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#4b248b] transition-all hover:bg-[#4b248b] hover:text-white"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#4b248b] transition-all hover:bg-[#4b248b] hover:text-white"
            >
              <Instagram size={15} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#4b248b] transition-all hover:bg-[#4b248b] hover:text-white"
            >
              <Mail size={15} />
            </a>
          </div>

          {/* View Button */}
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#30105f] text-white shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-110 hover:bg-[#4c1d95]">
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </article>
  )
}
