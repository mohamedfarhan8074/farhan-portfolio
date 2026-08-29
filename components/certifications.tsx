'use client'

import { SectionHeading } from '@/components/hud'
import { CERTIFICATIONS } from '@/lib/data'
import { motion } from 'framer-motion'
import { BadgeCheck, ShieldCheck } from 'lucide-react'

export function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading
        code="04"
        eyebrow="CERTIFICATIONS"
        accent="gold"
        title={<>CERTIFICATION <span className="metal-text">DATABASE</span></>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="hud-panel group relative overflow-hidden rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:bg-gold/20" />

            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold/40 bg-gold/10">
                <ShieldCheck className="h-5 w-5 text-gold" />
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
                ID // {String(i + 1).padStart(3, '0')}
              </span>
            </div>

            <h3 className="mb-1 font-display text-sm font-bold leading-tight text-balance text-foreground">
              {cert.title}
            </h3>
            <p className="mb-4 font-mono text-xs tracking-wide text-cyan">{cert.provider}</p>

            <div className="flex items-center gap-2 border-t border-border/50 pt-3">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] text-primary">VERIFIED</span>
              <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
