'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { META } from '@/lib/constants'
import { fadeIn, staggerContainer } from '@/lib/motion'

export default function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <motion.footer
      ref={ref}
      className="border-t border-border px-6 py-8"
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? undefined : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Left */}
        <motion.span
          variants={reduced ? undefined : fadeIn}
          className="font-mono text-[13px] text-dim"
        >
          {META.name}
        </motion.span>

        {/* Center — social icons */}
        <motion.div
          variants={reduced ? undefined : fadeIn}
          className="flex items-center gap-5"
        >
          <a
            href={META.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-dim transition-colors duration-200 hover:text-accent"
          >
            <Github size={16} />
          </a>
          <a
            href={META.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-dim transition-colors duration-200 hover:text-accent"
          >
            <Linkedin size={16} />
          </a>
        </motion.div>

        {/* Right */}
        <motion.span
          variants={reduced ? undefined : fadeIn}
          className="font-mono text-[13px] text-dim"
        >
          Built with Next.js · 2026
        </motion.span>
      </div>
    </motion.footer>
  )
}
