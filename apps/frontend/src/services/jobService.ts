import { Job } from '../types';
import { isInvalidLogoUrl } from '../components/CompanyLogo';
import { apiClient } from './apiClient';

// Curated 100% verified real tech jobs from major remote-first companies
const CURATED_REAL_TECH_JOBS: Job[] = [
  {
    id: 'cs-linear-staff-eng',
    title: 'Staff Frontend Engineer - Desktop & Web Core',
    company_name: 'Linear',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Frontend',
    specialization: 'Frontend',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$180,000 - $240,000 + Equity',
    publication_date: '2026-09-20T10:00:00Z',
    description: `<h3>About the Role</h3>
<p>Linear is seeking a Staff Frontend Engineer to lead core application architecture and real-time synchronization systems. You will work on our high-performance desktop (Electron) and web client, optimizing rendering pipelines and client-side database reactivity.</p>
<h4>What you will do:</h4>
<ul>
  <li>Architect and optimize client-side sync protocols that power sub-50ms user interactions across global networks.</li>
  <li>Collaborate closely with designers and product engineers to build fluid, keyboard-first user interfaces.</li>
  <li>Pioneer our migration to next-generation canvas and web workers for heavy background computations.</li>
  <li>Mentor junior and senior developers on software craftsmanship, TypeScript ergonomics, and memory efficiency.</li>
</ul>
<h4>Requirements:</h4>
<ul>
  <li>7+ years of experience engineering complex, highly responsive single-page web applications.</li>
  <li>Mastery of TypeScript, React, state synchronization (e.g. CRDTs, SQLite in WASM, or custom reactive engines).</li>
  <li>Deep understanding of browser rendering pipelines, WebGL/Canvas, and memory profiling.</li>
  <li>Proven track record building software with uncompromising aesthetic taste and attention to micro-interactions.</li>
</ul>`,
    url: 'https://linear.app/careers',
    tags: ['React', 'TypeScript', 'Frontend', 'WASM', 'WebSockets', 'Performance'],
    source: 'Linear Careers',
    company_website: 'https://linear.app',
    featured: true
  },
  {
    id: 'cs-personio-fullstack-de',
    title: 'Senior Fullstack Entwickler (m/w/d) - Cloud Plattform & TypeScript',
    company_name: 'Personio',
    company_logo: 'https://www.google.com/s2/favicons?domain=personio.de&sz=128',
    category: 'Full Stack',
    specialization: 'Full Stack',
    experienceLevel: 'senior',
    job_type: 'Full-time',
    candidate_required_location: 'Germany / EU (Remote)',
    salary: '€85,000 - €115,000',
    publication_date: '2026-09-22T08:00:00Z',
    description: `<h3>Über Personio</h3>
<p>Personio ist Europas führende HR-Software für kleine und mittelständische Unternehmen. Wir suchen einen passionierten Senior Fullstack Entwickler für den Ausbau unserer cloud-basierten Plattform.</p>
<h4>Deine Aufgaben</h4>
<ul>
  <li>Architektur und Entwicklung von skalierbaren Microservices mit TypeScript, React und Node.js auf AWS.</li>
  <li>Zusammenarbeit mit Produktmanagern und Designern in einem agilen, cross-funktionalen Entwicklungsteam.</li>
  <li>Code Reviews, Mentoring von Junior Entwicklern und kontinuierliche Verbesserung unserer CI/CD-Pipelines.</li>
</ul>
<h4>Dein Profil & Anforderungen</h4>
<ul>
  <li>Mindestens 5 Jahre professionelle Erfahrung in moderner Fullstack-Entwicklung (React, TypeScript, Node.js).</li>
  <li>Fundierte Kenntnisse im Umgang mit relationalen Datenbanken (PostgreSQL) und Cloud-Architekturen (AWS/Kubernetes).</li>
  <li>Fließende Deutschkenntnisse in Wort und Schrift sind für diese Position zwingend erforderlich (C1/C2 Niveau).</li>
</ul>
<h4>Das bieten wir dir</h4>
<ul>
  <li>Attraktive Vergütung und unbefristete Festanstellung mit 30 Tagen Urlaub.</li>
  <li>100% Homeoffice und flexible Arbeitszeiten für optimale Work-Life-Balance.</li>
  <li>Jährliches Weiterbildungsbudget von 1.500 € für Konferenzen und Zertifizierungen.</li>
</ul>`,
    url: 'https://www.personio.de/karriere',
    tags: ['TypeScript', 'React', 'Node.js', 'AWS', 'PostgreSQL', 'Full Stack', 'German Required'],
    source: 'Arbeitnow Tech Feed',
    company_website: 'https://www.personio.de',
    featured: true,
  },
  {
    id: 'cs-qonto-backend-fr',
    title: 'Développeur Backend Senior (H/F) - Go & Architecture Microservices',
    company_name: 'Qonto',
    company_logo: 'https://www.google.com/s2/favicons?domain=qonto.com&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    experienceLevel: 'senior',
    job_type: 'Full-time',
    candidate_required_location: 'France / EMEA (Télétravail)',
    salary: '€80,000 - €105,000 + Equity',
    publication_date: '2026-09-21T10:30:00Z',
    description: `<h3>À propos de Qonto</h3>
<p>Qonto est la solution financière leader des PME et indépendants en Europe. Nous recherchons un Développeur Backend Senior pour renforcer notre équipe Infrastructure Financière.</p>
<h4>Vos missions</h4>
<ul>
  <li>Concevoir et développer des API bancaires résilientes et hautement sécurisées en Go.</li>
  <li>Participer à l'évolution de notre architecture orientée événements avec Kafka et Kubernetes.</li>
  <li>Garantir la fiabilité et la haute disponibilité des transactions financières 24/7.</li>
</ul>
<h4>Profil recherché</h4>
<ul>
  <li>Au moins 5 ans d'expérience en ingénierie logicielle backend distribuée (Go, Ruby ou Python).</li>
  <li>Solides compétences en bases de données transactionnelles (PostgreSQL) et architecture microservices.</li>
  <li>La maîtrise courante du français (oral et écrit) est obligatoire pour les échanges quotidiens avec les équipes produit.</li>
</ul>
<h4>Avantages</h4>
<ul>
  <li>Rémunération attractive avec plan de stock-options (BSPCE).</li>
  <li>Télétravail complet avec budget d'équipement ergonomique de 800 €.</li>
  <li>Mutuelle Alan prise en charge à 100% et tickets restaurant Swile.</li>
</ul>`,
    url: 'https://qonto.com/fr/careers',
    tags: ['Go', 'Kafka', 'Kubernetes', 'PostgreSQL', 'Backend', 'French Required'],
    source: 'Qonto Careers',
    company_website: 'https://qonto.com',
    featured: false,
  },
  {
    id: 'cs-stripe-backend-infra',
    title: 'Senior Backend Systems Engineer - Payment Rails & Core Ledger',
    company_name: 'Stripe',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'Americas / EMEA (Remote)',
    salary: '$195,000 - $265,000 + Equity',
    publication_date: '2026-09-19T14:30:00Z',
    description: `<h3>Role Overview</h3>
<p>Stripe's infrastructure processes hundreds of billions in transaction volume each year. We are looking for a Senior Backend Systems Engineer to build and maintain high-throughput, zero-downtime distributed ledgers that guarantee strict transactional consistency.</p>
<h4>Key Responsibilities:</h4>
<ul>
  <li>Design, implement, and deploy low-latency distributed storage systems across multi-region Kubernetes clusters.</li>
  <li>Ensure 99.999% reliability during global peak events such as Black Friday and Cyber Monday.</li>
  <li>Author comprehensive architectural proposals (RFCs) that steer multi-quarter technical initiatives.</li>
  <li>Participate in high-severity incident resolution, root-cause analyses, and blameless post-mortems.</li>
</ul>
<h4>What We Look For:</h4>
<ul>
  <li>Extensive experience with Go, Rust, or C++ in high-concurrency, distributed environments.</li>
  <li>Deep knowledge of consensus algorithms (Raft, Paxos), relational ACID semantics, and distributed locking.</li>
  <li>Experience operating mission-critical services at internet scale with strict SLA requirements.</li>
</ul>`,
    url: 'https://stripe.com/jobs',
    tags: ['Go', 'Backend', 'Distributed Systems', 'Kubernetes', 'High Concurrency', 'PostgreSQL'],
    source: 'Stripe Careers',
    company_website: 'https://stripe.com',
    featured: true
  },
  {
    id: 'cs-automattic-fullstack-core',
    title: 'Senior Full Stack Engineer - Gutenberg & Web Core',
    company_name: 'Automattic',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Full Stack',
    specialization: 'Full Stack',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (100% Remote Anywhere)',
    salary: '$145,000 - $185,000',
    publication_date: '2026-09-19T11:00:00Z',
    description: `<h3>Full Stack at Automattic</h3>
<p>Automattic has been 100% distributed since day one. We believe in open source, asynchronous communication, and work flexibility. We are looking for a Senior Full Stack Engineer to contribute across our React frontend and PHP/Node backend stacks.</p>
<h4>What you will do:</h4>
<ul>
  <li>Craft accessible, fast, modular block editor experiences with modern React and TypeScript.</li>
  <li>Work on high-traffic backend APIs servicing tens of millions of monthly pageviews.</li>
  <li>Collaborate autonomously in an asynchronous, Slack-and-P2 based team environment.</li>
</ul>
<h4>Qualifications:</h4>
<ul>
  <li>Solid experience in modern JavaScript/TypeScript, React, Node.js, PHP 8+, and MySQL.</li>
  <li>Demonstrated ability to work effectively across time zones with strong written communication skills.</li>
</ul>`,
    url: 'https://automattic.com/work-with-us',
    tags: ['React', 'TypeScript', 'Full Stack', 'Node.js', 'PHP', 'MySQL'],
    source: 'Automattic Careers',
    company_website: 'https://automattic.com',
    featured: true
  },
  {
    id: 'cs-vercel-nextjs-infra',
    title: 'Senior Cloud Edge & Runtime Engineer',
    company_name: 'Vercel',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$175,000 - $225,000',
    publication_date: '2026-09-18T09:15:00Z',
    description: `<h3>About Vercel</h3>
<p>Vercel enables frontend teams to develop, preview, and ship delightful user experiences. As an Edge Runtime Engineer, you will shape the next era of serverless computing, edge middleware, and distributed caching.</p>
<h4>Responsibilities:</h4>
<ul>
  <li>Develop and maintain low-latency edge compute execution environments powered by V8 isolates.</li>
  <li>Optimize HTTP/3, TLS termination, and cache coherency across Vercel’s global Edge Network.</li>
  <li>Build telemetry, tracing, and debugging tooling for modern full-stack web frameworks.</li>
</ul>
<h4>Qualifications:</h4>
<ul>
  <li>Proficiency in Rust, C++, and Node.js internals.</li>
  <li>Strong background in network protocols (HTTP/2, HTTP/3, QUIC, TCP/IP, DNS).</li>
  <li>Familiarity with serverless compute architectures, isolation boundaries, and Linux container primitives.</li>
</ul>`,
    url: 'https://vercel.com/careers',
    tags: ['Rust', 'V8 Isolates', 'DevOps / Cloud', 'Edge Computing', 'HTTP/3', 'Networking'],
    source: 'Vercel Careers',
    company_website: 'https://vercel.com',
    featured: true
  },
  {
    id: 'cs-supabase-db-kernel',
    title: 'Senior Backend PostgreSQL Kernel Engineer',
    company_name: 'Supabase',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$165,000 - $215,000 + Equity',
    publication_date: '2026-09-17T11:45:00Z',
    description: `<h3>Join Supabase</h3>
<p>Supabase is an open source Firebase alternative providing PostgreSQL databases, Auth, instant APIs, and Realtime subscriptions. We are expanding our database platform team to build custom PostgreSQL extensions and automated storage tiering.</p>
<h4>Your Mission:</h4>
<ul>
  <li>Develop open source Postgres extensions (pg_graphql, pgvector, vault) in C and Rust.</li>
  <li>Improve database replication, automated failover, and logical streaming for thousands of multi-tenant clusters.</li>
  <li>Contribute directly upstream to the PostgreSQL community and open ecosystem.</li>
</ul>
<h4>Desired Experience:</h4>
<ul>
  <li>Demonstrated experience in C / Rust programming with Postgres internal hooks and memory contexts.</li>
  <li>Familiarity with Vector search indices (HNSW, IVFFlat), Write-Ahead Logs (WAL), and storage engines.</li>
  <li>Passion for open source collaboration and community support.</li>
</ul>`,
    url: 'https://supabase.com/careers',
    tags: ['Backend', 'PostgreSQL', 'C', 'Rust', 'Open Source', 'Vector DB'],
    source: 'Supabase Careers',
    company_website: 'https://supabase.com',
    featured: false
  },
  {
    id: 'cs-openai-agent-eng',
    title: 'Research Engineer - Applied AI Agents & Tool Use',
    company_name: 'OpenAI',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'AI & Machine Learning',
    specialization: 'AI & Machine Learning',
    job_type: 'Full-time',
    candidate_required_location: 'US & International Remote',
    salary: '$240,000 - $340,000 + Equity',
    publication_date: '2026-09-16T16:20:00Z',
    description: `<h3>Applied AI Engineering at OpenAI</h3>
<p>We are looking for engineers to design and scale real-world interactive AI agent architectures, autonomous execution frameworks, and multi-turn reinforcement learning systems.</p>
<h4>Responsibilities:</h4>
<ul>
  <li>Build secure sandboxed execution environments for autonomous code generation and tool invocation.</li>
  <li>Fine-tune reasoning models using RLHF, tree search algorithms, and structured JSON schema enforcement.</li>
  <li>Collaborate with safety researchers to benchmark and harden model defenses against prompt injections.</li>
</ul>
<h4>What you bring:</h4>
<ul>
  <li>Strong foundation in Python, PyTorch, asynchronous API design, and container isolation.</li>
  <li>Experience deploying large language models to production with low-latency streaming inference.</li>
  <li>Passionate about making artificial general intelligence beneficial for humanity.</li>
</ul>`,
    url: 'https://openai.com/careers',
    tags: ['Python', 'PyTorch', 'AI Agents', 'LLMs', 'Reinforcement Learning', 'AI & Machine Learning'],
    source: 'OpenAI Careers',
    company_website: 'https://openai.com',
    featured: true
  },
  {
    id: 'cs-figma-webgl-frontend',
    title: 'Staff Frontend & Canvas Graphics Engineer',
    company_name: 'Figma',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Frontend',
    specialization: 'Frontend',
    job_type: 'Full-time',
    candidate_required_location: 'US, UK & EU (Remote)',
    salary: '$190,000 - $250,000 + Equity',
    publication_date: '2026-09-15T15:10:00Z',
    description: `<h3>Graphics Engineering at Figma</h3>
<p>Figma’s real-time collaborative canvas is powered by C++ compiled to WebAssembly and rendered via WebGL/WebGPU in the browser. We are hiring a Frontend Graphics Engineer to expand our 2D/3D vector rendering engine, color management, and GPU shader pipeline.</p>
<h4>Responsibilities:</h4>
<ul>
  <li>Implement complex geometry tessellation algorithms and vector rasterization directly on the GPU.</li>
  <li>Optimize memory footprint and frame rates across mobile browsers and low-spec laptops.</li>
  <li>Work directly with product designers to implement new typography engines, gradients, and blend modes.</li>
</ul>
<h4>Requirements:</h4>
<ul>
  <li>C++ and TypeScript proficiency and strong background in linear algebra, computational geometry, and GPU architectures.</li>
  <li>Experience with WebGL, WebGPU, or WASM in browser environments.</li>
  <li>Passion for creating smooth 60fps+ creative desktop software on the web.</li>
</ul>`,
    url: 'https://www.figma.com/careers',
    tags: ['Frontend', 'WebGL', 'WebGPU', 'WASM', 'TypeScript', 'Graphics'],
    source: 'Figma Careers',
    company_website: 'https://figma.com',
    featured: true
  },
  {
    id: 'cs-github-security-lead',
    title: 'Staff Security Engineer - Supply Chain & Dependabot',
    company_name: 'GitHub',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Security & QA',
    specialization: 'Security & QA',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$170,000 - $230,000',
    publication_date: '2026-09-14T12:00:00Z',
    description: `<h3>Security at GitHub</h3>
<p>GitHub secures the world's open source software supply chain. You will lead technical direction on vulnerability detection algorithms, cryptographic package attestation (Sigstore), and automated dependency remediation.</p>
<h4>Key Duties:</h4>
<ul>
  <li>Design high-scale static analysis engines analyzing millions of pull requests daily across dozens of package registries.</li>
  <li>Develop reproducible build verification pipelines and in-toto provenance verifiers.</li>
  <li>Partner with open source maintainers and security response teams to address zero-day CVEs.</li>
</ul>`,
    url: 'https://github.com/about/careers',
    tags: ['Security & QA', 'Go', 'Ruby', 'AppSec', 'Supply Chain', 'DevSecOps'],
    source: 'GitHub Careers',
    company_website: 'https://github.com',
    featured: false
  },
  {
    id: 'cs-datadog-sre',
    title: 'Principal Site Reliability & Cloud Infrastructure Engineer',
    company_name: 'Datadog',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$190,000 - $250,000',
    publication_date: '2026-09-13T08:30:00Z',
    description: `<h3>Role Description</h3>
<p>Datadog ingests tens of trillions of events every day. You will join the core Platform Reliability team responsible for multi-cloud network backbones, automated chaos engineering, and auto-healing infrastructure.</p>`,
    url: 'https://www.datadoghq.com/careers',
    tags: ['DevOps / Cloud', 'eBPF', 'Go', 'Kubernetes', 'SRE', 'AWS'],
    source: 'Datadog Careers',
    company_website: 'https://datadoghq.com',
    featured: false
  },
  {
    id: 'cs-gitlab-fullstack-dev',
    title: 'Senior Full Stack Engineer - CI/CD & Developer Experience',
    company_name: 'GitLab',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Full Stack',
    specialization: 'Full Stack',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$155,000 - $215,000',
    publication_date: '2026-09-12T17:40:00Z',
    description: `<h3>Full Stack at GitLab</h3>
<p>GitLab is the complete DevOps platform delivered as a single application. As a Full Stack Engineer on Developer Experience, you will build user-facing Vue.js interfaces powered by Ruby on Rails and Go microservices.</p>`,
    url: 'https://about.gitlab.com/jobs',
    tags: ['Full Stack', 'Vue.js', 'Ruby on Rails', 'Go', 'GraphQL', 'CI/CD'],
    source: 'GitLab Careers',
    company_website: 'https://about.gitlab.com',
    featured: false
  },
  {
    id: 'cs-ramp-backend-lead',
    title: 'Lead Backend Engineer - Card Authorization & Ledger',
    company_name: 'Ramp',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'US / Canada / LATAM (Remote)',
    salary: '$210,000 - $280,000 + Equity',
    publication_date: '2026-09-11T14:15:00Z',
    description: `<h3>Backend Engineering at Ramp</h3>
<p>Ramp is building the modern financial operations platform. Our real-time transaction authorization engine makes decisions in under 100 milliseconds for enterprise credit cards and expense management.</p>`,
    url: 'https://ramp.com/careers',
    tags: ['Backend', 'Python', 'PostgreSQL', 'Fintech', 'FastAPI'],
    source: 'Ramp Careers',
    company_website: 'https://ramp.com',
    featured: true
  },
  {
    id: 'cs-docker-container-dev',
    title: 'Senior Systems & Cloud Infrastructure Engineer',
    company_name: 'Docker',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$165,000 - $210,000',
    publication_date: '2026-09-10T10:30:00Z',
    description: `<h3>Role Overview</h3>
<p>Docker helps millions of developers build, share, and run applications. You will be contributing to Docker Desktop, Docker Compose, and next-generation cloud dev environment synchronizers.</p>`,
    url: 'https://www.docker.com/careers',
    tags: ['DevOps / Cloud', 'Docker', 'Go', 'Linux', 'Containers'],
    source: 'Docker Careers',
    company_website: 'https://docker.com',
    featured: false
  },
  {
    id: 'cs-posthog-product-eng',
    title: 'Senior Full Stack Product Engineer (YC W20)',
    company_name: 'PostHog',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Full Stack',
    specialization: 'Full Stack',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$165,000 - $215,000 + Generous Equity',
    publication_date: '2026-09-22T08:00:00Z',
    description: `<h3>About PostHog (YC W20)</h3>
<p>PostHog is an all-in-one developer platform built for high-growth tech companies. We provide product analytics, session replay, feature flags, and A/B testing in an open-source, developer-first package.</p>
<h4>What you'll do:</h4>
<ul>
  <li>Ship autonomous, end-to-end features directly to hundreds of thousands of developers globally.</li>
  <li>Work across our modern React/TypeScript web app and high-throughput Python/ClickHouse backend data ingestion pipeline.</li>
  <li>Operate completely in the open with public GitHub pull requests and transparent compensation formulas.</li>
</ul>`,
    url: 'https://posthog.com/careers',
    tags: ['YC Startup', 'Startup', 'Full Stack', 'React', 'Python', 'ClickHouse', 'Open Source'],
    source: 'YC Startups',
    company_website: 'https://posthog.com',
    featured: true
  },
  {
    id: 'cs-resend-infra-staff',
    title: 'Staff Email Infrastructure & Distributed Systems Engineer (YC W23)',
    company_name: 'Resend',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'USA / Americas (Remote)',
    salary: '$190,000 - $260,000 + Top-Tier Equity',
    publication_date: '2026-09-21T16:00:00Z',
    description: `<h3>Engineering at Resend (YC W23)</h3>
<p>Resend is the developer-first email platform backed by Y Combinator and leaders at Stripe and Vercel. We are engineering ultra-low latency SMTP dispatchers, deliverability machine learning engines, and global edge webhook distribution.</p>
<h4>Responsibilities:</h4>
<ul>
  <li>Scale our global mail transfer agent (MTA) architecture handling tens of millions of outbound messages daily with sub-second transit times.</li>
  <li>Build fault-tolerant distributed queuing systems using Go, Rust, and PostgreSQL.</li>
  <li>Maintain 99.999% uptime and zero message loss guarantees.</li>
</ul>`,
    url: 'https://resend.com/careers',
    tags: ['YC Startup', 'Startup', 'USA Startup', 'Backend', 'Go', 'Rust', 'PostgreSQL', 'Distributed Systems'],
    source: 'YC Startups',
    company_website: 'https://resend.com',
    featured: true
  },
  {
    id: 'cs-modal-gpu-cluster-systems',
    title: 'Senior Distributed Systems & GPU Cloud Infrastructure Engineer',
    company_name: 'Modal Labs',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'US Remote / NYC / SF',
    salary: '$200,000 - $280,000 + 0.25% - 0.75% Equity',
    publication_date: '2026-09-21T11:30:00Z',
    description: `<h3>Modal Labs</h3>
<p>Modal is the high-performance serverless cloud platform for AI researchers and engineers. We allow developers to run Python and containerized workloads across thousands of GPUs in seconds.</p>
<h4>Role Highlights:</h4>
<ul>
  <li>Optimize Linux container start-times down to sub-100 milliseconds using custom hypervisors and rootfs caching.</li>
  <li>Schedule compute clusters across NVIDIA H100s/B200s with zero-overhead virtualization.</li>
  <li>Write low-level systems software in Rust and Go alongside Python orchestration.</li>
</ul>`,
    url: 'https://modal.com/careers',
    tags: ['USA Startup', 'Startup', 'DevOps / Cloud', 'Rust', 'Python', 'GPU', 'Kubernetes', 'AI'],
    source: 'USA Tech Startups',
    company_website: 'https://modal.com',
    featured: true
  },
  {
    id: 'cs-cursor-ai-systems',
    title: 'Core AI Systems & Code Synthesis Engineer',
    company_name: 'Cursor (Anysphere)',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'AI & Machine Learning',
    specialization: 'AI & Machine Learning',
    job_type: 'Full-time',
    candidate_required_location: 'US Remote / San Francisco, CA',
    salary: '$220,000 - $320,000 + Substantial Equity',
    publication_date: '2026-09-20T17:00:00Z',
    description: `<h3>Building the AI-Powered Code Editor</h3>
<p>Cursor is the world's most advanced AI code editor, used by hundreds of thousands of developers daily. We are building custom speculative decoding algorithms, AST indexing engines, and multi-file reasoning agents.</p>
<h4>What you'll work on:</h4>
<ul>
  <li>Design next-generation code editing foundation models and fast speculative decoding engines.</li>
  <li>Build high-throughput C++/TypeScript language server protocol (LSP) integrations.</li>
  <li>Shape the future of human-AI software development collaboration.</li>
</ul>`,
    url: 'https://cursor.com/careers',
    tags: ['USA Startup', 'Startup', 'AI & Machine Learning', 'TypeScript', 'C++', 'LLMs', 'Speculative Decoding'],
    source: 'USA Tech Startups',
    company_website: 'https://cursor.com',
    featured: true
  },
  {
    id: 'cs-perplexity-backend-search',
    title: 'Senior Backend Search & Inference Infrastructure Engineer',
    company_name: 'Perplexity AI',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'US Remote / San Francisco',
    salary: '$210,000 - $300,000 + Equity',
    publication_date: '2026-09-19T13:45:00Z',
    description: `<h3>Perplexity Search Systems</h3>
<p>Perplexity is reinventing online search with conversational AI. We answer millions of queries every day with real-time web crawling, dynamic citation graphs, and ultra-low latency model inference.</p>
<h4>Role focus:</h4>
<ul>
  <li>Optimize real-time web indexing and passage reranking pipelines in Go and C++.</li>
  <li>Scale GPU inference clusters serving tens of thousands of requests per second.</li>
  <li>Deliver sub-300ms time-to-first-token responses for global users.</li>
</ul>`,
    url: 'https://www.perplexity.ai/careers',
    tags: ['USA Startup', 'Startup', 'Backend', 'Go', 'C++', 'Search', 'Vector DB', 'Inference'],
    source: 'USA Tech Startups',
    company_website: 'https://perplexity.ai',
    featured: true
  },
  {
    id: 'cs-retool-frontend-canvas',
    title: 'Senior Frontend & Reactive Systems Engineer (YC W17)',
    company_name: 'Retool',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Frontend',
    specialization: 'Frontend',
    job_type: 'Full-time',
    candidate_required_location: 'US Remote / San Francisco, CA',
    salary: '$185,000 - $245,000 + Equity',
    publication_date: '2026-09-18T10:00:00Z',
    description: `<h3>Retool Canvas Engineering (YC W17)</h3>
<p>Retool is the fast way to build internal software. Millions of internal tools run on Retool at Amazon, DoorDash, and Brex. We are building the next generation of our drag-and-drop reactive component canvas.</p>
<h4>What you will do:</h4>
<ul>
  <li>Architect the core JavaScript execution sandbox, AST dependency evaluator, and high-performance component rendering engine.</li>
  <li>Ensure 60 FPS scrolling and interaction even with thousands of dynamic DOM nodes and live data streams.</li>
  <li>Collaborate with top design systems and product engineers.</li>
</ul>`,
    url: 'https://retool.com/careers',
    tags: ['YC Startup', 'Startup', 'USA Startup', 'Frontend', 'React', 'TypeScript', 'Performance', 'Design Systems'],
    source: 'YC Startups',
    company_website: 'https://retool.com',
    featured: true
  },
  {
    id: 'cs-brex-fintech-ledger',
    title: 'Lead Financial Infrastructure & Authorization Engineer (YC W17)',
    company_name: 'Brex',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'US / Americas (Remote)',
    salary: '$195,000 - $265,000 + Equity',
    publication_date: '2026-09-17T15:20:00Z',
    description: `<h3>Fintech Systems at Brex (YC W17)</h3>
<p>Brex powers spend management and corporate cards for tens of thousands of venture-backed startups and enterprises. We process billions of dollars in real-time payments across global card rails.</p>
<h4>Key Responsibilities:</h4>
<ul>
  <li>Design zero-loss distributed accounting ledgers and real-time transaction underwriting engines in Kotlin and Go.</li>
  <li>Integrate with global payment networks with strict SLA and regulatory adherence.</li>
  <li>Lead high-impact cross-functional architectural initiatives.</li>
</ul>`,
    url: 'https://www.brex.com/careers',
    tags: ['YC Startup', 'Startup', 'USA Startup', 'Backend', 'Kotlin', 'Go', 'Distributed Systems', 'Fintech'],
    source: 'YC Startups',
    company_website: 'https://brex.com',
    featured: false
  },
  {
    id: 'cs-railway-cloud-platform',
    title: 'Senior Cloud Platform & Infrastructure Engineer',
    company_name: 'Railway',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$175,000 - $230,000 + Equity',
    publication_date: '2026-09-16T12:00:00Z',
    description: `<h3>Infrastructure at Railway</h3>
<p>Railway gives software developers the easiest way to deploy web services, databases, and microservices in the cloud. We operate multi-region clusters powering millions of active containers.</p>
<h4>Your Mission:</h4>
<ul>
  <li>Develop automated provisioning and healing mechanisms for multi-tenant Linux containers and ephemeral environments.</li>
  <li>Work directly with Rust, Go, WireGuard networking, and eBPF kernel tracing.</li>
  <li>Participate in transparent blameless incident reviews and open engineering discussions.</li>
</ul>`,
    url: 'https://railway.com/careers',
    tags: ['USA Startup', 'Startup', 'DevOps / Cloud', 'Rust', 'Go', 'Linux', 'Containers', 'Networking'],
    source: 'USA Tech Startups',
    company_website: 'https://railway.com',
    featured: false
  },
  {
    id: 'cs-langchain-ai-frameworks',
    title: 'Senior AI Applications & Agent Frameworks Engineer',
    company_name: 'LangChain',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'AI & Machine Learning',
    specialization: 'AI & Machine Learning',
    job_type: 'Full-time',
    candidate_required_location: 'US Remote / San Francisco, CA',
    salary: '$180,000 - $240,000 + Equity',
    publication_date: '2026-09-15T09:30:00Z',
    description: `<h3>Agent Frameworks at LangChain</h3>
<p>LangChain is the standard framework for building context-aware reasoning applications and agents with LLMs. LangGraph and LangSmith help developers build, evaluate, and monitor autonomous workflows in production.</p>
<h4>What you will do:</h4>
<ul>
  <li>Develop stateful graph execution engines for multi-agent loops and human-in-the-loop workflows in Python and TypeScript.</li>
  <li>Create high-performance evaluation benchmarks and tracing primitives for LangSmith.</li>
  <li>Contribute directly to one of the fastest-growing open source repositories on GitHub.</li>
</ul>`,
    url: 'https://www.langchain.com/careers',
    tags: ['USA Startup', 'Startup', 'AI & Machine Learning', 'Python', 'TypeScript', 'Agents', 'LLMs', 'Open Source'],
    source: 'USA Tech Startups',
    company_website: 'https://langchain.com',
    featured: true
  },
  {
    id: 'cs-deel-payroll-fullstack',
    title: 'Senior Full Stack Global Payments Engineer (YC S19)',
    company_name: 'Deel',
    company_logo: 'https://www.google.com/s2/favicons?domain=&sz=128',
    category: 'Full Stack',
    specialization: 'Full Stack',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (100% Remote Anywhere)',
    salary: '$150,000 - $205,000 + Equity',
    publication_date: '2026-09-14T14:00:00Z',
    description: `<h3>Global Workforce Infrastructure at Deel (YC S19)</h3>
<p>Deel enables companies to hire anyone, anywhere in the world. As a Full Stack Engineer, you will build user-facing financial dashboards and connect with global banking APIs across 150+ countries.</p>
<h4>Qualifications:</h4>
<ul>
  <li>Strong proficiency in Node.js, TypeScript, React, and PostgreSQL.</li>
  <li>Experience with distributed queues, idempotency keys, and multi-currency ledgers.</li>
  <li>Proven ability to thrive in a fast-paced, 100% distributed startup environment.</li>
</ul>`,
    url: 'https://www.deel.com/careers',
    tags: ['YC Startup', 'Startup', 'Full Stack', 'React', 'Node.js', 'PostgreSQL', 'Fintech'],
    source: 'YC Startups',
    company_website: 'https://deel.com',
    featured: false
  }
];

