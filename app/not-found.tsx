'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 40, damping: 20 })
  const y = useSpring(my, { stiffness: 40, damping: 20 })
  
  const backX = useTransform(x, (v) => v * -0.5)
  const backY = useTransform(y, (v) => v * -0.5)

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 40)
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 40)
  }

  return (
    <div 
      className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center"
      onPointerMove={onPointerMove}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
    >
      {/* Background Shapes */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-multiply blur-2xl md:opacity-60"
        style={{ x: backX, y: backY }}
        aria-hidden="true"
      >
        <div className="animate-float absolute h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-violet/30 mix-blend-multiply blur-3xl" />
        <div className="animate-float-slow absolute h-80 w-80 translate-x-32 translate-y-16 rounded-[40%] bg-sky/30 mix-blend-multiply blur-3xl" />
        <div className="animate-pulse-ring absolute h-72 w-72 -translate-x-16 translate-y-32 rounded-[30%] bg-magenta/20 mix-blend-multiply blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="flex h-10 items-center justify-center rounded-full border border-violet/20 bg-violet/5 px-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-violet"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Error 404
          </motion.div>
          <h1 className="font-display text-8xl font-bold leading-none tracking-[-0.05em] text-ink md:text-[12rem]">
            40<span className="text-iridescent">4</span>
          </h1>
        </div>

        <div className="flex max-w-lg flex-col gap-3">
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Not <span className="text-iridescent">trained</span> on this.
          </h2>
          <p className="text-lg text-ink/60">
            Looks like you've ventured into uncharted space. We haven't generated a page for this URL yet.
          </p>
        </div>

        <motion.div style={{ x, y }} className="mt-4">
          <Link 
            href="/" 
            className="glass flex items-center gap-3 rounded-full px-8 py-4 font-medium text-ink transition-all hover:scale-105 hover:bg-white/80 active:scale-95"
          >
            <ArrowLeft size={18} className="text-violet" />
            <span>Return to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid-lines pointer-events-none absolute inset-0 z-20 opacity-40 mix-blend-overlay" />
    </div>
  )
}
