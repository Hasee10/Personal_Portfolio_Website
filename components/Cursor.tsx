'use client'

/**
 * Custom cursor — two-layer spring tracking system:
 *   • Dot (6px filled): stiffness 420, high responsiveness — stays on target
 *   • Ring (30px border): stiffness 190, intentional lag — trails behind the dot
 *
 * The phase difference between the two layers creates a parallax depth effect.
 * On interactive elements (a, button, [role="button"]):
 *   • Ring expands to 1.45× via scale spring
 *   • Ring opacity increases to 0.85
 *
 * Not rendered on touch devices (no mousemove events).
 * Sets `cursor: none` on <html> via inline style on mount; restores on unmount.
 * All animation properties are transform/opacity only — GPU composited, 60fps.
 */

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted]   = useState(false)
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot — snappy follower
  const dotX = useSpring(mouseX, { stiffness: 420, damping: 28, mass: 0.6 })
  const dotY = useSpring(mouseY, { stiffness: 420, damping: 28, mass: 0.6 })

  // Ring — lazy follower for depth separation
  const ringX = useSpring(mouseX, { stiffness: 190, damping: 22, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 190, damping: 22, mass: 0.8 })

  // Hover spring: 0 = normal, 1 = hovering interactive element
  const hoverVal   = useMotionValue(0)
  const hoverSpring = useSpring(hoverVal, { stiffness: 280, damping: 24 })
  const ringScale  = useTransform(hoverSpring, [0, 1], [1, 1.48])
  const ringOpacity = useTransform(hoverSpring, [0, 1], [0.4, 0.85])
  const dotScale   = useTransform(hoverSpring, [0, 1], [1, 0.5])

  useEffect(() => {
    // Don't activate on touch-only devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    setMounted(true)
    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const interactive = target.closest('a, button, [role="button"], label, [tabindex]')
      setHovering(!!interactive)
      hoverVal.set(interactive ? 1 : 0)
    }

    const onLeave = () => {
      mouseX.set(-200)
      mouseY.set(-200)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseleave', onLeave)
      document.documentElement.style.cursor = ''
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Ring — lazy, expands on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-accent"
        style={{
          width: 30,
          height: 30,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
          opacity: ringOpacity,
          willChange: 'transform, opacity',
        }}
      />

      {/* Dot — fast, shrinks slightly on hover so ring feels "empty" */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-accent"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScale,
          opacity: visible ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />
    </>
  )
}
