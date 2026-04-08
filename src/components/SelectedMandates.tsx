"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Label, Tabular, Body } from './Typography';
import { VARIANTS } from './Motion';

const MANDATES = [
  {
    size: "$1.2B",
    sector: "Energy & Infrastructure",
    geography: "West Africa",
    outcome: "Sovereign debt restructuring and emergency capital injection for state utility.",
    year: "2024"
  },
  {
    size: "$820M",
    sector: "Transport & Logistics",
    geography: "East Africa",
    outcome: "Financial close on Public-Private Partnership for regional rail corridor.",
    year: "2023"
  },
  {
    size: "$450M",
    sector: "Commodities & Trade",
    geography: "Multi-Regional",
    outcome: "Structured cross-border trade finance facility for agricultural exports.",
    year: "2024"
  },
  {
    size: "$150M",
    sector: "ICT & Digital",
    geography: "Pan-African",
    outcome: "Debt financing for rapid deployment of high-speed telecommunications infrastructure.",
    year: "2023"
  }
];

export const SelectedMandates = () => {
  return (
    <section id="mandates" className="section bg-background overflow-hidden relative py-32 lg:py-48">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Label className="text-jade mb-4 tracking-[0.3em] uppercase">Selected Mandates</Label>
              <Display as="h2" className="text-4xl md:text-6xl mb-6">
                Institutional Proof. <br />
                <span className="italic text-foreground/40">Verifiable Outcomes.</span>
              </Display>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:text-right"
          >
            <Body className="text-sm text-foreground/40 max-w-sm">
              Directorial summaries of recent strategic advisory and capital facilitation mandates across the continent.
              <span className="block mt-4 text-[0.6rem] opacity-50 italic">
                Representative transactions shown in summary form due to confidentiality constraints.
              </span>
            </Body>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/5 border border-foreground/5">
          {MANDATES.map((mandate, i) => (
            <motion.div 
              key={i}
              className="bg-background p-8 flex flex-col justify-between group hover:bg-surface-dark transition-all duration-500"
              variants={VARIANTS.RISE_REVEAL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <Tabular className="text-3xl text-gold mb-6 group-hover:scale-110 transition-transform origin-left">
                  {mandate.size}
                </Tabular>
                <div className="flex flex-col gap-1 mb-10">
                  <Label className="text-[0.6rem] text-jade tracking-widest uppercase mb-1">{mandate.sector}</Label>
                  <Label className="text-[0.5rem] opacity-40 uppercase tracking-widest">{mandate.geography}</Label>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-body font-light">
                  {mandate.outcome}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>
        
        {/* Decorative Grid Trace */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="grid grid-cols-4 h-full w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-r border-foreground h-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
