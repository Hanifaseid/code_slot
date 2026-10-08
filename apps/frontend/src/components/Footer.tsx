import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

interface FooterProps {
  onRequestAccess?: () => void;
  onLegalClick?: (title: string) => void;
  onAuthClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestAccess, onLegalClick, onAuthClick }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setShowInput(false);
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#fffbf4] text-[#181229] select-none">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section 1: "Remote tech jobs, without the borders." CTA with identical Hero ambient glow */}
        <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 md:pt-36 md:pb-32 text-center flex flex-col items-center justify-center">
          {/* Ambient Glow identical to Hero section: identical width, length, colors & blur */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <div className="relative w-full max-w-4xl mx-auto min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
              <div className="w-[85%] h-[75%] rounded-full blur-[70px] opacity-75 sm:opacity-90 flex">
                {/* Left yellow/orange */}
                <div className="w-1/3 h-full bg-[#fbb040] opacity-80 rounded-l-full mix-blend-multiply" />
                {/* Center warm coral */}
                <div className="w-1/3 h-full bg-[#f68e6f] opacity-70 mix-blend-multiply" />
                {/* Right soft blue/periwinkle */}
                <div className="w-1/3 h-full bg-[#82aaff] opacity-85 rounded-r-full mix-blend-multiply" />
              </div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 font-serif text-4xl sm:text-5xl md:text-[68px] leading-[1.08] text-[#181229] font-normal tracking-tight max-w-3xl mx-auto"
          >
            Remote tech jobs, <br className="hidden sm:inline" />
            without the borders.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10 mt-8 flex justify-center"
          >
            <button
              id="footer-signup-btn"
              onClick={onRequestAccess}
              className="px-7 py-3 rounded-2xl bg-[#000000] hover:bg-neutral-800 text-white text-sm sm:text-[15px] font-medium tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Sign in
            </button>
          </motion.div>
        </div>

        {/* Section 2: Main Footer Navigation & Substack Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 sm:pb-16 border-b border-[#25172a]/[0.06]">
          {/* Left Column: Brand Wordmark Logo & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="inline-block group focus:outline-none" aria-label="CodeSlot Home">
              <span className="font-logo text-2xl sm:text-[26px] font-extrabold tracking-tight text-[#181229] transition-opacity group-hover:opacity-75">
                CODESLOT
              </span>
            </a>

            <div>
              <div className="text-[13px] text-[#25172a]/60 font-medium mb-1">Get in touch</div>
              <a
                href="mailto:support@codeslot.dev"
                className="text-sm text-[#181229] hover:opacity-75 font-normal transition-opacity"
              >
                support@codeslot.dev
              </a>
            </div>
          </div>

          {/* Right Column: Warm Intro Substack Card */}
          <div className="lg:col-span-8 flex justify-start lg:justify-end">
            <div
              id="substack-card"
              className="w-full max-w-[760px] rounded-[20px] bg-[#25172a]/[0.03] hover:bg-[#25172a]/[0.05] border border-[#25172a]/[0.05] p-6 sm:p-7 md:p-8 transition-all relative overflow-hidden"
            >
              {!showInput ? (
                <div
                  onClick={() => setShowInput(true)}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 cursor-pointer group"
                >
                  {/* Connected Nodes SVG Graphic */}
                  <div className="w-[92px] h-[70px] shrink-0">
                    <svg viewBox="0 0 92.18 69.5" className="w-full h-full" overflow="visible">
                      <defs>
                        <linearGradient id="codeslot-sub-gold" x1="0.5" x2="0.5" y1="0" y2="1">
                          <stop offset="0" stopColor="rgba(173,164,93,0.4)" />
                          <stop offset="1" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                        <linearGradient id="codeslot-sub-purple" x1="1" x2="0" y1="0.5" y2="0.5">
                          <stop offset="0" stopColor="rgb(163,160,255)" />
                          <stop offset="1" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                        <linearGradient id="codeslot-sub-orange" x1="0.5" x2="0.5" y1="1" y2="0">
                          <stop offset="0" stopColor="rgba(254,102,33,0.5)" />
                          <stop offset="1" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                      </defs>
                      <path d="M 60 8.5 L 60 69.5 L 44 69.5 L 44 8.5 Z" fill="url(#codeslot-sub-gold)" />
                      <path
                        d="M 57.81 2.321 C 60.97 5.48 60.97 10.603 57.81 13.762 C 54.651 16.921 49.529 16.921 46.37 13.762 C 43.21 10.603 43.21 5.48 46.37 2.321 C 49.529 -0.838 54.651 -0.838 57.81 2.321 Z"
                        fill="rgba(173,164,93,0.84)"
                      />
                      <path d="M 83.818 44.178 L 0 44.178 L 0 28 L 83.818 28 L 83.818 44.18 Z" fill="url(#codeslot-sub-purple)" />
                      <path
                        d="M 84.09 44.18 C 79.622 44.18 76 40.558 76 36.09 C 76 31.622 79.622 28 84.09 28 C 88.558 28 92.18 31.622 92.18 36.09 C 92.18 40.558 88.558 44.18 84.09 44.18 Z"
                        fill="rgb(163,160,255)"
                      />
                      <path d="M 0 55.603 L 0 0 L 16.179 0 L 16.179 55.603 Z" fill="url(#codeslot-sub-orange)" />
                      <path
                        d="M 0 56.09 C 0 51.622 3.622 48 8.09 48 C 12.558 48 16.18 51.622 16.18 56.09 C 16.18 60.558 12.558 64.18 8.09 64.18 C 3.622 64.18 0 60.558 0 56.09 Z"
                        fill="rgb(254,102,33)"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm sm:text-base md:text-lg font-medium text-[#181229] group-hover:text-black transition-colors">
                        Subscribe to our newsletter, CodeSlot Dispatch
                      </div>
                      <span className="text-lg font-normal text-[#181229] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#25172a]/60 mt-1 leading-relaxed">
                      Weekly curated worldwide remote tech jobs, engineering deep-dives, and remote compensation benchmarks
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm sm:text-base font-medium text-[#181229]">
                      Subscribe to CodeSlot Dispatch
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowInput(false)}
                      className="text-xs text-[#25172a]/60 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  {!subscribed ? (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white/80 backdrop-blur-sm border border-[#25172a]/15 rounded-xl focus:outline-none focus:border-black text-[#181229] placeholder-[#25172a]/40"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-black text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          Subscribe
                        </button>
                        <a
                          href="https://codeslot.substack.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-black/[0.05] hover:bg-black/[0.08] text-[#181229] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                          <span>Open Substack</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 py-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <span>Thank you! You've been subscribed to CodeSlot Dispatch.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Bottom Legal Links & Copyright */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#25172a]/60">
          <div>
            CodeSlot Inc 2026 © All Rights Reserved
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            {onAuthClick && (
              <>
                <button
                  id="footer-auth-btn"
                  onClick={onAuthClick}
                  className="font-medium text-[#181229] hover:underline cursor-pointer"
                >
                  Developer Sign In
                </button>
                <span className="w-1 h-1 rounded-full bg-[#25172a]/20" />
              </>
            )}
            <button
              onClick={() => onLegalClick?.('Privacy Policy')}
              className="hover:text-[#181229] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="w-1 h-1 rounded-full bg-[#25172a]/20" />
            <button
              onClick={() => onLegalClick?.('Terms of Service')}
              className="hover:text-[#181229] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
