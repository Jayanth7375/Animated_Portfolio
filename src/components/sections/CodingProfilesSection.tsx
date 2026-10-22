import React from 'react';
import { codingProfilesData } from '../../data/codingProfiles';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Placeholder } from '../common/Placeholder';

export const CodingProfilesSection: React.FC = () => {
  return (
    <SectionWrapper id="coding-profiles">
      <SectionHeading
        sectionIndex="05"
        badgeText="PROBLEM SOLVING"
        title="Coding Profiles"
        subtitle="Algorithmic problem solving across competitive programming platforms and online evaluation trackers."
      />

      <div className="grid-3">
        {codingProfilesData.map((profile) => (
          <Card
            key={profile.id}
            as="article"
            header={
              <div>
                <Placeholder
                  label={profile.logoPlaceholder}
                  type="block"
                  height="48px"
                  hint={`Platform Logo: ${profile.platform}`}
                />
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3>{profile.platform}</h3>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                    @{profile.username}
                  </span>
                </div>
              </div>
            }
            footer={
              <Button
                href={profile.profileUrl}
                isExternal
                variant="primary"
                size="sm"
                style={{ width: '100%' }}
              >
                [{profile.ctaLabel} &rarr;]
              </Button>
            }
          >
            <div className="profile-stats-grid">
              {profile.statistics.map((stat, idx) => (
                <div key={idx} className="profile-stat-box">
                  <div className="profile-stat-label">{stat.label}</div>
                  <div className="profile-stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

