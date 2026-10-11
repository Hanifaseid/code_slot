import { z } from 'zod';

/**
 * Standard API Response envelope
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

/**
 * Health check status schema and type
 */
export const HealthStatusSchema = z.object({
  status: z.enum(['ok', 'degraded', 'error']),
  uptime: z.number(),
  timestamp: z.string(),
  service: z.string(),
  version: z.string(),
  database: z.enum(['connected', 'disconnected', 'unknown']),
  memory: z
    .object({
      usedMb: z.number(),
      totalMb: z.number(),
    })
    .optional(),
});

export type HealthStatus = z.infer<typeof HealthStatusSchema>;

/**
 * Environment schema for frontend and backend configuration validation
 */
export const EnvironmentModeSchema = z.enum(['development', 'test', 'production']);
export type EnvironmentMode = z.infer<typeof EnvironmentModeSchema>;

/**
 * Standard pagination query parameters
 */
export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

/**
 * ============================================================================
 * AUTH & USER SCHEMAS & TYPES
 * ============================================================================
 */

export const UserRoleSchema = z.enum(['candidate', 'recruiter', 'admin']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserStatusSchema = z.enum(['active', 'idle', 'suspended', 'verified']);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const UserPlanSchema = z.enum(['Free', 'Pro Dev', 'Enterprise']);
export type UserPlan = z.infer<typeof UserPlanSchema>;

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().optional(),
  role: UserRoleSchema.default('candidate'),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const DemoLoginRequestSchema = z.object({
  role: z.enum(['admin', 'candidate', 'recruiter']).default('candidate'),
});
export type DemoLoginRequest = z.infer<typeof DemoLoginRequestSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  title: z.string().optional(),
  avatar: z.string().optional(),
  role: UserRoleSchema,
  status: UserStatusSchema.default('active'),
  plan: UserPlanSchema.default('Free'),
  location: z.string().optional(),
  skills: z.array(z.string()).default([]),
  specialization: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  savedJobIds: z.array(z.string()).default([]),
  appliedJobIds: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const AuthResponseSchema = z.object({
  user: UserProfileSchema,
  token: z.string(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

/**
 * ============================================================================
 * JOB BOARD SCHEMAS & TYPES
 * ============================================================================
 */

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company_name: z.string(),
  company_logo: z.string().optional(),
  category: z.string(),
  specialization: z.string().optional(),
  job_type: z.string(),
  candidate_required_location: z.string(),
  salary: z.string().optional(),
  publication_date: z.string(),
  description: z.string(),
  url: z.string(),
  tags: z.array(z.string()).default([]),
  source: z.string(),
  company_website: z.string().optional(),
  featured: z.boolean().default(false),
});
export type Job = z.infer<typeof JobSchema>;

export const JobQuerySchema = PaginationParamsSchema.extend({
  search: z.string().optional(),
  category: z.string().optional(),
  specialization: z.string().optional(),
  jobType: z.string().optional(),
  location: z.string().optional(),
  source: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  startupOnly: z.coerce.boolean().optional(),
});
export type JobQueryParams = z.infer<typeof JobQuerySchema>;

export const JobPaginatedResponseSchema = z.object({
  jobs: z.array(JobSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});
export type JobPaginatedResponse = z.infer<typeof JobPaginatedResponseSchema>;

export const CreateJobRequestSchema = z.object({
  title: z.string().min(2),
  company_name: z.string().min(2),
  company_logo: z.string().url().optional().or(z.literal('')),
  category: z.string().min(2),
  specialization: z.string().optional(),
  job_type: z.string().default('Full-time'),
  candidate_required_location: z.string().default('Worldwide (Remote)'),
  salary: z.string().optional(),
  description: z.string().min(20),
  url: z.string().url(),
  tags: z.array(z.string()).default([]),
  source: z.string().default('CodeSlot Direct'),
  company_website: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
});
export type CreateJobRequest = z.infer<typeof CreateJobRequestSchema>;

export const ApplicationStageSchema = z.enum([
  'applied',
  'screening',
  'interview',
  'offer',
  'rejected',
  'archived',
]);
export type ApplicationStage = z.infer<typeof ApplicationStageSchema>;

export const ApplyJobRequestSchema = z.object({
  jobId: z.string(),
  resumeVersion: z.string().optional().default('Current Tailored Resume'),
  matchScore: z.number().optional().default(85),
  notes: z.string().optional(),
  salaryRange: z.string().optional(),
});
export type ApplyJobRequest = z.infer<typeof ApplyJobRequestSchema>;

export const JobApplicationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  userAvatar: z.string().optional(),
  jobId: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  companyLogo: z.string().optional(),
  stage: ApplicationStageSchema,
  appliedAt: z.string(),
  matchScore: z.number(),
  resumeVersion: z.string(),
  sourceUrl: z.string(),
  salaryRange: z.string().optional(),
  notes: z.string().optional(),
});
export type JobApplication = z.infer<typeof JobApplicationSchema>;

/**
 * ============================================================================
 * RESUME & AI RESUME STUDIO SCHEMAS & TYPES
 * ============================================================================
 */

export const PersonalInfoSchema = z.object({
  fullName: z.string(),
  jobTitle: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string(),
});
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const ExperienceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean().default(false),
  highlights: z.array(z.string()),
});
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

