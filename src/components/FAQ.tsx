"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Display, Label, Body } from './Typography';

const FAQ_ITEMS = [
  {
    question: 'What types of mandates does Africa Advisory accept?',
    answer: 'We focus exclusively on African capital markets, project finance, trade finance, debt restructuring, and long-term sovereign advisory assignments. Minimum engagement thresholds typically start at $50M, aligned with the institutional scale of our advisory practice.',
    category: 'Scope',
  },
  {
    question: 'How does your firm handle conflicts of interest?',
    answer: 'We operate strict conflict-of-interest protocols aligned with international institutional standards. All potential conflicts are disclosed upfront. Our independence is our core asset, and we maintain a rigorous barrier between our advisory mandates and any third-party liquidity providers.',
    category: 'Governance',
  },
  {
    question: 'What is your primary geographic focus?',
    answer: 'Our core focus encompasses the 54 nations of the African continent, with exceptional depth across the SADC, ECOWAS, and East African corridors. We maintain strategic connectivity with both regional capitals and global financial hubs including London and Beijing.',
    category: 'Execution',
  },
  {
    question: 'Do you work with DFIs and multilateral institutions?',
    answer: 'Yes. A significant portion of our mandates involve coordination with Development Finance Institutions (DFIs), export credit agencies, and multilateral development banks. We are experienced in structuring multi-tranche facilities where concessional and commercial capital are blended.',
    category: 'Partners',
  },
  {
    question: 'What makes Africa Advisory different from international investment banks?',
    answer: 'We are a specialist boutique, not a balance-sheet lender. This ensure our advice is truly independent and impartial. We lack the proprietary product conflicts often found in larger institutions, allowing our sole focus to remain on the optimal outcome for the mandate.',
    category: 'Differentiation',
  },
  {
    question: 'Are non-disclosure agreements standard practice?',
    answer: 'Institutional confidentiality is the foundation of our work. Formal NDAs are standard for all substantive advisory engagements. Initial exploratory discussions are likewise treated with strict professional discretion by default.',
    category: 'Governance',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="intelligence" className="relative py-28 lg:py-40 bg-[hsl(216_12%_8%)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <Label className="text-[#00B4A6] tracking-[0.4em] text-[0.6rem] mb-6 block font-bold">
              Institutional Intelligence
            </Label>
            <Display as="h2" className="text-white text-4xl md:text-5xl leading-tight mb-8">
              Governance &<br />
              <span className="italic font-light text-white/60">Execution Frameworks.</span>
            </Display>
            <Body className="text-[#8A8A8A] text-sm leading-relaxed mb-10">
              A synthesis of our protocols regarding 
              continental mandate execution and institutional connectivity.
            </Body>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[#00B4A6] text-[0.65rem] uppercase tracking-[0.25em] font-bold group"
            >
              Consult an Advisor
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.07 }}
              className="flex flex-col divide-y divide-white/[0.06]"
            >
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group transition-all duration-300"
                    aria-expanded={openIndex === i}
                  >
                    <div className="flex flex-col">
                      <span className="text-[0.48rem] tracking-[0.3em] text-[#00B4A6]/50 font-bold mb-2 block uppercase">
                        {item.category}
                      </span>
                      <span className={`font-display text-xl md:text-2xl leading-none transition-colors duration-300 ${
                        openIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}>
                        {item.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 w-6 h-6 flex items-center justify-center text-[#00B4A6]/60 group-hover:text-[#00B4A6] transition-colors mt-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          <p className="text-[#8A8A8A] text-sm leading-loose border-l-2 border-[#00B4A6]/30 pl-6 py-2">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
