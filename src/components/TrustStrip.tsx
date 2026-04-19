"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Label } from './Typography';

const PARTNERS = [
  'Standard Bank',
  'HSBC',
  'UBS',
  'Amro Bank',
  'UK Government Trade Advisory',
  'EBN Africa',
];

export const TrustStrip = () => {
  return (
    <section className="py-24 border-y border-white/[0.08] bg-[hsl(216_12%_8%)] relative overflow-hidden">
      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

      <div className="container relative z-10 flex flex-col items-center gap-12">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col items-center gap-3"
        >
          <div className="w-8 h-px bg-[#00B4A6]/40 mb-2" />
          <Label className="text-[#00B4A6]/60 tracking-[0.5em] text-[0.6rem] uppercase font-bold text-center">
            Institutional Connectivity
          </Label>
        </motion.div>

        <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="animate-marquee-slow flex items-center gap-16 md:gap-24 grayscale group hover:grayscale-0 transition-all duration-700 py-6">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex items-center gap-16 md:gap-24 shrink-0"
              >
                <span
                  className="text-white/20 group-hover:text-white transition-colors duration-500 font-display text-lg md:text-xl tracking-[0.2em] uppercase select-none whitespace-nowrap italic"
                >
                  {name}
                </span>
                <span className="text-[#00B4A6]/20 text-xs shrink-0 select-none">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side accents */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </section>
  );
};
