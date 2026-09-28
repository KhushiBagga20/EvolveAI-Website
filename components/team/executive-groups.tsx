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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
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

  // Fallback quote
  const quote = 'Turning moments into stories.'

  return (
    <article className="group relative w-full max-w-[280px] overflow-hidden rounded-[28px] border border-white bg-white p-3.5 shadow-[0_8px_30px_rgba(50,25,90,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(70,35,120,0.12)]">
      {/* Active Status */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-1.5">
        <span className="h-[7px] w-[7px] rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        <span className="text-[11px] font-medium text-slate-500">Active</span>
      </div>

      {/* Image Area */}
      <div className="relative h-[240px] w-full overflow-hidden rounded-t-[22px]">
        {/* Person */}
        <div className="absolute inset-0 z-10 flex justify-center transition-transform duration-500 group-hover:scale-[1.03]">
          <Image
            src={person.photo}
            alt={person.name}
            width={400}
            height={400}
            priority={index !== undefined && index < 4}
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        {/* Department Badge */}
        <div
          className={`absolute bottom-2 left-3 z-20 flex items-center gap-1.5 rounded-full ${config.bg} px-3 py-1.5 shadow-sm backdrop-blur-md`}
        >
          <DepartmentIcon size={13} strokeWidth={2.2} className={config.color} />
          <span className={`text-[11px] font-semibold tracking-tight ${config.color}`}>{department}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col px-1.5 pt-3">
        <h3 className="text-[19px] font-extrabold tracking-tight text-[#1c0a33]">{person.name}</h3>
        <p className="mt-0.5 text-[13px] font-semibold text-slate-500">{person.role}</p>

        {/* Quote */}
        <div className="mt-2.5">
          <p className="text-[12.5px] italic leading-tight text-slate-400">“{quote}”</p>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between pb-1">
          {/* Social Links */}
          <div className="flex items-center gap-1.5">
            <a
              href="#"
              className="flex size-[34px] items-center justify-center rounded-full bg-slate-50 text-indigo-900/60 transition-all hover:bg-indigo-900 hover:text-white"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="#"
              className="flex size-[34px] items-center justify-center rounded-full bg-slate-50 text-indigo-900/60 transition-all hover:bg-indigo-900 hover:text-white"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              className="flex size-[34px] items-center justify-center rounded-full bg-slate-50 text-indigo-900/60 transition-all hover:bg-indigo-900 hover:text-white"
            >
              <Mail size={14} />
            </a>
          </div>

          {/* View Button */}
          <button className="flex size-[42px] items-center justify-center rounded-full bg-[#27114d] text-white shadow-md shadow-[#27114d]/20 transition-all duration-300 hover:scale-105 hover:bg-[#3d1b7a]">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
