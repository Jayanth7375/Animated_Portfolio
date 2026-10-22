import { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  {
    id: 'programming-languages',
    name: 'Programming Languages',
    description: 'Foundational languages used for systems, scripting, and application engineering.',
    skills: [
      { name: 'Python', levelPlaceholder: '[Core / Proficient]' },
      { name: 'Java', levelPlaceholder: '[Certified / Proficient]' },
      { name: 'JavaScript (ES6+)', levelPlaceholder: '[Proficient]' },
      { name: 'TypeScript', levelPlaceholder: '[Working Knowledge]' },
      { name: 'C / C++', levelPlaceholder: '[Academic Foundations]' },
      { name: 'SQL', levelPlaceholder: '[Intermediate Certified]' },
    ],
  },
  {
    id: 'web-technologies',
    name: 'Web Technologies & Frameworks',
    description: 'Frontend and backend frameworks for scalable web application development.',
    skills: [
      { name: 'React.js', levelPlaceholder: '[Frontend]' },
      { name: 'Node.js', levelPlaceholder: '[Runtime]' },
      { name: 'Express.js', levelPlaceholder: '[Backend REST]' },
      { name: 'FastAPI', levelPlaceholder: '[AI Microservices]' },
      { name: 'HTML5 & Semantic Web', levelPlaceholder: '[Markup]' },
      { name: 'CSS3 / Flexbox / Grid', levelPlaceholder: '[Layouts]' },
      { name: 'RESTful API Architecture', levelPlaceholder: '[Integration]' },
    ],
  },
  {
    id: 'ai-ml-llm',
    name: 'AI / ML & LLM',
    description: 'Machine learning, deep learning, multimodal architectures, and LLM orchestration.',
    skills: [
      { name: 'Machine Learning Pipelines', levelPlaceholder: '[Supervised / Unsupervised]' },
      { name: 'Deep Learning', levelPlaceholder: '[Neural Architectures]' },
      { name: 'Generative AI & LLMs', levelPlaceholder: '[Prompt / RAG / Fine-tuning]' },
      { name: 'Agentic AI Frameworks', levelPlaceholder: '[Autonomous Agents / Tools]' },
      { name: 'Retrieval-Augmented Generation (RAG)', levelPlaceholder: '[Dense/Sparse Hybrid]' },
      { name: 'Multimodal Systems', levelPlaceholder: '[Vision + Text]' },
      { name: 'Model Evaluation & Metrics', levelPlaceholder: '[Validation]' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Vector Databases',
    description: 'Relational, document, and vector index databases for data and AI workloads.',
    skills: [
      { name: 'MongoDB', levelPlaceholder: '[NoSQL Document]' },
      { name: 'MySQL / PostgreSQL', levelPlaceholder: '[Relational RDBMS]' },
      { name: 'ChromaDB', levelPlaceholder: '[Vector Store]' },
      { name: 'FAISS', levelPlaceholder: '[Similarity Search]' },
      { name: 'Pinecone / Qdrant Placeholder', levelPlaceholder: '[Vector Index]' },
      { name: 'Redis Placeholder', levelPlaceholder: '[Caching]' },
    ],
  },
  {
    id: 'tools-platforms',
    name: 'Tools & Platforms',
    description: 'Development environment, version control, and containerization tooling.',
    skills: [
      { name: 'Git & GitHub', levelPlaceholder: '[Version Control]' },
      { name: 'Docker', levelPlaceholder: '[Containerization]' },
      { name: 'VS Code', levelPlaceholder: '[IDE]' },
      { name: 'Linux / Bash', levelPlaceholder: '[CLI & Shell]' },
      { name: 'Postman', levelPlaceholder: '[API Testing]' },
      { name: 'Jupyter Notebooks', levelPlaceholder: '[Data Exploration]' },
    ],
  },
  {
    id: 'libraries',
    name: 'Libraries',
    description: 'Specialized scientific, data manipulation, and machine learning packages.',
    skills: [
      { name: 'NumPy', levelPlaceholder: '[Numerical Arrays]' },
      { name: 'Pandas', levelPlaceholder: '[DataFrames]' },
      { name: 'Scikit-Learn', levelPlaceholder: '[Classical ML]' },
      { name: 'PyTorch / TensorFlow', levelPlaceholder: '[Deep Learning]' },
      { name: 'LangChain / LlamaIndex', levelPlaceholder: '[LLM Pipelines]' },
      { name: 'Matplotlib / Seaborn', levelPlaceholder: '[Data Visualization]' },
    ],
  },
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    description: 'Computer science principles and algorithmic reasoning.',
    skills: [
      { name: 'Data Structures & Algorithms (DSA)', levelPlaceholder: '[Core]' },
      { name: 'Object-Oriented Programming (OOP)', levelPlaceholder: '[Core]' },
      { name: 'Database Management Systems (DBMS)', levelPlaceholder: '[Core]' },
      { name: 'Operating Systems & Networking Basics', levelPlaceholder: '[Foundational]' },
      { name: 'Software Engineering Best Practices', levelPlaceholder: '[Clean Code]' },
    ],
  },
];

