import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Building,
  User,
  Kanban,
  List,
  Sparkles,
  Download
} from 'lucide-react';
import { JobApplicationRecord, ApplicationStage } from '../../types/admin';
import { CustomFilterDropdown, DropdownOption } from '../CustomFilterDropdown';

interface AdminApplicationsViewProps {
  applications: JobApplicationRecord[];
  onUpdateStage: (appId: string, stage: ApplicationStage) => void;
  onExportCSV: () => void;
}

export const AdminApplicationsView: React.FC<AdminApplicationsViewProps> = ({
  applications,
  onUpdateStage,
  onExportCSV
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  const companies = useMemo(() => {
    const list = Array.from(new Set(applications.map((a) => a.company)));
    return ['all', ...list];
  }, [applications]);

  const companyOptions = useMemo<DropdownOption[]>(() => {
    return companies.map((c) => ({
      value: c,
      label: c === 'all' ? 'All Companies' : c,
    }));
  }, [companies]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (selectedCompany !== 'all' && app.company !== selectedCompany) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesUser = app.userName.toLowerCase().includes(q) || app.userEmail.toLowerCase().includes(q);
        const matchesJob = app.jobTitle.toLowerCase().includes(q) || app.company.toLowerCase().includes(q);
        return matchesUser || matchesJob;
      }
      return true;
    });
  }, [applications, selectedCompany, searchQuery]);

  const stages: { id: ApplicationStage; title: string; color: string; bg: string }[] = [
    { id: 'applied', title: 'Submitted', color: 'text-neutral-700', bg: 'bg-neutral-100' },
    { id: 'screening', title: 'Screening Review', color: 'text-blue-700', bg: 'bg-blue-50' },
    { id: 'interview', title: 'Technical Interview', color: 'text-amber-700', bg: 'bg-amber-50' },
    { id: 'offer', title: 'Offer Extended', color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { id: 'rejected', title: 'Archived', color: 'text-neutral-500', bg: 'bg-neutral-100' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Candidate <span className="text-orange-500 font-extrabold">J</span>ob <span className="text-orange-500 font-extrabold">A</span>pplication <span className="text-orange-500 font-extrabold">P</span>ipeline
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              {applications.length} Active Records
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Track developer candidate applications across verified employer portals, match scores, and interview stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200/80">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search and Company Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications by candidate, role, or company..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div className="sm:col-span-4">
          <CustomFilterDropdown
            id="admin-filter-company"
            value={selectedCompany}
            onChange={(val) => setSelectedCompany(val)}
            options={companyOptions}
            isActive={selectedCompany !== 'all'}
            className="w-full"
          />
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {stages.map((stage) => {
            const stageApps = filteredApplications.filter((a) => a.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="bg-neutral-50/80 rounded-2xl p-4 border border-neutral-200/60 min-h-[500px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${stage.color}`}>{stage.title}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${stage.bg} ${stage.color}`}>
                    {stageApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageApps.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-[11px] text-neutral-400 border border-dashed border-neutral-200 rounded-xl">
                      Empty stage
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:shadow-xs transition-all space-y-2.5 text-xs group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-neutral-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                            {app.jobTitle}
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-neutral-900 text-white font-extrabold text-[10px] shrink-0">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                            {app.matchScore}%
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-neutral-600 font-semibold text-[11px]">
                          <Building className="w-3 h-3 text-neutral-400" />
                          <span>{app.company}</span>
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-neutral-400" />
                            <span className="font-medium text-neutral-700 truncate max-w-[90px]">{app.userName}</span>
                          </div>
                          <span>{new Date(app.appliedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                        </div>

                        {/* Stage Mover Selector */}
                        <div className="pt-1 flex items-center justify-between gap-1">
                          <span className="text-[10px] text-neutral-400 font-medium">Move to:</span>
                          <select
                            value={app.stage}
                            onChange={(e) => onUpdateStage(app.id, e.target.value as ApplicationStage)}
                            className="text-[10px] bg-neutral-100 hover:bg-orange-50 hover:text-orange-950 hover:border-orange-300 rounded-lg px-2 py-1 font-bold text-neutral-800 border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 accent-orange-500 cursor-pointer transition-colors"
                          >
                            <option value="applied">Submitted</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Archived</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 sm:px-6">Candidate</th>
                  <th className="py-3 px-4">Opportunity & Employer</th>
                  <th className="py-3 px-4 text-center">Match Score</th>
                  <th className="py-3 px-4">Resume Version</th>
                  <th className="py-3 px-4 text-center">Current Stage</th>
                  <th className="py-3 px-4 text-right">Advance Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-900">
                      <div>{app.userName}</div>
                      <div className="text-[11px] text-neutral-400 font-normal">{app.userEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-800">{app.jobTitle}</div>
                      <div className="text-neutral-500 text-[11px] font-semibold">{app.company}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 text-white font-bold text-xs">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {app.matchScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">{app.resumeVersion}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-neutral-100 text-neutral-800">
                        {app.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={app.stage}
                        onChange={(e) => onUpdateStage(app.id, e.target.value as ApplicationStage)}
                        className="px-2.5 py-1 rounded-xl bg-neutral-100 hover:bg-orange-50 hover:text-orange-950 hover:border-orange-300 text-neutral-800 font-semibold text-xs border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 accent-orange-500 cursor-pointer transition-colors"
                      >
                        <option value="applied">Submitted</option>
                        <option value="screening">Screening</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
