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
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [mode]);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'py-5'}`}>
      <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <nav className="w-full border-b border-white/10">
          <ul className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
