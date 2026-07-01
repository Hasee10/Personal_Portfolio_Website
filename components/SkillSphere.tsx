'use client'

/**
 * 3-D rotating skill torus (donut shape) built with DOM elements + RAF.
 *
 * Torus parametrization (normalized outer radius = 1.0):
 *   R_MAJOR = 0.63 (distance from torus center to tube center)
 *   R_TUBE  = 0.37 (tube radius)
 *   x = (R_MAJOR + R_TUBE·cos(v))·cos(u)
 *   y = (R_MAJOR + R_TUBE·cos(v))·sin(u)
 *   z = R_TUBE·sin(v)
 *
 * Grid: 7 meridians × 5 parallels = 35 items (matches SKILLS total)
 * Pre-tilted 55° about X axis so the donut reads as 3-D, not as a ring.
 * Alternate meridian rings are staggered π/7 in the v direction for
 * even distribution.
 */

import { useRef, useEffect, useState } from 'react'
import { SKILLS } from '@/lib/constants'

const R_MAJOR = 0.63
const R_TUBE  = 0.37
const N_PAR   = 5   // parallels (tube cross-sections)
const N_MER   = 7   // meridians (around the hole)

const ALL_ITEMS = SKILLS.flatMap((group, cat) =>
  group.items.map(label => ({ label, cat }))
)

// Pre-compute torus positions (unit scale, outer radius = 1)
const TORUS_DATA = ALL_ITEMS.map((item, idx) => {
  const mer = idx % N_MER
  const par = Math.floor(idx / N_MER)
  // Stagger alternate meridian columns so items don't stack
  const uOffset = par * (Math.PI / N_MER)
  const u = (mer / N_MER) * Math.PI * 2 + uOffset
  const v = (par / N_PAR) * Math.PI * 2

  const ox = (R_MAJOR + R_TUBE * Math.cos(v)) * Math.cos(u)
  const oy = (R_MAJOR + R_TUBE * Math.cos(v)) * Math.sin(u)
  const oz = R_TUBE * Math.sin(v)

  // Pre-tilt 55° about X axis so the torus reads as 3-D
  const TILT = (55 * Math.PI) / 180
  const cosT = Math.cos(TILT)
  const sinT = Math.sin(TILT)
  return {
    ...item,
    ox,
    oy: oy * cosT - oz * sinT,
    oz: oy * sinT + oz * cosT,
  }
})

// Category → border + text colours (Forest Moss palette)
const CAT_CLASS: Record<number, string> = {
  0: 'border-accent/45 text-accent',   // LLM Stack
  1: 'border-muted/30  text-muted',    // Agentic Infra
  2: 'border-border2   text-muted',    // Backend
  3: 'border-border    text-dim',      // Frontend
  4: 'border-accent/25 text-accent/70', // Data & BI
}

export default function SkillSphere({ reduced }: { reduced: boolean }) {
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([])
  const frameRef = useRef(0)
  const stateRef = useRef({ angleY: 0, my: 0, mActive: false })
  const [radius, setRadius] = useState(200)

  // Responsive radius
  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 640 ? 120 : 200)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const animate = () => {
      const s = stateRef.current
      if (!reduced) s.angleY += 0.004

      // Mouse-driven extra tilt on X; default slight tilt when idle
      const tiltX  = s.mActive ? s.my * 0.002 : 0
      const cosY   = Math.cos(s.angleY)
      const sinY   = Math.sin(s.angleY)
      const cosX   = Math.cos(tiltX)
      const sinX   = Math.sin(tiltX)

      TORUS_DATA.forEach((pt, i) => {
        const el = itemRefs.current[i]
        if (!el) return

        // Rotate around Y axis (spin)
        const rx = pt.ox * cosY - pt.oz * sinY
        const ry = pt.oy
        const rz = pt.ox * sinY + pt.oz * cosY

        // Optional mouse-driven tilt around X axis
        const fx =  rx
        const fy =  ry * cosX - rz * sinX
        const fz =  ry * sinX + rz * cosX

        // fz ∈ [-1, 1] → scale ∈ [0.6, 1.0], opacity ∈ [0.25, 1.0]
        const scale   = 0.6 + (fz + 1) * 0.2
        const opacity = Math.max(0.25, (fz + 1.35) / 2.35)
        const px      = fx * radius
        const py      = fy * radius

        el.style.transform = `translate(-50%,-50%) translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0) scale(${scale.toFixed(3)})`
        el.style.opacity   = opacity.toFixed(3)
        el.style.zIndex    = String(Math.round(fz * 100 + 100))
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [reduced, radius])

  const W = radius * 2 + 200
  const H = radius * 2 + 120

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Torus container */}
      <div
        className="relative mx-auto"
        style={{ width: W, height: H, maxWidth: '100%' }}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect()
          stateRef.current.my      = e.clientY - (r.top + r.height / 2)
          stateRef.current.mActive = true
        }}
        onMouseLeave={() => { stateRef.current.mActive = false }}
      >
        {TORUS_DATA.map((pt, i) => (
          <span
            key={`${pt.label}-${i}`}
            ref={el => { itemRefs.current[i] = el }}
            className={`absolute left-1/2 top-1/2 cursor-default select-none whitespace-nowrap rounded-full border bg-surface px-3 py-1.5 font-mono text-[12px] ${CAT_CLASS[pt.cat] ?? 'border-border text-dim'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {pt.label}
          </span>
        ))}
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {SKILLS.map((group, cat) => (
          <span
            key={group.category}
            className={`flex items-center gap-1.5 font-mono text-[11px] ${CAT_CLASS[cat] ?? 'text-dim'}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {group.category}
          </span>
        ))}
      </div>
    </div>
  )
}
