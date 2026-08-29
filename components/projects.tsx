'use client'

import { SectionHeading } from '@/components/hud'
import { ProjectCard } from '@/components/project-card'
import { ProjectModal } from '@/components/project-modal'
import { PROJECTS, type Project } from '@/lib/data'
import { useState } from 'react'

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading
        code="03"
        eyebrow="MISSIONS"
        title={<>MISSION CONTROL <span className="text-muted-foreground">//</span> <span className="text-primary text-glow-red">PROJECTS</span></>}
      />

      <div className="grid grid-cols-1 gap-6 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
