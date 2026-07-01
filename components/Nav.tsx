'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

// Sections observed for active-link tracking (on home page only)
const TRACKED_SECTIONS = ['home', 'about', 'skills', 'contact']

export default function Nav() {
  const pathname = usePathname()
  const isHome   = pathname === '/'

  const [isOpen, setIsOpen]               = useState(false)
  const [activeSection, setActiveSection] = useState(isHome ? 'home' : 'projects')

  const NAV_LINKS = [
    { label: 'About',    href: isHome ? '#about'   : '/#about',   section: 'about'    },
    { label: 'Projects', href: '/projects',                        section: 'projects' },
    { label: 'Skills',   href: isHome ? '#skills'  : '/#skills',  section: 'skills'   },
    { label: 'Contact',  href: isHome ? '#contact' : '/#contact', section: 'contact'  },
  ]

  const { scrollY, scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(9,11,8,0)', 'rgba(9,11,8,0.88)']
  )
  const backdropFilter = useTransform(
    scrollY,
    [0, 80],
    ['blur(0px)', 'blur(14px)']
  )
  const borderOpacity = useTransform(scrollY, [60, 80], [0, 1])

  // Active section tracking — only on the home page
  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px' }
    )
    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 px-6"
      style={{ backgroundColor, backdropFilter }}
    >
      {/* Scroll progress line — Forest Moss, scales from left on scroll */}
      <motion.div
        className="absolute left-0 top-0 h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress, willChange: 'transform' }}
      />

      {/* Scroll-driven bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />

      <div className="mx-auto flex max-w-5xl items-center justify-between py-4">
        {/* Monogram */}
        <a
          href="/"
          className="font-mono text-[15px] font-medium tracking-wide text-accent transition-opacity duration-200 hover:opacity-70"
        >
          HA
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.section
            return (
              <a
                key={link.href}
                href={link.href}
                className={clsx(
                  'relative text-[14px] transition-colors duration-200',
                  'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-accent/60 after:transition-[width] after:duration-300',
                  isActive
                    ? 'text-text after:w-full'
                    : 'text-muted hover:text-text after:w-0 hover:after:w-full'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex items-center text-muted transition-colors hover:text-text md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'px-2 py-3 text-[15px] transition-colors hover:text-text',
                    activeSection === link.section ? 'text-text' : 'text-muted'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
