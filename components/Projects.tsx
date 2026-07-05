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
import { Github, ExternalLink, Lock } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

// ── Types ─────────────────────────────────────────────────────────────────────

type Status   = 'PRODUCTION' | 'RESEARCH' | 'OPEN SOURCE' | 'INTERNAL'
type Visual   = 'waveform' | 'document' | 'spider' | 'benchmark' | 'funnel' | 'rag' | 'pathfinding' | 'agents'
type Template = 'featured' | 'standard' | 'strip'

interface ProjectData {
  number:   string
  name:     string
  status:   Status
  desc:     string
  tags:     string[]
  impact:   string
  github:   string | null   // real repo URL only — never a profile fallback
  source?:  string          // shown when github is null, e.g. 'Private · client work'
  live?:    string
  visual:   Visual
  template: Template
}

// ── Data ──────────────────────────────────────────────────────────────────────
// Link policy: `github` holds a REAL repository URL or null. Closed-source and
// client work states so explicitly via `source` — no silent profile links.

const PROJECTS: ProjectData[] = [
  {
    number: '01', name: 'Visa2Land', status: 'PRODUCTION',
    desc:   'Voice AI platform for Australian visa eligibility. Live with a real migration agency client — handles full eligibility logic across subclasses in real-time.',
    tags:   ['VAPI', 'n8n', 'FastAPI', 'React', 'Voice AI'],
    impact: 'Live client',
    github: null, source: 'Private · client work',
    visual: 'waveform', template: 'featured',
  },
  {
    number: '02', name: 'ScopeForge', status: 'PRODUCTION',
    desc:   'Two-pass LLM pipeline generating client-ready SOWs with scoring, diagrams, and psychology-driven rewrites. Cuts proposal time from days to under 3 minutes.',
    tags:   ['Gemini', 'Groq', 'Mistral', 'React-PDF'],
    impact: '2-pass pipeline',
    github: null, source: 'Private · client work',
    visual: 'document', template: 'standard',
  },
  {
    number: '03', name: 'NexusDeals', status: 'PRODUCTION',
    desc:   'Pakistan-focused deal aggregator. 155 sites, 25 Scrapy spiders, Redis caching, live deal feed with sub-second refresh.',
    tags:   ['Next.js', 'FastAPI', 'Supabase', 'Scrapy', 'Redis'],
    impact: '155 sites',
    github: null, source: 'Private · in production',
    visual: 'spider', template: 'standard',
  },
  {
    number: '04', name: 'Agent Reliability Auditor', status: 'RESEARCH',
    desc:   'Thesis: systematic LLM degradation benchmarking across English, Roman Urdu, and code-switched inputs. 14 models, 3,000+ prompts, 18–34% accuracy drops identified.',
    tags:   ['Python', 'HuggingFace', 'LangChain', 'NLP'],
    impact: '14 models · 3,000+ prompts',
    github: null, source: 'Private · thesis',
    visual: 'benchmark', template: 'standard',
  },
  {
    number: '05', name: 'VocalCRM', status: 'PRODUCTION',
    desc:   'Inbound voice AI for real estate lead qualification. Handles screening, objection handling, and CRM push in real-time with no human in the loop.',
    tags:   ['VAPI', 'n8n', 'WebSocket', 'Supabase', 'OpenAI'],
    impact: 'Real-time CRM',
    github: null, source: 'Private · client work',
    visual: 'funnel', template: 'standard',
  },
  {
    number: '06', name: 'NLP-RAG-Agent', status: 'OPEN SOURCE',
    desc:   'Three-stage NLP system: information extraction → FAISS vector retrieval → sentiment-aware LLM response. Deployed and live on Vercel.',
    tags:   ['LangChain', 'FAISS', 'OpenAI', 'Next.js', 'TypeScript'],
    impact: 'Live on Vercel',
    github: 'https://github.com/Hasee10/NLP-RAG-Agent',
    live:   'https://rag-sentiment-seven.vercel.app',
    visual: 'rag', template: 'standard',
  },
  {
    number: '07', name: 'AI Voice Agent — LiveKit', status: 'OPEN SOURCE',
    desc:   'Real-time AI voice agent for AutoZone service. Integrates LiveKit transport, Gemini API inference, and a React frontend for sub-200ms round-trip responses.',
    tags:   ['LiveKit', 'Gemini', 'Flask', 'React', 'Voice AI'],
    impact: 'Sub-200ms',
    github: 'https://github.com/Hasee10/AI-Voice-Agent-LiveKit',
    visual: 'waveform', template: 'standard',
  },
  {
    number: '08', name: 'AeroNet Lite', status: 'OPEN SOURCE',
    desc:   'Autonomous drone delivery simulation with CSP constraint planning, A* multi-hop routing, and real-time fleet replanning under node failures.',
    tags:   ['Python', 'A* Search', 'CSP', 'Simulation'],
    impact: 'Fleet planning',
    github: 'https://github.com/Hasee10/AeroNet_Lite',
    visual: 'pathfinding', template: 'standard',
  },
  {
    number: '09', name: 'LangGraph Agents', status: 'INTERNAL',
    desc:   'Modular multi-agent orchestration — research, code review, and web-search agents with shared persistent memory across sessions.',
    tags:   ['LangGraph', 'OpenAI', 'Tavily', 'FastAPI'],
    impact: 'Persistent memory',
    github: null, source: 'Private · internal tooling',
    visual: 'agents', template: 'strip',
  },
]

