"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserTier } from '@/hooks/useUserTier';
import dynamic from 'next/dynamic';

import { PretextHeader } from './PretextHeader';

const INTEL_STRINGS = [
  "INITIALIZING_SECURE_PROTOCOLS...",
  "SCANNING_AFRICAN_CAPITAL_VECTORS...",
  "DEAL_FLOW_DETECTED: $4.2B",
  "AUTHENTICATING_STRATEGIC_BRIEFING...",
  "LOCATION: GEOSPATIAL_AFRICA"
];

export const Pretext = ({ children }: { children: React.ReactNode }) => {
  const { tier, isLoaded } = useUserTier();
  const [isVisible, setIsVisible] = useState(false);
  const [intelIndex, setIntelIndex] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;

    // Only show if STRANGER and haven't seen in this session
    if (tier === 'STRANGER' && !sessionStorage.getItem('aa_has_seen_prologue')) {
      setIsVisible(true);
      sessionStorage.setItem('aa_has_seen_prologue', 'true');
    } else {
      setIsVisible(false);
      return;
    }

    // Intelligence ticker cycle
    const interval = setInterval(() => {
      setIntelIndex((prev) => (prev + 1) % INTEL_STRINGS.length);
    }, 400);

    // Final reveal timeout
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isLoaded, tier]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="pretext-overlay"
            exit={{ 
              y: '-100%',
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            {/* Animated SVG Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <pattern id="pretext-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#pretext-grid)" />
              
              {/* Dynamic Drawing Lines */}
              <motion.line 
                x1="0" y1="20%" x2="100%" y2="20%" 
                stroke="currentColor" strokeWidth="0.5" 
                className="animate-draw"
              />
              <motion.line 
                x1="30%" y1="0" x2="30%" y2="100%" 
                stroke="currentColor" strokeWidth="0.5" 
                className="animate-draw"
                transition={{ delay: 0.5 }}
              />
            </svg>

            {/* Intelligence Ticker */}
            <div className="absolute bottom-12 left-12 font-mono text-[10px] tracking-[0.2em] uppercase text-accent animate-intel-flicker">
              {INTEL_STRINGS[intelIndex]}
            </div>

            <div className="absolute top-12 right-12 sculptural-label opacity-30">
              Est. MMXXVI
            </div>

            {/* Central Narrative / Logo */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                className="pretext-logo-glow absolute w-64 h-64 -z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              />
              
              <motion.div
                initial={{ opacity: 0, filter: 'blur(20px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="sculptural-label text-accent mb-6 uppercase tracking-[0.3em] text-[0.6rem]">Strategic Intelligence</div>
                <PretextHeader 
                  text="Africa Advisory"
                  italic={true}
                  fontSize={64}
                  maxWidth={600}
                  lineHeight={1.25}
                  color="#4a3728"
                  className="mb-4"
                />
                <div className="thin-line w-24 mx-auto opacity-30 h-px bg-soil" />
                <div className="mt-8 font-sans text-[9px] uppercase tracking-[0.5em] opacity-40">
                  Initializing Briefing...
                </div>
              </motion.div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-foreground/5" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-foreground/5" />
          </motion.div>
        )}
      </AnimatePresence>
      <main className={isVisible ? 'overflow-hidden h-screen' : ''}>
        {children}
      </main>
    </>
  );
};
