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
  Rocket,
  Award,
} from 'lucide-react';
import { CustomFilterDropdown, DropdownOption } from './CustomFilterDropdown';

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

const SOURCE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All Sources & Live Feeds' },
  { value: 'yc', label: '🚀 Y Combinator / YC Startups' },
  { value: 'startups', label: '🦄 All Startups (USA & Global)' },
  { value: 'usa', label: '🇺🇸 USA Tech Startups & Jobs' },
  { value: 'wwr', label: '🌐 WeWorkRemotely Global' },
  { value: 'workingnomads', label: '🌍 WorkingNomads Global' },
  { value: 'remotive', label: '⚡ Remotive Global Feed' },
  { value: 'jobicy', label: '🎯 Jobicy Tech Portal' },
  { value: 'remoteok', label: '💻 RemoteOK Network' },
  { value: 'arbeitnow', label: '🇪🇺 Arbeitnow Tech Feed' },
];

const EXPERIENCE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All Seniority Levels' },
  { value: 'junior', label: '🌱 Junior / Entry (0-2 yrs)' },
  { value: 'intermediate', label: '🚀 Intermediate / Mid (2-5 yrs)' },
  { value: 'senior', label: '⚡ Senior Engineer (5+ yrs)' },
  { value: 'lead', label: '👑 Staff / Lead / Principal' },
];

const JOB_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All Employment Types' },
  { value: 'Full-time', label: 'Full-time Roles' },
  { value: 'Contract', label: 'Contract / Freelance' },
  { value: 'Part-time', label: 'Part-time' },
];

const LOCATION_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'Any Remote Location' },
  { value: 'worldwide', label: 'Worldwide / Anywhere' },
  { value: 'americas', label: 'Americas / US / Canada' },
  { value: 'europe', label: 'Europe / EMEA' },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: 'recent', label: 'Sort: Most Recent' },
  { value: 'salary', label: 'Sort: Compensation' },
  { value: 'company', label: 'Sort: Company Name' },
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
    (Boolean(filters.experienceLevel) && filters.experienceLevel !== 'all') ||
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
          <Search className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="job-search-input"
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by role title, startup, company, or stack (e.g. YC, React, Next.js, Go, Python, Rust)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 text-neutral-900 text-xs sm:text-sm placeholder:text-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200/60 focus:bg-white transition-all shadow-2xs"
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
                : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-300'
            }`}
            title="Toggle YC & Startup jobs"
          >
            <Rocket className={`w-3.5 h-3.5 ${isStartupActive ? 'animate-bounce' : 'text-orange-600'}`} />
            <span><span className="text-orange-600">Y</span>C & <span className="text-orange-600">S</span>tartups</span>
          </button>

          <div className="p-1 rounded-2xl bg-neutral-100 border border-neutral-200/60 inline-flex items-center">
            <button
              id="view-mode-grid-btn"
              type="button"
              onClick={() => onChange({ viewMode: 'grid' })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-neutral-950 shadow-2xs'
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
                  ? 'bg-white text-neutral-950 shadow-2xs'
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
            <span className="text-orange-500 font-extrabold">S</span>pecialization &amp; <span className="text-orange-500 font-extrabold">T</span>echnical <span className="text-orange-500 font-extrabold">T</span>rack
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
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-950'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                <span>
                  {track.id === 'all' ? (
                    <>All <span className="text-orange-500 font-bold">T</span>ech Roles</>
                  ) : (
                    track.label
                  )}
                </span>
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

      {/* Secondary Dropdown Row (Source, Seniority, Employment type, Location, Sort, Reset, Results) */}
      <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Source dropdown: YC Startups, USA Startups, Remotive, Jobicy, RemoteOK, Arbeitnow */}
          <CustomFilterDropdown
            id="filter-source"
            value={filters.source || 'all'}
            onChange={(val) => onChange({ source: val, startupOnly: val === 'startups' || val === 'yc' })}
            options={SOURCE_OPTIONS}
            icon={<Rocket className="w-3.5 h-3.5" />}
            isActive={Boolean(filters.source && filters.source !== 'all')}
            className="min-w-[190px]"
          />

          {/* Experience Level dropdown */}
          <CustomFilterDropdown
            id="filter-experience-level"
            value={filters.experienceLevel || 'all'}
            onChange={(val) => onChange({ experienceLevel: val })}
            options={EXPERIENCE_OPTIONS}
            icon={<Award className="w-3.5 h-3.5" />}
            isActive={Boolean(filters.experienceLevel && filters.experienceLevel !== 'all')}
            className="min-w-[175px]"
          />

          {/* Job Type dropdown */}
          <CustomFilterDropdown
            id="filter-job-type"
            value={filters.jobType || 'all'}
            onChange={(val) => onChange({ jobType: val })}
            options={JOB_TYPE_OPTIONS}
            icon={<Briefcase className="w-3.5 h-3.5" />}
            isActive={Boolean(filters.jobType && filters.jobType !== 'all')}
            className="min-w-[170px]"
          />

          {/* Location dropdown */}
          <CustomFilterDropdown
            id="filter-location"
            value={filters.location || 'all'}
            onChange={(val) => onChange({ location: val })}
            options={LOCATION_OPTIONS}
            icon={<Globe className="w-3.5 h-3.5" />}
            isActive={Boolean(filters.location && filters.location !== 'all')}
            className="min-w-[175px]"
          />

          {/* Sort By */}
          <CustomFilterDropdown
            id="filter-sort-by"
            value={filters.sortBy || 'recent'}
            onChange={(val) => onChange({ sortBy: val as any })}
            options={SORT_OPTIONS}
            icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
            isActive={Boolean(filters.sortBy && filters.sortBy !== 'recent')}
            className="min-w-[165px]"
          />

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-neutral-500 hover:text-neutral-950 font-medium px-2.5 py-1.5 rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-1 cursor-pointer border border-transparent hover:border-orange-200"
            >
              <X className="w-3.5 h-3.5 text-orange-500" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Results Count Badge */}
        <div className="text-neutral-700 font-semibold text-xs flex items-center gap-1.5 bg-orange-50/80 px-3.5 py-2 rounded-2xl border border-orange-200/90 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>
            Showing <strong className="text-neutral-950 font-extrabold">{totalResults}</strong> real <span className="text-orange-600 font-bold">R</span>emote <span className="text-orange-600 font-bold">T</span>ech roles
          </span>
        </div>
      </div>
    </div>
  );
};
