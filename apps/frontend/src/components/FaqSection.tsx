import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqItem } from '../types';

const FAQS: FaqItem[] = [
  {
    id: 'what-is-codeslot',
    question: 'What is CodeSlot?',
    answer: [
      'CodeSlot is a dedicated global platform for finding remote tech jobs from across the world.',
      'We curate high-impact roles strictly in software engineering, distributed systems, AI/ML, cloud architecture, and technical leadership.',
      'Every role is 100% remote with international hiring availability, eliminating arbitrary country boundaries.'
    ]
  },
  {
    id: 'who-uses-codeslot',
    question: 'Who uses CodeSlot?',
    answer: [
      'Software engineers, system architects, technical leads, and engineering teams from around the globe.',
      'Developers use CodeSlot to access high-signal, borderless tech careers without recruiter spam or geographic hiring walls.'
    ]
  },
  {
    id: 'are-all-jobs-remote-tech',
    question: 'Are all jobs on CodeSlot strictly remote and tech-related?',
    answer: [
      'Yes, 100%. We have zero non-tech listings and zero hybrid or on-site requirements. Every single role is designed for software developers, AI practitioners, and engineering talent.',
      'Whether you are based in North America, Latin America, Europe, Asia, Africa, or Oceania, CodeSlot connects you to teams hiring worldwide.'
    ]
  }
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['what-is-codeslot']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 md:py-28 border-t border-black/[0.04]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left Title */}
          <div className="md:col-span-5 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111215] font-normal tracking-tight leading-snug">
              Frequently <br />
              asked questions
            </h2>
          </div>

          {/* Right Accordion List */}
          <div className="md:col-span-7 divide-y divide-neutral-200/70">
            {FAQS.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div key={faq.id} className="py-5 sm:py-6 first:pt-0">
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-medium text-neutral-900 group-hover:text-black transition-colors">
                      {faq.question}
                    </span>
                    <span className="p-1 text-neutral-400 group-hover:text-neutral-700 transition-colors ml-4 shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[1.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[1.5]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3.5 space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                          {Array.isArray(faq.answer) ? (
                            faq.answer.map((p, idx) => <p key={idx}>{p}</p>)
                          ) : (
                            <p>{faq.answer}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
