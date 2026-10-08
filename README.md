<div align="center">

# ⚡ CodeSlot
### Remote Tech Jobs & AI Resume Studio

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini 2.5](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75FF?logo=google-gemini&logoColor=white)](https://ai.google.dev/)

</div>

**CodeSlot** is a modern web application for software engineers, developers, and tech professionals seeking 100% remote positions worldwide. It seamlessly combines a real-time remote job discovery portal with an integrated **AI Resume Studio** powered by **Google Gemini 2.5 Flash** to tailor resumes to specific job listings, optimize ATS match scores, generate multi-style resume templates, and export print-ready PDFs.

---

## 🌟 Key Features

### 💼 Remote Tech Job Board
- **Curated Remote Roles**: Explore software engineering, AI/ML, backend, frontend, full-stack, DevOps/infrastructure, mobile, and data positions worldwide.
- **Advanced Job Filtering**: Search and filter by role category, experience level (Junior, Mid, Senior, Staff/Lead), timezone/region (Global, Americas, EMEA, APAC, LATAM), and tech stack keywords.
- **Saved Jobs & Bookmarking**: Save target job postings locally for later review and single-click resume tailoring.
- **Comprehensive Job Insights**: Detailed job descriptions, compensation ranges, tech stack tags, candidate requirements, and direct application links.

### 📄 AI Resume Studio (Powered by Gemini 2.5 Flash)
- **Instant AI Resume Tailoring**: Automatically re-aligns professional summaries, work experience bullet points, and skills to target job descriptions using recruiter-preferred formulas (e.g., Google X-Y-Z formula).
- **ATS Match Score & Analysis**: Displays real-time ATS match percentage, keyword analysis (matched vs. missing keywords), summary of changes, and personalized hiring manager recommendations.
- **AI Bullet Enhancement**: Refine individual accomplishments with one-click AI rewriting.
- **7 Professional Resume Templates**:
  - 📄 **ATS Compact**: Clean, high-density layout built for ATS resume parsers.
  - 🏛️ **Ivy Classic**: Traditional academic and executive layout.
  - 💼 **Executive**: High-impact corporate presentation for senior roles.
  - 🎨 **Minimalist**: Modern whitespace design with clean accent highlights.
  - 📐 **Creative Sidebar**: Two-column layout with left navigation sidebar.
  - ❄️ **Nordic Clean**: Minimal Scandinavian layout.
  - 🚀 **Vibrant Startup**: Dynamic styling tailored for startup environments.
- **Custom Styling & Layout Controls**: Adjust color themes, typography fonts, margins, section ordering, and content sections in real time.
- **High-Quality PDF Export & Printing**: Custom CSS `@media print` stylesheet ensures multi-page and single-page resumes export cleanly without watermarks or third-party dependencies.
- **Smart Local Fallback**: Built-in intelligent heuristic engine guarantees complete tailoring functionality even when no API key is set.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Dev Server** | [Vite 8](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **AI SDK & API** | [Google Gemini 2.5 Flash](https://ai.google.dev/) (`@google/genai`) |
| **Icons & Motion** | [Lucide React](https://lucide.react.dev/) & [Motion](https://motion.dev/) |
| **Analytics & Backend** | [Vercel Analytics](https://vercel.com/analytics), [Express](https://expressjs.com/), `tsx` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** (or `yarn` / `pnpm`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abdellahseid/codeslot_2.git
   cd codeslot_2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   VITE_GEMINI_API_KEY="your_gemini_api_key_here"
   APP_URL="http://localhost:3000"
   ```
   > 💡 *Note: If no API key is configured, CodeSlot automatically falls back to its local heuristic engine.*

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Npm Scripts

- `npm run dev`: Starts the local Vite development server (`http://localhost:3000`).
- `npm run build`: Compiles and bundles the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript static type checks (`tsc --noEmit`).
- `npm run clean`: Cleans build output artifacts.

---

## 📂 Project Structure

```
codeslot_2/
├── public/                     # Static assets
├── src/
│   ├── components/             # React components (Navbar, Hero, JobsPortal, Auth)
│   │   └── resume/             # AI Resume Studio components & controls
│   │       └── templates/      # 7 Responsive resume template layouts
│   ├── data/                   # Job listings database and initial datasets
│   ├── services/               # Gemini AI API service & job fetching logic
│   ├── types/                  # TypeScript interfaces (Job, User, ResumeData)
│   ├── App.tsx                 # App layout, state router & navigation
│   ├── main.tsx                # Entry point
│   └── index.css               # Styles, Tailwind CSS imports & print engine rules
├── .env.example                # Environment variable reference
├── metadata.json               # CodeSlot metadata
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## 📄 License

This project is licensed under the MIT License.
