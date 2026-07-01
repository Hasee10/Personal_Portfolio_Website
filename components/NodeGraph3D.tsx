'use client'

import { useRef, useEffect } from 'react'

const NODES = [
  { x:  -16, y: -237, z:  96,  hub: false, label: 'LLM'      },
  { x:  192, y: -115, z: -56,  hub: false, label: 'Agents'   },
  { x:  237, y:   93, z: 128,  hub: false, label: 'Voice AI' },
  { x:   64, y:  221, z: -96,  hub: false, label: 'Backend'  },
  { x: -176, y:  192, z:  72,  hub: false, label: 'RAG'      },
  { x: -240, y:  -16, z:-136,  hub: false, label: 'Frontend' },
  { x: -134, y: -168, z:  32,  hub: false, label: 'Data'     },
  { x:    0, y:    0, z:   0,  hub: true,  label: 'AI'       },
]

const HUB_IDX = 7
const EDGES: [number, number][] = [
  [0,1],[0,6],[0,7],
  [1,2],[1,7],
  [2,3],[2,7],
  [3,4],[3,7],
  [4,5],[4,7],
  [5,6],[6,7],
]

// BFS hop distance from hub
const HOP: number[] = (() => {
  const d = new Array(NODES.length).fill(99)
  d[HUB_IDX] = 0
  const q = [HUB_IDX]
  while (q.length) {
    const cur = q.shift()!
    for (const [a, b] of EDGES) {
      const nb = a === cur ? b : b === cur ? a : -1
      if (nb >= 0 && d[nb] === 99) { d[nb] = d[cur] + 1; q.push(nb) }
    }
  }
  return d
})()

const EDGE_ACTIVE = EDGES.map(([a, b]) => a === HUB_IDX || b === HUB_IDX)

const FOV       = 400
const VIEW_DIST = 260
const PING_DUR  = 140

function rotY(x: number, y: number, z: number, a: number) {
  return { x: x * Math.cos(a) - z * Math.sin(a), y, z: x * Math.sin(a) + z * Math.cos(a) }
}
function rotX(x: number, y: number, z: number, a: number) {
  return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) }
}
function project(p: { x: number; y: number; z: number }, cx: number, cy: number) {
  const s = FOV / (FOV + p.z + VIEW_DIST)
  return { px: cx + p.x * s, py: cy + p.y * s, scale: s, z: p.z }
}

interface FlowParticle { from: number; t: number; speed: number }
interface AmbientDot   { x: number; y: number; z: number; vx: number; vy: number; vz: number }