// Bento weights — production/client work gets more visual area than
// research or internal tooling.
const COL_CLASSES: Record<string, string> = {
  'Visa2Land':                'col-span-12 md:col-span-8',
  'ScopeForge':               'col-span-12 md:col-span-4',
  'NexusDeals':               'col-span-12 md:col-span-4',
  'Agent Reliability Auditor':'col-span-12 md:col-span-4',
  'VocalCRM':                 'col-span-12 md:col-span-4',
  'NLP-RAG-Agent':            'col-span-12 md:col-span-4',
  'AI Voice Agent — LiveKit': 'col-span-12 md:col-span-4',
  'AeroNet Lite':             'col-span-12 md:col-span-4',
  'LangGraph Agents':         'col-span-12',
}

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<Status, { color: string; bg: string; dot: boolean }> = {
  PRODUCTION:    { color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',  dot: true  },
  RESEARCH:      { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',  dot: false },
  'OPEN SOURCE': { color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',  dot: false },
  INTERNAL:      { color: '#8A9A7E', bg: 'rgba(138,154,126,0.08)', dot: false },
}

const TAG_COLORS: Record<string, string> = {
  // LLM / AI
  VAPI: '#CAFF57', Gemini: '#CAFF57', Groq: '#CAFF57', Mistral: '#CAFF57',
  OpenAI: '#CAFF57', LangChain: '#CAFF57', LangGraph: '#CAFF57',
  HuggingFace: '#CAFF57', 'Voice AI': '#CAFF57', LiveKit: '#CAFF57',
  FAISS: '#CAFF57',
  // Infra / backend
  n8n: '#57FFD8', FastAPI: '#57FFD8', WebSocket: '#57FFD8', Tavily: '#57FFD8',
  Flask: '#57FFD8',
  // Data / algo
  Supabase: '#FFD657', Redis: '#FFD657', Scrapy: '#FFD657',
  Python: '#FFD657', NLP: '#FFD657', 'A* Search': '#FFD657',
  CSP: '#FFD657', Simulation: '#FFD657',
  // Frontend
  React: '#FF9557', 'Next.js': '#FF9557', 'React-PDF': '#FF9557',
  TypeScript: '#FF9557',
}

const MONO = 'var(--font-geist-mono), monospace'

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

// ── SVG Visuals — each scoped to its own project's actual content ────────────

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
            key={i} x={x} width={4} rx={2} fill="#CAFF57"
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
    { width: 190, y: 12 }, { width: 148, y: 26 }, { width: 210, y: 40 },
    { width: 168, y: 54 }, { width: 126, y: 68 }, { width:  98, y: 82 },
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
          key={i} x={16} y={line.y} height={2} rx={1}
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
  const CX = 150, CY = 50, R = 38
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
          animate={inView ? { strokeDashoffset: [R, 0, 0, R] } : { strokeDashoffset: R }}
          transition={inView ? {
            duration: 2.4 * spd, times: [0, 0.3, 0.8, 1],
            repeat: Infinity, delay: i * 0.28,
          } : { duration: 0 }}
        />
      ))}
      <circle cx={CX} cy={CY} r={9} fill="#CAFF57" fillOpacity={0.12} stroke="#CAFF57" strokeWidth={1} />
      <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" fill="#CAFF57" fontSize={6.5} fontFamily={MONO}>AI</text>
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
      <text x={294} y={92} textAnchor="end" fill="#3A4A28" fontSize={7} fontFamily={MONO}>25 SPIDERS · 155 SITES</text>
    </svg>
  )
}

