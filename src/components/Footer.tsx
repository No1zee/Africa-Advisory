"use client";

import React from 'react';
import Link from 'next/link';
import { Display } from './Typography';

const HUBS = ['Johannesburg', 'Lagos', 'London', 'Nairobi'];
const SOLUTIONS = ['Project Finance', 'Trade Finance', 'Sovereign Debt', 'Capital Markets', 'Strategic Advisory'];
const LEGAL = ['Privacy Policy', 'Terms of Service', 'NDA Framework'];

export const Footer = () => {
  return (
    <footer className="relative bg-[hsl(216_12%_8%)] border-t border-[#00B4A6]/20 overflow-hidden">
      {/* Main grid */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl md:text-3xl text-white leading-tight mb-4">
              Africa<br />
              <em className="font-light text-[#00B4A6] not-italic">Advisory.</em>
            </h2>
            <p className="text-[#8A8A8A] text-xs mt-5 leading-relaxed font-body font-normal uppercase tracking-widest opacity-60">
              Africa's Dealmaker since 1984.<br />
              Johannesburg · Lagos · London · Nairobi
            </p>
            <div className="mt-8 h-px w-12 bg-[#00B4A6]/40" />
          </div>

          {/* Hubs */}
          <div>
            <p className="text-[0.55rem] tracking-[0.35em] text-white/30 font-bold mb-7 uppercase">Hubs</p>
            <div className="flex flex-col gap-3">
              {HUBS.map((hub) => (
                <span key={hub} className="text-[#8A8A8A] text-sm font-body font-normal hover:text-white transition-colors cursor-default">
                  {hub}
                </span>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-[0.55rem] tracking-[0.35em] text-white/30 font-bold mb-7 uppercase">Services</p>
            <div className="flex flex-col gap-3">
              {SOLUTIONS.map((sol) => (
                <a key={sol} href="#services" className="text-[#8A8A8A] text-sm font-body font-normal hover:text-[#00B4A6] transition-colors">
                  {sol}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <p className="text-[0.55rem] tracking-[0.35em] text-white/30 font-bold mb-7 uppercase">Contact</p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[0.48rem] uppercase tracking-[0.2em] text-white/25 mb-1">Principal</p>
                <p className="text-[#8A8A8A] text-sm font-normal">Bruce Jewels</p>
              </div>
              <div>
                <p className="text-[0.48rem] uppercase tracking-[0.2em] text-white/25 mb-1">Email</p>
                <a href="mailto:bruce@africaadvisory.com" className="text-[#8A8A8A] text-sm hover:text-[#00B4A6] transition-colors font-normal">
                  bruce@africaadvisory.com
                </a>
              </div>
              <div className="mt-2">
                <a
                  href="#contact"
                  className="inline-block bg-[#00B4A6] text-white text-[0.6rem] uppercase tracking-[0.2em] font-bold px-5 py-3 hover:bg-[#00D1C1] transition-colors duration-200"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[0.58rem] tracking-[0.25em] text-white/20 uppercase font-medium">
            © 2016–2026 Africa Advisory Ltd. All Rights Reserved.
          </span>
          <div className="flex items-center gap-8">
            {LEGAL.map((item, i) => (
              <Link
                key={item}
                href="#"
                className="text-[0.55rem] tracking-[0.2em] text-white/20 uppercase hover:text-[#00B4A6] transition-colors font-medium"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
