'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, Cpu } from 'lucide-react'
import { CodeWindow } from './code-window'
import { techStack } from '@/lib/data'

const letters = ['E', 'V', 'O', 'L', 'V', 'E']
const ease = [0.22, 0.8, 0.24, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const glassX = useTransform(sx, (v) => v * 28)
  const glassY = useTransform(sy, (v) => v * 22)
  const cardX = useTransform(sx, (v) => v * -10)
  const cardY = useTransform(sy, (v) => v * -8)

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
      className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: glassX, y: glassY }}
        className="pointer-events-none absolute -right-40 -top-10 w-[640px] opacity-70 mix-blend-multiply md:-right-24"
      >
        <Image
          src="/images/hero-glass.png"
          alt=""
          width={1024}
          height={1024}
          priority
          className="h-auto w-full animate-float [mask-image:radial-gradient(closest-side,black_60%,transparent)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-7">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex w-fit items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-white">
              <Cpu className="size-3.5" aria-hidden="true" />
            </span>
            Official AI &amp; Tech Club
            <span className="text-ink/30" aria-hidden="true">
              /
            </span>
            <span className="text-ink/60">Chitkara University</span>
          </motion.p>

          <h1 id="hero-title" className="font-bold leading-[0.84] tracking-[-0.06em] text-ink">
            <span className="sr-only">Evolve AI — the AI and tech club of Chitkara University</span>
            <span aria-hidden="true" className="flex text-[clamp(4rem,11vw,8.75rem)]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: '40%', filter: 'blur(16px)' }}
                  animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </span>
            <span aria-hidden="true" className="flex items-end gap-5">
              <motion.span
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.4, 0.5, 1] }}
                className="text-iridescent inline-block pb-1 text-[clamp(4rem,11vw,8.75rem)]"
              >
                AI
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="mb-[0.55em] font-mono text-[clamp(0.7rem,1.1vw,0.85rem)] font-medium uppercase leading-snug tracking-[0.2em] text-ink/60"
              >
                tech club
                <br />
                <span className="text-violet">est. 2021</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="flex max-w-xl flex-col gap-7"
          >
            <p className="text-pretty text-lg leading-relaxed text-ink/70 md:text-xl">
              A student-run tech club where we <strong className="font-semibold text-ink">write code, train models and ship real projects</strong>{' '}
              — with hackathons, workshops and research along the way.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_-18px_rgba(139,61,255,0.8)] transition-all hover:bg-violet"
              >
                Join the club
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/projects"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-white"
              >
                See what we build
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">Our stack</p>
              <ul className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-ink/10 bg-white/60 px-2.5 py-1 font-mono text-xs text-ink/75 backdrop-blur"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ x: cardX, y: cardY }}
          initial={reduce ? false : { opacity: 0, y: 30, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="relative lg:pl-4"
        >
          <CodeWindow />
          <div
            aria-hidden="true"
            className="glass absolute -top-8 right-6 hidden items-center gap-3 rounded-2xl px-4 py-3 md:flex"
          >
            <span className="bg-iridescent flex size-9 items-center justify-center rounded-xl font-mono text-xs font-bold text-white">
              50+
            </span>
            <span className="text-sm leading-tight text-ink/70">
              <span className="block font-semibold text-ink">builders</span>
              across 6 squads
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
