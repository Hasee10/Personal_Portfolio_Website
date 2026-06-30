'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Contact',  href: '#contact'  },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 px-6"
      style={{ backgroundColor, backdropFilter }}
    >
      {/* Scroll-driven bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />

      <div className="mx-auto flex max-w-5xl items-center justify-between py-4">
        {/* Monogram */}
        <a
          href="#home"
          className="font-mono text-[15px] font-medium tracking-wide text-accent"
        >
          HA
        </a>

        {/* Desktop nav — underline grows from left on hover via ::after pseudo-element */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[14px] text-muted transition-colors duration-200 hover:text-text after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-accent/50 after:transition-[width] after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-3 text-[15px] text-muted transition-colors hover:text-text"
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
