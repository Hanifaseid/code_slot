import React, { useState, useEffect, useMemo } from 'react';
import { Job, JobFilters, UserSession } from '../types';
import { fetchRealJobs } from '../services/jobService';
import { JobCard } from './JobCard';
import { JobListItem } from './JobListItem';
import { JobFiltersBar } from './JobFiltersBar';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Bookmark,
  Sparkles,
  LogOut,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface JobsPortalProps {
  user: UserSession;
  onSelectJob: (jobId: string) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  onAiResumeClick?: (job?: Job) => void;
}

const ITEMS_PER_PAGE = 16;

export const JobsPortal: React.FC<JobsPortalProps> = ({
  user,
  onSelectJob,
  onLogout,
  onNavigateHome,
  onAiResumeClick
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const [refreshNotice, setRefreshNotice] = useState<{ count: number; timestamp: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('codeslot_saved_jobs');
      return stored ? JSON.parse(stored) : user.savedJobIds || [];
    } catch {
      return user.savedJobIds || [];
    }
  });
  const [onlySaved, setOnlySaved] = useState(false);

  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: 'all',
    jobType: 'all',
    location: 'all',
    source: 'all',
    startupOnly: false,
    viewMode: 'grid',
    sortBy: 'recent'
  });

  // Load jobs from real multi-source aggregator with forceRefresh support
  const loadJobs = async (forceRefresh: boolean = false) => {
    if (jobs.length === 0) {
      setLoading(true);
    }
    if (forceRefresh) {
      setIsRefreshing(true);
    }
    setError(null);
    try {
      const data = await fetchRealJobs(forceRefresh);
      setJobs(data);
      setCurrentPage(1);
      setLastRefreshedAt(new Date());
      if (forceRefresh) {
        setRefreshNotice({
          count: data.length,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError('Unable to load live jobs at the moment. Please try refreshing.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Every time the user logs in (or component mounts for the authenticated user), fetch fresh data from sites
  useEffect(() => {
    loadJobs(true);
  }, [user?.email]);

  // Auto-dismiss the live feeds refreshed notification after 6 seconds
  useEffect(() => {
    if (refreshNotice) {
      const timer = setTimeout(() => {
        setRefreshNotice(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [refreshNotice]);

  const handleToggleSave = (jobId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedJobIds((prev) => {
      const next = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      try {
        localStorage.setItem('codeslot_saved_jobs', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Pre-calculate track counts across all jobs
  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Frontend: 0,
      Backend: 0,
      'Full Stack': 0,
      'DevOps / Cloud': 0,
      'AI & Machine Learning': 0,
      Mobile: 0,
      'Security & QA': 0,
      'Data & Analytics': 0
    };

    jobs.forEach((job) => {
      const spec = job.specialization || job.category;
      if (counts[spec] !== undefined) {
        counts[spec]++;
      } else {
        // Fallback title matching
        const jobTags = Array.isArray(job.tags) ? job.tags.filter(Boolean).map(String) : [];
        const t = `${job.title || ''} ${jobTags.join(' ')}`.toLowerCase();
        if (t.includes('frontend') || t.includes('react') || t.includes('vue') || t.includes('angular') || t.includes('ui ')) {
          counts['Frontend']++;
        } else if (t.includes('backend') || t.includes('python') || t.includes('golang') || t.includes('go ') || t.includes('java ') || t.includes('rust') || t.includes('api')) {
          counts['Backend']++;
        } else if (t.includes('full stack') || t.includes('fullstack') || t.includes('full-stack')) {
          counts['Full Stack']++;
        }
      }
    });

    return counts;
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Saved filter
      if (onlySaved && !savedJobIds.includes(job.id)) {
        return false;
      }

      const safeTags: string[] = Array.isArray(job.tags)
        ? job.tags.filter(Boolean).map((t) => String(t).toLowerCase())
        : [];
      const titleLower = String(job.title || '').toLowerCase();
      const companyLower = String(job.company_name || '').toLowerCase();
      const locLower = String(job.candidate_required_location || '').toLowerCase();
      const specLower = String(job.specialization || job.category || '').toLowerCase();
      const srcLower = String(job.source || '').toLowerCase();

      // Search keyword filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchTitle = titleLower.includes(query);
        const matchCompany = companyLower.includes(query);
        const matchTags = safeTags.some((t) => t.includes(query));
        const matchLoc = locLower.includes(query);
        const matchSpec = specLower.includes(query);
        if (!matchTitle && !matchCompany && !matchTags && !matchLoc && !matchSpec) {
          return false;
        }
      }

      // Specialization / Category filter (Frontend, Backend, Full Stack, etc.)
      if (filters.category !== 'all') {
        const target = filters.category.toLowerCase();
        const jobSpec = specLower;
        const combined = `${titleLower} ${safeTags.join(' ')}`;

        if (target === 'frontend') {
          const isFront =
            jobSpec === 'frontend' ||
            combined.includes('frontend') ||
            combined.includes('front-end') ||
            combined.includes('front end') ||
            combined.includes('react') ||
            combined.includes('vue') ||
            combined.includes('angular') ||
            combined.includes('next.js') ||
            combined.includes('svelte') ||
            combined.includes('ui engineer') ||
            combined.includes('web developer');
          if (!isFront) return false;
        } else if (target === 'backend') {
          const isBack =
            jobSpec === 'backend' ||
            combined.includes('backend') ||
            combined.includes('back-end') ||
            combined.includes('back end') ||
            combined.includes('golang') ||
            combined.includes('go engineer') ||
            combined.includes('python') ||
            combined.includes('java ') ||
            combined.includes('c#') ||
            combined.includes('.net') ||
            combined.includes('rust') ||
            combined.includes('ruby') ||
            combined.includes('rails') ||
            combined.includes('distributed systems') ||
            combined.includes('api engineer') ||
            combined.includes('database');
          if (!isBack) return false;
        } else if (target === 'full stack' || target === 'fullstack') {
          const isFull =
            jobSpec === 'full stack' ||
            jobSpec === 'fullstack' ||
            combined.includes('full stack') ||
            combined.includes('fullstack') ||
            combined.includes('full-stack');
          if (!isFull) return false;
        } else {
          // General matching for DevOps, AI, Mobile, etc.
          const matchesSpec = jobSpec.includes(target);
          const matchesCombined = combined.includes(target);
          if (!matchesSpec && !matchesCombined) {
            return false;
          }
        }
      }

      // Job Type
      if (filters.jobType !== 'all') {
        const jobTypeLower = String(job.job_type || '').toLowerCase();
        if (!jobTypeLower.includes(filters.jobType.toLowerCase())) {
          return false;
        }
      }

      // Location
      if (filters.location !== 'all') {
        const loc = locLower;
        if (filters.location === 'worldwide' && !loc.includes('world') && !loc.includes('anywhere') && !loc.includes('remote')) {
          return false;
        }
        if (filters.location === 'americas' && !loc.includes('us') && !loc.includes('usa') && !loc.includes('america') && !loc.includes('canada') && !loc.includes('world')) {
          return false;
        }
        if (filters.location === 'europe' && !loc.includes('eu') && !loc.includes('europe') && !loc.includes('uk') && !loc.includes('germany') && !loc.includes('world')) {
          return false;
        }
      }

      // Source / Platform filter
      if (filters.source && filters.source !== 'all') {
        const s = filters.source.toLowerCase();
        const src = srcLower;
        const tags = safeTags;

        if (s === 'yc') {
          const isYC =
            src.includes('y combinator') ||
            src.includes('yc') ||
            tags.some((t) => t.includes('yc'));
          if (!isYC) return false;
        } else if (s === 'startups') {
          const isStartup =
            src.includes('startup') ||
            src.includes('y combinator') ||
            src.includes('yc') ||
            tags.some((t) => t.includes('startup'));
          if (!isStartup) return false;
        } else if (s === 'usa') {
          const isUSA =
            src.includes('usa') ||
            tags.some((t) => t.includes('usa')) ||
            locLower.includes('usa') ||
            locLower.includes('us remote') ||
            locLower.includes('united states');
          if (!isUSA) return false;
        } else if (s === 'wwr' || s === 'weworkremotely') {
          if (!src.includes('weworkremotely')) return false;
        } else if (s === 'workingnomads') {
          if (!src.includes('workingnomads')) return false;
        } else if (s === 'remotive') {
          if (!src.includes('remotive')) return false;
        } else if (s === 'jobicy') {
          if (!src.includes('jobicy')) return false;
        } else if (s === 'remoteok') {
          if (!src.includes('remoteok')) return false;
        } else if (s === 'arbeitnow') {
          if (!src.includes('arbeitnow')) return false;
        }
      }

      // Explicit startupOnly toggle
      if (filters.startupOnly) {
        const src = srcLower;
        const tags = safeTags;
        const isStartup =
          src.includes('startup') ||
          src.includes('y combinator') ||
          src.includes('yc') ||
          tags.some((t) => t.includes('startup'));
        if (!isStartup) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'company') {
        return a.company_name.localeCompare(b.company_name);
      }
      if (filters.sortBy === 'salary') {
        const getSal = (s?: string) => {
          if (!s) return 0;
          const match = s.match(/\d+/g);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getSal(b.salary) - getSal(a.salary);
      }
      // default 'recent'
      return new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime();
    });
  }, [jobs, filters, onlySaved, savedJobIds]);

  // Reset page to 1 on filter update
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, onlySaved]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111215] flex flex-col font-sans w-full relative">
      {/* Top Floating Alert Mode for Live Feeds */}
      {refreshNotice && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg transition-all duration-300 animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-900/95 backdrop-blur-md text-white shadow-2xl border border-neutral-800 ring-1 ring-black/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Live Feeds Refreshed</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded-md border border-emerald-800/60">
                    {refreshNotice.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 truncate">
                  Loaded {refreshNotice.count} verified tech jobs from YC, Remotive, Jobicy & global feeds.
                </p>
              </div>
            </div>
            <button
              onClick={() => setRefreshNotice(null)}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Bar - Full Width Fluid Container */}
      <header className="sticky top-0 z-30 bg-[#fbfaf7]/95 backdrop-blur-md border-b border-neutral-200/80 w-full">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="font-logo text-xl sm:text-[22px] font-extrabold text-neutral-950 tracking-tight select-none hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="CodeSlot Home"
            >
              CODESLOT
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Source Live Tech Board</span>
            </span>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center gap-3">

            <button
              id="saved-jobs-toggle-btn"
              onClick={() => setOnlySaved(!onlySaved)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                onlySaved
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current text-amber-600' : ''}`} />
              <span>Saved ({savedJobIds.length})</span>
            </button>

            <div className="h-5 w-[1px] bg-neutral-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <p className="font-semibold text-neutral-900 truncate max-w-[140px]">{user.name}</p>
                <p className="text-neutral-500 text-[11px] truncate max-w-[140px]">{user.email}</p>
              </div>
            </div>

            <button
              id="logout-btn"
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Canvas */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/70 pb-6 text-left">
          <div className="space-y-1.5">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal tracking-tight">
              Remote Tech Careers
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-3xl leading-relaxed">
              Aggregating 100% real engineering, frontend, backend, full stack, DevOps, and AI roles directly from Y Combinator, US tech startups, and global career feeds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {lastRefreshedAt && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-600 shadow-2xs">
                <span className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                <span>
                  {isRefreshing
                    ? 'Syncing 10+ live networks...'
                    : `Updated ${lastRefreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                </span>
              </div>
            )}

            <button
              onClick={() => loadJobs(true)}
              disabled={loading || isRefreshing}
              title="Fetch fresh jobs directly from live platforms"
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/80 text-xs font-semibold text-neutral-800 shadow-2xs hover:shadow transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center w-4 h-4">
                {isRefreshing ? (
                  <svg className="w-4 h-4 animate-spin text-amber-600" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-700 group-hover:rotate-180 transition-transform duration-500" />
                )}
              </div>
              <span>{isRefreshing ? 'Fetching latest feeds...' : 'Refresh live feeds'}</span>
            </button>
          </div>
        </div>


        {/* Filter Section with Frontend, Backend, Full Stack tracks */}
        <JobFiltersBar
          filters={filters}
          onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          totalResults={filteredJobs.length}
          categoryCounts={trackCounts}
          onReset={() =>
            setFilters({
              search: '',
              category: 'all',
              jobType: 'all',
              location: 'all',
              source: 'all',
              startupOnly: false,
              viewMode: filters.viewMode,
              sortBy: 'recent'
            })
          }
        />

        {/* Content Display: Loading / Error / Empty / Wide Grid & List */}
        {loading ? (
          <div className="py-28 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-neutral-900 animate-spin" />
            <div className="space-y-1">
              <p className="text-base font-semibold text-neutral-900">
                Fetching remote tech opportunities across all networks...
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Aggregating live software engineering, frontend, backend, and full stack openings.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
            <p className="text-sm text-red-900 font-semibold">{error}</p>
            <button
              onClick={() => loadJobs(true)}
              className="px-5 py-2.5 rounded-2xl bg-neutral-950 text-white text-xs font-semibold cursor-pointer"
            >
              Retry fetching
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-14 text-center space-y-4 shadow-sm">
            <Briefcase className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="font-serif text-2xl text-neutral-900">No matching positions found</h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              {onlySaved
                ? "You haven't bookmarked any jobs yet. Browse the full feed and click the bookmark icon on any role."
                : 'Try adjusting your search keywords or switching to "All Tech Roles" to see available listings.'}
            </p>
            {onlySaved ? (
              <button
                onClick={() => setOnlySaved(false)}
                className="mt-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold cursor-pointer"
              >
                View all jobs
              </button>
            ) : (
              <button
                onClick={() =>
                  setFilters({
                    search: '',
                    category: 'all',
                    jobType: 'all',
                    location: 'all',
                    source: 'all',
                    startupOnly: false,
                    viewMode: filters.viewMode,
                    sortBy: 'recent'
                  })
                }
                className="mt-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* View Mode: Responsive 4-Column Wide Cards Grid vs Wide List */}
            {filters.viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                {paginatedJobs.map((job, idx) => (
                  <JobCard
                    key={`${job.id}-${idx}`}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={onSelectJob}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {paginatedJobs.map((job, idx) => (
                  <JobListItem
                    key={`${job.id}-${idx}`}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                    onSelect={onSelectJob}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-neutral-500 font-medium">
                  Showing{' '}
                  <strong className="text-neutral-900">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-neutral-900">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}
                  </strong>{' '}
                  of <strong className="text-neutral-900">{filteredJobs.length}</strong> verified remote positions
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    id="pagination-prev-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none text-neutral-700 transition-colors cursor-pointer shadow-2xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={`page-btn-${pageNum}`}
                          onClick={() => handlePageChange(pageNum)}
                          className={`min-w-9 h-9 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                            currentPage === pageNum
                              ? 'bg-[#111215] text-white shadow-xs'
                              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return (
                        <span key={`page-ellipsis-${pageNum}`} className="px-1 text-neutral-400 text-xs">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    id="pagination-next-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none text-neutral-700 transition-colors cursor-pointer shadow-2xs"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer note */}
      <footer className="py-8 border-t border-neutral-200/70 text-center text-xs text-neutral-500 w-full">
        <p>CodeSlot Career Intelligence • 100% genuine remote tech opportunities directly connected to company application systems.</p>
      </footer>
    </div>
  );
};
