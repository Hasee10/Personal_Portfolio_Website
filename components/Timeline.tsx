'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import StackIcon from '@/components/StackIcon'

// ── Types ─────────────────────────────────────────────────────────────────────

type EntryType  = 'EXPERIENCE' | 'EDUCATION' | 'ACHIEVEMENT'
type Weight     = 'primary' | 'secondary' | 'tertiary'
type FilterType = 'ALL' | 'EXPERIENCE' | 'ACHIEVEMENT'

interface Entry {
  id:          number
  type:        EntryType
  title:       string
  org:         string
  period:      string
  active:      boolean
  description: string
  bullets:     string[]
  tags:        string[]
  weight:      Weight
}

// ── Data (reverse chronological) ──────────────────────────────────────────────

const ENTRIES: Entry[] = [
  {
    id: 1, type: 'EXPERIENCE', weight: 'primary', active: true,
    title: 'AI Systems Builder',
    org: 'Independent / Freelance',
    period: 'Oct 2024 — Present',
    description: 'Building production-grade AI products as an independent engineer — voice AI, agentic pipelines, RAG systems, and full-stack automation shipped to real clients across Pakistan and Australia.',
    bullets: [
      'Shipped 6 AI products (Visa2Land, ScopeForge, NexusDeals, VocalCRM, and more) from zero to live',
      'Deployed voice AI agent in production for a real Australian migration agency client',
      'Built LLM proposal pipeline (ScopeForge) cutting SOW generation from days to under 3 minutes',
    ],
    tags: ['VAPI', 'LangGraph', 'OpenAI', 'FastAPI', 'n8n', 'Supabase', 'React'],
  },
  {
    id: 2, type: 'EXPERIENCE', weight: 'primary', active: false,
    title: 'AI Automation Engineer',
    org: 'Trilles AI',
    period: 'Aug 2025 — Feb 2026',
    description: 'Worked on developing and deploying n8n pipelines for production use cases, contributing to model training, evaluation, and optimization workflows.',
    bullets: [
      'Designed and implemented MLOps cycles for real-world use cases',
      'Integrated model APIs into backend services using FastAPI',
      'Contributed to CI/CD pipelines for automated model retraining',
    ],
    tags: ['Python', 'FastAPI', 'MLflow', 'Docker', 'n8n'],
  },
  {
    id: 3, type: 'ACHIEVEMENT', weight: 'secondary', active: false,
    title: 'Runner-up — Data Visualization Challenge',
    org: 'FAST-NUCES',
    period: 'Jan 2026',
    description: 'Competed in a technical challenge focused on visualizing data, delivering a solution ranked among top submissions.',
    bullets: [
      'Designed and built the solution end-to-end within competition timeframe',
      'Presented to a panel of industry and academic judges',
      'Ranked second out of 11 participating teams',
    ],
    tags: ['Competition', 'Python', 'AI'],
  },
  {
    id: 4, type: 'EDUCATION', weight: 'primary', active: true,
    title: 'BS Data Science',
    org: 'FAST-NUCES Islamabad',
    period: '2023 — 2026',
    description: 'Specializing in machine learning, NLP, and AI systems. Thesis: Agent Reliability Auditor — benchmarking LLM degradation across English, Roman Urdu, and code-switched inputs.',
    bullets: [
      'GPA maintained while shipping 6 production AI products in parallel',
      'Thesis benchmarks 14 LLMs across 3,000+ prompts in 3 language forms',
      'Coursework: Deep Learning, NLP, Data Mining, Parallel Computing, RL',
    ],
    tags: ['Machine Learning', 'NLP', 'Python', 'Research'],
  },
  {
    id: 5, type: 'ACHIEVEMENT', weight: 'secondary', active: false,
    title: 'Runner-up — Software Competition',
    org: 'NASCON',
    period: 'May 2024',
    description: 'Delivered a technically strong software solution in a fast-paced competition setting, balancing speed, product thinking, and presentation quality.',
    bullets: [
      'Built and presented a working solution under competition constraints',
      'Placed runner-up among strong university-level teams',
    ],
    tags: ['Software', 'Rapid Prototyping'],
  },
  {
    id: 6, type: 'ACHIEVEMENT', weight: 'tertiary', active: false,
    title: 'Best Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2020 — 2021',
    description: 'Top-ranked delegate performance across regional Model UN conferences.',
    bullets: [
      'Led committee strategy with high-quality position papers',
      'Earned Best Delegate recognition in competitive regional events',
    ],
    tags: ['Leadership', 'Debate', 'Research'],
  },
  {
    id: 7, type: 'ACHIEVEMENT', weight: 'tertiary', active: false,
    title: 'Honourable Delegate',
    org: 'LGS IMUN & Regional MUNs',
    period: '2017 — 2019',
    description: 'Built early foundation in diplomacy, negotiation, and public speaking.',
    bullets: ['Received honourable mentions across regional MUN committees'],
    tags: ['Public Speaking', 'Negotiation'],
  },
]

