export interface FaqItem {
  id: string;
  question: string;
  answer: string | string[];
}

export interface NetworkNode {
  id: string;
  name: string;
  role: string;
  avatar: string;
  highlight?: string;
  tag?: string;
}

export type TabMode = 'developers' | 'hiring';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  specialization?: string; // 'Frontend' | 'Backend' | 'Full Stack' | 'DevOps / Cloud' | 'AI & Machine Learning' | 'Mobile' | 'Data & Analytics' | 'Security & QA' | 'Software Engineering'
  experienceLevel?: 'Junior' | 'Intermediate' | 'Senior' | 'Lead' | string;
  job_type: string;
  candidate_required_location: string;
  salary?: string;
  publication_date: string;
  description: string;
  url: string; // original source URL
  tags: string[];
  source: string;
  company_website?: string;
  featured?: boolean;
}

export interface UserSession {
  email: string;
  name: string;
  title?: string;
  avatar?: string;
  role?: 'admin' | 'candidate' | 'recruiter';
  experienceLevel?: 'Junior' | 'Intermediate' | 'Senior' | 'Lead' | string;
  savedJobIds: string[];
  appliedJobIds: string[];
  location?: string;
  skills?: string[];
  specialization?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  portfolioImage?: string;
  portfolioProjectTitle?: string;
  plan?: string;
}

export interface JobFilters {
  search: string;
  category: string;
  experienceLevel?: string; // 'all' | 'junior' | 'intermediate' | 'senior' | 'lead'
  jobType: string;
  location: string;
  source: string; // 'all' | 'yc' | 'startups' | 'usa' | 'wwr' | 'remotive' | 'jobicy' | 'remoteok' | 'arbeitnow' | 'workingnomads'
  startupOnly?: boolean;
  viewMode: 'grid' | 'list';
  sortBy: 'recent' | 'salary' | 'company';
}
