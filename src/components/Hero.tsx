"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { useUserTier } from '@/hooks/useUserTier';
import { Display, Body, Label, Tabular } from './Typography';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const PretextHaloHeading = dynamic(
  () => import('./PretextHaloHeading').then((mod) => mod.PretextHaloHeading),
  { ssr: false }
);
import { DensityDots } from './DensityDots';
import { CorridorMap } from './CorridorMap';

import { TRANSITIONS, VARIANTS, Counter, StaggeredReveal } from './Motion';

export const Hero = () => {
  const { tier } = useUserTier();
  const videoRef = useRef<HTMLDivElement>(null);
  const innerVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useGSAP(() => {
    // Stage 0: Directorial Reveal (Exposure/Bloom)
    gsap.fromTo(videoRef.current, 
      { 
        filter: 'brightness(0) contrast(200%) blur(20px)',
        scale: 1.2,
      },
      { 
        filter: 'brightness(0.4) contrast(100%) blur(0px)',
        scale: 1.1,
        duration: 4.0, // +0.5s
        ease: "power2.out",
        delay: 0.2
      }
    );

    // Stage 1: Cinematic Deceleration
    const video = innerVideoRef.current;
    if (video) {
      const handleMetadata = () => {
        const duration = video.duration;
        // Slow down starting 4 seconds before the end
        if (duration > 4) {
          const playbackProxy = { rate: 1.0 };
          gsap.to(playbackProxy, {
            rate: 0.1, // Safe target
            duration: 4,
            delay: Math.max(0, duration - 4.5),
            ease: "power2.out",
            onUpdate: () => {
              if (video) {
                // Enforce browser-supported floor (typically 0.0625)
                video.playbackRate = Math.max(0.0625, playbackProxy.rate);
              }
            },
            onComplete: () => {
              video.pause();
            }
          });
        }
      };

      if (video.readyState >= 1) {
        handleMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleMetadata);
      }
    }
  }, { scope: videoRef });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-base-obsidian pt-32">
      {/* Density Grain Overlay */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
        <DensityDots height={600} density={0.9} />
      </div>

      {/* Background Video Layer */}
      <motion.div 
        ref={videoRef}
        className="absolute inset-0 z-0 scale-110 pointer-events-none"
        style={{ y: yParallax }}
      >
        <video 
          ref={innerVideoRef}
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale"
        >
          <source src="/assets/elephants-family.mp4" type="video/mp4" />
        </video>
        {/* Abstract Topography Overlay Support */}
        <div className="absolute inset-0 bg-base-obsidian/40 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-base-obsidian to-transparent opacity-80" />
      </motion.div>

      {/* Background Texture: Orbital Topography */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden"
      >
        <img 
          src="/assets/hero.png" 
          alt="Topography" 
          className="w-full h-full object-cover opacity-80 contrast-125 saturate-0"
        />
      </motion.div>

      <ArchitecturalGrid />
      
      {/* Focal Artifact: Corridor Map Execution Pathways */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1, 1, 1.05]
        }}
        transition={{ 
          duration: 9.5, 
          delay: 0.5,
          times: [0, 0.1, 0.9, 1],
          ease: "easeInOut"
        }}
        className="absolute inset-x-0 top-0 h-full z-0 pointer-events-none overflow-hidden"
        style={{ y: useScroll().scrollYProgress.get() * -100 }}
      >
        <CorridorMap />
      </motion.div>

      <div className="container relative z-10 editorial-grid">
        <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex flex-col items-center text-center">
          <div className="flex flex-col items-center p-8 lg:p-12 w-full">
            {/* Stage 1: Keywords */}
            <h1 className="flex flex-wrap justify-center gap-x-4 lg:gap-x-8 mb-6 lg:mb-10">
              {["Simple.", "Practical.", "Workable."].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.92,
                    delay: 1.2 + (i * 1.2), // Rhythmic micropause
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="display italic text-5xl md:text-7xl lg:text-9xl text-secondary-parchment leading-tight"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Stage 2 & 3: Staggered Subheadlines */}
            <div className="max-w-2xl mb-12 lg:mb-16 border-t border-gold/20 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.3,
                  delay: 5.4, // Pause after keywords
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Body className="text-xl lg:text-2xl text-gold/90 leading-snug mb-6">
                  We advise governments, investors, and enterprises on project finance, trade finance, debt resolution, and cross-border market execution across Africa.
                </Body>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 7.2, // Secondary pause
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Body className="text-sm lg:text-base text-secondary-parchment/60 leading-relaxed max-w-xl mx-auto">
                  Welcome to Africa’s Dealmaker. With over four decades of specialised experience, we facilitate outcomes in markets requiring systemic navigation and sovereign connectivity.
                </Body>
              </motion.div>
            </div>

            {/* Stage 4: CTA Pair */}
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8">
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 8.5 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px hsla(var(--jade), 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 bg-jade text-secondary-parchment font-body text-[0.7rem] uppercase tracking-[0.4em] transition-all"
                onClick={() => {}}
              >
                Book a Consultation
                <div className="absolute -inset-1 border border-white/10 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
              </motion.button>
              
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 8.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 liquid-glass text-gold font-body text-[0.7rem] uppercase tracking-[0.4em] border border-gold/20 hover:border-gold transition-all"
                onClick={() => {}}
              >
                View Mandates
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
