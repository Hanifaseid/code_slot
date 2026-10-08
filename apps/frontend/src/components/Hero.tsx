import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onRequestAccess: () => void;
  onAiResumeClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestAccess, onAiResumeClick }) => {
  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-[62px] leading-[1.08] text-[#111215] font-normal tracking-tight max-w-3xl mx-auto"
        >
          Remote tech jobs, <br className="hidden sm:inline" />
          from across the world.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-sm sm:text-base text-[#4f535d] max-w-xl mx-auto font-normal leading-relaxed"
        >
          A global platform where software engineers and tech talent find high-impact, 100% remote roles — and start building together.
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            id="hero-request-access-btn"
            onClick={onRequestAccess}
            className="px-7 py-3 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Explore remote jobs
          </button>

          {onAiResumeClick && (
            <button
              id="hero-ai-resume-btn"
              onClick={onAiResumeClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300/80 text-xs sm:text-sm font-semibold tracking-tight shadow-2xs hover:shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Tailor Resume with AI</span>
            </button>
          )}
        </motion.div>

        {/* Network Graphic Container with Ambient Glow */}
        <div className="relative mt-16 sm:mt-20 max-w-4xl mx-auto min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
          {/* Ambient Glow matching the screenshot's color spectrum */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="w-[85%] h-[75%] rounded-full blur-[70px] opacity-75 sm:opacity-90 flex">
              {/* Left yellow/orange */}
              <div className="w-1/3 h-full bg-[#fbb040] opacity-80 rounded-l-full mix-blend-multiply" />
              {/* Center warm coral */}
              <div className="w-1/3 h-full bg-[#f68e6f] opacity-70 mix-blend-multiply" />
              {/* Right soft blue/periwinkle */}
              <div className="w-1/3 h-full bg-[#82aaff] opacity-85 rounded-r-full mix-blend-multiply" />
            </div>
          </div>

          {/* SVG Connecting Paths between cards & nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 800 360"
            fill="none"
          >
            {/* Curved path from Amber to middle hub */}
            <path
              d="M 270 120 C 330 110, 360 140, 400 135"
              stroke="#6b7280"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeOpacity="0.4"
            />
            {/* Path from middle hub to Daniel */}
            <path
              d="M 440 145 C 470 155, 500 130, 530 130"
              stroke="#6b7280"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeOpacity="0.4"
            />
            {/* Upper connections */}
            <path
              d="M 335 90 C 370 75, 410 70, 440 95"
              stroke="#6b7280"
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.35"
            />
            {/* Lower connections */}
            <path
              d="M 360 175 C 390 190, 430 185, 470 160"
              stroke="#6b7280"
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.35"
            />
          </svg>

          {/* Interactive Network Display */}
          <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between gap-6 px-2 sm:px-6">
            {/* Amber's Card (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200/70 text-left w-64 sm:w-68 transform hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=160&h=160"
                  alt="Elena avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-100"
                />
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900 leading-snug">Elena</h4>
                  <p className="text-[11px] text-neutral-500">VP of Eng at AI Scale</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                Hiring a <strong className="font-semibold text-neutral-900">Staff Distributed Eng</strong>
              </div>
            </motion.div>

            {/* Central Node Constellation */}
            <div className="relative w-72 h-44 flex items-center justify-center">
              {/* Floating avatar top left */}
              <div className="absolute top-2 left-6">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=96&h=96"
                  alt="Network node"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
              </div>

              {/* Floating avatar top right */}
              <div className="absolute top-4 right-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96"
                  alt="Network node"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
              </div>

              {/* Floating avatar center left */}
              <div className="absolute bottom-6 left-12">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=96&h=96"
                  alt="Network node"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
              </div>

              {/* Floating avatar right */}
              <div className="absolute bottom-4 right-8">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=96&h=96"
                  alt="Network node"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
              </div>

              {/* Central Pills Container */}
              <div className="flex flex-col gap-2.5 items-center z-20">
                {/* Pill 1: Matched global search */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-neutral-200/90 shadow-sm text-[11px] font-medium text-neutral-800"
                >
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  <span>100% Worldwide Remote</span>
                </motion.div>

                {/* Pill 2: Recommended Daniel */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-neutral-200/90 shadow-sm text-[11px] font-medium text-neutral-800"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Matched Staff Engineer</span>
                </motion.div>
              </div>
            </div>

            {/* Daniel's Card (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200/70 text-left w-64 sm:w-68 transform hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=160&h=160"
                  alt="Daniel avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900 leading-snug">Daniel</h4>
                  <p className="text-[11px] text-neutral-500">Staff Cloud Architect</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                Looking for <strong className="font-semibold text-neutral-900">Global Remote (Rust/Go)</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
