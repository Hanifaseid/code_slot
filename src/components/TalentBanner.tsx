import React from 'react';
import { motion } from 'motion/react';

interface TalentBannerProps {
  onLearnMore: () => void;
}

export const TalentBanner: React.FC<TalentBannerProps> = ({ onLearnMore }) => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center shadow-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, #182226 0%, #151a24 45%, #2a2c26 80%, #3a3b34 100%)'
          }}
        >
          {/* Subtle iridescent corner ambient blurs */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-white font-normal tracking-tight leading-tight">
              Hire world-class remote <br className="hidden sm:inline" />
              tech talent with CodeSlot.
            </h2>

            {/* Trusted Teams line with micro-badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-white/75 text-xs sm:text-sm">
              <div className="flex items-center -space-x-1">
                <div className="w-4 h-4 rounded bg-[#625df5] flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-black/40">
                  L
                </div>
                <div className="w-4 h-4 rounded bg-[#E01E5A] flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-black/40">
                  S
                </div>
                <div className="w-4 h-4 rounded bg-[#ff6719] flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-black/40">
                  s
                </div>
              </div>
              <span className="font-light">
                Trusted by fast-growing remote engineering teams worldwide
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                id="talent-banner-learn-more-btn"
                onClick={onLearnMore}
                className="px-6 sm:px-7 py-3 rounded-full bg-white hover:bg-neutral-100 text-[#111215] text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                Learn More 
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
