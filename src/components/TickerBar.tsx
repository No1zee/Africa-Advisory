"use client";

import React, { useRef } from 'react';
import { useUserTier } from '@/hooks/useUserTier';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const BASIC_STATS = [
  { label: 'Structured Capital', value: '$4.2B+' },
  { label: 'Regulated Hubs', value: '12' },
  { label: 'Pan-African Coverage', value: '54 Nations' },
  { label: 'Established Expertise', value: '40 Years' },
];

const ADVANCED_STATS = [
  { label: 'Structured Capital', value: '$4.2B+' },
  { label: 'Active Mandates', value: '7' },
  { label: 'Focus Region', value: 'SADC & ECOWAS' },
  { label: 'Regulatory Scope', value: 'Cross-Border' },
  { label: 'Key Sectors', value: 'Infrastructure, Tech' },
];

export const TickerBar = () => {
  const { tier } = useUserTier();
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = (tier === 'ASSOCIATE' || tier === 'PARTNER') ? ADVANCED_STATS : BASIC_STATS;

  useGSAP(() => {
    if (!tickerRef.current) return;

    // High-precision infinite loop
    const ticker = tickerRef.current;
    const totalWidth = ticker.offsetWidth / 2; // Since we duplicate stats

    gsap.to(ticker, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(ticker, { x: 0 });
      }
    });
  }, { scope: containerRef, dependencies: [stats] });

  return (
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 h-14 border-t border-jade/20 flex items-center overflow-hidden liquid-glass z-[100]">
      <div className="absolute inset-0 bg-gradient-to-r from-base-obsidian via-transparent to-base-obsidian opacity-50 z-10 pointer-events-none" />
      <div ref={tickerRef} className="flex whitespace-nowrap will-change-transform">
          {[...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center px-16 border-r border-jade/10 last:border-r-0">
              <span className="sculptural-label mr-4 text-jade opacity-80">{stat.label}:</span>
              <span className="font-display text-sm tracking-widest text-secondary-parchment/90">{stat.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
