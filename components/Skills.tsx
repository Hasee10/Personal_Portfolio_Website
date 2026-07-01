'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import SkillSphere from '@/components/SkillSphere'

export default function Skills() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="skills" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Skills</p>
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
            What I work with.
          </h2>
        </motion.div>

        {/* 3-D rotating skill torus */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
        >
          <SkillSphere reduced={reduced} />
        </motion.div>
      </div>
    </section>
  )
}
