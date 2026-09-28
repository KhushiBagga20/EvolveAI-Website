'use client'

import Image from 'next/image'
import type { Person } from '@/lib/team'

export function LeadRoster({ leads }: { leads: Person[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-5 md:gap-6">
      {leads.map((lead) => (
        <div
          key={lead.name}
          className="group relative w-[calc(50%-0.625rem)] overflow-hidden rounded-2xl shadow-xl sm:w-[calc(33.33%-1rem)] lg:w-[calc(20%-1.2rem)]"
        >
          <div className="relative aspect-[3/4] bg-lilac">
            <Image
              src={lead.photo}
              alt={`Portrait of ${lead.name}`}
              fill
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>

          {/* Glass info overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4">
            <h3 className="truncate text-base font-semibold leading-tight tracking-tight text-white md:text-lg">
              {lead.name}
            </h3>
            <p className="mt-0.5 truncate text-xs font-medium text-white/75 md:text-sm">
              {lead.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
