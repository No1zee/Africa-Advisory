"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Label, Tabular } from './Typography';

const PARTNERS = [
  { name: 'BIAO', role: 'Strategic Partner' },
  { name: 'UBS', role: 'Global Banking' },
  { name: 'HSBC', role: 'Capital Markets' },
  { name: 'UK GOV', role: 'Trade Advisory' },
  { name: 'AMRO', role: 'Trade Finance' }
];

export const TrustStrip = () => {
  return (
    <div className="w-full bg-base-obsidian py-8 border-y border-white/5 relative overflow-hidden">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <Label className="text-jade tracking-[0.3em] uppercase text-[0.45rem] opacity-60">Our Heritage</Label>
          <div className="mt-2 h-[1px] w-8 bg-jade/40" />
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center group cursor-default blur-reveal"
            >
              <span className="font-display text-lg tracking-widest text-secondary-parchment group-hover:text-jade transition-colors">
                {partner.name}
              </span>
              <Label className="text-[0.4rem] opacity-40 uppercase tracking-tighter">{partner.role}</Label>
            </motion.div>
          ))}
        </div>

        <div className="items-center gap-4 border-l border-white/10 pl-8 hidden lg:flex">
          <div className="flex flex-col text-right">
            <span className="text-jade text-[0.55rem] font-mono tracking-widest uppercase">Regulatory Compliance</span>
            <Label className="text-[0.4rem] opacity-30 mt-1 uppercase">Governance & Compliance</Label>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse" />
        </div>
      </div>
      
      {/* Structural Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </div>
  );
};
