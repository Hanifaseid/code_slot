import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase, LogOut, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  onRequestAccess: () => void;
  onHireClick?: () => void;
  onAboutClick?: () => void;
  onAuthClick?: () => void;
  onBrandClick?: () => void;
  currentUser?: UserSession | null;
  onJobsClick?: () => void;
  onLogout?: () => void;
  onAiResumeClick?: () => void;
  onProfileClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestAccess,
  onHireClick,
  onAboutClick,
  onAuthClick,
  onBrandClick,
  currentUser,
  onJobsClick,
  onLogout,
  onAiResumeClick,
  onProfileClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = () => {
    if (onAuthClick) {
      onAuthClick();
    } else {
      onRequestAccess();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-none ${
        isScrolled
          ? 'pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none'
          : 'pt-0 px-0 bg-transparent'
      }`}
    >
      <div
        className={`transition-all duration-300 border-none ${
          isScrolled
            ? `max-w-5xl mx-auto bg-white/40 backdrop-blur-xl shadow-sm shadow-black/[0.03] pointer-events-auto ${
                mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'
              }`
            : 'max-w-6xl mx-auto bg-transparent'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'px-5 sm:px-6 h-14 sm:h-15' : 'px-6 h-20'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={onBrandClick}
            className="font-logo text-xl md:text-[22px] font-extrabold text-neutral-950 tracking-tight select-none hover:opacity-80 transition-opacity cursor-pointer text-left"
            aria-label="CodeSlot Home"
          >
            CODESLOT
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-neutral-700">
         

            {currentUser ? (
              <>
                <button
                  onClick={onAboutClick}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  About us
                </button>
                <div className="flex items-center gap-2 pl-2">
                  <button
                    onClick={onProfileClick}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
                    title="Edit profile & preferences"
                  >
                    <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-[11px] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-neutral-800 text-xs font-semibold max-w-[100px] truncate underline-offset-2 group-hover:underline">
                      {currentUser.name}
                    </span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Sign out"
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer ml-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  id="nav-request-access-btn"
                  onClick={onRequestAccess}
                  className="px-5 py-2 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-[13px] font-medium tracking-tight shadow-xs hover:shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  Find remote jobs
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {currentUser ? (
              <button
                id="mobile-nav-jobs-btn"
                onClick={onJobsClick}
                className="px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Briefcase className="w-3 h-3" />
                <span>Jobs</span>
              </button>
            ) : (
              <button
                id="mobile-auth-btn"
                onClick={handleAuth}
                className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 text-xs font-semibold"
              >
                Log in
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden px-6 py-4 space-y-3 ${
              isScrolled
                ? 'bg-white/70 backdrop-blur-xl rounded-b-3xl shadow-sm'
                : 'bg-[#fbfaf7]'
            }`}
          >
            {/* AI Resume Studio Button */}
            <button
              id="mobile-drawer-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onAiResumeClick?.();
              }}
              className="w-full text-left py-2.5 px-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-xs flex items-center justify-between shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>AI Resume & CV Studio</span>
              </span>
              <span className="text-[10px] bg-amber-600 text-white font-extrabold px-1.5 py-0.5 rounded-md">
                NEW
              </span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onJobsClick?.();
                }}
                className="block w-full text-left py-2 text-sm font-bold text-neutral-900 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-neutral-700" />
                <span>Browse Real Tech Jobs</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onHireClick?.();
              }}
              className="block w-full text-left py-2 text-sm font-medium text-neutral-800"
            >
              Hire remote engineers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAboutClick?.();
              }}
              className="block w-full text-left py-2 text-sm font-medium text-neutral-800"
            >
              About us
            </button>
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout?.();
                }}
                className="block w-full text-left py-2 text-sm font-medium text-red-600"
              >
                Sign out ({currentUser.name})
              </button>
            ) : (
              <>
                <button
                  id="mobile-drawer-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAuth();
                  }}
                  className="block w-full text-left py-2 text-sm font-semibold text-neutral-950"
                >
                  Log in / Auth
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onRequestAccess();
                    }}
                    className="w-full py-2.5 rounded-full bg-[#111215] text-white text-sm font-medium text-center shadow-xs"
                  >
                    Find remote jobs
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
