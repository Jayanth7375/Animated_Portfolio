import React from 'react';
import Timeline, { JourneyItem } from '../ui/timeline';
import { SectionHeading } from '../common/SectionHeading';

const topJourneyMilestones: JourneyItem[] = [
  {
    id: 'school',
    year: '2020',
    month: 'March',
    content: 'Secondary School Education — strong foundation in mathematics, science, and computing fundamentals.',
  },
  {
    id: 'college',
    year: '2022',
    month: 'October',
    content: 'B.Tech in Artificial Intelligence & Data Science — deep dive into ML algorithms, deep learning, and data systems.',
  },
  {
    id: 'agentic-ai',
    year: '2024',
    month: 'July',
    content: 'Agentic AI Internship — autonomous LLM multi-agent architectures, tool calling, and prompt engineering.',
  },
];

const bottomJourneyMilestones: JourneyItem[] = [
  {
    id: 'hsc',
    year: '2022',
    month: 'May',
    content: 'Higher Secondary Education (HSC) — focused coursework in Computer Science, Mathematics, and Physics.',
  },
  {
    id: 'mern',
    year: '2023',
    month: 'August',
    content: 'MERN Stack Engineering Internship — built interactive full-stack web applications, REST APIs, and MongoDB pipelines.',
  },
  {
    id: 'pavakie',
    year: '2024',
    month: 'November',
    content: 'AI Internship at Pavakie — applied predictive analytics, ML modeling pipelines, and model evaluation.',
  },
];

export const JourneySection: React.FC = () => {
  return (
    <div id="journey" className="w-full pt-24 md:pt-32">
      {/* Clear gap from About section & prominent Section Heading */}
      <div className="section-container border-b-0 pb-10">
        <SectionHeading
          sectionIndex="01"
          badgeText="CHRONOLOGY"
          title="Journey Timeline"
          subtitle="A structural chronological progression through academic education, specialized training, and practical engineering milestones."
        />
        <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-400">
          <span className="inline-block animate-pulse text-white">●</span>
          <span>[ Scroll down to traverse milestones horizontally &rarr; ]</span>
        </div>
      </div>

      {/* Centered Pinned Interactive Timeline */}
      <Timeline
        title="Journey Timeline"
        periodLabel="2018 — Present"
        topData={topJourneyMilestones}
        bottomData={bottomJourneyMilestones}
        imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Jayanth Engineering and AI workspace"
        duration={1.2}
      />
    </div>
  );
};

export default JourneySection;
