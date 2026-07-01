import type { Variants } from 'framer-motion'

// ── Easing curves ──────────────────────────────────────────────────────────
// easeOutExpo: snappy start with a long, luxurious deceleration tail.
// Used for primary reveals — fast enough to feel responsive, long enough to feel expensive.
export const easeOutExpo  = [0.16, 1, 0.3, 1]    as const
// easeOutQuart: slightly more symmetric; good for secondary/child elements in a stagger.
export const easeOutQuart = [0.25, 1, 0.5, 1]    as const
// easeInOutCubic: symmetric S-curve; reserved for looping or continuous motion.
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const

// ── Spring physics configs ─────────────────────────────────────────────────
// Fluid: natural weight, used for scroll-in reveals.
export const springFluid   = { type: 'spring', stiffness: 100, damping: 18, mass: 0.9 } as const
// Snappy: tighter spring, used for hover/focus state transitions.
export const springSnappy  = { type: 'spring', stiffness: 200, damping: 22 }            as const
// Magnetic: fast-tracking spring for cursor-following effects; returns quickly on leave.
export const springMagnetic = { type: 'spring', stiffness: 220, damping: 20 }           as const

// ── Variants ───────────────────────────────────────────────────────────────

/**
 * Primary reveal — blur-fade-up.
 * The blur(6px)→blur(0px) transition defocuses the element during ascent,
 * mimicking the depth-of-field shift used in high-end video/motion design.
 * Applied to headings and hero elements where the first impression matters most.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

/**
 * Soft reveal — fade-up without blur.
 * Better for body copy, labels, and dense text where blur would look noisy.
 */
export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
}

/**
 * Container orchestrator — primary stagger (80ms between children).
 * delayChildren: 0.1 gives the heading a head-start before children enter.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/**
 * Tight stagger — 40ms between children; for dense lists and pill groups
 * where a slow stagger would feel tedious rather than elegant.
 */
export const staggerTight: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
}

/**
 * Pure opacity fade — no movement.
 * Reserved for overlays, decorative labels, and UI chrome elements where
 * vertical motion would compete with nearby content.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * Scale-in — slight zoom + blur reveal for cards and containers.
 * The 0.94→1.0 scale range is subtle enough to avoid feeling "poppy"
 * while still providing a dimensional entry.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

/**
 * Slide from left — for timeline entries and sidebar-anchored elements.
 * The horizontal entry mirrors the left-aligned visual rhythm of the timeline.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
}

/**
 * Slide from right — for experience cards that open rightward.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}