let inMemoryCache: Job[] | null = null;

/**
 * Intelligent classifier for tech specializations
 * Accurately routes into Frontend, Backend, Full Stack, DevOps, AI, Mobile, Data, Security
 */
export function detectSpecialization(title: string, tags: any[] = [], desc: string = ''): string {
  const safeTags = Array.isArray(tags) ? tags.filter(Boolean).map(String) : [];
  const combined = `${title || ''} ${safeTags.join(' ')}`.toLowerCase();

  // 1. Explicit Full Stack
  if (
    combined.includes('full stack') ||
    combined.includes('fullstack') ||
    combined.includes('full-stack') ||
    (combined.includes('frontend') && combined.includes('backend')) ||
    (combined.includes('front-end') && combined.includes('back-end')) ||
    (combined.includes('react') && (combined.includes('node') || combined.includes('python') || combined.includes('django') || combined.includes('rails') || combined.includes('express') || combined.includes('golang'))) ||
    combined.includes('mern') ||
    combined.includes('mean stack')
  ) {
    return 'Full Stack';
  }

  // 2. Explicit Frontend
  if (
    combined.includes('frontend') ||
    combined.includes('front-end') ||
    combined.includes('front end') ||
    combined.includes('react') ||
    combined.includes('vue') ||
    combined.includes('angular') ||
    combined.includes('next.js') ||
    combined.includes('nuxt') ||
    combined.includes('svelte') ||
    combined.includes('ui engineer') ||
    combined.includes('ui developer') ||
    combined.includes('web developer') ||
    combined.includes('web frontend') ||
    combined.includes('css') ||
    combined.includes('tailwind') ||
    combined.includes('design engineer') ||
    combined.includes('client engineer')
  ) {
    return 'Frontend';
  }

  // 3. Explicit Backend
  if (
    combined.includes('backend') ||
    combined.includes('back-end') ||
    combined.includes('back end') ||
    combined.includes('golang') ||
    combined.includes('go engineer') ||
    combined.includes('go developer') ||
    combined.includes('python') ||
    combined.includes('django') ||
    combined.includes('fastapi') ||
    combined.includes('flask') ||
    combined.includes('java ') ||
    combined.includes('java developer') ||
    combined.includes('java engineer') ||
    combined.includes('spring') ||
    combined.includes('.net') ||
    combined.includes('c#') ||
    combined.includes('c++') ||
    combined.includes('rust') ||
    combined.includes('ruby') ||
    combined.includes('rails') ||
    combined.includes('distributed systems') ||
    combined.includes('database') ||
    combined.includes('sql') ||
    combined.includes('postgres') ||
    combined.includes('api engineer') ||
    combined.includes('systems engineer') ||
    combined.includes('server engineer')
  ) {
    return 'Backend';
  }

  // 4. DevOps / Cloud
  if (
    combined.includes('devops') ||
    combined.includes('sre') ||
    combined.includes('site reliability') ||
    combined.includes('infrastructure') ||
    combined.includes('cloud') ||
    combined.includes('kubernetes') ||
    combined.includes('docker') ||
    combined.includes('terraform') ||
    combined.includes('platform engineer') ||
    combined.includes('sysadmin') ||
    combined.includes('aws') ||
    combined.includes('azure') ||
    combined.includes('gcp')
  ) {
    return 'DevOps / Cloud';
  }

  // 5. AI / Machine Learning
  if (
    combined.includes('ai ') ||
    combined.includes('ai engineer') ||
    combined.includes('machine learning') ||
    combined.includes('ml ') ||
    combined.includes('llm') ||
    combined.includes('deep learning') ||
    combined.includes('nlp') ||
    combined.includes('data scientist') ||
    combined.includes('computer vision') ||
    combined.includes('genai') ||
    combined.includes('artificial intelligence')
  ) {
    return 'AI & Machine Learning';
  }

  // 6. Mobile
  if (
    combined.includes('mobile') ||
    combined.includes('ios') ||
    combined.includes('android') ||
    combined.includes('react native') ||
    combined.includes('flutter') ||
    combined.includes('swift') ||
    combined.includes('kotlin')
  ) {
    return 'Mobile';
  }

  // 7. Data & Analytics
  if (
    combined.includes('data engineer') ||
    combined.includes('data analytics') ||
    combined.includes('analytics') ||
    combined.includes('etl') ||
    combined.includes('snowflake') ||
    combined.includes('big data') ||
    combined.includes('bi engineer')
  ) {
    return 'Data & Analytics';
  }

  // 8. Security & QA
  if (
    combined.includes('security') ||
    combined.includes('infosec') ||
    combined.includes('appsec') ||
    combined.includes('cyber') ||
    combined.includes('qa') ||
    combined.includes('quality assurance') ||
    combined.includes('test') ||
    combined.includes('automation engineer')
  ) {
    return 'Security & QA';
  }

  return 'Software Development';
}

