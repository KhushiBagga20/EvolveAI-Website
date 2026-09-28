'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Minus, Plus } from 'lucide-react'
import type { ClubEvent } from '@/lib/data'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition focus:border-violet focus:bg-white focus:ring-4 focus:ring-violet/15'

const years = ['1st year', '2nd year', '3rd year', '4th year']

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}

export function RegistrationForm({ event }: { event: ClubEvent }) {
  const isTeam = event.type === 'Hackathon'
  const [members, setMembers] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  if (event.status === 'past' || event.status === 'closed') {
    return (
      <div className="glass flex flex-col gap-3 rounded-[28px] p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">Registrations</p>
        <p className="text-2xl font-semibold tracking-tight text-ink">This one has wrapped up.</p>
        <p className="text-sm leading-relaxed text-ink/60">Check the upcoming events for your next chance to build with us.</p>
      </div>
    )
  }

  if (event.status === 'soon') {
    return (
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-[28px] bg-ink p-6 text-white md:p-8">
        <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full bg-violet/50 blur-3xl" />
        <p className="relative font-mono text-xs uppercase tracking-widest text-white/50">Registrations</p>
        <p className="relative text-2xl font-semibold tracking-tight">Opening soon.</p>
        <p className="relative text-sm leading-relaxed text-white/70">
          Registrations for this event are not open yet. Follow Evolve AI on Instagram to catch the drop.
        </p>
        <a
          href="https://www.instagram.com/evolveai_cuiet/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
        >
          Follow for updates <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity()
      return
    }
    setSubmitted(true)
  }

  const seatsLeft = event.seats && event.registered !== undefined ? event.seats - event.registered : null

  return (
    <div className="glass overflow-hidden rounded-[28px]">
      <div className="flex items-center justify-between border-b border-white/70 px-6 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">Register</p>
          <p className="text-lg font-semibold tracking-tight text-ink">{isTeam ? 'Team registration' : 'Individual registration'}</p>
        </div>
        {seatsLeft !== null && (
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-[11px] text-white">{seatsLeft} left</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 px-6 py-12 text-center"
            role="status"
          >
            <span className="bg-iridescent flex size-16 items-center justify-center rounded-full text-white">
              <Check className="size-7" aria-hidden="true" />
            </span>
            <p className="text-2xl font-semibold tracking-tight text-ink">{"You're in the queue!"}</p>
            <p className="max-w-xs text-sm leading-relaxed text-ink/60">
              Your registration for {event.title} is pending approval. {"We'll"} email you once the team reviews it.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate className="flex flex-col gap-4 p-6" exit={{ opacity: 0 }}>
            {isTeam && (
              <Field id="r-team" label="Team name">
                <input id="r-team" name="team" required placeholder="Gradient Descenders" className={inputClass} />
              </Field>
            )}
            <Field id="r-name" label={isTeam ? 'Team lead name' : 'Full name'}>
              <input id="r-name" name="name" required autoComplete="name" placeholder="Ada Lovelace" className={inputClass} />
            </Field>
            <Field id="r-email" label="University email">
              <input
                id="r-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@chitkara.edu.in"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field id="r-roll" label="Roll number">
                <input id="r-roll" name="roll" required placeholder="2310990000" inputMode="numeric" className={inputClass} />
              </Field>
              <Field id="r-year" label="Year">
                <select id="r-year" name="year" required defaultValue="" className={inputClass}>
                  <option value="" disabled>
                    Select
                  </option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </Field>
            </div>

            {isTeam && (
              <div className="flex flex-col gap-3 rounded-2xl bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">Teammates</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMembers((m) => Math.max(1, m - 1))}
                      className="flex size-8 items-center justify-center rounded-full bg-ink/5 text-ink disabled:opacity-40"
                      disabled={members <= 1}
                      aria-label="Remove teammate"
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center font-mono text-sm" aria-live="polite">
                      {members}
                    </span>
                    <button
                      type="button"
                      onClick={() => setMembers((m) => Math.min(3, m + 1))}
                      className="flex size-8 items-center justify-center rounded-full bg-ink text-white disabled:opacity-40"
                      disabled={members >= 3}
                      aria-label="Add teammate"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {Array.from({ length: members }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label htmlFor={`r-m-${i}`} className="sr-only">
                        Teammate {i + 1} email
                      </label>
                      <input
                        id={`r-m-${i}`}
                        name={`member-${i}`}
                        type="email"
                        required
                        placeholder={`Teammate ${i + 1} email`}
                        className={inputClass}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <Field id="r-why" label={isTeam ? 'What do you plan to build?' : 'What do you want to learn?'}>
              <textarea id="r-why" name="why" rows={3} placeholder="Tell us in a line or two" className={cn(inputClass, 'resize-none')} />
            </Field>

            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input type="checkbox" required className="mt-0.5 size-4 accent-violet" />
              <span>I agree to follow the event code of conduct.</span>
            </label>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_-18px_rgba(139,61,255,0.8)] transition-colors hover:bg-violet"
            >
              Submit registration
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
            <p className="text-center font-mono text-[11px] text-ink/40">Entries are reviewed by the organising team.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
