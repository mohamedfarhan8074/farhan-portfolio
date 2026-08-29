'use client'

import { About } from '@/components/about'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { CustomCursor } from '@/components/custom-cursor'
import { Education } from '@/components/education'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HUDOverlay } from '@/components/hud'
import { Navbar } from '@/components/navbar'
import { ParticleBackground } from '@/components/particle-background'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { SystemBoot } from '@/components/system-boot'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Portfolio() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
    if (booted) window.scrollTo(0, 0)
  }, [booted])

  return (
    <>
      <CustomCursor />
      <SystemBoot onComplete={() => setBooted(true)} />
      <ParticleBackground />
      <HUDOverlay />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </motion.main>
    </>
  )
}