export const ProjectItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  link: z.string().optional(),
});
export type ProjectItem = z.infer<typeof ProjectItemSchema>;

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  location: z.string().optional(),
  details: z.string().optional(),
});
export type EducationItem = z.infer<typeof EducationItemSchema>;

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
});
export type CertificationItem = z.infer<typeof CertificationItemSchema>;

export const SkillsDataSchema = z.object({
  technical: z.array(z.string()),
  tools: z.array(z.string()),
  soft: z.array(z.string()),
});
export type SkillsData = z.infer<typeof SkillsDataSchema>;

export const ResumeDataSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceItemSchema),
  skills: SkillsDataSchema,
  projects: z.array(ProjectItemSchema),
  education: z.array(EducationItemSchema),
  certifications: z.array(CertificationItemSchema),
});
export type ResumeData = z.infer<typeof ResumeDataSchema>;

export const ResumeTemplateIdSchema = z.enum([
  'executive',
  'minimalist',
  'creative-sidebar',
  'ivy-classic',
  'nordic-clean',
  'ats-compact',
  'vibrant-startup',
]);
export type ResumeTemplateId = z.infer<typeof ResumeTemplateIdSchema>;

export const AccentColorSchema = z.enum([
  'slate',
  'emerald',
  'indigo',
  'amber',
  'rose',
  'violet',
  'navy',
]);
export type AccentColor = z.infer<typeof AccentColorSchema>;

export const ContentDensitySchema = z.enum(['compact', 'standard', 'relaxed']);
export type ContentDensity = z.infer<typeof ContentDensitySchema>;

export const PaperSizeSchema = z.enum(['a4', 'letter']);
export type PaperSize = z.infer<typeof PaperSizeSchema>;

export const ResumeSettingsSchema = z.object({
  templateId: ResumeTemplateIdSchema,
  accentColor: AccentColorSchema,
  density: ContentDensitySchema,
  paperSize: PaperSizeSchema,
  showPhoto: z.boolean().optional(),
});
export type ResumeSettings = z.infer<typeof ResumeSettingsSchema>;

export const AITailorRequestSchema = z.object({
  currentResume: ResumeDataSchema,
  jobTitle: z.string(),
  companyName: z.string(),
  jobDescription: z.string(),
  customApiKey: z.string().optional(),
});
export type AITailorRequest = z.infer<typeof AITailorRequestSchema>;

export const AITailorResultSchema = z.object({
  tailoredResume: ResumeDataSchema,
  atsScore: z.number(),
  summaryOfChanges: z.string(),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  improvementTips: z.array(z.string()).optional(),
  latencyMs: z.number().optional(),
});
export type AITailorResult = z.infer<typeof AITailorResultSchema>;

