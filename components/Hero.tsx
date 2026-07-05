'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { META } from '@/lib/constants'
import { fadeIn, easeOutExpo } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

/* ── Magnetic button ───────────────────────────────────────────────────────
 * Tracks the cursor within the button's bounding box and applies a fractional
 * translation (28% of offset distance) via spring physics.
 * Uses only `transform` — zero layout repaints.
 */
function MagneticAnchor({
  href,
  className,
  children,
  target,
  rel,
  reduced,
}: {
  href: string
  className: string
  children: React.ReactNode
  target?: string
  rel?: string
  reduced: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 20 })
  const springY = useSpring(y, { stiffness: 220, damping: 20 })

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.a>
  )
}

/* ── Stack node graph — the site's signature motion moment ─────────────────
 * Maps the real stack as a structure: an AI hub connected to the seven
 * domains actually worked in. Labels are information, so the graph does NOT
 * rotate (rotating labels are unreadable). Motion budget:
 *   entrance — edges draw in stagger, nodes pop, labels fade
 *   idle     — hub pulse, data-flow dots along edges, gentle per-node float
 *   hover    — node glows and a descriptor readout shows that node's tools
 * All SVG + transform/opacity. No canvas, no render loop beyond framer's own.
 */
interface StackNode {
  x: number
  y: number
  label: string
  detail: string
  // label offset direction (unit-ish vector away from hub)
  lx: number
  ly: number
}

const HUB = { x: 210, y: 210 }

const NODES: StackNode[] = [
  { x: 200, y: 70,  label: 'LLM',      detail: 'OpenAI · Gemini · Groq · Mistral', lx: 0,    ly: -22 },
  { x: 330, y: 140, label: 'RAG',      detail: 'FAISS · LangChain · embeddings',   lx: 26,   ly: -8  },
  { x: 355, y: 268, label: 'Agents',   detail: 'LangGraph · n8n · tool use',       lx: 30,   ly: 16  },
  { x: 248, y: 348, label: 'Voice AI', detail: 'VAPI · LiveKit · ElevenLabs',      lx: 14,   ly: 26  },
  { x: 102, y: 330, label: 'Data',     detail: 'Scrapy · SQL · Power BI',          lx: -18,  ly: 26  },
  { x: 62,  y: 200, label: 'Backend',  detail: 'FastAPI · Postgres · Redis',       lx: -32,  ly: -6  },
  { x: 128, y: 108, label: 'Frontend', detail: 'React · Next.js · Tailwind',       lx: -26,  ly: -18 },
]

// Edges: ring around the perimeter + spokes into the hub (index 7 = hub)
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
]

// Edges that carry an animated data-flow dot (spokes only, staggered)
const FLOW_EDGES = [7, 9, 11, 13] // indices into EDGES

function pointOf(i: number) {
  return i === 7 ? HUB : NODES[i]
}

