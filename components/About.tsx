'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { META, STATS } from '@/lib/constants'

/* Animated counting number */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const el = ref.current
    if (!inView || !el) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      el.textContent = String(target) + suffix
      return
    }

    const start    = performance.now()
    const duration = 1500

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      el.textContent = String(Math.round(eased * target)) + suffix
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target, suffix])

  return <span ref={ref}>0{suffix}</span>
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
          className="flex flex-col gap-12 lg:flex-row lg:gap-20"
        >
          {/* Bio */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="flex flex-[1.2] flex-col gap-6"
          >
            <p className="font-mono text-[12px] tracking-widest text-dim">— About</p>
            <h2 className="text-[36px] font-medium leading-tight text-text md:text-[40px]">
              Who I am.
            </h2>
            <p className="text-[16px] leading-[1.7] text-muted">{META.bio}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
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