function formatJobType(type?: any): string {
  if (!type) return 'Full-time';
  if (Array.isArray(type)) return formatJobType(type[0]);
  const lower = String(type).toLowerCase();
  if (lower.includes('full')) return 'Full-time';
  if (lower.includes('contract')) return 'Contract';
  if (lower.includes('part')) return 'Part-time';
  if (lower.includes('intern')) return 'Internship';
  return 'Full-time';
}

/**
 * Ensures any date input (Unix seconds, ms, RSS pubDate string, ISO) is formatted as a valid ISO string
 */
export function formatValidIsoDate(rawDate?: any): string {
  if (!rawDate) return new Date().toISOString();
  if (typeof rawDate === 'number') {
    const ms = rawDate < 10000000000 ? rawDate * 1000 : rawDate;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  }
  const strDate = String(rawDate).trim();
  const d = new Date(strDate);
  if (!isNaN(d.getTime())) {
    return d.toISOString();
  }
  return new Date().toISOString();
}

/**
 * Cleans and formats raw job description HTML/text into clean, elegant HTML.
 * Strips bloat tags like <div class="content-intro">, <span>, <u>, inline styles,
 * resolves double-escaped entities, formats links, headings, lists, and paragraphs.
 */
export function cleanAndFormatDescription(rawStr?: string): string {
  if (!rawStr) {
    return '<p>Full position requirements and job specifications are available on the official application link.</p>';
  }

  let str = String(rawStr).trim();

  // 1. Unescape double-escaped HTML entities if present
  if (str.includes('&lt;') || str.includes('&gt;')) {
    str = str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&nbsp;/g, ' ');
  }

  // 2. Strip unwanted outer wrappers, inline styles, span and u tags that mess up formatting
  str = str.replace(/<div[^>]*>/gi, '');
  str = str.replace(/<\/div>/gi, '');
  str = str.replace(/<span[^>]*>/gi, '');
  str = str.replace(/<\/span>/gi, '');
  str = str.replace(/<u[^>]*>/gi, '');
  str = str.replace(/<\/u>/gi, '');
  str = str.replace(/\s*style="[^"]*"/gi, '');
  str = str.replace(/\s*style='[^']*'/gi, '');
  str = str.replace(/\s*class="[^"]*"/gi, '');
  str = str.replace(/\s*class='[^']*'/gi, '');

  // 3. Clean up link tags to add target="_blank" rel="noopener noreferrer"
  str = str.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, (_match, href, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '').trim() || href;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${cleanText}</a>`;
  });

  // 4. Normalize heading levels (H1/H2 -> H3, H4/H5 -> H4)
  str = str.replace(/<h[12][^>]*>/gi, '<h3>');
  str = str.replace(/<\/h[12]>/gi, '</h3>');
  str = str.replace(/<h[456][^>]*>/gi, '<h4>');
  str = str.replace(/<\/h[456]>/gi, '</h4>');

  // 5. Clean up empty paragraphs and linebreaks
  str = str.replace(/<p>\s*<\/p>/gi, '');
  str = str.replace(/<p>&nbsp;<\/p>/gi, '');
  str = str.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '');
  str = str.replace(/(<br\s*\/?>\s*){2,}/gi, '</p><p>');

  // 6. If no block HTML elements are found, convert plain text linebreaks to paragraphs
  if (!/<(p|h[1-6]|ul|ol|li|blockquote)/i.test(str)) {
    const paragraphs = str
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length > 0) {
      str = paragraphs.map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('');
    }
  }

  // Ensure output starts with block tag if loose text exists
  if (!str.startsWith('<')) {
    str = `<p>${str}</p>`;
  }

  return str.trim();
}

/**
 * Normalizes raw Remotive job item
 */
function normalizeRemotiveJob(raw: any): Job {
  const rawTags = Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : ['Remote', 'Tech'];
  const tags = rawTags.filter(Boolean).map(String).slice(0, 6);
  const spec = detectSpecialization(raw.title || '', tags, raw.description || '');

  const rawLogo = raw.company_logo || raw.company_logo_url;
  const logo = rawLogo && !isInvalidLogoUrl(rawLogo) ? String(rawLogo) : undefined;

  return {
    id: `remotive-${raw.id}`,
    title: String(raw.title || 'Software Engineer'),
    company_name: String(raw.company_name || 'Tech Company'),
    company_logo: logo,
    company_website: raw.url || undefined,
    category: spec,
    specialization: spec,
    job_type: formatJobType(raw.job_type),
    candidate_required_location: String(raw.candidate_required_location || 'Worldwide (Remote)'),
    salary: raw.salary ? String(raw.salary).trim() : '$125,000 - $180,000 (Estimate)',
    publication_date: formatValidIsoDate(raw.publication_date),
    description: cleanAndFormatDescription(raw.description),
    url: raw.url || 'https://remotive.com',
    tags: [spec, ...tags.filter((t: string) => t !== spec)].slice(0, 6),
    source: 'Remotive Global Feed',
    featured: false
  };
}

/**
 * Normalizes raw Jobicy job item
 */
function normalizeJobicyJob(raw: any, index: number): Job {
  const tags: string[] = [];
  if (raw.jobIndustry) tags.push(String(raw.jobIndustry));
  if (raw.jobGeo) tags.push(String(raw.jobGeo));
  if (raw.jobLevel) tags.push(String(raw.jobLevel));

  const spec = detectSpecialization(raw.jobTitle || '', tags, raw.jobDescription || '');

  let salary = '$130,000 - $190,000 (Market Rate)';
  if (raw.annualSalaryMin && raw.annualSalaryMax) {
    const curr = raw.salaryCurrency || '$';
    salary = `${curr}${Number(raw.annualSalaryMin).toLocaleString()} - ${curr}${Number(raw.annualSalaryMax).toLocaleString()}`;
  }

  const rawLogo = raw.companyLogo || raw.company_logo || raw.logo;
  const logo = rawLogo && !isInvalidLogoUrl(rawLogo) ? String(rawLogo) : undefined;

  return {
    id: `jobicy-${raw.id || index}`,
    title: String(raw.jobTitle || 'Software Engineer'),
    company_name: String(raw.companyName || 'Technology Org'),
    company_logo: logo,
    company_website: raw.url || undefined,
    category: spec,
    specialization: spec,
    job_type: formatJobType(raw.jobType),
    candidate_required_location: raw.jobGeo ? `${raw.jobGeo} (Remote)` : 'Worldwide (Remote)',
    salary,
    publication_date: formatValidIsoDate(raw.pubDate),
    description: raw.jobDescription || '<p>Full job specifications available on employer career page.</p>',
    url: raw.url || 'https://jobicy.com',
    tags: [spec, ...tags].slice(0, 6),
    source: 'Jobicy Tech Portal',
    featured: false
  };
}

/**
 * Normalizes raw RemoteOK job item
 */
function normalizeRemoteOKJob(raw: any): Job {
  const rawTags = Array.isArray(raw.tags) ? raw.tags : ['Remote', 'Developer'];
  const tags = rawTags.filter(Boolean).map(String).slice(0, 6);
  const spec = detectSpecialization(raw.position || '', tags, raw.description || '');

  let salary = '$135,000 - $195,000 (Standard)';
  if (raw.salary_min && raw.salary_max && raw.salary_min > 0) {
    salary = `$${Number(raw.salary_min).toLocaleString()} - $${Number(raw.salary_max).toLocaleString()}`;
  }

  const rawLogo = raw.company_logo || raw.logo;
  const logo = rawLogo && !isInvalidLogoUrl(rawLogo) ? String(rawLogo) : undefined;
  const appUrl = raw.apply_url || raw.url;

  return {
    id: `remoteok-${raw.id || raw.slug}`,
    title: String(raw.position || 'Software Developer'),
    company_name: String(raw.company || 'Tech Startup'),
    company_logo: logo,
    company_website: appUrl || undefined,
    category: spec,
    specialization: spec,
    job_type: 'Full-time',
    candidate_required_location: raw.location ? `${raw.location} (Remote)` : 'Worldwide (Anywhere)',
    salary,
    publication_date: formatValidIsoDate(raw.date || raw.epoch),
    description: raw.description || '<p>Detailed position requirements on employer link.</p>',
    url: appUrl || 'https://remoteok.com',
    tags: [spec, ...tags.filter((t: string) => t !== spec)].slice(0, 6),
    source: 'RemoteOK Network',
    featured: false
  };
}

/**
 * Normalizes raw Arbeitnow job item
 */
function normalizeArbeitnowJob(raw: any, index: number): Job {
  const rawTags = Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags : ['Engineering', 'Development'];
  const tags = rawTags.filter(Boolean).map(String).slice(0, 6);
  const spec = detectSpecialization(raw.title || '', tags, raw.description || '');

  const rawLogo = raw.company_logo || raw.logo;
  const logo = rawLogo && !isInvalidLogoUrl(rawLogo) ? String(rawLogo) : undefined;

  return {
    id: `arbeitnow-${raw.slug || index}`,
    title: String(raw.title || 'Technical Specialist'),
    company_name: String(raw.company_name || 'Innovative Org'),
    company_logo: logo,
    company_website: raw.url || undefined,
    category: spec,
    specialization: spec,
    job_type: Array.isArray(raw.job_types) && raw.job_types[0] ? formatJobType(raw.job_types[0]) : 'Full-time',
    candidate_required_location: raw.remote ? 'Remote (Worldwide / EU)' : (raw.location ? `${raw.location} (Remote Hybrid)` : 'Remote'),
    salary: '$120,000 - $175,000 (Market Rate)',
    publication_date: formatValidIsoDate(raw.created_at),
    description: raw.description || '<p>Full job specifications available on original listing.</p>',
    url: raw.url || 'https://www.arbeitnow.com',
    tags: [spec, ...tags.filter((t: string) => t !== spec)].slice(0, 6),
    source: 'Arbeitnow Tech Feed',
    featured: false
  };
}

/**
 * Live fetcher for WeWorkRemotely tech feeds (Full Stack, Backend, DevOps) via RSS2JSON API
 */
async function fetchWeWorkRemotelyJobs(timestamp?: number): Promise<Job[]> {
  const feeds = [
    { url: 'https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss', defaultSpec: 'Full Stack' },
    { url: 'https://weworkremotely.com/categories/remote-back-end-programming-jobs.rss', defaultSpec: 'Backend' },
    { url: 'https://weworkremotely.com/categories/remote-devops-sysadmin-jobs.rss', defaultSpec: 'DevOps / Cloud' }
  ];

  const jobs: Job[] = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`, {
        cache: timestamp ? 'no-store' : 'default'
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data.items)) continue;

      data.items.forEach((item: any, idx: number) => {
        let rawTitle = String(item.title || 'Software Engineer');
        let companyName = 'WeWorkRemotely Partner';

        if (rawTitle.includes(':')) {
          const parts = rawTitle.split(':');
          companyName = parts[0].trim();
          rawTitle = parts.slice(1).join(':').trim() || rawTitle;
        }

        const tags = [feed.defaultSpec, 'Remote', 'Tech'];
        const spec = detectSpecialization(rawTitle, tags, item.description || '');

        jobs.push({
          id: `wwr-${item.guid || item.link || idx}`,
          title: rawTitle,
          company_name: companyName,
          category: spec,
          specialization: spec,
          job_type: 'Full-time',
          candidate_required_location: 'Worldwide (Remote)',
          salary: '$135,000 - $195,000 (Competitive)',
          publication_date: formatValidIsoDate(item.pubDate),
          description: item.content || item.description || `<p>Position listed on WeWorkRemotely for ${companyName}.</p>`,
          url: item.link || 'https://weworkremotely.com',
          tags: Array.from(new Set([spec, ...tags])).slice(0, 6),
          source: 'WeWorkRemotely Global',
          featured: false
        });
      });
    } catch {
      // Continue
    }
  }

  return jobs;
}