export default function NodeGraph3D({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef(0)
  const tickRef   = useRef(0)
  const stateRef  = useRef({
    angleY: 0, angleX: 0.25, mdx: 0, mdy: 0,
    mx: -9999, my: -9999,
    repX:  Array.from({ length: NODES.length }, () => 0) as number[],
    repY:  Array.from({ length: NODES.length }, () => 0) as number[],
    repVX: Array.from({ length: NODES.length }, () => 0) as number[],
    repVY: Array.from({ length: NODES.length }, () => 0) as number[],
    pings: [0, Math.round(PING_DUR / 3), Math.round((PING_DUR / 3) * 2)] as number[],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Explicit typed aliases so TypeScript doesn't widen to null inside closures
    const cvs: HTMLCanvasElement            = canvas
    const gfx: CanvasRenderingContext2D     = ctx

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    function resize() {
      const w = cvs.offsetWidth, h = cvs.offsetHeight
      cvs.width = w * dpr; cvs.height = h * dpr
      gfx.scale(dpr, dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cvs)

    const flows: FlowParticle[] = []
    EDGES.forEach(([a]) => {
      const outer = a === HUB_IDX ? (EDGES.find(([, b]) => b !== HUB_IDX)?.[0] ?? a) : a
      flows.push({ from: outer, t: Math.random(), speed: 0.007 + Math.random() * 0.007 })
      flows.push({ from: outer, t: (Math.random() + 0.5) % 1, speed: 0.006 + Math.random() * 0.008 })
    })

    const ambient: AmbientDot[] = Array.from({ length: 42 }, () => ({
      x: (Math.random() - 0.5) * 480, y: (Math.random() - 0.5) * 480, z: (Math.random() - 0.5) * 340,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, vz: (Math.random() - 0.5) * 0.15,
    }))

    function draw() {
      const w = cvs.offsetWidth, h = cvs.offsetHeight
      gfx.clearRect(0, 0, w, h)
      tickRef.current++
      const s = stateRef.current

      if (!reduced) {
        s.angleY += 0.008 + s.mdx * 0.00015
        s.angleX  = 0.25  + s.mdy * 0.00012
      }

      const breathe = (Math.sin(tickRef.current * 0.028) + 1) / 2

      const pts = NODES.map(n => {
        let p = rotY(n.x, n.y, n.z, s.angleY)
        p = rotX(p.x, p.y, p.z, s.angleX)
        return { ...project(p, w / 2, h / 2), hub: n.hub, label: n.label, rx: p.x, ry: p.y, rz: p.z }
      })
      const hubPt = pts[HUB_IDX]

      // Mouse repulsion springs
      for (let i = 0; i < NODES.length; i++) {
        const pt = pts[i]
        const dx = pt.px - s.mx, dy = pt.py - s.my
        const dist = Math.sqrt(dx * dx + dy * dy)
        let tx = 0, ty = 0
        if (dist < 80 && dist > 0) {
          const f = (1 - dist / 80) * 12
          tx = (dx / dist) * f; ty = (dy / dist) * f
        }
        s.repVX[i] = (s.repVX[i] + (tx - s.repX[i]) * 0.08) * 0.72
        s.repVY[i] = (s.repVY[i] + (ty - s.repY[i]) * 0.08) * 0.72
        s.repX[i] += s.repVX[i]; s.repY[i] += s.repVY[i]
      }

      // Repulsion applied only to 2-D projected coords; 3-D rx/ry/rz unchanged
      const rpts = pts.map((p, i) => ({ ...p, px: p.px + s.repX[i], py: p.py + s.repY[i] }))
      const hubRpt = rpts[HUB_IDX]

      // ── 1. Ambient cloud ──────────────────────────────────────────────
      ambient.forEach(ap => {
        ap.x += ap.vx; ap.y += ap.vy; ap.z += ap.vz
        if (Math.abs(ap.x) > 260) ap.vx *= -1
        if (Math.abs(ap.y) > 260) ap.vy *= -1
        if (Math.abs(ap.z) > 190) ap.vz *= -1
        let rp = rotY(ap.x, ap.y, ap.z, s.angleY)
        rp = rotX(rp.x, rp.y, rp.z, s.angleX)
        const { px, py } = project(rp, w / 2, h / 2)
        const depth = (rp.z + VIEW_DIST) / (VIEW_DIST * 2)
        gfx.beginPath(); gfx.arc(px, py, 1.2, 0, Math.PI * 2)
        gfx.fillStyle = `rgba(78,107,69,${Math.max(0, depth * 0.3).toFixed(2)})`; gfx.fill()
      })

      // ── 2. Radar ping rings from hub ──────────────────────────────────
      if (!reduced) {
        s.pings = s.pings.map(t => {
          const next = (t + 1) % PING_DUR
          const progress = next / PING_DUR
          const nodeR = 20 * hubRpt.scale
          const r = nodeR + nodeR * 2 * progress
          const alpha = 0.45 * (1 - progress)
          if (alpha > 0.005) {
            gfx.beginPath(); gfx.arc(hubRpt.px, hubRpt.py, r, 0, Math.PI * 2)
            gfx.strokeStyle = `rgba(202,255,87,${alpha.toFixed(3)})`
            gfx.lineWidth = 1.2; gfx.stroke()
          }
          return next
        })
      }

      // ── 3. Edges ──────────────────────────────────────────────────────
      const sortedEi = EDGES.map((_, i) => i).sort((ia, ib) => {
        const za = (rpts[EDGES[ia][0]].z + rpts[EDGES[ia][1]].z) / 2
        const zb = (rpts[EDGES[ib][0]].z + rpts[EDGES[ib][1]].z) / 2
        return za - zb
      })
      sortedEi.forEach(ei => {
        const [a, b] = EDGES[ei]
        const pa = rpts[a], pb = rpts[b]
        if (EDGE_ACTIVE[ei]) {
          const grad = gfx.createLinearGradient(pa.px, pa.py, pb.px, pb.py)
          grad.addColorStop(0,   'rgba(202,255,87,0)')
          grad.addColorStop(0.5, 'rgba(202,255,87,0.6)')
          grad.addColorStop(1,   'rgba(202,255,87,0)')
          gfx.beginPath(); gfx.moveTo(pa.px, pa.py); gfx.lineTo(pb.px, pb.py)
          gfx.strokeStyle = grad; gfx.lineWidth = 1.5
          gfx.globalAlpha = 0.5
          gfx.shadowColor = 'rgba(202,255,87,0.7)'; gfx.shadowBlur = 6
          gfx.stroke(); gfx.shadowBlur = 0; gfx.globalAlpha = 1
        } else {
          gfx.beginPath(); gfx.moveTo(pa.px, pa.py); gfx.lineTo(pb.px, pb.py)
          gfx.strokeStyle = 'rgba(78,107,69,0.4)'; gfx.lineWidth = 0.5
          gfx.globalAlpha = 0.3; gfx.stroke(); gfx.globalAlpha = 1
        }
      })

      // ── 4. Flow particles — 6px head, comet trail ─────────────────────
      flows.forEach(fp => {
        if (!reduced) fp.t += fp.speed
        if (fp.t > 1) fp.t = 0
        const outer = rpts[fp.from]

        for (let i = 6; i >= 1; i--) {
          const tT = fp.t - i * 0.035
          if (tT < 0) continue
          const tx  = outer.rx + (hubPt.rx - outer.rx) * tT
          const ty_ = outer.ry + (hubPt.ry - outer.ry) * tT
          const tz  = outer.rz + (hubPt.rz - outer.rz) * tT
          const { px: tpx, py: tpy, scale: ts } = project({ x: tx, y: ty_, z: tz }, w / 2, h / 2)
          const dep = (tz + VIEW_DIST) / (VIEW_DIST * 2)
          gfx.beginPath(); gfx.arc(tpx, tpy, 2.2 * ts, 0, Math.PI * 2)
          gfx.fillStyle = `rgba(120,180,100,${(Math.max(0, dep * 0.55) * (1 - i / 7)).toFixed(2)})`
          gfx.fill()
        }

        const rx = outer.rx + (hubPt.rx - outer.rx) * fp.t
        const ry = outer.ry + (hubPt.ry - outer.ry) * fp.t
        const rz = outer.rz + (hubPt.rz - outer.rz) * fp.t
        const { px, py, scale } = project({ x: rx, y: ry, z: rz }, w / 2, h / 2)
        const dep  = (rz + VIEW_DIST) / (VIEW_DIST * 2)
        const alpha = Math.max(0.4, Math.min(1, 0.4 + dep * 0.85))
        gfx.shadowColor = 'rgba(202,255,87,0.8)'; gfx.shadowBlur = 8
        gfx.beginPath(); gfx.arc(px, py, 6 * scale, 0, Math.PI * 2)
        gfx.fillStyle = `rgba(220,255,200,${alpha.toFixed(2)})`; gfx.fill()
        gfx.shadowBlur = 0
        gfx.beginPath(); gfx.arc(px, py, 2 * scale, 0, Math.PI * 2)
        gfx.fillStyle = `rgba(255,255,255,${(alpha * 0.8).toFixed(2)})`; gfx.fill()
      })

      // ── 5. Nodes & labels ─────────────────────────────────────────────
      rpts.map((p, i) => ({ ...p, i }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ px, py, scale, z, hub: isHub, label, i }) => {
          const hop = HOP[i]

          if (isHub) {
            const glowR = (65 + breathe * 28) * scale
            const grad  = gfx.createRadialGradient(px, py, 0, px, py, glowR)
            grad.addColorStop(0,   `rgba(202,255,87,${(0.22 + breathe * 0.14).toFixed(2)})`)
            grad.addColorStop(0.4, 'rgba(202,255,87,0.04)')
            grad.addColorStop(1,   'rgba(202,255,87,0)')
            gfx.beginPath(); gfx.arc(px, py, glowR, 0, Math.PI * 2)
            gfx.fillStyle = grad; gfx.fill()

            const ringR = (34 + breathe * 14) * scale
            gfx.beginPath(); gfx.arc(px, py, ringR, 0, Math.PI * 2)
            gfx.strokeStyle = `rgba(202,255,87,${(0.2 + breathe * 0.3).toFixed(2)})`
            gfx.lineWidth = 1; gfx.stroke()

            gfx.shadowColor = 'rgba(202,255,87,0.8)'; gfx.shadowBlur = 14
            gfx.beginPath(); gfx.arc(px, py, 20 * scale, 0, Math.PI * 2)
            gfx.fillStyle = 'rgba(202,255,87,0.15)'; gfx.fill()
            gfx.strokeStyle = 'rgba(202,255,87,1.0)'; gfx.lineWidth = 1.8; gfx.stroke()
            gfx.shadowBlur = 0

            gfx.font = `bold ${Math.max(12, Math.round(13 * scale))}px 'Courier New', monospace`
            gfx.textAlign = 'center'; gfx.textBaseline = 'middle'
            gfx.fillStyle = 'rgba(202,255,87,1.0)'
            gfx.fillText('AI', px, py)

          } else {
            const strokeOpacity = hop === 1 ? 0.7 : 0.35
            const fillColor     = hop === 1 ? 'rgba(202,255,87,0.07)' : 'transparent'

            gfx.shadowColor = hop === 1 ? 'rgba(202,255,87,0.45)' : 'rgba(78,107,69,0.2)'
            gfx.shadowBlur  = hop === 1 ? 5 : 2
            gfx.beginPath(); gfx.arc(px, py, 13 * scale, 0, Math.PI * 2)
            gfx.fillStyle = fillColor; gfx.fill()
            gfx.strokeStyle = `rgba(202,255,87,${strokeOpacity})`; gfx.lineWidth = 1.2; gfx.stroke()
            gfx.shadowBlur = 0

            gfx.beginPath(); gfx.arc(px, py, 3.5 * scale, 0, Math.PI * 2)
            gfx.fillStyle = `rgba(120,180,100,${hop === 1 ? 0.8 : 0.5})`; gfx.fill()

            // Flip label to left if it would overflow right edge
            const fontSize = Math.max(9, Math.round(10.5 * scale))
            gfx.font = `${fontSize}px 'Courier New', monospace`
            gfx.textBaseline = 'middle'
            const tw  = gfx.measureText(label).width
            const pad = 3
            const ly  = py - 8 * scale
            let lx    = px + 16 * scale
            gfx.textAlign = 'left'
            if (lx + tw + pad * 2 > w - 4) lx = px - 16 * scale - tw - pad * 2

            gfx.fillStyle = 'rgba(8,11,8,0.78)'
            gfx.beginPath()
            if (typeof gfx.roundRect === 'function') {
              gfx.roundRect(lx - pad, ly - fontSize / 2 - pad, tw + pad * 2, fontSize + pad * 2, 3)
            } else {
              gfx.rect(lx - pad, ly - fontSize / 2 - pad, tw + pad * 2, fontSize + pad * 2)
            }
            gfx.fill()

            gfx.fillStyle = `rgba(195,235,170,${hop === 1 ? 0.95 : 0.65})`
            gfx.fillText(label, lx, ly)
          }
        })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frameRef.current); ro.disconnect() }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square"
      style={{ background: 'transparent', width: '400px' }}
      aria-hidden="true"
      onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        stateRef.current.mdx = e.clientX - (r.left + r.width  / 2)
        stateRef.current.mdy = e.clientY - (r.top  + r.height / 2)
        stateRef.current.mx  = e.clientX - r.left
        stateRef.current.my  = e.clientY - r.top
      }}
      onMouseLeave={() => {
        stateRef.current.mdx = 0; stateRef.current.mdy = 0
        stateRef.current.mx  = -9999; stateRef.current.my = -9999
      }}
    />
  )
}
