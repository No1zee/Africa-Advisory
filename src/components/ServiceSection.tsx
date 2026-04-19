"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Label, Body } from './Typography';

const SERVICES = [
  {
    index: 0,
    title: 'Project Finance',
    description: 'Structuring and arranging long-term financing for capital-intensive infrastructure projects across African markets.',
    sector: 'Infrastructure · Energy',
    proofPoint: 'Average ticket size $150M+',
  },
  {
    index: 1,
    title: 'Trade Finance',
    description: 'Specialist advice on cross-border trade finance facilities, supply chain financing, and commodity-backed instruments.',
    sector: 'Trade · Commodities',
    proofPoint: '12 regulated market access points',
  },
  {
    index: 2,
    title: 'Sovereign Debt Advisory',
    description: 'Expert counsel on national debt sustainability, multi-creditor negotiations (Paris & London Club), and fiscal restructuring frameworks for African sovereigns.',
    sector: 'Sovereign · G2G · DFI',
    proofPoint: 'Trusted advisor to 4+ Ministry of Finance offices',
  },
  {
    index: 3,
    title: 'Capital Markets',
    description: 'Lead-facilitation for international bond issuances, Sukuk structures, and local currency instruments for emerging African corporate champions.',
    sector: 'Bonds · Sukuk · Primary Markets',
    proofPoint: 'Dual-listed green bond precedent',
  },
  {
    index: 4,
    title: 'Strategic Advisory',
    description: 'C-suite and Ministerial-level insight on market entry, multi-jurisdictional risk mitigation, and high-impact transaction architecture.',
    sector: 'Executive · Ministerial',
    proofPoint: 'British Government Advisory Committee member',
  },
  {
    index: 5,
    title: 'Eastern Capital Corridors',
    description: 'Strategic facilitation bridging Asian institutional liquidity with large-scale African infrastructure and industrial project pipelines.',
    sector: 'China · India · GCC · Africa',
    proofPoint: 'Facilitated $850M+ in bilateral capital flow',
  },
];

export const ServiceSection = () => {
  return (
    <section id="services" className="relative py-28 lg:py-40 bg-[#F5F1EB]" data-nav-light="true">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')" }} />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Label className="text-[#00B4A6] tracking-[0.4em] text-[0.6rem] mb-4 block">
              Advisory Pillars
            </Label>
            <Display as="h2" className="text-[hsl(216_12%_10%)] text-4xl md:text-5xl lg:text-6xl leading-tight">
              Six Disciplines.<br />
              <span className="italic font-light text-[hsl(216_12%_35%)]">One Unified Platform.</span>
            </Display>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Body className="text-[hsl(216_12%_35%)] text-base leading-relaxed max-w-xl italic border-l border-[#00B4A6]/60 pl-6">
              Africa Advisory provides a multi-disciplinary bridge between global capital 
              and African opportunity. We deliver institutional-grade mandates where 
              traditional banking frameworks often fall short.
            </Body>
          </motion.div>
        </div>

        {/* 3×2 Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(216_12%_10%)]/10 border border-[hsl(216_12%_10%)]/10 shadow-2xl shadow-black/5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative bg-[#F5F1EB] p-8 lg:p-12 hover:bg-white transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Institutional index with pulse */}
              <div className="flex items-center justify-between mb-8">
                <motion.span 
                  whileHover={{ scale: 1.1, color: '#00B4A6' }}
                  className="text-[0.65rem] font-mono text-[#00B4A6]/60 border-b border-[#00B4A6]/20 pb-1 font-bold"
                >
                  {String(service.index + 1).padStart(2, '0')}
                </motion.span>
                <div className="w-1 h-1 rounded-full bg-[#00B4A6]/20 group-hover:bg-[#00B4A6] group-hover:scale-150 transition-all duration-500" />
              </div>

              {/* Sector Tag Reveal */}
              <div className="h-6 overflow-hidden mb-2">
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="text-[0.45rem] tracking-[0.3em] uppercase text-[#00B4A6] font-black"
                >
                  {service.sector}
                </motion.p>
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold text-[hsl(216_12%_10%)] mb-4 tracking-tight group-hover:text-[#00B4A6] transition-colors duration-400">
                {service.title}
              </h3>
              
              <p className="text-[hsl(216_12%_40%)] text-[0.85rem] leading-[1.8] mb-10 flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {service.description}
              </p>

              {/* Metric strip surfaced at bottom */}
              <div className="pt-6 border-t border-[hsl(216_12%_10%)]/5 flex items-center justify-between">
                <span className="text-[#00B4A6] text-[0.55rem] uppercase tracking-[0.25em] font-black block">
                  {service.proofPoint}
                </span>
                <span className="text-[0.7rem] text-[#00B4A6]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
              </div>

              {/* Hover teal corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-[#00B4A6]/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-[#00B4A6]/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
              </div>
              
              {/* Subtle bottom gradient glow */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#00B4A6]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
