"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate, BezierDefinition } from 'framer-motion';

/**
 * Institutional Motion Tokens
 * Slow, precise, and deliberate.
 */
export const TRANSITIONS = {
  EXQUISITE: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as BezierDefinition }, // Quartic Out
  RESTRAINED: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as BezierDefinition },
  IMMEDIATE: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as BezierDefinition },
  SIGNAL: { duration: 5, ease: "linear" as const },
};

export const VARIANTS = {
  STAGGER_CONTAINER: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  RISE_REVEAL: {
    hidden: { 
      opacity: 0, 
      y: 16, 
      filter: 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: TRANSITIONS.RESTRAINED
    },
  },

  MASK_WIPE_V: {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: { 
      clipPath: 'inset(0 0 0% 0)',
      transition: TRANSITIONS.EXQUISITE
    },
  },

  MASK_WIPE_H: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      clipPath: 'inset(0 0% 0 0)',
      transition: TRANSITIONS.EXQUISITE
    },
  },
};

/**
 * Number Counter Component for tabular statistics.
 */
export const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

/**
 * Staggered Line/Word Reveal for headlines.
 */
export const StaggeredReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <motion.div 
      variants={VARIANTS.STAGGER_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1 transform-gpu">
          <motion.span 
            variants={VARIANTS.RISE_REVEAL}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
