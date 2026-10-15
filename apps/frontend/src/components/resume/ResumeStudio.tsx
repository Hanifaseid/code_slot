import React, { useState, useEffect, useRef } from 'react';
import {
  ResumeData,
  ResumeSettings,
  ResumeTemplateId,
  AccentColor,
  ContentDensity,
  AITailorResult
} from '../../types/resume';
import { Job } from '../../types';
import { defaultResumeData } from '../../data/sampleResumes';
import {
  tailorResumeWithAI,
  enhanceBulletWithAI,
  getGeminiApiKey,
  setGeminiApiKey,
  clearCustomGeminiApiKey,
  hasGeminiApiKey,
  isUsingEnvGeminiApiKey,
  getEnvGeminiApiKey,
  saveResumeToBackend,
} from '../../services/aiResumeService';
import { apiClient } from '../../services/apiClient';
import { ResumeRenderer } from './ResumeRenderer';
import { JobSelectorModal } from './JobSelectorModal';
import { PrintGuideModal } from './PrintGuideModal';
import {
  Sparkles,
  Cloud,
  Printer,
  ChevronLeft,
  Briefcase,
  Layers,
  Palette,
  Eye,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Wand2,
  FileText,
  Key,
  Download,
  Upload,
  Check,
  ZoomIn,
  ZoomOut,
  Building2,
  User,
  GraduationCap,
  Code,
  FolderGit2,
  SlidersHorizontal,
  Info,
  ShieldCheck,
  X
} from 'lucide-react';

interface ResumeStudioProps {
  initialJob?: Job | null;
  initialTailorResult?: AITailorResult | null;
  onBack: () => void;
}

const TEMPLATES: Array<{ id: ResumeTemplateId; name: string; tag: string; description: string }> = [
  { id: 'executive', name: 'Executive Modern', tag: 'Senior / Staff', description: 'Clean top accent bar, dual-column contact details, high authority' },
  { id: 'minimalist', name: 'Tech Minimalist', tag: 'Engineering', description: 'High-contrast monospace accents, clear section hierarchy' },
  { id: 'creative-sidebar', name: 'Split Sidebar', tag: 'Two-Column', description: 'Sidebar for competencies & contact, right column for experience' },
  { id: 'ivy-classic', name: 'Ivy Classic', tag: 'Academic / Corp', description: 'Refined serif typography, centered header, traditional rules' },
  { id: 'nordic-clean', name: 'Nordic Clean', tag: 'Contemporary', description: 'Warm neutral tones, soft chips, airy Scandinavian layout' },
  { id: 'ats-compact', name: 'ATS Single-Pager', tag: 'Max Density', description: '100% machine-readable standard headers, compact 1-page layout' },
  { id: 'vibrant-startup', name: 'Vibrant Startup', tag: 'Dynamic', description: 'Modern gradient stripe, skill pills, card project displays' }
];

const ACCENT_COLORS: Array<{ id: AccentColor; label: string; bg: string }> = [
  { id: 'slate', label: 'Slate Gray', bg: '#0f172a' },
  { id: 'navy', label: 'Classic Navy', bg: '#1e3a8a' },
  { id: 'emerald', label: 'Emerald Forest', bg: '#065f46' },
  { id: 'indigo', label: 'Indigo Tech', bg: '#4338ca' },
  { id: 'violet', label: 'Royal Violet', bg: '#581c87' },
  { id: 'amber', label: 'Warm Amber', bg: '#78350f' },
  { id: 'rose', label: 'Ruby Rose', bg: '#881337' }
];

