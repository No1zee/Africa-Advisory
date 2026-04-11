"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { useUserTier } from '@/hooks/useUserTier';
import { Group, Display, Body, Label, Tabular } from './Typography';
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
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        duration: 4.0,
        ease: "power2.out",
        delay: 0.2
      }
    );

    // Stage 1: Cinematic Deceleration (Disabled on mobile to prevent stalling)
    if (isMobile) return;

    const video = innerVideoRef.current;
    if (video) {
      const handleMetadata = () => {
        const duration = video.duration;
        if (duration > 4) {
          const playbackProxy = { rate: 1.0 };
          gsap.to(playbackProxy, {
            rate: 0.1,
            duration: 4,
            delay: Math.max(0, duration - 4.5),
            ease: "power2.out",
            onUpdate: () => {
              if (video) {
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
    }
  }, { scope: videoRef, dependencies: [isMobile] });

  useEffect(() => {
    // Explicit play fallback for iOS Safari stricter autoplay policies
    const video = innerVideoRef.current;
    if (video) {
      const playVideo = () => {
        video.play().catch(error => {
          console.warn("Autoplay was blocked or failed", error);
        });
      };
      
      if (video.readyState >= 3) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
      }
    }
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-base-obsidian ${isMobile ? 'pt-20' : 'pt-32'}`}>
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
          loop
          preload="auto"
          poster="/assets/elephants.png"
          src="/assets/elephants-family.mp4"
          className="w-full h-full object-cover grayscale opacity-60"
        >
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
          <div className="flex flex-col items-center p-6 md:p-8 lg:p-12 w-full">
            {/* Stage 1: Keywords */}
            <h1 className="flex flex-col md:flex-row items-center justify-center gap-y-2 md:gap-x-4 lg:gap-x-8 mb-8 lg:mb-10 w-full overflow-hidden">
              {["Simple.", "Practical.", "Workable."].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.92,
                    delay: (isMobile ? 0.3 : 1.2) + (i * (isMobile ? 0.2 : 1.2)), 
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="display italic text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-secondary-parchment leading-tight whitespace-nowrap"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Stage 2 & 3: Staggered Subheadlines */}
            <div className="max-w-2xl mb-12 lg:mb-16 border-t border-gold/20 pt-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.3,
                  delay: isMobile ? 1.2 : 5.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Body className="text-lg md:text-xl lg:text-2xl text-gold/90 leading-snug mb-6">
                  We advise governments, investors, and enterprises on project finance, trade finance, debt resolution, and cross-border market execution across Africa.
                </Body>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: isMobile ? 1.8 : 7.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Body className="text-xs md:text-sm lg:text-base text-secondary-parchment/60 leading-relaxed max-w-xl mx-auto">
                  Welcome to Africa’s Dealmaker. With over four decades of specialised experience, we facilitate outcomes in markets requiring systemic navigation and sovereign connectivity.
                </Body>
              </motion.div>
            </div>

            {/* Stage 4: CTA Pair */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-md md:max-w-none">
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 2.2 : 8.5 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px hsla(var(--jade), 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-jade text-secondary-parchment font-body text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.4em] transition-all"
                onClick={() => {}}
              >
                Book a Consultation
                <div className="absolute -inset-1 border border-white/10 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
              </motion.button>
              
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 2.4 : 8.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 liquid-glass text-gold font-body text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.4em] border border-gold/20 hover:border-gold transition-all"
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
