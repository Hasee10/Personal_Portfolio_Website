import React, { useEffect, useMemo, useState } from 'react';

const sections = ['home', 'experience', 'skills', 'articles', 'projects', 'contact'];

const Navbar = ({ mode = 'home' }) => {
  const [activeSection, setActiveSection] = useState(mode === 'home' ? 'home' : 'projects');
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(() => {
    if (mode === 'home') {
      return [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'experience', label: 'Experience', href: '#experience' },
        { id: 'skills', label: 'Skills', href: '#skills' },
        { id: 'articles', label: 'Articles', href: '#articles' },
        { id: 'projects', label: 'Projects', href: '/projects.html' },
        { id: 'contact', label: 'Contact', href: '#contact' },
      ];
    }
    return [
      { id: 'home', label: 'Home', href: '/index.html#home' },
      { id: 'experience', label: 'Experience', href: '/index.html#experience' },
      { id: 'skills', label: 'Skills', href: '/index.html#skills' },
      { id: 'articles', label: 'Articles', href: '/index.html#articles' },
      { id: 'projects', label: 'Projects', href: '/projects.html' },
      { id: 'contact', label: 'Contact', href: '/index.html#contact' },
    ];
  }, [mode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (mode !== 'home') {
      setActiveSection('projects');
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observedSections = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.4, 0.6] }
    );

    observedSections.forEach((s) => observer.observe(s));
    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, [mode]);

  const hireHref = mode === 'home' ? '#contact' : '/index.html#contact';

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'py-4'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href={mode === 'home' ? '#home' : '/index.html#home'} className="nav-brand shrink-0">
          HA
        </a>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link px-2 sm:px-3 ${isActive ? 'nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA */}
        <a href={hireHref} className="hire-me-btn shrink-0 hidden sm:inline-flex">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Hire Me
        </a>
      </div>
    </header>
  );
};

export default Navbar;
