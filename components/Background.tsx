'use client'

/**
 * Layered background system — six composited layers:
 *   1. Base: handled by `html { background-color }` in globals.css
 *   2. Forest Moss orb A — upper-right, slow 44s drift
 *   3. Forest Moss orb B — lower-left, slower 56s drift, phase-offset
 *   4. Vanilla Silk warmth — center, breathes on 36s loop
 *   5. SVG fractalNoise grain — mix-blend-mode:overlay, 4% opacity film texture
 *   6. Edge vignette — darkens periphery, creates cinematic focal depth
 *
 * All animated elements use only `transform` + `opacity` — zero layout repaints.
 * `will-change: transform` hints GPU compositing on each orb layer.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
      {/* ── Layer 2: Primary Forest Moss ambient — upper-right ── */}
      {/* Large, very-low-opacity radial creates AO-style depth at the top */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '-30%',
          right: '-12%',
          width: '70vw',
          height: '70vw',
          background:
            'radial-gradient(ellipse at center, rgba(78,107,69,0.13) 0%, rgba(78,107,69,0.05) 45%, transparent 72%)',
          willChange: 'transform',
        }}
        animate={
          reduced
            ? {}
            : { x: [0, 28, -14, 6, 0], y: [0, -20, 10, -6, 0] }
        }
        transition={{ duration: 44, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* ── Layer 3: Secondary Forest Moss ambient — lower-left ── */}
      {/* Phase-shifted by 9s and slower (56s) — prevents synchronised "breathing" */}
      <motion.div
        className="absolute rounded-full"
        style={{
          bottom: '-22%',
          left: '-10%',
          width: '56vw',
          height: '56vw',
          background:
            'radial-gradient(ellipse at center, rgba(78,107,69,0.09) 0%, rgba(78,107,69,0.032) 50%, transparent 75%)',
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

      {/* ── Layer 4: Vanilla Silk warmth — center breathing glow ── */}
      {/* Subtly warms the center zone (opacity 2.2%), animates opacity + scale */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '5%',
          left: '35%',
          width: '38vw',
          height: '38vw',
          background:
            'radial-gradient(ellipse at center, rgba(244,232,208,0.022) 0%, transparent 68%)',
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

      {/* ── Layer 5: SVG fractalNoise grain ── */}
      {/*
       * feTurbulence with fractalNoise + 4 octaves produces multi-scale texture.
       * feColorMatrix saturate:0 desaturates to a neutral grey grain.
       * mix-blend-mode:overlay lets the grain brighten highlights and darken
       * shadows simultaneously — the same technique used in luxury brand sites.
       * Opacity 3.8% is perceptible on close inspection but never distracting.
       */}
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

      {/* ── Layer 6: Edge vignette ── */}
      {/*
       * Radial gradient from transparent (38% radius) to near-black at edges.
       * The ellipse is vertically biased (42% top-anchor) so the top edge stays
       * slightly lighter than the bottom, matching natural light perception.
       */}
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
