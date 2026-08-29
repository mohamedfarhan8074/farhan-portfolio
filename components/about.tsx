'use client'

import { SectionHeading } from '@/components/hud'
import { PROFILE, STATUS } from '@/lib/data'
import { motion } from 'framer-motion'
import { Github, Mail, MapPin, Phone, GraduationCap, Languages } from 'lucide-react'

const rows = [
  { icon: MapPin, label: 'LOCATION', value: PROFILE.location },
  { icon: Mail, label: 'EMAIL', value: PROFILE.email },
  { icon: Phone, label: 'PHONE', value: PROFILE.phone },
  { icon: Languages, label: 'LANGUAGES', value: PROFILE.languages.join(' / ') },
]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading code="01" eyebrow="PROFILE" title={<>IDENTITY <span className="text-muted-foreground">//</span> SYSTEM PROFILE</>} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="hud-panel corner-brackets relative rounded-xl p-6 lg:col-span-3 md:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                <span className="font-display text-2xl font-black text-gold">MF</span>
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan shadow-[0_0_8px] shadow-cyan" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-wide">{PROFILE.name}</h3>
                <p className="font-mono text-xs tracking-[0.2em] text-primary">{PROFILE.role.toUpperCase()}</p>
              </div>
            </div>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="target"
              className="inline-flex items-center gap-2 self-start rounded-md border border-border px-3 py-2 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
            >
              <Github className="h-4 w-4" /> GITHUB
            </a>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="flex items-start gap-3">
                <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{r.label}</dt>
                  <dd className="truncate text-sm text-foreground/90">{r.value}</dd>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 sm:col-span-2">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">EDUCATION</dt>
                <dd className="text-sm text-foreground/90">
                  B.Tech Information Technology — Adhiyamaan College of Engineering (Autonomous)
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-6 border-t border-border/50 pt-6 text-sm leading-relaxed text-muted-foreground">
            {PROFILE.intro}
          </p>
        </motion.div>

        {/* status panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hud-panel rounded-xl p-6 lg:col-span-2 md:p-8"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold tracking-[0.2em] text-gold">DEVELOPER STATUS</h3>
            <span className="font-mono text-[10px] tracking-widest text-cyan animate-flicker">LIVE</span>
          </div>
          <div className="space-y-4">
            {STATUS.map((s, i) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                  <span className="tracking-[0.15em] text-muted-foreground">{s.label}</span>
                  <span className="tracking-[0.15em] text-foreground">{s.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${[86, 92, 78, 100][i]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border/50 pt-6 text-center">
            {[
              { n: '5+', l: 'PROJECTS' },
              { n: '6', l: 'CERTS' },
              { n: '2', l: 'INTERNSHIPS' },
            ].map((c) => (
              <div key={c.l}>
                <div className="font-display text-2xl font-bold text-glow-gold text-gold">{c.n}</div>
                <div className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground">{c.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
