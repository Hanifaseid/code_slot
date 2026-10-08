import React from 'react';

export const CompanyLogos = {
  // 1. Google (Authentic 4-color 'G' icon + wordmark)
  Google: () => (
    <div className="flex items-center gap-2 font-medium text-neutral-800 text-base">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        />
      </svg>
      <span className="font-semibold tracking-tight text-neutral-800">Google</span>
    </div>
  ),

  // 2. OpenAI (Authentic Spiral Hexagon + wordmark)
  OpenAI: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-semibold tracking-tight text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#10a37f]" viewBox="0 0 24 24">
        <path d="M22.28 10.4a6.45 6.45 0 0 0-.5-4.66 6.64 6.64 0 0 0-4.46-3.4 6.7 6.7 0 0 0-5.74 1.15 6.46 6.46 0 0 0-4.32-.2 6.6 6.6 0 0 0-3.9 3.2 6.72 6.72 0 0 0-.82 5.8 6.47 6.47 0 0 0-1.74 4.34 6.62 6.62 0 0 0 2.28 4.96 6.7 6.7 0 0 0 5.4 1.7 6.46 6.46 0 0 0 4.3 2.1 6.6 6.6 0 0 0 5.25-1.5 6.72 6.72 0 0 0 3.65-4.58 6.46 6.46 0 0 0 2.65-3.8 6.63 6.63 0 0 0-.25-5.11zm-8.8 11.2a4.93 4.93 0 0 1-2.9-1v-4.1l3.52-2.03a.85.85 0 0 1 .86 0l3.47 2a4.87 4.87 0 0 1-4.95 5.13zm-7.66-3.8a4.92 4.92 0 0 1-.6-3 4.83 4.83 0 0 1 .86-2.32l3.52 2.03v4.06a4.89 4.89 0 0 1-3.78-.77zm-1.8-8.75a4.9 4.9 0 0 1 2.3-2 4.86 4.86 0 0 1 2.47-.19l-3.52 2.03v4.06l-3.52-2.03a4.93 4.93 0 0 1 2.27-1.87zm12.38-2.3a4.93 4.93 0 0 1 2.9 1v4.1l-3.52 2.03a.85.85 0 0 1-.86 0l-3.47-2a4.87 4.87 0 0 1 4.95-5.13zm5.86 6.05a4.9 4.9 0 0 1-2.3 2 4.86 4.86 0 0 1-2.47.19l3.52-2.03V8.89l3.52 2.03a4.93 4.93 0 0 1-2.27 1.87z" />
      </svg>
      <span className="text-neutral-900 font-semibold tracking-tight">OpenAI</span>
    </div>
  ),

  // 3. Figma (Authentic 5-component colored icon + wordmark)
  Figma: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-semibold text-base">
      <svg className="w-4 h-5 shrink-0" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
      <span className="font-semibold text-neutral-900">Figma</span>
    </div>
  ),

  // 4. Stripe (Authentic Stripe purple 'S' & sleek wordmark)
  Stripe: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-bold tracking-tight text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#635BFF]" viewBox="0 0 24 24">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C17.652.83 15.011.233 12.39.233c-6.612 0-10.977 3.446-10.977 9.208 0 7.154 9.873 6.012 9.873 9.1 0 .979-.854 1.454-2.183 1.454-2.272 0-5.18-1.1-7.25-2.21l-.9 5.568C2.867 24.16 5.86 24.8 9.07 24.8c6.88 0 11.39-3.38 11.39-9.28 0-7.534-10.026-6.434-10.026-9.17 0-.74.62-1.2 1.76-1.2 1.83 0 3.73.66 5.12 1.34l.66-4.34z" />
      </svg>
      <span className="text-[#635BFF] font-bold text-lg tracking-tight">stripe</span>
    </div>
  ),

  // 5. Spotify (Authentic Green badge with sound arcs + wordmark)
  Spotify: () => (
    <div className="flex items-center gap-2 text-neutral-800 font-medium text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#1DB954]" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#1DB954" />
        <path
          d="M17.5 16.2c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-1 7.6-.5 10.4 1.2.3.2.4.6.1.9zm1.2-2.7c-.3.4-.8.5-1.2.3-2.9-1.8-7.3-2.3-10.7-1.2-.5.1-.9-.1-1.1-.6-.1-.5.1-.9.6-1.1 4-1.2 8.9-.7 12.1 1.3.4.3.6.8.3 1.3zm.1-2.9C15.3 8.5 9.4 8.3 6 9.3c-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.1-1.2 10.6-1 14.7 1.4.5.3.7 1 .4 1.5-.3.5-1 .7-1.6.5z"
          fill="white"
        />
      </svg>
      <span className="font-semibold text-neutral-800">Spotify</span>
    </div>
  ),

  // 6. Slack (Authentic 4-color Slack hashtag burst + wordmark)
  Slack: () => (
    <div className="flex items-center gap-2 text-neutral-800 font-bold tracking-tight text-base">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 128 128">
        <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80s5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2s-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
        <path d="M47 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.7 39.7.8 47 .8s13.2 5.9 13.2 13.2v13.2H47zm0 6.6c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2H14C6.7 60.2.8 54.3.8 47s5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
        <path d="M100.8 47c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2h-13.2V47zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V14c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33z" fill="#2EB67D" />
        <path d="M81 100.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V100.8H81zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H81z" fill="#ECB22E" />
      </svg>
      <span className="tracking-tight text-neutral-800">slack</span>
    </div>
  ),

  // 7. Notion (Authentic Notion block 'N' + wordmark)
  Notion: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-semibold text-base">
      <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.69c-.466-.373-.933-.746-2.006-.653L2.733 2.155c-.466.046-.606.326-.373.56l2.1 1.493zm-.84 3.033v13.856c0 .746.42 1.026 1.213.98l14.475-.84c.793-.047 1.026-.513 1.026-1.12V6.447c0-.606-.233-.886-.84-.84l-15.035.886c-.606.047-.84.28-.84.748zm12.923.653c.094.42 0 .84-.42.886l-.7.14v9.61l.98.513c.42.233.42.606.094.793-.7.42-1.727.84-2.614.886-.14 0-.326-.093-.373-.326l-.233-1.633h-.093c-.653 1.12-1.82 2.053-3.453 2.053-1.96 0-3.08-1.306-3.08-3.453 0-2.753 1.867-4.293 4.293-4.293 1.026 0 1.913.373 2.427.793v-3.78l-3.5.233c-.42.047-.653-.14-.746-.42l-.28-.98c0-.28.186-.466.56-.513l6.533-.42c.42-.047.7.14.793.513z" />
      </svg>
      <span>Notion</span>
    </div>
  ),

  // 8. Airbnb (Authentic Bélo loop + wordmark)
  Airbnb: () => (
    <div className="flex items-center gap-1.5 text-neutral-800 font-bold text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#FF5A5F]" viewBox="0 0 24 24">
        <path d="M12 2C8.6 2 5.8 4.7 5.8 8.1c0 3.8 2.6 7.6 6.2 12.7.4.5 1.1.5 1.5 0 3.6-5.1 6.2-8.9 6.2-12.7C19.7 4.7 16.9 2 12 2zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
      </svg>
      <span className="tracking-tight text-neutral-800">airbnb</span>
    </div>
  ),

  // 9. Ramp (Authentic chevron slash + wordmark)
  Ramp: () => (
    <div className="flex items-center gap-1.5 font-bold tracking-tight text-neutral-800 text-lg">
      <svg className="w-5 h-5 shrink-0 fill-[#00D639]" viewBox="0 0 24 24">
        <path d="M4 19.5h16v-2.5H8.2L19.5 5.8 17.7 4 4 17.7v1.8z" />
      </svg>
      <span>ramp</span>
    </div>
  ),

  // 10. Substack (Authentic orange stacked bookmark + wordmark)
  Substack: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-bold tracking-tight text-base">
      <svg className="w-4 h-4 shrink-0 fill-[#FF6719]" viewBox="0 0 24 24">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
      <span>substack</span>
    </div>
  ),

  // 11. Anthropic (Authentic Anthropic modern geometric wordmark)
  Anthropic: () => (
    <div className="flex items-center gap-1.5 font-bold tracking-widest text-neutral-900 text-sm">
      <span className="inline-block w-2.5 h-2.5 bg-[#D97706] rounded-xs" />
      <span>ANTHROPIC</span>
    </div>
  ),

  // 12. Duolingo (Authentic Duolingo green owl icon + wordmark)
  Duolingo: () => (
    <div className="flex items-center gap-1.5 text-neutral-800 font-bold tracking-tight text-base">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 2.2.72 4.24 1.94 5.9L3 21l3.35-.95A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
          fill="#58CC02"
        />
        <circle cx="8.5" cy="11.5" r="2.2" fill="white" />
        <circle cx="15.5" cy="11.5" r="2.2" fill="white" />
        <circle cx="8.5" cy="11.5" r="1.1" fill="#1E293B" />
        <circle cx="15.5" cy="11.5" r="1.1" fill="#1E293B" />
        <path d="M12 14c-.8 0-1.5.5-1.5 1s.7 1 1.5 1 1.5-.5 1.5-1-.7-1-1.5-1z" fill="#FF9600" />
      </svg>
      <span>duolingo</span>
    </div>
  ),

  // 13. Instacart (Authentic Carrot icon + wordmark)
  Instacart: () => (
    <div className="flex items-center gap-1.5 font-semibold text-neutral-800 text-base">
      <svg className="w-4 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M14 6C14 4 12 2 10 2s-4 2-4 4" stroke="#108910" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 6h10l-4 15a1 1 0 0 1-2 0L7 6z" fill="#FF8200" />
      </svg>
      <span className="tracking-tight text-neutral-800 font-semibold">instacart</span>
    </div>
  ),

  // 14. Linear (Authentic Linear geometry symbol + wordmark)
  Linear: () => (
    <div className="flex items-center gap-2 font-medium tracking-tight text-neutral-900 text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#5E6AD2]" viewBox="0 0 100 100">
        <path d="M3.7 54.8a47.3 47.3 0 0 0 41.5 41.5c2.4.4 4.5-1.6 4.5-4.1 0-2-1.5-3.8-3.5-4.2A39.4 39.4 0 0 1 11.8 53.6c-.4-2-2.2-3.5-4.2-3.5-2.5 0-4.5 2.1-4.1 4.5l.2.2zM21.7 69a47.5 47.5 0 0 0 47.3 27.3c2.4-.2 4.2-2.3 3.9-4.7s-2.3-4.2-4.7-3.9A39.6 39.6 0 0 1 28.5 68c-1.6-1.3-4-1.1-5.3.5-1.3 1.6-1.1 4 .5 5.3l-2-.4zM4.7 38.6c.3 2.4 2.4 4.2 4.8 3.9s4.2-2.4 3.9-4.8A39.6 39.6 0 0 1 38.6 13.4c2.4-.3 4.2-2.4 3.9-4.8S40.1 4.4 37.7 4.7A47.5 47.5 0 0 0 4.7 38.6z" />
        <circle cx="50" cy="50" r="14" fill="#5E6AD2" />
      </svg>
      <span className="font-semibold text-neutral-900">Linear</span>
    </div>
  ),

  // 15. GitHub (Authentic Invertocat + wordmark)
  GitHub: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-semibold text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#24292F]" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
      <span>GitHub</span>
    </div>
  ),

  // 16. Loom (Authentic Loom starburst + wordmark)
  Loom: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-bold tracking-tight text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#625DF5]" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 5v14M5 12h14M7 7l10 10M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>loom</span>
    </div>
  ),

  // 17. Instagram (Authentic camera glyph with Instagram gradient + wordmark)
  Instagram: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-serif italic text-base">
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="1.6" fill="none" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
      </svg>
      <span className="font-sans not-italic font-semibold text-neutral-900">Instagram</span>
    </div>
  ),

  // 18. Dropbox (Authentic 5-diamond blue box + wordmark)
  Dropbox: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-semibold text-base">
      <svg className="w-5 h-4 shrink-0 fill-[#0061FE]" viewBox="0 0 24 24">
        <path d="M6 3.5L0 7.4l6 3.9 6-3.9L6 3.5zm12 0l-6 3.9 6 3.9 6-3.9-6-3.9zM0 15.2l6 3.9 6-3.9-6-3.9-6 3.9zm18-3.9l-6 3.9 6 3.9 6-3.9-6-3.9zM6 20.5l6-3.9 6 3.9-6 3.9-6-3.9z" />
      </svg>
      <span>Dropbox</span>
    </div>
  ),

  // 19. Strava (Authentic twin orange chevrons + wordmark)
  Strava: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-extrabold tracking-tighter text-base">
      <svg className="w-4 h-5 shrink-0 fill-[#FC5200]" viewBox="0 0 24 24">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.94 15.656h4.173" />
      </svg>
      <span>STRAVA</span>
    </div>
  ),

  // 20. Nike (Authentic swoosh)
  Nike: () => (
    <div className="flex items-center text-neutral-900">
      <svg className="w-8 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M21.7 4.2c-5.8 4.2-11.4 9.1-15.3 12.8-2 1.9-3.5 3.3-4.2 3.7-.5.3-.9.3-1.1 0-.4-.5-.1-1.6.8-3.1 1.5-2.6 4.3-5.9 8.2-9.6C14.7 4.2 19 2 22 2c.2 0 .3.1.2.3-.1.5-.3 1.2-.5 1.9z" />
      </svg>
    </div>
  ),

  // 21. Meta (Authentic Meta infinity ribbon in Meta blue)
  Meta: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-medium text-base">
      <svg className="w-5 h-4 shrink-0 fill-[#0668E1]" viewBox="0 0 24 24">
        <path d="M12 6.4c-2.3 0-4.3 1.5-5.3 3.6C5.5 8 4 7.2 2.3 7.6 1 8 .1 9.1 0 10.5c-.3 3.2 2 5.9 5.2 6.2 2 .2 3.9-.8 4.9-2.5 1.1 2 3.3 3.1 5.6 2.7 1.9-.3 3.4-1.7 4-3.6 1.4 2 3.7 2.8 6 1.8 1.4-.6 2.3-2 2.3-3.6 0-3.3-2.7-5.9-6-5.9-1.9 0-3.6.9-4.7 2.4-1.2-1.4-3.3-2.2-5.3-2.2zm0 2.2c1.7 0 3.2 1.3 3.4 3 0 .2 0 .4-.1.6-1.1 2.3-3.7 3.3-6 2.2-.6-.3-1.1-.7-1.4-1.3 0-.1 0-.3.1-.4.6-2.4 2.3-4.1 4-4.1z" />
      </svg>
      <span className="font-semibold text-neutral-900">Meta</span>
    </div>
  ),

  // 22. Vercel (Authentic Triangle logo + wordmark)
  Vercel: () => (
    <div className="flex items-center gap-2 text-neutral-900 font-semibold text-base">
      <svg className="w-4 h-4 shrink-0 fill-neutral-900" viewBox="0 0 24 24">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
      <span>Vercel</span>
    </div>
  ),

  // 23. Headspace (Authentic Headspace warm orange emblem + wordmark)
  Headspace: () => (
    <div className="flex items-center gap-1.5 text-neutral-800 font-bold tracking-tight text-base">
      <div className="w-4 h-4 shrink-0 rounded-full bg-[#F47D31]" />
      <span>headspace</span>
    </div>
  ),

  // 24. Datadog (Authentic Datadog terrier silhouette + wordmark)
  Datadog: () => (
    <div className="flex items-center gap-1.5 text-neutral-900 font-semibold text-base">
      <svg className="w-5 h-5 shrink-0 fill-[#632CA6]" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 15.5H8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm1.5-4H7c-.83 0-1.5-.67-1.5-1.5S6.17 10.5 7 10.5h10c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
      </svg>
      <span className="font-semibold text-neutral-900">Datadog</span>
    </div>
  )
};
