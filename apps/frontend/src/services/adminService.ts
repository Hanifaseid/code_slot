import {
  ManagedUser,
  UserActivityEvent,
  JobApplicationRecord,
  AIStudioSessionRecord,
  AdminAuditEntry,
  AdminStats,
  UserStatus,
  ApplicationStage,
} from '../types/admin';
import { apiClient } from './apiClient';

const STORAGE_USERS = 'codeslot_admin_users';
const STORAGE_ACTIVITIES = 'codeslot_admin_activities';
const STORAGE_APPLICATIONS = 'codeslot_admin_applications';
const STORAGE_AI_SESSIONS = 'codeslot_admin_ai_sessions';
const STORAGE_AUDIT = 'codeslot_admin_audit';

// Helper to get stored item and flush stale mock data if present
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return defaultVal;
    }
    const parsed = JSON.parse(raw);
    // If old mock data exists with demo users like usr-101 or alex.mercer, flush it
    if (
      key === STORAGE_USERS &&
      Array.isArray(parsed) &&
      parsed.some((u: any) => u.id === 'usr-101' || u.email?.includes('alex.mercer'))
    ) {
      localStorage.removeItem(key);
      return defaultVal;
    }
    return parsed;
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to persist ${key}`, err);
  }
}

export const adminService = {
  getStats(): AdminStats {
    const users = this.getUsers();
    const apps = this.getApplications();
    const aiSessions = this.getAISessions();
    const activities = this.getActivities();

    const activeCount = users.filter((u) => u.status === 'active' || u.status === 'verified').length;
    const avgImprovement =
      aiSessions.length > 0
        ? Math.round(
            aiSessions.reduce(
              (acc, s) => acc + (s.improvement || (s.tailoredAtsScore - s.initialAtsScore) || 20),
              0
            ) / aiSessions.length
          )
        : 0;
    const jobViews = activities.filter((a) => a.type === 'job_view' || a.category === 'jobs').length;

    return {
      totalUsers: users.length,
      dailyActiveUsers: activeCount,
      totalApplications: apps.length,
      aiResumesTailored: aiSessions.length,
      totalJobViews: jobViews,
      avgAtsImprovement: avgImprovement,
      conversionRate: users.length > 0 ? Math.round((apps.length / users.length) * 100) : 0,
      systemHealthScore: 100,
      userGrowthPct: users.length > 0 ? Math.min(users.length * 10, 100) : 0,
      applicationGrowthPct: apps.length > 0 ? Math.min(apps.length * 15, 100) : 0,
      resumesGrowthPct: aiSessions.length > 0 ? Math.min(aiSessions.length * 20, 100) : 0,
    };
  },

  getUsers(): ManagedUser[] {
    return getStored<ManagedUser[]>(STORAGE_USERS, []);
  },

  updateUserStatus(userId: string, status: UserStatus): ManagedUser[] {
    const users = this.getUsers().map((u) => (u.id === userId ? { ...u, status } : u));
    setStored(STORAGE_USERS, users);

    // Record audit entry
    this.addAuditEntry({
      id: `aud-${Date.now()}`,
      adminEmail: 'admin@gmail.com',
      action: 'UPDATE_USER_STATUS',
      target: userId,
      details: `Changed status of user ${userId} to "${status}"`,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
    });

    // Sync to backend
    apiClient.patch(`/admin/users/${userId}/status`, { status }).catch((err) => {
      console.debug('Async status sync to backend deferred:', err);
    });

    return users;
  },

  getActivities(): UserActivityEvent[] {
    return getStored<UserActivityEvent[]>(STORAGE_ACTIVITIES, []);
  },

  addActivity(event: Omit<UserActivityEvent, 'id' | 'timestamp'>): UserActivityEvent {
    const newEvent: UserActivityEvent = {
      ...event,
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    const current = this.getActivities();
    const updated = [newEvent, ...current].slice(0, 150);
    setStored(STORAGE_ACTIVITIES, updated);

    // Sync to backend asynchronously
    apiClient.post('/admin/activities', event).catch((err) => {
      console.debug('Async activity post to backend deferred:', err);
    });

    return newEvent;
  },

  getApplications(): JobApplicationRecord[] {
    return getStored<JobApplicationRecord[]>(STORAGE_APPLICATIONS, []);
  },

  updateApplicationStage(appId: string, stage: ApplicationStage): JobApplicationRecord[] {
    const apps = this.getApplications().map((a) => (a.id === appId ? { ...a, stage } : a));
    setStored(STORAGE_APPLICATIONS, apps);

    this.addAuditEntry({
      id: `aud-${Date.now()}`,
      adminEmail: 'admin@gmail.com',
      action: 'UPDATE_APP_STAGE',
      target: appId,
      details: `Advanced candidate application ${appId} to stage: ${stage.toUpperCase()}`,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
    });

    // Sync to backend asynchronously
    apiClient.patch(`/admin/applications/${appId}/stage`, { stage }).catch((err) => {
      console.debug('Async application stage sync to backend deferred:', err);
    });

    return apps;
  },

  getAISessions(): AIStudioSessionRecord[] {
    return getStored<AIStudioSessionRecord[]>(STORAGE_AI_SESSIONS, []);
  },

  getAuditLogs(): AdminAuditEntry[] {
    return getStored<AdminAuditEntry[]>(STORAGE_AUDIT, []);
  },

  addAuditEntry(entry: AdminAuditEntry): void {
    const logs = [entry, ...this.getAuditLogs()].slice(0, 100);
    setStored(STORAGE_AUDIT, logs);
  },

  /**
   * Synchronize state from backend control plane
   */
  async syncFromBackend(): Promise<void> {
    try {
      const [usersRes, appsRes, actsRes, aiRes, auditRes] = await Promise.allSettled([
        apiClient.get<ManagedUser[]>('/admin/users'),
        apiClient.get<JobApplicationRecord[]>('/admin/applications'),
        apiClient.get<UserActivityEvent[]>('/admin/activities'),
        apiClient.get<AIStudioSessionRecord[]>('/admin/ai-sessions'),
        apiClient.get<AdminAuditEntry[]>('/admin/audit-logs'),
      ]);

      if (usersRes.status === 'fulfilled' && usersRes.value.success && usersRes.value.data) {
        setStored(STORAGE_USERS, usersRes.value.data);
      }
      if (appsRes.status === 'fulfilled' && appsRes.value.success && appsRes.value.data) {
        setStored(STORAGE_APPLICATIONS, appsRes.value.data);
      }
      if (actsRes.status === 'fulfilled' && actsRes.value.success && actsRes.value.data) {
        setStored(STORAGE_ACTIVITIES, actsRes.value.data);
      }
      if (aiRes.status === 'fulfilled' && aiRes.value.success && aiRes.value.data) {
        setStored(STORAGE_AI_SESSIONS, aiRes.value.data);
      }
      if (auditRes.status === 'fulfilled' && auditRes.value.success && auditRes.value.data) {
        setStored(STORAGE_AUDIT, auditRes.value.data);
      }
    } catch (err) {
      console.debug('Backend sync deferred:', err);
    }
  },

  async getBroadcast(): Promise<{ message: string; active: boolean } | null> {
    try {
      const res = await apiClient.get<{ announcement: { message: string; active: boolean } }>('/admin/broadcast');
      if (res.success && res.data?.announcement) {
        return res.data.announcement;
      }
    } catch (err) {
      console.debug('Failed to get broadcast:', err);
    }
    return null;
  },

  async setBroadcast(message: string, active: boolean): Promise<boolean> {
    try {
      const res = await apiClient.post('/admin/broadcast', { message, active });
      return res.success;
    } catch (err) {
      console.debug('Failed to set broadcast:', err);
      return false;
    }
  },

  exportToCSV(dataType: 'activities' | 'users' | 'applications'): void {
    let headers: string[] = [];
    let rows: string[][] = [];
    const filename = `codeslot_${dataType}_${new Date().toISOString().slice(0, 10)}.csv`;

    if (dataType === 'activities') {
      const activities = this.getActivities();
      headers = ['ID', 'User Name', 'Email', 'Type', 'Category', 'Action', 'Details', 'Location', 'Timestamp'];
      rows = activities.map((a) => [
        a.id,
        `"${a.userName}"`,
        a.userEmail,
        a.type,
        a.category,
        `"${a.action.replace(/"/g, '""')}"`,
        `"${a.details.replace(/"/g, '""')}"`,
        `"${a.location}"`,
        a.timestamp,
      ]);
    } else if (dataType === 'users') {
      const users = this.getUsers();
      headers = [
        'ID',
        'Name',
        'Email',
        'Role',
        'Status',
        'Plan',
        'Applications',
        'Saved Jobs',
        'ATS Score',
        'Specialization',
      ];
      rows = users.map((u) => [
        u.id,
        `"${u.name}"`,
        u.email,
        u.role,
        u.status,
        u.plan,
        String(u.appliedCount),
        String(u.savedCount),
        String(u.resumeScore),
        `"${u.specialization}"`,
      ]);
    } else if (dataType === 'applications') {
      const apps = this.getApplications();
      headers = ['ID', 'Candidate', 'Email', 'Job Title', 'Company', 'Stage', 'Match Score', 'Applied At'];
      rows = apps.map((app) => [
        app.id,
        `"${app.userName}"`,
        app.userEmail,
        `"${app.jobTitle}"`,
        `"${app.company}"`,
        app.stage,
        String(app.matchScore),
        app.appliedAt,
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
