import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Share2, Sparkles, UserPlus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabMode } from '../types';

interface HowItWorksProps {
  onRequestAccess: () => void;
}

interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
  width: number;
  height: number;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRequestAccess }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('developers');
  const [suggestedFit, setSuggestedFit] = useState(false);
  const [sharedRenee, setSharedRenee] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2aRef = useRef<HTMLDivElement>(null);
  const card2bRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<LineCoords | null>(null);

  const updateCoords = useCallback(() => {
    if (
      !containerRef.current ||
      !card1Ref.current ||
      !card2aRef.current ||
      !card2bRef.current ||
      !card3Ref.current
    ) {
      return;
    }

    const cont = containerRef.current.getBoundingClientRect();
    const c1 = card1Ref.current.getBoundingClientRect();
    const c2a = card2aRef.current.getBoundingClientRect();
    const c2b = card2bRef.current.getBoundingClientRect();
    const c3 = card3Ref.current.getBoundingClientRect();

    if (cont.width === 0 || cont.height === 0) return;

    // Line 1: connects bottom edge of Card 1 to top edge of Card 2a
    const x1 = c1.left + c1.width * 0.5 - cont.left;
    const y1 = c1.bottom - cont.top;
    const x2 = c2a.left + c2a.width * 0.5 - cont.left;
    const y2 = c2a.top - cont.top;

    // Line 2: connects bottom edge of Card 2b to top edge of Card 3
    const x3 = c2b.left + c2b.width * 0.5 - cont.left;
    const y3 = c2b.bottom - cont.top;
    const x4 = c3.left + c3.width * 0.5 - cont.left;
    const y4 = c3.top - cont.top;

    setCoords({
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      x4,
      y4,
      width: cont.width,
      height: cont.height,
    });
  }, []);

  useEffect(() => {
    updateCoords();

    const t1 = setTimeout(updateCoords, 100);
    const t2 = setTimeout(updateCoords, 400);
    const t3 = setTimeout(updateCoords, 1000);

    const ro = new ResizeObserver(() => {
      updateCoords();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    if (card1Ref.current) ro.observe(card1Ref.current);
    if (card2aRef.current) ro.observe(card2aRef.current);
    if (card2bRef.current) ro.observe(card2bRef.current);
    if (card3Ref.current) ro.observe(card3Ref.current);

    window.addEventListener('resize', updateCoords);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ro.disconnect();
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords, activeTab, suggestedFit, sharedRenee]);

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] text-[#111215] font-normal tracking-tight">
            How CodeSlot works
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#525560] leading-relaxed">
            CodeSlot connects engineers and technical builders to worldwide remote tech jobs. Built for developers seeking roles, tech teams hiring globally, and peers connecting talent.
          </p>
        </div>

        {/* Journey Timeline */}
        <div ref={containerRef} className="mt-20 relative">
          {/* Dynamic SVG Connecting Rays (Exact Liftoff Mechanism) */}
          {coords && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              viewBox={`0 0 ${coords.width} ${coords.height}`}
              fill="none"
            >
              <defs>
                {/* Gradient for Ray 1: Card 1 (blue) to Card 2a (peach) */}
                <linearGradient id="liftoff-ray-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="35%" stopColor="#bfdbfe" />
                  <stop offset="70%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>

                {/* Gradient for Ray 2: Card 2b (lavender) to Card 3 (orange) */}
                <linearGradient id="liftoff-ray-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ddd6fe" />
                  <stop offset="35%" stopColor="#fbcfe8" />
                  <stop offset="70%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>

                <filter id="ray-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Connecting Ray 1: Card 1 to Card 2a */}
              {coords.y2 > coords.y1 && (
                <g filter="url(#ray-shadow)">
                  <path
                    d={`M ${coords.x1} ${coords.y1} C ${coords.x1} ${
                      coords.y1 + (coords.y2 - coords.y1) * 0.55
                    }, ${coords.x2} ${coords.y2 - (coords.y2 - coords.y1) * 0.55}, ${
                      coords.x2
                    } ${coords.y2}`}
                    stroke="url(#liftoff-ray-1)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Anchor Dot on Card 1 */}
                  <circle
                    cx={coords.x1}
                    cy={coords.y1}
                    r="4.5"
                    fill="#93c5fd"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Anchor Dot on Card 2a */}
                  <circle
                    cx={coords.x2}
                    cy={coords.y2}
                    r="4.5"
                    fill="#fdba74"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Connecting Ray 2: Card 2b to Card 3 */}
              {coords.y4 > coords.y3 && (
                <g filter="url(#ray-shadow)">
                  <path
                    d={`M ${coords.x3} ${coords.y3} C ${coords.x3} ${
                      coords.y3 + (coords.y4 - coords.y3) * 0.55
                    }, ${coords.x4} ${coords.y4 - (coords.y4 - coords.y3) * 0.55}, ${
                      coords.x4
                    } ${coords.y4}`}
                    stroke="url(#liftoff-ray-2)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Anchor Dot on Card 2b */}
                  <circle
                    cx={coords.x3}
                    cy={coords.y3}
                    r="4.5"
                    fill="#c084fc"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Anchor Dot on Card 3 */}
                  <circle
                    cx={coords.x4}
                    cy={coords.y4}
                    r="4.5"
                    fill="#fb923c"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </svg>
          )}

          <div className="space-y-24 md:space-y-32 relative z-10">
            {/* ---------------- STEP 1 ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left Visual Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={updateCoords}
                className="order-2 md:order-1"
              >
                {/* Gradient wrapper matching screenshot (sunset fuchsia to warm peach) */}
                <div ref={card1Ref} className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#f43f5e] via-[#fb7185] to-[#fed7aa] shadow-lg">
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                    {/* Deep In Section */}
                    <div className="text-xs font-semibold text-neutral-800 mb-2.5">
                      I'm specialized in:
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-medium border border-neutral-200/60">
                        Distributed Systems
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium border border-blue-200/60">
                        Rust & Go
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[11px] font-medium border border-purple-200/60">
                        AI & LLM Infra
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[11px] font-medium">
                        + 5
                      </span>
                    </div>

                    {/* Private Network section */}
                    <div className="text-xs font-semibold text-neutral-800 mb-3">
                      My remote preferences
                    </div>

                    <div className="space-y-3">
                      {/* Backend Hub */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-[#625df5] flex items-center justify-center text-white text-[10px] font-bold">
                            B
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-800">Backend & Cloud Infra</div>
                            <div className="text-[10px] text-neutral-500">100% Worldwide Remote</div>
                          </div>
                        </div>
                        {/* Avatars */}
                        <div className="flex -space-x-1.5 overflow-hidden">
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80"
                            alt="avatar"
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80"
                            alt="avatar"
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80"
                            alt="avatar"
                          />
                        </div>
                      </div>

                      {/* AI Systems */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-[#0061FE] flex items-center justify-center text-white text-[10px] font-bold">
                            AI
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-neutral-800">Machine Learning & Systems</div>
                            <div className="text-[10px] text-neutral-500">Global Tech Hub</div>
                          </div>
                        </div>
                        {/* Avatars */}
                        <div className="flex -space-x-1.5 overflow-hidden">
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80"
                            alt="avatar"
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80&h=80"
                            alt="avatar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content */}
              <div className="order-1 md:order-2 md:pl-6 text-left">
                <div className="w-8 h-8 rounded-full border border-neutral-300 text-neutral-700 flex items-center justify-center text-xs font-serif mb-4">
                  1
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111215] font-normal tracking-tight">
                  Set your tech stack <br className="hidden sm:inline" />
                  and remote preferences.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#525560] leading-relaxed max-w-md">
                  Define your core engineering languages, system expertise, and desired global time-zone overlap
                </p>
              </div>
            </div>

            {/* ---------------- STEP 2 ---------------- */}
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                {/* Left Content */}
                <div className="text-left md:pr-6">
                  <div className="w-8 h-8 rounded-full border border-neutral-300 text-neutral-700 flex items-center justify-center text-xs font-serif mb-4">
                    2
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111215] font-normal tracking-tight">
                    Receive verified tech roles <br className="hidden sm:inline" />
                    from engineering teams <br className="hidden sm:inline" />
                    and from CodeSlot's network.
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#525560] leading-relaxed max-w-md">
                    Explore high-signal remote opportunities matched directly to your tech stack and experience
                  </p>
                </div>

                {/* Right Visual Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onAnimationComplete={updateCoords}
                >
                  <div ref={card2aRef} className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#fb923c] via-[#fed7aa] to-[#93c5fd] shadow-lg">
                    <div className="space-y-2">
                      {/* CodeSlot shared with you */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[10px] font-semibold text-neutral-700 shadow-xs mb-1">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        CodeSlot <span className="font-normal text-neutral-500">verified worldwide</span>
                      </div>

                      {/* Main card */}
                      <div className="bg-white rounded-2xl p-5 shadow-sm">
                        {/* Jamie Lewis shared */}
                        <div className="flex items-center gap-2 text-xs text-neutral-500 pb-3 border-b border-neutral-100">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64&h=64"
                            alt="Jamie"
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span><strong>Jamie Lewis (Staff Eng)</strong> shared with you</span>
                        </div>

                        {/* Amber is hiring */}
                        <div className="mt-3.5">
                          <div className="flex items-center gap-2 mb-1.5">
                            <img
                              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=64&h=64"
                              alt="Elena"
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-[11px] text-neutral-600 font-medium"><strong>Elena</strong> is hiring for</span>
                          </div>
                          <div className="font-serif text-lg font-semibold text-neutral-900 leading-snug">
                            Staff Distributed Systems Eng <br />
                            <span className="font-sans font-normal text-xs text-neutral-500">at</span> AI Infrastructure Labs
                          </div>
                        </div>

                        {/* Interactive Suggest fit button */}
                        <div className="mt-4 pt-3 border-t border-neutral-100">
                          <button
                            id="suggest-potential-fit-btn"
                            onClick={() => setSuggestedFit(!suggestedFit)}
                            className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-800 transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {suggestedFit ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="font-semibold text-emerald-700">Application submitted!</span>
                                </>
                              ) : (
                                <>
                                  <UserPlus className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>I'm interested in this role</span>
                                </>
                              )}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-medium">
                              Suggest an engineer →
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sub-step divider with "OR" */}
              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200/60" />
                </div>
                <div className="relative px-4 bg-[#fbfaf7] text-[11px] font-medium text-neutral-400 uppercase tracking-widest">
                  OR
                </div>
              </div>

              {/* Sub-step: Share recommended people with your network */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                {/* Left Content */}
                <div className="text-left md:pr-6">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111215] font-normal tracking-tight">
                    Share vetted remote roles <br className="hidden sm:inline" />
                    with fellow developers.
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#525560] leading-relaxed max-w-md">
                    Discreetly share high-paying remote roles with peers and help fellow developers land world-class engineering positions
                  </p>
                </div>

                {/* Right Visual Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onAnimationComplete={updateCoords}
                >
                  <div ref={card2bRef} className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#ddd6fe] shadow-lg">
                    <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=128&h=128"
                        alt="Renée Bennett"
                        className="w-14 h-14 rounded-full object-cover mx-auto ring-4 ring-purple-50 shadow-xs mb-2.5"
                      />
                      <h4 className="text-sm font-semibold text-neutral-900">
                        Renée Bennett
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Principal Systems Architect
                      </p>

                      <div className="mt-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-left">
                        <div className="text-[10px] text-neutral-500 mb-0.5">Context from you:</div>
                        <p className="text-xs text-neutral-700 italic">
                          "Renée is an exceptional distributed systems and cloud architect..."
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          id="share-renee-btn"
                          onClick={() => setSharedRenee(!sharedRenee)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            sharedRenee
                              ? 'bg-purple-900 text-white shadow-xs'
                              : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/70'
                          }`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{sharedRenee ? 'Shared with 7 engineering teams ✓' : 'You shared Renée with 6 engineering teams'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ---------------- STEP 3 ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left Visual Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={updateCoords}
                className="order-2 md:order-1"
              >
                <div ref={card3Ref} className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#fb923c] via-[#f472b6] to-[#c084fc] shadow-lg">
                  <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center gap-2 text-xs text-neutral-600 pb-3 border-b border-neutral-100">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>You connected with <strong>Elena (VP of Eng)</strong></span>
                    </div>

                    {/* Avatars */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=96&h=96"
                        alt="Michelle"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=96&h=96"
                        alt="Elena"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-100"
                      />
                    </div>

                    <div className="text-center mt-2.5">
                      <div className="text-xs font-semibold text-neutral-800">
                        Interview request confirmed 🚀
                      </div>
                    </div>

                    {/* Speech bubble */}
                    <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-left">
                      <div className="text-[10px] text-amber-800/80 font-medium mb-1">
                        Elena said:
                      </div>
                      <p className="text-xs text-neutral-800 font-medium leading-relaxed">
                        "Your distributed systems track record is an exact fit for our worldwide remote engineering team!"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content */}
              <div className="order-1 md:order-2 md:pl-6 text-left">
                <div className="w-8 h-8 rounded-full border border-neutral-300 text-neutral-700 flex items-center justify-center text-xs font-serif mb-4">
                  3
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111215] font-normal tracking-tight">
                  Land high-impact tech jobs <br className="hidden sm:inline" />
                  and build your career <br className="hidden sm:inline" />
                  from anywhere in the world.
                </h3>
                <div className="mt-6">
                  <button
                    id="step3-request-access-btn"
                    onClick={onRequestAccess}
                    className="px-6 py-2.5 rounded-full bg-[#111215] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium tracking-tight shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Find remote jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
