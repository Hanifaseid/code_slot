import React from 'react';
import { Job } from '../types';
import { formatRelativeDate, getJobExperienceLevel } from '../services/jobService';
import { detectJobLanguage } from '../services/languageService';
import { MapPin, DollarSign, Clock, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface JobListItemProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (jobId: string, e: React.MouseEvent) => void;
  onSelect: (jobId: string) => void;
}

export const JobListItem: React.FC<JobListItemProps> = ({
  job,
  isSaved = false,
  onToggleSave,
  onSelect
}) => {
  const tagsList = Array.isArray(job.tags) ? job.tags.filter(Boolean).map(String) : [];
  const jobSource = String(job.source || '').toLowerCase();
  const experienceLevel = getJobExperienceLevel(job);
  const detectedLang = detectJobLanguage(job.title, job.description);

  const isYCStartup =
    jobSource.includes('y combinator') ||
    jobSource.includes('yc') ||
    tagsList.some((t) => t.toLowerCase().includes('yc'));

  const isGeneralStartup =
    jobSource.includes('startup') ||
    tagsList.some((t) => t.toLowerCase().includes('startup'));

  return (
    <article
      id={`job-list-item-${job.id}`}
      onClick={() => onSelect(job.id)}
      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl border border-neutral-200/80 p-4 sm:p-5 hover:border-neutral-400/80 hover:shadow-xs transition-all cursor-pointer text-left"
    >
      <div className="flex items-start md:items-center gap-4 min-w-0 flex-1">
        {/* Company Avatar */}
        <CompanyLogo job={job} size="md" />

        {/* Info Column */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200/60">
              {job.specialization || job.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                experienceLevel === 'Junior'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : experienceLevel === 'Intermediate'
                  ? 'bg-orange-50 text-orange-900 border border-orange-200'
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
            {detectedLang.isForeign && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs inline-flex items-center gap-1"
                title={`Speaking ${detectedLang.name} (${detectedLang.nativeName}) is mandatory for this role`}
              >
                <span>🗣️ {detectedLang.name} Mandatory</span>
              </span>
            )}
            <h3 className="font-sans font-bold text-[15px] sm:text-base text-neutral-950 group-hover:text-neutral-700 transition-colors">
              {job.title}
            </h3>
            {isYCStartup && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-800 border border-orange-200/80 shadow-2xs inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                YC Startup
              </span>
            )}
            {!isYCStartup && isGeneralStartup && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                🚀 Startup
              </span>
            )}
            {job.featured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/70">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-900 flex items-center gap-1">
              <span>{job.company_name}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
            </span>

            <span className="text-neutral-300 hidden sm:inline">•</span>

            <span className="inline-flex items-center gap-1 text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate max-w-[180px]">{job.candidate_required_location}</span>
            </span>

            <span className="text-neutral-300 hidden sm:inline">•</span>

            <span className="text-neutral-500">{job.job_type}</span>

            {job.salary && (
              <>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">
                  <DollarSign className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{job.salary}</span>
                </span>
              </>
            )}
          </div>

          {/* Tags preview */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {tagsList.slice(0, 3).map((tag, idx) => (
              <span
                key={`${job.id}-list-tag-${idx}`}
                className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Date & Actions */}
      <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 shrink-0">
        <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
          <Clock className="w-3 h-3" />
          {formatRelativeDate(job.publication_date)}
        </span>

        <div className="flex items-center gap-2">
          <button
            id={`list-save-btn-${job.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave?.(job.id, e);
            }}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isSaved
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-neutral-900 group-hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
