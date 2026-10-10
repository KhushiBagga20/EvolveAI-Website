'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-4 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/65', className)}>
      <span className="border-r border-current pr-4 text-violet">{index.padStart(2, '0')}</span>
      {children}
    </p>
  )
}
