"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { useUserTier } from '@/hooks/useUserTier';
import { Group, Display, Body, Label, Tabular, Sovereign } from './Typography';
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
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  
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
        opacity: 1,
        scale: 1.1,
        duration: 4.0,
        ease: "power2.out",
        delay: 0.5
      }
    );

    // Reveal video content subtly
    gsap.to(innerVideoRef.current, {
      opacity: 0.4,
      duration: 3,
      delay: 1.5,
      ease: "power1.inOut"
    });

    // Stage 1: Cinematic Deceleration removed as per user request to prevent stall at the end.
    // Video will now loop at constant speed (playbackRate = 1.0).
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
    <section className="relative h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-base-obsidian">
      {/* Density Grain Overlay */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
        <DensityDots height={600} density={0.9} />
      </div>

      {/* Background Video Layer - Scaled and cropped to hide watermarks */}
      <motion.div 
        ref={videoRef}
        className="absolute inset-0 z-0 scale-[1.12] pointer-events-none origin-center"
        style={{ 
          y: yParallax,
          clipPath: 'inset(0 0 5% 0)' // Crop bottom 5% to hide watermarks
        }}
      >
        <video 
          ref={innerVideoRef}
          autoPlay 
          muted 
          playsInline 
          onEnded={() => setIsVideoEnded(true)}
          preload="auto"
          src="/assets/elephants-family.mp4"
          className="w-full h-full object-cover grayscale opacity-0"
        >
        </video>
        {/* Abstract Topography Overlay Support */}
        <div className="absolute inset-0 bg-base-obsidian/40 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-base-obsidian to-transparent opacity-80" />
      </motion.div>

      {/* Background Texture: Orbital Topography */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoEnded ? 0 : 0.3 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
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
          opacity: isVideoEnded ? 0 : 1,
          scale: 1.05
        }}
        transition={{ 
          opacity: { duration: isVideoEnded ? 2.5 : 2.5, delay: isVideoEnded ? 0 : 1.0, ease: "easeInOut" },
          scale: { duration: 25, ease: "linear" }
        }}
        className="absolute inset-x-0 top-0 h-full z-0 pointer-events-none overflow-hidden"
        style={{ y: useScroll().scrollYProgress.get() * -100 }}
      >
        <CorridorMap />
      </motion.div>

      {/* Directorial Blackout Curtain (Prevents flashes) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 z-[100] bg-base-obsidian pointer-events-none"
      />

      <div className="container relative z-10 editorial-grid">
        <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex flex-col items-center text-center">
          <div className="flex flex-col items-center p-6 md:p-8 lg:p-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 1 }}
              className="mb-12"
            >
              <Sovereign>Africa's Dealmaker</Sovereign>
            </motion.div>

            {/* Stage 1: Keywords using Pretext for S-tier rendering */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-y-10 md:gap-x-10 mb-20 w-full px-4 overflow-visible">
              {[
                { text: "Simple.", weight: 900, num: "01" },
                { text: "Practical.", weight: 600, num: "02" },
                { text: "Workable.", weight: 400, num: "03" }
              ].map((word, i) => (
                <div key={word.text} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.6 + (i * 0.2) }}
                    className="mb-4"
                  >
                    <Tabular className="text-[0.6rem] md:text-[0.7rem] text-brand-teal font-mono tracking-[0.4em] opacity-60">
                      [{word.num}]
                    </Tabular>
                  </motion.div>
                  <PretextHaloHeading 
                    text={word.text}
                    font={`italic ${word.weight} clamp(3.5rem, 8vw, 7rem) Inter, sans-serif`}
                    textColor="hsla(var(--secondary-parchment), 0.95)"
                    haloColor="hsla(var(--jade), 0.15)"
                    letterSpacing={-2}
                    className="decrypt-animation"
                  />
                </div>
              ))}
            </div>

            {/* Stage 2 & 3: Staggered Subheadlines */}
            <div className="max-w-2xl mb-12 lg:mb-16 border-t border-gold/20 pt-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.3,
                  delay: isMobile ? 2.5 : 6.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Display as="h2" className="text-xl md:text-3xl lg:text-4xl text-secondary-parchment italic font-light leading-snug mb-8">
                  Solutions driven trade and project finance
                </Display>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: isMobile ? 3.0 : 7.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Body className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl mx-auto tracking-wide">
                  Based on 40 years of specialised experience, Africa Advisory has rapidly gained the reputation as the professional in inter and intra Africa financing and business facilitation consultancy.
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
                AFRICAN SOLUTIONS FOR AFRICA
                <div className="absolute -inset-1 border border-white/10 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
              </motion.button>
              
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 2.4 : 8.8 }}
                whileHover={{ scale: 1.02, borderColor: '#C9A96E' }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 liquid-glass text-white/90 font-body text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.4em] border border-white/40 hover:text-gold transition-all"
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
