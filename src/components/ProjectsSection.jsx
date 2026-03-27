import React from 'react';
import ProjectGalleryCard from '@/components/project/ProjectGalleryCard';
import { projectsData } from '@/data/projectsData';

const teaserProjects = projectsData.slice(0, 3);

const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-section relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.14),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.12),_transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              Latest Projects
            </span>
          </h2>
          <p className="text-base leading-7 text-[#9ca3af] md:text-lg">
            A quick look at recent AI systems, ML pipelines, and computer vision work before diving into the full project archive.
          </p>
        </div>

        <div className="projects-grid">
          {teaserProjects.map((project) => (
            <ProjectGalleryCard
              key={project.id}
              project={project}
              detailsHref={`/project-detail.html?id=${project.id}`}
              compact
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="/projects.html" className="view-all-projects-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
