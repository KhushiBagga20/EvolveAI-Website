'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { TypingPrompt } from './typing-prompt'

const letters = ['E', 'V', 'O', 'L', 'V', 'E']

export function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const glassX = useTransform(sx, (v) => v * 28)
  const glassY = useTransform(sy, (v) => v * 22)
  const orbX = useTransform(sx, (v) => v * -40)
  const orbY = useTransform(sy, (v) => v * -30)

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: glassX, y: glassY }}
        className="pointer-events-none absolute right-[-18%] top-16 w-[92vw] max-w-[760px] mix-blend-multiply md:right-[-4%] md:top-10 md:w-[58vw]"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 0.8, 0.24, 1] }}
          className="animate-float"
        >
          <Image
            src="/images/hero-glass.png"
            alt=""
            width={1024}
            height={1024}
            priority
            className="h-auto w-full [mask-image:radial-gradient(closest-side,black_72%,transparent)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute -left-16 bottom-4 hidden w-56 opacity-80 mix-blend-multiply lg:block"
      >
        <Image
          src="/images/neural-orb.png"
          alt=""
          width={1024}
          height={1024}
          className="h-auto w-full animate-float-slow [mask-image:radial-gradient(closest-side,black_72%,transparent)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/events/evolve-hacks-3"
            className="glass group inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-sm font-medium text-ink"
          >
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-violet/40 animate-pulse-ring" />
              <span className="relative size-2.5 rounded-full bg-violet" />
            </span>
            <span>
              Registrations live <span className="text-ink/40">·</span> Evolve Hacks 3.0
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
            Chitkara University <span className="text-violet">/</span> Est. 2021
          </p>
          <h1 id="hero-title" className="font-bold leading-[0.82] tracking-[-0.06em] text-ink">
            <span className="sr-only">Evolve AI</span>
            <span aria-hidden="true" className="flex text-[clamp(4.75rem,17vw,14rem)]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: '40%', filter: 'blur(16px)' }}
                  animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 0.8, 0.24, 1] }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </span>
            <span aria-hidden="true" className="mt-1 flex flex-wrap items-end gap-x-6 gap-y-3">
              <motion.span
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.4, 0.5, 1] }}
                className="text-iridescent inline-block pb-2 text-[clamp(4.75rem,17vw,14rem)]"
              >
                AI
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mb-[0.6em] max-w-[14ch] text-balance text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-tight tracking-tight text-ink/80"
              >
                Where innovation meets evolution.
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex max-w-md flex-col gap-6">
            <p className="text-pretty text-lg leading-relaxed text-ink/70">
              The student community for artificial intelligence at Chitkara University. We learn AI by building with it
              — hackathons, workshops, expert talks and real projects.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_-18px_rgba(139,61,255,0.8)] transition-all hover:bg-violet"
              >
                Explore events
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-white"
              >
                Join the club
              </Link>
            </div>
          </div>

          <TypingPrompt />
        </motion.div>
      </div>
    </section>
  )
}
