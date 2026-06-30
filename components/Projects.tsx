'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { PROJECTS } from '@/lib/constants'

/* ── 3-D perspective tilt card ────────────────────────────────────────────
 * On hover, tracks the cursor's position relative to the card centre and
 * applies a rotateX / rotateY translation proportional to that offset.
 * Spring physics (stiffness 140, damping 18) produce a weighted, physical
 * return to rest — not a snap, not a bounce.
 * Only `transform` is mutated → GPU composited → zero layout thrashing.
 */
function TiltCard({
  children,
  className,
  reduced,
}: {
  children: React.ReactNode
  className?: string
  reduced: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springConfig = { stiffness: 140, damping: 18 }
  const sRotateX = useSpring(rotateX, springConfig)
  const sRotateY = useSpring(rotateY, springConfig)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rotateX.set(((e.clientY - (rect.top  + rect.height / 2)) / rect.height) * -7)
    rotateY.set(((e.clientX - (rect.left + rect.width  / 2)) / rect.width)  *  7)
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformPerspective: 900,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section id="projects" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Projects</p>
          <h2 className="text-[36px] font-medium text-text md:text-[40px]">
            Things I&apos;ve shipped.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.name}
              variants={reduced ? undefined : fadeUp}
            >
              {/* TiltCard wraps the article so tilt resets cleanly via ref */}
              <TiltCard
                reduced={reduced}
                className="h-full"
              >
                <motion.article
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6"
                  whileHover={
                    reduced
                      ? {}
                      : { y: -5, borderColor: 'rgba(78,107,69,0.45)' }
                  }
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {/* Name with accent dot */}
                  <h3 className="flex items-center gap-2 text-[18px] font-medium text-text">
                    <span className="text-[10px] text-accent">●</span>
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-6 text-muted">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface2 px-2.5 py-0.5 text-[11px] text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[12px] text-muted transition-colors duration-200 hover:text-accent"
                    >
                      <ExternalLink size={12} />
                      Live ↗
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[12px] text-muted transition-colors duration-200 hover:text-accent"
                    >
                      <Github size={12} />
                      GitHub ↗
                    </a>
                  </div>
                </motion.article>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
