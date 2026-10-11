import type { Job } from '@code-slot/shared';

export const INITIAL_CURATED_JOBS: Job[] = [
  {
    id: 'cs-linear-staff-eng',
    title: 'Staff Frontend Engineer - Desktop & Web Core',
    company_name: 'Linear',
    company_logo: 'https://logo.clearbit.com/linear.app',
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
    featured: true,
  },
  {
    id: 'cs-stripe-backend-infra',
    title: 'Senior Backend Systems Engineer - Payment Rails & Core Ledger',
    company_name: 'Stripe',
    company_logo: 'https://logo.clearbit.com/stripe.com',
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
    featured: true,
  },
  {
    id: 'cs-automattic-fullstack-core',
    title: 'Senior Full Stack Engineer - Gutenberg & Web Core',
    company_name: 'Automattic',
    company_logo: 'https://logo.clearbit.com/automattic.com',
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
    featured: true,
  },
  {
    id: 'cs-vercel-devrel-infra',
    title: 'Staff Cloud Infrastructure Engineer - Next.js Edge Runtime',
    company_name: 'Vercel',
    company_logo: 'https://logo.clearbit.com/vercel.com',
    category: 'DevOps / Cloud',
    specialization: 'DevOps / Cloud',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$190,000 - $250,000 + Equity',
    publication_date: '2026-09-18T16:00:00Z',
    description: `<h3>About Vercel</h3>
<p>Vercel enables developers to build and deploy web applications instantly with zero configuration. We are searching for a Staff Cloud Infrastructure Engineer to scale our global serverless routing mesh and Edge compute layer.</p>
<h4>Responsibilities:</h4>
<ul>
  <li>Build high-performance edge proxy engines using Rust, Envoy, and AWS / Cloudflare backbones.</li>
  <li>Scale our global CDN caching network handling over 50 billion monthly requests.</li>
  <li>Automate multi-region failure detection, automated DNS failovers, and synthetic health monitoring.</li>
</ul>
<h4>Requirements:</h4>
<ul>
  <li>Proven expertise with low-level networking (TCP, HTTP/2, HTTP/3, TLS), Rust or Go, and Kubernetes.</li>
  <li>Experience operating mission-critical globally distributed edge services.</li>
</ul>`,
    url: 'https://vercel.com/careers',
    tags: ['Rust', 'Go', 'DevOps / Cloud', 'Kubernetes', 'CDN', 'Edge Computing', 'Terraform'],
    source: 'Vercel Careers',
    company_website: 'https://vercel.com',
    featured: true,
  },
  {
    id: 'cs-supabase-db-kernel',
    title: 'Principal Systems Engineer - PostgreSQL Engine & Extensions',
    company_name: 'Supabase',
    company_logo: 'https://logo.clearbit.com/supabase.com',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$185,000 - $255,000',
    publication_date: '2026-09-17T09:00:00Z',
    description: `<h3>About Supabase</h3>
<p>Supabase is the open source Firebase alternative built on top of PostgreSQL. We give developers an enterprise-grade database, authentication, instant APIs, real-time subscriptions, and vector storage.</p>
<h4>What you will do:</h4>
<ul>
  <li>Contribute directly to core Postgres extensions (pgvector, pg_graphql, supabase-vault) and upstream PostgreSQL.</li>
  <li>Optimize storage layouts, WAL streaming, and backup restoration speeds across hundreds of thousands of active tenant databases.</li>
  <li>Work in open source in public on GitHub.</li>
</ul>
<h4>Skills:</h4>
<ul>
  <li>Deep C, Rust, and PostgreSQL internal kernel architecture expertise.</li>
  <li>Knowledge of storage engines, index tuning (HNSW, IVFFlat), and memory allocators.</li>
</ul>`,
    url: 'https://supabase.com/careers',
    tags: ['C', 'Rust', 'PostgreSQL', 'pgvector', 'Backend', 'Open Source'],
    source: 'Supabase Careers',
    company_website: 'https://supabase.com',
    featured: true,
  },
  {
    id: 'cs-datadog-observability-lead',
    title: 'Senior Distributed Tracing Engineer - APM Core Engine',
    company_name: 'Datadog',
    company_logo: 'https://logo.clearbit.com/datadoghq.com',
    category: 'Backend',
    specialization: 'Backend',
    job_type: 'Full-time',
    candidate_required_location: 'Americas / EMEA (Remote)',
    salary: '$175,000 - $230,000 + Stock',
    publication_date: '2026-09-16T12:00:00Z',
    description: `<h3>Join Datadog APM</h3>
<p>Datadog is the monitoring and security platform for cloud applications. Our distributed tracing platform ingests tens of trillions of trace spans daily from production systems worldwide.</p>
<h4>Key Responsibilities:</h4>
<ul>
  <li>Engineer ultra-low-overhead tracing instrumentation libraries in Go, Java, and Node.js.</li>
  <li>Build high-throughput ingestion pipelines using Apache Kafka, ClickHouse, and custom Rust filters.</li>
  <li>Collaborate on OpenTelemetry specifications and reference SDK implementations.</li>
</ul>`,
    url: 'https://www.datadoghq.com/careers',
    tags: ['Go', 'Kafka', 'ClickHouse', 'OpenTelemetry', 'Distributed Tracing', 'Backend'],
    source: 'Datadog Careers',
    company_website: 'https://www.datadoghq.com',
    featured: false,
  },
  {
    id: 'cs-figma-webgl-canvas',
    title: 'Senior Graphics Engineer - WebGL & WebGPU Canvas Renderer',
    company_name: 'Figma',
    company_logo: 'https://logo.clearbit.com/figma.com',
    category: 'Frontend',
    specialization: 'Frontend',
    job_type: 'Full-time',
    candidate_required_location: 'US / Canada (Remote)',
    salary: '$190,000 - $260,000 + Equity',
    publication_date: '2026-09-15T15:00:00Z',
    description: `<h3>Building the Future of Design Tools</h3>
<p>Figma's design editor runs entirely in the browser using WebAssembly and WebGL/WebGPU. We are seeking a Graphics Engineer to evolve our multiplayer canvas rendering pipeline to render complex vector graphs at a consistent 120 FPS.</p>
<h4>Requirements:</h4>
<ul>
  <li>Strong C++, WebAssembly, and modern GPU rendering APIs (WebGL, WebGPU, Metal, DirectX).</li>
  <li>Expertise in spatial indexing (BVH, R-Trees), tessellation, anti-aliasing shaders, and color management.</li>
</ul>`,
    url: 'https://www.figma.com/careers',
    tags: ['C++', 'WebGL', 'WebGPU', 'WASM', 'Graphics', 'Frontend'],
    source: 'Figma Careers',
    company_website: 'https://www.figma.com',
    featured: true,
  },
  {
    id: 'cs-anthropic-ai-systems',
    title: 'AI Platform Systems Engineer - Inference & Serving Infrastructure',
    company_name: 'Anthropic',
    company_logo: 'https://logo.clearbit.com/anthropic.com',
    category: 'AI & Machine Learning',
    specialization: 'AI & Machine Learning',
    job_type: 'Full-time',
    candidate_required_location: 'Worldwide (Remote)',
    salary: '$220,000 - $310,000 + Equity',
    publication_date: '2026-09-14T18:00:00Z',
    description: `<h3>About Anthropic</h3>
<p>Anthropic is an AI safety and research company that builds reliable, beneficial AI systems like Claude. We are looking for an AI Systems Engineer to build and optimize massive GPU cluster serving pipelines.</p>
<h4>What you will do:</h4>
<ul>
  <li>Optimize distributed tensor-parallel inference runtimes with vLLM, TensorRT-LLM, and Triton.</li>
  <li>Engineer ultra-low-latency speculative decoding pipelines and KV-cache offloading algorithms.</li>
  <li>Ensure resilient multi-cloud GPU provisioning across AWS, GCP, and custom HPC clusters.</li>
</ul>`,
    url: 'https://www.anthropic.com/careers',
    tags: ['Python', 'C++', 'CUDA', 'AI & Machine Learning', 'vLLM', 'PyTorch', 'Distributed Systems'],
    source: 'Anthropic Careers',
    company_website: 'https://www.anthropic.com',
    featured: true,
  },
];
