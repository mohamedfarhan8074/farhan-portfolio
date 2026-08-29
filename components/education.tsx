'use client'

import { SectionHeading } from '@/components/hud'
import { EDUCATION } from '@/lib/data'
import { motion } from 'framer-motion'

const specs = [
  { label: 'DEGREE', value: EDUCATION.degree },
  { label: 'FIELD', value: EDUCATION.field },
  { label: 'INSTITUTION', value: EDUCATION.institution },
]

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading code="06" eyebrow="ACADEMIC" title={<>ACADEMIC <span className="text-primary text-glow-red">CORE</span></>} />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* rotating academic module */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-square w-[min(70vw,360px)] [perspective:1000px]"
        >
          <div className="absolute inset-[15%] rounded-full bg-gold/15 blur-3xl animate-core-pulse" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-gold/30" style={{ animationDuration: '26s' }} />
          <div className="absolute inset-6 animate-spin-reverse rounded-full border border-primary/40 border-dashed" />
          <motion.div
            className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-gold/50 bg-background/60 backdrop-blur-sm"
            animate={{ rotateY: [0, 360] }}
            transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="font-display text-4xl font-black metal-text">B.TECH</span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-cyan">IT ENGINEERING</span>
          </motion.div>
          {/* orbiting nodes */}
          {[0, 120, 240].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary animate-spin-slow"
              style={{ transformOrigin: `0 0`, transform: `rotate(${deg}deg) translateX(150px)` }}
            />
          ))}
        </motion.div>

        {/* specs */}
        <div className="space-y-4">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="hud-panel flex items-center justify-between rounded-lg px-5 py-4"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">{s.label}</span>
              <span className="font-display text-sm font-bold tracking-wide text-foreground text-right">{s.value}</span>
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-2 font-mono text-xs tracking-[0.15em] text-muted-foreground"
          >
            {EDUCATION.institution} {EDUCATION.institutionSub}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
