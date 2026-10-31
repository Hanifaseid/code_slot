<div align="center">

# ⚡ CodeSlot
### Remote Tech Jobs Discovery & AI Resume Studio
**INSA Final Project**

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75FF?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10.33-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Presentation](https://img.shields.io/badge/Video_Presentation-Loom-625DF5?logo=loom&logoColor=white)](https://www.loom.com/share/814e303337b94c9fa9382ad39184c092)

<br />

---

### 🎓 Academic Submission Details
| Attribute | Detail |
| :--- | :--- |
| **Project Type** | **INSA Final Project** (Information Network Security Agency) |
| **Student / Author** | **Hanifa Seid** |
| **CTC Number** | **CTC-1646-26** |
| **Project Presentation** | [▶️ Watch Video Walkthrough on Loom](https://www.loom.com/share/814e303337b94c9fa9382ad39184c092) |
| **Project Status** | Completed & Fully Verified |

---

</div>

## 🎥 Project Presentation & Walkthrough

> 📺 **Watch the complete project presentation and live demonstration on Loom:**  
> 🔗 [**https://www.loom.com/share/814e303337b94c9fa9382ad39184c092**](https://www.loom.com/share/814e303337b94c9fa9382ad39184c092)

---

## 📌 Project Overview

**CodeSlot** is an enterprise-grade full-stack web platform built for software engineers, developers, and tech professionals seeking remote careers worldwide. It bridges the gap between global remote job discovery and applicant success by pairing a real-time job board with a generative **AI Resume Studio** powered by **Google Gemini 2.5 Flash**.

The platform is engineered as a modern **pnpm monorepo** with end-to-end type safety, modular microservice architecture, PostgreSQL database persistence via Prisma ORM, role-based access control (Candidate, Recruiter, Admin), an interactive recruiter Kanban application tracking system, and automated OpenAPI/Swagger documentation.

---

## 🌟 Key Capabilities & Features

### 1. 💼 Remote Tech Job Discovery
- **Curated Worldwide Job Postings**: High-signal remote engineering roles across Backend, Frontend, Full Stack, DevOps & Cloud, AI/ML, Mobile, and Security from top distributed employers (e.g., Automattic, Vercel, Supabase, GitLab, Stripe).
- **Multi-Dimensional Search & Filtering**: Filter by category, job type (Full-time, Contract), geographic candidate requirement (Worldwide, Americas, EMEA, APAC), salary ranges, and tech tags.
- **Bookmark & Save Pipeline**: Save target job postings locally and synchronize with the backend cloud database.
- **Integrated Application Workflow**: Submit direct applications with tailored resume versions, target compensation expectations, match scores, and custom candidate cover notes.

### 2. 📄 AI Resume Studio (Google Gemini 2.5 Flash)
- **Targeted AI Resume Tailoring**: Automatically aligns professional summaries, technical skills, and work accomplishments to specific job listings utilizing recruiter-proven frameworks (such as the Google X-Y-Z formula: *"Accomplished [X], as measured by [Y], by doing [Z]"*).
- **Real-Time ATS Match Scoring**: Instant 0–100% ATS score calculation with matched keywords breakdown, missing keywords identification, and tailored recruiter feedback.
- **AI Bullet Enhancement**: One-click contextual rephrasing of individual experience bullet points to maximize impact and action verbs.
- **7 Professional Resume Templates**:
  - 📄 **ATS Compact**: Minimalist, single-column high-density layout designed for ATS parsers.
  - 🏛️ **Ivy Classic**: Traditional academic typography layout for high-credibility roles.
  - 💼 **Executive**: High-impact corporate layout optimized for senior and leadership positions.
  - 🎨 **Minimalist**: Modern whitespace design with subtle accent highlights.
  - 📐 **Creative Sidebar**: Sleek two-column asymmetric layout with quick-read sidebar.
  - ❄️ **Nordic Clean**: Clean, Scandinavian-inspired typographic structure.
  - 🚀 **Vibrant Startup**: Dynamic modern styling tailored for innovative tech startups.
- **Custom Styling & Layout Controls**: Real-time font family switching, dynamic accent color pickers, adjustable margins, and custom section ordering.
- **Pixel-Perfect PDF Export**: Clean CSS `@media print` rules ensure multi-page and single-page resumes export directly to print-ready PDF with zero watermarks or third-party paid dependencies.
- **Intelligent Heuristic Fallback**: Includes a built-in deterministic heuristic engine ensuring complete functionality even during network latency or when no API key is configured.

### 3. 👤 Candidate Profile Management
- **Interactive Profile Studio**: Comprehensive modal to manage personal information, professional headline, geographic location, and bio.
- **Skills Matrix & Specialization**: Add and customize core competencies, frameworks, and programming languages.
- **Portfolio & Social Links**: Link GitHub, LinkedIn, and personal portfolio websites.
- **Cloud Synchronization**: Direct integration with backend `PATCH /api/auth/profile` and persistent session synchronization.

### 4. 📊 Admin & Recruiter Control Center
- **System Metrics Dashboard**: Real-time platform analytics detailing total job listings, active users, submitted applications, and average candidate ATS match scores.
- **Interactive Application Tracker (Kanban & Table)**:
  - Track applications across stages: `Applied` ➔ `Screening` ➔ `Interview` ➔ `Offer` ➔ `Rejected`.
  - Dual viewing modes: Kanban board with drag-and-drop workflow status updates and a structured data table.
- **User Management**: View, filter, and inspect candidate and recruiter accounts with status controls.
- **Broadcast System**: Publish platform announcements and recruitment notices visible across the candidate portal.
- **Account Impersonation**: Built-in recruiter testing mode enabling seamless persona switching.

### 5. 🔐 Authentication & Role-Based Access (RBAC)
- **JWT-Protected Security**: Robust authentication using JSON Web Tokens with HTTP-only tokens and request validation.
- **Instant Demo Login**: One-click persona switching between pre-seeded demo accounts:
  - 👨‍💻 **Candidate**: Alex Mercer (`candidate`)
  - 👩‍💼 **Recruiter**: Sarah Jenkins (`recruiter`)
  - 🛡️ **Administrator**: System Administrator (`admin`)

### 6. 📖 OpenAPI / Swagger Documentation
- Fully documented REST API available interactively at `/api/docs` powered by `@asteasolutions/zod-to-openapi` and `swagger-ui-express`.

---

## 🛠️ Complete Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Monorepo Architecture** | [pnpm Workspaces](https://pnpm.io/workspaces) | Fast, isolated package dependency management |
| **Frontend Framework** | [React 19](https://react.dev/) | Modern concurrent UI engine |
| **Frontend Tooling** | [Vite 8](https://vitejs.dev/) | Ultra-fast HMR and production bundling |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation utility-first CSS framework |
| **Icons & Motion** | [Lucide React](https://lucide.react.dev/) & [Motion](https://motion.dev/) | Accessible iconography and smooth fluid animations |
| **Generative AI** | [Google Gemini 2.5 Flash](https://ai.google.dev/) | Real-time resume tailoring, bullet optimization, and ATS parsing |
| **Backend Runtime** | [Node.js 20+](https://nodejs.org/) & [TypeScript 5.7](https://www.typescriptlang.org/) | Type-safe server execution |
| **Web Server Framework** | [Express 4.21](https://expressjs.com/) | RESTful API routing and middleware pipeline |
| **Database & ORM** | [PostgreSQL 16](https://www.postgresql.org/) & [Prisma ORM 6.4](https://www.prisma.io/) | Relational database schema, migrations, and type-safe query client |
| **Validation & Schema** | [Zod 3.24](https://zod.dev/) | Shared schema validation across frontend and backend boundaries |
| **API Documentation** | [OpenAPI 3.0 / Swagger UI](https://swagger.io/) | Auto-generated interactive API documentation (`/api/docs`) |
| **Security & Logging** | [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [Pino](https://getpino.io/) | Security headers, cross-origin protection, and structured JSON logs |
| **Testing** | [Vitest 3.0](https://vitest.dev/) & [Supertest](https://github.com/ladjs/supertest) | Fast integration test suite verifying all HTTP endpoints |
| **Containerization** | [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) | Production multi-stage Dockerfiles and containerized dev environment |

---

## 📂 Project Architecture & Monorepo Structure

```
codeslot/
├── apps/
│   ├── frontend/                       # React 19 + Vite + Tailwind CSS v4 SPA
│   │   ├── src/
│   │   │   ├── components/             # UI Components
│   │   │   │   ├── admin/              # Admin dashboard, stats & Kanban board
│   │   │   │   ├── resume/             # AI Resume Studio & controls
│   │   │   │   │   └── templates/      # 7 Professional resume templates
│   │   │   │   ├── AuthPage.tsx        # Login, registration & demo persona login
│   │   │   │   ├── JobDetailPage.tsx   # Detailed job view & application submission modal
│   │   │   │   ├── JobsPortal.tsx      # Main job search, filters & job list
│   │   │   │   ├── Navbar.tsx          # Top navigation & user profile quick action
│   │   │   │   ├── ProfileModal.tsx    # Interactive candidate profile editor
│   │   │   │   └── CompanyLogo.tsx     # Dynamic corporate logo resolver
│   │   │   ├── data/                   # Fallback job catalog & sample resume profiles
│   │   │   ├── services/               # API clients (apiClient, aiResumeService, jobService)
│   │   │   ├── types/                  # Frontend types & session definitions
│   │   │   ├── App.tsx                 # Root layout, router state & auth provider
│   │   │   ├── main.tsx                # Frontend application entry point
│   │   │   └── index.css               # Global theme, Tailwind v4 directives & print styles
│   │   ├── Dockerfile                  # Multi-stage production container build
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── backend/                        # Node.js + Express + Prisma REST API
│       ├── src/
│       │   ├── common/                 # Base error classes & standard ApiResponse envelopes
│       │   ├── config/                 # Environment validation via Zod
│       │   ├── database/               # Prisma database client singleton
│       │   ├── docs/                   # Swagger / OpenAPI registry
│       │   ├── middleware/             # Auth guards, role verification, Zod request validator
│       │   ├── modules/
│       │   │   ├── admin/              # Admin stats, application tracking & user management
│       │   │   ├── auth/               # User registration, login, profile updates
│       │   │   ├── health/             # System health, uptime & DB status checks
│       │   │   ├── jobs/               # Job search, detail, apply & save endpoints
│       │   │   └── resume/             # Resume storage & candidate cloud sync
│       │   ├── utils/                  # Password hashing & JWT helpers
│       │   ├── app.ts                  # Express application configuration & routes
│       │   └── server.ts               # Server startup & graceful shutdown handlers
│       ├── prisma/
│       │   ├── schema.prisma           # Prisma PostgreSQL data models
│       │   └── seed.ts                 # Database seeding script with realistic tech jobs
│       ├── tests/                      # Integration tests (api.test.ts, health.test.ts)
│       ├── Dockerfile                  # Multi-stage backend container
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── shared/                         # Shared TypeScript types & Zod schemas
│   │   ├── src/
│   │   │   └── index.ts                # Unified schema definitions (Jobs, Users, Resumes)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── typescript-config/              # Shared base TypeScript configurations
│       ├── base.json
│       ├── package.json
│       └── tsconfig.json
│
├── infrastructure/
│   └── docker/
│       └── postgres/
│           └── init/                   # PostgreSQL initialization scripts
│
├── .env.example                        # Template for environment variables
├── docker-compose.yml                  # Multi-container orchestration (Postgres, Backend, Frontend)
├── package.json                        # Root workspace scripts & dev dependencies
├── pnpm-lock.yaml                      # Pnpm lockfile
├── pnpm-workspace.yaml                 # Monorepo workspace configuration
├── tsconfig.base.json                  # Root TypeScript configuration
└── README.md                           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or higher (LTS recommended)
- **pnpm**: `v10.0.0` or higher (`npm install -g pnpm`)
- **Docker & Docker Compose** *(Optional, for containerized execution)*

---

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abdellahseid/codeslot_2.git
   cd code_slot
   ```

2. **Install all workspace dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to create your local `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   # Frontend Configuration
   FRONTEND_PORT=3000
   VITE_API_URL=http://localhost:5000/api

   # Backend Configuration
   BACKEND_PORT=5000
   NODE_ENV=development
   JWT_SECRET=codeslot_development_secret_key_2026
   CORS_ORIGIN=http://localhost:3000

   # Database Configuration
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/codeslot?schema=public"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=codeslot
   POSTGRES_PORT=5432

   # Google Gemini AI Key (Optional - Fallback heuristic runs automatically if empty)
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   VITE_GEMINI_API_KEY="your_google_gemini_api_key_here"
   ```

4. **Initialize Database** *(Optional if running PostgreSQL locally)*:
   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Run database migrations
   pnpm db:migrate
   ```

5. **Start Both Applications (Frontend & Backend)**:
   ```bash
   pnpm dev
   ```
   This runs both the frontend client and backend API concurrently:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
   - **Swagger API Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
   - **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### Running via Docker Compose

To launch the complete application stack (PostgreSQL 16, Express Backend, Vite/Nginx Frontend) in isolated containers:

```bash
# Build and launch all services in detached mode
pnpm docker:up

# Check container logs
pnpm docker:logs

# Tear down containers
pnpm docker:down
```

---

## 🧪 Testing, Linting & Type Checking

CodeSlot enforces strict type safety and quality standards across all packages:

```bash
# Run all unit and integration test suites
pnpm test

# Run TypeScript typecheck across all monorepo packages
pnpm typecheck

# Run linter across the entire codebase
pnpm lint

# Build production bundles for frontend and backend
pnpm build
```

---

## 📡 REST API Reference

The backend provides a structured RESTful API. Below are the primary endpoints:

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new candidate or recruiter account | None |
| `POST` | `/api/auth/login` | Authenticate with email & password, returns JWT | None |
| `POST` | `/api/auth/demo-login` | Instant demo login as Candidate, Recruiter, or Admin | None |
| `GET` | `/api/auth/profile` | Retrieve the authenticated user's profile | Bearer Token |
| `PATCH` | `/api/auth/profile` | Update profile fields (skills, headline, location, links) | Bearer Token |

### Jobs Portal (`/api/jobs`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Search, filter, and paginate remote jobs | Optional |
| `GET` | `/api/jobs/:id` | Fetch complete details for a specific job | None |
| `POST` | `/api/jobs` | Post a new job listing (recruiter / admin) | Bearer Token |
| `POST` | `/api/jobs/:id/save` | Toggle bookmark status for a target job | Bearer Token |
| `GET` | `/api/jobs/saved` | Retrieve all saved jobs for current user | Bearer Token |
| `POST` | `/api/jobs/:id/apply` | Submit application with tailored resume version & match score | Bearer Token |
| `GET` | `/api/jobs/applications`| List submitted applications for candidate | Bearer Token |

### AI Resume Studio (`/api/resume`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/resume/save` | Save a tailored resume draft to cloud storage | Bearer Token |
| `GET` | `/api/resume/mine` | Retrieve saved resumes for the authenticated user | Bearer Token |

### Admin & ATS Management (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Retrieve platform metrics (active jobs, candidates, applications) | Admin Only |
| `GET` | `/api/admin/applications`| View all candidate applications for Kanban / Table tracking | Admin Only |
| `PATCH`| `/api/admin/applications/:id/stage` | Update candidate stage (Screening, Interview, Offer, Rejected) | Admin Only |
| `GET` | `/api/admin/users` | List platform users with status and role badges | Admin Only |
| `GET` | `/api/admin/broadcast` | Fetch active system broadcast announcement | None |
| `POST` | `/api/admin/broadcast` | Publish a new platform broadcast announcement | Admin Only |

### System Health (`/api/health`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Comprehensive health check (uptime, memory, database connection) | None |

---

## 👨‍💻 Author & Academic Attribution

This project is submitted in fulfillment of the **INSA Final Project**:

- **Student Name**: **Hanifa Seid**
- **CTC Number**: **CTC-1646-26**
- **Institution**: **INSA** (Information Network Security Agency)
- **Project Presentation**: [▶️ Watch Loom Video Presentation](https://www.loom.com/share/814e303337b94c9fa9382ad39184c092)
- **Year**: 2026

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
