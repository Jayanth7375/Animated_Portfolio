import React from 'react';
import { experienceData } from '../../data/experience';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const ExperienceSection: React.FC = () => {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        sectionIndex="02"
        badgeText="INDUSTRY & INTERNSHIPS"
        title="Work Experience"
        subtitle="Hands-on internship positions spanning artificial intelligence, autonomous agent workflows, and full-stack software development."
      />

      <div className="grid-1">
        {experienceData.map((exp) => (
          <Card
            key={exp.id}
            as="article"
            header={
              <div>
                <div className="experience-meta">
                  <h3>{exp.role}</h3>
                  <span className="wf-timeline-year">{exp.date}</span>
                </div>
                <div className="experience-company">
                  @ {exp.company} {exp.location && <span>({exp.location})</span>}
                </div>
              </div>
            }
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                  [VERIFIED EXPERIENCE ENTRY]
                </span>
                {exp.link && (
                  <Button href={exp.link} variant="outline" size="sm">
                    [Experience Verification / Details]
                  </Button>
                )}
              </div>
            }
          >
            <ul className="experience-bullets">
              {exp.description.map((bullet, idx) => (
                <li key={idx} style={{ color: 'var(--wf-text-secondary)', fontSize: '0.95rem' }}>
                  {bullet}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                TECHNOLOGIES UTILIZED:
              </span>
              <div className="wf-tags-list">
                {exp.technologies.map((tech, idx) => (
                  <Badge key={idx}>{tech}</Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

