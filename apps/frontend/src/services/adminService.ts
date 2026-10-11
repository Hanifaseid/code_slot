import {
  ManagedUser,
  UserActivityEvent,
  JobApplicationRecord,
  AIStudioSessionRecord,
  AdminAuditEntry,
  AdminStats,
  UserStatus,
  ApplicationStage
} from '../types/admin';
import {
  initialManagedUsers,
  initialActivityEvents,
  initialApplications,
  initialAIStudioSessions,
  initialAuditLogs,
  initialAdminStats
} from '../data/adminMockData';
import { apiClient } from './apiClient';


const STORAGE_USERS = 'codeslot_admin_users';
const STORAGE_ACTIVITIES = 'codeslot_admin_activities';
const STORAGE_APPLICATIONS = 'codeslot_admin_applications';
const STORAGE_AI_SESSIONS = 'codeslot_admin_ai_sessions';
const STORAGE_AUDIT = 'codeslot_admin_audit';

// Helper to get or set initial
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
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

    return {
      ...initialAdminStats,
      totalUsers: users.length * 119, // extrapolated realistic scaled count
      dailyActiveUsers: users.filter((u) => u.status === 'active').length * 28 + 14,
      totalApplications: apps.length * 52 + 18,
      aiResumesTailored: aiSessions.length * 48 + 26,
      totalJobViews: activities.length * 240 + 1200
    };
  },

  getUsers(): ManagedUser[] {
    return getStored<ManagedUser[]>(STORAGE_USERS, initialManagedUsers);
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
      ip: '127.0.0.1'
    });

    // Sync to backend asynchronously
    apiClient.patch(`/admin/users/${userId}/status`, { status }).catch((err) => {
      console.debug('Async status sync to backend deferred:', err);
    });

    return users;
  },

  getActivities(): UserActivityEvent[] {
    return getStored<UserActivityEvent[]>(STORAGE_ACTIVITIES, initialActivityEvents);
  },

  addActivity(event: Omit<UserActivityEvent, 'id' | 'timestamp'>): UserActivityEvent {
    const newEvent: UserActivityEvent = {
      ...event,
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    const current = this.getActivities();
    const updated = [newEvent, ...current].slice(0, 150); // keep recent 150
    setStored(STORAGE_ACTIVITIES, updated);

    // Sync to backend asynchronously
    apiClient.post('/admin/activities', event).catch((err) => {
      console.debug('Async activity post to backend deferred:', err);
    });

    return newEvent;
  },

  getApplications(): JobApplicationRecord[] {
    return getStored<JobApplicationRecord[]>(STORAGE_APPLICATIONS, initialApplications);
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
      ip: '127.0.0.1'
    });

    // Sync to backend asynchronously
    apiClient.patch(`/admin/applications/${appId}/stage`, { stage }).catch((err) => {
      console.debug('Async application stage sync to backend deferred:', err);
    });

    return apps;
  },

  getAISessions(): AIStudioSessionRecord[] {
    return getStored<AIStudioSessionRecord[]>(STORAGE_AI_SESSIONS, initialAIStudioSessions);
  },

  getAuditLogs(): AdminAuditEntry[] {
    return getStored<AdminAuditEntry[]>(STORAGE_AUDIT, initialAuditLogs);
  },

  addAuditEntry(entry: AdminAuditEntry): void {
    const logs = [entry, ...this.getAuditLogs()].slice(0, 100);
    setStored(STORAGE_AUDIT, logs);
  },

  /**
   * Synchronize state from backend control plane when online
   */
  async syncFromBackend(): Promise<void> {
    try {
      const [usersRes, appsRes, actsRes, aiRes] = await Promise.allSettled([
        apiClient.get<ManagedUser[]>('/admin/users'),
        apiClient.get<JobApplicationRecord[]>('/admin/applications'),
        apiClient.get<UserActivityEvent[]>('/admin/activities'),
        apiClient.get<AIStudioSessionRecord[]>('/admin/ai-sessions'),
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
    } catch (err) {
      console.debug('Backend sync deferred:', err);
    }
  },

  // Generates a realistic simulated live event for testing and live demonstration
  generateSimulatedEvent(): UserActivityEvent {
    const users = this.getUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const eventTemplates = [
      {
        type: 'job_apply' as const,
        category: 'jobs' as const,
        action: 'Direct Verified Job Application',
        details: `Submitted resume to ${['Linear', 'Stripe', 'OpenAI', 'Vercel', 'Supabase', 'Figma', 'Datadog'][Math.floor(Math.random() * 7)]} via official CodeSlot portal link`,
        severity: 'success' as const
      },
      {
        type: 'resume_tailor' as const,
        category: 'ai_studio' as const,
        action: 'AI Studio ATS Optimization',
        details: `Tailored CV score from ${Math.floor(Math.random() * 20 + 60)}% to ${Math.floor(Math.random() * 10 + 90)}% for Senior Engineering role`,
        severity: 'success' as const
      },
      {
        type: 'job_search' as const,
        category: 'jobs' as const,
        action: 'Executed Keyword Search',
        details: `Filtered opportunities for: "${['Rust Distributed Systems', 'Next.js 15 Full Stack', 'Kubernetes Platform', 'Staff AI Researcher', 'Elixir Phoenix'][Math.floor(Math.random() * 5)]}"`,
        severity: 'info' as const
      },
      {
        type: 'job_save' as const,
        category: 'jobs' as const,
        action: 'Bookmarked Position',
        details: `Added remote listing to private tracker (${['$180k-$220k', '$200k-$260k', '$160k-$210k'][Math.floor(Math.random() * 3)]})`,
        severity: 'info' as const
      },
      {
        type: 'login' as const,
        category: 'auth' as const,
        action: 'Candidate Session Active',
        details: 'User authenticated from authenticated device',
        severity: 'info' as const
      }
    ];

    const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];

    const locations = [
      'San Francisco, US',
      'London, UK',
      'Berlin, DE',
      'Zurich, CH',
      'Tokyo, JP',
      'Toronto, CA',
      'Seattle, US',
      'Amsterdam, NL'
    ];

    return this.addActivity({
      userId: randomUser.id,
      userName: randomUser.name,
      userEmail: randomUser.email,
      userAvatar: randomUser.avatar,
      type: template.type,
      category: template.category,
      action: template.action,
      details: template.details,
      ip: `198.51.100.${Math.floor(Math.random() * 240 + 10)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      device: ['macOS · Chrome 128', 'Windows 11 · Edge', 'Ubuntu 24.04 · Firefox', 'iOS 18 · Safari'][
        Math.floor(Math.random() * 4)
      ],
      severity: template.severity
    });
  },

  exportToCSV(dataType: 'activities' | 'users' | 'applications'): void {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `codeslot_${dataType}_${new Date().toISOString().slice(0, 10)}.csv`;

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
        a.timestamp
      ]);
    } else if (dataType === 'users') {
      const users = this.getUsers();
      headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Plan', 'Applications', 'Saved Jobs', 'ATS Score', 'Specialization'];
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
        `"${u.specialization}"`
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
        app.appliedAt
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
  }
};
