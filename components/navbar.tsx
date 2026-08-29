'use client'

import { NAV_ITEMS } from '@/lib/data'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-border/60 bg-background/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => go('hero')} className="group flex items-center gap-3" aria-label="Home">
          <CoreLogo />
          <span className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
            M<span className="text-primary">.</span>FARHAN
          </span>
        </button>

        {/* desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={cn(
                  'group relative px-3 py-2 font-display text-xs tracking-[0.15em] transition-colors',
                  active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="mr-1.5 text-[10px] text-primary/60">{item.code}</span>
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary to-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-3 text-left font-display text-sm tracking-[0.15em] transition-colors',
                      active === item.id ? 'bg-primary/10 text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    <span className="text-xs text-primary/70">{item.code}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function CoreLogo() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center">
      <span className="absolute inset-0 animate-spin-slow rounded-full border border-primary/60 border-t-primary" />
      <span className="absolute inset-1 animate-spin-reverse rounded-full border border-gold/50 border-b-gold" />
      <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px] shadow-gold" />
    </span>
  )
}