export const ResumeStudio: React.FC<ResumeStudioProps> = ({
  initialJob,
  initialTailorResult,
  onBack
}) => {
  // Load tailored resume if passed, or saved resume, or default to full-stack senior sample
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (initialTailorResult?.tailoredResume) {
      return initialTailorResult.tailoredResume;
    }
    try {
      const stored = localStorage.getItem('codeslot_active_resume');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.personalInfo) return parsed;
      }
    } catch {
      // ignore
    }
    return defaultResumeData;
  });

  const [originalResumeData, setOriginalResumeData] = useState<ResumeData | null>(null);

  // Settings
  const [settings, setSettings] = useState<ResumeSettings>(() => {
    try {
      const stored = localStorage.getItem('codeslot_resume_settings');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {
      templateId: 'executive',
      accentColor: 'slate',
      density: 'standard',
      paperSize: 'a4'
    };
  });

  // Target Job State
  const [targetJob, setTargetJob] = useState<{
    title: string;
    company: string;
    description: string;
  }>({
    title: '',
    company: '',
    description: ''
  });

  // Navigation tab in left panel (only content tabs ready to be edited)
  const [activeTab, setActiveTab] = useState<
    'personal' | 'experience' | 'skills' | 'projects' | 'education'
  >('personal');

  // AI Tailoring states
  const [isTailoring, setIsTailoring] = useState(false);
  const [tailorResult, setTailorResult] = useState<AITailorResult | null>(
    () => initialTailorResult || null
  );
  const [tailorError, setTailorError] = useState<string | null>(null);
  const [enhancingBulletId, setEnhancingBulletId] = useState<string | null>(null);
  const [isJobSpecsOpen, setIsJobSpecsOpen] = useState(false);

  // Modals
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    try {
      return localStorage.getItem('codeslot_gemini_key') || '';
    } catch {
      return '';
    }
  });
  const [keySavedToast, setKeySavedToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isSavingToCloud, setIsSavingToCloud] = useState(false);
  const [cloudSavedToast, setCloudSavedToast] = useState(false);
  const [cloudResumes, setCloudResumes] = useState<any[]>([]);
  const [isCloudResumesModalOpen, setIsCloudResumesModalOpen] = useState(false);

  // Live preview zoom factor
  const [zoomScale, setZoomScale] = useState<number>(0.95);
  const printContainerRef = useRef<HTMLDivElement>(null);
  const initialJobHandledRef = useRef<string | null>(
    initialTailorResult ? (initialJob?.id || 'pretailored') : null
  );

  // Load cloud resumes on mount if authenticated
  useEffect(() => {
    apiClient
      .get<any[]>('/resume/mine')
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCloudResumes(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('codeslot_active_resume', JSON.stringify(resumeData));
      localStorage.setItem('codeslot_resume_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [resumeData, settings]);

  const handleSaveToCloud = async () => {
    setIsSavingToCloud(true);
    try {
      const docTitle = `${resumeData.personalInfo.fullName || 'Candidate'} - ${targetJob.title || resumeData.personalInfo.jobTitle || 'Resume'}`;
      const atsScore = tailorResult?.atsScore || 88;
      const ok = await saveResumeToBackend(resumeData, docTitle, atsScore);
      if (ok) {
        setCloudSavedToast(true);
        setTimeout(() => setCloudSavedToast(false), 2500);
        // Refresh cloud list
        const res = await apiClient.get<any[]>('/resume/mine');
        if (res.success && Array.isArray(res.data)) {
          setCloudResumes(res.data);
        }
      }
    } finally {
      setIsSavingToCloud(false);
    }
  };

  // Strip HTML utility for jobs
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Reusable AI tailoring execution that automatically updates the resume
  const executeTailoring = async (
    title: string,
    company: string,
    description: string,
    currentResume: ResumeData = resumeData
  ) => {
    if (!description.trim() && !title.trim()) {
      setTailorError('Please enter a target job title or paste a job description first.');
      return;
    }

    setIsTailoring(true);
    setTailorError(null);

    // Save backup of current resume before modifying
    setOriginalResumeData(JSON.parse(JSON.stringify(currentResume)));

    try {
      const result = await tailorResumeWithAI(
        currentResume,
        title,
        company,
        description
      );

      setTailorResult(result);
      setResumeData(result.tailoredResume);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to tailor resume with AI.';
      setTailorError(msg);
    } finally {
      setIsTailoring(false);
    }
  };

  // When initialJob is passed, auto-tailor only if not already pre-tailored
  useEffect(() => {
    if (initialTailorResult) {
      setResumeData(initialTailorResult.tailoredResume);
      setTailorResult(initialTailorResult);
      if (initialJob) {
        initialJobHandledRef.current = initialJob.id;
        const cleanDesc = stripHtml(initialJob.description);
        setTargetJob({
          title: initialJob.title,
          company: initialJob.company_name,
          description: cleanDesc
        });
      }
      return;
    }

    if (initialJob && initialJobHandledRef.current !== initialJob.id) {
      initialJobHandledRef.current = initialJob.id;
      const cleanDesc = stripHtml(initialJob.description);
      const jobInfo = {
        title: initialJob.title,
        company: initialJob.company_name,
        description: cleanDesc
      };
      setTargetJob(jobInfo);
      executeTailoring(initialJob.title, initialJob.company_name, cleanDesc);
    }
  }, [initialJob, initialTailorResult]);

  // Handle selecting job from CodeSlot modal - automatically adjust resume data
  const handleSelectCodeSlotJob = (job: Job) => {
    const cleanDesc = stripHtml(job.description);
    const jobInfo = {
      title: job.title,
      company: job.company_name,
      description: cleanDesc
    };
    setTargetJob(jobInfo);
    setIsJobModalOpen(false);
    // Automatically adjust resume data based on selected job
    executeTailoring(job.title, job.company_name, cleanDesc);
  };

  // Custom AI Tailor Trigger
  const handleRunAITailor = () => {
    executeTailoring(targetJob.title, targetJob.company, targetJob.description);
  };

  // Revert to pre-AI state
  const handleRevert = () => {
    if (originalResumeData) {
      setResumeData(originalResumeData);
      setTailorResult(null);
    }
  };

  // Enhance a single bullet point
  const handleEnhanceBullet = async (expId: string, bulletIdx: number) => {
    const exp = resumeData.experience.find((e) => e.id === expId);
    if (!exp) return;
    const currentBullet = exp.highlights[bulletIdx];
    if (!currentBullet) return;

    const actionKey = `${expId}-${bulletIdx}`;
    setEnhancingBulletId(actionKey);

    try {
      const enhanced = await enhanceBulletWithAI(
        currentBullet,
        targetJob.title || resumeData.personalInfo.jobTitle
      );

      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((e) => {
          if (e.id !== expId) return e;
          const nextHl = [...e.highlights];
          nextHl[bulletIdx] = enhanced;
          return { ...e, highlights: nextHl };
        })
      }));
    } finally {
      setEnhancingBulletId(null);
    }
  };


  // Native Print Handler
  const handleTriggerPrint = () => {
    window.print();
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && parsed.experience) {
          setResumeData(parsed);
          setTailorResult(null);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Copy plain text
  const handleCopyText = () => {
    const lines = [
      resumeData.personalInfo.fullName.toUpperCase(),
      resumeData.personalInfo.jobTitle,
      `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
      '',
      'SUMMARY',
      resumeData.personalInfo.summary,
      '',
      'EXPERIENCE',
      ...resumeData.experience.map(
        (exp) =>
          `${exp.title} - ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})\n` +
          exp.highlights.map((h) => `• ${h}`).join('\n')
      ),
      '',
      'SKILLS',
      `Technical: ${resumeData.skills.technical.join(', ')}`,
      `Tools: ${resumeData.skills.tools.join(', ')}`,
      `Leadership: ${resumeData.skills.soft.join(', ')}`
    ].join('\n');

    navigator.clipboard.writeText(lines);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-neutral-900 flex flex-col font-sans selection:bg-amber-200">
      {/* 1. TOP STUDIO TOOLBAR (Hidden in print mode) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-2xs no-print print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-neutral-950 leading-tight flex items-center gap-1.5">
                  <span>AI Resume & CV Studio</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Gemini 2.5
                  </span>
                </h1>
                <p className="text-[11px] text-neutral-500 hidden sm:block">
                  AI-powered tailoring for job descriptions with instant PDF export
                </p>
              </div>
            </div>
          </div>

          {/* Right Toolbar Actions */}
          <div className="flex items-center gap-2">
            {/* API Key Modal Button */}
            <button
              onClick={() => {
                setApiKeyInput(localStorage.getItem('codeslot_gemini_key') || '');
                setIsKeyModalOpen(true);
              }}
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline text-[11px]">API Key</span>
              {hasGeminiApiKey() && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="API Key Active" />
              )}
            </button>

            {/* Copy / Export */}
            <button
              onClick={handleCopyText}
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors text-xs font-semibold flex items-center gap-1"
              title="Copy formatted plain text"
            >
              {copiedToast ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <FileText className="w-3.5 h-3.5" />
              )}
              <span className="hidden lg:inline text-[11px]">
                {copiedToast ? 'Copied!' : 'Copy Text'}
              </span>
            </button>

            {/* PRIMARY PRINT / PDF BUTTON */}
            <button
              id="resume-print-btn"
              onClick={() => setIsPrintModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>

        {/* Sub-header: Quick Template, Color, and Density Controls */}
        <div className="bg-neutral-50/80 border-t border-neutral-200/60 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Template Selector Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="font-bold text-neutral-500 text-[11px] mr-1 hidden sm:inline">
                Template:
              </span>
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSettings((s) => ({ ...s, templateId: tmpl.id }))}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${settings.templateId === tmpl.id
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                    }`}
                >
                  <span>{tmpl.name}</span>
                </button>
              ))}
            </div>

            {/* Colors & Density Selector */}
            <div className="flex items-center gap-3">
              {/* Palette */}
              <div className="flex items-center gap-1">
                {ACCENT_COLORS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSettings((s) => ({ ...s, accentColor: col.id }))}
                    title={col.label}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${settings.accentColor === col.id
                        ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                    style={{ backgroundColor: col.bg }}
                  />
                ))}
              </div>

              <div className="h-4 w-px bg-neutral-200" />

              {/* Density */}
              <div className="flex items-center rounded-lg border border-neutral-200 bg-white p-0.5 text-[11px] font-semibold">
                {(['compact', 'standard', 'relaxed'] as ContentDensity[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSettings((s) => ({ ...s, density: d }))}
                    className={`px-2 py-0.5 rounded-md capitalize transition-colors ${settings.density === d ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>      {/* 2. DEDICATED JOB SELECTION & AI TAILORING SECTION (Outside left tabs, directly in studio header/top area) */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 pt-4 no-print print:hidden">
        {/* Target Job Header & Quick Actions Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden">
          <div className="p-3.5 sm:p-4.5 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/40 border-b border-neutral-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-md">
                      AI Job Targeting & Auto-Tailor
                    </span>
                    {targetJob.title ? (
                      <span className="text-xs sm:text-sm font-extrabold text-neutral-900 truncate flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                        {targetJob.title} {targetJob.company && <span className="text-neutral-500 font-semibold">at {targetJob.company}</span>}
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-500 italic">
                        No target job selected (Standard resume profile)
                      </span>
                    )}

                    {tailorResult && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {tailorResult.atsScore}% ATS Match
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions: Select CodeSlot Job, Revert */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap pt-1 lg:pt-0">
                <button
                  id="select-codeslot-job-top-btn"
                  onClick={() => setIsJobModalOpen(true)}
                  disabled={isTailoring}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  {isTailoring ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Tailoring...</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Select CodeSlot Job</span>
                    </>
                  )}
                </button>

                {originalResumeData && (
                  <button
                    onClick={handleRevert}
                    className="px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Revert to original pre-AI content"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Revert</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Expandable Specifications & AI Tailor Drawer */}
          {isJobSpecsOpen && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50/50 via-white to-orange-50/30 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                    Paste the target job specifications below or pick one directly from CodeSlot's verified jobs. Our integrated Gemini AI will analyze requirements and tailor your resume's title, summary, skills, and bullet points with 100% truthful metrics and high ATS resonance.
                  </p>
                </div>
                <button
                  onClick={() => setIsJobSpecsOpen(false)}
                  className="text-xs font-bold text-neutral-400 hover:text-neutral-700 shrink-0 cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Target Role Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={targetJob.title}
                    onChange={(e) => setTargetJob({ ...targetJob, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Target Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Linear, Stripe, OpenAI"
                    value={targetJob.company}
                    onChange={(e) => setTargetJob({ ...targetJob, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Job Description & Required Qualifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste the full job description, tech stack, responsibilities, and requirements here..."
                  value={targetJob.description}
                  onChange={(e) => setTargetJob({ ...targetJob, description: e.target.value })}
                  className="w-full p-3 text-xs rounded-xl border border-neutral-300 bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none leading-relaxed font-mono text-neutral-800"
                />
              </div>

              {tailorError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{tailorError}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  onClick={() => setIsJobModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Browse CodeSlot Verified Jobs</span>
                </button>

                <button
                  id="run-ai-tailor-btn"
                  onClick={handleRunAITailor}
                  disabled={isTailoring}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isTailoring ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Tailoring with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Tailor Resume for this Job</span>
                    </>
                  )}
                </button>
              </div>

              {/* Matched Keywords & ATS Insights summary */}
              {tailorResult && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-neutral-700">Matched Keywords:</span>
                  {tailorResult.matchedKeywords.slice(0, 8).map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                      {kw}
                    </span>
                  ))}
                  {tailorResult.matchedKeywords.length > 8 && (
                    <span className="text-[11px] text-neutral-500">+{tailorResult.matchedKeywords.length - 8} more</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. MAIN WORKSPACE: TWO COLUMN SPLIT (Left: Content Editor Tabs, Right: Live Paper Preview) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (lg: 5 of 12 columns): Editor Content Tabs Only */}
        <section className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/90 shadow-sm flex flex-col overflow-hidden no-print print:hidden">
          {/* Navigation Tabs - Only content tabs ready to be edited */}
          <div className="flex items-center border-b border-neutral-200/80 bg-neutral-50/70 p-1.5 overflow-x-auto scrollbar-none gap-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'personal'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-200/70'
                }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Personal</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'experience'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-200/70'
                }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'skills'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-200/70'
                }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'projects'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-200/70'
                }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'education'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-neutral-200/70'
                }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </div>

          {/* TAB CONTENTS (Ready to be edited) */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[calc(100vh-210px)] overflow-y-auto">

            {/* 2. PERSONAL INFO TAB */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Job Headline / Title</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.jobTitle}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, jobTitle: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Portfolio / Website</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.website || ''}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedin || ''}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, linkedin: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.github || ''}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          personalInfo: { ...resumeData.personalInfo, github: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-700">
                      Professional Summary / Executive Pitch
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    value={resumeData.personalInfo.summary}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalInfo: { ...resumeData.personalInfo, summary: e.target.value }
                      })
                    }
                    className="w-full p-3 text-xs rounded-xl border border-neutral-200 bg-white focus:ring-1 focus:ring-neutral-900 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* 3. WORK EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Work Positions ({resumeData.experience.length})
                  </span>
                  <button
                    onClick={() => {
                      const newExp = {
                        id: `exp-${Date.now()}`,
                        title: 'Software Engineer',
                        company: 'New Company Inc.',
                        location: 'Remote',
                        startDate: '2023',
                        endDate: 'Present',
                        current: true,
                        highlights: ['Led engineering initiatives and improved system efficiency.']
                      };
                      setResumeData({
                        ...resumeData,
                        experience: [newExp, ...resumeData.experience]
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                {resumeData.experience.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">
                        #{idx + 1} {exp.title || 'Untitled Role'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this work experience entry?')) {
                              setResumeData({
                                ...resumeData,
                                experience: resumeData.experience.filter((e) => e.id !== exp.id)
                              });
                            }
                          }}
                          className="p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                          title="Delete role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            experience: resumeData.experience.map((item) =>
                              item.id === exp.id ? { ...item, title: e.target.value } : item
                            )
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            experience: resumeData.experience.map((item) =>
                              item.id === exp.id ? { ...item, company: e.target.value } : item
                            )
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Start Date (e.g. 2021)"
                        value={exp.startDate}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            experience: resumeData.experience.map((item) =>
                              item.id === exp.id ? { ...item, startDate: e.target.value } : item
                            )
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="End Date (e.g. Present)"
                        value={exp.endDate}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            experience: resumeData.experience.map((item) =>
                              item.id === exp.id ? { ...item, endDate: e.target.value } : item
                            )
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white"
                      />
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-neutral-200/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                          Achievements & Metrics:
                        </span>
                        <button
                          onClick={() => {
                            setResumeData({
                              ...resumeData,
                              experience: resumeData.experience.map((item) =>
                                item.id === exp.id
                                  ? {
                                    ...item,
                                    highlights: [
                                      ...item.highlights,
                                      'Delivered scalable solution improving team velocity.'
                                    ]
                                  }
                                  : item
                              )
                            });
                          }}
                          className="text-[11px] font-bold text-neutral-800 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      {exp.highlights.map((hl, bIdx) => {
                        const isEnhancing = enhancingBulletId === `${exp.id}-${bIdx}`;
                        return (
                          <div key={bIdx} className="flex items-start gap-1.5">
                            <textarea
                              rows={2}
                              value={hl}
                              onChange={(e) => {
                                const nextVal = e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: resumeData.experience.map((item) => {
                                    if (item.id !== exp.id) return item;
                                    const nextHl = [...item.highlights];
                                    nextHl[bIdx] = nextVal;
                                    return { ...item, highlights: nextHl };
                                  })
                                });
                              }}
                              className="flex-1 p-2 text-xs rounded-lg border border-neutral-200 bg-white leading-snug"
                            />

                            <div className="flex flex-col gap-1">
                              {/* AI Enhance Mini Button */}
                              <button
                                onClick={() => handleEnhanceBullet(exp.id, bIdx)}
                                disabled={isEnhancing}
                                title="Enhance bullet point with AI (Google X-Y-Z formula)"
                                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
                              >
                                {isEnhancing ? (
                                  <div className="w-3 h-3 border border-amber-700 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Wand2 className="w-3 h-3" />
                                )}
                              </button>

                              <button
                                onClick={() => {
                                  setResumeData({
                                    ...resumeData,
                                    experience: resumeData.experience.map((item) => {
                                      if (item.id !== exp.id) return item;
                                      return {
                                        ...item,
                                        highlights: item.highlights.filter((_, i) => i !== bIdx)
                                      };
                                    })
                                  });
                                }}
                                className="p-1.5 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Technical Skills & Languages (comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={resumeData.skills.technical.join(', ')}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        skills: {
                          ...resumeData.skills,
                          technical: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        }
                      })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 bg-white"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {resumeData.skills.technical.map((sk, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Developer Tools, Cloud & Frameworks (comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={resumeData.skills.tools.join(', ')}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        skills: {
                          ...resumeData.skills,
                          tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        }
                      })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Methodologies, Architecture & Soft Skills (comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={resumeData.skills.soft.join(', ')}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        skills: {
                          ...resumeData.skills,
                          soft: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        }
                      })
                    }
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 bg-white"
                  />
                </div>
              </div>
            )}

            {/* 5. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Featured Engineering Projects
                  </span>
                  <button
                    onClick={() => {
                      const newP = {
                        id: `proj-${Date.now()}`,
                        title: 'New High-Impact Project',
                        description: 'Architected and developed full-stack solution.',
                        technologies: ['TypeScript', 'React'],
                        link: 'https://github.com/my-project'
                      };
                      setResumeData({
                        ...resumeData,
                        projects: [newP, ...(resumeData.projects || [])]
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {(resumeData.projects || []).map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            projects: resumeData.projects.map((p) =>
                              p.id === proj.id ? { ...p, title: e.target.value } : p
                            )
                          })
                        }
                        className="font-bold text-xs px-2 py-1 rounded border border-neutral-200 bg-white flex-1 mr-2"
                      />
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            projects: resumeData.projects.filter((p) => p.id !== proj.id)
                          });
                        }}
                        className="text-neutral-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Project description..."
                      value={proj.description}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.map((p) =>
                            p.id === proj.id ? { ...p, description: e.target.value } : p
                          )
                        })
                      }
                      className="w-full p-2 text-xs rounded-lg border border-neutral-200 bg-white"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={proj.technologies.join(', ')}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            projects: resumeData.projects.map((p) =>
                              p.id === proj.id
                                ? { ...p, technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) }
                                : p
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Live URL / Repo"
                        value={proj.link || ''}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            projects: resumeData.projects.map((p) =>
                              p.id === proj.id ? { ...p, link: e.target.value } : p
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. EDUCATION & CERTS TAB */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Education
                  </span>
                  <button
                    onClick={() => {
                      const newEdu = {
                        id: `edu-${Date.now()}`,
                        institution: 'University Name',
                        degree: 'B.S.',
                        fieldOfStudy: 'Computer Science',
                        startYear: '2016',
                        endYear: '2020'
                      };
                      setResumeData({
                        ...resumeData,
                        education: [newEdu, ...resumeData.education]
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add School</span>
                  </button>
                </div>

                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Institution / University"
                        value={edu.institution}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.map((item) =>
                              item.id === edu.id ? { ...item, institution: e.target.value } : item
                            )
                          })
                        }
                        className="font-bold px-2 py-1 rounded border border-neutral-200 bg-white flex-1 mr-2"
                      />
                      <button
                        onClick={() => {
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.filter((item) => item.id !== edu.id)
                          });
                        }}
                        className="text-neutral-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.map((item) =>
                              item.id === edu.id ? { ...item, degree: e.target.value } : item
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.map((item) =>
                              item.id === edu.id ? { ...item, fieldOfStudy: e.target.value } : item
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Start Year"
                        value={edu.startYear}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.map((item) =>
                              item.id === edu.id ? { ...item, startYear: e.target.value } : item
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="End Year"
                        value={edu.endYear}
                        onChange={(e) =>
                          setResumeData({
                            ...resumeData,
                            education: resumeData.education.map((item) =>
                              item.id === edu.id ? { ...item, endYear: e.target.value } : item
                            )
                          })
                        }
                        className="px-2 py-1 rounded border border-neutral-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN (lg: 7 of 12 columns): Interactive Document Live Paper Preview */}
        <section className="lg:col-span-7 flex flex-col items-center">
          {/* Zoom & Document Meta Header (Hidden in print) */}
          <div className="w-full flex items-center justify-between mb-3 text-xs text-neutral-500 no-print print:hidden px-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-800">Live Vector Document Preview</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 uppercase font-semibold">
                {settings.templateId}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200/80 rounded-xl px-2 py-1 shadow-2xs">
              <button
                onClick={() => setZoomScale((z) => Math.max(0.65, z - 0.1))}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-600"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-9 text-center font-semibold">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((z) => Math.min(1.3, z + 0.1))}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-600"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomScale(0.95)}
                className="text-[10px] font-semibold text-neutral-500 hover:text-neutral-900 ml-1 px-1.5 py-0.5 rounded hover:bg-neutral-100"
              >
                Reset
              </button>
            </div>
          </div>

          {/* THE DOCUMENT PAPER CONTAINER */}
          <div
            ref={printContainerRef}
            id="resume-printable-document"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
              maxWidth: '850px'
            }}
            className="w-full print:transform-none print:w-full print:max-w-none origin-top transition-all"
          >
            <ResumeRenderer data={resumeData} settings={settings} />
          </div>
        </section>
      </main>

      {/* MODALS */}
      {/* 1. Job Selector Modal */}
      <JobSelectorModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSelectJob={handleSelectCodeSlotJob}
      />

      {/* 2. Print Guide Modal */}
      <PrintGuideModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onTriggerPrint={handleTriggerPrint}
      />

      {/* 3. API Key Settings Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Key className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-950">Gemini AI Configuration</h3>
                  <p className="text-xs text-neutral-500">Gemini 2.5 Flash API Key</p>
                </div>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Indicator */}
            <div className="mb-4 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-neutral-600">Active Key Source:</span>
                {isUsingEnvGeminiApiKey() ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Environment (.env)
                  </span>
                ) : localStorage.getItem('codeslot_gemini_key') ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Custom Browser Key
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Smart Fallback Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                {isUsingEnvGeminiApiKey()
                  ? 'Your Gemini API key is securely loaded from your .env file and never exposed or hardcoded in source files.'
                  : localStorage.getItem('codeslot_gemini_key')
                    ? 'You are currently using a custom browser-saved key. You can clear it to revert to the .env file key.'
                    : 'Add GEMINI_API_KEY in your .env file or enter a custom key below to enable live AI tailoring.'}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Custom Key Override (Optional)
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Enter custom Gemini key (or leave empty to use .env)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 font-mono focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {keySavedToast && (
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key settings saved successfully!</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-6">
              {localStorage.getItem('codeslot_gemini_key') && (
                <button
                  type="button"
                  onClick={() => {
                    clearCustomGeminiApiKey();
                    setApiKeyInput('');
                    setKeySavedToast(true);
                    setTimeout(() => {
                      setKeySavedToast(false);
                      setIsKeyModalOpen(false);
                    }, 800);
                  }}
                  className="py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer"
                  title="Clear custom key and revert to .env"
                >
                  Use .env Key
                </button>
              )}
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setGeminiApiKey(apiKeyInput);
                  setKeySavedToast(true);
                  setTimeout(() => {
                    setKeySavedToast(false);
                    setIsKeyModalOpen(false);
                  }, 800);
                }}
                className="flex-1 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
