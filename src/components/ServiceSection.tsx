"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Body, Label, Tabular } from './Typography';
import { VARIANTS, TRANSITIONS } from './Motion';

const PILLARS = [
  {
    id: '01',
    title: 'Project Finance',
    tagline: 'Strategic Infrastructure Yield',
    description: 'Specialised advisory for mining, energy, and large-scale utility infrastructure.',
    metric: 'MINING // ENERGY'
  },
  {
    id: '02',
    title: 'Export And Pre-Export Finance',
    tagline: 'End-to-End Orchestration',
    description: 'Capital facilitation and logistics orchestration for cross-border trade flows.',
    metric: 'TRADE // CAPITAL'
  },
  {
    id: '03',
    title: 'Debt Resolution',
    tagline: 'Creditor Negotiation',
    description: 'Africa Advisory is well positioned to negotiate solutions for external creditors and suppliers.',
    metric: 'SECURED // SETTLED'
  },
  {
    id: '04',
    title: 'Entrepreneurial Development',
    tagline: 'Future Growth Architecture',
    description: 'Scaling local enterprises through institutional capital and strategic governance.',
    metric: 'SCALE // EXIT'
  },
  {
    id: '05',
    title: 'Crowdfunding',
    tagline: 'Platform Connectivity',
    description: 'Direct institutional and retail liquidity access through proprietary and partner digital platforms.',
    metric: 'LIQUIDITY // FLOW'
  },
  {
    id: '06',
    title: 'Virtual Offices',
    tagline: 'Regional Presence Hosting',
    description: 'Establishing sovereign and enterprise presence in key regional markets through our hub network.',
    metric: 'FOOTPRINT'
  }
];

export const ServiceSection = () => {
  return (
    <section className="section bg-background border-t border-foreground/5 relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
        <img src="/assets/service.png" alt="Infrastructure" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        <motion.div 
          variants={VARIANTS.STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="editorial-grid mb-24"
        >
          <div className="col-span-12 md:col-span-6">
            <motion.div variants={VARIANTS.RISE_REVEAL}>
              <Label className="text-jade mb-8 uppercase tracking-[0.2em]">Our Focus</Label>
            </motion.div>
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.2 }}>
              <Display as="h2" className="text-foreground">
                Strategic Solutions for <br />
                <span className="italic">High-Intent Capital.</span>
              </Display>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex items-end">
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.4 }}>
              <Body className="text-foreground/60">
                We provide the execution layer for complex mandates. Our approach is defined by restraint, geopolitical precision, and a commitment to unlocking unusual value across the continent.
              </Body>
            </motion.div>
          </div>
        </motion.div>

        <div className="editorial-grid gap-12">
          {PILLARS.map((pillar, i) => (
            <motion.div 
              key={pillar.id}
              variants={VARIANTS.MASK_WIPE_V}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, ...TRANSITIONS.EXQUISITE }}
              className="col-span-12 md:col-span-6 lg:col-span-4 group"
            >
              <div className="relative p-12 bg-jade/5 hover:bg-jade/10 border border-jade/10 transition-all duration-700 h-full flex flex-col justify-between overflow-hidden">
                {/* Glass Sheen */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-[linear-gradient(45deg,transparent_25%,hsla(var(--jade),0.05)_50%,transparent_75%)] animate-[scanline_3s_infinite]" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (i * 0.1) + 0.5 }}
                      className="flex flex-col gap-1"
                    >
                      <Label className="text-jade tracking-[0.3em] font-light">
                        {pillar.tagline}
                      </Label>
                    </motion.div>
                    <div className="w-8 h-px bg-jade/30 group-hover:w-12 transition-all duration-700" />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i * 0.1) + 0.6 }}
                  >
                    <Display as="h3" className="text-2xl mb-6 group-hover:text-jade transition-colors duration-500">
                      {pillar.title}
                    </Display>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (i * 0.1) + 0.8 }}
                  >
                    <Body className="text-foreground/60 mb-12 text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">
                      {pillar.description}
                    </Body>
                  </motion.div>
                </div>

                <div className="relative z-10 flex justify-between items-end border-t border-jade/10 pt-8">
                  <Tabular className="text-[0.6rem] text-gold/60 uppercase tracking-widest">{pillar.metric}</Tabular>
                  <Label className="text-[0.6rem] text-jade/40 uppercase group-hover:text-jade transition-colors">Strategic Logic</Label>
                </div>

                <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                  <Tabular className="text-[10rem] font-bold text-jade">{pillar.id}</Tabular>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