const FILTERS: FilterType[] = ['ALL', 'EXPERIENCE', 'ACHIEVEMENT']

// ── Config ────────────────────────────────────────────────────────────────────

// Semantic type colors — token values: accent (sage) / edu / gold, all muted
const TYPE_CONFIG: Record<EntryType, { color: string; bg: string }> = {
  EXPERIENCE:  { color: '#9DBE8D', bg: 'rgba(157,190,141,0.06)' },
  EDUCATION:   { color: '#7BC4AE', bg: 'rgba(123,196,174,0.06)' },
  ACHIEVEMENT: { color: '#D9BC6E', bg: 'rgba(217,188,110,0.06)' },
}

const TAG_COLORS: Record<string, string> = {
  VAPI: '#9DBE8D', LangGraph: '#9DBE8D', OpenAI: '#9DBE8D', LangChain: '#9DBE8D',
  MLflow: '#9DBE8D', AI: '#9DBE8D',
  n8n: '#7BC4AE', FastAPI: '#7BC4AE',
  Supabase: '#D9BC6E', Docker: '#D9BC6E', Python: '#D9BC6E',
  React: '#C08D66',
}

const MONO = 'var(--font-geist-mono), monospace'
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

// ── Small components ──────────────────────────────────────────────────────────

function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? 'rgba(255,255,255,0.22)'
  return (
    <span style={{
      fontSize: '10px', fontFamily: MONO, color,
      border: `1px solid ${color}44`, background: `${color}14`,
      padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap',
      display: 'inline-flex', alignItems: 'center', gap: '5px',
    }}>
      <StackIcon name={tag} color={color} size={10} />
      {tag}
    </span>
  )
}

function LiveBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: '9px', fontFamily: MONO, letterSpacing: '0.12em',
      color: '#6FBF84', border: '1px solid rgba(111,191,132,0.3)',
      background: 'rgba(111,191,132,0.06)', padding: '2px 7px', borderRadius: '999px',
    }}>
      <motion.span
        style={{ width: 5, height: 5, borderRadius: '50%', background: '#6FBF84', display: 'inline-block' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      LIVE
    </span>
  )
}

function TypeBadge({ type }: { type: EntryType }) {
  const cfg = TYPE_CONFIG[type]
  return (
    <span style={{
      fontSize: '9px', fontFamily: MONO, letterSpacing: '0.14em',
      color: cfg.color, border: `1px solid ${cfg.color}44`,
      background: `${cfg.color}10`, padding: '2px 7px', borderRadius: '999px',
    }}>
      {type}
    </span>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {bullets.map((b, i) => (
        <div key={i} className="flex items-start gap-3">
          <span style={{ color: 'var(--color-accent)', fontFamily: MONO, fontSize: '10px', marginTop: 3, flexShrink: 0 }}>→</span>
          <span style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: '1.6' }}>{b}</span>
        </div>
      ))}
    </div>
  )
}

// ── Timeline dot + radar ping ─────────────────────────────────────────────────

