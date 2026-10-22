import React from 'react';
import { JourneyItem } from '../../types/portfolio';
import { Badge } from './Badge';

interface TimelineProps {
  items: JourneyItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <ol className={`wf-timeline ${className}`} aria-label="Timeline of journey and milestones">
      {items.map((item) => (
        <li key={item.id} className="wf-timeline-item">
          <div className="wf-timeline-marker" aria-hidden="true" />
          
          <div className="wf-timeline-header">
            <h3>{item.title}</h3>
            <span className="wf-timeline-year">{item.year}</span>
          </div>

          <div className="wf-timeline-org">{item.organization}</div>

          <p style={{ marginTop: '0.4rem', marginBottom: '0.75rem' }}>{item.description}</p>

          {item.tags && item.tags.length > 0 && (
            <div className="wf-tags-list">
              {item.tags.map((tag, idx) => (
                <Badge key={idx}>{tag}</Badge>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

