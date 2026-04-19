"use client";

import React, { useRef } from 'react';
import { useUserTier } from '@/hooks/useUserTier';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import initialData from '@/data/intelligence.json';

export const TickerBar = () => {
  const { tier } = useUserTier();
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback to initial data if needed
  const stats = initialData.tickerStats || [];

  useGSAP(() => {
    if (!tickerRef.current || stats.length === 0) return;

    // High-precision infinite loop
    const ticker = tickerRef.current;
    const totalWidth = ticker.offsetWidth / 2; 

    gsap.to(ticker, {
      x: -totalWidth,
      duration: 50, // Slightly slower for readability
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(ticker, { x: 0 });
      }
    });
  }, { scope: containerRef, dependencies: [stats] });

  if (stats.length === 0) return null;

  return (
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 h-14 border-t border-[#00B4A6]/20 flex items-center overflow-hidden liquid-glass z-[100]">
      <div className="absolute inset-0 bg-gradient-to-r from-base-obsidian via-transparent to-base-obsidian opacity-50 z-10 pointer-events-none" />
      <div ref={tickerRef} className="flex whitespace-nowrap will-change-transform">
          {[...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center px-16 border-r border-[#00B4A6]/10 last:border-r-0">
              <span className="sculptural-label mr-4 text-[#00B4A6]/70 opacity-80">{stat.label}:</span>
              <span className="font-display text-sm tracking-widest text-secondary-parchment/90">{stat.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
