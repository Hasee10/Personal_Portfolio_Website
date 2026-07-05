'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, staggerTight, fadeUpSoft } from '@/lib/motion'
import { SKILLS } from '@/lib/constants'
import { useReducedMotion } from '@/lib/useReducedMotion'

/* ── Per-category visual treatment ─────────────────────────────────────────
 * Color encodes category identity. Cell span encodes weight: the LLM/agentic
 * stack is the brand and gets the widest cells; Data & BI is a supporting
 * strip. Not a uniform auto-grid.
 */
const GROUP_CFG: Record<string, { color: string; span: string; blurb: string }> = {
  'LLM Stack': {
    color: '#CAFF57', // token: accent
    span:  'col-span-12 md:col-span-7',
    blurb: 'Models, orchestration, retrieval',
  },
  'Agentic Infra': {
    color: '#57FFD8', // token: edu
    span:  'col-span-12 md:col-span-5',
    blurb: 'Voice, automation, pipelines',
  },
  Backend: {
    color: '#8A9A7E', // token: muted
    span:  'col-span-12 md:col-span-7',
    blurb: 'APIs, data stores, deployment',
  },
  Frontend: {
    color: '#FFD657', // token: gold
    span:  'col-span-12 md:col-span-5',
    blurb: 'Interfaces that ship with the system',
  },
  'Data & BI': {
    color: '#F4E8D0', // token: text
    span:  'col-span-12',
    blurb: 'Analysis and reporting',
  },
}

function SkillGroup({
  category,
  items,
  reduced,
}: {
  category: string
  items: string[]
  reduced: boolean
}) {
  const cfg = GROUP_CFG[category] ?? { color: '#8A9A7E', span: 'col-span-12', blurb: '' }

  return (
    <motion.div
      variants={reduced ? undefined : fadeUpSoft}
      className={`${cfg.span} rounded-xl border border-border bg-surface p-5`}
      style={{ borderTop: `2px solid ${cfg.color}55` }}
    >
      {/* Group header */}
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h3
          className="font-mono text-[13px] font-medium tracking-widest"
          style={{ color: cfg.color }}
        >
          {category.toUpperCase()}
        </h3>
        <span className="font-mono text-[11px] text-dim">{String(items.length).padStart(2, '0')}</span>
      </div>
      <p className="mb-4 text-[13px] text-muted">{cfg.blurb}</p>

      {/* Pills */}
      <motion.ul
        variants={reduced ? undefined : staggerTight}
        className="flex list-none flex-wrap gap-2"
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={reduced ? undefined : fadeUpSoft}
            className="rounded-full border px-3 py-1.5 font-mono text-[12px] text-text/90 transition-colors"
            style={{
              borderColor: `${cfg.color}2E`,
              background:  `${cfg.color}0A`,
              transitionDuration: 'var(--dur)',
              transitionTimingFunction: 'var(--ease-out)',
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

export default function Skills() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section id="skills" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Skills</p>
          <h2 className="font-mono text-[30px] font-medium tracking-tight text-text md:text-[38px]">
            What I work with.
          </h2>
        </motion.div>

        {/* Weighted category grid */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-12 gap-3"
        >
          {SKILLS.map((group) => (
            <SkillGroup
              key={group.category}
              category={group.category}
              items={group.items}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
