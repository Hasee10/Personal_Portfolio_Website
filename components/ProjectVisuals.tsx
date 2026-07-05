'use client'

/* Shared project visual components — used by the /projects grid cards and the
 * /projects/[slug] detail pages. Each visual is scoped to its own project's
 * actual content; captions state only real numbers.
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { type Status, type Visual, STATUS_CFG, TAG_COLORS } from '@/lib/projects'
import StackIcon from '@/components/StackIcon'

const MONO = 'var(--font-geist-mono), monospace'

// ── Badges & pills ────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CFG[status]
  return (
    <span style={{
      border: `1px solid ${cfg.color}66`, color: cfg.color, background: cfg.bg,
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

export function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] ?? 'rgba(157,190,141,0.35)'
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

// ── Visuals ───────────────────────────────────────────────────────────────────

function WaveformVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const bars = [20, 35, 55, 42, 70, 88, 60, 45, 72, 50, 38, 25]
  const spd  = hovered ? 0.6 : 1
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line x1="0" y1="50" x2="300" y2="50" stroke="#3A4A28" strokeWidth="0.5" />
      {bars.map((maxH, i) => {
        const minH = maxH * 0.4
        const x    = 18 + i * 22
        return (
          <motion.rect
            key={i} x={x} width={4} rx={2} fill="#9DBE8D"
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

// Two-pass SOW document being written — draft column feeds a refined column.
function DocumentVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const spd = hovered ? 0.55 : 1
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [inView])

  const draft = [
    { w: 96, y: 30 }, { w: 76, y: 40 }, { w: 104, y: 50 },
    { w: 84, y: 60 }, { w: 60, y: 70 }, { w: 92, y: 80 },
  ]
  const refined = [
    { w: 100, y: 30, hot: false }, { w: 82, y: 40, hot: true }, { w: 96, y: 50, hot: false },
    { w: 70, y: 60, hot: false }, { w: 88, y: 70, hot: true }, { w: 54, y: 80, hot: false },
  ]

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x={12} y={10} width={118} height={82} rx={4} fill="#9DBE8D" fillOpacity={0.03} stroke="#3A4A28" strokeWidth={0.8} />
      <rect x={170} y={10} width={118} height={82} rx={4} fill="#9DBE8D" fillOpacity={0.05} stroke="#9DBE8D" strokeWidth={0.8} strokeOpacity={0.4} />

      <text x={20} y={22} fill="#3A4A28" fontSize={7} fontFamily={MONO}>PASS 1 · DRAFT</text>
      <text x={178} y={22} fill="#9DBE8D" fontSize={7} fontFamily={MONO}>PASS 2 · SOW</text>

      {draft.map((l, i) => (
        <motion.rect
          key={`d${i}`} x={20} y={l.y} height={2} rx={1}
          fill="#3A4A28" fillOpacity={0.7}
          animate={inView ? { width: l.w } : { width: l.w * 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        />
      ))}

      <line x1={136} y1={51} x2={162} y2={51} stroke="#3A4A28" strokeWidth={0.8} />
      <polygon points="164,51 159,48.5 159,53.5" fill="#3A4A28" />
      <motion.circle
        r={2.5} fill="#9DBE8D"
        animate={inView ? { cx: [136, 162], cy: 51, opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.1 * spd, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
      />

      {refined.map((l, i) => (
        <motion.rect
          key={`r${i}`} x={178} y={l.y} height={2} rx={1}
          fill={l.hot ? '#9DBE8D' : '#3A4A28'}
          fillOpacity={l.hot ? 0.95 : 0.6}
          animate={inView
            ? { width: [0, l.w, l.w, 0] }
            : { width: l.w * 0.25 }}
          transition={inView ? {
            duration: 3.4 * spd, times: [0, 0.35, 0.8, 1],
            repeat: Infinity, delay: i * 0.26, ease: 'easeInOut',
          } : { duration: 0 }}
        />
      ))}
      {inView && (
        <rect x={272} y={76} width={3} height={9} fill="#9DBE8D" fillOpacity={cursorOn ? 1 : 0} />
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
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {nodes.map((nd, i) => (
        <motion.line
          key={`e${i}`}
          x1={CX} y1={CY} x2={nd.x} y2={nd.y}
          stroke="#9DBE8D" strokeWidth="0.8" strokeOpacity={0.55}
          strokeDasharray={R}
          animate={inView ? { strokeDashoffset: [R, 0, 0, R] } : { strokeDashoffset: R }}
          transition={inView ? {
            duration: 2.4 * spd, times: [0, 0.3, 0.8, 1],
            repeat: Infinity, delay: i * 0.28,
          } : { duration: 0 }}
        />
      ))}
      {/* Satellite site dots — the 155-site crawl surface */}
      {[[62,22],[92,64],[52,78],[228,20],[248,58],[236,84],[196,14],[104,14],[262,34],[38,44]].map(([x, y], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r={1.8} fill="#3A4A28" fillOpacity={0.7} />
      ))}
      <circle cx={CX} cy={CY} r={9} fill="#9DBE8D" fillOpacity={0.12} stroke="#9DBE8D" strokeWidth={1} />
      <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" fill="#9DBE8D" fontSize={6.5} fontFamily={MONO}>AI</text>
      {nodes.map((nd, i) => (
        <circle key={`n${i}`} cx={nd.x} cy={nd.y} r={4} fill="#9DBE8D" fillOpacity={0.6} />
      ))}
      {inView && nodes.map((nd, i) => (
        <motion.circle
          key={`d${i}`} r={2} fill="#9DBE8D"
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
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
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
            animate={{ fill: filled ? (isPass ? '#9DBE8D' : '#CE6B6B') : '#181C12', fillOpacity: filled ? 0.85 : 0.4 }}
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
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {[6, 47, 88, 129, 170].map((x, i) => (
        <line key={i} x1={x} y1={8} x2={x} y2={84} stroke="#3A4A28" strokeWidth={0.5} strokeOpacity={0.5} strokeDasharray="2 4" />
      ))}
      {stages.map((s, i) => (
        <g key={i}>
          <motion.rect
            x={6} y={s.y} height={10} rx={2}
            fill="#9DBE8D" fillOpacity={s.opacity}
            animate={inView ? { width: [0, s.w] } : { width: s.w * 0.15 }}
            transition={inView ? { duration: 0.8, delay: i * 0.18, ease: 'easeOut' } : { duration: 0 }}
          />
          <text x={182} y={s.y + 8} fill={s.accent ? '#9DBE8D' : '#3A4A28'} fontSize={8} fontFamily={MONO}>{s.label}</text>
          {i < stages.length - 1 && (
            <line x1={14} y1={s.y + 10} x2={14} y2={s.y + 20} stroke="#9DBE8D" strokeWidth={0.8} strokeOpacity={0.35} />
          )}
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
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="8" y="33" width="46" height="24" rx="4" fill="#9DBE8D" fillOpacity="0.06" stroke="#9DBE8D" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x="31" y="47" textAnchor="middle" dominantBaseline="middle" fill="#9DBE8D" fontSize="7" fontFamily={MONO}>QUERY</text>

      <line x1="54" y1="45" x2="84" y2="45" stroke="#3A4A28" strokeWidth="0.8" />
      <polygon points="84,45 80,42.5 80,47.5" fill="#3A4A28" />

      {[[102,30],[116,42],[108,55],[126,38],[120,62],[136,50]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={3.5}
          fill="#7BC4AE" fillOpacity={0.65}
          animate={inView ? { fillOpacity: [0.3, 0.85, 0.3], r: [3, 4.2, 3] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
        />
      ))}
      <text x="119" y="90" textAnchor="middle" fill="#3A4A28" fontSize="6.5" fontFamily={MONO}>FAISS VECTORS</text>

      <line x1="148" y1="45" x2="178" y2="45" stroke="#3A4A28" strokeWidth="0.8" />
      <polygon points="178,45 174,42.5 174,47.5" fill="#3A4A28" />

      <circle cx="210" cy="45" r="24" fill="#9DBE8D" fillOpacity="0.05" stroke="#9DBE8D" strokeWidth="0.8" />
      <text x="210" y="41" textAnchor="middle" dominantBaseline="middle" fill="#9DBE8D" fontSize="7" fontFamily={MONO}>LLM</text>
      <text x="210" y="52" textAnchor="middle" dominantBaseline="middle" fill="#9DBE8D" fontSize="5.5" fontFamily={MONO} fillOpacity="0.6">MODEL</text>

      {[[254, 34, 32], [254, 43, 26], [254, 52, 20]].map(([x, y, w], i) => (
        <motion.rect key={i}
          x={x} y={y} height={2} rx={1} fill="#9DBE8D"
          fillOpacity={0.55 - i * 0.12}
          animate={inView ? { width: [0, w] } : { width: 0 }}
          transition={inView ? {
            duration: 0.55, delay: 0.3 + i * 0.22,
            repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut',
          } : { duration: 0 }}
        />
      ))}
      <text x="254" y="65" fill="#3A4A28" fontSize="6.5" fontFamily={MONO}>ANSWER</text>

      {inView && (
        <motion.circle r="3.5" fill="#9DBE8D" fillOpacity="0.9"
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

  const dots: [number, number][] = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push([col * 28 + 18, row * 22 + 16])
    }
  }

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5} fill="#3A4A28" fillOpacity={0.45} />
      ))}

      {walls.map((w, i) => (
        <g key={i}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={2}
            fill="#CE6B6B" fillOpacity={0.1} stroke="#CE6B6B" strokeWidth="0.8" strokeOpacity={0.35} />
          <text x={w.x + w.w / 2} y={w.y + w.h / 2 + 1} textAnchor="middle" dominantBaseline="middle"
            fill="#CE6B6B" fontSize={5} fontFamily={MONO} fillOpacity={0.6}>WALL</text>
        </g>
      ))}

      <motion.path
        d={pathD} fill="none" stroke="#9DBE8D" strokeWidth="1.5"
        strokeDasharray="5 3"
        animate={inView ? { pathLength: [0, 1] } : { pathLength: 0 }}
        transition={{ duration: 2.4 * spd, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }}
      />

      <circle cx={DRONE_WPS[0][0]} cy={DRONE_WPS[0][1]} r={5} fill="none" stroke="#7BC4AE" strokeWidth={1.5} />
      <circle cx={DRONE_WPS[DRONE_WPS.length - 1][0]} cy={DRONE_WPS[DRONE_WPS.length - 1][1]} r={5} fill="#9DBE8D" fillOpacity={0.25} stroke="#9DBE8D" strokeWidth={1.5} />

      {inView && (
        <motion.circle r={4.5} fill="#9DBE8D"
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

// Multi-agent orchestration graph — LangGraph Agents. Three specialist agents
// exchanging work through a shared memory hub.
function AgentsGraphVisual({ hovered, inView }: { hovered: boolean; inView: boolean }) {
  const spd = hovered ? 0.6 : 1
  const HUB = { x: 150, y: 50 }
  const agents = [
    { x: 44,  y: 24, label: 'RESEARCH' },
    { x: 150, y: 12, label: 'CODE REVIEW' },
    { x: 256, y: 24, label: 'WEB SEARCH' },
  ]

  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {agents.map((a, i) => (
        <g key={i}>
          <line x1={a.x} y1={a.y + 8} x2={HUB.x} y2={HUB.y - 8} stroke="#3A4A28" strokeWidth={0.8} />
          {inView && (
            <motion.circle
              r={2.2} fill="#9DBE8D"
              animate={{
                cx: [a.x, HUB.x, a.x],
                cy: [a.y + 8, HUB.y - 8, a.y + 8],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.2 * spd, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            />
          )}
          <circle cx={a.x} cy={a.y} r={7} fill="#9DBE8D" fillOpacity={0.08} stroke="#9DBE8D" strokeWidth={0.9} strokeOpacity={0.6} />
          <text x={a.x} y={a.y - 12} textAnchor="middle" fill="#8A9A7E" fontSize={6.5} fontFamily={MONO}>{a.label}</text>
        </g>
      ))}

      {/* Shared memory hub */}
      <rect x={HUB.x - 42} y={HUB.y - 9} width={84} height={20} rx={4}
        fill="#9DBE8D" fillOpacity={0.06} stroke="#9DBE8D" strokeWidth={0.9} strokeOpacity={0.6} />
      <text x={HUB.x} y={HUB.y + 2} textAnchor="middle" dominantBaseline="middle" fill="#9DBE8D" fontSize={7} fontFamily={MONO}>SHARED MEMORY</text>

      {/* Session persistence rows under the hub */}
      {[0, 1, 2].map(i => (
        <motion.rect
          key={i}
          x={HUB.x - 34 + i * 6} y={68 + i * 8} height={2} rx={1}
          width={68 - i * 12}
          fill="#3A4A28"
          animate={inView ? { fillOpacity: [0.35, 0.8, 0.35] } : { fillOpacity: 0.4 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
      <text x={294} y={95} textAnchor="end" fill="#3A4A28" fontSize={7} fontFamily={MONO}>PERSISTS ACROSS SESSIONS</text>
    </svg>
  )
}

// Mini flow graph used inline by the strip card
export function AgentsMiniVisual() {
  const LINE = 14
  return (
    <svg viewBox="0 0 72 16" width="72" height="16" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      {[{ x1: 14, x2: 28 }, { x1: 43, x2: 57 }].map((seg, i) => (
        <motion.line key={i}
          x1={seg.x1} y1={8} x2={seg.x2} y2={8}
          stroke="#9DBE8D" strokeWidth={1.5}
          strokeDasharray={LINE}
          animate={{ strokeDashoffset: [LINE, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.38, ease: 'linear' }}
        />
      ))}
      {[28, 57].map((x, i) => (
        <polygon key={i} points={`${x},8 ${x - 4},5 ${x - 4},11`} fill="#9DBE8D" />
      ))}
      {[8, 35, 63].map((cx, i) => (
        <circle key={i} cx={cx} cy={8} r={5} fill="#9DBE8D" fillOpacity={0.15} stroke="#9DBE8D" strokeWidth={1} />
      ))}
    </svg>
  )
}

export default function ProjectVisual({ type, hovered, inView }: { type: Visual; hovered: boolean; inView: boolean }) {
  switch (type) {
    case 'waveform':     return <WaveformVisual     hovered={hovered} inView={inView} />
    case 'document':     return <DocumentVisual     hovered={hovered} inView={inView} />
    case 'spider':       return <SpiderVisual       hovered={hovered} inView={inView} />
    case 'benchmark':    return <BenchmarkVisual    hovered={hovered} inView={inView} />
    case 'funnel':       return <FunnelVisual       hovered={hovered} inView={inView} />
    case 'rag':          return <RAGVisual          hovered={hovered} inView={inView} />
    case 'pathfinding':  return <PathfindingVisual  hovered={hovered} inView={inView} />
    case 'agents':       return <AgentsGraphVisual  hovered={hovered} inView={inView} />
  }
}
