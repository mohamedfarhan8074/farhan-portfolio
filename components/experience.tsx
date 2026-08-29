'use client'

import { SectionHeading } from '@/components/hud'
import { EXPERIENCE } from '@/lib/data'
import { motion } from 'framer-motion'
import { Briefcase, Terminal } from 'lucide-react'

const timeline = [
  ...EXPERIENCE.map((e) => ({ ...e, kind: 'log' as const })),
  { role: 'Software Development Experience', company: 'ONGOING', index: 'LOG_03', kind: 'end' as const },
]

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading code="05" eyebrow="EXPERIENCE" title={<>FIELD <span className="text-primary text-glow-red">EXPERIENCE</span></>} />

      <div className="relative mx-auto max-w-3xl">
        {/* glowing vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-gold to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-8">
          {timeline.map((item, i) => (
            <motion.li
              key={item.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
              }`}
            >
              {/* node */}
              <span
                className={`absolute left-4 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-auto ${
                  i % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                }`}
              >
                <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
              </span>

              <div className="hud-panel rounded-xl p-5">
                <div className={`mb-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {item.kind === 'end' ? <Terminal className="h-3.5 w-3.5" /> : <Briefcase className="h-3.5 w-3.5" />}
                  {item.index}
                </div>
                <h3 className="font-display text-base font-bold leading-tight text-balance text-foreground">{item.role}</h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-gold">{item.company}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
