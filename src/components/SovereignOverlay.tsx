"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SovereignOverlay = () => {
  const { scrollYProgress } = useScroll();
  const latValue = useTransform(scrollYProgress, (v) => `${(v * 30).toFixed(4)}° N`);
  const lonValue = useTransform(scrollYProgress, (v) => `${(v * 45).toFixed(4)}° E`);

  return (
    <>
      {/* Global Briefing Grid (3-5% opacity) */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 grid grid-cols-12 h-screen w-screen">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-gold h-full" />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col h-screen w-screen">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-gold w-full flex-1" />
          ))}
        </div>
        
        {/* Signal Sweep Scanline */}
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-1/4 bg-gradient-to-b from-transparent via-gold/10 to-transparent"
        />
      </div>

      {/* Atmospheric Lat/Long Markers */}
      <div 
        className="fixed inset-0 z-[101] pointer-events-none p-4 lg:p-10 flex flex-col justify-between text-[0.55rem] font-mono tracking-[0.3em] text-gold/30 uppercase safe-p-sovereign"
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-1" />
          <div className="text-right">
            <motion.span>{latValue}</motion.span>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1 uppercase">
            <span>AFRICAN ADVISORY</span>
          </div>
          <div className="text-right">
            <motion.span>{lonValue}</motion.span>
          </div>
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.02] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </>
  );
};
