'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { TIMELINE } from '@/lib/constants'

export default function Timeline() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="experience" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Experience</p>
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
            How I got here.
          </h2>
        </motion.div>

        {/* Timeline entries */}
        <div className="relative ml-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((entry, i) => (
              <motion.div
                key={entry.title}
                variants={reduced ? undefined : fadeUp}
                initial={reduced ? undefined : 'hidden'}
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.15 }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-[-3.5px] top-1.5 h-2 w-2 rounded-full bg-accent" />

                {/* Year */}
                <p className="font-mono text-[12px] text-dim">{entry.year}</p>

                {/* Title */}
                <h3 className="mt-1 text-[18px] font-medium text-text">{entry.title}</h3>

                {/* Org */}
                <p className="mt-0.5 font-mono text-[14px] text-accent">{entry.org}</p>

                {/* Description */}
                <p className="mt-2 text-[14px] leading-6 text-muted">{entry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
