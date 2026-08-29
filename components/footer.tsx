'use client'

import { PROFILE } from '@/lib/data'
import { Mail, Phone } from 'lucide-react'
import { Github } from '@/components/brand-icons'

export function Footer() {
  const links = [
    { icon: Github, href: PROFILE.github, label: 'GitHub' },
    { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, label: 'Phone' },
  ]
  return (
    <footer className="relative border-t border-border/60 bg-background/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:px-8">
        <div>
          <h3 className="font-display text-lg font-bold tracking-[0.2em] text-foreground">{PROFILE.name}</h3>
          <p className="mt-1 font-mono text-xs tracking-[0.15em] text-cyan">
            Software Developer | AI Enthusiast | Full-Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={l.label}
              data-cursor="target"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <l.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex w-full items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-border/60" />
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            DESIGNED &amp; ENGINEERED WITH CODE
          </p>
          <span className="h-px flex-1 bg-border/60" />
        </div>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60">
          © {new Date().getFullYear()} // ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  )
}
