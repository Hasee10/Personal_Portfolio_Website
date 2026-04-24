import React, { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { projectsData } from '@/data/projectsData';
import { HighlightIcon, ProjectIcon, UiIcons } from '@/components/project/ProjectVisuals';

const { Github, ExternalLink, ArrowLeft, CheckCircle2 } = UiIcons;

const ProjectDetailPage = () => {
  const project = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return projectsData.find((item) => item.id === id) || projectsData[0];
  }, []);

  return (
    <div className="project-detail-page min-h-screen bg-background text-foreground">
      <div className="page-particles-bg">
        <iframe src="/particles.html" title="Particles Background" className="page-particles-bg__frame" />
      </div>
      <div className="page-particles-bg__overlay" />

      <Navbar mode="detail" />

      <main className="relative z-10 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <a href="/projects.html" className="detail-back-link">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </a>

          <section className="detail-hero-shell">
            <div className="detail-hero" style={{ '--project-gradient': project.gradient }}>
              <div className="detail-hero__actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-icon-button">
                  <Github className="h-4 w-4" />
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-icon-button">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="detail-hero__icon">
                <ProjectIcon name={project.icon} className="h-16 w-16" />
              </div>

              <div className="detail-hero__title-wrap">
                <h1>{project.title}</h1>
              </div>
            </div>
          </section>

          <div className="detail-layout">
            <div className="detail-content">
              <section className="detail-section">
                <h2>Overview</h2>
                <p>{project.fullDesc}</p>
              </section>

              <section className="detail-section">
                <h2>Key Features</h2>
                <ul className="detail-feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="detail-section">
                <h2>Technical Highlights</h2>
                <div className="detail-highlights-grid">
                  {project.highlights.map((highlight) => (
                    <article key={highlight.text} className="detail-highlight-card">
                      <div className="detail-highlight-card__icon">
                        <HighlightIcon name={highlight.icon} className="h-5 w-5" />
                      </div>
                      <p>{highlight.text}</p>
                    </article>
                  ))}
                </div>
              </section>

              {project.challenge ? (
                <section className="detail-section">
                  <h2>Challenges &amp; Solutions</h2>
                  <p>{project.challenge}</p>
                </section>
              ) : null}
            </div>

            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <h3>Tech Stack</h3>
                <div className="detail-tag-grid">
                  {project.tags.map((tag) => (
                    <span key={tag} className="timeline-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="detail-sidebar-card">
                <h3>Project Info</h3>
                <dl className="detail-info-list">
                  <div>
                    <dt>Status</dt>
                    <dd>{project.status}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{project.categoryLabel}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                </dl>
              </div>

              <div className="detail-sidebar-card">
                <h3>Links</h3>
                <div className="detail-link-stack">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="detail-link-button detail-link-button--outline">
                    GitHub
                  </a>
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="detail-link-button detail-link-button--filled">
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
