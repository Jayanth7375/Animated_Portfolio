import { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: 'ai-intern-pavakie',
    role: 'AI Intern',
    company: 'Pavakie',
    date: '2024 (Placeholder Duration)',
    location: '[Location / Remote Placeholder]',
    description: [
      'Developed and refined machine learning models for industry-specific data workflows.',
      'Constructed data ingestion, cleaning, and preprocessing pipelines for model training.',
      'Conducted model evaluation, hyperparameter tuning, and metric tracking.',
      'Collaborated with cross-functional teams to integrate model endpoints into product architectures.',
    ],
    technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Scikit-Learn', 'FastAPI'],
    link: '#pavakie-experience-link',
  },
  {
    id: 'agentic-ai-intern',
    role: 'Agentic AI Intern',
    company: '[Agentic AI Org / Company Placeholder]',
    date: '2024 (Placeholder Duration)',
    location: '[Remote / Onsite Placeholder]',
    description: [
      'Researched and implemented agentic LLM patterns including reasoning loops, self-reflection, and dynamic tool use.',
      'Designed vector search and RAG retrieval pipelines to enhance context reliability.',
      'Built benchmark tests to assess multi-agent communication efficiency and task completion rates.',
    ],
    technologies: ['Agentic Workflows', 'LangChain / LlamaIndex', 'Vector Databases', 'Prompt Design', 'Python'],
    link: '#agentic-ai-link',
  },
  {
    id: 'mern-stack-intern',
    role: 'MERN Stack Intern',
    company: '[Web Development Org Placeholder]',
    date: '2023 (Placeholder Duration)',
    location: '[Remote / Onsite Placeholder]',
    description: [
      'Built responsive frontend user interfaces using React.js and state management principles.',
      'Constructed robust backend RESTful microservices with Node.js and Express.',
      'Designed scalable database schemas and indexing strategies with MongoDB.',
      'Handled API testing, authentication flows, and frontend-to-backend integration.',
    ],
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'JWT'],
    link: '#mern-intern-link',
  },
];

