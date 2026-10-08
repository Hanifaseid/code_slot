import React, { useState, useMemo } from 'react';
import {
  Activity,
  Search,
  Filter,
  Download,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Globe,
  Laptop,
  Clock,
  Sparkles,
  Briefcase,
  Key,
  Shield,
  User,
  ChevronDown,
  X,
  Play,
  Pause
} from 'lucide-react';
import { UserActivityEvent, ActivityCategory, EventSeverity } from '../../types/admin';

interface AdminActivitiesViewProps {
  activities: UserActivityEvent[];
  isLiveSimulationActive: boolean;
  onToggleSimulation: () => void;
  onSimulateEvent: () => void;
  onExportCSV: () => void;
}

export const AdminActivitiesView: React.FC<AdminActivitiesViewProps> = ({
  activities,
  isLiveSimulationActive,
  onToggleSimulation,
  onSimulateEvent,
  onExportCSV
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<UserActivityEvent | null>(null);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Category filter
      if (selectedCategory !== 'all' && act.category !== selectedCategory) {
        return false;
      }
      // Severity filter
      if (selectedSeverity !== 'all' && act.severity !== selectedSeverity) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = act.userName.toLowerCase().includes(query);
        const matchesEmail = act.userEmail.toLowerCase().includes(query);
        const matchesAction = act.action.toLowerCase().includes(query);
        const matchesDetails = act.details.toLowerCase().includes(query);
        const matchesLocation = act.location.toLowerCase().includes(query);
        const matchesIp = act.ip.toLowerCase().includes(query);
        return matchesName || matchesEmail || matchesAction || matchesDetails || matchesLocation || matchesIp;
      }
      return true;
    });
  }, [activities, selectedCategory, selectedSeverity, searchQuery]);

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Activities', count: activities.length },
    { id: 'jobs', label: 'Job Actions', count: activities.filter((a) => a.category === 'jobs').length },
    { id: 'ai_studio', label: 'AI Resume Studio', count: activities.filter((a) => a.category === 'ai_studio').length },
    { id: 'auth', label: 'Auth & Logins', count: activities.filter((a) => a.category === 'auth').length },
    { id: 'account', label: 'Profile & Account', count: activities.filter((a) => a.category === 'account').length },
    { id: 'system', label: 'Security & System', count: activities.filter((a) => a.category === 'system').length }
  ];

  const getSeverityBadge = (severity: EventSeverity) => {
    switch (severity) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Success
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Warning
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/50">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            Critical
          </span>
        );
      case 'info':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/50">
            <Info className="w-3 h-3 text-blue-600" />
            Info
          </span>
        );
    }
  };

  const getCategoryIcon = (category: ActivityCategory) => {
    switch (category) {
      case 'jobs':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'ai_studio':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'auth':
        return <Key className="w-4 h-4 text-blue-600" />;
      case 'system':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'account':
      default:
        return <User className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Quick Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              User Activity Event Stream
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-xs font-bold">
              {activities.length} Events Logged
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time chronological telemetry across developer logins, searches, job bookmarks, and AI resume tailoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Live Simulator Toggle */}
          <button
            onClick={onToggleSimulation}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isLiveSimulationActive
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
          >
            {isLiveSimulationActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Live Feed Active</span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Start Live Ticker</span>
              </>
            )}
          </button>

          <button
            onClick={onSimulateEvent}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-neutral-950" />
            <span>Generate Test Event</span>
          </button>

          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80'
                }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Severity Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, email, action keyword, IP, or location..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="sm:col-span-4 flex items-center gap-2">
            <div className="flex-1 relative">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
              >
                <option value="all">All Severities</option>
                <option value="success">Success only</option>
                <option value="info">Info only</option>
                <option value="warning">Warnings only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Timestamp & User</th>
                <th className="py-3 px-4">Event & Action</th>
                <th className="py-3 px-4 hidden md:table-cell">Activity Details</th>
                <th className="py-3 px-4 hidden lg:table-cell">Client Info & Geo</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <Activity className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                    <p className="font-semibold text-neutral-600">No activity events match your filter</p>
                    <p className="text-xs text-neutral-400 mt-1">Try resetting the search query or category filter</p>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr
                    key={act.id}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                    onClick={() => setSelectedEvent(act)}
                  >
                    {/* Timestamp & User */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {act.userName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-neutral-900 truncate max-w-[140px]">{act.userName}</div>
                          <div className="text-[11px] text-neutral-400 truncate max-w-[140px]">{act.userEmail}</div>
                          <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Event & Action */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-neutral-100 shrink-0">
                          {getCategoryIcon(act.category)}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-800 line-clamp-1">{act.action}</div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                            {act.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Details (Desk) */}
                    <td className="py-3.5 px-4 hidden md:table-cell max-w-xs">
                      <p className="text-neutral-600 line-clamp-2">{act.details}</p>
                    </td>

                    {/* Client & Geo (Desk) */}
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <div className="space-y-0.5 text-neutral-500">
                        <div className="flex items-center gap-1.5 text-neutral-700">
                          <Globe className="w-3 h-3 text-neutral-400" />
                          <span className="truncate max-w-[150px]">{act.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          <Laptop className="w-3 h-3 text-neutral-400" />
                          <span className="truncate max-w-[150px]">{act.device}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {getSeverityBadge(act.severity)}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(act);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 font-semibold text-[11px] transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Details Modal Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-neutral-100">
                  {getCategoryIcon(selectedEvent.category)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{selectedEvent.action}</h3>
                  <span className="text-xs text-neutral-400">Event ID: {selectedEvent.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-50 space-y-2">
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Event Summary</div>
                <p className="text-neutral-800 text-sm leading-relaxed">{selectedEvent.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-neutral-50">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">User Identity</div>
                  <div className="font-bold text-neutral-900 mt-0.5">{selectedEvent.userName}</div>
                  <div className="text-neutral-500 text-[11px]">{selectedEvent.userEmail}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Timestamp (UTC)</div>
                  <div className="font-bold text-neutral-900 mt-0.5">
                    {new Date(selectedEvent.timestamp).toLocaleDateString()}
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    {new Date(selectedEvent.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Geographic Location</div>
                  <div className="font-bold text-neutral-900 mt-0.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">IP: {selectedEvent.ip}</div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Client Runtime</div>
                  <div className="font-bold text-neutral-900 mt-0.5 flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{selectedEvent.device}</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">Category: {selectedEvent.category}</div>
                </div>
              </div>

              {selectedEvent.metadata && (
                <div>
                  <div className="text-neutral-500 text-[11px] font-bold uppercase mb-1.5">JSON Payload Payload</div>
                  <pre className="p-3 rounded-xl bg-neutral-900 text-emerald-400 text-[11px] font-mono overflow-x-auto">
                    {JSON.stringify(selectedEvent.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
