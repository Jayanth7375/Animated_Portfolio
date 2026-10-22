import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../../types/portfolio';
import { Card } from './Card';
import { Badge } from './Badge';
import { Placeholder } from './Placeholder';
import { Button } from './Button';

interface ProjectCardProps {
  project: ProjectItem;
  showDetailsLink?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, showDetailsLink = true }) => {
  return (
    <Card
      as="article"
      header={
        <div>
          <div className="project-card-top">
            <span className="project-number">#{project.number}</span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Badge>{project.category}</Badge>
              <span className="wf-timeline-year">{project.year}</span>
            </div>
          </div>
          <Placeholder
            label={project.imagePlaceholder}
            type="image"
            hint="Dimensions: 16:9 aspect ratio recommended"
          />
          <h3 style={{ marginTop: '0.5rem' }}>{project.title}</h3>
        </div>
      }
      footer={
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center' }}>
          <div className="project-links">
            <Button
              href={project.githubUrl}
              isExternal
              variant="outline"
              size="sm"
            >
              [GitHub]
            </Button>
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                isExternal
                variant="outline"
                size="sm"
              >
                [Live Demo]
              </Button>
            )}
          </div>

          {showDetailsLink && (
            <Link
              to={`/projects/${project.slug}`}
              className="wf-button wf-button-secondary wf-button-sm"
              style={{ textDecoration: 'none' }}
            >
              [View Architecture & Details &rarr;]
            </Link>
          )}
        </div>
      }
    >
      <p style={{ marginBottom: '1rem' }}>{project.shortDescription}</p>

      <div className="wf-tags-list">
        {project.technologies.map((tech, idx) => (
          <Badge key={idx}>{tech}</Badge>
        ))}
      </div>
    </Card>
  );
};