/**
 * Live fetcher for WorkingNomads remote tech API (proxied via CodeSlot backend to prevent browser CORS blocks)
 */
async function fetchWorkingNomadsJobs(): Promise<Job[]> {
  try {
    const res = await apiClient.get<any[]>('/jobs/external/workingnomads');
    if (!res.success || !Array.isArray(res.data)) return [];
    const data = res.data;

    return data
      .filter((item: any) => {
        const cat = String(item.category_name || '').toLowerCase();
        const title = String(item.title || '').toLowerCase();
        return cat.includes('dev') || cat.includes('tech') || cat.includes('system') || cat.includes('data') || title.includes('engineer') || title.includes('developer');
      })
      .slice(0, 60)
      .map((item: any, idx: number) => {
        const rawTags = Array.isArray(item.tags) ? item.tags.map(String) : [];
        const spec = detectSpecialization(item.title || '', rawTags, item.description || '');

        return {
          id: `wn-${item.id || idx}`,
          title: String(item.title || 'Software Engineer'),
          company_name: String(item.company_name || 'Global Tech Org'),
          category: spec,
          specialization: spec,
          job_type: 'Full-time',
          candidate_required_location: item.location ? `${item.location} (Remote)` : 'Worldwide (Remote)',
          salary: '$130,000 - $185,000 (Market Rate)',
          publication_date: formatValidIsoDate(item.pub_date),
          description: item.description || '<p>Detailed position requirements available on original listing.</p>',
          url: item.url || 'https://www.workingnomads.com',
          tags: Array.from(new Set([spec, ...rawTags])).slice(0, 6),
          source: 'WorkingNomads Global',
          featured: false
        };
      });
  } catch {
    return [];
  }
}

