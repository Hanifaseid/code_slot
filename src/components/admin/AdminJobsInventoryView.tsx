import React, { useState } from 'react';
import {
  Layers,
  Search,
  PlusCircle,
  ExternalLink,
  Eye,
  Bookmark,
  Send,
  Building,
  CheckCircle2,
  X
} from 'lucide-react';
import { Job } from '../../types';

interface AdminJobsInventoryViewProps {
  jobs: Job[];
  onAddCustomJob?: (newJob: Job) => void;
}

export const AdminJobsInventoryView: React.FC<AdminJobsInventoryViewProps> = ({ jobs, onAddCustomJob }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Job Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Worldwide (Remote)');
  const [salary, setSalary] = useState('$180,000 - $230,000');
  const [sourceUrl, setSourceUrl] = useState('https://linear.app/careers');
  const [tags, setTags] = useState('TypeScript, React, Node.js');

  const filteredJobs = jobs.filter((j) => {
    if (selectedSource !== 'all' && j.source.toLowerCase() !== selectedSource.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const newJob: Job = {
      id: `job-admin-${Date.now()}`,
      title,
      company_name: company,
      category: 'Software Engineering',
      specialization: 'Full Stack',
      job_type: 'Full-time',
      candidate_required_location: location,
      salary,
      publication_date: new Date().toISOString(),
      description: `Verified high-impact role at ${company}.`,
      url: sourceUrl,
      tags: tags.split(',').map((t) => t.trim()),
      source: 'Admin Verified',
      featured: true
    };

    if (onAddCustomJob) {
      onAddCustomJob(newJob);
    }
    setIsModalOpen(false);
    setTitle('');
    setCompany('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Jobs Inventory & Feed Telemetry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-xs font-bold">
              {jobs.length} Verified Positions
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time scraped positions from Linear, Stripe, OpenAI, Supabase, YC, and verified developer feeds.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Verified Listing</span>
        </button>
      </div>

      {/* Feed Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Total Active Crawls</div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-1">{jobs.length} Listings</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">100% verified URLs</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Feed Sources</div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-1">8 Portals</div>
          <div className="text-[11px] text-neutral-400 mt-1">YC, Remotive, WWR, etc.</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Apply Click-Through</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">28.4%</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">+4.2% this week</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Remote Compliance</div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-1">100%</div>
          <div className="text-[11px] text-neutral-400 mt-1">Zero hybrid/on-site leaks</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified jobs by title, company, or stack tags..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
          >
            <option value="all">All Sourced Feeds</option>
            <option value="yc">Y Combinator</option>
            <option value="remotive">Remotive</option>
            <option value="remoteok">RemoteOK</option>
            <option value="jobicy">Jobicy</option>
            <option value="wwr">WeWorkRemotely</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Position & Company</th>
                <th className="py-3 px-4">Location & Type</th>
                <th className="py-3 px-4">Comp / Salary</th>
                <th className="py-3 px-4">Source Feed</th>
                <th className="py-3 px-4 text-right">External Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredJobs.slice(0, 30).map((job) => (
                <tr key={job.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-bold text-neutral-900">{job.title}</div>
                    <div className="text-[11px] text-neutral-500 font-medium">{job.company_name}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    <div>{job.candidate_required_location}</div>
                    <div className="text-[10px] text-neutral-400">{job.job_type}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-800">
                    {job.salary || 'Competitive'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase">
                      {job.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:underline"
                    >
                      <span>View URL</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900">Publish Verified Tech Opportunity</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Linear, OpenAI, Stripe"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Application URL</label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Publish to CodeSlot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
