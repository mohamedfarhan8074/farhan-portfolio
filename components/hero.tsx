'use client'

import { AIReactor } from '@/components/ai-reactor'
import { MagneticButton } from '@/components/magnetic-button'
import { HERO_LABELS, PROFILE } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { downloadResume } from '@/lib/resume'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8">
        {/* left content */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-[11px] tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            SYSTEM ONLINE
          </motion.div>

          <motion.p variants={item} className="mb-2 font-mono text-sm tracking-[0.3em] text-cyan">
            {PROFILE.name}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-black leading-[1.05] tracking-tight text-balance sm:text-6xl xl:text-7xl"
          >
            <span className="metal-text">SOFTWARE</span>
            <br />
            <span className="text-glow-red text-primary">DEVELOPER</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-md text-lg leading-relaxed text-foreground/80">
            {PROFILE.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {PROFILE.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton onClick={() => scrollTo('projects')}>
              EXPLORE PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={downloadResume}>
              <Download className="h-4 w-4" />
              DOWNLOAD RESUME
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* right reactor */}
        <div className="relative order-1 lg:order-2">
          <AIReactor />
          {/* floating HUD labels */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {HERO_LABELS.map((label, i) => (
              <HudLabel key={label} label={label} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground"
        aria-label="Scroll to about section"
      >
        SCROLL TO INITIALIZE
        <span className="flex h-8 w-5 justify-center rounded-full border border-border pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1 rounded-full bg-primary"
          />
        </span>
      </motion.button>
    </section>
  )
}

const LABEL_POS = [
  'left-[2%] top-[8%]',
  'right-[0%] top-[4%]',
  'left-[0%] top-[46%]',
  'right-[2%] top-[52%]',
  'left-[8%] bottom-[6%]',
  'right-[6%] bottom-[2%]',
]

function HudLabel({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + index * 0.12, duration: 0.5 }}
      className={`absolute ${LABEL_POS[index]} animate-float-y`}
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div className="flex items-center gap-2 rounded border border-gold/30 bg-background/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-gold/90 backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-gold" />
        {label}
      </div>
    </motion.div>
  )
}