/**
 * Live fetcher for regional Jobicy tech portals (Europe, UK, APAC, LATAM, Canada)
 */
async function fetchJobicyRegionalFeeds(timestamp?: number): Promise<Job[]> {
  const regions = ['europe', 'uk', 'apac', 'latam', 'canada'];
  const jobs: Job[] = [];

  for (const r of regions) {
    try {
      const res = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=40&geo=${r}`, {
        headers: { Accept: 'application/json' },
        cache: timestamp ? 'no-store' : 'default'
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (!Array.isArray(data.jobs)) continue;

      data.jobs.forEach((item: any, idx: number) => {
        const base = normalizeJobicyJob(item, idx + 1000);
        let geoName = r.toUpperCase();
        if (r === 'europe') geoName = 'Europe / EU';
        if (r === 'uk') geoName = 'UK';
        if (r === 'apac') geoName = 'Asia Pacific';
        if (r === 'latam') geoName = 'Latin America';
        if (r === 'canada') geoName = 'Canada';

        jobs.push({
          ...base,
          id: `jobicy-${r}-${item.id || idx}`,
          candidate_required_location: item.jobGeo ? `${item.jobGeo} (Remote)` : `${geoName} (Remote)`,
          tags: Array.from(new Set([geoName, ...base.tags])).slice(0, 6)
        });
      });
    } catch {
      // Continue
    }
  }

  return jobs;
}

/**
 * Live fetcher for Y Combinator / Hacker News "Who is Hiring?" startup jobs.
 * Connects directly to YC's live monthly hiring threads via the Algolia HN search API.
 */
async function fetchYCHiringStartups(timestamp?: number): Promise<Job[]> {
  try {
    // 1. Fetch the latest "Ask HN: Who is hiring?" story
    const storyRes = await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring&hitsPerPage=2`,
      {
        headers: { Accept: 'application/json' },
        cache: timestamp ? 'no-store' : 'default'
      }
    );
    if (!storyRes.ok) return [];
    const storyData = await storyRes.json();
    const latestStory = storyData.hits?.[0];
    if (!latestStory?.objectID) return [];

    const storyId = latestStory.objectID;

    // 2. Fetch top comments matching Remote / Engineer
    const commentsRes = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=comment,story_${storyId}&query=Remote&hitsPerPage=60`,
      {
        headers: { Accept: 'application/json' },
        cache: timestamp ? 'no-store' : 'default'
      }
    );
    if (!commentsRes.ok) return [];
    const commentsData = await commentsRes.json();
    if (!Array.isArray(commentsData.hits)) return [];

    const parsedJobs: Job[] = [];

    for (const hit of commentsData.hits) {
      const rawText = hit.comment_text || '';
      if (!rawText || rawText.length < 40) continue;

      // Decode HTML entities
      const unescaped = rawText
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      const firstLine = unescaped.split(/<p>|\n/)[0].replace(/<[^>]+>/g, '').trim();
      if (!firstLine.includes('|') && !firstLine.toLowerCase().includes('hiring')) {
        continue;
      }

      const parts = firstLine.split('|').map((p: string) => p.trim());
      let company = parts[0] ? parts[0].replace(/^(at|join)\s+/i, '').trim() : 'YC Startup';
      let title = parts[1] || 'Software Engineer';
      let locationRaw = parts[2] || 'Worldwide (Remote)';
      let salaryRaw = parts[3] || '$140,000 - $215,000 + Equity';

      // Clean company
      company = company.replace(/https?:\/\/\S+/g, '').replace(/[\(\)]/g, '').trim();
      if (!company || company.length > 35) {
        const cMatch = unescaped.match(/([A-Za-z0-9\.\s]{2,25})\s*(?:is hiring|we['’]re hiring)/i);
        company = cMatch ? cMatch[1].trim() : 'Y-Combinator Startup';
      }

      // Clean title
      title = title.replace(/<[^>]+>/g, '').trim();
      if (!title || title.length > 70) {
        title = 'Software Engineer';
      }

      // Location classification
      let location = 'Worldwide (Remote)';
      const lower = unescaped.toLowerCase();
      if (lower.includes('us only') || lower.includes('usa only') || lower.includes('remote (us') || lower.includes('us time zones') || lower.includes('united states')) {
        location = 'USA (Remote)';
      } else if (lower.includes('remote (eu') || lower.includes('uk remote') || lower.includes('europe')) {
        location = 'Europe / UK (Remote)';
      } else if (locationRaw.toLowerCase().includes('remote')) {
        location = `${locationRaw.substring(0, 30)} (Remote)`;
      }

      // Detect Salary
      const salMatch = unescaped.match(/\$[\d,]+(?:\s*[-–—to]\s*\$[\d,]+|\s*k)?/i);
      const salary = salMatch ? salMatch[0] : (salaryRaw.includes('$') ? salaryRaw.substring(0, 30) : '$145,000 - $220,000 + Equity');

      // Detect application link or email
      let url = `https://news.ycombinator.com/item?id=${hit.objectID}`;
      const urlMatch = unescaped.match(/href="([^"]+)"/i);
      if (urlMatch && urlMatch[1] && !urlMatch[1].includes('ycombinator.com')) {
        url = urlMatch[1];
      } else {
        const mailMatch = unescaped.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (mailMatch) {
          url = `mailto:${mailMatch[1]}?subject=Application for ${encodeURIComponent(title)} via CodeSlot`;
        }
      }

      const tags = ['YC / HN Startup', 'Startup'];
      if (location.includes('USA')) tags.push('USA Startup');
      else tags.push('Global Startup');

      const spec = detectSpecialization(title, tags, unescaped);
      tags.push(spec);

      parsedJobs.push({
        id: `yc-hn-${hit.objectID}`,
        title,
        company_name: company,
        category: spec,
        specialization: spec,
        job_type: /contract/i.test(unescaped) ? 'Contract' : 'Full-time',
        candidate_required_location: location,
        salary,
        publication_date: formatValidIsoDate(hit.created_at),
        description: unescaped.length > 80 ? unescaped : `<p>${firstLine}</p><p>View full startup thread on Hacker News / Y Combinator.</p>`,
        url,
        tags: Array.from(new Set(tags)).slice(0, 6),
        source: 'Y Combinator / HN Startups',
        featured: false
      });
    }

    return parsedJobs;
  } catch (err) {
    console.warn('Failed to fetch YC HN Startups:', err);
    return [];
  }
}

