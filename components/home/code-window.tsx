'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'

type Token = { t: string; c?: 'kw' | 'fn' | 'str' | 'num' | 'cm' | 'var' }

const k = (t: string): Token => ({ t, c: 'kw' })
const f = (t: string): Token => ({ t, c: 'fn' })
const s = (t: string): Token => ({ t, c: 'str' })
const n = (t: string): Token => ({ t, c: 'num' })
const cm = (t: string): Token => ({ t, c: 'cm' })
const v = (t: string): Token => ({ t, c: 'var' })
const _ = (t: string): Token => ({ t })

const lines: Token[][] = [
  [cm('# the official AI tech club of Chitkara University')],
  [k('class '), f('EvolveAI'), _('('), v('TechClub'), _('):')],
  [_('    university = '), s('"Chitkara University"')],
  [_('    department = '), s('"CSE (AI)"')],
  [_('    founded    = '), n('2021')],
  [_('    domains    = ['), s('"ML"'), _(', '), s('"Vision"'), _(', '), s('"GenAI"'), _(', '), s('"Agents"'), _(']')],
  [_('')],
  [_('    '), k('def '), f('build'), _('('), v('self'), _(', idea):')],
  [_('        '), k('return '), f('ship'), _('(idea, with_ai='), k('True'), _(')')],
]

const tokenColor: Record<NonNullable<Token['c']>, string> = {
  kw: 'text-magenta',
  fn: 'text-sky',
  str: 'text-emerald-300',
  num: 'text-amber-300',
  cm: 'text-white/40 italic',
  var: 'text-violet-300',
}

const command = 'python evolve.py --join'

export function CodeWindow() {
  const reduce = useReducedMotion()
  const [typed, setTyped] = useState(reduce ? command.length : 0)
  const done = typed >= command.length

  useEffect(() => {
    if (reduce || done) return
    const t = setTimeout(() => setTyped((x) => x + 1), typed === 0 ? 1600 : 55)
    return () => clearTimeout(t)
  }, [typed, done, reduce])

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-ink/95 text-white shadow-[0_40px_80px_-30px_rgba(60,20,120,0.7)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-magenta/80" />
          <span className="size-2.5 rounded-full bg-violet/80" />
          <span className="size-2.5 rounded-full bg-sky/80" />
        </div>
        <div className="flex gap-1 font-mono text-[11px]">
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-white/90">club.py</span>
          <span className="px-2 py-0.5 text-white/40">projects/</span>
        </div>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 md:text-[13px]">
        <code>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="flex"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.09, duration: 0.4 }}
            >
              <span className="mr-4 w-4 shrink-0 select-none text-right text-white/25" aria-hidden="true">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tok, j) => (
                  <span key={j} className={tok.c ? tokenColor[tok.c] : 'text-white/85'}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </motion.span>
          ))}
        </code>
      </pre>

      <div className="border-t border-white/10 bg-black/20 px-5 py-4 font-mono text-[12.5px]">
        <p className="flex items-center gap-2 text-white/85">
          <span className="text-emerald-300">~/evolve</span>
          <span className="text-white/40">$</span>
          <span>
            {command.slice(0, typed)}
            {!done && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-white animate-blink" aria-hidden="true" />}
          </span>
        </p>
        <motion.p
          initial={false}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 4 }}
          className="mt-1.5 flex items-center gap-2 text-emerald-300"
          aria-live="polite"
        >
          <Check className="size-3.5" aria-hidden="true" />
          {done ? 'welcome to the club. start building.' : ''}
        </motion.p>
      </div>
    </div>
  )
}
