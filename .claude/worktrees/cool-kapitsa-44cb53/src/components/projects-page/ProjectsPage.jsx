import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectGalleryCard from '@/components/project/ProjectGalleryCard';
import { projectFilters, projectsData } from '@/data/projectsData';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && projectFilters.some((filter) => filter.value === initialHash)) {
      setActiveFilter(initialHash);
    }
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      history.replaceState(null, '', window.location.pathname);
    } else {
      history.replaceState(null, '', `#${activeFilter}`);
    }
  }, [activeFilter]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectsData;
    return projectsData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="projects-page min-h-screen bg-background text-foreground">
      <div className="page-particles-bg">
        <iframe src="/particles.html" title="Particles Background" className="page-particles-bg__frame" />
      </div>
      <div className="page-particles-bg__overlay" />

      <Navbar mode="projects" />

      <main className="relative z-10 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <section className="projects-page-section mx-auto max-w-7xl">
          <div className="projects-page-hero mx-auto max-w-4xl text-center">
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                Project Showcase
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-[#9ca3af] md:text-lg">
              A curated collection of AI systems, ML pipelines, computer vision tools, and automation projects built from scratch.
            </p>
          </div>

          <div className="projects-page-filters flex flex-wrap items-center justify-center gap-3">
            {projectFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`filter-pill ${activeFilter === filter.value ? 'filter-pill--active' : ''}`}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="projects-grid projects-grid--page projects-page-grid">
            {filteredProjects.map((project) => (
              <ProjectGalleryCard
                key={project.id}
                project={project}
                detailsHref={`/project-detail.html?id=${project.id}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;
