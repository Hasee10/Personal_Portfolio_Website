import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { HeroDemo } from './components/HeroDemo';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import WhyMeSection from './components/WhyMeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      
      e.preventDefault();
      const id = target.getAttribute('href').slice(1);
      const element = document.getElementById(id);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10"></div>
          
          {/* Content */}
          <div className="z-20 w-full">
            <HeroDemo />
          </div>
        </section>
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <WhyMeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
