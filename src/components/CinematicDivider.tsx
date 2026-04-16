"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Display, Label } from './Typography';
import { TRANSITIONS } from './Motion';

export const CinematicDivider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[80dvh] w-full overflow-hidden bg-base-obsidian border-y border-white/5"
    >
      {/* Cinematic Background Video */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <video 
          autoPlay 
          muted 
          playsInline 
          loop 
          src="/assets/elephants-family.mp4" 
          className="w-full h-full object-cover grayscale opacity-50 contrast-125 saturate-[0.2]"
        />
        <div className="absolute inset-0 bg-base-obsidian/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-base-obsidian via-transparent to-base-obsidian opacity-80" />
      </motion.div>

      {/* Narrative Overlay */}
      <div className="container relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.div 
          style={{ opacity, y: textY }}
          className="max-w-3xl"
        >
          <Label className="text-brand-teal mb-6 uppercase tracking-[0.5em] font-semibold opacity-60">
            The Continental Metaphor
          </Label>
          <Display as="h2" className="text-4xl md:text-6xl text-secondary-parchment italic font-light leading-tight">
            Navigating the <br />
            <span className="opacity-70">Inscrutable.</span>
          </Display>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-px bg-brand-teal/40 mx-auto mt-12"
          />
        </motion.div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute right-[10%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white/5" />
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-white/5" />
      </div>
    </section>
  );
};
