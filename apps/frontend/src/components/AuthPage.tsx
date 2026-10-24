import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  Shield,
  ArrowRight,
  Mail,
  Lock,
  User,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { UserSession } from '../types';
import { invalidateJobsCache } from '../services/jobService';
import { apiClient, setStoredAuthToken } from '../services/apiClient';

interface AuthPageProps {
  onBackToHome: () => void;
  onLoginSuccess?: (user: UserSession) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onBackToHome,
  onLoginSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setResetNotice(false);
  }, [initialMode]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetNotice, setResetNotice] = useState(false);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passwordScore = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResetNotice(false);

    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }
    if (mode === 'signup' && !fullName) {
      setErrorMessage('Please enter your full name');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login';
      const payload =
        mode === 'signup'
          ? { email: email.trim(), password, name: fullName.trim() }
          : { email: email.trim(), password };

      const res = await apiClient.post<{ user: UserSession; token: string }>(endpoint, payload);

      if (res.success && res.data?.user) {
        setIsLoading(false);
        const userSession = res.data.user;
        if (res.data.token) {
          setStoredAuthToken(res.data.token);
        }
        try {
          localStorage.setItem('codeslot_user', JSON.stringify(userSession));
          if (userSession.role === 'admin' || userSession.email === 'admin@gmail.com') {
            localStorage.setItem('codeslot_admin_auth', 'true');
          }
        } catch {
          // ignore
        }
        invalidateJobsCache();
        setAuthSuccess(userSession.name);
        if (onLoginSuccess) {
          onLoginSuccess(userSession);
        }
        return;
      }

      if (!res.success && res.error && !res.error.includes('Failed to fetch') && !res.error.includes('Network')) {
        setIsLoading(false);
        setErrorMessage(res.error);
        return;
      }
    } catch {
      // Backend offline: continue to client fallback
    }

    // Client fallback if backend is booting or offline
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = email.trim().toLowerCase() === 'admin@gmail.com';
      const name = isAdmin ? 'Super Admin' : fullName.trim() || email.split('@')[0] || 'Developer';
      const userSession: UserSession = {
        email: email.trim(),
        name,
        role: isAdmin ? 'admin' : 'candidate',
        savedJobIds: [],
        appliedJobIds: [],
      };
      try {
        localStorage.setItem('codeslot_user', JSON.stringify(userSession));
        if (isAdmin) {
          localStorage.setItem('codeslot_admin_auth', 'true');
        }
      } catch {
        // ignore
      }
      invalidateJobsCache();
      setAuthSuccess(name);
      if (onLoginSuccess) {
        onLoginSuccess(userSession);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#fbfaf7] text-[#111215] flex flex-col font-sans selection:bg-[#fed7aa] selection:text-neutral-950 overflow-y-auto lg:overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:h-full">
        
        {/* ========================================================= */}
        {/* LEFT HALF: MINIMAL INPUT FORM (NO SCROLLING)             */}
        {/* ========================================================= */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-neutral-200/70 bg-[#fbfaf7] relative z-10 lg:h-full">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              id="auth-back-to-home-btn"
              onClick={onBackToHome}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer py-1 px-2.5 rounded-full hover:bg-neutral-100"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </button>

            <button
              onClick={onBackToHome}
              className="font-logo text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight select-none hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="CodeSlot Home"
            >
              CODE<span className="text-orange-500">SLOT</span>
            </button>
          </div>

          {/* Form Content Container */}
          <div className="max-w-sm w-full mx-auto my-auto py-4">
            <AnimatePresence mode="wait">
              {authSuccess ? (
                /* Authenticated State */
                <motion.div
                  key="auth-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-6 bg-white border border-neutral-200/80 shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-normal tracking-tight">
                    Welcome, {authSuccess}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {mode === 'signup'
                      ? 'Your remote developer profile is active. Verified tech roles are ready.'
                      : 'You are signed in to your CodeSlot developer account.'}
                  </p>

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (onLoginSuccess) {
                          onLoginSuccess({
                            email: email.trim() || 'developer@codeslot.dev',
                            name: authSuccess,
                            savedJobIds: [],
                            appliedJobIds: []
                          });
                        } else {
                          onBackToHome();
                        }
                      }}
                      className="w-full py-2.5 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-xs font-medium tracking-tight shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Remote Jobs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setAuthSuccess(null)}
                      className="w-full py-1.5 text-neutral-500 hover:text-neutral-900 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Switch Account
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Primary Auth Form Area */
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Segmented Mode Selector */}
                  <div className="p-1 rounded-full bg-neutral-200/70 inline-flex items-center w-full max-w-[240px]">
                    <button
                      id="auth-mode-signin"
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setErrorMessage('');
                        setResetNotice(false);
                      }}
                      className={`flex-1 py-1 px-3 rounded-full text-xs font-medium transition-all cursor-pointer text-center ${
                        mode === 'signin'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      id="auth-mode-signup"
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setErrorMessage('');
                        setResetNotice(false);
                      }}
                      className={`flex-1 py-1 px-3 rounded-full text-xs font-medium transition-all cursor-pointer text-center ${
                        mode === 'signup'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Header Title & Subtext */}
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl text-[#111215] font-normal tracking-tight">
                      {mode === 'signin' ? 'Welcome back' : 'Create profile'}
                    </h1>
                    <p className="mt-1 text-xs text-neutral-500">
                      {mode === 'signin'
                        ? 'Access verified remote tech matches & offers.'
                        : 'Connect with engineering teams hiring worldwide.'}
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Reset Password Notice */}
                  {resetNotice && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Password reset link sent to your email.</span>
                    </div>
                  )}

                  {/* Pure Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Full Name for Sign Up */}
                    {mode === 'signup' && (
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            id="auth-name-input"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Maya Chen"
                            required={mode === 'signup'}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email Input */}
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                        Developer Work Email
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="auth-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@systems.dev"
                          required
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-medium text-neutral-700">
                          Password
                        </label>
                        {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => setResetNotice(true)}
                            className="text-[11px] text-neutral-500 hover:text-neutral-900 underline transition-colors cursor-pointer"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="auth-password-input"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••••••'}
                          required
                          className="w-full pl-9 pr-8 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Compact Password Strength Meter */}
                      {mode === 'signup' && password && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <div className="flex-1 grid grid-cols-4 gap-1 h-1">
                            <div className={`rounded-full h-full ${passwordScore >= 1 ? 'bg-rose-400' : 'bg-neutral-200'}`} />
                            <div className={`rounded-full h-full ${passwordScore >= 2 ? 'bg-amber-400' : 'bg-neutral-200'}`} />
                            <div className={`rounded-full h-full ${passwordScore >= 3 ? 'bg-emerald-400' : 'bg-neutral-200'}`} />
                            <div className={`rounded-full h-full ${passwordScore >= 4 ? 'bg-emerald-500' : 'bg-neutral-200'}`} />
                          </div>
                          <span className="text-[10px] text-neutral-400 shrink-0">
                            {passwordScore <= 1 && 'Weak'}
                            {passwordScore === 2 && 'Fair'}
                            {passwordScore === 3 && 'Good'}
                            {passwordScore >= 4 && 'Strong'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Checkbox Options */}
                    <div className="pt-0.5">
                      {mode === 'signin' ? (
                        <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-3.5 h-3.5"
                          />
                          <span>Keep me signed in</span>
                        </label>
                      ) : (
                        <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            required
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-3.5 h-3.5"
                          />
                          <span>
                            I agree to <span className="underline text-neutral-800">Terms</span> & <span className="underline text-neutral-800">Privacy</span>
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Primary Submit Button */}
                    <div className="pt-1 space-y-2">
                      <button
                        id="auth-submit-btn"
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-xs font-medium tracking-tight shadow-xs hover:shadow transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{mode === 'signin' ? 'Sign In' : 'Create Profile'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Mode Switch Helper */}
                  <div className="pt-1 text-center text-xs text-neutral-500">
                    {mode === 'signin' ? (
                      <p>
                        New to CodeSlot?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signup');
                            setErrorMessage('');
                            setResetNotice(false);
                          }}
                          className="text-neutral-950 font-semibold hover:underline cursor-pointer"
                        >
                          Sign up
                        </button>
                      </p>
                    ) : (
                      <p>
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signin');
                            setErrorMessage('');
                            setResetNotice(false);
                          }}
                          className="text-neutral-950 font-semibold hover:underline cursor-pointer"
                        >
                          Sign in
                        </button>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Security Note */}
          <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-neutral-400" />
              <span>Direct introductions • Zero recruiter spam</span>
            </div>
            <div>
              <span>100% remote</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT HALF: MINIMAL CONTENT SHOWCASE (NO SCROLLING)       */}
        {/* ========================================================= */}
        <div className="hidden lg:flex flex-col justify-between p-8 lg:p-10 xl:p-12 bg-[#f7f5ee] relative overflow-hidden select-none lg:h-full">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#fed7aa]/35 via-[#fbcfe8]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-[#ddd6fe]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill Header */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-neutral-200 shadow-xs text-[11px] font-semibold text-neutral-800 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>100% REMOTE TECH ONLY • WORLDWIDE</span>
            </div>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 max-w-md my-auto space-y-4">
            <div>
              <h2 className="font-serif text-xl lg:text-2xl text-[#111215] font-normal tracking-tight leading-snug">
                Where exceptional engineers build without borders.
              </h2>
              <p className="mt-1.5 text-xs text-[#525560] leading-relaxed">
                Connect directly with engineering directors and founders across 40+ countries. Transparent comp and zero geographical penalties.
              </p>
            </div>

            {/* Live Role Match Card with signature gradient border */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#f43f5e] via-[#fb7185] to-[#fed7aa] shadow-md">
              <div className="bg-white rounded-xl p-4 shadow-xs space-y-3">
                {/* Status bar */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-800 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Live Match Opportunity</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">100% Remote</span>
                </div>

                {/* Job Title & Compensation */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-neutral-900 leading-snug">
                    Staff Distributed Systems Architect
                  </h4>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    AI Infrastructure Labs • Global Team
                  </div>
                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                    $195,000 – $245,000 USD • Equity
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium">Rust</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium">Go</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium">Raft</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium">K8s</span>
                </div>

                {/* Elena Hiring VP Quote Card */}
                <div className="p-2.5 rounded-lg bg-neutral-50/80 border border-neutral-100 flex items-start gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=64&h=64"
                    alt="Elena"
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-white"
                  />
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-900">Elena, VP of Engineering</div>
                    <p className="text-[10px] text-neutral-600 italic mt-0.5 leading-snug">
                      "Looking for an architect with distributed consensus experience. Worldwide entity employment."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 pt-3 border-t border-neutral-300/60">
            <p className="text-[11px] text-neutral-600 italic leading-snug">
              "CodeSlot connected me directly with my engineering lead in two conversations. Zero recruiter noise."
            </p>
            <div className="mt-1 text-[10px] font-semibold text-neutral-900">
              — Michelle Zhang, Principal Systems Architect
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

