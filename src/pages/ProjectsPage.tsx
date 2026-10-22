import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { SectionWrapper } from '../components/common/SectionWrapper';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProjectCard } from '../components/common/ProjectCard';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <SectionWrapper id="all-projects">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ fontSize: '0.85rem', fontFamily: 'var(--wf-font-mono)' }}>
          &larr; Back to Home Overview
        </Link>
      </div>

      <SectionHeading
        badgeText="PROJECTS DIRECTORY"
        title="All Projects & Architectures"
        subtitle="Complete catalog of engineering solutions, system architecture prototypes, and applied research repositories."
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`wf-button wf-button-sm ${selectedCategory === cat ? 'wf-button-primary' : 'wf-button-outline'}`}
                type="button"
              >
                [{cat}]
              </button>
            ))}
          </div>
        }
      />

      <div className="grid-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

