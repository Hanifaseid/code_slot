import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  MapPin,
  Briefcase,
  Code2,
  Globe,
  Github,
  Linkedin,
  CheckCircle2,
  Loader2,
  Bookmark,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { UserSession } from '../types';
import { apiClient } from '../services/apiClient';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onProfileUpdated: (updatedUser: UserSession) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onProfileUpdated,
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [specialization, setSpecialization] = useState('Full Stack');
  const [experienceLevel, setExperienceLevel] = useState<'Junior' | 'Intermediate' | 'Senior' | 'Lead'>('Senior');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isOpen || !currentUser) return;
    setFeedback(null);
    setName(currentUser.name || '');

    // Fetch fresh profile from backend
    setIsLoading(true);
    apiClient
      .get<{ user: any }>('/auth/me')
      .then((res) => {
        if (res.success && res.data?.user) {
          const u = res.data.user;
          setName(u.name || currentUser.name || '');
          setTitle(u.title || '');
          setLocation(u.location || '');
          setSkills(Array.isArray(u.skills) ? u.skills.join(', ') : '');
          setSpecialization(u.specialization || 'Full Stack');
          setExperienceLevel(u.experienceLevel || (currentUser.experienceLevel as any) || 'Senior');
          setGithubUrl(u.githubUrl || '');
          setLinkedinUrl(u.linkedinUrl || '');
          setPortfolioUrl(u.portfolioUrl || '');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, currentUser]);

  if (!isOpen || !currentUser) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const skillsArray = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await apiClient.patch<{ user: any }>('/auth/profile', {
        name,
        title,
        location,
        skills: skillsArray,
        specialization,
        experienceLevel,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
      });

      if (res.success && res.data?.user) {
        const u = res.data.user;
        const nextSession: UserSession = {
          ...currentUser,
          name: u.name,
          title: u.title,
          location: u.location,
          experienceLevel: u.experienceLevel || experienceLevel,
          savedJobIds: u.savedJobIds || currentUser.savedJobIds || [],
          appliedJobIds: u.appliedJobIds || currentUser.appliedJobIds || [],
        };

        try {
          localStorage.setItem('codeslot_user', JSON.stringify(nextSession));
        } catch {
          // ignore
        }

        onProfileUpdated(nextSession);
        setFeedback({ type: 'success', message: 'Profile updated and synced with cloud database.' });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setFeedback({
          type: 'error',
          message: res.error || 'Failed to update profile. Please check connection.',
        });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network connection issue occurred.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fbfaf7] w-full max-w-xl rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
              {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'ME'}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
                <span>Developer Profile</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  {currentUser.role === 'admin' ? 'Super Admin' : 'Verified Candidate'}
                </span>
              </h2>
              <p className="text-xs text-neutral-500">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-left text-xs font-sans">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-neutral-500">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-800" />
              <span>Fetching cloud profile...</span>
            </div>
          ) : (
            <>
              {feedback && (
                <div
                  className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                    Job Title / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={title}
                      placeholder="e.g. Senior Backend Engineer"
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={location}
                      placeholder="e.g. Remote (Worldwide) or US/EMEA"
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                    Engineering Track
                  </label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Backend">Backend Systems</option>
                    <option value="Frontend">Frontend & Web</option>
                    <option value="AI / ML">AI & Machine Learning</option>
                    <option value="DevOps / Cloud">DevOps & Cloud Infra</option>
                    <option value="Mobile">Mobile Engineering</option>
                  </select>
                </div>
              </div>

              {/* Experience / Seniority Level */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                  Seniority & Experience Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Junior', label: '🌱 Junior', desc: '0–2 yrs' },
                    { id: 'Intermediate', label: '🚀 Intermediate', desc: '2–5 yrs' },
                    { id: 'Senior', label: '⚡ Senior', desc: '5+ yrs' },
                    { id: 'Lead', label: '👑 Staff / Lead', desc: '8+ yrs' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setExperienceLevel(lvl.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        experienceLevel === lvl.id
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/60 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{lvl.label}</div>
                      <div className={`text-[10px] mt-0.5 ${experienceLevel === lvl.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {lvl.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                  Technical Skills (Comma separated)
                </label>
                <div className="relative">
                  <Code2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={skills}
                    placeholder="TypeScript, React, Node.js, Go, PostgreSQL, Docker, AWS"
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-200/70">
                <div className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                  Professional Profiles & Links
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="relative">
                    <Github className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="url"
                      value={githubUrl}
                      placeholder="GitHub URL"
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="relative">
                    <Linkedin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="url"
                      value={linkedinUrl}
                      placeholder="LinkedIn URL"
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      placeholder="Portfolio / Site"
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-xs font-medium focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-[11px] font-semibold">
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentUser.savedJobIds?.length || 0} Bookmarked Jobs</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-[11px] font-semibold">
                  <Send className="w-3.5 h-3.5 text-blue-500" />
                  <span>{currentUser.appliedJobIds?.length || 0} Submitted Applications</span>
                </span>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-neutral-600 hover:text-neutral-900 font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#111215] hover:bg-neutral-800 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
