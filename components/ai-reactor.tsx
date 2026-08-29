'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function AIReactor() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 })
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 })
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <motion.div
      className="relative mx-auto aspect-square w-[min(78vw,440px)] [transform-style:preserve-3d]"
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
    >
      {/* ambient glow */}
      <div className="absolute inset-[12%] rounded-full bg-primary/20 blur-3xl animate-core-pulse" />

      <motion.div className="absolute inset-0" style={{ x: tx, y: ty }}>
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.98 0.03 80)" />
              <stop offset="35%" stopColor="oklch(0.82 0.14 82)" />
              <stop offset="70%" stopColor="oklch(0.58 0.21 27)" />
              <stop offset="100%" stopColor="oklch(0.35 0.12 27 / 0)" />
            </radialGradient>
            <linearGradient id="ringRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.58 0.21 27)" />
              <stop offset="100%" stopColor="oklch(0.82 0.14 82)" />
            </linearGradient>
          </defs>

          {/* static outer dashed ring */}
          <circle cx="200" cy="200" r="192" fill="none" stroke="oklch(0.42 0.03 32 / 0.5)" strokeWidth="1" strokeDasharray="2 8" />

          {/* rotating rings */}
          <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px' }}>
            <circle cx="200" cy="200" r="170" fill="none" stroke="url(#ringRed)" strokeWidth="1.5" strokeDasharray="40 14 8 14" opacity="0.9" />
            <circle cx="200" cy="24" r="4" fill="oklch(0.85 0.11 205)" />
            <circle cx="200" cy="376" r="3" fill="oklch(0.82 0.14 82)" />
          </g>

          <g className="animate-spin-reverse" style={{ transformOrigin: '200px 200px' }}>
            <circle cx="200" cy="200" r="140" fill="none" stroke="oklch(0.82 0.14 82 / 0.7)" strokeWidth="1" strokeDasharray="4 10" />
            {/* tick marks */}
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2
              const x1 = 200 + Math.cos(a) * 122
              const y1 = 200 + Math.sin(a) * 122
              const x2 = 200 + Math.cos(a) * 132
              const y2 = 200 + Math.sin(a) * 132
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.68 0.05 40 / 0.6)" strokeWidth="1" />
            })}
          </g>

          <g className="animate-spin-slow" style={{ transformOrigin: '200px 200px', animationDuration: '12s' }}>
            <circle cx="200" cy="200" r="108" fill="none" stroke="url(#ringRed)" strokeWidth="2" strokeDasharray="90 30" opacity="0.85" />
          </g>

          {/* inner triangle/tech frame */}
          <g className="animate-spin-reverse" style={{ transformOrigin: '200px 200px', animationDuration: '30s' }}>
            <polygon points="200,120 269,240 131,240" fill="none" stroke="oklch(0.85 0.11 205 / 0.55)" strokeWidth="1" />
            <polygon points="200,280 269,160 131,160" fill="none" stroke="oklch(0.58 0.21 27 / 0.55)" strokeWidth="1" />
          </g>

          {/* core */}
          <circle cx="200" cy="200" r="70" fill="url(#coreGlow)" className="animate-core-pulse" style={{ transformOrigin: '200px 200px' }} />
          <circle cx="200" cy="200" r="44" fill="oklch(0.98 0.03 85)" opacity="0.92" />
          <circle cx="200" cy="200" r="44" fill="none" stroke="oklch(0.82 0.14 82)" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* floating technical data chips */}
      <ReactorChip className="left-0 top-[18%]" label="PWR" value="98.4%" delay={0} />
      <ReactorChip className="right-0 top-[30%]" label="FREQ" value="2.4 GHz" delay={0.4} />
      <ReactorChip className="bottom-[20%] left-[6%]" label="SYNC" value="LOCKED" delay={0.8} />
      <ReactorChip className="bottom-[10%] right-[8%]" label="LOAD" value="42%" delay={1.2} />
    </motion.div>
  )
}

function ReactorChip({
  className,
  label,
  value,
  delay,
}: {
  className: string
  label: string
  value: string
  delay: number
}) {
  return (
    <motion.div
      className={`absolute ${className} flex items-center gap-2 rounded border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[10px] backdrop-blur-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 + delay, duration: 0.5 }}
    >
      <span className="animate-float-y text-cyan" style={{ animationDelay: `${delay}s` }}>
        {label}
      </span>
      <span className="text-gold">{value}</span>
    </motion.div>
  )
}
