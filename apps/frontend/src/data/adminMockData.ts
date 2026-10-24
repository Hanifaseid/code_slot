import {
  ManagedUser,
  UserActivityEvent,
  JobApplicationRecord,
  AIStudioSessionRecord,
  AdminAuditEntry,
  AdminStats,
} from '../types/admin';

export const initialManagedUsers: ManagedUser[] = [];
export const initialActivityEvents: UserActivityEvent[] = [];
export const initialApplications: JobApplicationRecord[] = [];
export const initialAIStudioSessions: AIStudioSessionRecord[] = [];
export const initialAuditLogs: AdminAuditEntry[] = [];
export const initialAdminStats: AdminStats = {
  totalUsers: 0,
  dailyActiveUsers: 0,
  totalApplications: 0,
  aiResumesTailored: 0,
  totalJobViews: 0,
  avgAtsImprovement: 0,
  conversionRate: 0,
  systemHealthScore: 100,
  userGrowthPct: 0,
  applicationGrowthPct: 0,
  resumesGrowthPct: 0,
};
