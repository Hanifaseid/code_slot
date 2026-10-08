import React from 'react';
import { JobFilters } from '../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Globe,
  Briefcase,
  Sparkles,
  Database,
  Layers,
  Code2,
  Terminal,
  Cpu,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Rocket
} from 'lucide-react';

interface JobFiltersBarProps {
  filters: JobFilters;
  onChange: (updated: Partial<JobFilters>) => void;
  totalResults: number;
  onReset: () => void;
  categoryCounts?: Record<string, number>;
}

// Explicit specialization categories with priority on Frontend, Backend, Full Stack
export const SPECIALIZATION_TRACKS = [
  { id: 'all', label: 'All Tech Roles', icon: Sparkles },
  { id: 'Frontend', label: 'Frontend', icon: Code2 },
  { id: 'Backend', label: 'Backend', icon: Database },
  { id: 'Full Stack', label: 'Full Stack', icon: Layers },
  { id: 'DevOps / Cloud', label: 'DevOps / Cloud', icon: Terminal },
  { id: 'AI & Machine Learning', label: 'AI & ML', icon: Cpu },
  { id: 'Mobile', label: 'Mobile', icon: Smartphone },
  { id: 'Security & QA', label: 'Security & QA', icon: ShieldCheck },
  { id: 'Data & Analytics', label: 'Data & Analytics', icon: BarChart3 }
];

export const JobFiltersBar: React.FC<JobFiltersBarProps> = ({
  filters,
  onChange,
  totalResults,
  onReset,
  categoryCounts = {}
}) => {
  const isFiltered =
    Boolean(filters.search) ||
    filters.category !== 'all' ||
    filters.jobType !== 'all' ||
    filters.location !== 'all' ||
    (Boolean(filters.source) && filters.source !== 'all') ||
    Boolean(filters.startupOnly) ||
    filters.sortBy !== 'recent';

  const isStartupActive = filters.source === 'startups' || filters.source === 'yc' || filters.startupOnly;

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/90 p-4 sm:p-6 shadow-sm space-y-5 text-left transition-all">
      {/* Search and View Controls Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="job-search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by role title, startup, company, or stack (e.g. YC, React, Next.js, Go, Python, Rust)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 text-neutral-900 text-xs sm:text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-2xs"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Quick Startup Filter Toggle */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 flex-wrap">
          {/* Quick Startup Filter Button */}
          <button
            id="quick-startup-filter-btn"
            type="button"
            onClick={() => {
              if (isStartupActive) {
                onChange({ source: 'all', startupOnly: false });
              } else {
                onChange({ source: 'startups', startupOnly: true });
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
              isStartupActive
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25 ring-2 ring-orange-400/40'
                : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200/80'
            }`}
            title="Toggle YC & Startup jobs"
          >
            <Rocket className={`w-3.5 h-3.5 ${isStartupActive ? 'animate-bounce' : 'text-orange-600'}`} />
            <span>YC & Startups</span>
          </button>

          <div className="p-1 rounded-2xl bg-neutral-100 border border-neutral-200/60 inline-flex items-center">
            <button
              id="view-mode-grid-btn"
              type="button"
              onClick={() => onChange({ viewMode: 'grid' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-neutral-950'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              id="view-mode-list-btn"
              type="button"
              onClick={() => onChange({ viewMode: 'list' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                filters.viewMode === 'list'
                  ? 'bg-white text-neutral-950'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Compact List View"
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specialization Filter Pills (Frontend, Backend, Full Stack prominent) */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Specialization & Technical Track
          </span>
          <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
            Select track to filter instantly
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {SPECIALIZATION_TRACKS.map((track) => {
            const isSelected = filters.category === track.id;
            const Icon = track.icon;
            const count = track.id === 'all' ? undefined : categoryCounts[track.id];

            return (
              <button
                key={track.id}
                id={`filter-track-${track.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onChange({ category: track.id })}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-neutral-950 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-950'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                <span>{track.label}</span>
                {typeof count === 'number' && count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Dropdown Row (Source, Employment type, Location, Sort, Reset, Results) */}
      <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Source dropdown: YC Startups, USA Startups, Remotive, Jobicy, RemoteOK, Arbeitnow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700">
            <Rocket className="w-3.5 h-3.5 text-orange-600" />
            <select
              id="filter-source"
              value={filters.source || 'all'}
              onChange={(e) => onChange({ source: e.target.value, startupOnly: e.target.value === 'startups' || e.target.value === 'yc' })}
              className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Sources & Live Feeds</option>
              <option value="yc">🚀 Y Combinator / YC Startups</option>
              <option value="startups">🦄 All Startups (USA & Global)</option>
              <option value="usa">🇺🇸 USA Tech Startups & Jobs</option>
              <option value="wwr">🌐 WeWorkRemotely Global</option>
              <option value="workingnomads">🌍 WorkingNomads Global</option>
              <option value="remotive">⚡ Remotive Global Feed</option>
              <option value="jobicy">🎯 Jobicy Tech Portal</option>
              <option value="remoteok">💻 RemoteOK Network</option>
              <option value="arbeitnow">🇪🇺 Arbeitnow Tech Feed</option>
            </select>
          </div>

          {/* Job Type dropdown */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700">
            <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
            <select
              id="filter-job-type"
              value={filters.jobType}
              onChange={(e) => onChange({ jobType: e.target.value })}
              className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Employment Types</option>
              <option value="Full-time">Full-time Roles</option>
              <option value="Contract">Contract / Freelance</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          {/* Location dropdown */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <select
              id="filter-location"
              value={filters.location}
              onChange={(e) => onChange({ location: e.target.value })}
              className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Any Remote Location</option>
              <option value="worldwide">Worldwide / Anywhere</option>
              <option value="americas">Americas / US / Canada</option>
              <option value="europe">Europe / EMEA</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              id="filter-sort-by"
              value={filters.sortBy}
              onChange={(e) => onChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="recent">Sort: Most Recent</option>
              <option value="salary">Sort: Compensation</option>
              <option value="company">Sort: Company Name</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-neutral-500 hover:text-neutral-950 font-medium px-2.5 py-1.5 rounded-xl hover:bg-neutral-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Results Count Badge */}
        <div className="text-neutral-600 font-medium text-xs flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            Showing <strong className="text-neutral-900 font-bold">{totalResults}</strong> real remote tech roles
          </span>
        </div>
      </div>
    </div>
  );
};
