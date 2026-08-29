'use client'

import type { Project } from '@/lib/data'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Code2, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="hud-panel relative z-10 w-full max-w-3xl rounded-2xl p-6 md:p-8"
          >
            {/* top scan line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-cyan">
                  <span className="text-primary">PROJECT ID // {project.number}</span>
                  <span className="rounded border border-gold/40 px-2 py-0.5 text-gold">{project.category.toUpperCase()}</span>
                </div>
                <h2 id="project-modal-title" className="font-display text-2xl font-bold leading-tight text-balance md:text-3xl">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                data-cursor="target"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Block title="OBJECTIVE">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.objective}</p>
              </Block>
              <Block title="OUTCOME">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.outcome}</p>
              </Block>

              <Block title="KEY FEATURES" className="md:col-span-2">
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="IMPLEMENTATION" className="md:col-span-2">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.implementation}</p>
              </Block>

              {/* flow diagram */}
              <Block title="SYSTEM FLOW" className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-2">
                  {project.flow.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[11px] tracking-wide text-foreground">
                        {step}
                      </span>
                      {i < project.flow.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-primary" />}
                    </div>
                  ))}
                </div>
              </Block>

              <Block title="TECHNOLOGIES" className="md:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="rounded border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] tracking-wide text-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </Block>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border/50 pt-6">
              <span className="inline-flex cursor-default items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-display text-xs font-semibold tracking-[0.2em] text-primary-foreground">
                <ExternalLink className="h-4 w-4" /> VIEW PROJECT
              </span>
              {project.hasSource && (
                <span className="inline-flex cursor-default items-center gap-2 rounded-md border border-border px-5 py-2.5 font-display text-xs font-semibold tracking-[0.2em] text-foreground">
                  <Code2 className="h-4 w-4" /> SOURCE CODE
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-primary">
        <span className="h-1 w-1 rounded-full bg-primary" />
        {title}
      </h4>
      {children}
    </div>
  )
}
