import React from 'react';
import { personalData } from '../../data/personal';
import { navigationData } from '../../data/navigation';
import { socialLinksData } from '../../data/socialLinks';
import { SocialLink } from './SocialLink';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wf-footer" role="contentinfo">
      <div className="wf-footer-container">
        <div className="wf-footer-top">
          <div>
            <h3>{personalData.name}</h3>
            <p style={{ marginTop: '0.25rem', fontFamily: 'var(--wf-font-mono)', fontSize: '0.9rem' }}>
              {personalData.role} — [SHORT FOOTER TAGLINE PLACEHOLDER]
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--wf-text-muted)' }}>
              Location: {personalData.location} | Status: {personalData.status}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
              // CONNECT
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {socialLinksData.map((social) => (
                <SocialLink key={social.id} item={social} variant="button" />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--wf-font-mono)', color: 'var(--wf-text-muted)' }}>
            // SECTIONS
          </span>
          <ul className="wf-footer-nav" style={{ marginTop: '0.5rem' }}>
            {navigationData.map((item) => (
              <li key={item.id}>
                <a href={item.href} style={{ fontSize: '0.85rem' }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom copyright notice */}
        <div className="wf-footer-bottom">
          <span>
            &copy; {currentYear} {personalData.name}. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--wf-font-mono)' }}>
            [STRUCTURAL SKELETON &bull; MODULAR ARCHITECTURE]
          </span>
        </div>
      </div>
    </footer>
  );
};

