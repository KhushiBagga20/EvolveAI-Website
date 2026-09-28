'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { faqs } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Reveal>
            <SectionLabel index="07">FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="faq-title" className="mt-6 text-5xl font-semibold tracking-tight text-ink md:text-7xl">
              Questions, <span className="text-iridescent">answered.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <div className="glass rounded-[32px] p-2 md:p-3">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={cn('rounded-3xl transition-colors', isOpen && 'bg-white/80')}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-6"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-lg font-semibold tracking-tight text-ink md:text-xl">{f.q}</span>
                      </span>
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                          isOpen ? 'bg-iridescent rotate-45 text-white' : 'bg-ink/5 text-ink',
                        )}
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.8, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-pretty px-5 pb-6 pl-14 leading-relaxed text-ink/70 md:px-6 md:pl-[3.75rem]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
