'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, staggerTight, fadeUp, fadeIn } from '@/lib/motion'
import { SKILLS } from '@/lib/constants'

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

        {/* Skill rows — each row staggers, each pill staggers within the row */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.category}
              variants={reduced ? undefined : fadeUp}
              className="group relative flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-start sm:gap-8"
            >
              {/* Accent side bar — appears on hover */}
              <motion.div
                className="absolute left-0 top-0 h-full w-0.5 bg-accent"
                initial={{ opacity: 0 }}
                whileHover={reduced ? {} : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />

              {/* Category label */}
              <div className="w-full shrink-0 pl-3 sm:w-40">
                <span className="font-mono text-[14px] text-text">{skill.category}</span>
              </div>

              {/* Pills — tight stagger within each row */}
              <motion.div
                className="flex flex-wrap gap-2 pl-3 sm:pl-0"
                variants={reduced ? undefined : staggerTight}
              >
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={reduced ? undefined : fadeIn}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted transition-colors duration-150 group-hover:text-text"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
