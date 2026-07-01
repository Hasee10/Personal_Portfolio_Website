'use client'

import { type ReactNode, useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion'
import { Github } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'

// ── Types ─────────────────────────────────────────────────────────────────────

type Status   = 'PRODUCTION' | 'RESEARCH' | 'OPEN SOURCE'
type Visual   = 'waveform' | 'document' | 'spider' | 'benchmark' | 'funnel'
type Template = 'featured' | 'standard' | 'strip'

interface ProjectData {
  number:   string
  name:     string
  status:   Status
  desc:     string
  tags:     string[]
  impact:   string
  github:   string
  visual:   Visual
  template: Template
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: ProjectData[] = [
  {
    number: '01', name: 'Visa2Land', status: 'PRODUCTION',
    desc:   'Voice AI platform for Australian visa eligibility. Live with a real migration agency client — handles full eligibility logic across subclasses.',
    tags:   ['VAPI', 'n8n', 'FastAPI', 'React', 'Voice AI'],
    impact: 'Live client', github: 'https://github.com/Hasee10',
    visual: 'waveform', template: 'featured',
  },
  {
    number: '02', name: 'ScopeForge', status: 'PRODUCTION',
    desc:   'Two-pass LLM pipeline generating client-ready SOWs with scoring, diagrams, and psychology-driven rewrites.',
    tags:   ['Gemini', 'Groq', 'Mistral', 'React-PDF'],
    impact: '2-pass pipeline', github: 'https://github.com/Hasee10',
    visual: 'document', template: 'standard',
  },
  {
    number: '03', name: 'NexusDeals', status: 'PRODUCTION',
    desc:   'Pakistan-focused deal aggregator. 155 sites, 25 Scrapy spiders, Redis caching, live deal feed.',
    tags:   ['Next.js', 'FastAPI', 'Supabase', 'Scrapy', 'Redis'],
    impact: '155 sites', github: 'https://github.com/Hasee10',
    visual: 'spider', template: 'standard',
  },
  {
    number: '04', name: 'Agent Reliability Auditor', status: 'RESEARCH',
    desc:   'Benchmarks LLM degradation across English, Roman Urdu, and code-switched inputs. 14 models, 3,000+ prompts.',
    tags:   ['Python', 'HuggingFace', 'LangChain', 'NLP'],
    impact: '3,000+ prompts', github: 'https://github.com/Hasee10',
    visual: 'benchmark', template: 'standard',
  },
  {
    number: '05', name: 'VocalCRM', status: 'PRODUCTION',
    desc:   'Inbound voice AI for real estate lead qualification. Handles screening, objection handling, and CRM push in real-time.',
    tags:   ['VAPI', 'n8n', 'WebSocket', 'Supabase', 'OpenAI'],
    impact: 'Real-time CRM', github: 'https://github.com/Hasee10',
    visual: 'funnel', template: 'standard',
  },
  {
    number: '06', name: 'LangGraph Agents', status: 'OPEN SOURCE',
    desc:   'Modular multi-agent orchestration — research, code review, and web-search agents with shared persistent memory.',
    tags:   ['LangGraph', 'OpenAI', 'Tavily', 'FastAPI'],
    impact: 'Persistent memory', github: 'https://github.com/Hasee10',
    visual: 'waveform', template: 'strip',
  },
]

const COL_CLASSES: Record<string, string> = {
  'Visa2Land':               'col-span-12 md:col-span-8',
  'ScopeForge':              'col-span-12 md:col-span-4',
  'NexusDeals':              'col-span-12 md:col-span-4',
  'Agent Reliability Auditor': 'col-span-12 md:col-span-4',
  'VocalCRM':                'col-span-12 md:col-span-4',
  'LangGraph Agents':        'col-span-12',
}

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<Status, { color: string; bg: string; dot: boolean }> = {
  PRODUCTION:    { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  dot: true  },
  RESEARCH:      { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  dot: false },
  'OPEN SOURCE': { color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  dot: false },
}

const TAG_COLORS: Record<string, string> = {
  VAPI: '#CAFF57', Gemini: '#CAFF57', Groq: '#CAFF57', Mistral: '#CAFF57',
  OpenAI: '#CAFF57', LangChain: '#CAFF57', LangGraph: '#CAFF57',
  HuggingFace: '#CAFF57', 'Voice AI': '#CAFF57',
  n8n: '#57FFD8', FastAPI: '#57FFD8', WebSocket: '#57FFD8', Tavily: '#57FFD8',
  Supabase: '#FFD657', Redis: '#FFD657', Scrapy: '#FFD657',
  Python: '#FFD657', NLP: '#FFD657',
  React: '#FF9557', 'Next.js': '#FF9557', 'React-PDF': '#FF9557',
}

const MONO = "'Courier New', monospace"

// ── Utility components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CFG[status]
  return (
    <span style={{
      border: `1px solid ${cfg.color}`, color: cfg.color, background: cfg.bg,
      fontSize: '9px', fontFamily: MONO, letterSpacing: '0.14em',
      padding: '2px 7px', borderRadius: '999px',
      display: 'inline-flex', alignItems: 'center', gap: '5px', flexShrink: 0,
    }}>
      {cfg.dot && (
        <motion.span
          style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {status}
    </span>
  )
}

function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? 'rgba(202,255,87,0.35)'
  return (
    <span style={{
      fontSize: '10px', fontFamily: MONO, color,
      border: `1px solid ${color}44`, background: `${color}14`,
      padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap',
    }}>
      {tag}
    </span>
  )
}

// ── SVG Visual components ─────────────────────────────────────────────────────

function WaveformVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const bars = [20, 35, 55, 42, 70, 88, 60, 45, 72, 50, 38, 25]
  const spd  = hovered ? 0.6 : 1
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      <line x1="0" y1="50" x2="300" y2="50" stroke="#3A4A28" strokeWidth="0.5" />
      {bars.map((maxH, i) => {
        const minH = maxH * 0.4
        const x    = 18 + i * 22
        return (
          <motion.rect
            key={i}
            x={x} width={4} rx={2}
            fill="#CAFF57"
            fillOpacity={0.35 + (i % 3) * 0.2}
            animate={inView ? {
              height: [minH, maxH, minH],
              y: [50 - minH / 2, 50 - maxH / 2, 50 - minH / 2],
            } : { height: minH, y: 50 - minH / 2 }}
            transition={inView ? {
              duration: (1.2 + i * 0.14) * spd,
              repeat: Infinity, ease: 'easeInOut', delay: i * 0.08,
            } : { duration: 0 }}
          />
        )
      })}
    </svg>
  )
}

function DocumentVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const lines = [
    { width: 190, y: 12 },
    { width: 148, y: 26 },
    { width: 210, y: 40 },
    { width: 168, y: 54 },
    { width: 126, y: 68 },
    { width:  98, y: 82 },
  ]
  const spd = hovered ? 0.55 : 1
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [inView])

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {lines.map((line, i) => (
        <motion.rect
          key={i}
          x={16} y={line.y} height={2} rx={1}
          fill={i === 2 ? '#CAFF57' : '#3A4A28'}
          fillOpacity={i === 2 ? 1 : 0.6}
          animate={inView
            ? { width: [0, line.width, line.width, 0] }
            : { width: line.width * 0.2 }}
          transition={inView ? {
            duration: 3.2 * spd, times: [0, 0.38, 0.78, 1],
            repeat: Infinity, delay: i * 0.28, ease: 'easeInOut',
          } : { duration: 0 }}
        />
      ))}
      {inView && (
        <rect x={230} y={36} width={3} height={10} fill="#CAFF57" fillOpacity={cursorOn ? 1 : 0} />
      )}
    </svg>
  )
}

function SpiderVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const CX = 150, CY = 50, R = 40
  const spd = hovered ? 0.6 : 1
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
  })

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {nodes.map((nd, i) => (
        <motion.line
          key={`e${i}`}
          x1={CX} y1={CY} x2={nd.x} y2={nd.y}
          stroke="#CAFF57" strokeWidth="0.8" strokeOpacity={0.55}
          strokeDasharray={R}
          animate={inView
            ? { strokeDashoffset: [R, 0, 0, R] }
            : { strokeDashoffset: R }}
          transition={inView ? {
            duration: 2.4 * spd, times: [0, 0.3, 0.8, 1],
            repeat: Infinity, delay: i * 0.28,
          } : { duration: 0 }}
        />
      ))}
      <circle cx={CX} cy={CY} r={9} fill="#CAFF57" fillOpacity={0.12} stroke="#CAFF57" strokeWidth={1} />
      <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" fill="#CAFF57" fontSize={6.5} fontFamily={MONO}>
        AI
      </text>
      {nodes.map((nd, i) => (
        <circle key={`n${i}`} cx={nd.x} cy={nd.y} r={4} fill="#CAFF57" fillOpacity={0.6} />
      ))}
      {inView && nodes.map((nd, i) => (
        <motion.circle
          key={`d${i}`} r={2} fill="#CAFF57"
          animate={{ cx: [CX, nd.x, CX], cy: [CY, nd.y, CY], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4 * spd, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

const PASS_SET    = new Set([0,1,2,3,4,5,6,7,8,9,10,11,13,14,15,17,18,19,21,22,23,24])
const BENCH_TOTAL = 28
const BENCH_CYCLE = BENCH_TOTAL + 12

function BenchmarkVisual({ inView }: { hovered: boolean; inView: boolean }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setTick(t => (t + 1) % BENCH_CYCLE), 80)
    return () => clearInterval(id)
  }, [inView])

  const COLS = 7, SQ = 10, GAP = 4
  const OX = (300 - COLS * (SQ + GAP) + GAP) / 2
  const OY = 12

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {Array.from({ length: BENCH_TOTAL }, (_, i) => {
        const col    = i % COLS
        const row    = Math.floor(i / COLS)
        const filled = (tick > i && tick <= BENCH_TOTAL) || tick > BENCH_TOTAL
        const isPass = PASS_SET.has(i)
        return (
          <motion.rect
            key={i}
            x={OX + col * (SQ + GAP)}
            y={OY + row * (SQ + GAP)}
            width={SQ} height={SQ} rx={2}
            animate={{
              fill:        filled ? (isPass ? '#CAFF57' : '#FF4757') : '#181C12',
              fillOpacity: filled ? 0.85 : 0.4,
            }}
            transition={{ duration: 0.18 }}
          />
        )
      })}
      <text x={290} y={92} textAnchor="end" fill="#3A4A28" fontSize={8.5} fontFamily={MONO}>
        PASS RATE: 87%
      </text>
    </svg>
  )
}

function FunnelVisual({ inView }: { hovered: boolean; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let n = 0
    const id = setInterval(() => {
      n++
      setCount(n)
      if (n >= 47) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [inView])

  const stages = [
    { label: 'INBOUND',    w: 165, y: 10, opacity: 0.8,  accent: false },
    { label: 'QUALIFIED',  w: 118, y: 30, opacity: 0.7,  accent: false },
    { label: 'INTERESTED', w:  72, y: 50, opacity: 0.6,  accent: false },
    { label: 'CLOSED',     w:  40, y: 70, opacity: 1.0,  accent: true  },
  ]

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {stages.map((s, i) => (
        <g key={i}>
          <motion.rect
            x={6} y={s.y} height={10} rx={2}
            fill="#CAFF57" fillOpacity={s.opacity}
            animate={inView ? { width: [0, s.w] } : { width: s.w * 0.15 }}
            transition={inView ? { duration: 0.8, delay: i * 0.18, ease: 'easeOut' } : { duration: 0 }}
          />
          <text x={182} y={s.y + 8} fill={s.accent ? '#CAFF57' : '#3A4A28'} fontSize={8} fontFamily={MONO}>
            {s.label}
          </text>
        </g>
      ))}
      <text x={292} y={78} textAnchor="end" fill="#CAFF57" fontSize={11} fontFamily={MONO} fontWeight="600">
        {count}
      </text>
      <text x={292} y={88} textAnchor="end" fill="#3A4A28" fontSize={7} fontFamily={MONO}>
        DEALS CLOSED
      </text>
    </svg>
  )
}

function ProjectVisual({ type, hovered, inView }: { type: Visual; hovered: boolean; inView: boolean }) {
  switch (type) {
    case 'waveform':  return <WaveformVisual  hovered={hovered} inView={inView} />
    case 'document':  return <DocumentVisual  hovered={hovered} inView={inView} />
    case 'spider':    return <SpiderVisual    hovered={hovered} inView={inView} />
    case 'benchmark': return <BenchmarkVisual hovered={hovered} inView={inView} />
    case 'funnel':    return <FunnelVisual    hovered={hovered} inView={inView} />
  }
}

// ── Mini flow graph (strip card) ─────────────────────────────────────────────

function FlowGraph() {
  const LINE = 14
  return (
    <svg
      viewBox="0 0 72 16" width="72" height="16" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      {[{ x1: 14, x2: 28 }, { x1: 43, x2: 57 }].map((seg, i) => (
        <motion.line
          key={i}
          x1={seg.x1} y1={8} x2={seg.x2} y2={8}
          stroke="#CAFF57" strokeWidth={1.5}
          strokeDasharray={LINE}
          animate={{ strokeDashoffset: [LINE, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.38, ease: 'linear' }}
        />
      ))}
      {[28, 57].map((x, i) => (
        <polygon key={i} points={`${x},8 ${x - 4},5 ${x - 4},11`} fill="#CAFF57" />
      ))}
      {[8, 35, 63].map((cx, i) => (
        <circle key={i} cx={cx} cy={8} r={5} fill="#CAFF57" fillOpacity={0.15} stroke="#CAFF57" strokeWidth={1} />
      ))}
    </svg>
  )
}

// ── TiltCard ──────────────────────────────────────────────────────────────────

function TiltCard({ children, className, disabled }: { children: ReactNode; className?: string; disabled?: boolean }) {
  const ref   = useRef<HTMLDivElement>(null)
  const rotX  = useMotionValue(0)
  const rotY  = useMotionValue(0)
  const glrX  = useMotionValue(50)
  const glrY  = useMotionValue(50)
  const sX    = useSpring(rotX, { stiffness: 140, damping: 18 })
  const sY    = useSpring(rotY, { stiffness: 140, damping: 18 })
  const glare = useMotionTemplate`radial-gradient(ellipse at ${glrX}% ${glrY}%, rgba(202,255,87,0.07) 0%, transparent 60%)`
  const [hov, setHov] = useState(false)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    rotX.set(((e.clientY - (r.top  + r.height / 2)) / r.height) * -6)
    rotY.set(((e.clientX - (r.left + r.width  / 2)) / r.width)  *  6)
    glrX.set(((e.clientX - r.left) / r.width)  * 100)
    glrY.set(((e.clientY - r.top)  / r.height) * 100)
    if (!hov) setHov(true)
  }

  function onLeave() {
    rotX.set(0); rotY.set(0); setHov(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{ rotateX: sX, rotateY: sY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <AnimatePresence>
        {!disabled && hov && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glare }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Card templates ────────────────────────────────────────────────────────────

function CardMeta({ project }: { project: ProjectData }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
        {project.number}
      </span>
      <StatusBadge status={project.status} />
    </div>
  )
}

function CardFooter({ project }: { project: ProjectData }) {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-3">
      <a
        href={project.github} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-accent"
      >
        <Github size={11} /> GitHub ↗
      </a>
      <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: MONO, color: 'var(--color-dim)', letterSpacing: '0.06em' }}>
        {project.impact}
      </span>
    </div>
  )
}

function FeaturedCard({ project, inView, reduced }: { project: ProjectData; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard disabled={reduced} className="h-full">
      <motion.article
        className="flex h-full flex-col rounded-xl border border-border bg-surface"
        style={{ minHeight: 320 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ borderColor: 'rgba(202,255,87,0.32)' }}
        transition={{ duration: 0.22 }}
      >
        <div style={{
          height: 140, overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface-2)',
        }}>
          <ProjectVisual type={project.visual} hovered={hovered} inView={inView} />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <CardMeta project={project} />
          <h3 className="text-[18px] font-semibold text-text">{project.name}</h3>
          <p className="flex-1 text-[13px] leading-relaxed text-muted">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => <TagPill key={t} tag={t} />)}
          </div>
          <CardFooter project={project} />
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', fontFamily: MONO, color: '#CAFF57', letterSpacing: '0.14em', marginTop: 2 }}
              >
                VIEW PROJECT ↗
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function StandardCard({ project, inView, reduced }: { project: ProjectData; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <TiltCard disabled={reduced} className="h-full">
      <motion.article
        className="flex h-full flex-col rounded-xl border border-border bg-surface"
        style={{ minHeight: 260 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ borderColor: 'rgba(202,255,87,0.32)' }}
        transition={{ duration: 0.22 }}
      >
        <div style={{
          height: 80, overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface-2)',
        }}>
          <ProjectVisual type={project.visual} hovered={hovered} inView={inView} />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <CardMeta project={project} />
          <h3 className="text-[16px] font-semibold text-text">{project.name}</h3>
          <p className="flex-1 text-[13px] leading-relaxed text-muted">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => <TagPill key={t} tag={t} />)}
          </div>
          <CardFooter project={project} />
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', fontFamily: MONO, color: '#CAFF57', letterSpacing: '0.14em', marginTop: 2 }}
              >
                VIEW PROJECT ↗
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function StripCard({ project }: { project: ProjectData }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.article
      className="flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center md:gap-6"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', minHeight: 80 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered ? 'rgba(202,255,87,0.42)' : 'rgba(255,255,255,0.08)',
        boxShadow:   hovered ? 'inset 2px 0 0 #CAFF57' : 'inset 0 0 0 transparent',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-wrap items-center gap-2 md:min-w-[260px]">
        <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
          {project.number}
        </span>
        <FlowGraph />
        <span className="text-[15px] font-semibold text-text">{project.name}</span>
        <StatusBadge status={project.status} />
      </div>
      <p className="flex-1 text-[13px] text-muted">{project.desc}</p>
      <div className="flex flex-wrap items-center gap-2 md:min-w-[220px] md:justify-end">
        {project.tags.slice(0, 3).map(t => <TagPill key={t} tag={t} />)}
        <a
          href={project.github} target="_blank" rel="noopener noreferrer"
          className="ml-2 flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-accent"
        >
          <Github size={11} /> GitHub ↗
        </a>
      </div>
    </motion.article>
  )
}

