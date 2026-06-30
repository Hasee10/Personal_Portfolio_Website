'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { META } from '@/lib/constants'

export default function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

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
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
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
          {/* Email */}
          <motion.a
            variants={reduced ? undefined : fadeUp}
            href={`mailto:${META.email}`}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6 text-center transition-colors duration-200 hover:border-accent/50 hover:bg-surface2"
          >
            <Mail size={22} className="text-accent" />
            <span className="text-[15px] font-medium text-text">Email me</span>
            <span className="text-[13px] text-muted">{META.email}</span>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            variants={reduced ? undefined : fadeUp}
            href={META.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-6 text-center transition-colors duration-200 hover:border-accent/50 hover:bg-surface2"
          >
            <ExternalLink size={22} className="text-accent" />
            <span className="text-[15px] font-medium text-text">LinkedIn</span>
            <span className="text-[13px] text-muted">Connect with me</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
