import React, { useState } from 'react';
import { Job } from '../types';
import { formatRelativeDate, cleanAndFormatDescription } from '../services/jobService';
import { CompanyLogo } from './CompanyLogo';
import { AITailorResult, ResumeData } from '../types/resume';
import { tailorResumeWithAI } from '../services/aiResumeService';
import { defaultResumeData } from '../data/sampleResumes';
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Bookmark,
  Share2,
  CheckCircle2,
  Building2,
  Globe,
  ShieldCheck,
  Check,
  Radio,
  Layers,
  Sparkles,
  Rocket
} from 'lucide-react';

interface JobDetailPageProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
  onBack: () => void;
  onTailorResume?: (job: Job, tailorResult?: AITailorResult) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  job,
  isSaved = false,
  onToggleSave,
  onBack,
  onTailorResume
}) => {
  const [copied, setCopied] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);

  const handleTailorResume = async () => {
    if (isTailoring) return;
    setIsTailoring(true);
    try {
      // 1. Get existing resume or baseline
      let currentResume: ResumeData = defaultResumeData;
      try {
        const stored = localStorage.getItem('codeslot_active_resume');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.personalInfo) {
            currentResume = parsed;
          }
        }
      } catch {
        // ignore
      }

      // 2. Strip HTML tags from job description
      const tmp = document.createElement('div');
      tmp.innerHTML = job.description;
      const cleanDesc = tmp.textContent || tmp.innerText || '';

      // 3. Tailor with Gemini 2.5 Flash
      const tailorResult = await tailorResumeWithAI(
        currentResume,
        job.title,
        job.company_name,
        cleanDesc
      );

      // 4. Save to localStorage immediately
      try {
        localStorage.setItem('codeslot_active_resume', JSON.stringify(tailorResult.tailoredResume));
      } catch {
        // ignore
      }

      // 5. Navigate to resume page with the tailored result
      onTailorResume?.(job, tailorResult);
    } catch (err) {
      console.error('Failed to tailor resume with AI:', err);
      // Fallback navigation
      onTailorResume?.(job);
    } finally {
      setIsTailoring(false);
    }
  };

  const tagsList = Array.isArray(job.tags) ? job.tags.filter(Boolean).map(String) : [];
  const jobSource = String(job.source || '').toLowerCase();

  const isYCStartup =
    jobSource.includes('y combinator') ||
    jobSource.includes('yc') ||
    tagsList.some((t) => t.toLowerCase().includes('yc'));

  const isGeneralStartup =
    jobSource.includes('startup') ||
    tagsList.some((t) => t.toLowerCase().includes('startup'));

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111215] py-6 sm:py-10 w-full text-left font-sans">
      {/* Full-width container matching JobsPortal */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200/70 pb-4">
          <button
            id="job-detail-back-btn"
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-950 transition-colors py-2 px-4 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all remote tech jobs</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 font-medium bg-neutral-100/80 px-3 py-1.5 rounded-full">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Source: {job.source}</span>
            </span>

            <button
              id="job-share-btn"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              id="job-detail-bookmark-btn"
              onClick={() => onToggleSave?.(job.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-colors cursor-pointer text-xs font-semibold shadow-2xs ${
                isSaved
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-amber-600' : ''}`} />
              <span>{isSaved ? 'Saved in account' : 'Save position'}</span>
            </button>
          </div>
        </div>

        {/* Hero Header Card - Full Width Fluid */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex items-start gap-5 sm:gap-6 min-w-0 flex-1">
              {/* Company Logo */}
              <CompanyLogo job={job} size="lg" />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap mb-2">
                  <span className="font-bold text-sm sm:text-base text-neutral-800">
                    {job.company_name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Tech Employer
                  </span>
                  {isYCStartup && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-900 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                      <Rocket className="w-3 h-3 text-orange-600" />
                      Y Combinator Startup
                    </span>
                  )}
                  {!isYCStartup && isGeneralStartup && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                      <Rocket className="w-3 h-3 text-purple-600" />
                      Tech Startup
                    </span>
                  )}
                  {job.specialization && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-800 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-full">
                      <Layers className="w-3 h-3 text-neutral-600" />
                      {job.specialization}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal tracking-tight leading-snug">
                  {job.title}
                </h1>

                {/* Key Meta Badges */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 mt-4 text-xs sm:text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{job.candidate_required_location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Briefcase className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{job.job_type}</span>
                  </span>

                  {job.salary && (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/70 text-xs sm:text-sm">
                      <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{job.salary}</span>
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 text-neutral-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Posted {formatRelativeDate(job.publication_date)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* PRIMARY ACTION BUTTONS: OPEN ON SOURCE & TAILOR RESUME WITH AI */}
            <div className="shrink-0 flex flex-col gap-2.5 lg:w-72">
  <button
    id="tailor-resume-for-job-btn"
    onClick={handleTailorResume}
    disabled={isTailoring}
    className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs font-bold tracking-tight shadow-md transition-all ${
      isTailoring
        ? 'opacity-90 cursor-wait shadow-inner'
        : 'hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98] cursor-pointer'
    }`}
  >
    {isTailoring ? (
      <>
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
        <span className="font-extrabold tracking-wide">Tailoring with Gemini AI...</span>
      </>
    ) : (
      <>
        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
        <span>Tailor Resume with AI</span>
      </>
    )}
  </button>

  <a
    id="open-job-source-btn"
    href={job.url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-tight shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
  >
    <span>Open on original source</span>
    <ExternalLink className="w-3.5 h-3.5" />
  </a>

  <p className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
    <ShieldCheck className="w-4 h-4 text-emerald-600" />
    <span>Verified live position on {job.source}</span>
  </p>
</div>
          </div>

          {/* Tags bar */}
          <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Skills & Tech Stack:
            </span>
            {tagsList.map((tag, idx) => (
              <span
                key={`detail-tag-${idx}`}
                className="px-3 py-1 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Wide Two-Column Body: 3-column / 1-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Column: Full Job Description (75% on large screens) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-2xl text-neutral-900 font-normal tracking-tight">
                  Detailed Position Description & Specifications
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Ingested directly from verified career channel: {job.source}
                </p>
              </div>

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View original post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Description Render */}
            <div
              className="job-description-content text-neutral-800 text-sm sm:text-base leading-relaxed max-w-none font-sans"
              dangerouslySetInnerHTML={{ __html: cleanAndFormatDescription(job.description) }}
            />

            {/* Bottom Apply CTA Card */}
            <div className="mt-10 pt-6 border-t border-neutral-100 bg-[#fbfaf7] rounded-3xl p-6 sm:p-8 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-neutral-900">
                  Ready to take the next step with {job.company_name}?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Submit your application and portfolio directly through the company’s recruitment pipeline.
                </p>
              </div>

              <a
                id="bottom-apply-job-source-btn"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#111215] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Open Application on {job.source}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Sidebar: Company & Verification Information (25% on large screens) */}
          <div className="space-y-6">
            {/* Company Info Box */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-sm text-neutral-950 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-neutral-500" />
                <span>Company & Role Overview</span>
              </h3>

              <div className="space-y-3.5 text-xs text-neutral-600">
                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">Track</span>
                  <span className="font-bold text-neutral-900">{job.specialization || job.category}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">Location Flexibility</span>
                  <span className="font-semibold text-neutral-900 text-right">{job.candidate_required_location}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">Employment Type</span>
                  <span className="font-semibold text-neutral-900">{job.job_type}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
                  <span className="text-neutral-500">Data Feed Source</span>
                  <span className="font-bold text-neutral-900">{job.source}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-neutral-500">Verified Timestamp</span>
                  <span className="font-medium text-neutral-700">{formatRelativeDate(job.publication_date)}</span>
                </div>
              </div>

              {job.company_website && (
                <a
                  href={job.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit company website</span>
                </a>
              )}
            </div>

            {/* 100% Real Guarantee Card */}
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 text-emerald-950 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Real Tech Job Guarantee</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                This position is sourced directly from live corporate hiring systems and authentic job APIs. Clicking "Open on original source" will launch the authentic posting in a new browser tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