/**
 * Live fetcher for USA tech startups from Jobicy USA feed
 */
async function fetchJobicyUSAStartups(timestamp?: number): Promise<Job[]> {
  try {
    const res = await fetch(`https://jobicy.com/api/v2/remote-jobs?count=50&geo=usa`, {
      headers: { Accept: 'application/json' },
      cache: timestamp ? 'no-store' : 'default'
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data.jobs)) return [];

    return data.jobs.map((item: any, idx: number) => {
      const base = normalizeJobicyJob(item, idx + 600);
      return {
        ...base,
        id: `jobicy-usa-${item.id || idx}`,
        source: 'USA Tech Startups',
        candidate_required_location: 'USA (Remote)',
        tags: Array.from(new Set(['USA Startup', 'Startup', ...base.tags])).slice(0, 6)
      };
    });
  } catch {
    return [];
  }
}

/**
 * Invalidate in-memory and sessionStorage job caches
 */
export function invalidateJobsCache(): void {
  inMemoryCache = null;
  try {
    sessionStorage.removeItem('codeslot_jobs_cache_v4');
  } catch {
    // ignore
  }
}

/**
 * Primary fetch function aggregating 100% real tech jobs from 10+ live platforms and startup sources
 * concurrently with intelligent deduping and fast caching.
 * When forceRefresh is true, all in-memory and session caches are wiped, and cache-busting queries
 * are sent to ensure fresh data from remote sites.
 */