function TimelineDot({ typeColor }: { typeColor: string }) {
  return (
    <div style={{ position: 'relative', width: 10, height: 10 }}>
      <motion.div
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${typeColor}` }}
        initial={{ scale: 1, opacity: 0.6 }}
        whileInView={{ scale: 3, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1.5px solid ${typeColor}`, background: 'var(--color-bg)', zIndex: 10,
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </div>
  )
}

// ── Card templates (visual weight per entry type) ────────────────────────────

function PrimaryCard({ entry, isRight, reduced }: { entry: Entry; isRight: boolean; reduced: boolean }) {
  const { color, bg } = TYPE_CONFIG[entry.type]
  return (
    <motion.article
      className="w-full rounded-2xl border border-border bg-surface"
      style={{ minHeight: 220, borderTop: `3px solid ${color}` }}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      whileHover={reduced ? undefined : { borderColor: `${color}44`, backgroundColor: bg, y: -3 }}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TypeBadge type={entry.type} />
          {entry.active && <LiveBadge />}
        </div>
        <h3 className="text-[20px] font-semibold text-text mb-1">{entry.title}</h3>
        <p style={{ fontFamily: MONO, fontSize: '12px', color, marginBottom: 12 }}>{entry.org}</p>
        <p className="text-[13px] leading-relaxed text-muted mb-4">{entry.description}</p>
        <div className="mb-4"><BulletList bullets={entry.bullets} /></div>
        <div className="border-t border-border pt-4 flex flex-wrap gap-1.5">
          {entry.tags.map(t => <TagPill key={t} tag={t} />)}
        </div>
      </div>
    </motion.article>
  )
}

function SecondaryCard({ entry, isRight, reduced }: { entry: Entry; isRight: boolean; reduced: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const { color, bg } = TYPE_CONFIG[entry.type]
  return (
    <motion.article
      className="w-full rounded-xl border border-border bg-surface"
      style={{ borderTop: `3px solid ${color}` }}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      whileHover={reduced ? undefined : { borderColor: `${color}44`, backgroundColor: bg, y: -3 }}
    >
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TypeBadge type={entry.type} />
          {entry.active && <LiveBadge />}
        </div>
        <h3 className="text-[17px] font-semibold text-text mb-1">{entry.title}</h3>
        <p style={{ fontFamily: MONO, fontSize: '12px', color, marginBottom: 10 }}>{entry.org}</p>
        <p className="text-[13px] leading-relaxed text-muted">{entry.description}</p>
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-2 mb-1 text-xs font-mono text-dim hover:text-muted transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? '— Less' : '+ Details'}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
              className="mb-2"
            >
              <BulletList bullets={entry.bullets} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-wrap gap-1.5 border-t border-border pt-3 mt-2">
          {entry.tags.map(t => <TagPill key={t} tag={t} />)}
        </div>
      </div>
    </motion.article>
  )
}

