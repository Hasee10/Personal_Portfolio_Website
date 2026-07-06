'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, scaleIn, staggerContainer, easeOutExpo } from '@/lib/motion'
import { META, STATS } from '@/lib/constants'
import { useReducedMotion } from '@/lib/useReducedMotion'

/* ── Animated counter ──────────────────────────────────────────────────────
 * The REAL value is rendered in the static HTML so it never flashes zero
 * before hydration. On scroll into view the number counts up from 40% of the
 * target to the target — never from zero. Reduced motion: static value only.
 */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref     = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el   = ref.current
    const line = lineRef.current
    if (!inView || reduced || !el) return

    const from     = Math.floor(target * 0.4)
    const start    = performance.now()
    const duration = 1200
    let   raf      = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.round(from + eased * (target - from)).toLocaleString() + suffix

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else if (line) {
        // Brief accent flash on completion
        line.style.transition = 'width 0.3s ease-out, opacity 0.4s 0.25s ease-in'
        line.style.width   = '100%'
        line.style.opacity = '0.6'
        setTimeout(() => {
          if (line) { line.style.width = '0%'; line.style.opacity = '0' }
        }, 600)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, target, suffix])

  return (
    <span className="relative inline-block">
      {/* Static real value — present in initial HTML, no zero-flash */}
      <span ref={ref}>{target.toLocaleString()}{suffix}</span>
      <span
        ref={lineRef}
        className="absolute bottom-1 left-0 h-px bg-accent"
        style={{ width: '0%', opacity: 0 }}
      />
    </span>
  )
}

export default function About() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section id="about" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12 lg:flex-row lg:gap-20"
        >
          {/* Bio column — carries the section now that there's no photo */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="flex flex-[1.3] flex-col gap-6"
          >
            <p className="font-mono text-[12px] tracking-widest text-dim">— About</p>
            <h2 className="font-mono text-[32px] font-medium leading-tight tracking-tight text-text md:text-[44px]">
              Who I am.
            </h2>
            <p className="max-w-xl text-[17px] leading-[1.8] text-muted">{META.bio}</p>

            {/* Subtle accent rule that draws in */}
            <motion.div
              className="h-px w-12 bg-accent/40"
              initial={reduced ? {} : { scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.5 }}
            />
          </motion.div>

          {/* Stats column */}
          <motion.div
            variants={reduced ? undefined : scaleIn}
            className="flex flex-[0.8] flex-col divide-y divide-border"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="py-6 first:pt-0 last:pb-0">
                <p className="font-mono text-[44px] font-medium text-accent">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[14px] text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
