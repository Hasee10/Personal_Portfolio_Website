import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ProjectIcon, UiIcons } from '@/components/project/ProjectVisuals';

const { Github, ExternalLink, ArrowRight } = UiIcons;

function formatCategoryBadge(categoryLabel) {
  return categoryLabel || 'Project';
}

const ProjectGalleryCard = ({ project, detailsHref, compact = false }) => {
  return (
    <article
      className={`project-card-shell group ${compact ? 'project-card-shell--compact' : ''}`}
      data-category={project.category}
      style={{ '--project-gradient': project.gradient }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />

      <div className="project-card">
        <div className={`project-banner ${compact ? 'project-banner--compact' : ''}`}>
          <div className="project-banner__shine" aria-hidden="true" />
          <div className="project-banner__actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-button"
              aria-label={`${project.title} GitHub repository`}
            >
              <Github className="h-4 w-4" />
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-button"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
          <div className="project-banner__icon">
            <ProjectIcon name={project.icon} className={compact ? 'h-11 w-11' : 'h-12 w-12'} />
          </div>
        </div>

        <div className="project-card__body">
          <div className="space-y-4">
            <span className="project-category-badge">{formatCategoryBadge(project.categoryLabel)}</span>

            <div className="space-y-3">
              <h3 className="project-card__title">{project.title}</h3>
              <p className={`project-card__description ${compact ? 'project-card__description--compact' : ''}`}>
                {project.shortDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={`${project.id}-${tag}`} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a href={detailsHref} className="project-link">
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectGalleryCard;
