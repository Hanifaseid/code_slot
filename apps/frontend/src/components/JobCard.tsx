import React from 'react';
import { Job } from '../types';
import { formatRelativeDate, getJobExperienceLevel } from '../services/jobService';
import { MapPin, DollarSign, Clock, Bookmark, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (jobId: string, e: React.MouseEvent) => void;
  onSelect: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved = false,
  onToggleSave,
  onSelect
}) => {
  const tagsList = Array.isArray(job.tags) ? job.tags.filter(Boolean).map(String) : [];
  const jobSource = String(job.source || '').toLowerCase();
  const experienceLevel = getJobExperienceLevel(job);

  const isYCStartup =
    jobSource.includes('y combinator') ||
    jobSource.includes('yc') ||
    tagsList.some((t) => t.toLowerCase().includes('yc'));

  const isGeneralStartup =
    jobSource.includes('startup') ||
    tagsList.some((t) => t.toLowerCase().includes('startup'));

  return (
    <article
      id={`job-card-${job.id}`}
      onClick={() => onSelect(job.id)}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-neutral-400/80 transition-all duration-200 cursor-pointer text-left"
    >
      <div>
        {/* Top bar: Company info & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <CompanyLogo job={job} size="md" />

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-neutral-800 truncate">
                  {job.company_name}
                </span>
                <span title="Verified Tech Company">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 truncate flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3 shrink-0" />
                <span>{job.source}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
            {isYCStartup && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                YC Startup
              </span>
            )}
            {!isYCStartup && isGeneralStartup && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                🚀 Startup
              </span>
            )}
            {job.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/70">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
            <button
              id={`save-job-btn-${job.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave?.(job.id, e);
              }}
              aria-label={isSaved ? 'Remove from saved' : 'Save job'}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isSaved
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Track badge & Experience Level */}
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200/60">
            {job.specialization || job.category}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
              experienceLevel === 'Junior'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : experienceLevel === 'Intermediate'
                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                : experienceLevel === 'Senior'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'bg-purple-50 text-purple-900 border border-purple-200'
            }`}
          >
            {experienceLevel === 'Junior' && '🌱 Junior'}
            {experienceLevel === 'Intermediate' && '🚀 Intermediate'}
            {experienceLevel === 'Senior' && '⚡ Senior'}
            {experienceLevel === 'Lead' && '👑 Staff / Lead'}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="font-sans font-bold text-[16px] leading-snug text-neutral-950 group-hover:text-neutral-700 transition-colors line-clamp-2 mb-3">
          {job.title}
        </h3>

        {/* Badges: Category, Location, Job Type */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="inline-flex items-center gap-1 text-neutral-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate max-w-[170px]">{job.candidate_required_location}</span>
          </span>

          <span className="text-neutral-300">•</span>

          <span className="text-neutral-600 font-medium">{job.job_type}</span>

          {job.salary && (
            <>
              <span className="text-neutral-300">•</span>
              <span className="inline-flex items-center gap-0.5 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] border border-emerald-200/60">
                <DollarSign className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate max-w-[140px]">{job.salary}</span>
              </span>
            </>
          )}
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tagsList.slice(0, 4).map((tag, idx) => (
            <span
              key={`${job.id}-tag-${idx}`}
              className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
          {tagsList.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-md bg-neutral-50 text-neutral-400 text-[11px]">
              +{tagsList.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Date & View Action */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1 text-[11px]">
          <Clock className="w-3 h-3 text-neutral-400" />
          {formatRelativeDate(job.publication_date)}
        </span>

        <span className="inline-flex items-center gap-1 font-semibold text-neutral-900 group-hover:translate-x-0.5 transition-transform text-xs">
          <span>View job</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
