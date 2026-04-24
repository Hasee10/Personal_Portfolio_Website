import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Articles', href: '#articles' },
  { label: 'Projects', href: '/projects.html' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    icon: <Github className="h-4 w-4" />,
    href: 'https://github.com/Haseeb10',
  },
  {
    label: 'LinkedIn',
    icon: <Linkedin className="h-4 w-4" />,
    href: 'https://www.linkedin.com/in/haseeb-arshad-09881b347/',
  },
  {
    label: 'Medium',
    icon: <BookOpen className="h-4 w-4" />,
    href: 'https://medium.com/@ihaseebarshad10',
  },
  {
    label: 'Email',
    icon: <Mail className="h-4 w-4" />,
    href: 'mailto:m.ihaseebarshad10@gmail.com',
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-background">
      {/* Subtle glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-violet-600/4 blur-[80px]" />
        <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-pink-600/4 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Three-column footer grid */}
          <div className="footer-grid">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="nav-brand text-lg">HA</div>
                <span className="footer-brand-name">Haseeb Arshad</span>
              </div>
              <p className="footer-tagline">
                AI/ML Engineer building intelligent systems that solve real problems.
                Currently open to new opportunities and exciting collaborations.
              </p>
              {/* Availability badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/6 px-3.5 py-2 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </div>
            </div>

            {/* Navigation column */}
            <div>
              <h4 className="footer-nav-title">Navigation</h4>
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footer-nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social / Connect column */}
            <div>
              <h4 className="footer-nav-title">Connect</h4>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-nav-link inline-flex items-center gap-2"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copy">
              © {year} Haseeb Arshad. Built with React + Vite.
            </span>
            <div className="footer-social-row">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