// Benchmark grid — Agent Reliability Auditor. The pass/fail texture is
// illustrative; the caption states only the project's REAL numbers.
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
        const col    = i % COLS, row = Math.floor(i / COLS)
        const filled = (tick > i && tick <= BENCH_TOTAL) || tick > BENCH_TOTAL
        const isPass = PASS_SET.has(i)
        return (
          <motion.rect
            key={i}
            x={OX + col * (SQ + GAP)} y={OY + row * (SQ + GAP)}
            width={SQ} height={SQ} rx={2}
            style={{ fill: '#181C12', fillOpacity: 0.4 }}
            animate={{ fill: filled ? (isPass ? '#CAFF57' : '#FF4757') : '#181C12', fillOpacity: filled ? 0.85 : 0.4 }}
            transition={{ duration: 0.18 }}
          />
        )
      })}
      <text x={294} y={92} textAnchor="end" fill="#3A4A28" fontSize={8} fontFamily={MONO}>14 MODELS · 3,000+ PROMPTS</text>
    </svg>
  )
}

// Lead-qualification funnel — VocalCRM. Stage labels describe what the
// system does; no invented deal counts.
function FunnelVisual({ inView }: { hovered: boolean; inView: boolean }) {
  const stages = [
    { label: 'INBOUND CALL', w: 165, y: 10, opacity: 0.8,  accent: false },
    { label: 'SCREENED',     w: 118, y: 30, opacity: 0.7,  accent: false },
    { label: 'QUALIFIED',    w:  72, y: 50, opacity: 0.6,  accent: false },
    { label: 'CRM PUSH',     w:  40, y: 70, opacity: 1.0,  accent: true  },
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
          <text x={182} y={s.y + 8} fill={s.accent ? '#CAFF57' : '#3A4A28'} fontSize={8} fontFamily={MONO}>{s.label}</text>
        </g>
      ))}
      <text x={294} y={92} textAnchor="end" fill="#3A4A28" fontSize={7} fontFamily={MONO}>NO HUMAN IN THE LOOP</text>
    </svg>
  )
}

