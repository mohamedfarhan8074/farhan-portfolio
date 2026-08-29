'use client'

import { SectionHeading } from '@/components/hud'
import { MagneticButton } from '@/components/magnetic-button'
import { PROFILE } from '@/lib/data'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { useState } from 'react'

const channels = [
  { icon: Mail, label: 'EMAIL', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: 'PHONE', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'LOCATION', value: PROFILE.location, href: undefined },
  { icon: Github, label: 'GITHUB', value: 'GitHub Profile', href: PROFILE.github },
]

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading code="07" eyebrow="CONTACT" title={<>ESTABLISH <span className="text-primary text-glow-red">CONNECTION</span></>} />

      <p className="-mt-6 mb-12 max-w-xl text-lg text-muted-foreground">
        Ready to build the next intelligent system.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* channels */}
        <div className="space-y-3 lg:col-span-2">
          {channels.map((c, i) => {
            const Wrapper = c.href ? 'a' : 'div'
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Wrapper
                  {...(c.href ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                  data-cursor={c.href ? 'target' : undefined}
                  className="hud-panel flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-primary/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{c.label}</div>
                    <div className="truncate text-sm text-foreground/90">{c.value}</div>
                  </div>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>

        {/* form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hud-panel corner-brackets relative overflow-hidden rounded-xl p-6 lg:col-span-3 md:p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[320px] flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="mb-4 h-14 w-14 text-gold text-glow-gold" />
                <h3 className="font-display text-xl font-bold tracking-[0.15em] text-gold">TRANSMISSION SUCCESSFUL</h3>
                <p className="mt-2 font-mono text-sm tracking-widest text-cyan">MESSAGE RECEIVED</p>
                <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">SYSTEM WILL RESPOND SHORTLY</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                className="space-y-5"
              >
                <Field id="name" label="NAME" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <Field id="email" label="EMAIL" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                <div>
                  <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
                    placeholder="Describe your mission..."
                  />
                </div>
                <MagneticButton type="submit" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" /> TRANSMIT MESSAGE
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
        placeholder={label === 'EMAIL' ? 'you@domain.com' : 'Enter ' + label.toLowerCase()}
      />
    </div>
  )
}
