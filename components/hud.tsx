'use client'

import { SYSTEM_READOUTS } from '@/lib/data'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Small section eyebrow label like "SYSTEM // 01" */
export function SectionHeading({
  code,
  eyebrow,
  title,
  accent = 'red',
}: {
  code: string
  eyebrow: string
  title: ReactNode
  accent?: 'red' | 'gold'
}) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-muted-foreground"
      >
        <span className={accent === 'gold' ? 'text-gold' : 'text-primary'}>{eyebrow}</span>
        <span className="text-muted-foreground/50">//</span>
        <span className="text-cyan">{code}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  )
}

/** Decorative fixed corner readouts + scanning line. Hidden on small screens. */
export function HUDOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden lg:block" aria-hidden="true">
      {/* top-left readout */}
      <div className="absolute left-4 top-24 space-y-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70">
        {SYSTEM_READOUTS.slice(0, 4).map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="h-1 w-1 animate-pulse rounded-full bg-cyan" />
            <span>{r.label}:</span>
            <span className="text-gold/80">{r.value}</span>
          </div>
        ))}
      </div>
      {/* bottom-right readout */}
      <div className="absolute bottom-6 right-4 space-y-1 text-right font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70">
        {SYSTEM_READOUTS.slice(4).map((r) => (
          <div key={r.label} className="flex items-center justify-end gap-2">
            <span>{r.label}:</span>
            <span className="text-primary/80">{r.value}</span>
            <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />
          </div>
        ))}
      </div>
      {/* frame ticks */}
      <div className="absolute left-0 top-1/2 h-16 w-[3px] -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      <div className="absolute right-0 top-1/2 h-16 w-[3px] -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
    </div>
  )
}
