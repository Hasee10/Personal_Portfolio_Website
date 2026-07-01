'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { META } from '@/lib/constants'
import { fadeUp, fadeIn, easeOutExpo } from '@/lib/motion'
import NodeGraph3D from '@/components/NodeGraph3D'

/* ── Magnetic button ───────────────────────────────────────────────────────
 * Tracks the cursor within the button's bounding box and applies a fractional
 * translation (28% of offset distance) via spring physics.
 * Uses only `transform` — zero layout repaints, 60fps guaranteed.
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

/* ── Node-graph SVG data ───────────────────────────────────────────────── */
const NODES = [
  { x: 200, y: 70  },
  { x: 330, y: 140 },
  { x: 355, y: 268 },
  { x: 248, y: 348 },
  { x: 102, y: 330 },
  { x:  62, y: 200 },
  { x: 128, y: 108 },
  { x: 210, y: 210 }, // index 7 — highlighted hub
]

const EDGES: [number, number][] = [
  [0, 1], [0, 6], [0, 7],
  [1, 2], [1, 7],
  [2, 3], [2, 7],
  [3, 4], [3, 7],
  [4, 5], [4, 7],
  [5, 6], [6, 7],
]

function NodeGraph({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 420 420"
      className="w-full max-w-[400px]"
      aria-hidden="true"
    >
      <motion.g
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
        style={{ transformOrigin: '210px 210px' }}
      >
        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a]
          const nb = NODES[b]
          return (
            <motion.line
              key={`e${i}`}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke="var(--color-dim)"
              strokeWidth="0.8"
              initial={reduced ? {} : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.04, ease: 'easeInOut' }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const hub = i === 7
          return (
            <motion.circle
              key={`n${i}`}
              cx={node.x}
              cy={node.y}
              r={hub ? 14 : 9}
              fill={hub ? 'var(--color-accent)' : 'var(--color-surface-2)'}
              fillOpacity={hub ? 0.15 : 1}
              stroke={hub ? 'var(--color-accent)' : 'var(--color-border-2)'}
              strokeWidth={hub ? 1.5 : 1}
              initial={reduced ? {} : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          )
        })}

        {/* Pulsing ring on hub */}
        <motion.circle
          cx={NODES[7].x}
          cy={NODES[7].y}
          r={22}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          animate={reduced ? {} : { opacity: [0.4, 0, 0.4], scale: [1, 1.7, 1] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          style={{ transformOrigin: `${NODES[7].x}px ${NODES[7].y}px` }}
        />
      </motion.g>
    </motion.svg>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const tagline = META.tagline
  const [typedChars, setTypedChars]   = useState(reduced ? tagline.length : 0)
  const [showCursor, setShowCursor]   = useState(reduced)
  const [startTyping, setStartTyping] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setStartTyping(true), 1300)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (!startTyping || typedChars >= tagline.length) {
      if (startTyping) setShowCursor(true)
      return
    }
    const t = setTimeout(() => setTypedChars((n) => n + 1), 40)
    return () => clearTimeout(t)
  }, [startTyping, typedChars, tagline.length])

  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-transparent px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">

          {/* ── Left column ──────────────────────────── */}
          <div className="flex flex-1 flex-col gap-6 lg:max-w-[540px]">

            {/* Label */}
            <motion.p
              className="font-mono text-[13px] tracking-widest text-muted"
              variants={reduced ? undefined : fadeIn}
              initial={reduced ? undefined : 'hidden'}
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              — AI / LLM Engineer
            </motion.p>

            {/* Name — blur-fade-up for the premium first impression */}
            <motion.h1
              className="text-[36px] font-semibold leading-tight text-text md:text-[56px]"
              initial={reduced ? {} : { opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.55, ease: easeOutExpo }}
            >
              {META.name}
            </motion.h1>

            {/* Typewriter tagline */}
            <div className="min-h-[2.5rem] text-[22px] font-semibold text-text md:text-[28px]">
              {tagline.slice(0, typedChars)}
              {showCursor && (
                <span className="cursor-blink ml-0.5 inline-block">|</span>
              )}
            </div>

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
              transition={{ duration: 0.6, delay: 1.2, ease: easeOutExpo }}
            >
              <MagneticAnchor
                href="#projects"
                reduced={reduced}
                className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-[15px] font-medium text-bg transition-[filter] duration-200 hover:brightness-110"
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

            {/* Scroll indicator */}
            <motion.div
              className="mt-2"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <ArrowDown size={20} className="bounce-down text-dim" />
            </motion.div>
          </div>

          {/* ── Right column: 3-D canvas node graph ─── */}
          <div className="hidden items-center justify-center lg:flex lg:w-[40%]">
            <div className="relative flex items-center justify-center">
              {/* Soft ambient glow behind the graph */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: '480px',
                  height: '480px',
                  background: 'radial-gradient(ellipse at center, rgba(78,107,69,0.10) 0%, rgba(78,107,69,0.03) 50%, transparent 75%)',
                  filter: 'blur(24px)',
                }}
              />
              <NodeGraph3D reduced={reduced} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
