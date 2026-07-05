'use client'

/**
 * Layered background system — eight composited layers, all generated (no
 * image downloads, no licensing, no LCP cost):
 *   1. Base: handled by `html { background-color }` in globals.css
 *   2. Blueprint dot-grid — fine engineering-paper texture, masked to fade
 *      toward the edges so it never competes with the vignette
 *   3. Topographic contours — nested moss-line loops, upper-right + lower-left
 *   4. Forest Moss orb A — upper-right, slow 44s drift
 *   5. Forest Moss orb B — lower-left, slower 56s drift, phase-offset
 *   6. Vanilla Silk warmth — center, breathes on 36s loop
 *   7. SVG fractalNoise grain — mix-blend-mode:overlay film texture
 *   8. Edge vignette — darkens periphery, creates cinematic focal depth
 *
 * All animated elements use only `transform` + `opacity` — zero layout repaints.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* Nested irregular loops — reads as elevation contours on a survey map.
 * One <g> reused twice at different scales/positions. */
function Contours({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="#4E6B45" strokeWidth="1">
        <path d="M300 90 C420 95 510 170 505 285 C500 400 420 500 295 505 C170 510 95 415 92 295 C89 175 180 85 300 90 Z" />
        <path d="M300 135 C395 138 465 195 462 285 C459 375 392 458 297 460 C202 462 140 385 137 292 C134 199 205 132 300 135 Z" />
        <path d="M298 180 C370 182 420 225 418 288 C416 351 368 412 296 414 C224 416 182 358 180 293 C178 228 226 178 298 180 Z" />
        <path d="M297 228 C345 230 372 258 371 290 C370 322 342 366 295 367 C248 368 228 330 227 294 C226 258 249 226 297 228 Z" />
        <path d="M296 272 C320 273 328 280 327 292 C326 304 318 322 294 323 C270 324 272 310 272 295 C272 280 272 271 296 272 Z" />
      </g>
    </svg>
  )
}

export default function Background() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: -1, pointerEvents: 'none' }}
    >
      {/* ── Layer 2: Blueprint dot-grid ── */}
      {/* 28px engineering-paper grid in muted sage. The radial mask keeps it
          strongest through the mid-page and fades it before the vignette. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(138,154,126,0.10) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 95% 90% at 50% 45%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 95% 90% at 50% 45%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 85%)',
        }}
      />

      {/* ── Layer 3: Topographic contours ── */}
      {/* Survey-map elevation lines; static, ultra-low opacity. Two instances
          anchored to the same corners as the moss orbs so glow + structure
          read as one landform. */}
      <Contours
        className="absolute"
        style={{
          top: '-16%',
          right: '-10%',
          width: '58vw',
          height: '58vw',
          opacity: 0.075,
        }}
      />
      <Contours
        className="absolute"
        style={{
          bottom: '-20%',
          left: '-14%',
          width: '52vw',
          height: '52vw',
          opacity: 0.055,
        }}
      />

      {/* ── Layer 4: Primary Forest Moss ambient — upper-right ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '-30%',
          right: '-12%',
          width: '70vw',
          height: '70vw',
          background:
            'radial-gradient(ellipse at center, rgba(78,107,69,0.20) 0%, rgba(78,107,69,0.08) 45%, transparent 72%)',
          willChange: 'transform',
        }}
        animate={
          reduced
            ? {}
            : { x: [0, 28, -14, 6, 0], y: [0, -20, 10, -6, 0] }
        }
        transition={{ duration: 44, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* ── Layer 5: Secondary Forest Moss ambient — lower-left ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          bottom: '-22%',
          left: '-10%',
          width: '56vw',
          height: '56vw',
          background:
            'radial-gradient(ellipse at center, rgba(78,107,69,0.15) 0%, rgba(78,107,69,0.055) 50%, transparent 75%)',
          willChange: 'transform',
        }}
        animate={
          reduced
            ? {}
            : { x: [0, -22, 16, -8, 0], y: [0, 26, -12, 6, 0] }
        }
        transition={{
          duration: 56,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 9,
        }}
      />

      {/* ── Layer 6: Vanilla Silk warmth — center breathing glow ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '5%',
          left: '35%',
          width: '38vw',
          height: '38vw',
          background:
            'radial-gradient(ellipse at center, rgba(244,232,208,0.035) 0%, transparent 68%)',
          willChange: 'transform, opacity',
        }}
        animate={
          reduced
            ? {}
            : {
                opacity: [0.45, 1, 0.65, 1, 0.45],
                scale: [1, 1.07, 0.97, 1.04, 1],
              }
        }
        transition={{ duration: 36, ease: 'easeInOut', repeat: Infinity, delay: 4 }}
      />

      {/* ── Layer 7: SVG fractalNoise grain ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.038, mixBlendMode: 'overlay' }}
      >
        <filter id="bg-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.64 0.74"
            numOctaves="4"
            seed="5"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" fill="white" />
      </svg>

      {/* ── Layer 8: Edge vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 88% at 50% 42%, transparent 32%, rgba(6,8,5,0.40) 68%, rgba(3,5,3,0.70) 100%)',
        }}
      />
    </div>
  )
}
