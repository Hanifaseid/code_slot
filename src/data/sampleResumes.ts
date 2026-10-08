import { ResumeData } from '../types/resume';

/**
 * Default baseline resume profile for CodeSlot Resume & CV Studio
 */
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full-Stack Software Engineer',
    email: 'alex.vance@codeslot.dev',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA (Remote)',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance-dev',
    github: 'github.com/alexvance',
    summary:
      'Product-minded Senior Full-Stack Engineer with 7+ years of experience architecting high-throughput distributed systems, scalable web applications, and resilient cloud architectures. Proven track record of reducing latency by 45% and leading cross-functional teams from ideation to production. Specialized in TypeScript, React, Next.js, Node.js, and cloud-native microservices.'
  },
  experience: [
    {
      id: 'exp-1',
      title: 'Staff Full-Stack Engineer',
      company: 'HyperScale Systems',
      location: 'San Francisco, CA (Remote)',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected and led the migration of a monolithic API into modular microservices using TypeScript, Node.js, and Kubernetes, serving 12M+ monthly active requests.',
        'Redesigned the core web application using Next.js 14, Tailwind CSS, and Server Components, cutting initial page load times by 48% and improving Core Web Vitals to 99th percentile.',
        'Engineered real-time collaboration canvas with WebSockets and Redis pub/sub, handling up to 25,000 concurrent state updates with sub-20ms latency.',
        'Mentored 6 software engineers through rigorous code reviews, automated CI/CD pipeline improvements, and architectural RFC reviews.'
      ]
    },
    {
      id: 'exp-2',
      title: 'Senior Frontend / Full-Stack Engineer',
      company: 'Starlight Cloud Inc.',
      location: 'New York, NY (Remote)',
      startDate: '2019',
      endDate: '2022',
      current: false,
      highlights: [
        'Built complex enterprise dashboard workflows using React, TypeScript, GraphQL, and TanStack Query, accelerating analytics query speeds by 3x.',
        'Implemented robust end-to-end and unit testing suites with Vitest, Playwright, and Mock Service Worker, elevating test coverage from 42% to 89%.',
        'Collaborated closely with Product and UX teams to design an accessible design system adopted by 14 internal product squads.',
        'Streamlined deployment workflows by introducing automated Docker multi-stage builds and GitHub Actions, cutting release cycles from 3 days to under 15 minutes.'
      ]
    },
    {
      id: 'exp-3',
      title: 'Software Engineer',
      company: 'Nexus Digital Labs',
      location: 'Austin, TX',
      startDate: '2017',
      endDate: '2019',
      current: false,
      highlights: [
        'Developed RESTful APIs and database schemas using Node.js, Express, and PostgreSQL with Prisma ORM.',
        'Created responsive mobile-first customer portals with React, Redux, and SCSS, supporting 450,000+ registered users.',
        'Optimized relational database queries and indices, resolving deadlocks and slashing p95 response times by 35%.'
      ]
    }
  ],
  skills: {
    technical: [
      'TypeScript',
      'JavaScript (ES6+)',
      'React',
      'Next.js',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'REST APIs',
      'Microservices'
    ],
    tools: [
      'Docker',
      'Kubernetes',
      'AWS (ECS, Lambda, S3, RDS)',
      'GitHub Actions',
      'Vite',
      'Tailwind CSS',
      'Playwright',
      'Git'
    ],
    soft: [
      'Distributed System Architecture',
      'Technical Leadership & Mentoring',
      'Agile / Scrum Sprint Planning',
      'Cross-Functional Alignment',
      'Code Review & Best Practices'
    ]
  },
  projects: [
    {
      id: 'proj-1',
      title: 'OmniStream — High-Throughput Event Streaming Gateway',
      description:
        'Fault-tolerant open-source event-streaming gateway written in TypeScript & Rust, benchmarked at 180,000 msg/sec with zero message loss.',
      technologies: ['TypeScript', 'Rust', 'Kafka', 'Redis', 'Docker'],
      link: 'https://github.com/codeslot/omnistream'
    },
    {
      id: 'proj-2',
      title: 'VectorCraft — RAG Pipeline & Embedding Visualizer',
      description:
        'Visual interactive playground to test chunking strategies, cosine similarity retrieval, and reranking algorithms against multiple vector databases.',
      technologies: ['Next.js', 'Python', 'FastAPI', 'Qdrant', 'Tailwind CSS'],
      link: 'https://vectorcraft.dev'
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Electrical Engineering and Computer Sciences (EECS)',
      fieldOfStudy: 'Computer Science',
      startYear: '2013',
      endYear: '2017',
      location: 'Berkeley, CA',
      details: 'Graduated Magna Cum Laude. Coursework in Distributed Systems, Algorithms, Database Systems.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      year: '2022'
    }
  ]
};
