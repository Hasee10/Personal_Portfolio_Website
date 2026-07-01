'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, scaleIn, staggerContainer, easeOutExpo } from '@/lib/motion'
import { META, STATS } from '@/lib/constants'

/* ── Animated counter ──────────────────────────────────────────────────────
 * rAF-based ease-out cubic interpolation. On completion, flashes a brief
 * accent underline to punctuate the number's arrival.
 */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref     = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const el   = ref.current
    const line = lineRef.current
    if (!inView || !el) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      el.textContent = String(target) + suffix
      return
    }

    const start    = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      el.textContent = String(Math.round(eased * target)) + suffix

      if (progress < 1) {
        requestAnimationFrame(tick)
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

    requestAnimationFrame(tick)
  }, [inView, target, suffix])

  return (
    <span className="relative inline-block">
      <span ref={ref}>0{suffix}</span>
      {/* Flash underline — animated via inline styles on counter completion */}
      <span
        ref={lineRef}
        className="absolute bottom-1 left-0 h-px bg-accent"
        style={{ width: '0%', opacity: 0 }}
      />
    </span>
  )
}

export default function About() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="about" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-12 lg:flex-row lg:gap-16"
        >
          {/* Photo placeholder */}
          <motion.div
            variants={reduced ? undefined : scaleIn}
            className="flex-shrink-0 lg:w-[260px]"
          >
            {/* Replace src with your photo path once ready, e.g. src="/haseeb.jpg" */}
            <div className="relative mx-auto w-[200px] lg:w-full">
              <div
                className="aspect-[4/5] w-full rounded-2xl border border-border bg-surface-2 overflow-hidden flex flex-col items-center justify-center gap-3"
                style={{ background: 'var(--color-surface-2)' }}
              >
                {/* Placeholder avatar ring */}
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-border2 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" stroke="var(--color-dim)" strokeWidth="1.5"/>
                    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="var(--color-dim)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="font-mono text-[10px] text-dim tracking-widest">PHOTO COMING</p>
              </div>
              {/* Accent corner accent */}
              <div
                className="absolute -bottom-2 -right-2 h-12 w-12 rounded-lg border border-accent/20"
                style={{ background: 'rgba(202,255,87,0.04)' }}
              />
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="flex flex-[1] flex-col gap-6"
          >
            <p className="font-mono text-[12px] tracking-widest text-dim">— About</p>
            <h2 className="text-[36px] font-medium leading-tight text-text md:text-[40px]">
              Who I am.
            </h2>
            <p className="text-[16px] leading-[1.7] text-muted">{META.bio}</p>

            {/* Subtle accent rule that draws in */}
            <motion.div
              className="h-px w-12 bg-accent/40"
              initial={reduced ? {} : { scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.5 }}
            />
          </motion.div>

          {/* Stats column — scale-in for dimensional entry */}
          <motion.div
            variants={reduced ? undefined : scaleIn}
            className="flex flex-[0.8] flex-col divide-y divide-border"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="py-6 first:pt-0 last:pb-0">
                <p className="font-mono text-[48px] font-normal text-accent">
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
