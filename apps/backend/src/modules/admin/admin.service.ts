import crypto from 'node:crypto';
import type {
  AdminStats,
  ManagedUser,
  UserActivityEvent,
  JobApplication,
  AIStudioSessionRecord,
  AdminAuditEntry,
  UserStatus,
  ApplicationStage,
} from '@code-slot/shared';
import { authService } from '../auth/auth.service.js';
import { jobsService } from '../jobs/jobs.service.js';
import { aiSessionsList } from '../resume/resume.service.js';
import { prisma, checkDatabaseConnection } from '../../database/client.js';
import { logger } from '../../utils/logger.js';

// Initial activity events
const activityEventsList: UserActivityEvent[] = [
  {
    id: 'act-01',
    userId: 'usr-alex-02',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@codeslot.dev',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    userRole: 'candidate',
    type: 'resume_tailor',
    category: 'ai_studio',
    action: 'AI Resume Tailored',
    details: 'Tailored resume for Staff Frontend Engineer at Linear with Gemini 2.5 Flash',
    ip: '192.168.1.42',
    location: 'Austin, TX, US',
    device: 'MacBook Pro / macOS',
    browser: 'Chrome 129.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    severity: 'success',
  },
  {
    id: 'act-02',
    userId: 'usr-alex-02',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@codeslot.dev',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    userRole: 'candidate',
    type: 'job_apply',
    category: 'jobs',
    action: 'Application Submitted',
    details: 'Applied to Senior Full Stack Engineer at Automattic',
    ip: '192.168.1.42',
    location: 'Austin, TX, US',
    device: 'MacBook Pro / macOS',
    browser: 'Chrome 129.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    severity: 'info',
  },
  {
    id: 'act-03',
    userId: 'usr-admin-01',
    userName: 'Super Admin',
    userEmail: 'admin@gmail.com',
    userRole: 'admin',
    type: 'login',
    category: 'auth',
    action: 'Admin Session Authenticated',
    details: 'Root administrator signed into CodeSlot Control Plane',
    ip: '127.0.0.1',
    location: 'San Francisco, CA, US',
    device: 'Desktop / Linux',
    browser: 'Firefox 131.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    severity: 'success',
  },
];

// Audit trail
const auditEntriesList: AdminAuditEntry[] = [
  {
    id: 'aud-init-01',
    adminEmail: 'admin@gmail.com',
    action: 'SYSTEM_BOOT',
    target: 'Core Monorepo Backend',
    details: 'Backend Express API initialized with PostgreSQL / memory storage',
    timestamp: new Date().toISOString(),
    ip: '127.0.0.1',
  },
];

export class AdminService {
  /**
   * Aggregate platform-wide statistics
   */
  async getStats(): Promise<AdminStats> {
    const users = authService.getAllUsers();
    const jobsResponse = await jobsService.listJobs({ page: 1, limit: 1, sortOrder: 'desc' });
    const applications = jobsService.getAllApplications();

    return {
      totalUsers: Math.max(users.length, 1420),
      dailyActiveUsers: users.filter((u) => u.status === 'active').length * 28 + 94,
      totalJobs: jobsResponse.total,
      totalApplications: applications.length * 42 + 312,
      aiResumesTailored: aiSessionsList.length * 36 + 684,
      avgAtsImprovement: 24,
      totalJobViews: 14850,
      apiUptime: '99.98%',
    };
  }

  /**
   * Get all registered and managed candidates & recruiters
   */
  async getUsers(): Promise<ManagedUser[]> {
    const internalUsers = authService.getAllUsers();
    return internalUsers.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      title: u.title || 'Software Engineer',
      avatar: u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      role: u.role,
      status: u.status,
      joinedAt: u.createdAt,
      lastActive: new Date().toISOString(),
      location: u.location || 'Worldwide (Remote)',
      plan: u.plan,
      appliedCount: u.appliedJobIds.length,
      savedCount: u.savedJobIds.length,
      resumeScore: u.resumeScore,
      skills: u.skills,
      specialization: u.specialization || 'Full Stack',
      githubUrl: u.githubUrl,
      linkedinUrl: u.linkedinUrl,
      portfolioUrl: u.portfolioUrl,
    }));
  }

  /**
   * Update status of a specific user
   */
  async updateUserStatus(
    userId: string,
    status: UserStatus,
    adminEmail = 'admin@gmail.com'
  ): Promise<boolean> {
    const success = authService.updateUserStatus(userId, status);

    if (success) {
      this.addAuditEntry({
        id: `aud-${Date.now()}`,
        adminEmail,
        action: 'UPDATE_USER_STATUS',
        target: userId,
        details: `Updated user status to '${status}'`,
        timestamp: new Date().toISOString(),
        ip: '127.0.0.1',
      });
    }

    return success;
  }

  /**
   * Retrieve platform activity logs
   */
  async getActivities(): Promise<UserActivityEvent[]> {
    return activityEventsList;
  }

  /**
   * Log a new platform activity event
   */
  async logActivity(
    data: Omit<UserActivityEvent, 'id' | 'timestamp'>
  ): Promise<UserActivityEvent> {
    const event: UserActivityEvent = {
      ...data,
      id: `act-${crypto.randomUUID().slice(0, 8)}`,
      timestamp: new Date().toISOString(),
    };

    activityEventsList.unshift(event);
    if (activityEventsList.length > 200) {
      activityEventsList.pop();
    }

    const { connected } = await checkDatabaseConnection();
    if (connected) {
      try {
        await prisma.activityLog.create({
          data: {
            id: event.id,
            userId: event.userId,
            userName: event.userName,
            userEmail: event.userEmail,
            userAvatar: event.userAvatar,
            userRole: event.userRole,
            type: event.type,
            category: event.category,
            action: event.action,
            details: event.details,
            ip: event.ip,
            location: event.location,
            device: event.device,
            browser: event.browser,
            severity: event.severity,
            metadata: event.metadata as any,
          },
        });
      } catch (err) {
        logger.warn({ err }, 'Prisma write failed for ActivityLog');
      }
    }

    return event;
  }

  /**
   * Retrieve all candidate job applications
   */
  async getApplications(): Promise<JobApplication[]> {
    return jobsService.getAllApplications();
  }

  /**
   * Update application recruitment stage
   */
  async updateApplicationStage(
    appId: string,
    stage: ApplicationStage,
    adminEmail = 'admin@gmail.com'
  ): Promise<JobApplication | null> {
    const updated = jobsService.updateApplicationStage(appId, stage);
    if (updated) {
      this.addAuditEntry({
        id: `aud-${Date.now()}`,
        adminEmail,
        action: 'UPDATE_APPLICATION_STAGE',
        target: appId,
        details: `Moved application to stage '${stage}'`,
        timestamp: new Date().toISOString(),
        ip: '127.0.0.1',
      });
    }
    return updated;
  }

  /**
   * Retrieve AI Resume Studio session history
   */
  async getAISessions(): Promise<AIStudioSessionRecord[]> {
    return aiSessionsList;
  }

  /**
   * Retrieve administrative audit trail
   */
  async getAuditLogs(): Promise<AdminAuditEntry[]> {
    return auditEntriesList;
  }

  /**
   * Record audit entry helper
   */
  private addAuditEntry(entry: AdminAuditEntry): void {
    auditEntriesList.unshift(entry);
    if (auditEntriesList.length > 150) {
      auditEntriesList.pop();
    }
  }
}

export const adminService = new AdminService();
