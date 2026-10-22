import React from 'react';
import { personalData } from '@/data/personal';
import { socialLinksData } from '@/data/socialLinks';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { Placeholder } from '@/components/common/Placeholder';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { SocialLink } from '@/components/common/SocialLink';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export const HeroSection: React.FC = () => {
  return (
    <div id="about">
      {/* Cinematic Parallax Hero Header */}
      <ParallaxComponent
        name="JAYANTH"
        title="PORTFOLIO"
        subtitle={personalData.role}
      />

      {/* Hero / About Profile Details */}
      <SectionWrapper id="about-details" as="div">
        <div className="hero-layout">
          <div>
            <div className="hero-meta-subtitle">
              // ARTIFICIAL INTELLIGENCE &bull; {personalData.role}
            </div>

            <h1>{personalData.name}</h1>

            <div className="hero-tagline-list">
              {personalData.subtitles.map((sub, idx) => (
                <Badge key={idx}>{sub}</Badge>
              ))}
            </div>

            <p style={{ fontSize: '1.15rem', maxWidth: '640px', marginTop: '1rem' }}>
              {personalData.shortBio}
            </p>

            <div className="hero-actions">
              <Button href={personalData.primaryCta.href} variant="primary">
                [{personalData.primaryCta.label}]
              </Button>
              <Button href={personalData.secondaryCta.href} variant="outline">
                [{personalData.secondaryCta.label}]
              </Button>
            </div>

            <div className="hero-socials">
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--wf-font-mono)', alignSelf: 'center' }}>
                Connect:
              </span>
              {socialLinksData.map((social) => (
                <SocialLink key={social.id} item={social} variant="badge" />
              ))}
            </div>
          </div>

          {/* Profile Image / Visual Wireframe Placeholder */}
          <div>
            <Placeholder
              label={personalData.avatarPlaceholder}
              type="avatar"
              hint="Wireframe Avatar Slot"
            />
            <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
                Status: {personalData.status}
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
