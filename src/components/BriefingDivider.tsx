"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Label } from './Typography';

interface BriefingDividerProps {
  label?: string;
  className?: string;
}

export const BriefingDivider = ({ 
  label = "", 
  className = "" 
}: BriefingDividerProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full py-12 lg:py-20 flex flex-col gap-4 overflow-hidden ${className}`}>
      <div className="flex justify-between items-center px-4 md:px-8">
        <motion.div
           initial={{ opacity: 0, x: -10 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-jade animate-pulse" />
          <Label className="text-[0.55rem] tracking-[0.3em] font-mono text-gold/60">{label}</Label>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left center" }}
        className="h-[0.5px] w-full bg-gold/20"
      />
      
    </div>
  );
};
