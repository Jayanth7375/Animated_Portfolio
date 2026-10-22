import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'muted';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
}) => {
  return <span className={`wf-badge ${className}`}>{children}</span>;
};

