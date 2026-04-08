"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Body, Label, Tabular } from './Typography';

export const ContactCTA = () => {
  return (
    <section id="contact" className="section bg-base-obsidian text-secondary-parchment py-32 lg:py-48 border-t border-foreground/5 relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-accent/40 fill-none" preserveAspectRatio="xMidYMid slice">
          <path d="M0,500 L1000,500" strokeWidth="0.5" />
          <path d="M500,0 L500,1000" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="1.5" className="fill-accent" />
        </svg>
      </div>

      <div className="container relative z-10 editorial-grid">
        <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex flex-col items-center text-center">
          <Label className="text-gold mb-8 uppercase tracking-[0.3em] font-medium">Mandate Inquiry</Label>
          <Display as="h2" className="text-5xl md:text-7xl mb-6">
            Request Strategic <span className="italic font-light">Review.</span>
          </Display>
          <Body className="text-sm opacity-40 mb-12 max-w-lg mx-auto">
            Relevant inquiries are reviewed directly by the advisory team. Please provide a brief context to initiate the process.
          </Body>
          
          <form className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
            <div className="flex flex-col gap-2">
              <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest pl-1">Full Name / Title</Label>
              <input type="text" className="bg-white/5 border border-white/10 p-4 font-body text-sm focus:border-jade outline-none transition-colors" placeholder="e.g. Director of Finance" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest pl-1">Organization</Label>
              <input type="text" className="bg-white/5 border border-white/10 p-4 font-body text-sm focus:border-jade outline-none transition-colors" placeholder="Institutional or Sovereign entity" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest pl-1">Mandate Type</Label>
              <select id="mandate-type" aria-label="Select Mandate Type" className="bg-white/5 border border-white/10 p-4 font-body text-sm focus:border-jade outline-none transition-colors appearance-none">
                <option>Project Finance</option>
                <option>Trade Finance</option>
                <option>Debt Resolution</option>
                <option>Market Execution</option>
                <option>Other Advisory</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest pl-1">Target Funding Size</Label>
              <input type="text" className="bg-white/5 border border-white/10 p-4 font-body text-sm focus:border-jade outline-none transition-colors" placeholder="e.g. $50M - $500M+" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest pl-1">Brief Context</Label>
              <textarea className="bg-white/5 border border-white/10 p-4 font-body text-sm focus:border-jade outline-none transition-colors h-32" placeholder="Brief summary of the requirement..." />
            </div>
            
            <div className="md:col-span-2 flex flex-col items-center mt-8">
              <button 
                type="submit"
                className="group relative px-20 py-6 bg-jade text-secondary-parchment font-body text-[0.7rem] uppercase tracking-[0.4em] transition-all hover:bg-gold hover:text-base-obsidian"
              >
                SUBMIT REQUEST
                <div className="absolute -inset-2 border border-jade/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
              </button>
              <p className="mt-8 text-[0.5rem] opacity-20 uppercase tracking-widest">
                Confidentiality Guaranteed | High-Intent Institutional Inquiries Only
              </p>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full border-t border-white/5 pt-16 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Label className="text-jade mb-4 uppercase tracking-widest text-[0.55rem]">Global Headquarters</Label>
              <Body className="leading-relaxed text-[0.7rem]">
                Regent Hill Office Park, 68 Leslie Rd, Sandton, 2062
              </Body>
              <Tabular className="text-jade mt-4 text-[0.7rem]">advisory@africadvise.com</Tabular>
            </div>
            
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <Label className="text-jade mb-4 uppercase tracking-widest text-[0.55rem]">Priority Access</Label>
              <div className="space-y-1">
                <p className="text-[0.65rem] font-display">B. Jewels | +27 83 326 1070</p>
                <p className="text-[0.65rem] font-display">E. Meda | +27 72 581 7097</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
