import React from 'react';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'li';
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = '',
  onClick,
  as: Component = 'div',
}) => {
  return (
    <Component className={`wf-card ${className}`} onClick={onClick}>
      {header && <div className="wf-card-header">{header}</div>}
      <div className="wf-card-body">{children}</div>
      {footer && <div className="wf-card-footer">{footer}</div>}
    </Component>
  );
};

