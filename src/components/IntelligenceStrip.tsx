"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabular, Label } from './Typography';
import { TRANSITIONS, VARIANTS } from './Motion';
import initialData from '@/data/intelligence.json';

export const IntelligenceStrip = () => {
  const [data, setData] = React.useState(initialData);
  const [index, setIndex] = React.useState(0);

  // Auto-refresh stats if mandates exist
  const mandates = data.mandates || [];

  React.useEffect(() => {
    if (mandates.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mandates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mandates.length]);

  if (mandates.length === 0) return null;

  const current = mandates[index];

  return (
    <div className="w-full bg-surface-dark/80 backdrop-blur-md py-4 border-y border-foreground/5 overflow-hidden reveal">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div
            variants={VARIANTS.RISE_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Label className="text-[#00B4A6]/70 font-semibold flex-shrink-0 tracking-[0.4em]">
              STRATEGIC ADVISORY PORTFOLIO
            </Label>
          </motion.div>
          <div className="w-px h-6 bg-foreground/10" />
          
          <div className="h-8 relative overflow-hidden flex-grow min-w-[350px] md:min-w-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={TRANSITIONS.RESTRAINED}
                className="absolute inset-0 flex items-center gap-8"
              >
                <Tabular className="text-lg font-medium tracking-wide text-[#00B4A6]">
                  {current.value}
                </Tabular>
                <Label className="text-[0.7rem] text-white/70 uppercase tracking-widest whitespace-nowrap">
                  {current.label}
                </Label>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
