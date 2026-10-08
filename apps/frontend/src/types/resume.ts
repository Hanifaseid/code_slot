export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  location?: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface SkillsData {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  skills: SkillsData;
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export type ResumeTemplateId =
  | 'executive'
  | 'minimalist'
  | 'creative-sidebar'
  | 'ivy-classic'
  | 'nordic-clean'
  | 'ats-compact'
  | 'vibrant-startup';

export type AccentColor =
  | 'slate'
  | 'emerald'
  | 'indigo'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'navy';

export type ContentDensity = 'compact' | 'standard' | 'relaxed';

export type PaperSize = 'a4' | 'letter';

export interface ResumeSettings {
  templateId: ResumeTemplateId;
  accentColor: AccentColor;
  density: ContentDensity;
  paperSize: PaperSize;
  showPhoto?: boolean;
}

export interface AITailorResult {
  tailoredResume: ResumeData;
  atsScore: number;
  summaryOfChanges: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  improvementTips: string[];
  targetJobTitle: string;
  targetCompany: string;
}
