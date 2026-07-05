'use client'

import { type ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion'
import { Github, ExternalLink, Lock } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { PROJECTS, STATUS_CFG, type Project, type Status } from '@/lib/projects'
import ProjectVisual, { StatusBadge, TagPill, AgentsMiniVisual } from '@/components/ProjectVisuals'

// Bento weights — production/client work gets more visual area than
// research or internal tooling.
const COL_CLASSES: Record<string, string> = {
  'Visa2Land':                'col-span-12 md:col-span-8',
  'ScopeForge':               'col-span-12 md:col-span-4',
  'NexusDeals':               'col-span-12 md:col-span-4',
  'Agent Reliability Auditor':'col-span-12 md:col-span-4',
  'VocalCRM':                 'col-span-12 md:col-span-4',
  'NLP-RAG-Agent':            'col-span-12 md:col-span-4',
  'AI Voice Agent — LiveKit': 'col-span-12 md:col-span-4',
  'AeroNet Lite':             'col-span-12 md:col-span-4',
  'LangGraph Agents':         'col-span-12',
}

const MONO = 'var(--font-geist-mono), monospace'

// ── TiltCard — the site's single 3D touch: CSS perspective tilt, transform
//    only, no render loop, disabled under reduced motion. ──────────────────────

function TiltCard({ children, className, disabled }: { children: ReactNode; className?: string; disabled?: boolean }) {
  const ref   = useRef<HTMLDivElement>(null)
  const rotX  = useMotionValue(0)
  const rotY  = useMotionValue(0)
  const glrX  = useMotionValue(50)
  const glrY  = useMotionValue(50)
  const sX    = useSpring(rotX, { stiffness: 140, damping: 18 })
  const sY    = useSpring(rotY, { stiffness: 140, damping: 18 })
  const glare = useMotionTemplate`radial-gradient(ellipse at ${glrX}% ${glrY}%, rgba(157,190,141,0.07) 0%, transparent 60%)`
  const [hov, setHov] = useState(false)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    rotX.set(((e.clientY - (r.top  + r.height / 2)) / r.height) * -6)
    rotY.set(((e.clientX - (r.left + r.width  / 2)) / r.width)  *  6)
    glrX.set(((e.clientX - r.left) / r.width)  * 100)
    glrY.set(((e.clientY - r.top)  / r.height) * 100)
    if (!hov) setHov(true)
  }

  function onLeave() { rotX.set(0); rotY.set(0); setHov(false) }

  return (
    <motion.div
      ref={ref} className={`relative overflow-hidden ${className ?? ''}`}
      style={{ rotateX: sX, rotateY: sY, transformPerspective: 900 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
      <AnimatePresence>
        {!disabled && hov && (
          <motion.div aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glare }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Card pieces ───────────────────────────────────────────────────────────────

function CardMeta({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
        {project.number}
      </span>
      <div className="flex items-center gap-2">
        {project.live && (
          <span style={{
            fontSize: '8px', fontFamily: MONO, color: '#6FBF84',
            border: '1px solid rgba(111,191,132,0.3)', background: 'rgba(111,191,132,0.06)',
            padding: '2px 6px', borderRadius: '999px', letterSpacing: '0.12em',
          }}>
            LIVE
          </span>
        )}
        <StatusBadge status={project.status} />
      </div>
    </div>
  )
}

/* Footer: real repo link OR an explicit private label — never a silent
   profile-URL fallback. */
function CardFooter({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4 border-t border-border pt-3">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-accent"
          onClick={e => e.stopPropagation()}>
          <Github size={11} /> GitHub ↗
        </a>
      ) : (
        <span className="flex items-center gap-1.5 text-[12px] text-dim">
          <Lock size={10} /> {project.source ?? 'Private'}
        </span>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-muted transition-colors hover:text-accent"
          onClick={e => e.stopPropagation()}>
          <ExternalLink size={11} /> Live ↗
        </a>
      )}
      <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: MONO, color: 'var(--color-dim)', letterSpacing: '0.06em' }}>
        {project.impact}
      </span>
    </div>
  )
}

function FeaturedCard({ project, inView, reduced }: { project: Project; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  const detailHref = `/projects/${project.slug}`
  return (
    <TiltCard disabled={reduced} className="h-full">
      <motion.article
        className="flex h-full flex-col rounded-xl border border-border bg-surface"
        style={{ minHeight: 320 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ borderColor: 'rgba(157,190,141,0.32)' }}
        transition={{ duration: 0.22 }}
      >
        <Link href={detailHref} className="block" tabIndex={-1} aria-hidden="true">
          <div style={{
            height: 140, overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface-2)',
          }}>
            <ProjectVisual type={project.visual} hovered={hovered} inView={inView} />
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <CardMeta project={project} />
          <h3 className="text-[18px] font-semibold">
            <Link href={detailHref} className="text-text transition-colors hover:text-accent">
              {project.name}
            </Link>
          </h3>
          <p className="flex-1 text-[13px] leading-relaxed text-muted">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => <TagPill key={t} tag={t} />)}
          </div>
          <CardFooter project={project} />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={detailHref}
                  style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-accent)', letterSpacing: '0.14em' }}
                >
                  VIEW PROJECT →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function StandardCard({ project, inView, reduced }: { project: Project; inView: boolean; reduced: boolean }) {
  const [hovered, setHovered] = useState(false)
  const detailHref = `/projects/${project.slug}`
  return (
    <TiltCard disabled={reduced} className="h-full">
      <motion.article
        className="flex h-full flex-col rounded-xl border border-border bg-surface"
        style={{ minHeight: 260 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ borderColor: 'rgba(157,190,141,0.32)' }}
        transition={{ duration: 0.22 }}
      >
        <Link href={detailHref} className="block" tabIndex={-1} aria-hidden="true">
          <div style={{
            height: 80, overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface-2)',
          }}>
            <ProjectVisual type={project.visual} hovered={hovered} inView={inView} />
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <CardMeta project={project} />
          <h3 className="text-[16px] font-semibold">
            <Link href={detailHref} className="text-text transition-colors hover:text-accent">
              {project.name}
            </Link>
          </h3>
          <p className="flex-1 text-[13px] leading-relaxed text-muted">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => <TagPill key={t} tag={t} />)}
          </div>
          <CardFooter project={project} />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={detailHref}
                  style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-accent)', letterSpacing: '0.14em' }}
                >
                  VIEW PROJECT →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </TiltCard>
  )
}

function StripCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const detailHref = `/projects/${project.slug}`
  return (
    <motion.article
      className="flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center md:gap-6"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', minHeight: 80 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered ? 'rgba(157,190,141,0.42)' : 'rgba(255,255,255,0.08)',
        boxShadow:   hovered ? 'inset 2px 0 0 #9DBE8D' : 'inset 0 0 0 transparent',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Title block — h3 first so the name can never be lost in the wrap */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:min-w-[300px]">
        <span style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
          {project.number}
        </span>
        <h3 className="text-[15px] font-semibold">
          <Link href={detailHref} className="text-text transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h3>
        <StatusBadge status={project.status} />
        <AgentsMiniVisual />
      </div>
      <p className="flex-1 text-[13px] text-muted">{project.desc}</p>
      <div className="flex flex-wrap items-center gap-2 md:min-w-[220px] md:justify-end">
        {project.tags.slice(0, 3).map(t => <TagPill key={t} tag={t} />)}
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-accent">
            <Github size={11} /> GitHub ↗
          </a>
        ) : (
          <span className="ml-2 flex items-center gap-1 text-[12px] text-dim">
            <Lock size={10} /> {project.source ?? 'Private'}
          </span>
        )}
        <Link href={detailHref}
          className="flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-accent">
          Details →
        </Link>
      </div>
    </motion.article>
  )
}

// ── Per-card inView wrapper ───────────────────────────────────────────────────

function CardWrapper({ project, colClass, reduced }: { project: Project; colClass: string; reduced: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref} className={colClass} variants={reduced ? undefined : scaleIn}>
      {project.template === 'featured' && <FeaturedCard  project={project} inView={inView} reduced={reduced} />}
      {project.template === 'standard' && <StandardCard  project={project} inView={inView} reduced={reduced} />}
      {project.template === 'strip'    && <StripCard     project={project} />}
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const reduced    = useReducedMotion()

  return (
    <section id="projects" ref={sectionRef} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-6"
        >
          <p className="mb-3 font-mono text-[12px] tracking-widest text-dim">— Projects</p>
          <h2 className="font-mono text-[30px] font-medium tracking-tight text-text md:text-[38px]">
            Things I&apos;ve shipped.
          </h2>
        </motion.div>

        {/* Status legend */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10 flex flex-wrap items-center gap-6"
        >
          {(Object.keys(STATUS_CFG) as Status[]).map(s => (
            <span key={s} className="flex items-center gap-2">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_CFG[s].color, display: 'inline-block' }} />
              <span style={{ fontSize: '10px', fontFamily: MONO, color: 'var(--color-muted)', letterSpacing: '0.12em' }}>{s}</span>
            </span>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: MONO, color: 'var(--color-dim)' }}>
            {PROJECTS.length} projects
          </span>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-12 gap-3"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
        >
          {PROJECTS.map(p => (
            <CardWrapper
              key={p.name}
              project={p}
              colClass={COL_CLASSES[p.name] ?? 'col-span-12'}
              reduced={reduced}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
