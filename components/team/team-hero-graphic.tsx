'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type CornerPoint = 'tr' | 'tl' | 'br' | 'bl'
type PetalColor = 'violet' | 'lilac' | 'sky'

interface Petal {
  id: number
  corner: CornerPoint
  color: PetalColor
}

// 4x4 Grid matching the Evolve AI brand petal mosaic
const initialPetals: Petal[] = [
  // Row 1
  { id: 0, corner: 'tr', color: 'violet' },
  { id: 1, corner: 'bl', color: 'lilac' },
  { id: 2, corner: 'tr', color: 'violet' },
  { id: 3, corner: 'bl', color: 'lilac' },

  // Row 2
  { id: 4, corner: 'br', color: 'lilac' },
  { id: 5, corner: 'tl', color: 'violet' },
  { id: 6, corner: 'br', color: 'lilac' },
  { id: 7, corner: 'tl', color: 'violet' },

  // Row 3
  { id: 8, corner: 'tr', color: 'violet' },
  { id: 9, corner: 'bl', color: 'lilac' },
  { id: 10, corner: 'tr', color: 'violet' },
  { id: 11, corner: 'bl', color: 'lilac' },

  // Row 4
  { id: 12, corner: 'br', color: 'lilac' },
  { id: 13, corner: 'tl', color: 'lilac' },
  { id: 14, corner: 'br', color: 'lilac' },
  { id: 15, corner: 'tr', color: 'sky' },
]

// Three rounded corners (50% / full circle), one soft pointed corner (6px)
const cornerStyles: Record<CornerPoint, string> = {
  tr: 'rounded-tl-full rounded-tr-[6px] rounded-br-full rounded-bl-full',
  tl: 'rounded-tl-[6px] rounded-tr-full rounded-br-full rounded-bl-full',
  br: 'rounded-tl-full rounded-tr-full rounded-br-[6px] rounded-bl-full',
  bl: 'rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-[6px]',
}

const colorStyles: Record<PetalColor, string> = {
  violet: 'bg-[#5E17EB] text-white shadow-[0_8px_24px_-6px_rgba(94,23,235,0.45)] hover:shadow-[0_14px_30px_-4px_rgba(94,23,235,0.6)] hover:bg-[#6824F0]',
  lilac: 'bg-[#BCA7F8] text-ink shadow-[0_8px_20px_-6px_rgba(188,167,248,0.4)] hover:shadow-[0_12px_26px_-4px_rgba(188,167,248,0.55)] hover:bg-[#C7B5FA]',
  sky: 'bg-[#4F75FF] text-white shadow-[0_8px_24px_-6px_rgba(79,117,255,0.5)] hover:shadow-[0_14px_30px_-4px_rgba(79,117,255,0.65)] hover:bg-[#5E82FF]',
}

export function TeamHeroGraphic({ count }: { count: number }) {
  const [rotations, setRotations] = useState<Record<number, number>>({})

  const handlePetalClick = (id: number) => {
    setRotations((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 90,
    }))
  }

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:mr-0">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-violet/20 via-lilac/30 to-sky/20 opacity-70 blur-2xl"
      />

      {/* Frame Container */}
      <div className="relative rounded-[32px] sm:rounded-[36px] bg-[#f2eefd]/70 p-5 sm:p-7 border border-violet/15 shadow-[0_24px_60px_-25px_rgba(94,23,235,0.18)] backdrop-blur-md">
        {/* 4x4 Grid of Evolve AI brand droplets */}
        <div
          role="region"
          aria-label="Evolve AI brand motif mosaic"
          className="grid grid-cols-4 gap-2.5 sm:gap-3.5 aspect-square w-full"
        >
          {initialPetals.map((petal, index) => {
            const rotation = rotations[petal.id] || 0

            return (
              <button
                key={petal.id}
                type="button"
                onClick={() => handlePetalClick(petal.id)}
                title="Click to rotate petal"
                aria-label={`Brand petal ${index + 1}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
                className={cn(
                  'group relative aspect-square w-full cursor-pointer border-none outline-none transition-all duration-500 ease-out',
                  cornerStyles[petal.corner],
                  colorStyles[petal.color],
                  'hover:scale-[1.08] active:scale-95 focus-visible:ring-2 focus-visible:ring-violet'
                )}
              >
                {/* Subtle specular gleam highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 70%)',
                    borderRadius: 'inherit',
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Floating "50+ Minds" badge */}
        <div className="absolute -bottom-3.5 -right-3.5 sm:-bottom-4 sm:-right-4 flex items-center gap-3 rounded-full bg-[#1c0a33] px-4 py-2 sm:px-5 sm:py-2.5 text-white shadow-[0_12px_32px_rgba(28,10,51,0.35)] border border-white/15 backdrop-blur-xl transition-transform duration-300 hover:scale-105">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-violet" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">{count}+ Minds</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 border-l border-white/20 pl-2">
            Evolve AI
          </span>
        </div>
      </div>
    </div>
  )
}