// RAG pipeline: QUERY → VECTORS → LLM → ANSWER
function RAGVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const spd = hovered ? 0.6 : 1

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {/* Stage 1: QUERY box */}
      <rect x="8" y="33" width="46" height="24" rx="4" fill="#CAFF57" fillOpacity="0.06" stroke="#CAFF57" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x="31" y="47" textAnchor="middle" dominantBaseline="middle" fill="#CAFF57" fontSize="7" fontFamily={MONO}>QUERY</text>

      {/* Connector arrow 1 */}
      <line x1="54" y1="45" x2="84" y2="45" stroke="#3A4A28" strokeWidth="0.8" />
      <polygon points="84,45 80,42.5 80,47.5" fill="#3A4A28" />

      {/* Stage 2: Vector cluster */}
      {[[102,30],[116,42],[108,55],[126,38],[120,62],[136,50]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={3.5}
          fill="#57FFD8" fillOpacity={0.65}
          animate={inView ? { fillOpacity: [0.3, 0.85, 0.3], r: [3, 4.2, 3] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
        />
      ))}
      <text x="119" y="90" textAnchor="middle" fill="#3A4A28" fontSize="6.5" fontFamily={MONO}>FAISS VECTORS</text>

      {/* Connector arrow 2 */}
      <line x1="148" y1="45" x2="178" y2="45" stroke="#3A4A28" strokeWidth="0.8" />
      <polygon points="178,45 174,42.5 174,47.5" fill="#3A4A28" />

      {/* Stage 3: LLM circle */}
      <circle cx="210" cy="45" r="24" fill="#CAFF57" fillOpacity="0.05" stroke="#CAFF57" strokeWidth="0.8" />
      <text x="210" y="41" textAnchor="middle" dominantBaseline="middle" fill="#CAFF57" fontSize="7" fontFamily={MONO}>LLM</text>
      <text x="210" y="52" textAnchor="middle" dominantBaseline="middle" fill="#CAFF57" fontSize="5.5" fontFamily={MONO} fillOpacity="0.6">MODEL</text>

      {/* Output lines */}
      {[[254, 34, 32], [254, 43, 26], [254, 52, 20]].map(([x, y, w], i) => (
        <motion.rect key={i}
          x={x} y={y} height={2} rx={1} fill="#CAFF57"
          fillOpacity={0.55 - i * 0.12}
          animate={inView ? { width: [0, w] } : { width: 0 }}
          transition={inView ? {
            duration: 0.55, delay: 0.3 + i * 0.22,
            repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut',
          } : { duration: 0 }}
        />
      ))}
      <text x="254" y="65" fill="#3A4A28" fontSize="6.5" fontFamily={MONO}>ANSWER</text>

      {/* Animated retrieval dot */}
      {inView && (
        <motion.circle r="3.5" fill="#CAFF57" fillOpacity="0.9"
          animate={{
            cx: [31, 31, 119, 210, 210],
            cy: [45, 45,  45,  45,  45],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 2.0 * spd, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut', times: [0, 0.05, 0.45, 0.85, 1] }}
        />
      )}
    </svg>
  )
}

// A* drone routing simulation — AeroNet Lite
const DRONE_WPS = [
  [16, 50], [48, 50], [72, 72], [112, 72], [142, 50],
  [172, 50], [194, 28], [228, 28], [254, 50], [284, 50],
] as [number, number][]

function PathfindingVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const spd = hovered ? 0.6 : 1
  const pathD = DRONE_WPS.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')

  const walls = [
    { x: 54, y: 36, w: 11, h: 28 },
    { x: 148, y: 36, w: 11, h: 28 },
    { x: 180, y: 46, w: 11, h: 30 },
  ]

  // Dot grid background
  const dots: [number, number][] = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push([col * 28 + 18, row * 22 + 16])
    }
  }

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" aria-hidden="true">
      {/* Dot grid */}
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#3A4A28" fillOpacity={0.45} />
      ))}

      {/* Obstacle blocks */}
      {walls.map((w, i) => (
        <g key={i}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={2}
            fill="#FF4757" fillOpacity={0.1} stroke="#FF4757" strokeWidth="0.8" strokeOpacity={0.35} />
          <text x={w.x + w.w / 2} y={w.y + w.h / 2 + 1} textAnchor="middle" dominantBaseline="middle"
            fill="#FF4757" fontSize={5} fontFamily={MONO} fillOpacity={0.6}>WALL</text>
        </g>
      ))}

      {/* Path */}
      <motion.path
        d={pathD} fill="none" stroke="#CAFF57" strokeWidth="1.5"
        strokeDasharray="5 3"
        animate={inView ? { pathLength: [0, 1] } : { pathLength: 0 }}
        transition={{ duration: 2.4 * spd, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }}
      />

      {/* Start marker */}
      <circle cx={DRONE_WPS[0][0]} cy={DRONE_WPS[0][1]} r={5} fill="none" stroke="#57FFD8" strokeWidth={1.5} />
      {/* End marker */}
      <circle cx={DRONE_WPS[DRONE_WPS.length - 1][0]} cy={DRONE_WPS[DRONE_WPS.length - 1][1]} r={5} fill="#CAFF57" fillOpacity={0.25} stroke="#CAFF57" strokeWidth={1.5} />

      {/* Drone dot */}
      {inView && (
        <motion.circle r={4.5} fill="#CAFF57"
          animate={{
            cx: DRONE_WPS.map(p => p[0]),
            cy: DRONE_WPS.map(p => p[1]),
          }}
          transition={{
            duration: 2.4 * spd, ease: 'easeInOut',
            repeat: Infinity, repeatDelay: 0.7,
            times: DRONE_WPS.map((_, i) => i / (DRONE_WPS.length - 1)),
          }}
        />
      )}

      <text x="6" y="95" fill="#3A4A28" fontSize="7" fontFamily={MONO}>A* ROUTING · FLEET REPLANNING</text>
    </svg>
  )
}

