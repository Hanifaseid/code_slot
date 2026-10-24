export type AdminRole = 'super_admin' | 'moderator' | 'analyst';

export type ActivityCategory = 'auth' | 'jobs' | 'ai_studio' | 'account' | 'system';

export type ActivityType =
  | 'login'
  | 'logout'
  | 'signup'
  | 'job_search'
  | 'job_view'
  | 'job_save'
  | 'job_apply'
  | 'resume_tailor'
  | 'resume_export'
  | 'profile_update'
  | 'security_event'
  | 'status_change';

export type EventSeverity = 'success' | 'info' | 'warning' | 'critical';

export interface UserActivityEvent {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userRole?: string;
  type: ActivityType;
  category: ActivityCategory;
  action: string;
  details: string;
  ip: string;
  location: string;
  device: string;
  browser?: string;
  timestamp: string; // ISO string
  severity: EventSeverity;
  metadata?: Record<string, any>;
}

export type UserStatus = 'active' | 'idle' | 'suspended' | 'verified';
export type UserPlan = 'Free' | 'Pro Dev' | 'Enterprise';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  title: string;
  avatar: string;
  role: 'candidate' | 'recruiter' | 'admin';
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  location: string;
  plan: UserPlan;
  appliedCount: number;
  savedCount: number;
  resumeScore: number;
  skills: string[];
  specialization: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  portfolioImage?: string;
  portfolioProjectTitle?: string;
}

export type ApplicationStage = 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'archived';

export interface JobApplicationRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  stage: ApplicationStage;
  appliedAt: string;
  matchScore: number;
  resumeVersion: string;
  sourceUrl: string;
  salaryRange?: string;
  notes?: string;
}

export interface AIStudioSessionRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  targetJob: string;
  company: string;
  initialAtsScore: number;
  tailoredAtsScore: number;
  improvement: number;
  bulletPointsGenerated: number;
  keywordsAdded: string[];
  latencyMs: number;
  tokensUsed: number;
  timestamp: string;
  model: string;
}

export interface AdminAuditEntry {
  id: string;
  adminEmail: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ip: string;
}

export interface AdminStats {
  totalUsers: number;
  dailyActiveUsers: number;
  totalApplications: number;
  aiResumesTailored: number;
  totalJobViews: number;
  avgAtsImprovement: number;
  conversionRate: number;
  systemHealthScore: number;
  userGrowthPct: number;
  applicationGrowthPct: number;
  resumesGrowthPct: number;
}
