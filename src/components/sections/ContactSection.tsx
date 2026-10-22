import React, { useState } from 'react';
import { contactData } from '../../data/contact';
import { socialLinksData } from '../../data/socialLinks';
import { SectionWrapper } from '../common/SectionWrapper';
import { SectionHeading } from '../common/SectionHeading';
import { SocialLink } from '../common/SocialLink';
import { Button } from '../common/Button';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structural skeleton handler - no backend integration yet
    setFormSubmitted(true);
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        sectionIndex="08"
        badgeText="COMMUNICATION"
        title="Get In Touch"
        subtitle="Have an inquiry, project collaboration, or want to discuss machine learning and full-stack engineering? Leave a message below."
      />

      <div className="grid-2">
        {/* Contact Form Structural Skeleton */}
        <div>
          <form className="wf-form" onSubmit={handleSubmit}>
            <div className="wf-form-group">
              <label htmlFor="contact-name" className="wf-form-label">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="wf-input"
                placeholder={contactData.formPlaceholders.name}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="wf-form-group">
              <label htmlFor="contact-email" className="wf-form-label">
                Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="wf-input"
                placeholder={contactData.formPlaceholders.email}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="wf-form-group">
              <label htmlFor="contact-message" className="wf-form-label">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                className="wf-textarea"
                placeholder={contactData.formPlaceholders.message}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" variant="primary">
              [{contactData.formPlaceholders.submitButton}]
            </Button>

            {formSubmitted && (
              <div
                style={{
                  padding: '0.75rem',
                  border: '1px dashed var(--wf-border-color)',
                  backgroundColor: 'var(--wf-bg-muted)',
                  fontFamily: 'var(--wf-font-mono)',
                  fontSize: '0.85rem',
                }}
              >
                [FORM DISPATCH SKELETON: Submission captured locally. Ready for email/API webhook hookup.]
              </div>
            )}
          </form>
        </div>

        {/* Contact Info & Direct Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="wf-card">
            <h4>Direct Coordinates</h4>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              <strong>Location:</strong> {contactData.location}
            </p>
            <p style={{ marginTop: '0.25rem' }}>
              <strong>Status:</strong> {contactData.availability}
            </p>
          </div>

          <div className="wf-card">
            <h4>Social & Code Profiles</h4>
            <p style={{ fontSize: '0.85rem', margin: '0.5rem 0 1rem 0' }}>
              Direct access to developer profiles and professional networks:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {socialLinksData.map((social) => (
                <SocialLink key={social.id} item={social} variant="button" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

