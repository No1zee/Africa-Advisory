"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Display, Body, Label, Tabular } from './Typography';
import { VARIANTS, TRANSITIONS } from './Motion';

const PILLARS = [
  {
    id: '01',
    title: 'Project Finance',
    tagline: 'Infrastructure Development',
    description: 'Project finance is key to infrastructure development in Africa. Areas of specialisation include mining, energy, transport, telecommunications and infrastructure.',
    metric: 'MINING // ENERGY'
  },
  {
    id: '02',
    title: 'Export And Pre-Export Finance',
    tagline: 'Finance Facilitation',
    description: 'End-to-end finance facilitation that covers all bases from point of production to delivery at destination. Access to blue-chip financial facilities and longstanding, continent-wide relationships.',
    metric: 'TRADE // CAPITAL'
  },
  {
    id: '03',
    title: 'Debt Resolution',
    tagline: 'Negotiated Solutions',
    description: 'Africa Advisory is well positioned to negotiate solutions for external creditors and suppliers.',
    metric: 'SECURED // SETTLED'
  },
  {
    id: '04',
    title: 'Entrepreneurial Development',
    tagline: 'SME Initiatives',
    description: 'We believe that the future of business development lies with the development of entrepreneurs. In association with EBN Africa, Africa Advisory supports developing incubators focused on SME initiatives.',
    metric: 'SCALE // EXIT'
  },
  {
    id: '05',
    title: 'Crowdfunding',
    tagline: 'Socially Beneficial',
    description: 'Africa Advisory has established a Crowd Funding platform linked into major European platforms. The focus is development of socially beneficial SME development.',
    metric: 'LIQUIDITY // FLOW'
  },
  {
    id: '06',
    title: 'Virtual Offices',
    tagline: 'Regional Presence',
    description: 'Africa Advisory is able to host a virtual office in one or more of its regional hubs.',
    metric: 'FOOTPRINT'
  }
];

export const ServiceSection = () => {
  return (
    <section className="section bg-[#F8F6F3] border-t border-black/5 relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none grayscale mix-blend-multiply">
        <img src="/assets/service.png" alt="Infrastructure" className="w-full h-full object-cover" />
      </div>
      
      {/* Noise Reduction Gradient */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#F8F6F3] via-[#F8F6F3]/80 to-transparent pointer-events-none z-0" />

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
              <Label className="text-brand-teal mb-8 uppercase tracking-[0.2em] font-semibold">Our Focus</Label>
            </motion.div>
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.2 }}>
              <Display as="h2" className="text-[#0D1212]">
                Strategic Solutions for <br />
                <span className="italic opacity-70">High-Intent Capital.</span>
              </Display>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex items-end">
            <motion.div variants={VARIANTS.RISE_REVEAL} transition={{ delay: 0.4 }}>
              <Body className="text-[#0D1212]">
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
              <div className="relative p-12 bg-white hover:bg-[#FDFCFB] border border-black/5 hover:border-brand-teal/20 transition-all duration-700 h-full flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
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
                      <Label className="text-brand-teal tracking-[0.3em] font-bold uppercase text-[0.65rem]">
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
                    <Display as="h3" className="text-2xl mb-6 group-hover:text-brand-teal transition-colors duration-500 text-[#0D1212]">
                      {pillar.title}
                    </Display>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (i * 0.1) + 0.8 }}
                  >
                    <Body className="text-foreground mb-12 text-base leading-relaxed transition-colors">
                      {pillar.description}
                    </Body>
                  </motion.div>
                </div>

                <div className="relative z-10 flex justify-between items-end border-t border-black/10 pt-8">
                  <Tabular className="text-[0.65rem] text-brand-gold font-bold uppercase tracking-widest">{pillar.metric}</Tabular>
                  <Label className="text-[0.65rem] text-brand-teal font-bold uppercase group-hover:text-brand-teal transition-colors tracking-widest">Strategic Logic</Label>
                </div>

                <div className="absolute -bottom-8 -right-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                  <Tabular className="text-[10rem] font-bold text-[#0D1212]">{pillar.id}</Tabular>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
