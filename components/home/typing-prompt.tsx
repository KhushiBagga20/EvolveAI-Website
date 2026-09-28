'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

const prompts = [
  'ship an agent in 36 hours',
  'train a model that can see',
  'ask industry experts anything',
  'build with 300+ curious peers',
  'turn an idea into a demo',
]

export function TypingPrompt() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = prompts[index]
    let delay = deleting ? 28 : 55
    if (!deleting && text === full) delay = 1800
    if (deleting && text === '') delay = 300

    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true)
      if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % prompts.length)
        return
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index])

  return (
    <div className="glass w-full max-w-md overflow-hidden rounded-3xl lg:w-[420px]">
      <div className="flex items-center justify-between border-b border-white/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-magenta/70" />
          <span className="size-2.5 rounded-full bg-violet/70" />
          <span className="size-2.5 rounded-full bg-sky/70" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink/50">evolve.ai — prompt</span>
      </div>
      <div className="flex flex-col gap-3 p-5 font-mono text-sm">
        <p className="text-ink/50">
          <span className="text-violet">~</span> what do you want to do this semester?
        </p>
        <p className="flex min-h-6 items-start gap-2 text-ink" aria-live="off">
          <span className="text-magenta" aria-hidden="true">
            {'>'}
          </span>
          <span>
            {text}
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-violet animate-blink" aria-hidden="true" />
          </span>
        </p>
        <div className="flex items-center gap-2 pt-1 text-xs text-ink/50">
          <Sparkles className="size-3.5 text-violet" aria-hidden="true" />
          <span>all of it happens here.</span>
        </div>
      </div>
    </div>
  )
}