export const AIBulletEnhanceRequestSchema = z.object({
  originalBullet: z.string(),
  jobTitle: z.string().optional(),
  targetKeywords: z.array(z.string()).optional(),
  customApiKey: z.string().optional(),
});
export type AIBulletEnhanceRequest = z.infer<typeof AIBulletEnhanceRequestSchema>;

export const AIBulletEnhanceResponseSchema = z.object({
  enhancedBullet: z.string(),
  alternatives: z.array(z.string()).optional(),
  formula: z.string().optional(),
});
export type AIBulletEnhanceResponse = z.infer<typeof AIBulletEnhanceResponseSchema>;

/**
 * ============================================================================
 * ADMIN & ANALYTICS SCHEMAS & TYPES
 * ============================================================================
 */

export const AdminRoleSchema = z.enum(['super_admin', 'moderator', 'analyst']);
export type AdminRole = z.infer<typeof AdminRoleSchema>;

export const ActivityCategorySchema = z.enum(['auth', 'jobs', 'ai_studio', 'account', 'system']);
export type ActivityCategory = z.infer<typeof ActivityCategorySchema>;

export const ActivityTypeSchema = z.enum([
  'login',
  'logout',
  'signup',
  'job_search',
  'job_view',
  'job_save',
  'job_apply',
  'resume_tailor',
  'resume_export',
  'profile_update',
  'security_event',
  'status_change',
]);
export type ActivityType = z.infer<typeof ActivityTypeSchema>;

export const EventSeveritySchema = z.enum(['success', 'info', 'warning', 'critical']);
export type EventSeverity = z.infer<typeof EventSeveritySchema>;

export const UserActivityEventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  userAvatar: z.string().optional(),
  userRole: z.string().optional(),
  type: ActivityTypeSchema,
  category: ActivityCategorySchema,
  action: z.string(),
  details: z.string(),
  ip: z.string(),
  location: z.string(),
  device: z.string(),
  browser: z.string().optional(),
  timestamp: z.string(),
  severity: EventSeveritySchema,
  metadata: z.record(z.any()).optional(),
});
export type UserActivityEvent = z.infer<typeof UserActivityEventSchema>;

export const ManagedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  title: z.string(),
  avatar: z.string(),
  role: z.enum(['candidate', 'recruiter', 'admin']),
  status: UserStatusSchema,
  joinedAt: z.string(),
  lastActive: z.string(),
  location: z.string(),
  plan: UserPlanSchema,
  appliedCount: z.number(),
  savedCount: z.number(),
  resumeScore: z.number(),
  skills: z.array(z.string()),
  specialization: z.string(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
});
export type ManagedUser = z.infer<typeof ManagedUserSchema>;

export const AIStudioSessionRecordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  targetJob: z.string(),
  company: z.string(),
  initialAtsScore: z.number(),
  tailoredAtsScore: z.number(),
  improvement: z.number(),
  bulletPointsGenerated: z.number(),
  keywordsAdded: z.array(z.string()),
  latencyMs: z.number(),
  tokensUsed: z.number(),
  timestamp: z.string(),
});
export type AIStudioSessionRecord = z.infer<typeof AIStudioSessionRecordSchema>;

export const AdminAuditEntrySchema = z.object({
  id: z.string(),
  adminEmail: z.string(),
  action: z.string(),
  target: z.string(),
  details: z.string(),
  timestamp: z.string(),
  ip: z.string(),
});
export type AdminAuditEntry = z.infer<typeof AdminAuditEntrySchema>;

export const AdminStatsSchema = z.object({
  totalUsers: z.number(),
  dailyActiveUsers: z.number(),
  totalJobs: z.number(),
  totalApplications: z.number(),
  aiResumesTailored: z.number(),
  avgAtsImprovement: z.number(),
  totalJobViews: z.number(),
  apiUptime: z.string(),
});
export type AdminStats = {
  totalUsers: number;
  dailyActiveUsers: number;
  totalJobs: number;
  totalApplications: number;
  aiResumesTailored: number;
  avgAtsImprovement: number;
  totalJobViews: number;
  apiUptime: string;
};
