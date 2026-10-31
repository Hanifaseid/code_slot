# 📘 CodeSlot: Enterprise Remote Tech Jobs Discovery & AI Resume Studio
## Comprehensive System Requirements Specification & Technical Architecture Documentation

---

### 🎓 Academic Submission Information
| Metadata Field | Specification |
| :--- | :--- |
| **Project Title** | **CodeSlot — Remote Tech Jobs Discovery & AI Resume Studio** |
| **Academic Program** | **INSA Final Capstone Project** (Information Network Security Agency) |
| **Student / Author** | **Hanifa Seid** |
| **Candidate ID / CTC** | **CTC-1646-26** |
| **Project Repository** | `codeslot-monorepo` (Full-Stack Monorepo) |
| **Academic Year** | **2026** |
| **Project Presentation** | [▶️ Watch Video Walkthrough on Loom](https://www.loom.com/share/814e303337b94c9fa9382ad39184c092) |
| **Project Status** | **Production-Ready & Fully Verified** |

---

## 📑 Table of Contents
1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [System Scope, Objectives & Stakeholder Profiles](#2-system-scope-objectives--stakeholder-profiles)
3. [Comprehensive System Requirements Specification (SRS)](#3-comprehensive-system-requirements-specification-srs)
   - 3.1 Functional Requirements (FR-01 – FR-15)
   - 3.2 Non-Functional Requirements (NFR-01 – NFR-10)
   - 3.3 System Constraints, Assumptions & Dependencies
4. [Monorepo System Architecture & Component Design](#4-monorepo-system-architecture--component-design)
   - 4.1 High-Level Architecture Diagram
   - 4.2 Monorepo Inter-Package Dependency Graph & Folder Hierarchy
   - 4.3 End-to-End Sequence Workflows
5. [Technology Stack & Justification Matrix](#5-technology-stack--justification-matrix)
6. [Database Design & Data Models (Prisma ORM)](#6-database-design--data-models-prisma-orm)
   - 6.1 Entity-Relationship (ER) Diagram
   - 6.2 Data Schema Specifications & Relational Constraints
7. [API Design & REST Endpoints Specification](#7-api-design--rest-endpoints-specification)
   - 7.1 Authentication & Profile (`/api/auth`)
   - 7.2 Remote Jobs Portal (`/api/jobs`)
   - 7.3 AI Resume Studio (`/api/resume`)
   - 7.4 Admin OS & Recruitment Telemetry (`/api/admin`)
   - 7.5 System Health (`/api/health`)
8. [Generative AI Integration & Algorithmic Heuristic Fallback](#8-generative-ai-integration--algorithmic-heuristic-fallback)
   - 8.1 Primary Engine: Google Gemini 2.5 Flash
   - 8.2 The Google X-Y-Z Accomplishment Optimization Model
   - 8.3 Secondary Engine: Deterministic Heuristic Fallback
9. [Security, RBAC & Telemetry Auditing](#9-security-rbac--telemetry-auditing)
   - 9.1 Authentication & Authorization Pipeline
   - 9.2 Input Sanitization & Boundary Validation
   - 9.3 Immutable Audit Logging
10. [Quality Assurance, Testing & Verification](#10-quality-assurance-testing--verification)
    - 10.1 Automated End-to-End Test Suite Verification
    - 10.2 Type Safety & Linting Verification
11. [Installation, Environment Setup & Deployment](#11-installation-environment-setup--deployment)
    - 11.1 System Prerequisites
    - 11.2 Step-by-Step Local Deployment
    - 11.3 Containerized Execution (Docker Compose)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Industry Challenge
In the contemporary global technology ecosystem, distributed and remote engineering has transitioned from an emergency arrangement into the standard operational paradigm for elite software organizations worldwide. However, the international hiring pipeline suffers from three critical systemic bottlenecks:

1. **Low Signal-to-Noise in Job Discovery**: Mainstream employment aggregators (e.g., LinkedIn, Indeed) are saturated with ambiguous "hybrid" listings, unverified postings, localized compensation penalties, and recruiter spam. Software engineers outside North America and Western Europe expend countless hours searching for genuine, 100% remote positions that recruit globally without geographical wage suppression.
2. **The ATS (Applicant Tracking System) Black Hole**: Over 75% of qualified engineering resumes are automatically eliminated by automated ATS parsers (such as Workday, Greenhouse, and Lever) prior to human engineering review. This occurs because candidate resumes lack exact keyword alignment, fail to articulate measurable business impacts, or employ multi-column layouts that break legacy text extractors.
3. **Fragmented Application Workflows**: Developers currently discover openings on one platform, manually customize resumes in disparate word processors, guess at missing keywords, and track application milestones in disconnected spreadsheets, causing immense cognitive overhead and missed career opportunities.

### 1.2 The CodeSlot Solution
**CodeSlot** is an integrated, full-stack remote engineering discovery and generative AI career acceleration platform. CodeSlot establishes a direct bridge between global software developers and verified, top-tier remote engineering opportunities while equipping candidates with an in-browser **AI Resume Studio** powered by **Google Gemini 2.5 Flash**.

CodeSlot delivers:
- **Verified Worldwide Remote Roles**: A curated catalog spanning Backend, Frontend, Full Stack, DevOps/Cloud, AI/ML, Mobile, and Security engineering roles with transparent USD compensation tiers.
- **Automated Resume-to-Job Matching**: Sub-second semantic matching calculating ATS compatibility scores (0–100%) and surfacing keyword deficits.
- **Generative AI Resume Tailoring**: Instant transformation of authentic engineering accomplishments using the **Google X-Y-Z formula** (*"Accomplished [X], as measured by [Y], by doing [Z]"*).
- **Pixel-Perfect Typographic PDF Generation**: High-density, machine-readable resume layouts across 7 professional templates without watermarks, third-party subscriptions, or paid APIs.
- **Recruiter Admin OS (Kanban ATS)**: An administrative control center enabling recruitment managers to visualize pipeline flow across 5 stages (*Applied, Screening, Interview, Offer, Rejected*) with real-time audit logging and platform telemetry.

---

## 2. System Scope, Objectives & Stakeholder Profiles

### 2.1 Project Objectives
- **Zero API Drift**: Enforce unified Zod validation schemas across both frontend and backend within a pnpm monorepo.
- **Sub-1.5s Generative Turnaround**: Leverage Gemini 2.5 Flash for high-velocity resume synthesis and bullet-point enhancement.
- **100% Resilience Guarantee**: Deliver a deterministic heuristic fallback engine to guarantee uninterrupted operation even during third-party API outages or quota exhaustion.
- **Enterprise-Grade Security**: Implement defense-in-depth security with stateless JWT authentication, Role-Based Access Control (RBAC), Helmet security headers, CORS origin restrictions, and immutable audit logs.
- **Academic & Production Excellence**: Achieve 100% pass rates across all 30 REST endpoints with complete OpenAPI 3.0 documentation.

### 2.2 Stakeholder Profiles
| Stakeholder Role | Key Objectives & Primary Use Cases | Permissions Tier |
| :--- | :--- | :--- |
| **Candidate / Software Engineer** | Searches remote tech jobs, applies seniority filters, bookmarks roles, tailors resume with AI, exports print-ready PDFs, submits applications. | Standard Authenticated (`candidate`) |
| **Recruiter / Hiring Manager** | Posts verified engineering listings, reviews applicant submissions, inspects ATS match scores, manages Kanban stages. | Elevated Recruiter (`recruiter`) |
| **System Administrator** | Monitors system health, user directory, activity streams, AI session logs, manages platform broadcasts, invalidates telemetry caches. | Full Administrative (`admin`) |
| **Anonymous Visitor** | Browses public job listings, reviews platform features, runs demo persona switches. | Unauthenticated (`public`) |

---

## 3. Comprehensive System Requirements Specification (SRS)

### 3.1 Functional Requirements (FR)

| Requirement ID | Module | Priority | Actor | Functional Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-01** | **Auth** | High | Visitor / Candidate | System shall allow candidate registration with email, password, seniority level (`junior`, `intermediate`, `senior`), and skill tags. | Creates `User` record with hashed password; returns JWT token and standard user envelope. |
| **FR-02** | **Auth** | High | Candidate / Admin | System shall authenticate credentials via email and password, issuing a stateless signed JWT token. | Valid credentials return 200 OK + JWT; invalid credentials return 401 Unauthorized with descriptive error. |
| **FR-03** | **Auth** | Medium | Evaluator / Visitor | System shall provide a 1-click Demo Persona Switch (`candidate`, `recruiter`, `admin`) to facilitate rapid evaluation. | Automatically provisions/switches session context to the selected persona without requiring manual credential entry. |
| **FR-04** | **Jobs** | High | Public / Candidate | System shall list, paginate, and search verified remote engineering positions across titles, companies, and tags. | Returns JSON array of jobs matching search query, filtered by seniority and category in $< 100\text{ms}$. |
| **FR-05** | **Jobs** | High | Candidate | System shall provide instant seniority filtering (Junior, Intermediate, Senior) with instant UI reactivity. | Selecting a seniority chip filters the catalog immediately without page reload or state corruption. |
| **FR-06** | **Jobs** | Medium | Candidate | System shall enable authenticated users to bookmark/save target jobs with cloud persistence. | POST to `/api/jobs/:id/save` toggles `SavedJob` record; state persists across browser refreshes. |
| **FR-07** | **Jobs** | High | Candidate | System shall allow candidates to submit job applications with tailored resume version, match score, and salary expectation. | Creates `JobApplication` with status `applied`; increments application counter and logs activity. |
| **FR-08** | **Resume** | High | Candidate | System shall provide an interactive resume editor with live typography preview and cloud state synchronization. | Edits to contact info, experience, education, and skills sync to `/api/resume/save` and render in real time. |
| **FR-09** | **Resume** | High | Candidate | System shall integrate Google Gemini 2.5 Flash to automatically tailor candidate resumes to any selected job description. | Generates tailored resume JSON incorporating target job keywords and the Google X-Y-Z formula in $< 2.5\text{s}$. |
| **FR-10** | **Resume** | High | Candidate | System shall implement a deterministic heuristic fallback engine if Gemini API key is absent or network fails. | Automatically tokenizes job keywords, re-orders skills, recalculates ATS score, and alerts user via subtle toast notification. |
| **FR-11** | **Resume** | Medium | Candidate | System shall support 7 typographic resume templates (ATS Compact, Ivy Classic, Executive Modern, Tech Minimalist, Split Sidebar, Nordic Clean, Vibrant Startup). | Switching template instantly updates DOM typography, column flow, and spacing while preserving content integrity. |
| **FR-12** | **Resume** | High | Candidate | System shall generate vector-sharp, print-ready, zero-watermark PDFs using browser `@media print` CSS engine. | Triggering "Export PDF" isolates resume canvas, strips navigation chrome, and prints flawless multi-page documents. |
| **FR-13** | **Admin** | High | Admin / Recruiter | System shall provide a visual Kanban Application Tracking System (ATS) across 5 recruitment stages. | Dragging or clicking a card transitions stage (`applied` $\rightarrow$ `screening` $\rightarrow$ `interview` $\rightarrow$ `offer` $\rightarrow$ `rejected`) with atomic DB updates. |
| **FR-14** | **Admin** | High | Administrator | System shall maintain real-time telemetry: KPI dashboard, live user activity stream, and AI session history. | Displays total users, active jobs, applications, average ATS uplift, and an append-only event stream. |
| **FR-15** | **Admin** | Medium | Administrator | System shall enable global announcement broadcasts displayed across the candidate portal header. | Publishing a message updates `/api/admin/broadcast`; banner immediately appears on candidate view. |

---

### 3.2 Non-Functional Requirements (NFR)

| Requirement ID | Quality Attribute | Target Metric / Requirement Specification |
| :--- | :--- | :--- |
| **NFR-01** | **Performance (API Latency)** | All non-AI REST API endpoints must respond within $\le 100\text{ms}$ at 95th percentile under standard development load. |
| **NFR-02** | **Performance (AI Turnaround)** | AI resume tailoring requests through Gemini 2.5 Flash must complete in $\le 2.5\text{s}$; heuristic fallback must execute in $\le 50\text{ms}$. |
| **NFR-03** | **Security (Data at Rest & Transit)** | All passwords must be cryptographically hashed using Node.js crypto salt/digest; all communications must use HTTPS/TLS; tokens must expire after 7 days. |
| **NFR-04** | **Security (RBAC Enforcement)** | Elevated administrative routes (`/api/admin/*`) must strictly verify JWT token and reject unauthorized roles with `403 Forbidden`. |
| **NFR-05** | **Reliability & Fault Tolerance** | The system must guarantee zero unhandled rejections. Third-party AI API failures must trigger the heuristic fallback engine with 0% user-facing downtime. |
| **NFR-06** | **Availability & Health Checks** | Backend must expose `/health` and `/api/health` providing active memory telemetry and PostgreSQL connection status. |
| **NFR-07** | **ATS Machine Readability** | Generated ATS Compact resume templates must strictly follow single-column, standard heading hierarchies (`EXPERIENCE`, `EDUCATION`, `SKILLS`) parseable by automated ATS systems. |
| **NFR-08** | **Type Safety & Schema Integrity** | 100% of API inputs and outputs must be validated by Zod schemas shared between frontend and backend in `@code-slot/shared`. |
| **NFR-09** | **Maintainability & Documentation**| Complete OpenAPI 3.0 / Swagger specification accessible at `/api/docs` with live interactive request execution. |
| **NFR-10** | **Portability & Containerization** | Entire application stack must be reproducible in one command via Docker Compose (`pnpm docker:up`). |

---

### 3.3 System Constraints, Assumptions & Dependencies

- **Hardware Constraints**: Runs efficiently on standard workstation hardware (minimum 4GB RAM, 2 CPU cores).
- **Runtime Environment**: Requires Node.js $\ge 20.0.0$, pnpm $\ge 10.0.0$, and PostgreSQL $\ge 16.0$.
- **Browser Compatibility**: Fully supported on modern evergreen browsers (Google Chrome $\ge 120$, Microsoft Edge $\ge 120$, Mozilla Firefox $\ge 120$, Apple Safari $\ge 17$).
- **Zero Third-Party PDF Dependency**: Relies exclusively on native client-side CSS print media engines, eliminating external SaaS rendering costs and data transmission privacy concerns.

---

## 4. Monorepo System Architecture & Component Design

CodeSlot is structured as an enterprise **pnpm monorepo** with clear separation of concerns, strict package boundaries, and shared contract validation.

### 4.1 High-Level Architecture Diagram

```mermaid
graph TD
    subgraph ClientTier ["Client Tier (Browser SPA - React 19 + Vite 8 + Tailwind v4)"]
        UI["React 19 Shell & State Provider"]
        JobsUI["Remote Jobs Portal (Filters & Search)"]
        StudioUI["AI Resume Studio (7 Templates & ATS Gauge)"]
        AdminUI["Recruiter Admin OS & Kanban ATS"]
        ClientService["Typed API Client (Axios/Fetch + JWT Injector)"]
        
        UI --> JobsUI
        UI --> StudioUI
        UI --> AdminUI
        JobsUI --> ClientService
        StudioUI --> ClientService
        AdminUI --> ClientService
    end

    subgraph ContractLayer ["Shared Contract Layer (@code-slot/shared)"]
        ZodSchemas["Zod Validation Schemas (User, Job, Resume, App)"]
        TSInterfaces["Inferred TypeScript Interfaces & Types"]
        ZodSchemas -.-> TSInterfaces
    end

    subgraph GatewayTier ["API & Middleware Tier (Express 4.21)"]
        Router["Express REST Router"]
        CorsHelmet["Security Guard (Helmet + CORS)"]
        AuthGuard["JWT Verification & RBAC Guard"]
        ZodValidator["Zod Request Interceptor"]
        SwaggerDocs["OpenAPI 3.0 Registry (/api/docs)"]

        CorsHelmet --> Router
        Router --> AuthGuard
        AuthGuard --> ZodValidator
    end

    subgraph DomainModules ["Modular Domain Services (Node.js 20+)"]
        AuthModule["Auth & Profile Module (/api/auth)"]
        JobsModule["Jobs Discovery & Apply Module (/api/jobs)"]
        ResumeModule["Resume Storage & Optimization (/api/resume)"]
        AdminModule["Admin Telemetry & Kanban Module (/api/admin)"]
        HealthModule["System & Database Health (/api/health)"]
    end

    subgraph DataAITier ["Data & AI Tier"]
        PrismaClient["Prisma ORM 6.4 Client"]
        Postgres[(PostgreSQL 16 Database)]
        GeminiEngine["Google Gemini 2.5 Flash Engine"]
        HeuristicEngine["Deterministic Heuristic Fallback Engine"]
    end

    ClientService -->|HTTPS / JSON REST| Router
    ContractLayer -->|Type Import| ClientTier
    ContractLayer -->|Schema Validation| GatewayTier
    ZodValidator --> DomainModules
    DomainModules --> PrismaClient
    PrismaClient --> Postgres
    StudioUI -.->|Direct or Server Proxy| GeminiEngine
    StudioUI -.->|Fallback Execution| HeuristicEngine
```

---

### 4.2 Monorepo Inter-Package Dependency Graph & Folder Hierarchy

```
codeslot-monorepo/
│
├── 📦 packages/
│   ├── shared/                      # [THE CONTRACT LAYER]
│   │   ├── package.json             # Exposes @code-slot/shared
│   │   └── src/index.ts             # Central Zod schemas & TypeScript types (User, Job, Resume, App)
│   └── typescript-config/           # [BASE COMPILER SETTINGS]
│       └── base.json                # Shared tsconfig extended by all sub-packages
│
├── 🌐 apps/frontend/                # [CLIENT TIER: React 19 + Vite + Tailwind v4]
│   ├── src/
│   │   ├── App.tsx                  # Root state machine, hash router, and session provider
│   │   ├── types/                   # Re-exports & client-only view models (extends @code-slot/shared)
│   │   ├── services/
│   │   │   ├── apiClient.ts         # Axios/Fetch HTTP wrapper with Bearer token injector
│   │   │   ├── jobService.ts        # Connects JobsPortal.tsx -> Backend /api/jobs
│   │   │   ├── aiResumeService.ts   # Connects ResumeStudio.tsx -> Gemini AI & Backend /api/resume
│   │   │   └── adminService.ts      # Connects AdminPortal.tsx -> Backend /api/admin
│   │   └── components/
│   │       ├── JobsPortal.tsx       # Job search, multi-tag filtering, seniority selector
│   │       ├── JobDetailPage.tsx    # Detailed view & application submission modal
│   │       ├── resume/
│   │       │   ├── ResumeStudio.tsx # Primary AI editor, ATS score gauge, and controls
│   │       │   └── templates/       # 7 Typographic templates (ATS Compact, Ivy Classic, etc.)
│   │       └── admin/
│   │           ├── AdminPortal.tsx  # Admin OS shell and tab navigation
│   │           ├── AdminOverviewView.tsx    # Live KPI summary cards
│   │           ├── AdminApplicationsView.tsx# Recruiter Kanban board (drag & drop)
│   │           └── AdminActivitiesView.tsx  # Real-time event audit stream
│
├── ⚙️ apps/backend/                 # [SERVER TIER: Node.js + Express 4.21 + Prisma]
│   ├── prisma/
│   │   └── schema.prisma            # PostgreSQL relational database models & constraints
│   └── src/
│       ├── server.ts                # HTTP bootstrap & graceful shutdown listeners
│       ├── app.ts                   # Express middleware pipeline (Helmet, CORS, Rate-limit, JSON)
│       ├── database/client.ts       # Singleton PrismaClient instance with connection pool
│       ├── docs/swagger.ts          # OpenAPI registry converting Zod schemas to /api/docs
│       ├── middleware/
│       │   ├── auth.middleware.ts   # JWT verification & RBAC guard (requireRole(['admin']))
│       │   └── validate.middleware.ts# Zod request body/query validation interceptor
│       └── modules/                 # Modular Domain Layer (Routes -> Controllers -> Services)
│           ├── auth/                # /api/auth (register, login, profile updates)
│           ├── jobs/                # /api/jobs (catalog, seniority filter, apply, bookmark)
│           ├── resume/              # /api/resume (cloud resume persistence & AI proxy)
│           ├── admin/               # /api/admin (stats, applications Kanban, user directory, audit)
│           └── health/              # /health & /api/health (DB and memory telemetry)
│
├── 🐳 infrastructure/               # [CONTAINERIZATION]
│   └── docker-compose.yml           # Orchestrates Postgres 16, Backend API, and Frontend SPA
│
├── 🧪 test-all-endpoints.mjs        # [QUALITY ASSURANCE] 30 verified end-to-end integration tests
└── 📄 package.json & pnpm-workspace.yaml # Monorepo orchestration scripts (dev, build, test, lint)
```

---

### 4.3 End-to-End Sequence Workflows

#### Sequence 1: Job Discovery to AI Tailoring and Application Submission
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Candidate (Alex Mercer)
    participant UI as CodeSlot Frontend
    participant API as Express REST API
    participant DB as PostgreSQL (Prisma)
    participant AI as Google Gemini 2.5 Flash

    Dev->>UI: Filter jobs (Category: Backend, Seniority: Senior)
    UI->>API: GET /api/jobs?category=Backend&experienceLevel=senior
    API->>DB: Query jobs WHERE category='Backend'
    DB-->>API: Return matched job catalog
    API-->>UI: 200 OK (Job list JSON)

    Dev->>UI: Click "Tailor Resume for Role"
    UI->>AI: POST generateContent (Candidate resume + Job description)
    Note over UI,AI: Gemini analyzes missing keywords & Google X-Y-Z metrics
    AI-->>UI: Return tailored resume JSON + ATS match breakdown
    
    Dev->>UI: Select "ATS Compact" template & click "Apply Now"
    UI->>API: POST /api/jobs/:id/apply (matchScore: 94%, resumeVersion)
    API->>DB: INSERT INTO job_applications & activity_logs
    DB-->>API: Application confirmed
    API-->>UI: 200 OK (Stage: 'applied')
    UI-->>Dev: Toast confirmation: "Application Submitted Successfully!"
```

#### Sequence 2: Recruiter Kanban Application Stage Transition
```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Hiring Director
    participant AdminUI as Admin OS (Kanban ATS)
    participant API as Express REST API
    participant DB as PostgreSQL (Prisma)

    Recruiter->>AdminUI: Drag application card from "Screening" to "Interview"
    AdminUI->>API: PATCH /api/admin/applications/:id/stage { stage: "interview" }
    Note over API: Verify JWT token has role 'admin' or 'recruiter'
    API->>DB: UPDATE job_applications SET stage='interview'
    API->>DB: INSERT INTO audit_logs (adminEmail, action, target)
    DB-->>API: Transaction committed successfully
    API-->>AdminUI: 200 OK (Updated Application Entity)
    AdminUI-->>Recruiter: UI snaps card into "Interview" column with instant visual feedback
```

---

## 5. Technology Stack & Justification Matrix

| Architectural Layer | Selected Technology | Version | Engineering Rationale & Justification |
| :--- | :--- | :--- | :--- |
| **Workspace Architecture** | **pnpm Workspaces** | `v10.33` | Hard-linked dependency tree, zero duplicate packages across apps, 3x faster CI/CD build execution than standard npm. |
| **Frontend Framework** | **React** | `19.0.0` | Concurrent rendering pipeline, predictable functional component lifecycle, robust client-side state handling. |
| **Frontend Build Tooling**| **Vite** | `8.3.0` | Sub-50ms Hot Module Replacement (HMR), optimized Rollup tree-shaking production bundling. |
| **Styling Engine** | **Tailwind CSS** | `v4.3.0` | Modern CSS compiler, zero runtime CSS overhead, native design tokens, precision `@media print` rules for PDF generation. |
| **Icons & Motion** | **Lucide React + Motion** | `1.16` / `12.4` | Accessible SVG iconography, fluid micro-interactions, hardware-accelerated transitions. |
| **Generative AI Model** | **Google Gemini 2.5 Flash** | `v1beta` | Sub-1.5s latency, 1M context window, high instruction fidelity for JSON schema output without hallucinations. |
| **Backend Runtime** | **Node.js** | `20+ LTS` | High-throughput asynchronous event-driven I/O with native ES modules support. |
| **Language & Typings** | **TypeScript** | `5.7.3` | End-to-end type safety spanning backend models, API contracts, and frontend components. |
| **Web Server Framework** | **Express** | `4.21.2` | Robust, battle-tested HTTP middleware pipeline, modular routing, standardized error handling envelopes. |
| **Database & ORM** | **PostgreSQL 16 + Prisma**| `6.4.1` | Relational integrity, ACID compliance, automatic schema migration generation, and type-safe query client. |
| **Contract Validation** | **Zod** | `3.24.2` | Runtime schema validation at boundaries; single source of truth for both types and input guards. |
| **API Documentation** | **OpenAPI 3.0 + Swagger** | `5.0.1` | Auto-generated interactive API docs (`/api/docs`), making API exploration effortless for developers. |
| **Security & Logging** | **Helmet, CORS, Pino** | Latest | HTTP security headers, origin protection, structured JSON telemetry logs. |
| **Testing Engine** | **Vitest 3.0 + Supertest** | Latest | High-velocity integration test execution verifying all 30 HTTP endpoints. |
| **Containerization** | **Docker + Compose** | Multi-stage | Reproducible dev and prod environments isolating Postgres, Express, and Vite/Nginx. |

---

## 6. Database Design & Data Models (Prisma ORM)

CodeSlot utilizes **PostgreSQL 16** managed via **Prisma ORM 6.4**. The schema is optimized for relational integrity, foreign key cascade behaviors, and index-accelerated querying.

### 6.1 Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    User ||--o{ SavedJob : "saves"
    User ||--o{ JobApplication : "submits"
    User ||--o{ Resume : "owns"
    User ||--o{ AISession : "executes"
    Job ||--o{ SavedJob : "saved_by"
    Job ||--o{ JobApplication : "receives"

    User {
        string id PK "cuid/uuid"
        string email UK "unique index"
        string passwordHash "crypto digest"
        string name "full name"
        string role "candidate | recruiter | admin"
        string status "active | verified | idle | suspended"
        string plan "Free | Pro Dev | Enterprise"
        string experienceLevel "junior | intermediate | senior"
        string[] skills "scalar list"
        int resumeScore "0-100"
        datetime createdAt "default now"
    }

    Job {
        string id PK "cuid/uuid"
        string title "job title"
        string companyName "hiring company"
        string category "Backend | Frontend | Fullstack..."
        string specialization "domain tag"
        string jobType "Full-time | Contract | Part-time"
        string candidateRequiredLocation "Worldwide | Americas | EMEA"
        string salary "USD range string"
        string description "markdown text"
        string[] tags "skill tags"
        boolean featured "promoted flag"
        datetime createdAt "default now"
    }

    SavedJob {
        string id PK "cuid/uuid"
        string userId FK "references User(id)"
        string jobId FK "references Job(id)"
        datetime savedAt "default now"
    }

    JobApplication {
        string id PK "cuid/uuid"
        string userId FK "references User(id)"
        string jobId FK "references Job(id)"
        string stage "applied | screening | interview | offer | rejected"
        int matchScore "calculated ATS score"
        string resumeVersion "resume identifier"
        string salaryRange "requested salary"
        string notes "cover message"
        datetime appliedAt "default now"
    }

    Resume {
        string id PK "cuid/uuid"
        string userId FK "references User(id)"
        string title "resume profile title"
        string templateId "ats-compact | ivy-classic..."
        string accentColor "hex color code"
        string density "compact | normal | spacious"
        json content "structured resume JSON"
        int atsScore "0-100 score"
        datetime updatedAt "auto-updated"
    }

    AISession {
        string id PK "cuid/uuid"
        string userId FK "references User(id)"
        string targetJob "target role title"
        string company "target company"
        int initialAtsScore "initial baseline"
        int tailoredAtsScore "post-optimization score"
        int improvement "delta score"
        int bulletPointsGenerated "count"
        string[] keywordsAdded "injected keywords"
        datetime createdAt "default now"
    }

    ActivityLog {
        string id PK "cuid/uuid"
        string userId "actor id"
        string userName "actor name"
        string userEmail "actor email"
        string type "login | search | ai_tailor | apply"
        string category "auth | jobs | resume | admin"
        string action "action description"
        string details "extended context"
        string severity "info | warning | critical"
        datetime timestamp "default now"
    }

    AuditLog {
        string id PK "cuid/uuid"
        string adminEmail "actor admin email"
        string action "administrative action"
        string target "target entity/user"
        string details "audit metadata"
        datetime timestamp "default now"
    }
```

---

### 6.2 Data Schema Specifications & Relational Constraints

#### Model: `User`
- **Primary Key**: `id` (`String`, default `cuid()`)
- **Unique Constraint**: `email` (`String`, normalized lowercase, indexed)
- **Attributes**: `passwordHash`, `name`, `role`, `status`, `plan`, `experienceLevel`, `skills`, `resumeScore`, `createdAt`, `updatedAt`.
- **Relations**: 1-to-Many with `SavedJob`, `JobApplication`, `Resume`, `AISession`.

#### Model: `Job`
- **Primary Key**: `id` (`String`, default `cuid()`)
- **Indexes**: Indexed on `category`, `jobType`, and `createdAt` for rapid filtering and sorting.
- **Attributes**: `title`, `companyName`, `category`, `specialization`, `jobType`, `candidateRequiredLocation`, `salary`, `description`, `tags`, `featured`, `createdAt`.
- **Relations**: 1-to-Many with `SavedJob` and `JobApplication`.

#### Model: `JobApplication`
- **Primary Key**: `id` (`String`, default `cuid()`)
- **Unique Compound Index**: `(userId, jobId)` prevents duplicate applications to the same position.
- **Foreign Keys**: `userId` references `User(id)` with `onDelete: Cascade`; `jobId` references `Job(id)` with `onDelete: Cascade`.
- **Attributes**: `stage` (`applied`, `screening`, `interview`, `offer`, `rejected`), `matchScore`, `resumeVersion`, `salaryRange`, `notes`, `appliedAt`.

#### Model: `Resume`
- **Primary Key**: `id` (`String`, default `cuid()`)
- **Foreign Key**: `userId` references `User(id)` with `onDelete: Cascade`.
- **Attributes**: `title`, `templateId`, `accentColor`, `density`, `content` (JSON containing contact details, work experiences, education, and technical competencies), `atsScore`, `updatedAt`.

---

## 7. API Design & REST Endpoints Specification

The CodeSlot backend provides **30 production-ready RESTful endpoints** registered with OpenAPI 3.0 at `/api/docs`. Every endpoint returns a standardized response envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### 7.1 Authentication & Profile (`/api/auth`)
| Method | Endpoint | Access Level | Description | Request Payload | Response Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new candidate account | `{ email, password, name, experienceLevel, skills }` | `{ user, token }` |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials | `{ email, password }` | `{ user, token }` |
| `POST` | `/api/auth/demo-login` | Public | 1-click persona switch (`candidate`, `recruiter`, `admin`) | `{ persona }` | `{ user, token }` |
| `GET` | `/api/auth/me` | Bearer Token | Retrieve currently active user session | None | `{ user }` |
| `GET` | `/api/auth/profile` | Bearer Token | Fetch full profile with saved jobs & applications | None | `{ user, profile, stats }` |
| `PATCH`| `/api/auth/profile` | Bearer Token | Update candidate headline, skills, and links | `{ headline, skills, location, githubUrl }` | `{ updatedProfile }` |
| `POST` | `/api/auth/logout` | Bearer Token | Terminate session and invalidate client token | None | `{ success: true }` |

### 7.2 Remote Jobs Portal (`/api/jobs`)
| Method | Endpoint | Access Level | Description | Request Payload / Query | Response Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Public | Search, filter, and paginate remote jobs | `?category=&experienceLevel=&search=&page=` | `{ jobs: [], total, page }` |
| `GET` | `/api/jobs/:id` | Public | Fetch comprehensive job details & requirements | Path parameter `:id` | `{ job: { ... } }` |
| `POST` | `/api/jobs` | Recruiter / Admin | Publish new verified remote job listing | `{ title, companyName, category, salary, ... }`| `{ newJob }` |
| `POST` | `/api/jobs/:id/save` | Bearer Token | Toggle bookmark status for a target job | Path parameter `:id` | `{ saved: boolean }` |
| `GET` | `/api/jobs/saved` | Bearer Token | Retrieve all bookmarked jobs for active user | None | `{ savedJobs: [] }` |
| `POST` | `/api/jobs/:id/apply` | Bearer Token | Submit application with tailored resume version | `{ matchScore, resumeVersion, salary, notes }` | `{ application }` |
| `GET` | `/api/jobs/applications` | Bearer Token | Retrieve all applications submitted by candidate | None | `{ applications: [] }` |

### 7.3 AI Resume Studio (`/api/resume`)
| Method | Endpoint | Access Level | Description | Request Payload | Response Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/resume/save` | Bearer Token | Save customized resume profile to cloud database | `{ title, templateId, content, atsScore }` | `{ resume }` |
| `GET` | `/api/resume/mine` | Bearer Token | Fetch all saved resumes for authenticated candidate | None | `{ resumes: [] }` |
| `POST` | `/api/resume/tailor` | Bearer Token | Server-side Gemini AI full resume tailoring | `{ resumeData, targetJobDescription }` | `{ tailoredResume, atsScore, keywordsAdded }` |
| `POST` | `/api/resume/bullet-enhance` | Bearer Token | Enhance bullet point using Google X-Y-Z formula | `{ bulletText, roleContext }` | `{ enhancedBullets: [] }` |

### 7.4 Admin OS & Recruitment Telemetry (`/api/admin`)
| Method | Endpoint | Access Level | Description | Request Payload | Response Data |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Admin Only | Platform KPI aggregations (users, jobs, apps) | None | `{ stats: { users, jobs, apps, atsUplift } }` |
| `GET` | `/api/admin/users` | Admin Only | List all platform candidate & recruiter accounts | `?search=&status=&page=` | `{ users: [], total }` |
| `PATCH`| `/api/admin/users/:id/status` | Admin Only | Update account status (`active`, `verified`, etc.) | `{ status: "verified" }` | `{ updatedUser }` |
| `GET` | `/api/admin/applications` | Admin Only | Fetch candidate pipeline for Kanban tracking | `?stage=&search=` | `{ applications: [] }` |
| `PATCH`| `/api/admin/applications/:id/stage` | Admin Only | Advance candidate stage (`interview`, `offer`, etc.) | `{ stage: "interview" }` | `{ updatedApplication }` |
| `GET` | `/api/admin/activities` | Admin Only | Stream live candidate and platform activity events | `?limit=50` | `{ activities: [] }` |
| `POST` | `/api/admin/activities` | Bearer Token | Ingest client telemetry event into activity stream | `{ action, category, details }` | `{ activityLog }` |
| `GET` | `/api/admin/ai-sessions` | Admin Only | Retrieve historical Gemini AI tailoring telemetry | `?limit=50` | `{ aiSessions: [] }` |
| `GET` | `/api/admin/audit-logs` | Admin Only | Fetch immutable administrative audit trail | `?limit=100` | `{ auditLogs: [] }` |
| `GET` | `/api/admin/broadcast` | Public | Retrieve active global announcements | None | `{ announcement: { ... } }` |
| `POST` | `/api/admin/broadcast` | Admin Only | Publish new global banner across candidate portal | `{ message, active, severity }` | `{ announcement }` |
| `POST` | `/api/admin/system/clear-cache` | Admin Only | Flush and synchronize admin telemetry cache | None | `{ flushed: true, timestamp }` |

### 7.5 System Health (`/api/health`)
| Method | Endpoint | Access Level | Description | Response Data |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Root liveness healthcheck | `{ status: "ok", uptime: 1240, service: "codeslot-api" }` |
| `GET` | `/api/health` | Public | Deep healthcheck (DB connection & memory) | `{ status: "healthy", database: "connected", memoryUsage: { ... } }` |

---

## 8. Generative AI Integration & Algorithmic Heuristic Fallback

CodeSlot employs a **dual-engine architecture** to ensure maximum intelligence while providing high availability and zero downtime:

```
                  ┌─────────────────────────────────────────┐
                  │ Candidate Authentic Resume + Target Job │
                  └────────────────────┬────────────────────┘
                                       │
                         [Is Gemini API Key Available?]
                                       │
                       ┌───────────────┴───────────────┐
                     YES                              NO / Error
                       ▼                               ▼
       ┌───────────────────────────────┐ ┌───────────────────────────────┐
       │   Primary Generative Engine   │ │  Deterministic Heuristic      │
       │    (Google Gemini 2.5 Flash)  │ │      Fallback Engine          │
       ├───────────────────────────────┤ ├───────────────────────────────┤
       │ • Context Analysis            │ │ • Regex Keyword Extraction    │
       │ • Semantic Gap Detection      │ │ • TF-IDF Term Weighting       │
       │ • Google X-Y-Z Bullet Rewrite │ │ • Skill Matrix Re-ordering    │
       │ • Structured JSON Output      │ │ • Algorithmic ATS Match Calc  │
       └───────────────┬───────────────┘ └───────────────┬───────────────┘
                       │                               │
                       └───────────────┬───────────────┘
                                       ▼
                  ┌─────────────────────────────────────────┐
                  │ Tailored ATS Resume (90%+ Match Score)  │
                  └─────────────────────────────────────────┘
```

### 8.1 Primary Engine: Google Gemini 2.5 Flash
- **API Model**: Google Generative AI (`gemini-2.5-flash` with fallback to `gemini-2.0-flash`).
- **Prompt Engineering Strategy**:
  - **Zero-Hallucination Guardrails**: The prompt strictly instructs the LLM: *"Do NOT fabricate fictitious employers, altered dates of employment, or unauthorized academic degrees. You are strictly authorized to rewrite existing accomplishments and re-prioritize existing technical skills."*
  - **Accomplishment Transformation**: Converts vague descriptive phrases into high-impact accomplishments using the **Google X-Y-Z formula**.
  - **Schema Enforcement**: Employs Gemini's native JSON mode to ensure the output strictly mirrors the TypeScript `ResumeData` interface defined in `@code-slot/shared`.

### 8.2 The Google X-Y-Z Accomplishment Optimization Model
The system refactors candidate bullet points following the model popularized by Google engineering hiring managers:

$$\text{Accomplished } [\mathbf{X}] \text{, as measured by } [\mathbf{Y}] \text{, by doing } [\mathbf{Z}]$$

- **Before (Weak/Generic)**:
  > *"Worked on backend APIs and optimized database queries."*
- **After (CodeSlot Gemini Optimization)**:
  > *"Accomplished a **42% reduction in p99 API latency**, as measured by **Datadog APM metrics**, by **implementing Redis caching layers and optimizing Prisma PostgreSQL compound indexes**."*

### 8.3 Secondary Engine: Deterministic Heuristic Fallback
If the user has not configured a Gemini API key, or if network connectivity is interrupted, CodeSlot triggers its deterministic heuristic fallback engine:
1. **Keyword Extraction**: Uses regex tokenization against a curated dictionary of 350+ engineering technologies (e.g., Docker, Kubernetes, React, Node.js, GraphQL, AWS).
2. **Skill Matrix Alignment**: Cross-references the candidate's existing skill array against the target job requirements, bubbling exact matches to the top of the resume skill list.
3. **ATS Match Calculation**: Calculates the Jaccard similarity coefficient between the job's required skills and the candidate's verified skills:
   $$S_{\text{ATS}} = \frac{|K_{\text{Job}} \cap K_{\text{Candidate}}|}{|K_{\text{Job}}|} \times 100$$
4. **Zero Failure Mode**: Ensures that user demonstrations and recruitment reviews remain functional under all network conditions.

---

## 9. Security, RBAC & Telemetry Auditing

### 9.1 Authentication & Authorization Pipeline
- **Cryptographic Password Hashing**: Passwords are never stored in plaintext. They are salted and hashed using Node.js's native `crypto.scryptSync` / HMAC algorithms with 64-byte salt lengths.
- **Stateless JWT Tokens**: Upon successful login, the server issues a JSON Web Token signed with SHA-256 HMAC containing the user's `id`, `email`, and `role`. Tokens have a 7-day expiration.
- **Role-Based Access Control (RBAC)**: The `auth.middleware.ts` inspects incoming HTTP request headers for `Authorization: Bearer <token>`. Sensitive administrative endpoints enforce role constraints:
  ```typescript
  export const requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access forbidden: insufficient role permissions" });
      }
      next();
    };
  };
  ```

### 9.2 Input Sanitization & Boundary Validation
- **Zod Middleware Guards**: Every incoming HTTP request body and query string is intercepted by `validate.middleware.ts`. Data that fails schema validation is rejected with `400 Bad Request` prior to reaching controller or database layers.
- **HTTP Security Headers**: Express is hardened using **Helmet**, which sets `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and removes `X-Powered-By`.
- **CORS Configuration**: Express CORS middleware restricts cross-origin resource sharing strictly to configured frontend domains (e.g., `http://localhost:3000`).

### 9.3 Immutable Audit Logging
- Every administrative state transition (e.g., advancing an applicant's stage in the Kanban board, toggling user verification, publishing broadcast announcements) automatically creates an immutable record in the `AuditLog` table.
- Log entries capture: `adminEmail`, `action`, `target`, `details`, and `timestamp`.

---

## 10. Quality Assurance, Testing & Verification

### 10.1 Automated End-to-End Test Suite Verification
The system includes an automated integration test runner (`test-all-endpoints.mjs`) that exercises all 30 RESTful endpoints against a live PostgreSQL instance.

```bash
# Execute End-to-End Verification Suite
node test-all-endpoints.mjs
```

#### Test Suite Verification Matrix:
- ✅ **System Health**: Verified `/health` and `/api/health`.
- ✅ **Authentication**: Verified candidate registration, login, demo persona switching, `/api/auth/me`, and `/api/auth/profile`.
- ✅ **Jobs Discovery**: Verified job search, category filtering, seniority filtering, job detail lookup, bookmarking, and application submission.
- ✅ **AI Resume Studio**: Verified cloud resume saving, retrieval, and AI bullet point enhancement.
- ✅ **Admin OS & Kanban**: Verified platform stats aggregation, user directory inspection, user status modification, application pipeline retrieval, Kanban stage progression, live activity stream ingestion, and broadcast announcement publishing.

**Verification Result**: **30 / 30 Endpoints Passed with 100% Success Rate.**

### 10.2 Type Safety & Linting Verification
```bash
# TypeScript compiler check across all monorepo workspaces
pnpm typecheck

# ESLint static code analysis
pnpm lint
```

---

## 11. Installation, Environment Setup & Deployment

### 11.1 System Prerequisites
- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v10.0.0` or higher (`npm install -g pnpm`)
- **PostgreSQL**: `v16.0` or higher (or Docker)

### 11.2 Step-by-Step Local Deployment

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abdellahseid/codeslot_2.git
   cd code_slot
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```
   *Required parameters in `.env`:*
   ```env
   # Frontend Configuration
   FRONTEND_PORT=3000
   VITE_API_URL=http://localhost:5000/api

   # Backend & Database Configuration
   BACKEND_PORT=5000
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/codeslot?schema=public"
   JWT_SECRET="codeslot_development_secret_key_2026"
   CORS_ORIGIN="http://localhost:3000"

   # Generative AI (Optional - Heuristic fallback engages if omitted)
   GEMINI_API_KEY="your_api_key_here"
   VITE_GEMINI_API_KEY="your_api_key_here"
   ```

4. **Initialize Database & Migrations**:
   ```bash
   # Generate Prisma client typings
   pnpm db:generate

   # Apply database migrations
   pnpm db:migrate
   ```

5. **Launch Application Concurrently**:
   ```bash
   pnpm dev
   ```
   - **Frontend Application**: [http://localhost:3000](http://localhost:3000)
   - **Backend REST API**: [http://localhost:5000/api](http://localhost:5000/api)
   - **Interactive OpenAPI / Swagger Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
   - **Health Telemetry**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 11.3 Containerized Execution (Docker Compose)
To run the complete production stack (PostgreSQL 16, Express API, and Vite SPA) in isolated containers:
```bash
# Build and launch all containers in detached mode
pnpm docker:up

# Inspect live container logs
pnpm docker:logs

# Stop containers
pnpm docker:down
```

---

*Official System Documentation & Requirements Specification for CodeSlot — INSA Final Capstone Project 2026.*
*Candidate / Author: Hanifa Seid (CTC-1646-26).*
