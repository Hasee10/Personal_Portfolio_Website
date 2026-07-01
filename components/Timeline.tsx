'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, slideInRight, staggerTight, fadeIn } from '@/lib/motion'
import { TIMELINE } from '@/lib/constants'

/* ── Role type badge ────────────────────────────────────────────────────── */
function TypeBadge({ type }: { type: 'role' | 'education' }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
      {type === 'education' ? '✦ Education' : '✦ Experience'}
    </span>
  )
}

/* ── Pulsing "live" indicator ────────────────────────────────────────────── */
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/8 px-2.5 py-0.5 font-mono text-[11px] text-accent">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      Live
    </span>
  )
}

export default function Timeline() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="experience" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Experience & Education</p>
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
            How I got here.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-5"
        >
          {TIMELINE.map((entry, i) => (
            <motion.article
              key={entry.title}
              variants={reduced ? undefined : slideInRight}
              transition={{ delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border2 hover:bg-surface2"
            >
              {/* Left accent bar — brighter for current roles */}
              <div
                className={`absolute left-0 top-0 h-full w-[3px] transition-colors duration-300 ${
                  entry.current
                    ? 'bg-accent group-hover:bg-accent'
                    : 'bg-border2 group-hover:bg-accent/40'
                }`}
              />

              <div className="p-6 pl-8 sm:p-8 sm:pl-10">

                {/* ── Header row ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col gap-2">
                    {/* Type + live badge row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type={entry.type} />
                      {entry.current && <LiveBadge />}
                    </div>

                    {/* Role title */}
                    <h3 className="text-[22px] font-semibold leading-tight text-text sm:text-[24px]">
                      {entry.title}
                    </h3>

                    {/* Organisation */}
                    <p className="font-mono text-[14px] text-accent">{entry.org}</p>
                  </div>

                  {/* Date — right-aligned on desktop */}
                  <span className="shrink-0 rounded-lg border border-border bg-surface2 px-3 py-1 font-mono text-[12px] text-dim sm:mt-1">
                    {entry.year}
                  </span>
                </div>

                {/* ── Description ── */}
                <p className="mt-5 text-[15px] leading-[1.75] text-muted">
                  {entry.description}
                </p>

                {/* ── Achievements ── */}
                <motion.ul
                  variants={reduced ? undefined : staggerTight}
                  className="mt-5 space-y-2.5"
                >
                  {entry.achievements.map((item, j) => (
                    <motion.li
                      key={j}
                      variants={reduced ? undefined : fadeIn}
                      className="flex items-start gap-3 text-[14px] leading-6 text-muted"
                    >
                      <span className="mt-0.5 shrink-0 text-[13px] font-medium text-accent">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* ── Tech stack ── */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {entry.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-dim transition-colors duration-150 group-hover:border-border2 group-hover:text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
