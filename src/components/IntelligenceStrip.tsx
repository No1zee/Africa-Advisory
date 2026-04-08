"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabular, Label } from './Typography';
import { TRANSITIONS, VARIANTS } from './Motion';

const mandates = [
  { label: 'Energy/Sovereign Debt', value: '$1.2B', status: 'In-Execution' },
  { label: 'Trade Corridor/East', value: '$450M', status: 'Closing' },
  { label: 'Infrastructure/PPP', value: '$820M', status: 'Engaged' },
  { label: 'Agri-Tech/Growth', value: '$120M', status: 'Deployment' },
  { label: 'Regional Transit', value: '$2.1B', status: 'Structuring' }
];

export const IntelligenceStrip = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mandates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = mandates[index];

  return (
    <div className="w-full bg-surface-dark/80 backdrop-blur-md py-4 border-y border-foreground/5 overflow-hidden">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div
            variants={VARIANTS.RISE_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Label className="text-jade opacity-100 flex-shrink-0 tracking-[0.4em]">
              ACTIVE PORTFOLIO // STRATEGIC ADVISORY
            </Label>
          </motion.div>
          <div className="w-px h-6 bg-foreground/10" />
          
          <div className="h-8 relative overflow-hidden flex-grow min-w-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={TRANSITIONS.RESTRAINED}
                className="absolute inset-0 flex items-center gap-8"
              >
                <Tabular className="text-lg font-medium tracking-wide text-gold">
                  {current.value}
                </Tabular>
                <Label className="text-[0.7rem] opacity-60 uppercase tracking-widest whitespace-nowrap">
                  {current.label}
                </Label>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={TRANSITIONS.IMMEDIATE}
            className={`px-4 py-1.5 border rounded-sm relative overflow-hidden group ${
              current.status === 'Closing' ? 'border-gold/30 bg-gold/5' : 'border-jade/30 bg-jade/5'
            }`}
          >
            <Label className={`text-[0.6rem] uppercase tracking-[0.2em] relative z-10 ${
              current.status === 'Closing' ? 'text-gold' : 'text-jade'
            }`}>
              {current.status}
            </Label>
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
