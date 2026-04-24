import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { HeroDemo } from './components/HeroDemo';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ArticlesSection from './components/ArticlesSection';
import ProjectsSection from './components/ProjectsSection';
import WhyMeSection from './components/WhyMeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const sections = Array.from(document.querySelectorAll('section[id]'));
    sections.forEach((section) => {
      section.classList.add('reveal');
      if (section.id === 'home') section.classList.add('visible');
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    sections
      .filter((section) => section.id !== 'home')
      .forEach((section) => revealObserver.observe(section));

    return () => {
      document.documentElement.style.scrollBehavior = '';
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Particles Background */}
          <div className="absolute inset-0 z-0">
            {/* We'll keep the ParticlesCanvas here */}
            <div className="w-full h-full" style={{ position: 'absolute' }}>
              <iframe 
                src="/particles.html" 
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Particles Background"
              ></iframe>
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="hero-background-overlay absolute inset-0 z-10"></div>
          
          {/* Content */}
          <div className="z-20 w-full">
            <HeroDemo />
          </div>
        </section>
        <ExperienceSection />
        <SkillsSection />
        <ArticlesSection />
        <ProjectsSection />
        <WhyMeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
