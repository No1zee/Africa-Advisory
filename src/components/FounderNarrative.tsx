"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Body, Label, Tabular } from './Typography';
import { VARIANTS, TRANSITIONS, Counter } from './Motion';

const institutions = [
  { name: 'Standard Bank', role: 'Trade & Project Finance' },
  { name: 'Amro Bank', role: 'Infrastructure Finance' }
];

export const FounderNarrative = () => {
  return (
    <section className="section bg-secondary-parchment text-base-obsidian overflow-hidden">
      <div className="container">
        <div className="editorial-grid items-start">
          {/* Portrait & Core Identity */}
          <motion.div 
            variants={VARIANTS.STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 mb-24 lg:mb-0"
          >
            <motion.div 
              variants={VARIANTS.RISE_REVEAL}
              className="relative aspect-[3/4] bg-base-obsidian overflow-hidden mb-12 border border-foreground/10"
            >
              <img 
                src="/assets/founder.png" 
                alt="Founder Shadow" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 contrast-125 grayscale"
              />
              <div className="absolute inset-0 bg-jade/10 mix-blend-overlay" />
              {/* Brushed metal texture overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-base-obsidian via-base-obsidian/40 to-transparent">
                <Display as="h3" className="text-secondary-parchment text-4xl mb-2">Bruce Jewels</Display>
                <Label className="text-jade font-semibold tracking-widest uppercase text-[0.6rem]">Principal & Founder</Label>
              </div>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div variants={VARIANTS.RISE_REVEAL}>
                <Label className="text-base-obsidian opacity-40 border-b border-base-obsidian/10 pb-4 block uppercase tracking-widest">Institutional Pedigree</Label>
              </motion.div>
              <div className="grid grid-cols-2 gap-8">
                {institutions.map((inst, i) => (
                  <motion.div 
                    key={i} 
                    variants={VARIANTS.RISE_REVEAL}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col"
                  >
                    <span className="font-display text-lg mb-1">{inst.name}</span>
                    <Label className="text-[0.55rem] opacity-60 leading-none">{inst.role}</Label>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* The Narrative */}
          <motion.div 
            variants={VARIANTS.STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 lg:col-start-7 lg:col-span-6"
          >
            <motion.div variants={VARIANTS.RISE_REVEAL}>
              <Label className="text-jade mb-8 uppercase tracking-[0.2em] font-medium">Strategic Vision</Label>
            </motion.div>
            
            <div className="mb-16">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={TRANSITIONS.EXQUISITE}
              >
                <Display as="h2" className="text-4xl md:text-5xl leading-tight mb-8 font-light italic">
                  Navigating systemic complexity with over four decades of <span className="text-jade not-italic">institutional pedigree.</span>
                </Display>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-px bg-jade/30" 
                />
              </motion.div>
            </div>

            <div className="space-y-12">
              <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.2 }}>
                <Body className="text-base-obsidian/90 text-xl md:text-2xl font-medium leading-snug">
                  Africa Advisory is recognised as the continent’s premier conduit for capital facilitation, overcoming deal-breaking restrictions to deliver sovereign-level outcomes.
                </Body>
              </motion.div>
              
              <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.4 }}>
                <Body className="text-base-obsidian/70 leading-relaxed font-body">
                  By deploying a combination of deep localized intelligence and global financial engineering, we reach financial close on mandates requiring specialised navigation of African political and economic landscapes.
                </Body>
              </motion.div>

              <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.6 }}>
                <Body className="text-base-obsidian/70 leading-relaxed font-body">
                  Our value lies in our connectivity. With institutional heritage spanning global financial centers and sovereign advisory committees, we offer clients a level of access and discretion unique to the African advisory space.
                </Body>
              </motion.div>

              <div className="pt-12 grid grid-cols-2 gap-12 border-t border-base-obsidian/10">
                <motion.div variants={VARIANTS.RISE_REVEAL}>
                  <Tabular className="text-4xl text-gold">40+</Tabular>
                  <Label className="block mt-2 opacity-50 uppercase tracking-widest text-jade">Years Advisory</Label>
                </motion.div>
                <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.2 }}>
                  <Tabular className="text-4xl text-gold">32B</Tabular>
                  <Label className="block mt-2 opacity-50 uppercase tracking-widest text-jade">Capital Facilitated</Label>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