function NodeGraph({ reduced }: { reduced: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.svg
        viewBox="0 0 420 420"
        className="w-full max-w-[300px] lg:max-w-[400px]"
        role="img"
        aria-label="Stack graph: an AI hub connecting LLM, RAG, Agents, Voice AI, Data, Backend, and Frontend"
      >
        {/* Edges — draw in on load */}
        {EDGES.map(([a, b], i) => {
          const na = pointOf(a)
          const nb = pointOf(b)
          const touched = hovered !== null && (a === hovered || b === hovered)
          return (
            <motion.line
              key={`e${i}`}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke="var(--color-accent-2)"
              strokeWidth={touched ? 1.4 : 0.8}
              initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: touched ? 0.9 : 0.5 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.4 + i * 0.05, ease: 'easeInOut' }}
            />
          )
        })}

        {/* Data-flow dots along spoke edges — "requests moving through the system" */}
        {!reduced && FLOW_EDGES.map((ei, k) => {
          const [a] = EDGES[ei]
          const from = pointOf(a)
          return (
            <motion.circle
              key={`f${k}`}
              r={2.5}
              fill="var(--color-accent)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [from.x, HUB.x],
                cy: [from.y, HUB.y],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 1.8,
                delay: 2 + k * 0.9,
                repeat: Infinity,
                repeatDelay: 2.6,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* Domain nodes + labels */}
        {NODES.map((node, i) => {
          const isHovered = hovered === i
          return (
            <motion.g
              key={`n${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(h => (h === i ? null : i))}
              style={{ cursor: 'pointer' }}
              animate={reduced ? {} : { y: [0, i % 2 === 0 ? -3 : 3, 0] }}
              transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Hover halo */}
              <motion.circle
                cx={node.x} cy={node.y} r={16}
                fill="var(--color-accent)"
                initial={false}
                animate={{ opacity: isHovered ? 0.12 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.circle
                cx={node.x} cy={node.y} r={9}
                fill="var(--color-surface-2)"
                stroke={isHovered ? 'var(--color-accent)' : 'var(--color-border-2)'}
                strokeWidth={isHovered ? 1.5 : 1}
                initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: isHovered ? 1.2 : 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: reduced ? 0 : i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <motion.text
                x={node.x + node.lx}
                y={node.y + node.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered ? 'var(--color-accent)' : 'var(--color-muted)'}
                style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: 11, letterSpacing: '0.04em' }}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.9 + i * 0.06 }}
              >
                {node.label}
              </motion.text>
            </motion.g>
          )
        })}

        {/* Hub */}
        <motion.circle
          cx={HUB.x} cy={HUB.y} r={15}
          fill="var(--color-accent)" fillOpacity={0.14}
          stroke="var(--color-accent)" strokeWidth={1.5}
          initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        />
        <motion.text
          x={HUB.x} y={HUB.y + 1}
          textAnchor="middle" dominantBaseline="middle"
          fill="var(--color-accent)"
          style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: 11, fontWeight: 600 }}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.6 }}
        >
          AI
        </motion.text>

        {/* Hub pulse ring */}
        <motion.circle
          cx={HUB.x} cy={HUB.y} r={24}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          animate={reduced ? { opacity: 0.25 } : { opacity: [0.4, 0, 0.4], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        />
      </motion.svg>

      {/* Descriptor readout — shows the hovered node's real tools */}
      <p
        aria-live="polite"
        className="min-h-[1.25rem] font-mono text-[11px] tracking-wide text-dim"
      >
        {hovered !== null ? (
          <span className="text-muted">{NODES[hovered].label} — {NODES[hovered].detail}</span>
        ) : (
          <span>hover or tap a node</span>
        )}
      </p>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-transparent px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">

          {/* ── Left column ──────────────────────────── */}
          <div className="flex flex-1 flex-col gap-6 lg:max-w-[540px]">

            {/* Label */}
            <motion.p
              className="font-mono text-[13px] tracking-widest text-muted"
              variants={reduced ? undefined : fadeIn}
              initial={reduced ? undefined : 'hidden'}
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              — AI / LLM Engineer
            </motion.p>

            {/* Name — mono display face, blur-fade-up */}
            <motion.h1
              className="font-mono text-[34px] font-semibold leading-tight tracking-tight text-text md:text-[50px]"
              initial={reduced ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.4, ease: easeOutExpo }}
            >
              {META.name}
            </motion.h1>

            {/* Tagline — terminal prompt styling, quiet fade (the node graph
                is the signature moment; this stays out of its way) */}
            <motion.p
              className="font-mono text-[18px] font-medium text-accent md:text-[21px]"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span aria-hidden="true" className="text-dim">$ </span>
              {META.tagline}
              <span aria-hidden="true" className="cursor-blink ml-0.5 inline-block">▌</span>
            </motion.p>

            {/* Bio */}
            <motion.p
              className="max-w-md text-[16px] leading-7 text-muted"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {META.bio}
            </motion.p>

            {/* CTAs — magnetic spring-tracked buttons */}
            <motion.div
              className="flex flex-row gap-3"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15, ease: easeOutExpo }}
            >
              <MagneticAnchor
                href="/projects"
                reduced={reduced}
                className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-[15px] font-semibold text-bg transition-[filter] duration-200 hover:brightness-110"
              >
                View Projects
              </MagneticAnchor>
              <MagneticAnchor
                href={META.resume}
                target="_blank"
                rel="noopener noreferrer"
                reduced={reduced}
                className="inline-flex items-center rounded-lg border border-border2 px-5 py-2.5 text-[15px] text-text transition-colors duration-200 hover:border-accent/40 hover:text-text"
              >
                Download CV
              </MagneticAnchor>
            </motion.div>

            {/* Scroll indicator — desktop only; on mobile the graph sits
                below the CTAs and the arrow would point at it, not at About */}
            <motion.div
              className="mt-2 hidden lg:block"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <ArrowDown size={20} className="bounce-down text-dim" />
            </motion.div>
          </div>

          {/* ── Right column: stack node graph (signature moment) ──
              Shown on mobile too — it's a cheap SVG and it IS the identity. */}
          <div className="flex items-center justify-center lg:w-[42%]">
            <div className="relative flex items-center justify-center">
              {/* Soft ambient glow behind the graph */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: '480px',
                  height: '480px',
                  maxWidth: '90vw',
                  background: 'radial-gradient(ellipse at center, rgba(78,107,69,0.10) 0%, rgba(78,107,69,0.03) 50%, transparent 75%)',
                  filter: 'blur(24px)',
                }}
              />
              <NodeGraph reduced={reduced} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
