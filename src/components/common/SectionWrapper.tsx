import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'article' | 'div';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  children,
  className = '',
  as: Component = 'section',
}) => {
  return (
    <Component id={id} className={`section-container ${className}`}>
      {children}
    </Component>
  );
};

