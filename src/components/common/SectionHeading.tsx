import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  sectionIndex?: string; // e.g. "01"
  badgeText?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  sectionIndex,
  badgeText,
  actions,
  className = '',
}) => {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header-top">
        {sectionIndex && <span className="section-index-badge">// {sectionIndex}</span>}
        {badgeText && <span className="wf-badge">{badgeText}</span>}
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-description">{subtitle}</p>}
      {actions && <div style={{ marginTop: '0.75rem' }}>{actions}</div>}
    </div>
  );
};

