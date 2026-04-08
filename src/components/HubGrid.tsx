"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NetworkMap } from './NetworkMap';
import { Display, Body, Label, Tabular } from './Typography';

const HUB_DATA = [
  { city: 'Johannesburg', region: 'ZA', note: 'Regional Sovereign Debt & Project Finance Hub', role: 'HQ' },
  { city: 'Nairobi', region: 'KE', note: 'East Africa Infrastructure & Agri-Tech Corridor', role: 'Hub' },
  { city: 'Cotonou', region: 'BJ', note: 'West Africa Port & Trade Facilitation Center', role: 'Hub' },
  { city: 'Shenzhen', region: 'CN', note: 'China-Africa Capital & Logistics Bridge', role: 'Office' },
  { city: 'Lagos', region: 'NG', note: 'Anglophone West Africa Financial Advisory', role: 'Office' },
];

import { DensityDots } from './DensityDots';
import { CorridorMap } from './CorridorMap';

export const HubGrid = () => {
  return (
    <section id="network" className="section relative overflow-hidden bg-background py-32 lg:py-48">
      <div className="scanline" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Label className="text-jade mb-4 tracking-[0.3em] uppercase">Regional Presence</Label>
              <Display as="h2" className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tighter">
                Architectural Reach. <br />
                <span className="italic text-foreground/40">Uncommon Connectivity.</span>
              </Display>
              <Body className="text-lg text-foreground/60 max-w-2xl leading-relaxed">
                Our physical presence across key African markets is augmented by a global network of institutional partners, enabling us to execute complex cross-border mandates with local precision and international scale.
              </Body>
            </motion.div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end gap-8">
            <div className="grid grid-cols-2 gap-8 border-t border-foreground/10 pt-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex items-baseline gap-1">
                  <Tabular className="text-4xl text-gold">32B</Tabular>
                  <span className="text-gold/60 text-xs">$</span>
                </div>
                <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest mt-2">Capital Mobilised</Label>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Tabular className="text-4xl text-jade">14</Tabular>
                <Label className="text-[0.6rem] opacity-40 uppercase tracking-widest mt-2">Markets Served</Label>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Map Cell */}
          <motion.div 
            className="md:col-span-12 lg:col-span-8 liquid-glass rounded-sm p-8 group overflow-hidden relative min-h-[400px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="absolute top-0 right-0 p-4 sculptural-label text-[0.5rem] opacity-20 uppercase tracking-widest">
              Execution Corridors & Sovereignty Distribution
            </div>
            <div className="relative h-full flex items-center justify-center py-12">
              <NetworkMap />
            </div>
          </motion.div>

          {/* Regional Hubs Column */}
          <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <motion.div 
              className="liquid-glass rounded-sm p-8 flex flex-col justify-between group hover:border-jade transition-all"
            >
              <div>
                <Label className="text-[0.6rem] text-jade/60 mb-3 tracking-widest uppercase">Southern Africa HUB</Label>
                <Display as="h3" className="text-3xl mb-4 group-hover:text-jade transition-colors">Johannesburg</Display>
                <p className="text-sm text-foreground/60 leading-relaxed font-body">
                  Specialised center for debt resolution and project finance structuring. Est. 1984.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Tabular className="text-[0.6rem] text-gold/60">HEADQUARTERS</Tabular>
                <div className="w-8 h-8 rounded-full border border-jade/20 flex items-center justify-center group-hover:bg-jade group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="liquid-glass rounded-sm p-8 flex flex-col justify-between group hover:border-jade transition-all"
            >
              <div>
                <Label className="text-[0.6rem] text-jade/60 mb-3 tracking-widest uppercase">East Africa HUB</Label>
                <Display as="h3" className="text-3xl mb-4 group-hover:text-jade transition-colors">Nairobi</Display>
                <p className="text-sm text-foreground/60 leading-relaxed font-body">
                  Nodal point for regional infrastructure corridors and agri-tech investment syndication.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <Tabular className="text-[0.6rem] text-gold/60">REGIONAL HUB</Tabular>
                <div className="w-8 h-8 rounded-full border border-jade/20 flex items-center justify-center group-hover:bg-jade group-hover:text-white transition-all text-sm">
                  →
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Capital Bridge Cell */}
          <motion.div 
            className="md:col-span-12 liquid-glass-gold rounded-sm p-10 flex flex-col lg:flex-row justify-between lg:items-center gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div>
              <Display as="h3" className="text-3xl text-gold mb-2">China-Africa Capital Bridge</Display>
              <Label className="text-[0.7rem] opacity-40 uppercase tracking-[0.2em]">Shenzhen // Institutional Liquidity Access</Label>
            </div>
            <p className="text-base text-foreground/60 max-w-2xl leading-relaxed font-body">
              Providing direct institutional connectivity to the world's primary source of infrastructure liquidity and technical expertise, specifically tailored for African sovereign and enterprise requirements.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
