'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Brand, ChitkaraLogo } from './brand'
import { navLinks, socials } from '@/lib/data'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={cn(
          'glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-all duration-500',
          scrolled ? 'shadow-[0_20px_50px_-25px_rgba(60,20,120,0.45)]' : '',
        )}
      >
        <Brand />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-sm xl:px-3.5 font-medium text-ink/70 transition-colors hover:bg-white/70 hover:text-ink',
                  active && 'bg-white/90 text-ink shadow-sm',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ChitkaraLogo className="hidden h-6 lg:block xl:h-7" />
          <Link
            href="/#contact"
            className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet sm:inline-flex"
          >
            Join us
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/70 text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-2xl font-semibold tracking-tight text-ink hover:bg-white/70 aria-[current=page]:text-violet"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-4 font-semibold text-white"
              >
                Join the club <ArrowUpRight className="size-4" />
              </Link>
              <div className="mt-4 flex items-center justify-between gap-4 px-2 pb-1">
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-violet"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                <ChitkaraLogo className="h-6" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
