import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'hire'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [intent, setIntent] = useState<'hire' | 'connect' | 'job'>(defaultRole === 'hire' ? 'hire' : 'connect');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setLinkedin('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#fcfaf7] border border-neutral-200/80 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Subtle glow accent inside modal */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-pink-400/10 rounded-full blur-2xl pointer-events-none" />

            <button
              id="close-access-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-logo text-xs uppercase tracking-tight font-extrabold text-neutral-950">CODESLOT</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-800 border border-amber-200/50">
                    <Sparkles className="w-3 h-3" /> Worldwide Remote Beta
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-2">
                  Request access to CodeSlot
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  Join software engineers, tech leaders, and builders discovering worldwide remote technology jobs.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      What describes you best?
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setIntent('hire')}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                          intent === 'hire'
                            ? 'bg-neutral-900 border-neutral-900 text-white font-medium shadow-xs'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        Hiring tech
                      </button>
                      <button
                        type="button"
                        onClick={() => setIntent('connect')}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                          intent === 'connect'
                            ? 'bg-neutral-900 border-neutral-900 text-white font-medium shadow-xs'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        Sharing roles
                      </button>
                      <button
                        type="button"
                        onClick={() => setIntent('job')}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                          intent === 'job'
                            ? 'bg-neutral-900 border-neutral-900 text-white font-medium shadow-xs'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        Finding jobs
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Tech Stack or Role
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Staff Backend / Rust & Go"
                        className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all text-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        GitHub or LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="github.com/username"
                        className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all text-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      id="submit-request-access-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-medium transition-all shadow-md active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                    >
                      {loading ? (
                        <span>Submitting request...</span>
                      ) : (
                        <>
                          <span>Request private invite</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-2.5">
                      CodeSlot respects your privacy. 100% remote tech-only, zero spam.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-neutral-900 mb-2">
                  You're on the list!
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto mb-6">
                  Thank you for applying{name ? `, ${name}` : ''}. We review applications in rolling batches and will send your private invite to <strong>{email}</strong>.
                </p>
                <button
                  onClick={handleReset}
                  className="py-2.5 px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