function TertiaryCard({ entry, isRight, reduced }: { entry: Entry; isRight: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  const { color, bg } = TYPE_CONFIG[entry.type]
  return (
    <motion.article
      className="w-full rounded-lg border border-border"
      style={{ background: 'transparent' }}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      whileHover={reduced ? undefined : { borderColor: `${color}44`, backgroundColor: bg, y: -2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <TypeBadge type={entry.type} />
          {entry.active && <LiveBadge />}
          <span className="text-[15px] font-semibold text-text">{entry.title}</span>
          <span style={{ fontFamily: MONO, fontSize: '12px', color }}>· {entry.org}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map(t => <TagPill key={t} tag={t} />)}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', fontSize: '13px', color: 'var(--color-muted)', lineHeight: '1.6', marginTop: 8 }}
            >
              {entry.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

function EntryCard({ entry, isRight, reduced }: { entry: Entry; isRight: boolean; reduced: boolean }) {
  return (
    <div className="w-full">
      {entry.weight === 'primary'   && <PrimaryCard   entry={entry} isRight={isRight} reduced={reduced} />}
      {entry.weight === 'secondary' && <SecondaryCard entry={entry} isRight={isRight} reduced={reduced} />}
      {entry.weight === 'tertiary'  && <TertiaryCard  entry={entry} isRight={isRight} reduced={reduced} />}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Timeline() {
  const sectionRef  = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState<FilterType>('ALL')
  const reduced     = useReducedMotion()

  // GSAP center-line draw on scroll — quiet structural motion: the line's
  // progress encodes chronology, it is not a spectacle moment.
  useEffect(() => {
    if (reduced || !lineRef.current || !timelineRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  const visible = ENTRIES.filter(e =>
    filter === 'ALL'        ? true :
    filter === 'EXPERIENCE' ? (e.type === 'EXPERIENCE' || e.type === 'EDUCATION') :
    e.type === 'ACHIEVEMENT'
  )

  return (
    <section id="experience" ref={sectionRef} className="px-6 py-28">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Experience & Education</p>
          <h2 className="font-mono text-[30px] font-medium tracking-tight text-text md:text-[38px]">How I got here.</h2>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-2 mb-14"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              style={{
                fontFamily: MONO, fontSize: '12px', letterSpacing: '0.08em',
                padding: '4px 14px', borderRadius: '999px', cursor: 'pointer',
                border: `1px solid ${filter === f ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color:      filter === f ? 'var(--color-accent)' : 'var(--color-muted)',
                background: filter === f ? 'rgba(157,190,141,0.08)' : 'transparent',
                transition: 'all var(--dur) var(--ease-out)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">

          {/* Chronology line — left rail on mobile, center spine on desktop.
              GSAP owns this element's transform (scaleY), so horizontal
              position uses `left` only, never translate. */}
          <div
            ref={lineRef}
            className="absolute bottom-0 top-0 w-px left-[11.5px] lg:left-1/2"
            style={{
              background: 'var(--color-border-2)',
              transformOrigin: 'top center',
            }}
          />

          {/* Entries — ONE card instance per entry; CSS grid repositions it
              across breakpoints. No duplicate DOM nodes. */}
          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {visible.map((entry, i) => {
                const isRight   = i % 2 === 0
                const typeColor = TYPE_CONFIG[entry.type].color

                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    style={{ marginBottom: 48 }}
                  >
                    <div className="grid grid-cols-[24px_1fr] gap-x-4 gap-y-1.5 lg:grid-cols-[1fr_40px_1fr] lg:items-center lg:gap-x-0 lg:gap-y-0">

                      {/* Dot — mobile: left rail; desktop: center spine */}
                      <div className="relative z-[1] col-start-1 row-start-1 flex justify-center pt-1 lg:col-start-2 lg:pt-0">
                        <TimelineDot typeColor={typeColor} />
                      </div>

                      {/* Period — mobile: above card; desktop: opposite column */}
                      <motion.p
                        className={`col-start-2 row-start-1 self-center whitespace-nowrap font-mono text-[11px] tracking-wide text-dim ${
                          isRight
                            ? 'lg:col-start-1 lg:pr-6 lg:text-right'
                            : 'lg:col-start-3 lg:pl-6 lg:text-left'
                        }`}
                        initial={reduced ? undefined : { opacity: 0 }}
                        whileInView={reduced ? undefined : { opacity: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 }}
                      >
                        {entry.period}
                      </motion.p>

                      {/* Card — single instance */}
                      <div
                        className={`col-start-2 row-start-2 lg:row-start-1 ${
                          isRight ? 'lg:col-start-3 lg:pl-6' : 'lg:col-start-1 lg:pr-6'
                        }`}
                      >
                        <EntryCard entry={entry} isRight={isRight} reduced={reduced} />
                      </div>

                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer count */}
        <div className="mt-12 flex items-center gap-4 border-t border-border pt-6">
          <span className="font-mono text-xs text-dim">{ENTRIES.length} entries</span>
          <span className="font-mono text-xs text-dim">·</span>
          <span className="font-mono text-xs text-dim">
            {ENTRIES.filter(e => e.type === 'EXPERIENCE' || e.type === 'EDUCATION').length} roles
          </span>
          <span className="font-mono text-xs text-dim">·</span>
          <span className="font-mono text-xs text-dim">
            {ENTRIES.filter(e => e.type === 'ACHIEVEMENT').length} achievements
          </span>
        </div>

      </div>
    </section>
  )
}
