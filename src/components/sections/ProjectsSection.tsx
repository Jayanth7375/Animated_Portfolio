import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from '../common/ProjectCard';
import { Button } from '../common/Button';

export const ProjectsSection: React.FC = () => {
  // Category filter state placeholder
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        sectionIndex="03"
        badgeText="FEATURED WORKS"
        title="Engineering Projects"
        subtitle="End-to-end architectures encompassing AI digital twins, air-gapped multimodal RAG systems, cloud operations orchestration, and web platforms."
        actions={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            {/* Category Filter Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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

            <Link to="/projects" className="wf-button wf-button-secondary wf-button-sm" style={{ textDecoration: 'none' }}>
              [All Projects Index &rarr;]
            </Link>
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

