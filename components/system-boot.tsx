'use client'

import { BOOT_LINES } from '@/lib/data'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [typed, setTyped] = useState('')
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    setDone(true)
    setTimeout(onComplete, 650)
  }, [onComplete])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisibleLines(BOOT_LINES)
      setProgress(100)
      const t = setTimeout(finish, 400)
      return () => clearTimeout(t)
    }

    let lineIdx = 0
    let charIdx = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      if (lineIdx >= BOOT_LINES.length) {
        setProgress(100)
        timeout = setTimeout(finish, 500)
        return
      }
      const current = BOOT_LINES[lineIdx]
      if (charIdx <= current.length) {
        setTyped(current.slice(0, charIdx))
        charIdx++
        timeout = setTimeout(typeNext, 22)
      } else {
        setVisibleLines((prev) => [...prev, current])
        setTyped('')
        lineIdx++
        charIdx = 0
        setProgress(Math.round((lineIdx / BOOT_LINES.length) * 100))
        timeout = setTimeout(typeNext, 130)
      }
    }
    timeout = setTimeout(typeNext, 300)
    return () => clearTimeout(timeout)
  }, [finish])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          {/* scanning line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/25 to-transparent [animation:scan-down_2.6s_linear_infinite]" />

          <div className="relative w-[min(92vw,640px)] px-4">
            {/* circular loader */}
            <div className="mb-10 flex justify-center">
              <div className="relative h-28 w-28">
                <div className="absolute inset-0 rounded-full border border-primary/25" />
                <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-r-2 border-primary" />
                <div className="absolute inset-3 animate-spin-reverse rounded-full border-b-2 border-l-2 border-gold" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gold text-glow-gold">
                    {progress}
                    <span className="text-sm text-primary">%</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="hud-panel rounded-lg p-5 font-mono">
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2 text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>J.A.R.V.I.S // BOOT SEQUENCE</span>
                <span className="text-cyan">v2.0</span>
              </div>
              <div className="min-h-[168px] space-y-1.5 font-sans text-sm">
                {visibleLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2 text-foreground/80">
                    <span className="text-cyan">{'>'}</span>
                    <span className="tracking-wide">{line}</span>
                    <span className="ml-auto text-[11px] tracking-widest text-primary">OK</span>
                  </div>
                ))}
                {typed && (
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="text-cyan">{'>'}</span>
                    <span className="tracking-wide">{typed}</span>
                    <span className="inline-block h-4 w-2 animate-pulse bg-gold" />
                  </div>
                )}
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={finish}
                className="group flex items-center gap-2 rounded-full border border-border px-5 py-2 font-display text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                SKIP INTRO
                <span className="transition-transform group-hover:translate-x-1">{'>>'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
