import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Activity,
  Users,
  Briefcase,
  Sparkles,
  Layers,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Search,
  Bell,
  Zap,
  Globe,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { Job, UserSession } from '../../types';
import {
  ManagedUser,
  UserActivityEvent,
  JobApplicationRecord,
  AIStudioSessionRecord,
  AdminAuditEntry,
  AdminStats,
  UserStatus,
  ApplicationStage
} from '../../types/admin';
import { adminService } from '../../services/adminService';
import { fetchRealJobs } from '../../services/jobService';

// Sub-views
import { AdminOverviewView } from './AdminOverviewView';
import { AdminActivitiesView } from './AdminActivitiesView';
import { AdminUsersView } from './AdminUsersView';
import { AdminApplicationsView } from './AdminApplicationsView';
import { AdminAIStudioView } from './AdminAIStudioView';
import { AdminJobsInventoryView } from './AdminJobsInventoryView';
import { AdminSystemView } from './AdminSystemView';

interface AdminPortalProps {
  onLogout: () => void;
  onNavigateToJobs: () => void;
  onNavigateToLanding: () => void;
  onImpersonateUser?: (user: UserSession) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onLogout,
  onNavigateToJobs,
  onNavigateToLanding,
  onImpersonateUser
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [stats, setStats] = useState<AdminStats>(() => adminService.getStats());
  const [activities, setActivities] = useState<UserActivityEvent[]>(() => adminService.getActivities());
  const [users, setUsers] = useState<ManagedUser[]>(() => adminService.getUsers());
  const [applications, setApplications] = useState<JobApplicationRecord[]>(() => adminService.getApplications());
  const [aiSessions, setAiSessions] = useState<AIStudioSessionRecord[]>(() => adminService.getAISessions());
  const [auditLogs, setAuditLogs] = useState<AdminAuditEntry[]>(() => adminService.getAuditLogs());
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from jobService
  useEffect(() => {
    fetchRealJobs().then((j: Job[]) => setJobs(j));
  }, []);

