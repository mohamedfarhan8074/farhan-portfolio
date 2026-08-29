'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [targeting, setTargeting] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 22 })
  const ringY = useSpring(y, { stiffness: 220, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement
      const interactive = el.closest('a,button,[data-cursor="target"],input,textarea')
      setTargeting(!!interactive)
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <style>{`.has-custom-cursor, .has-custom-cursor * { cursor: none !important; }`}</style>
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x, y }}
        animate={{ scale: targeting ? 0 : 1 }}
      />
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: targeting ? 46 : 30,
          height: targeting ? 46 : 30,
          borderColor: targeting ? 'oklch(0.82 0.14 82)' : 'oklch(0.58 0.21 27)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      >
        {targeting && (
          <>
            <span className="absolute -left-1 top-1/2 h-px w-2 -translate-y-1/2 bg-gold" />
            <span className="absolute -right-1 top-1/2 h-px w-2 -translate-y-1/2 bg-gold" />
            <span className="absolute left-1/2 -top-1 h-2 w-px -translate-x-1/2 bg-gold" />
            <span className="absolute left-1/2 -bottom-1 h-2 w-px -translate-x-1/2 bg-gold" />
            <span className="font-mono text-[7px] tracking-widest text-gold">+</span>
          </>
        )}
      </motion.div>
    </>
  )
}
