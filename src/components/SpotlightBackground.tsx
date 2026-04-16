"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  image?: string;
  active: boolean;
  blur?: number;
  opacity?: number;
  grayscale?: boolean;
}

export const SpotlightBackground: React.FC<Props> = ({ 
  image, 
  active, 
  blur = 20, 
  opacity = 0.4,
  grayscale = true 
}) => {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity: 0, filter: `blur(${blur}px) grayscale(${grayscale ? 1 : 0})` }}
          animate={{ opacity: opacity, filter: `blur(0px) grayscale(${grayscale ? 1 : 0})` }}
          exit={{ opacity: 0, filter: `blur(${blur}px) grayscale(${grayscale ? 1 : 0})` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {image && (
            <img 
              src={image} 
              alt="Contextual Background" 
              className="w-full h-full object-cover scale-110" 
            />
          )}
          <div className="absolute inset-0 bg-base-obsidian/40 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-base-obsidian to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
