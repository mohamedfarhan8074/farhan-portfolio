'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  'aria-label'?: string
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="target"
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3 font-display text-xs font-semibold tracking-[0.2em] transition-colors',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary hover:shadow-[0_0_32px_-4px] hover:shadow-primary'
          : 'border border-border bg-background/40 text-foreground hover:border-gold/60 hover:text-gold',
        className,
      )}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </motion.button>
  )
}
