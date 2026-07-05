'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Lock } from 'lucide-react'
import { type Project, PROJECTS } from '@/lib/projects'
import ProjectVisual, { StatusBadge, TagPill } from '@/components/ProjectVisuals'
import { fadeUp, staggerContainer, easeOutExpo } from '@/lib/motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

const MONO = 'var(--font-geist-mono), monospace'

export default function ProjectDetail({ project }: { project: Project }) {
  const reduced = useReducedMotion()
  const idx  = PROJECTS.findIndex(p => p.slug === project.slug)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <section className="px-6 pb-24 pt-28">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={reduced ? undefined : staggerContainer}
        initial={reduced ? undefined : 'hidden'}
        animate="visible"
      >

        {/* Back link */}
        <motion.div variants={reduced ? undefined : fadeUp}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={13} /> All projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={reduced ? undefined : fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <span style={{ fontFamily: MONO, fontSize: '13px', color: 'var(--color-dim)', letterSpacing: '0.08em' }}>
            {project.number}
          </span>
          <StatusBadge status={project.status} />
          {project.live && (
            <span style={{
              fontSize: '9px', fontFamily: MONO, color: '#6FBF84',
              border: '1px solid rgba(111,191,132,0.3)', background: 'rgba(111,191,132,0.06)',
              padding: '2px 7px', borderRadius: '999px', letterSpacing: '0.12em',
            }}>
              LIVE
            </span>
          )}
          <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: '11px', color: 'var(--color-dim)', letterSpacing: '0.06em' }}>
            {project.impact}
          </span>
        </motion.div>

        <motion.h1
          variants={reduced ? undefined : fadeUp}
          className="mt-4 font-mono text-[30px] font-semibold leading-tight tracking-tight text-text md:text-[42px]"
        >
          {project.name}
        </motion.h1>

        <motion.p
          variants={reduced ? undefined : fadeUp}
          className="mt-4 max-w-2xl text-[16px] leading-7 text-muted"
        >
          {project.desc}
        </motion.p>

        {/* System visual — the project's animated diagram, full width */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="mt-10 overflow-hidden rounded-xl border border-border bg-surface-2"
          style={{ height: 220 }}
        >
          <ProjectVisual type={project.visual} hovered={false} inView={!reduced} />
        </motion.div>

        {/* Body: overview + sidebar */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">

          {/* Overview + highlights */}
          <motion.div variants={reduced ? undefined : fadeUp} className="flex flex-col gap-10">
            <div>
              <p className="mb-4 font-mono text-[12px] tracking-widest text-dim">— Overview</p>
              <div className="flex flex-col gap-4">
                {project.overview.map((para, i) => (
                  <p key={i} className="text-[15px] leading-[1.8] text-muted">{para}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 font-mono text-[12px] tracking-widest text-dim">— Highlights</p>
              <ul className="flex list-none flex-col gap-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={reduced ? undefined : { opacity: 0, x: -8 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: easeOutExpo }}
                  >
                    <span style={{ color: 'var(--color-accent)', fontFamily: MONO, fontSize: '11px', marginTop: 4, flexShrink: 0 }}>→</span>
                    <span className="text-[14px] leading-relaxed text-text/90">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar: stack + links */}
          <motion.aside variants={reduced ? undefined : fadeUp} className="flex flex-col gap-8">
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-4 font-mono text-[12px] tracking-widest text-dim">— Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(t => <TagPill key={t} tag={t} />)}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="mb-4 font-mono text-[12px] tracking-widest text-dim">— Links</p>
              <div className="flex flex-col gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border2 px-4 py-2.5 text-[14px] text-text transition-colors hover:border-accent/40"
                  >
                    <Github size={14} /> View source
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[13px] text-dim">
                    <Lock size={12} /> {project.source ?? 'Private'}
                  </span>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-bg transition-[filter] hover:brightness-110"
                  >
                    <ExternalLink size={14} /> Open live app
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Prev / next navigation */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6"
        >
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-1 text-left"
          >
            <span className="font-mono text-[10px] tracking-widest text-dim">← PREVIOUS</span>
            <span className="text-[14px] text-muted transition-colors group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-1 text-right"
          >
            <span className="font-mono text-[10px] tracking-widest text-dim">NEXT →</span>
            <span className="text-[14px] text-muted transition-colors group-hover:text-accent">{next.name}</span>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  )
}
