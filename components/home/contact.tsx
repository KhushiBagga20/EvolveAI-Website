'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Reveal, SectionLabel } from '@/components/site/reveal'
import { socials } from '@/lib/data'
import { cn } from '@/lib/utils'

const topics = ['Join the club', 'Collaborate', 'Propose a session', 'Just saying hi']

const inputClass =
  'w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3.5 text-ink placeholder:text-ink/35 outline-none transition focus:border-violet focus:bg-white focus:ring-4 focus:ring-violet/15'

export function Contact() {
  const [topic, setTopic] = useState(topics[0])
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity()
      return
    }
    setSent(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionLabel index="08">Get in touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="contact-title" className="text-balance text-[clamp(2.5rem,10vw,3rem)] font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl">
              Got an idea? {"Let's make it "}
              <span className="text-iridescent">real.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-pretty leading-relaxed text-ink/70">
              Pitch a collaboration, propose a session, or simply say hello. The core team reads every message.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass flex flex-col gap-5 rounded-[32px] p-6 md:p-8">
            <fieldset>
              <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/50">{"I'm here to"}</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <label
                    key={t}
                    className={cn(
                      'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-violet/30',
                      topic === t ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white/60 text-ink hover:border-ink/30',
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t}
                      checked={topic === t}
                      onChange={() => setTopic(t)}
                      className="sr-only"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="c-name" className="text-sm font-medium text-ink">
                  Your name
                </label>
                <input id="c-name" name="name" required autoComplete="name" placeholder="Ada Lovelace" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className="text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@chitkara.edu.in"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="c-message" className="text-sm font-medium text-ink">
                The idea
              </label>
              <textarea
                id="c-message"
                name="message"
                required
                rows={4}
                placeholder="A workshop on…"
                className={cn(inputClass, 'resize-none')}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                disabled={sent}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white transition-all',
                  sent ? 'bg-emerald-600' : 'bg-ink hover:bg-violet',
                )}
              >
                {sent ? (
                  <>
                    Sent <Check className="size-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send it
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
              <p role="status" aria-live="polite" className="text-sm text-ink/60">
                {sent ? "Thanks! We'll get back to you soon." : ''}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
