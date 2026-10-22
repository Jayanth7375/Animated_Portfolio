import React from 'react';
import { achievementsData } from '../../data/achievements';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Placeholder } from '../common/Placeholder';

export const AchievementsSection: React.FC = () => {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading
        sectionIndex="07"
        badgeText="HONORS & AWARDS"
        title="Achievements & Honors"
        subtitle="Competitive distinctions, national hackathon rankings, and project exhibition recognitions."
      />

      <div className="grid-2">
        {achievementsData.map((item) => (
          <Card
            key={item.id}
            as="article"
            header={
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                      {item.organizationOrEvent}
                    </span>
                    <h3 style={{ marginTop: '0.2rem' }}>{item.title}</h3>
                  </div>
                  <Badge>{item.year}</Badge>
                </div>

                <div style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                  <span className="wf-button wf-button-sm wf-button-primary" style={{ cursor: 'default' }}>
                    ★ {item.positionOrResult}
                  </span>
                </div>
              </div>
            }
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                  [ACHIEVEMENT VERIFIED]
                </span>
                {item.url && (
                  <Button href={item.url} isExternal variant="outline" size="sm">
                    [Proof / Link &rarr;]
                  </Button>
                )}
              </div>
            }
          >
            <p style={{ margin: '0.5rem 0' }}>{item.description}</p>

            {item.certificateOrImagePlaceholder && (
              <div style={{ marginTop: '0.75rem' }}>
                <Placeholder
                  label={item.certificateOrImagePlaceholder}
                  type="block"
                  height="60px"
                  hint="Award Proof / Trophy Slot"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

