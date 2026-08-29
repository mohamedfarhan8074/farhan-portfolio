'use client'

import type { Project } from '@/lib/data'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, Maximize2 } from 'lucide-react'

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      <button
        onClick={onOpen}
        data-cursor="target"
        className="hud-panel corner-brackets relative block w-full overflow-hidden rounded-xl p-6 text-left transition-shadow duration-300 hover:shadow-[0_0_36px_-10px] hover:shadow-primary/70"
        aria-label={`View details for ${project.title}`}
      >
        {/* header */}
        <div className="mb-5 flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <span className="font-display text-4xl font-black text-primary/25 transition-colors group-hover:text-primary/50">
              {project.number}
            </span>
            <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-cyan">{project.category.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 font-mono text-[9px] tracking-widest text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            ONLINE
          </div>
        </div>

        <h3
          className="mb-2 font-display text-lg font-bold leading-tight text-balance text-foreground transition-colors group-hover:text-gold"
          style={{ transform: 'translateZ(24px)' }}
        >
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground" style={{ transform: 'translateZ(16px)' }}>
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5" style={{ transform: 'translateZ(20px)' }}>
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="rounded border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground/80">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded border border-border/70 bg-background/50 px-2 py-0.5 font-mono text-[10px] text-primary">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/50 pt-4 font-display text-[11px] tracking-[0.15em]" style={{ transform: 'translateZ(14px)' }}>
          <span className="flex items-center gap-1.5 text-primary transition-transform group-hover:translate-x-1">
            <Maximize2 className="h-3.5 w-3.5" /> VIEW PROJECT
          </span>
          {project.hasSource && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" /> SOURCE
            </span>
          )}
        </div>
      </button>
    </motion.div>
  )
}
