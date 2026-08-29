'use client'

import { SectionHeading } from '@/components/hud'
import { SKILLS, type SkillCategory } from '@/lib/data'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading
        code="02"
        eyebrow="SKILLS"
        accent="gold"
        title={<>TECHNOLOGY <span className="metal-text">ARSENAL</span></>}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((cat, i) => (
          <SkillModule key={cat.title} cat={cat} index={i} />
        ))}
      </div>
    </section>
  )
}

function SkillModule({ cat, index }: { cat: SkillCategory; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hud-panel group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-8px] hover:shadow-primary/60"
    >
      {/* scanning highlight */}
      <div className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-primary/10 to-transparent transition-transform duration-700 group-hover:translate-y-0" />

      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-[11px] font-bold tracking-[0.25em] text-gold">{cat.code}</span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">MODULE</span>
      </div>
      <h3 className="mb-4 font-display text-sm font-bold tracking-wide text-foreground">{cat.title}</h3>

      <ul className="flex flex-wrap gap-2">
        {cat.skills.map((skill, si) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0.85 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0.85 }}
            transition={{ delay: hovered ? si * 0.04 : 0 }}
            data-cursor="target"
            className="rounded-md border border-border/70 bg-background/50 px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground/85 transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
          >
            {skill}
          </motion.li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-3 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
        <span className="h-1 w-1 animate-pulse rounded-full bg-cyan" />
        {cat.skills.length} MODULES LOADED
      </div>
    </motion.div>
  )
}
