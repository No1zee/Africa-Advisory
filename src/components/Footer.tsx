"use client";

import React from 'react';
import Link from 'next/link';
import { Display, Body, Label, Tabular } from './Typography';

export const Footer = () => {
  return (
    <footer 
      className="section pt-48 pb-24 bg-base-obsidian text-secondary-parchment border-t border-white/5 overflow-hidden relative safe-pb-footer"
    >
      <div className="container relative">
        {/* Top Branding Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
          <div className="max-w-xl">
             <Display className="text-4xl md:text-5xl lg:text-6xl text-gold/90 mb-8 leading-none tracking-tighter uppercase italic font-light">
                Africa <span className="text-secondary-parchment/80 not-italic font-medium">Advisory.</span>
             </Display>
             <Body className="text-sm md:text-base opacity-40 max-w-sm uppercase tracking-[0.2em] leading-relaxed">
                Expert trade and project finance advisory across the African continent since 1984.
             </Body>
          </div>
          <div className="flex gap-12">
             <div className="w-12 h-12 border border-jade/20 rounded-full flex items-center justify-center text-jade opacity-40 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
             </div>
          </div>
        </div>

        <div className="editorial-grid gap-y-24 gap-x-12 mb-32 items-start border-t border-white/5 pt-24">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
             <Label className="block mb-12 opacity-30 uppercase tracking-[0.5em] text-[0.5rem] font-bold">Our Locations</Label>
             <div className="flex flex-col space-y-6">
                {['Johannesburg', 'Nairobi', 'Lagos', 'London (Desk)'].map(hub => (
                  <div key={hub} className="group cursor-default">
                    <span className="font-body text-[0.65rem] text-secondary-parchment/60 group-hover:text-jade transition-colors uppercase tracking-[0.3em]">{hub}</span>
                    <div className="h-px w-0 group-hover:w-8 bg-jade transition-all duration-500 mt-1" />
                  </div>
                ))}
             </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
             <Label className="block mb-12 opacity-30 uppercase tracking-[0.5em] text-[0.5rem] font-bold">Mandates</Label>
             <div className="flex flex-col space-y-6">
                {['Project Finance', 'Trade Finance', 'Debt Resolution', 'Legal & Compliance'].map(link => (
                  <a key={link} href="#" className="font-body text-[0.65rem] text-secondary-parchment/60 hover:text-gold transition-colors uppercase tracking-[0.3em] block">{link}</a>
                ))}
             </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
             <Label className="block mb-12 opacity-30 uppercase tracking-[0.5em] text-[0.5rem] font-bold">About Africa Advisory</Label>
             <p className="font-body text-[0.7rem] text-secondary-parchment/40 max-w-lg uppercase tracking-[0.25em] leading-[1.8] italic">
                Over four decades of specialised experience facilitating trade and infrastructure development across the continent — delivering bespoke solutions for African markets.
             </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5 opacity-30">
           <div className="flex flex-col md:flex-row items-center gap-8">
             <Label className="text-[0.55rem] uppercase tracking-[0.4em]">© 2016‐2024 Africa Advisory Ltd.</Label>
             <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold/50" />
             <Link href="/privacy" className="text-[0.55rem] uppercase tracking-[0.4em] hover:text-gold transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="text-[0.55rem] uppercase tracking-[0.4em] hover:text-gold transition-colors">Terms of Service</Link>
           </div>
           

        </div>
      </div>
    </footer>
  );
};
