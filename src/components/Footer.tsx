"use client";

import React from 'react';
import Link from 'next/link';
import { Display, Body, Label, Tabular } from './Typography';

export const Footer = () => {
  return (
    <footer className="section pt-32 pb-16 bg-base-obsidian text-secondary-parchment border-t border-foreground/5 overflow-hidden">
      <div className="container relative py-12">
        <div className="editorial-grid gap-24 mb-24 items-start border-b border-foreground/5 pb-24">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
             <Label className="block mb-8 opacity-40 uppercase tracking-widest text-[0.6rem]">Quick Links</Label>
             <div className="flex flex-col space-y-4">
                {['Home', 'About', 'Services', 'Contact'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="font-body text-xs text-secondary-parchment/60 hover:text-jade transition-colors uppercase tracking-[0.2em]">{link}</a>
                ))}
             </div>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-3">
             <Label className="block mb-8 opacity-40 uppercase tracking-widest text-[0.6rem]">Legal & Compliance</Label>
             <div className="flex flex-col space-y-4">
                {['Legal', 'Terms & Conditions', 'Privacy Policy', 'Disclaimer'].map(link => (
                  <a key={link} href="#" className="font-body text-xs text-secondary-parchment/60 hover:text-gold transition-colors uppercase tracking-[0.2em]">{link}</a>
                ))}
             </div>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-6 lg:text-right">
             <Label className="block mb-8 opacity-40 uppercase tracking-widest text-[0.6rem]">Institutional Heritage</Label>
             <p className="font-body text-[0.6rem] text-foreground/40 max-w-sm ml-auto uppercase tracking-widest leading-relaxed">
                Based on 40 years of specialised experience Africa Advisory has rapidly gained the reputation as the professional in inter and intra Africa financing and business facilitation consultancy.
             </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center opacity-40">
           <Label className="text-[0.6rem] uppercase tracking-widest">Copyright © 2016, Africa Advisory Ltd. All Rights Reserved.</Label>
           <div className="mt-8 md:mt-0">
             <Label className="text-[0.5rem] uppercase tracking-widest italic">South African Web Design and Hosting by eConsultant</Label>
           </div>
        </div>
      </div>
    </footer>
  );
};
