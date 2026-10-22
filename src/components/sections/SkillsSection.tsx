import React from 'react';
import { skillsData } from '../../data/skills';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';

export const SkillsSection: React.FC = () => {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        sectionIndex="04"
        badgeText="TECHNICAL ARSENAL"
        title="Technical Skills"
        subtitle="Categorized breakdown of technical competencies, AI/ML concepts, frameworks, and developer tooling."
      />

      <div className="grid-3">
        {skillsData.map((category) => (
          <Card
            key={category.id}
            as="article"
            header={
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                  CATEGORY // {category.id.toUpperCase()}
                </span>
                <h3 style={{ marginTop: '0.25rem' }}>{category.name}</h3>
                {category.description && (
                  <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{category.description}</p>
                )}
              </div>
            }
          >
            <div className="skill-items-list">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="skill-item-row">
                  <span>&bull; {skill.name}</span>
                  {skill.levelPlaceholder && (
                    <span className="skill-item-level">{skill.levelPlaceholder}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

