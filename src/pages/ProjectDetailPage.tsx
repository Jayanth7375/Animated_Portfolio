import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { SectionWrapper } from '../components/common/SectionWrapper';
import { Placeholder } from '../components/common/Placeholder';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <SectionWrapper id="project-not-found">
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>Project Not Found</h2>
          <p style={{ margin: '1rem 0' }}>The requested project slug "{slug}" does not exist in the dataset.</p>
          <Link to="/projects" className="wf-button wf-button-primary">
            [Return to Projects List]
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  return (
    <SectionWrapper id={`project-detail-${project.slug}`}>
      {/* Breadcrumb Hierarchy */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', fontFamily: 'var(--wf-font-mono)' }}>
        <Link to="/">Home</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--wf-text-muted)' }}>/</span>
        <Link to="/projects">Projects</Link>
        <span style={{ margin: '0 0.5rem', color: 'var(--wf-text-muted)' }}>/</span>
        <span style={{ color: 'var(--wf-text-muted)' }}>{project.title}</span>
      </nav>

      {/* Project Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="section-index-badge">PROJECT #{project.number}</span>
          <Badge>{project.category}</Badge>
          <span className="wf-timeline-year">{project.year}</span>
        </div>

        <h1>{project.title}</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', maxWidth: '720px' }}>
          {project.shortDescription}
        </p>

        {project.role && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--wf-text-secondary)' }}>
            <strong>Architectural Role:</strong> {project.role}
          </div>
        )}
      </div>

      {/* Main Visual Placeholder */}
      <Placeholder
        label={project.imagePlaceholder}
        type="image"
        height="320px"
        hint="High-Resolution Architecture Diagram / UI Showcase Slot"
      />

      <div className="grid-2" style={{ marginTop: '2rem' }}>
        {/* Left Column: Long Description & Highlights */}
        <div>
          <h3>System Overview & Architectural Purpose</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.longDescription.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {project.highlights && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4>Key Capabilities & Highlights</h4>
              <ul style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ color: 'var(--wf-text-secondary)' }}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Tech Stack & Actions Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card
            header={<h4>Tech Stack & Dependencies</h4>}
            footer={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button href={project.githubUrl} isExternal variant="primary">
                  [View Source Repository &rarr;]
                </Button>
                {project.liveUrl && (
                  <Button href={project.liveUrl} isExternal variant="outline">
                    [Access Live Environment / Demo &rarr;]
                  </Button>
                )}
              </div>
            }
          >
            <div className="wf-tags-list">
              {project.technologies.map((tech, idx) => (
                <Badge key={idx}>{tech}</Badge>
              ))}
            </div>
          </Card>

          <Card header={<h4>Deployment & Environment Info</h4>}>
            <p style={{ fontSize: '0.85rem', color: 'var(--wf-text-muted)' }}>
              [ENVIRONMENT SKELETON: Local containerization, API routing, and continuous integration pipeline ready.]
            </p>
          </Card>
        </div>
      </div>

      {/* Previous / Next Project Navigation Bar */}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--wf-border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {prevProject ? (
          <Link to={`/projects/${prevProject.slug}`} className="wf-button wf-button-outline wf-button-sm">
            &larr; Previous: #{prevProject.number} {prevProject.title}
          </Link>
        ) : (
          <span style={{ fontSize: '0.85rem', color: 'var(--wf-text-muted)' }}>[First Project]</span>
        )}

        <Link to="/projects" className="wf-button wf-button-secondary wf-button-sm">
          [View All Projects]
        </Link>

        {nextProject ? (
          <Link to={`/projects/${nextProject.slug}`} className="wf-button wf-button-outline wf-button-sm">
            Next: #{nextProject.number} {nextProject.title} &rarr;
          </Link>
        ) : (
          <span style={{ fontSize: '0.85rem', color: 'var(--wf-text-muted)' }}>[End of Projects]</span>
        )}
      </div>
    </SectionWrapper>
  );
};

