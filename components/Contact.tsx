'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { META } from '@/lib/constants'
import { useReducedMotion } from '@/lib/useReducedMotion'

/* ── Magnetic contact card ─────────────────────────────────────────────────
 * Same spring-tracking technique as the Hero CTA buttons, but applied to the
 * entire card — a stronger magnetic pull (0.32×) since the target is larger.
 */
function MagneticCard({
  href,
  children,
  reduced,
  target,
  rel,
}: {
  href: string
  children: React.ReactNode
  reduced: boolean
  target?: string
  rel?: string
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * 0.32)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * 0.32)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={reduced ? {} : { borderColor: 'rgba(78,107,69,0.55)', backgroundColor: 'var(--color-surface-2)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6 text-center"
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section id="contact" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Contact</p>
          <h2 className="font-mono text-[30px] font-medium tracking-tight text-text md:text-[38px]">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-muted">
            Open to AI engineering roles, freelance contracts, and interesting problems.
          </p>
        </motion.div>

        {/* Action cards */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <motion.div variants={reduced ? undefined : fadeUp}>
            <MagneticCard href={`mailto:${META.email}`} reduced={reduced}>
              <Mail size={22} className="text-accent" />
              <span className="text-[15px] font-medium text-text">Email me</span>
              <span className="text-[13px] text-muted">{META.email}</span>
            </MagneticCard>
          </motion.div>

          <motion.div variants={reduced ? undefined : fadeUp}>
            <MagneticCard
              href={META.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              reduced={reduced}
            >
              <ExternalLink size={22} className="text-accent" />
              <span className="text-[15px] font-medium text-text">LinkedIn</span>
              <span className="text-[13px] text-muted">Connect with me</span>
            </MagneticCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
