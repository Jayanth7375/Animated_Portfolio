import React from 'react';
import { SocialLinkItem } from '../../types/portfolio';

interface SocialLinkProps {
  item: SocialLinkItem;
  variant?: 'inline' | 'button' | 'badge';
  className?: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ item, variant = 'inline', className = '' }) => {
  const isMail = item.url.startsWith('mailto:');

  if (variant === 'button') {
    return (
      <a
        href={item.url}
        className={`wf-button wf-button-outline wf-button-sm ${className}`}
        {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={`${item.platform} link`}
      >
        {item.iconPlaceholder && <code>{item.iconPlaceholder}</code>}
        <span>{item.platform}</span>
      </a>
    );
  }

  return (
    <a
      href={item.url}
      className={`wf-badge ${className}`}
      style={{ textDecoration: 'none' }}
      {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`${item.platform} link`}
    >
      {item.iconPlaceholder && <code style={{ marginRight: '0.25rem' }}>{item.iconPlaceholder}</code>}
      <span>{item.platform}</span>
    </a>
  );
};