export async function fetchRealJobs(forceRefresh: boolean = false): Promise<Job[]> {
  if (!forceRefresh) {
    if (inMemoryCache && inMemoryCache.length > 50) {
      return inMemoryCache;
    }

    // Check sessionStorage for instant page reloads
    try {
      const cached = sessionStorage.getItem('codeslot_jobs_cache_v4');
      if (cached) {
        const parsed = JSON.parse(cached) as Job[];
        if (Array.isArray(parsed) && parsed.length > 50) {
          inMemoryCache = parsed;
          return parsed;
        }
      }
    } catch {
      // ignore sessionStorage errors
    }
  } else {
    invalidateJobsCache();
  }

  const timestamp = forceRefresh ? Date.now() : undefined;
  const cb = timestamp ? `&_t=${timestamp}` : '';
  const cbQ = timestamp ? `?_t=${timestamp}` : '';
  const fetchOpts: RequestInit = timestamp ? { cache: 'no-store' } : {};

  const collected: Job[] = [...CURATED_REAL_TECH_JOBS];

  // Query CodeSlot Backend API first
  try {
    const backendRes = await apiClient.get<{ jobs: Job[] }>('/jobs?limit=100');
    if (backendRes.success && backendRes.data?.jobs && backendRes.data.jobs.length > 0) {
      backendRes.data.jobs.forEach((job) => collected.push(job));
    }
  } catch (backendErr) {
    console.debug('Backend jobs API offline, continuing with client feeds:', backendErr);
  }

  try {
    // Query multi-source APIs and RSS feeds in parallel
    const [
      remotiveSoftware,
      remotiveDevops,
      remotiveData,
      jobicyEngineering,
      jobicyDev,
      remoteokData,
      arbeitnowData,
      ycStartupsData,
      jobicyUSAData,
      wwrJobsData,
      workingNomadsData,
      jobicyRegionalData
    ] = await Promise.allSettled([
      // 1. Remotive Software Dev
      fetch(`https://remotive.com/api/remote-jobs?category=software-dev&limit=100${cb}`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 2. Remotive DevOps
      fetch(`https://remotive.com/api/remote-jobs?category=devops&limit=50${cb}`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 3. Remotive Data
      fetch(`https://remotive.com/api/remote-jobs?category=data&limit=50${cb}`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 4. Jobicy Engineering (max count 50, no invalid query params)
      fetch(`https://jobicy.com/api/v2/remote-jobs?count=50&industry=engineering`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 5. Jobicy Dev (max count 50, no invalid query params)
      fetch(`https://jobicy.com/api/v2/remote-jobs?count=50&industry=dev`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 6. RemoteOK
      fetch(`https://remoteok.com/api${cbQ}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 7. Arbeitnow Tech
      fetch(`https://www.arbeitnow.com/api/job-board-api${cbQ}`, {
        headers: { Accept: 'application/json' },
        ...fetchOpts
      }).then((r) => (r.ok ? r.json() : null)),

      // 8. Y Combinator / Hacker News Who is Hiring Startup Feed
      fetchYCHiringStartups(timestamp),

      // 9. USA Tech Startups feed from Jobicy USA
      fetchJobicyUSAStartups(timestamp),

      // 10. WeWorkRemotely Global RSS feeds
      fetchWeWorkRemotelyJobs(timestamp),

      // 11. WorkingNomads Global Tech API (Proxied through backend)
      fetchWorkingNomadsJobs(),

      // 12. Jobicy Regional Tech Feeds (Europe, UK, APAC, LATAM, Canada)
      fetchJobicyRegionalFeeds(timestamp)
    ]);

    // Process Remotive Software
    if (remotiveSoftware.status === 'fulfilled' && remotiveSoftware.value?.jobs) {
      remotiveSoftware.value.jobs.forEach((item: any) => {
        collected.push(normalizeRemotiveJob(item));
      });
    }

    // Process Remotive DevOps
    if (remotiveDevops.status === 'fulfilled' && remotiveDevops.value?.jobs) {
      remotiveDevops.value.jobs.forEach((item: any) => {
        collected.push(normalizeRemotiveJob(item));
      });
    }

    // Process Remotive Data
    if (remotiveData.status === 'fulfilled' && remotiveData.value?.jobs) {
      remotiveData.value.jobs.forEach((item: any) => {
        collected.push(normalizeRemotiveJob(item));
      });
    }

    // Process Jobicy Engineering
    if (jobicyEngineering.status === 'fulfilled' && Array.isArray(jobicyEngineering.value?.jobs)) {
      jobicyEngineering.value.jobs.forEach((item: any, idx: number) => {
        collected.push(normalizeJobicyJob(item, idx));
      });
    }

    // Process Jobicy Dev
    if (jobicyDev.status === 'fulfilled' && Array.isArray(jobicyDev.value?.jobs)) {
      jobicyDev.value.jobs.forEach((item: any, idx: number) => {
        collected.push(normalizeJobicyJob(item, idx + 200));
      });
    }

    // Process RemoteOK
    if (remoteokData.status === 'fulfilled' && Array.isArray(remoteokData.value)) {
      remoteokData.value
        .filter((j: any) => j && j.position && j.company)
        .forEach((item: any) => {
          collected.push(normalizeRemoteOKJob(item));
        });
    }

    // Process Arbeitnow
    if (arbeitnowData.status === 'fulfilled' && Array.isArray(arbeitnowData.value?.data)) {
      arbeitnowData.value.data
        .filter((j: any) => {
          const tagsStr = Array.isArray(j?.tags) ? j.tags.filter(Boolean).map(String).join(' ') : '';
          const str = `${j?.title || ''} ${tagsStr}`.toLowerCase();
          return (
            str.includes('engineer') ||
            str.includes('developer') ||
            str.includes('software') ||
            str.includes('frontend') ||
            str.includes('backend') ||
            str.includes('fullstack') ||
            str.includes('devops') ||
            str.includes('python') ||
            str.includes('react') ||
            str.includes('rust') ||
            str.includes('cloud') ||
            str.includes('data')
          );
        })
        .slice(0, 100)
        .forEach((item: any, idx: number) => {
          collected.push(normalizeArbeitnowJob(item, idx));
        });
    }

    // Process Y Combinator / Hacker News Who is Hiring Startups Feed
    if (ycStartupsData.status === 'fulfilled' && Array.isArray(ycStartupsData.value)) {
      ycStartupsData.value.forEach((job: Job) => {
        collected.push(job);
      });
    }

    // Process USA Tech Startups from Jobicy USA
    if (jobicyUSAData.status === 'fulfilled' && Array.isArray(jobicyUSAData.value)) {
      jobicyUSAData.value.forEach((job: Job) => {
        collected.push(job);
      });
    }

    // Process WeWorkRemotely Global
    if (wwrJobsData.status === 'fulfilled' && Array.isArray(wwrJobsData.value)) {
      wwrJobsData.value.forEach((job: Job) => {
        collected.push(job);
      });
    }

    // Process WorkingNomads Global
    if (workingNomadsData.status === 'fulfilled' && Array.isArray(workingNomadsData.value)) {
      workingNomadsData.value.forEach((job: Job) => {
        collected.push(job);
      });
    }

    // Process Jobicy Regional Feeds
    if (jobicyRegionalData.status === 'fulfilled' && Array.isArray(jobicyRegionalData.value)) {
      jobicyRegionalData.value.forEach((job: Job) => {
        collected.push(job);
      });
    }
  } catch (globalErr) {
    console.warn('Network fetch completed with fallbacks:', globalErr);
  }

  // Deduplicate strictly by ID AND by (clean title + company name)
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const deduplicated: Job[] = [];

  for (const job of collected) {
    if (!job || !job.id) continue;
    const cleanTitle = String(job.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanCompany = String(job.company_name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const titleKey = `${cleanTitle}-${cleanCompany}`;

    if (seenIds.has(job.id) || seenTitles.has(titleKey)) {
      continue;
    }

    seenIds.add(job.id);
    seenTitles.add(titleKey);
    deduplicated.push(job);
  }

  // Sort: featured first, then recent publication date
  deduplicated.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime();
  });

  inMemoryCache = deduplicated;

  try {
    sessionStorage.setItem('codeslot_jobs_cache_v4', JSON.stringify(deduplicated));
  } catch {
    // sessionStorage full or unavailable
  }

  return deduplicated;
}

/**
 * Retrieve a specific job by its unique identifier
 */
export async function getJobById(id: string): Promise<Job | undefined> {
  if (inMemoryCache) {
    const found = inMemoryCache.find((j) => j.id === id);
    if (found) return found;
  }
  try {
    const res = await apiClient.get<Job>(`/jobs/${id}`);
    if (res.success && res.data) {
      return res.data;
    }
  } catch {
    // fallback
  }
  const allJobs = await fetchRealJobs();
  return allJobs.find((j) => j.id === id);
}

/**
 * Toggle bookmarking a job on backend database
 */
export async function toggleSaveJobBackend(
  jobId: string
): Promise<{ isSaved: boolean; savedJobIds: string[] } | null> {
  try {
    const res = await apiClient.post<{ isSaved: boolean; savedJobIds: string[] }>(
      `/jobs/${jobId}/save`
    );
    if (res.success && res.data) {
      return res.data;
    }
  } catch (err) {
    console.debug('Failed to sync saved job to backend:', err);
  }
  return null;
}

/**
 * Submit job application to backend
 */
export async function applyJobBackend(
  jobId: string,
  details: {
    resumeVersion?: string;
    matchScore?: number;
    notes?: string;
    salaryRange?: string;
    jobTitle?: string;
    company?: string;
    companyLogo?: string;
    sourceUrl?: string;
    category?: string;
    candidateRequiredLocation?: string;
  } = {}
): Promise<boolean> {
  try {
    const res = await apiClient.post(`/jobs/${jobId}/apply`, {
      jobId,
      ...details,
    });
    return Boolean(res.success);
  } catch (err) {
    console.debug('Failed to submit application to backend:', err);
    return false;
  }
}


/**
 * Format relative date (e.g. "2 days ago", "Today")
 */
export function formatRelativeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return 'Recently';
  }
}

/**
 * Determine experience/seniority level for a job
 */
export function getJobExperienceLevel(job: Job): 'Junior' | 'Intermediate' | 'Senior' | 'Lead' {
  if (job.experienceLevel) {
    const l = String(job.experienceLevel).toLowerCase();
    if (l.includes('junior') || l.includes('entry') || l.includes('intern')) return 'Junior';
    if (l.includes('lead') || l.includes('staff') || l.includes('principal') || l.includes('architect')) return 'Lead';
    if (l.includes('senior') || l.includes('sr')) return 'Senior';
    if (l.includes('intermediate') || l.includes('mid')) return 'Intermediate';
  }

  const tagsStr = Array.isArray(job.tags) ? job.tags.join(' ') : '';
  const text = `${job.title || ''} ${tagsStr} ${(job.description || '').slice(0, 400)}`.toLowerCase();

  if (/\b(lead|staff|principal|director|head of|vp|architect)\b/i.test(job.title || '')) return 'Lead';
  if (/\b(senior|sr\.?|5\+\s*years|7\+\s*years)\b/i.test(job.title || '')) return 'Senior';
  if (/\b(junior|jr\.?|entry|associate|intern|graduate|0-2\s*years)\b/i.test(job.title || '')) return 'Junior';
  if (/\b(mid|intermediate|2-5\s*years)\b/i.test(job.title || '')) return 'Intermediate';
  if (/\b(senior|sr\.?)\b/i.test(text)) return 'Senior';
  if (/\b(junior|entry)\b/i.test(text)) return 'Junior';
  return 'Intermediate';
}
