"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Display, Label } from './Typography';

const MANDATES = [
  {
    tag: 'Energy & Infrastructure',
    figure: '$1.2B',
    figureEnd: 1.2,
    figureSuffix: 'B',
    format: 'project finance arranged',
    outcome: 'Power generation infrastructure financing across francophone West Africa.',
    geography: 'West Africa',
    year: '2024',
    proofPoint: 'Multi-tranche sovereign-backed facility — 4 DFI co-lenders',
  },
  {
    tag: 'Trade Finance',
    figure: '$450M',
    figureEnd: 450,
    figureSuffix: 'M',
    format: 'structured capital',
    outcome: 'Cross-border commodity trade financing facility bridging SADC and ECOWAS regions.',
    geography: 'SADC · ECOWAS',
    year: '2023',
    proofPoint: 'Executed in under 90 days from mandate award to close',
  },
  {
    tag: 'Sovereign Debt',
    figure: '$780M',
    figureEnd: 780,
    figureSuffix: 'M',
    format: 'debt restructured',
    outcome: 'Bilateral creditor debt resolution and restructuring advisory for East African sovereign.',
    geography: 'East Africa',
    year: '2023',
    proofPoint: 'Coordinated across London and Paris Club frameworks',
  },
  {
    tag: 'Capital Markets',
    figure: '$320M',
    figureEnd: 320,
    figureSuffix: 'M',
    format: 'bond programme',
    outcome: 'Green bond origination and placement advisory for a pan-African development institution.',
    geography: 'Pan-Africa',
    year: '2024',
    proofPoint: 'Listed simultaneously on the JSE and Luxembourg Stock Exchange',
  },
];

const CONTAINER_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

// Animated figure — counts up once on viewport entry
function AnimatedFigure({ end, suffix, isDecimal }: { end: number; suffix: string; isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1400;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = end * eased;
      setVal(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, isDecimal]);

  return (
    <span ref={ref}>
      ${isDecimal ? val.toFixed(1) : val}{suffix}
    </span>
  );
}

export const SelectedMandates = () => {
  return (
    <section id="mandates" className="relative py-28 lg:py-40 bg-[hsl(216_12%_8%)] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00B4A6]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="container mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Label className="text-[#00B4A6] tracking-[0.4em] text-[0.6rem] mb-4 block text-left">
              Selected Mandates
            </Label>
            <Display as="h2" className="text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-xl text-left font-medium">
              Significant Operations<br />
              <span className="italic font-light text-white/40 font-serif">Across the Continent</span>
            </Display>
          </motion.div>

          <div className="flex flex-col items-start lg:items-end gap-6 h-full">
              <motion.a
                href="#contact"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-[#00B4A6] text-[0.7rem] uppercase tracking-[0.25em] font-bold group shrink-0"
              >
                Request Mandate Inventory
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.a>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['All', 'Energy', 'Sovereign', 'Trade', 'Capital Markets'].map((filter) => (
                  <span 
                    key={filter} 
                    className={`px-3 py-1 text-[0.55rem] uppercase tracking-widest border border-white/10 text-white/40 cursor-default hover:border-[#00B4A6]/40 hover:text-white/80 transition-all duration-300 ${filter === 'All' ? 'border-[#00B4A6]/40 text-white' : ''}`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
          </div>
        </div>
      </div>

      {/* 2×2 Card Grid */}
      <div className="container">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]"
        >
          {MANDATES.map((mandate, i) => (
            <motion.div
              key={i}
              variants={CARD_VARIANTS}
              className="mandate-scan group relative flex flex-col p-8 lg:p-12 bg-[hsl(216_12%_8%)] hover:bg-white/[0.01] transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Detailed Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/[0.05] pb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[0.52rem] tracking-[0.3em] text-[#00B4A6] font-bold">
                    {mandate.tag}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[0.52rem] tracking-[0.2em] text-white/40">
                    {mandate.geography}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-widest border border-[#00B4A6]/20 text-[#00B4A6]/60 px-2 py-0.5 rounded-full bg-[#00B4A6]/[0.02]">
                    Success
                  </span>
                  <span className="text-[0.52rem] tracking-[0.2em] text-white/30 font-mono">
                    {mandate.year}
                  </span>
                </div>
              </div>

              {/* Animated Figure */}
              <div className="mb-6">
                <p className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-white leading-[0.85]">
                  <AnimatedFigure
                    end={mandate.figureEnd}
                    suffix={mandate.figureSuffix}
                    isDecimal={mandate.figureEnd < 10}
                  />
                  <span className="text-[#00B4A6]/80 text-[0.58rem] tracking-[0.3em] ml-4 font-semibold align-middle">
                    — {mandate.format}
                  </span>
                </p>
              </div>

              {/* Outcome */}
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                {mandate.outcome}
              </p>

              {/* Proof Point */}
              <div className="mt-auto pt-6 border-t border-white/[0.05]">
                 <ul className="flex flex-col gap-2">
                   <li className="flex items-start gap-3">
                     <span className="text-[0.68rem] text-white/40 leading-relaxed tracking-widest font-mono">
                       {mandate.proofPoint}
                     </span>
                   </li>
                 </ul>
              </div>

              {/* Hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B4A6]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom spacer accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="container mt-20 h-px bg-gradient-to-r from-[#00B4A6]/30 via-white/5 to-transparent"
      />
    </section>
  );
};
