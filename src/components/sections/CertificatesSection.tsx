import React from 'react';
import { certificatesData } from '../../data/certificates';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Placeholder } from '../common/Placeholder';
import { Badge } from '../common/Badge';

export const CertificatesSection: React.FC = () => {
  return (
    <SectionWrapper id="certificates">
      <SectionHeading
        sectionIndex="06"
        badgeText="CREDENTIALS"
        title="Certifications"
        subtitle="Verified professional certifications, industry qualifications, and hackathon credential awards."
      />

      <div className="grid-2">
        {certificatesData.map((cert) => (
          <Card
            key={cert.id}
            as="article"
            header={
              <div>
                <Placeholder
                  label={cert.imagePlaceholder}
                  type="image"
                  height="140px"
                  hint="Certificate Thumbnail / Preview Slot"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.75rem', gap: '0.5rem' }}>
                  <h3>{cert.title}</h3>
                  <Badge>{cert.year}</Badge>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--wf-text-secondary)', marginTop: '0.25rem' }}>
                  Issuing Org: {cert.issuingOrganization}
                </div>
              </div>
            }
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                  {cert.credentialId}
                </span>
                <Button
                  href={cert.certificateUrl}
                  isExternal
                  variant="outline"
                  size="sm"
                >
                  [Verify Credential &rarr;]
                </Button>
              </div>
            }
          >
            <p style={{ fontSize: '0.9rem', color: 'var(--wf-text-muted)' }}>
              [CERTIFICATE DESCRIPTION / SKILLS VALIDATION PLACEHOLDER: Covers fundamentals and applied execution in {cert.title}]
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

