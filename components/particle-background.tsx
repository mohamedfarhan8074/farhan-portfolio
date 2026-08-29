'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  gold: boolean
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    let mouseX = -9999
    let mouseY = -9999

    const density = () => {
      const w = window.innerWidth
      if (w < 640) return 26
      if (w < 1024) return 48
      return 80
    }

    const init = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = density()
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        gold: Math.random() > 0.72,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDist = width < 640 ? 90 : 130

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // subtle mouse repulsion
        const dxm = p.x - mouseX
        const dym = p.y - mouseY
        const dm = Math.hypot(dxm, dym)
        if (dm < 120) {
          p.x += (dxm / dm) * 0.6
          p.y += (dym / dm) * 0.6
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? 'rgba(232,182,84,0.75)' : 'rgba(220,70,54,0.65)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            const alpha = (1 - dist / linkDist) * 0.14
            ctx.strokeStyle = `rgba(200,90,70,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      init()
      if (reduced) {
        drawStatic()
      } else {
        raf = requestAnimationFrame(draw)
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? 'rgba(232,182,84,0.5)' : 'rgba(220,70,54,0.4)'
        ctx.fill()
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    init()
    if (reduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(draw)
      window.addEventListener('mousemove', onMove)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, oklch(0.58 0.21 27 / 0.12), transparent 55%), radial-gradient(ellipse at 20% 80%, oklch(0.82 0.14 82 / 0.07), transparent 55%)',
        }}
      />
      <div className="absolute inset-0 scanline-mask opacity-40" />
    </div>
  )
}
