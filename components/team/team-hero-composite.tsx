'use client'

import Image from 'next/image'
import { ArrowDownLeft } from 'lucide-react'

export function TeamHeroComposite() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] select-none lg:mr-0">
      {/* 
        Container with fixed proportional aspect-ratio matching the reference mockup
        ViewBox scale: 600 width x 530 height
      */}
      <div className="relative aspect-[1.12/1] w-full">
        {/* =========================================================================
            BACKGROUND GUIDE LINES & CONCENTRIC ARCS
           ========================================================================= */}
        {/* Concentric Wireframe Arcs (Upper-Left) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-[-4%] top-[12%] h-[60%] w-[60%] opacity-40"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle cx="120" cy="150" r="55" stroke="#5E17EB" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="120" cy="150" r="95" stroke="#5E17EB" strokeWidth="1.2" />
          <circle cx="120" cy="150" r="140" stroke="#5E17EB" strokeWidth="1.2" strokeDasharray="5 5" />
        </svg>

        {/* Vertical Center Axis Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[49.5%] top-0 w-px bg-[#5E17EB]/25"
        />

        {/* Right Vertical Accent Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] right-[11.5%] top-[14%] w-px bg-[#5E17EB]/30"
        />

        {/* Horizontal Dividing Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[12%] right-[-4%] top-[77.5%] h-px bg-[#5E17EB]/25"
        />

        {/* =========================================================================
            1. TOP PHOTO (Students collaborating around a laptop)
           ========================================================================= */}
        <div className="absolute left-[17%] top-[14%] h-[28.5%] w-[32.5%] overflow-hidden rounded-[18px] bg-[#1c0a33] shadow-md transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/gallery/judging-round.webp"
            alt="Students collaborating at Evolve AI"
            fill
            sizes="240px"
            className="object-cover object-center grayscale contrast-125 brightness-95"
            priority
          />
          {/* Subtle gradient overlay to match monochrome grain */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120428]/40 via-transparent to-transparent" />
        </div>

        {/* =========================================================================
            2. TOP-RIGHT DARK QUARTER CIRCLE (Textured indigo)
           ========================================================================= */}
        <div
          className="absolute left-[49.5%] top-[14%] h-[18.5%] w-[14.5%] rounded-tr-full bg-gradient-to-br from-[#2D0D5E] via-[#1B053C] to-[#0F0224] shadow-inner transition-transform duration-500 hover:scale-[1.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 0%, #431688 0%, #170433 100%)`,
          }}
        >
          {/* Grain texture overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* =========================================================================
            3. PALE LAVENDER CIRCLE
           ========================================================================= */}
        <div className="absolute left-[58%] top-[26%] size-[11.5%] rounded-full bg-[#E5DCFF] transition-transform duration-500 hover:scale-110" />

        {/* =========================================================================
            4. RIGHT VERTICAL PILLAR ("IDEAS / PEOPLE / BUILD / IMPACT")
           ========================================================================= */}
        <div className="absolute left-[64%] top-[26%] flex h-[38%] w-[24.5%] flex-col items-center justify-center rounded-r-[36px] bg-[#ECE5FF] p-4 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
          <div className="flex flex-col gap-2.5 text-center font-mono text-[9px] font-semibold tracking-[0.22em] text-[#5E17EB]/85 sm:text-[11px] md:text-[11.5px]">
            <span>IDEAS</span>
            <span>PEOPLE</span>
            <span>BUILD</span>
            <span>IMPACT</span>
          </div>
        </div>

        {/* =========================================================================
            5. CENTER MAIN STAGE PHOTO ("Evolve Ai" Stage Presentation)
           ========================================================================= */}
        <div className="absolute left-[25.5%] top-[42.5%] h-[53%] w-[38.5%] overflow-hidden rounded-tl-[86px] bg-[#120524] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/gallery/genesis-gala-performance.webp"
            alt="Evolve AI event stage presentation"
            fill
            sizes="300px"
            className="object-cover object-bottom grayscale contrast-125 brightness-90"
          />
          {/* Dark duotone gradient and stage atmosphere */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120428] via-[#120428]/40 to-transparent" />

          {/* Illuminated Evolve Ai Logo on the Stage Screen */}
          <div className="absolute inset-x-0 top-[26%] flex flex-col items-center justify-center px-4 text-center">
            <div className="flex items-center gap-1.5 drop-shadow-[0_4px_16px_rgba(255,255,255,0.7)]">
              <span className="font-display text-lg font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                Evolve
              </span>
              {/* Evolve brand mark icon */}
              <svg viewBox="0 0 28 28" className="size-4 text-white sm:size-5" fill="currentColor">
                <circle cx="14" cy="9" r="6" />
                <path d="M14 15a8 8 0 1 0 0 12 8 8 0 0 0 0-12z" />
              </svg>
              <span className="font-display text-lg font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                i
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            6. MIDDLE-LEFT SOLID PURPLE CARD ("COMMUNITY / PROJECTS / LEARNING / GROWTH")
           ========================================================================= */}
        <div className="absolute left-[0%] top-[49.5%] flex h-[36.5%] w-[25.5%] flex-col justify-between rounded-bl-[12px] rounded-br-[36px] rounded-tl-[36px] rounded-tr-[12px] bg-[#5E17EB] p-4 text-white shadow-xl transition-transform duration-500 hover:scale-[1.03] sm:p-5">
          <ArrowDownLeft size={20} className="text-white/80" strokeWidth={2.2} />
          <div className="flex flex-col gap-1.5 font-mono text-[8px] font-semibold tracking-[0.18em] text-white/90 sm:text-[9.5px]">
            <span>COMMUNITY</span>
            <span>PROJECTS</span>
            <span>LEARNING</span>
            <span>GROWTH</span>
          </div>
        </div>

        {/* =========================================================================
            7. BOTTOM-CENTER LAVENDER FAN / GRADIENT SHAPE
           ========================================================================= */}
        <div className="pointer-events-none absolute left-[23.5%] top-[77.5%] h-[22.5%] w-[27.5%] rounded-bl-full bg-gradient-to-br from-[#D9CCFF] via-[#E8DEFF] to-[#FAF8FF]/40 shadow-sm" />

        {/* =========================================================================
            8. BOTTOM-RIGHT DARK TEXTURED QUARTER-CIRCLE / FAN
           ========================================================================= */}
        <div
          className="absolute left-[64%] top-[70%] h-[30%] w-[27.5%] rounded-br-full bg-gradient-to-br from-[#2D0D5E] via-[#1B053C] to-[#0F0224] shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 0% 0%, #3B1278 0%, #15032E 100%)`,
          }}
        >
          {/* Stippled noise texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* =========================================================================
            9. DOT MATRIX GRID (Right)
           ========================================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[56%] grid grid-cols-6 gap-x-2 gap-y-2 opacity-50"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="size-1 rounded-full bg-[#5E17EB]" />
          ))}
        </div>

        {/* =========================================================================
            10. FLOATING VIBRANT SOLID PURPLE SPHERES
           ========================================================================= */}
        {/* Left Floating Sphere (Over wireframe rings) */}
        <div className="absolute left-[9.5%] top-[37%] size-[8.5%] rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#5512DF] shadow-[0_8px_22px_rgba(94,23,235,0.45)] transition-transform duration-500 hover:scale-110" />

        {/* Right Floating Sphere (In front of dot matrix) */}
        <div className="absolute left-[64%] top-[58.5%] size-[14%] rounded-full bg-[#5E17EB] shadow-[0_12px_28px_rgba(94,23,235,0.5)] transition-transform duration-500 hover:scale-110" />
      </div>
    </div>
  )
}
