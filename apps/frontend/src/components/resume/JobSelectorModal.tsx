import React, { useState, useEffect } from 'react';
import { Job } from '../../types';
import { fetchRealJobs } from '../../services/jobService';
import { Search, X, Briefcase, MapPin, DollarSign, Check, Building2, Sparkles } from 'lucide-react';
import { CompanyLogo } from '../CompanyLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob: (job: Job) => void;
}

export const JobSelectorModal: React.FC<Props> = ({ isOpen, onClose, onSelectJob }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;
    setLoading(true);
    fetchRealJobs().then((data) => {
      if (mounted) {
        setJobs(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'AI & Machine Learning', 'DevOps / Cloud'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase()) ||
      job.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      job.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      job.specialization?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200/80 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between gap-4 bg-gradient-to-r from-neutral-50 via-white to-amber-50/30">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950">
                Select a Job from CodeSlot
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Choose from verified remote engineering roles to auto-fill the job description and tailor your CV.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-neutral-100 space-y-3 bg-neutral-50/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title, company, or tech stack (e.g. Stripe, React, Python)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
              <div className="w-8 h-8 border-3 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-3" />
              <p className="text-xs font-medium">Fetching verified tech opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <Briefcase className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
              <p className="text-sm font-semibold">No jobs match your filter</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for other skills or clearing keywords.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="group p-4 rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-900 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <CompanyLogo job={job} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-neutral-900 group-hover:text-amber-800 transition-colors">
                        {job.company_name}
                      </span>
                      {job.specialization && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                          {job.specialization}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-neutral-950 truncate mt-0.5">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span>{job.candidate_required_location}</span>
                      </span>
                      {job.salary && (
                        <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                          <span>{job.salary}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <button className="px-3.5 py-1.5 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs">
                    <span>Select Job</span>
                    <Check className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>{filteredJobs.length} active tech roles available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-neutral-200 bg-white font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