// Multi-agent flow — LangGraph Agents strip card
function AgentsVisual() {
  const LINE = 14
  return (
    <svg viewBox="0 0 72 16" width="72" height="16" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      {[{ x1: 14, x2: 28 }, { x1: 43, x2: 57 }].map((seg, i) => (
        <motion.line key={i}
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

function ProjectVisual({ type, hovered, inView }: { type: Visual; hovered: boolean; inView: boolean }) {
  switch (type) {
    case 'waveform':     return <WaveformVisual     hovered={hovered} inView={inView} />
    case 'document':     return <DocumentVisual     hovered={hovered} inView={inView} />
    case 'spider':       return <SpiderVisual       hovered={hovered} inView={inView} />
    case 'benchmark':    return <BenchmarkVisual    hovered={hovered} inView={inView} />
    case 'funnel':       return <FunnelVisual       hovered={hovered} inView={inView} />
    case 'rag':          return <RAGVisual          hovered={hovered} inView={inView} />
    case 'pathfinding':  return <PathfindingVisual  hovered={hovered} inView={inView} />
    case 'agents':       return null // inline mini-graph rendered by StripCard
  }
}

// ── TiltCard — the site's single 3D touch: CSS perspective tilt, transform
//    only, no render loop, disabled under reduced motion. ──────────────────────

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

  function onLeave() { rotX.set(0); rotY.set(0); setHov(false) }

  return (
    <motion.div
      ref={ref} className={`relative overflow-hidden ${className ?? ''}`}
      style={{ rotateX: sX, rotateY: sY, transformPerspective: 900 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
      <AnimatePresence>
        {!disabled && hov && (
          <motion.div aria-hidden="true"
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

// ── Card components ───────────────────────────────────────────────────────────

function CardMeta({ project }: { project: ProjectData }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
        {project.number}
      </span>
      <div className="flex items-center gap-2">
        {project.live && (
          <span style={{
            fontSize: '8px', fontFamily: MONO, color: '#4ADE80',
            border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.06)',
            padding: '2px 6px', borderRadius: '999px', letterSpacing: '0.12em',
          }}>
            LIVE
          </span>
        )}
        <StatusBadge status={project.status} />
      </div>
    </div>
  )
}

/* Footer: real repo link OR an explicit private label — never a silent
   profile-URL fallback. */
function CardFooter({ project }: { project: ProjectData }) {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-3">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-accent"
          onClick={e => e.stopPropagation()}>
          <Github size={11} /> GitHub ↗
        </a>
      ) : (
        <span className="flex items-center gap-1.5 text-[12px] text-dim">
          <Lock size={10} /> {project.source ?? 'Private'}
        </span>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-accent"
          onClick={e => e.stopPropagation()}>
          <ExternalLink size={11} /> Live ↗
        </a>
      )}
      <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: MONO, color: 'var(--color-dim)', letterSpacing: '0.06em' }}>
        {project.impact}
      </span>
    </div>
  )
}

function FeaturedCard({ project, inView, reduced }: { project: ProjectData; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  const primaryUrl = project.live ?? project.github ?? undefined
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
            {hovered && primaryUrl && (
              <motion.a
                href={primaryUrl} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-accent)', letterSpacing: '0.14em', marginTop: 2 }}
                onClick={e => e.stopPropagation()}
              >
                VIEW PROJECT ↗
              </motion.a>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function StandardCard({ project, inView, reduced }: { project: ProjectData; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  const primaryUrl = project.live ?? project.github ?? undefined
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
            {hovered && primaryUrl && (
              <motion.a
                href={primaryUrl} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-accent)', letterSpacing: '0.14em', marginTop: 2 }}
                onClick={e => e.stopPropagation()}
              >
                VIEW PROJECT ↗
              </motion.a>
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
      {/* Title block — h3 first so the name can never be lost in the wrap */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:min-w-[300px]">
        <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
          {project.number}
        </span>
        <h3 className="text-[15px] font-semibold text-text">{project.name}</h3>
        <StatusBadge status={project.status} />
        <AgentsVisual />
      </div>
      <p className="flex-1 text-[13px] text-muted">{project.desc}</p>
      <div className="flex flex-wrap items-center gap-2 md:min-w-[220px] md:justify-end">
        {project.tags.slice(0, 3).map(t => <TagPill key={t} tag={t} />)}
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-accent">
            <Github size={11} /> GitHub ↗
          </a>
        ) : (
          <span className="ml-2 flex items-center gap-1 text-[12px] text-dim">
            <Lock size={10} /> {project.source ?? 'Private'}
          </span>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-accent">
            <ExternalLink size={11} /> Live ↗
          </a>
        )}
      </div>
    </motion.article>
  )
}

// ── Per-card inView wrapper ───────────────────────────────────────────────────

function CardWrapper({ project, colClass, reduced }: { project: ProjectData; colClass: string; reduced: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref} className={colClass} variants={reduced ? undefined : scaleIn}>
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
  const reduced    = useReducedMotion()

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
          <h2 className="font-mono text-[30px] font-medium tracking-tight text-text md:text-[38px]">
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
            {PROJECTS.length} projects
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
