import { Github, Linkedin } from 'lucide-react'
import { META } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Left */}
        <span className="font-mono text-[13px] text-dim">{META.name}</span>

        {/* Center — social icons */}
        <div className="flex items-center gap-5">
          <a
            href={META.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-dim transition-colors duration-200 hover:text-accent"
          >
            <Github size={16} />
          </a>
          <a
            href={META.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-dim transition-colors duration-200 hover:text-accent"
          >
            <Linkedin size={16} />
          </a>
        </div>

        {/* Right */}
        <span className="font-mono text-[13px] text-dim">
          Built with Next.js · 2026
        </span>
      </div>
    </footer>
  )
}
