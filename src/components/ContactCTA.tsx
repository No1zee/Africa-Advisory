"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Body, Label, Tabular } from './Typography';

export const ContactCTA = () => {
  return (
    <section id="contact" className="section bg-base-obsidian text-secondary-parchment py-32 lg:py-64 border-t border-foreground/5 relative overflow-hidden">
      {/* Dynamic Background Noise/Graphic */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('/assets/hero.png')] bg-cover bg-center brightness-[2]" />
      </div>

      <div className="container relative z-10 editorial-grid">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 flex flex-col items-center">
          
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Label className="text-gold mb-6 uppercase tracking-[0.4em] font-medium block">NEED ADVICE?</Label>
              <Display as="h2" className="text-5xl md:text-8xl mb-8 leading-[0.9] tracking-tighter">
                Get in <span className="italic font-light text-secondary-parchment/60">Touch.</span>
              </Display>
              <Body className="text-base md:text-xl opacity-50 max-w-xl mx-auto leading-relaxed italic border-l border-gold/20 pl-6">
                Contact us to discuss how Africa Advisory can assist with your trade, investment, or business facilitation needs across Africa.
              </Body>
            </motion.div>
          </div>
          
          <motion.form 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-24"
          >
            {[
              { label: "Full Name / Title", placeholder: "e.g. Director of Finance", type: "text" },
              { label: "Organization", placeholder: "Institutional or Sovereign entity", type: "text" },
              { label: "Mandate Type", type: "select", options: ["Project Finance", "Trade Finance", "Debt Resolution", "Market Execution", "Other Advisory"] },
              { label: "Target Funding Size", placeholder: "e.g. $50M - $500M+", type: "text" }
            ].map((field, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex flex-col gap-3 group"
              >
                <Label className="text-[0.55rem] opacity-30 uppercase tracking-[0.3em] font-bold group-focus-within:text-jade group-focus-within:opacity-100 transition-all">
                  {field.label}
                </Label>
                <div className="relative">
                  {field.type === "select" ? (
                    <select className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-body text-sm md:text-base focus:border-jade outline-none transition-all appearance-none cursor-pointer hover:bg-white/[0.05]">
                      {field.options?.map(opt => <option key={opt} className="bg-base-obsidian text-secondary-parchment">{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={field.type} 
                      className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-body text-sm md:text-base focus:border-jade outline-none transition-all placeholder:opacity-20 hover:bg-white/[0.05]" 
                      placeholder={field.placeholder} 
                    />
                  )}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-jade group-focus-within:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            ))}

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col gap-3 md:col-span-2 group"
            >
              <Label className="text-[0.55rem] opacity-30 uppercase tracking-[0.3em] font-bold group-focus-within:text-jade group-focus-within:opacity-100 transition-all">
                Brief Directional Context
              </Label>
              <div className="relative">
                <textarea 
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 font-body text-sm md:text-base focus:border-jade outline-none transition-all h-40 resize-none placeholder:opacity-20 hover:bg-white/[0.05]" 
                  placeholder="Summary of institutional requirements..." 
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-jade group-focus-within:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="md:col-span-2 flex flex-col items-center pt-8"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative px-24 py-7 bg-jade text-secondary-parchment font-body text-[0.75rem] uppercase tracking-[0.5em] transition-all overflow-hidden"
              >
                <span className="relative z-10">SUBMIT MANDATE</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <div className="absolute -inset-2 border border-jade/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
              </motion.button>
              
              <div className="mt-12 flex items-center gap-6 opacity-20">
                <div className="h-px w-20 bg-secondary-parchment" />
                <span className="text-[0.5rem] uppercase tracking-[0.6em] whitespace-nowrap italic">Institutional Directives Only</span>
                <div className="h-px w-20 bg-secondary-parchment" />
              </div>
            </motion.div>
          </motion.form>

          <footer className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-24 border-t border-white/5 items-start">
            <div className="flex flex-col gap-6">
              <Label className="text-gold uppercase tracking-[0.4em] text-[0.6rem] font-bold">The Hub</Label>
              <div className="space-y-4">
                <p className="text-[0.7rem] leading-relaxed opacity-50 uppercase tracking-widest max-w-[200px]">
                  Regent Hill Office Park, 68 Leslie Rd, Sandton, 2062
                </p>
                <div className="h-px w-12 bg-gold/30" />
                <Tabular className="text-jade text-xs tracking-widest block font-bold">africadvise@icon.co.za</Tabular>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <Label className="text-gold uppercase tracking-[0.4em] text-[0.6rem] font-bold">Advisory Access</Label>
              <div className="space-y-6">
                <div>
                  <p className="text-[0.55rem] opacity-30 uppercase tracking-widest mb-1">Directorate</p>
                  <p className="text-[0.75rem] font-display text-secondary-parchment/80">B. Jewels | +27 83 326 1070</p>
                </div>
                <div>
                  <p className="text-[0.55rem] opacity-30 uppercase tracking-widest mb-1">Sovereign Facilitation</p>
                  <p className="text-[0.75rem] font-display text-secondary-parchment/80">E. Meda | +27 72 581 7097</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:items-end lg:text-right">
               <div className="w-12 h-12 border border-gold/20 flex items-center justify-center opacity-30">
                  <svg viewBox="0 0 100 100" className="w-6 h-6 stroke-gold fill-none">
                    <path d="M20 50 L50 20 L80 50 L50 80 Z" />
                    <path d="M50 20 V80 M20 50 H80" />
                  </svg>
               </div>
               <p className="text-[0.6rem] opacity-20 uppercase tracking-[0.3em] font-light leading-relaxed max-w-[240px]">
                  FACILITATING OUTCOMES IN MARKETS REQUIRING SYSTEMIC NAVIGATION AND SOVEREIGN CONNECTIVITY SINCE 1984.
               </p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
