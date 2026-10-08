import React from 'react';
import { motion } from 'motion/react';

interface FooterCtaProps {
  onRequestAccess: () => void;
}

export const FooterCta: React.FC<FooterCtaProps> = ({ onRequestAccess }) => {
  return (
    <section className="relative pt-24 pb-36 md:pt-32 md:pb-48 overflow-hidden text-center">
      {/* Intense warm sunset ambient blur gradient matching the screenshot */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Main sunset glow in bottom right/center */}
        <div className="absolute -bottom-20 right-0 w-[80vw] max-w-[850px] h-[340px] bg-gradient-to-t from-[#f97316]/75 via-[#fb923c]/50 to-transparent rounded-full blur-[80px] opacity-80" />
        {/* Secondary peach/coral glow */}
        <div className="absolute -bottom-10 left-10 w-[60vw] max-w-[550px] h-[280px] bg-[#fb7185]/35 rounded-full blur-[90px] opacity-60" />
        {/* Golden amber center glow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70vw] max-w-[700px] h-[200px] bg-[#f59e0b]/40 rounded-full blur-[70px] opacity-70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl md:text-[68px] leading-[1.08] text-[#111215] font-normal tracking-tight"
        >
          Networking <br />
          without the noise.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8"
        >
          <button
            id="footer-cta-request-access-btn"
            onClick={onRequestAccess}
            className="px-7 py-3 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            Request access
          </button>
        </motion.div>
      </div>
    </section>
  );
};