// ── Per-card inView wrapper ───────────────────────────────────────────────────

function CardWrapper({ project, colClass, reduced }: { project: ProjectData; colClass: string; reduced: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={colClass}
      variants={reduced ? undefined : scaleIn}
    >
      {project.template === 'featured' && <FeaturedCard  project={project} inView={inView} reduced={reduced} />}
      {project.template === 'standard' && <StandardCard  project={project} inView={inView} reduced={reduced} />}
      {project.template === 'strip'    && <StripCard     project={project} />}
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const reduced    =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="projects" ref={sectionRef} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-6"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Projects</p>
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
            Things I&apos;ve shipped.
          </h2>
        </motion.div>

        {/* Status legend */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10 flex flex-wrap items-center gap-6"
        >
          {(Object.keys(STATUS_CFG) as Status[]).map(s => (
            <span key={s} className="flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_CFG[s].color, display: 'inline-block' }} />
              <span style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-muted)', letterSpacing: '0.12em' }}>{s}</span>
            </span>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: MONO, color: 'var(--color-dim)' }}>
            6 projects
          </span>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-12 gap-3"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
        >
          {PROJECTS.map(p => (
            <CardWrapper
              key={p.name}
              project={p}
              colClass={COL_CLASSES[p.name] ?? 'col-span-12'}
              reduced={reduced}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