  // Show temporary toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Real-time Activity Simulator loop
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      const newEvent = adminService.generateSimulatedEvent();
      setActivities(adminService.getActivities());
      setStats(adminService.getStats());
    }, 7000); // add a new realistic user event every 7 seconds

    return () => clearInterval(interval);
  }, [isLiveSimulationActive]);

  // Handlers
  const handleSimulateSingleEvent = () => {
    const newEvent = adminService.generateSimulatedEvent();
    setActivities(adminService.getActivities());
    setStats(adminService.getStats());
    showToast(`Live event generated: ${newEvent.userName} · ${newEvent.action}`);
  };

  const handleUpdateUserStatus = (userId: string, status: UserStatus) => {
    const updated = adminService.updateUserStatus(userId, status);
    setUsers(updated);
    setAuditLogs(adminService.getAuditLogs());
    showToast(`User status updated to "${status}"`);
  };

  const handleUpdateApplicationStage = (appId: string, stage: ApplicationStage) => {
    const updated = adminService.updateApplicationStage(appId, stage);
    setApplications(updated);
    setAuditLogs(adminService.getAuditLogs());
    showToast(`Application moved to "${stage.toUpperCase()}"`);
  };

  const handleExportCSV = (dataType: 'activities' | 'users' | 'applications') => {
    adminService.exportToCSV(dataType);
    showToast(`Exported ${dataType}.csv report successfully`);
  };

  const handleTriggerTrafficSpike = () => {
    for (let i = 0; i < 5; i++) {
      adminService.generateSimulatedEvent();
    }
    setActivities(adminService.getActivities());
    setStats(adminService.getStats());
    showToast('Simulated high-traffic surge with 5 simultaneous candidate events');
  };

  const handleClearCache = () => {
    localStorage.removeItem('codeslot_admin_activities');
    localStorage.removeItem('codeslot_admin_users');
    localStorage.removeItem('codeslot_admin_applications');
    localStorage.removeItem('codeslot_admin_ai_sessions');
    localStorage.removeItem('codeslot_admin_audit');

    setUsers(adminService.getUsers());
    setActivities(adminService.getActivities());
    setApplications(adminService.getApplications());
    setAiSessions(adminService.getAISessions());
    setAuditLogs(adminService.getAuditLogs());
    setStats(adminService.getStats());
    showToast('Admin telemetry cache reset to realistic baseline');
  };

  const handleImpersonate = (managedUser: ManagedUser) => {
    if (onImpersonateUser) {
      const session: UserSession = {
        name: managedUser.name,
        email: managedUser.email,
        title: managedUser.title,
        avatar: managedUser.avatar,
        role: 'candidate',
        savedJobIds: ['cs-linear-staff-eng', 'cs-stripe-backend-infra'],
        appliedJobIds: []
      };
      onImpersonateUser(session);
    }
  };

  // Nav Items Configuration
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'activities', label: 'User Activities', icon: Activity, count: activities.length },
    { id: 'users', label: 'User Directory', icon: Users, count: users.length },
    { id: 'applications', label: 'Job Applications', icon: Briefcase, count: applications.length },
    { id: 'ai-studio', label: 'AI Resume Telemetry', icon: Sparkles },
    { id: 'jobs-inventory', label: 'Jobs Inventory', icon: Layers, count: jobs.length },
    { id: 'system', label: 'System Health & Audit', icon: ShieldCheck }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f7f6f2] text-neutral-900 flex font-sans antialiased selection:bg-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-neutral-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* SIDEBAR NAVIGATION (Desktop - LIGHT MODE)                 */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex w-72 h-screen bg-white text-neutral-900 flex-col shrink-0 border-r border-neutral-200/80 select-none overflow-hidden">
        {/* Top Fixed Header of Sidebar */}
        <div className="p-5 pb-4 shrink-0 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-logo text-xl font-extrabold tracking-tight text-neutral-950">
                  CODESLOT
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-900 font-mono text-[10px] font-extrabold tracking-wide uppercase border border-amber-500/25">
                  ADMIN OS
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>v2.4 Production Telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items - INDEPENDENT SCROLL */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-2 pb-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Operations Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white font-bold shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-neutral-800 text-amber-300'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200/70'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Fixed Footer of Sidebar (Light Mode) */}
        <div className="p-4 pt-3.5 border-t border-neutral-200/80 shrink-0 bg-[#faf9f6] space-y-3">
          {/* Admin User Chip (Light Mode) */}
          <div className="p-2.5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                AD
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate">Super Admin</div>
                <div className="text-[10px] text-neutral-500 truncate">admin@gmail.com</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out of Admin Console"
              className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Switch to Public App */}
          <button
            onClick={onNavigateToLanding}
            className="w-full py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-200/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public App</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE DRAWER NAVIGATION (Light Mode)                     */}
      {/* ========================================================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 h-full bg-white text-neutral-900 p-5 flex flex-col justify-between z-10 border-r border-neutral-200 shadow-2xl">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="font-logo text-lg font-bold text-neutral-950">CODESLOT ADMIN</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-bold border border-neutral-200">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-200">
              <button
                onClick={onNavigateToLanding}
                className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center justify-center gap-2 border border-neutral-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center justify-center gap-2 border border-rose-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAIN ADMIN CONTENT AREA (Independent Scrolling)          */}
      {/* ========================================================= */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden bg-[#f7f6f2]">
        {/* Top Fixed Header Bar */}
        <header className="shrink-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-neutral-400">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-extrabold text-neutral-900 capitalize">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                isLiveSimulationActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${isLiveSimulationActive ? 'bg-emerald-500 animate-ping' : 'bg-neutral-400'}`}
              />
              <span>{isLiveSimulationActive ? 'Live Telemetry Ticker Active' : 'Ticker Paused'}</span>
            </button>

            <button
              onClick={onNavigateToJobs}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs Board</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* View Container - INDEPENDENT SCROLL */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 w-full scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'overview' && (
              <AdminOverviewView
                stats={stats}
                activities={activities}
                users={users}
                applications={applications}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onSimulateEvent={handleSimulateSingleEvent}
                onExportCSV={handleExportCSV}
              />
            )}

            {activeTab === 'activities' && (
              <AdminActivitiesView
                activities={activities}
                isLiveSimulationActive={isLiveSimulationActive}
                onToggleSimulation={() => setIsLiveSimulationActive(!isLiveSimulationActive)}
                onSimulateEvent={handleSimulateSingleEvent}
                onExportCSV={() => handleExportCSV('activities')}
              />
            )}

            {activeTab === 'users' && (
              <AdminUsersView
                users={users}
                activities={activities}
                applications={applications}
                onUpdateUserStatus={handleUpdateUserStatus}
                onImpersonateUser={handleImpersonate}
                onExportCSV={() => handleExportCSV('users')}
              />
            )}

            {activeTab === 'applications' && (
              <AdminApplicationsView
                applications={applications}
                onUpdateStage={handleUpdateApplicationStage}
                onExportCSV={() => handleExportCSV('applications')}
              />
            )}

            {activeTab === 'ai-studio' && (
              <AdminAIStudioView sessions={aiSessions} />
            )}

            {activeTab === 'jobs-inventory' && (
              <AdminJobsInventoryView
                jobs={jobs}
                onAddCustomJob={(newJob) => {
                  setJobs([newJob, ...jobs]);
                  showToast(`Published job: "${newJob.title}" at ${newJob.company_name}`);
                }}
              />
            )}

            {activeTab === 'system' && (
              <AdminSystemView
                auditLogs={auditLogs}
                onTriggerTrafficSpike={handleTriggerTrafficSpike}
                onClearCache={handleClearCache}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
