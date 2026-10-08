import React from 'react';
import { Sparkles, Fingerprint, Smile } from 'lucide-react';
import { motion } from 'motion/react';

export const ValueProps: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] text-[#111215] font-normal tracking-tight">
          Global tech jobs <br className="hidden sm:inline" />
          that feel focused.
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-xs sm:text-sm text-[#525560] max-w-xl mx-auto font-normal leading-relaxed">
          CodeSlot filters out location limits and recruiter noise, connecting engineers directly to authentic worldwide remote opportunities.
        </p>

        {/* 3 Columns */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 max-w-4xl mx-auto">
          {/* Item 1: 100% Tech-Only */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#ff9bb2] to-[#ffccd8] shadow-xs mb-5 transition-transform group-hover:scale-105 duration-300">
              <Sparkles className="w-8 h-8 text-[#982b4a] stroke-[1.8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111215] tracking-tight">
              100% Tech-Only
            </h3>
            <p className="mt-2 text-xs text-[#525560] leading-relaxed max-w-[230px]">
              Curated roles strictly in software, AI, systems, infrastructure, and engineering.
            </p>
          </motion.div>

          {/* Item 2: Truly Worldwide */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#c4b5fd] to-[#ddd6fe] shadow-xs mb-5 transition-transform group-hover:scale-105 duration-300">
              <Fingerprint className="w-8 h-8 text-[#4c3a96] stroke-[1.8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111215] tracking-tight">
              Truly Worldwide
            </h3>
            <p className="mt-2 text-xs text-[#525560] leading-relaxed max-w-[230px]">
              Work from anywhere across the globe. No border barriers or geographic restrictions.
            </p>
          </motion.div>

          {/* Item 3: Direct to Teams */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#fed7aa] to-[#ffedd5] shadow-xs mb-5 transition-transform group-hover:scale-105 duration-300">
              <Smile className="w-8 h-8 text-[#9a4e09] stroke-[1.8]" />
            </div>
            <h3 className="text-base font-semibold text-[#111215] tracking-tight">
              Direct to Teams
            </h3>
            <p className="mt-2 text-xs text-[#525560] leading-relaxed max-w-[230px]">
              Direct contact with engineering managers and technical founders vs. recruiter spam.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
