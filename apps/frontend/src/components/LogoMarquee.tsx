import React from 'react';
import { CompanyLogos } from './Logos';

interface LogoItem {
  id: string;
  name: string;
  Component: React.ComponentType;
}

// 8 Verified top-tier technology companies per row with authentic icons
const ROW_1_LOGOS: LogoItem[] = [
  { id: 'google', name: 'Google', Component: CompanyLogos.Google },
  { id: 'openai', name: 'OpenAI', Component: CompanyLogos.OpenAI },
  { id: 'figma', name: 'Figma', Component: CompanyLogos.Figma },
  { id: 'stripe', name: 'Stripe', Component: CompanyLogos.Stripe },
  { id: 'spotify', name: 'Spotify', Component: CompanyLogos.Spotify },
  { id: 'slack', name: 'Slack', Component: CompanyLogos.Slack },
  { id: 'notion', name: 'Notion', Component: CompanyLogos.Notion },
  { id: 'airbnb', name: 'Airbnb', Component: CompanyLogos.Airbnb },
];

const ROW_2_LOGOS: LogoItem[] = [
  { id: 'ramp', name: 'Ramp', Component: CompanyLogos.Ramp },
  { id: 'substack', name: 'Substack', Component: CompanyLogos.Substack },
  { id: 'anthropic', name: 'Anthropic', Component: CompanyLogos.Anthropic },
  { id: 'duolingo', name: 'Duolingo', Component: CompanyLogos.Duolingo },
  { id: 'instacart', name: 'Instacart', Component: CompanyLogos.Instacart },
  { id: 'linear', name: 'Linear', Component: CompanyLogos.Linear },
  { id: 'github', name: 'GitHub', Component: CompanyLogos.GitHub },
  { id: 'loom', name: 'Loom', Component: CompanyLogos.Loom },
];

const ROW_3_LOGOS: LogoItem[] = [
  { id: 'instagram', name: 'Instagram', Component: CompanyLogos.Instagram },
  { id: 'dropbox', name: 'Dropbox', Component: CompanyLogos.Dropbox },
  { id: 'strava', name: 'Strava', Component: CompanyLogos.Strava },
  { id: 'nike', name: 'Nike', Component: CompanyLogos.Nike },
  { id: 'meta', name: 'Meta', Component: CompanyLogos.Meta },
  { id: 'vercel', name: 'Vercel', Component: CompanyLogos.Vercel },
  { id: 'headspace', name: 'Headspace', Component: CompanyLogos.Headspace },
  { id: 'datadog', name: 'Datadog', Component: CompanyLogos.Datadog },
];

export const LogoMarquee: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-t border-b border-black/[0.04] bg-[#fbfaf7]/60">
      {/* Strictly containerized to max-w-5xl to match Hero, ValueProps, HowItWorks */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] text-[#111215] font-normal tracking-tight">
            Exceptional tech leaders are <br className="hidden sm:inline" />
            using CodeSlot to hire.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#525560] max-w-xl mx-auto leading-relaxed">
            Engineering teams at hyper-growth technology companies use CodeSlot to discover and hire top remote software talent worldwide.
          </p>
        </div>

        {/* Contained 3-tier Marquee with subtle bounds and edge gradient masks */}
        <div className="relative overflow-hidden rounded-2xl py-3.5 sm:py-5 space-y-3 sm:space-y-4 marquee-pause-on-hover select-none">
          {/* Subtle Edge Gradient Masks contained within the section bounds */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#fbfaf7] via-[#fbfaf7]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#fbfaf7] via-[#fbfaf7]/80 to-transparent z-10" />

          {/* Row 1: Right to Left (<---) */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-marquee-left flex items-center">
              {/* Set 1 */}
              {ROW_1_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r1-1-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
              {/* Set 2 for seamless loop */}
              {ROW_1_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r1-2-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Left to Right (--->) */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-marquee-right flex items-center">
              {/* Set 1 */}
              {ROW_2_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r2-1-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
              {/* Set 2 for seamless loop */}
              {ROW_2_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r2-2-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 3: Right to Left (<---) */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-marquee-left flex items-center">
              {/* Set 1 */}
              {ROW_3_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r3-1-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
              {/* Set 2 for seamless loop */}
              {ROW_3_LOGOS.map((logo, idx) => {
                const Comp = logo.Component;
                return (
                  <div
                    key={`r3-2-${logo.id}-${idx}`}
                    className="px-6 sm:px-9 py-2 shrink-0 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default flex items-center justify-center"
                    title={logo.name}
                  >
                    <Comp />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
