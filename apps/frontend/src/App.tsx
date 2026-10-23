import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoMarquee } from './components/LogoMarquee';
import { ValueProps } from './components/ValueProps';
import { HowItWorks } from './components/HowItWorks';
import { TalentBanner } from './components/TalentBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RequestAccessModal } from './components/RequestAccessModal';
import { InfoModal } from './components/InfoModal';
import { AuthPage } from './components/AuthPage';
import { JobsPortal } from './components/JobsPortal';
import { JobDetailPage } from './components/JobDetailPage';
import { ResumeStudio } from './components/resume/ResumeStudio';
import { AdminPortal } from './components/admin/AdminPortal';
import { Job, UserSession } from './types';
import { AITailorResult } from './types/resume';
import { getJobById, invalidateJobsCache, toggleSaveJobBackend } from './services/jobService';
import { apiClient, setStoredAuthToken } from './services/apiClient';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('codeslot_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'jobs' | 'job-detail' | 'resume' | 'admin'>('landing');
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [postAuthDestination, setPostAuthDestination] = useState<'jobs' | 'resume'>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [resumeStudioJob, setResumeStudioJob] = useState<Job | null>(null);
  const [resumeTailorResult, setResumeTailorResult] = useState<AITailorResult | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('codeslot_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [accessModalIntent, setAccessModalIntent] = useState<'hire' | 'connect'>('hire');
  const [infoModalData, setInfoModalData] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: null
  });

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;

      if (hash.startsWith('#admin') || hash === '#admin') {
        const storedUser = localStorage.getItem('codeslot_user');
        const parsed = storedUser ? JSON.parse(storedUser) : null;
        const isAdmin =
          (parsed && (parsed.role === 'admin' || parsed.email === 'admin@gmail.com')) ||
          currentUser?.role === 'admin' ||
          currentUser?.email === 'admin@gmail.com';

        if (isAdmin) {
          setCurrentPage('admin');
        } else {
          setPostAuthDestination('jobs');
          setAuthInitialMode('signin');
          setCurrentPage('auth');
          window.location.hash = 'login';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('#job/')) {
        const jobId = hash.replace('#job/', '');
        if (jobId) {
          const job = await getJobById(jobId);
          if (job) {
            setSelectedJob(job);
            setCurrentPage('job-detail');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        }
        // Fallback to jobs board if job not found
        setCurrentPage('jobs');
        return;
      }

      if (hash === '#resume' || hash.startsWith('#resume')) {
        const storedUser = localStorage.getItem('codeslot_user');
        if (storedUser || currentUser) {
          setCurrentPage('resume');
        } else {
          setPostAuthDestination('resume');
          setAuthInitialMode('signin');
          setCurrentPage('auth');
          window.location.hash = 'login';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '#jobs') {
        const storedUser = localStorage.getItem('codeslot_user');
        if (storedUser || currentUser) {
          setCurrentPage('jobs');
        } else {
          // If not logged in, route to login first
          setAuthInitialMode('signin');
          setCurrentPage('auth');
          window.location.hash = 'login';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '#signup') {
        setAuthInitialMode('signup');
        setCurrentPage('auth');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '#auth' || hash === '#login' || hash === '#signin') {
        setAuthInitialMode('signin');
        setCurrentPage('auth');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '' || hash === '#home') {
        setCurrentPage('landing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const navigateToResume = (job?: Job | null, result?: AITailorResult | null) => {
    setResumeStudioJob(job || null);
    setResumeTailorResult(result || null);
    setCurrentPage('resume');
    window.location.hash = 'resume';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAuth = (mode: 'signin' | 'signup' = 'signin', destination: 'jobs' | 'resume' = 'jobs') => {
    setPostAuthDestination(destination);
    setAuthInitialMode(mode);
    setCurrentPage('auth');
    window.location.hash = mode === 'signin' ? 'login' : 'signup';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setPostAuthDestination('jobs');
    setCurrentPage('landing');
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToJobs = () => {
    if (currentUser) {
      setCurrentPage('jobs');
      window.location.hash = 'jobs';
    } else {
      navigateToAuth('signin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectJob = async (jobId: string) => {
    window.location.hash = `job/${jobId}`;
    const job = await getJobById(jobId);
    if (job) {
      setSelectedJob(job);
      setCurrentPage('job-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    // Invalidate cached jobs so the Job Board fetches fresh data from remote platforms every login
    invalidateJobsCache();
    try {
      localStorage.setItem('codeslot_user', JSON.stringify(user));
    } catch {
      // ignore
    }

    if (user.role === 'admin' || user.email === 'admin@gmail.com') {
      try {
        localStorage.setItem('codeslot_admin_auth', 'true');
      } catch {
        // ignore
      }
      setCurrentPage('admin');
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (postAuthDestination === 'resume') {
      setPostAuthDestination('jobs');
      navigateToResume(null);
    } else {
      setCurrentPage('jobs');
      window.location.hash = 'jobs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    invalidateJobsCache();
    setStoredAuthToken(null);
    try {
      localStorage.removeItem('codeslot_user');
      localStorage.removeItem('codeslot_admin_auth');
      localStorage.removeItem('codeslot_auth_token');
    } catch {
      // ignore
    }
    // Notify backend
    apiClient.post('/auth/logout').catch(() => {});

    setCurrentPage('landing');
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      try {
        localStorage.setItem('codeslot_saved_jobs', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    // Sync bookmark to backend database
    toggleSaveJobBackend(jobId).catch((err) => {
      console.debug('Failed to sync saved job to backend:', err);
    });
  };

  const handleAboutClick = () => {
    setInfoModalData({
      isOpen: true,
      title: 'About CodeSlot',
      content: (
        <div className="space-y-3">
          <p>
            CodeSlot connects software developers, engineers, and technical builders worldwide to exceptional, 100% real remote tech opportunities.
          </p>
          <p>
            We curate genuine positions directly from authentic company career portals (Linear, Stripe, Vercel, Supabase, OpenAI, Figma, and live verified developer feeds).
          </p>
          <p>
            Zero recruiter noise, 100% transparent job specifications, and direct access to original application sources.
          </p>
        </div>
      )
    });
  };

  const handleLegalClick = (title: string) => {
    setInfoModalData({
      isOpen: true,
      title,
      content: (
        <div className="space-y-3">
          <p>
            At CodeSlot, developer privacy and career integrity are our highest priorities. All profiles and job searches remain private by default.
          </p>
          <p>
            Every position is verified from official employer websites. When you click to apply, you are connected directly to the company's verified application system in a new tab.
          </p>
          <p>
            For questions or requests regarding your data, contact{' '}
            <a href="mailto:support@codeslot.dev" className="text-neutral-900 font-medium underline">
              support@codeslot.dev
            </a>.
          </p>
        </div>
      )
    });
  };

  // 1. Job Detail Page
  if (currentPage === 'job-detail' && selectedJob) {
    return (
      <JobDetailPage
        job={selectedJob}
        isSaved={savedJobIds.includes(selectedJob.id)}
        onToggleSave={handleToggleSaveJob}
        onTailorResume={navigateToResume}
        onBack={() => {
          if (currentUser) {
            navigateToJobs();
          } else {
            navigateToLanding();
          }
        }}
      />
    );
  }

  // 2. Authenticated Jobs Portal (Cards & Lists of real jobs)
  if (currentPage === 'jobs' && currentUser) {
    return (
      <JobsPortal
        user={currentUser}
        onSelectJob={handleSelectJob}
        onLogout={handleLogout}
        onNavigateHome={navigateToLanding}
        onAiResumeClick={navigateToResume}
      />
    );
  }

  // 3. AI Resume & CV Studio
  if (currentPage === 'resume') {
    return (
      <ResumeStudio
        initialJob={resumeStudioJob}
        initialTailorResult={resumeTailorResult}
        onBack={() => {
          if (resumeStudioJob) {
            setSelectedJob(resumeStudioJob);
            setCurrentPage('job-detail');
            window.location.hash = `job/${resumeStudioJob.id}`;
          } else if (currentUser) {
            navigateToJobs();
          } else {
            navigateToLanding();
          }
        }}
      />
    );
  }

  // 4. Auth Page (Sign in / Sign up)
  if (currentPage === 'auth') {
    return (
      <AuthPage
        initialMode={authInitialMode}
        onBackToHome={navigateToLanding}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // 5. Admin Portal Console (Master Control Dashboard)
  if (currentPage === 'admin') {
    return (
      <AdminPortal
        onLogout={handleLogout}
        onNavigateToJobs={navigateToJobs}
        onNavigateToLanding={navigateToLanding}
        onImpersonateUser={(userSession) => {
          handleLoginSuccess(userSession);
        }}
      />
    );
  }

  // 6. Landing Page
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111215] flex flex-col font-sans selection:bg-[#fed7aa] selection:text-neutral-950">
      {/* 1. Header / Navbar */}
      <Navbar
        currentUser={currentUser}
        onJobsClick={navigateToJobs}
        onLogout={handleLogout}
        onAdminClick={() => {
          setCurrentPage('admin');
          window.location.hash = 'admin';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onAiResumeClick={() => (currentUser ? navigateToResume(null) : navigateToAuth('signin', 'resume'))}
        onRequestAccess={() => (currentUser ? navigateToJobs() : navigateToAuth('signin', 'jobs'))}
        onHireClick={() => (currentUser ? navigateToJobs() : navigateToAuth('signin', 'jobs'))}
        onAboutClick={handleAboutClick}
        onAuthClick={() => navigateToAuth('signin', 'jobs')}
        onBrandClick={navigateToLanding}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Hero Section: Explore remote jobs CTA & AI Resume CTA */}
        <Hero
          onRequestAccess={() => (currentUser ? navigateToJobs() : navigateToAuth('signin', 'jobs'))}
          onAiResumeClick={() => (currentUser ? navigateToResume(null) : navigateToAuth('signin', 'resume'))}
        />

        {/* 3. Company Logos Showcase (Interactive 3-row opposite direction marquee with accurate brand logos) */}
        <LogoMarquee />

        {/* 4. Value Propositions (Better fits, Less noise, More warmth) */}
        <ValueProps />

        {/* 5. How CodeSlot Works */}
        <HowItWorks onRequestAccess={() => (currentUser ? navigateToJobs() : navigateToAuth('signin'))} />

        {/* 6. Talent Banner */}
        <TalentBanner onLearnMore={() => (currentUser ? navigateToJobs() : navigateToAuth('signin'))} />

        {/* 7. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 8. Unified Footer with Networking CTA, Substack & Contact */}
      <Footer
        onRequestAccess={() => (currentUser ? navigateToJobs() : navigateToAuth('signin'))}
        onLegalClick={handleLegalClick}
        onAuthClick={() => navigateToAuth('signin')}
      />

      {/* Interactive Modals */}
      <RequestAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        defaultRole={accessModalIntent}
      />

      <InfoModal
        isOpen={infoModalData.isOpen}
        onClose={() => setInfoModalData((prev) => ({ ...prev, isOpen: false }))}
        title={infoModalData.title}
        content={infoModalData.content}
      />
    </div>
  );
}
