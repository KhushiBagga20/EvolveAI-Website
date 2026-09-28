'use client'

import Image from 'next/image'
import type { Person } from '@/lib/team'
import {
  Mail,
  Camera,
  FileText,
  Palette,
  Settings,
  Code2,
  Star
} from 'lucide-react'

const Linkedin = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)

const departmentConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Media: { icon: Camera, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  'Social Media': { icon: Camera, color: 'text-pink-600', bg: 'bg-pink-50' },
  Content: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  Documentation: { icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50' },
  Graphics: { icon: Palette, color: 'text-pink-600', bg: 'bg-pink-50' },
  Operations: { icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50' },
  Technical: { icon: Code2, color: 'text-teal-700', bg: 'bg-teal-50' },
  Core: { icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
}

export function LeadRoster({ leads }: { leads: Person[] }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {leads.map((lead, idx) => (
        <LeadCard key={lead.name} person={lead} index={idx} />
      ))}
    </div>
  )
}

function LeadCard({ person, index }: { person: Person; index?: number }) {
  let department = 'Core'
  if (person.role && person.role.includes('Head')) {
    department = person.role.replace(' Head', '')
  }

  const config = departmentConfig[department] || departmentConfig.Core
  const DepartmentIcon = config.icon

  const quote = `${person.name}'s POV`

  return (
    <article className="group relative w-full max-w-[280px] overflow-hidden rounded-[28px] border border-white bg-white p-3.5 shadow-[0_8px_30px_rgba(50,25,90,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(70,35,120,0.12)]">
      
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
        <div className="mt-4 flex items-center justify-center pb-1">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex size-[38px] items-center justify-center rounded-full bg-slate-50 text-indigo-900/60 transition-all hover:bg-indigo-900 hover:text-white"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="flex size-[38px] items-center justify-center rounded-full bg-slate-50 text-indigo-900/60 transition-all hover:bg-indigo-900 hover:text-white"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
