import React from 'react';
import {
  Users,
  Briefcase,
  Sparkles,
  TrendingUp,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Eye,
  Zap,
  Download,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { AdminStats, UserActivityEvent, ManagedUser, JobApplicationRecord } from '../../types/admin';

interface AdminOverviewViewProps {
  stats: AdminStats;
  activities: UserActivityEvent[];
  users: ManagedUser[];
  applications: JobApplicationRecord[];
  onNavigateTab: (tab: string) => void;
  onSimulateEvent: () => void;
  onExportCSV: (type: 'activities' | 'users' | 'applications') => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  stats,
  activities,
  users,
  applications,
  onNavigateTab,
  onSimulateEvent,
  onExportCSV
}) => {
  const recentActivities = activities.slice(0, 6);

  // Group applications by stage
  const pendingScreening = applications.filter((a) => a.stage === 'screening').length;
  const interviewing = applications.filter((a) => a.stage === 'interview').length;
  const offers = applications.filter((a) => a.stage === 'offer').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-neutral-950 via-neutral-900 to-stone-900 text-white p-7 sm:p-9 shadow-xl border border-neutral-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Telemetry Feed Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              CodeSlot Intelligence & Activity Control
            </h1>
            <p className="text-neutral-400 text-sm max-w-xl">
              Real-time monitoring of developer job discovery, candidate applications, and AI Resume Studio operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onSimulateEvent}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-neutral-950" />
              Simulate Live Event
            </button>
            <button
              onClick={() => onExportCSV('activities')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Audit CSV
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -top-20 w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Users */}
        <div
          onClick={() => onNavigateTab('users')}
          className="group p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Registered Developers</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {stats.totalUsers.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3 h-3" />
              +{stats.userGrowthPct}%
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            <strong className="text-neutral-800">{stats.dailyActiveUsers}</strong> active in past 24 hours
          </p>
        </div>

        {/* Card 2: Applications Submitted */}
        <div
          onClick={() => onNavigateTab('applications')}
          className="group p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Job Applications</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {stats.totalApplications.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3 h-3" />
              +{stats.applicationGrowthPct}%
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            <strong className="text-neutral-800">{interviewing}</strong> candidates in final interviews
          </p>
        </div>

        {/* Card 3: AI Resumes Tailored */}
        <div
          onClick={() => onNavigateTab('ai-studio')}
          className="group p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">AI CV Tailoring</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {stats.aiResumesTailored.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="w-3 h-3" />
              +{stats.resumesGrowthPct}%
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Avg ATS gain: <strong className="text-emerald-600">+{stats.avgAtsImprovement}%</strong> per CV
          </p>
        </div>

        {/* Card 4: Platform Health */}
        <div
          onClick={() => onNavigateTab('system')}
          className="group p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">System Uptime</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {stats.systemHealthScore}%
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              Optimal
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Gemini 2.5 Flash API: <strong className="text-emerald-600">18ms avg latency</strong>
          </p>
        </div>
      </div>

      {/* Middle Section: Visual Activity Trends Chart & Live Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Trend Wave & Conversion Funnel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Visual Chart Card */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900">User Activity & Application Velocity</h3>
                <p className="text-xs text-neutral-500">30-day chronological activity and application trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-neutral-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                  Active Users
                </span>
                <span className="flex items-center gap-1.5 text-neutral-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  AI Tailoring
                </span>
                <span className="flex items-center gap-1.5 text-neutral-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Job Applications
                </span>
              </div>
            </div>

            {/* SVG Interactive Area Chart */}
            <div className="h-56 w-full relative">
              <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartGradientDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111215" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#111215" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="chartGradientAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f1ee" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f1ee" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f1ee" strokeDasharray="4 4" />
                <line x1="0" y1="165" x2="500" y2="165" stroke="#e5e5e0" />

                {/* Area 1: Active Users */}
                <path
                  d="M 0,140 Q 60,110 120,125 T 240,80 T 360,60 T 500,35 L 500,165 L 0,165 Z"
                  fill="url(#chartGradientDark)"
                />
                <path
                  d="M 0,140 Q 60,110 120,125 T 240,80 T 360,60 T 500,35"
                  fill="none"
                  stroke="#111215"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Area 2: AI Tailoring */}
                <path
                  d="M 0,155 Q 60,140 120,130 T 240,110 T 360,85 T 500,55 L 500,165 L 0,165 Z"
                  fill="url(#chartGradientAmber)"
                />
                <path
                  d="M 0,155 Q 60,140 120,130 T 240,110 T 360,85 T 500,55"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Curve 3: Job Applications */}
                <path
                  d="M 0,162 Q 60,155 120,145 T 240,130 T 360,115 T 500,80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />

                {/* Highlight Points */}
                <circle cx="240" cy="80" r="4" fill="#111215" stroke="#ffffff" strokeWidth="2" />
                <circle cx="360" cy="85" r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <circle cx="500" cy="35" r="4" fill="#111215" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="flex justify-between items-center text-[11px] text-neutral-400 mt-2 px-1">
                <span>Mar 1</span>
                <span>Mar 8</span>
                <span>Mar 15</span>
                <span>Mar 22</span>
                <span className="font-bold text-neutral-700">Today (Mar 29)</span>
              </div>
            </div>

            {/* Quick Conversion Funnel Row */}
            <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-100">
              <div className="text-center p-3 rounded-xl bg-neutral-50/70">
                <div className="text-xs text-neutral-500 font-medium">Job Views</div>
                <div className="text-lg font-bold text-neutral-900 mt-0.5">28.4k</div>
                <div className="text-[10px] text-neutral-400">100% baseline</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-neutral-50/70">
                <div className="text-xs text-neutral-500 font-medium">Saved to List</div>
                <div className="text-lg font-bold text-neutral-900 mt-0.5">4,120</div>
                <div className="text-[10px] text-indigo-600 font-medium">14.5% rate</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-neutral-50/70">
                <div className="text-xs text-neutral-500 font-medium">AI Tailored</div>
                <div className="text-lg font-bold text-neutral-900 mt-0.5">892</div>
                <div className="text-[10px] text-amber-600 font-medium">21.6% conv</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                <div className="text-xs text-emerald-800 font-medium">Applied</div>
                <div className="text-lg font-bold text-emerald-950 mt-0.5">684</div>
                <div className="text-[10px] text-emerald-600 font-bold">76.7% close</div>
              </div>
            </div>
          </div>

          {/* Popular Specializations Distribution */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 mb-4">Engineering Talent by Specialization</h3>
            <div className="space-y-3.5">
              {[
                { name: 'Distributed Systems & Backend', count: 480, pct: 34, color: 'bg-neutral-900' },
                { name: 'Frontend Architecture (React/Next)', count: 365, pct: 26, color: 'bg-indigo-600' },
                { name: 'AI & Machine Learning Engineering', count: 280, pct: 20, color: 'bg-amber-500' },
                { name: 'Platform, Cloud & DevOps (K8s/AWS)', count: 185, pct: 13, color: 'bg-emerald-600' },
                { name: 'Application Security & Systems', count: 98, pct: 7, color: 'bg-rose-500' }
              ].map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-neutral-700">
                    <span>{item.name}</span>
                    <span className="text-neutral-500">
                      {item.count} devs ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Real-time Activity Pulse & Quick Actions */}
        <div className="space-y-6">
          {/* Live Activity Ticker Box */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <h3 className="text-base font-bold text-neutral-900">Live Activity Pulse</h3>
                </div>
                <button
                  onClick={() => onNavigateTab('activities')}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3.5 divide-y divide-neutral-100">
                {recentActivities.map((act) => (
                  <div key={act.id} className="pt-3 first:pt-0 flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                        act.category === 'jobs'
                          ? 'bg-emerald-50 text-emerald-700'
                          : act.category === 'ai_studio'
                          ? 'bg-amber-50 text-amber-700'
                          : act.category === 'auth'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {act.category === 'jobs' ? (
                        <Briefcase className="w-3.5 h-3.5" />
                      ) : act.category === 'ai_studio' ? (
                        <Sparkles className="w-3.5 h-3.5" />
                      ) : (
                        <Activity className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-900 truncate">{act.userName}</span>
                        <span className="text-[10px] text-neutral-400 shrink-0">
                          {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">{act.action}</p>
                      <p className="text-[11px] text-neutral-400 line-clamp-1">{act.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100">
              <button
                onClick={onSimulateEvent}
                className="w-full py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Trigger New Simulated Event</span>
              </button>
            </div>
          </div>

          {/* Candidate Pipeline Summary */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 mb-4">Pipeline Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-neutral-700">Under Screening</span>
                </div>
                <span className="text-sm font-bold text-neutral-900">{pendingScreening}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-amber-900">Interviewing</span>
                </div>
                <span className="text-sm font-bold text-amber-950">{interviewing}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-900">Offers Extended</span>
                </div>
                <span className="text-sm font-bold text-emerald-950">{offers}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('applications')}
              className="mt-4 w-full py-2 text-center text-xs font-bold text-neutral-900 hover:underline cursor-pointer"
            >
              View Full Application Kanban Board →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
