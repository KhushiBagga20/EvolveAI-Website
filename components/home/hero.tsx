'use client'

import Link from 'next/link'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import styles from './hero.module.css'

const letters = ['E', 'V', 'O', 'L', 'V', 'E']

export function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 55, damping: 22 })
  const y = useSpring(my, { stiffness: 55, damping: 22 })
  const backX = useTransform(x, (v) => v * -0.6)
  const backY = useTransform(y, (v) => v * -0.6)

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 34)
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 34)
  }

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" onPointerMove={onPointerMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
      <motion.div className={styles.world} style={{ x: backX, y: backY }} aria-hidden="true">
        <span className={styles.quarter} />
        <span className={styles.drop} />
        <span className={styles.circle} />
        <span className={styles.leaf} />
        <span className={styles.orbit} />
      </motion.div>
      <div className={styles.type}>
        <p className={styles.kicker}>Chitkara University · Since 2021</p>
        <h1 id="hero-title" className={styles.title}>
          <span className="sr-only">Evolve AI</span>
          <span className={styles.word} aria-hidden="true">
            {letters.map((letter, i) => (
              <motion.span key={i} initial={reduce ? false : { opacity: 0, y: '28%', filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.5, delay: 0.15 + i * 0.075, ease: [0.22, 0.8, 0.24, 1] }}>{letter}</motion.span>
            ))}
          </span>
        </h1>
      </div>
      <motion.div className={styles.glassLayer} style={{ x, y }} aria-hidden="true">
        <span className={`${styles.glass} ${styles.lens}`}><span className={styles.ai}>AI</span></span>
        <span className={`${styles.glass} ${styles.capsule}`} />
        <span className={`${styles.glass} ${styles.chip}`}><i />Learning by building</span>
      </motion.div>
      <div className={styles.foot}>
        <div>
          <p className={styles.tagline}>Where innovation meets evolution.</p>
          <p className={styles.lead}>The student community for artificial intelligence at Chitkara University. We learn AI by building with it — together.</p>
          <div className={styles.actions}>
            <Link href="/#contact" className={styles.join}>Join the club <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="#work" className={styles.secondary}>See what we do <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <a href="#about" className={styles.scroll}><span><i /></span>Scroll to explore</a>
      </div>
    </section>
  )
}
