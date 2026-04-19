"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArchitecturalGrid } from './ArchitecturalGrid';
import { Display, Body, Label } from './Typography';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { DensityDots } from './DensityDots';
import { CorridorMap } from './CorridorMap';

const HERO_STATS = [
  { value: '$32B+', label: 'Capital facilitated', end: 32, suffix: 'B+', prefix: '$' },
  { value: '40+',   label: 'Years of advisory',   end: 40, suffix: '+',  prefix: '' },
  { value: '14',    label: 'Markets served',       end: 14, suffix: '',   prefix: '' },
];

// Word-by-word animated headline
const HEADLINE_WORDS = ["Africa's", "Dealmaker."];

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

function CountUp({ end, prefix = '', suffix = '', duration = 1800, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayed, setDisplayed] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let startTime: number | null = null;
    const startVal = 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp + delay;
      if (timestamp < startTime) { requestAnimationFrame(tick); return; }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startVal + (end - startVal) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}{displayed}{suffix}
    </span>
  );
}

export const Hero = () => {
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // Trigger word reveal after blackout lifts
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => { window.removeEventListener('resize', checkMobile); clearTimeout(t); };
  }, []);

  useGSAP(() => {
    gsap.fromTo(bgContainerRef.current, 
      { filter: 'brightness(0) contrast(200%) blur(20px)', scale: 1.2 },
      { filter: 'brightness(0.4) contrast(100%) blur(0px)', opacity: 1, scale: 1.1, duration: 4.0, ease: "power2.out", delay: 0.5 }
    );

    const bgImage = bgContainerRef.current?.querySelector('img');
    if (bgImage) {
      gsap.to(bgImage, { opacity: 0.4, duration: 3, delay: 1.5, ease: "power1.inOut" });
    }
  }, { scope: bgContainerRef, dependencies: [isMobile] });

  return (
    <section className="relative h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-[hsl(216_12%_8%)]">
      {/* Density Grain Overlay */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
        <DensityDots height={600} density={0.9} />
      </div>

      {/* Background Image Layer */}
      <motion.div 
        ref={bgContainerRef}
        className="absolute inset-0 z-0 scale-[1.12] pointer-events-none origin-center"
        style={{ y: yParallax }}
      >
        <Image 
          src="/assets/elephants.png"
          alt="African Elephants"
          fill
          sizes="100vw"
          className="w-full h-full object-cover grayscale opacity-0"
          priority
        />
        <div className="absolute inset-0 bg-[hsl(216_12%_8%)]/40 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[hsl(216_12%_8%)] to-transparent opacity-80" />
      </motion.div>

      {/* Topographic Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden"
      >
        <Image 
          src="/assets/hero.png" 
          alt="Architectural Topography" 
          fill
          sizes="100vw"
          className="object-cover opacity-80 contrast-125 saturate-0"
          priority
        />
      </motion.div>

      <ArchitecturalGrid />
      
      {/* Corridor Map */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ 
          opacity: { duration: 2.5, delay: 1.0, ease: "easeInOut" },
          scale: { duration: 25, ease: "linear" }
        }}
        className="absolute inset-x-0 top-0 h-full z-0 pointer-events-none overflow-hidden"
      >
        <CorridorMap />
      </motion.div>

      {/* Blackout Curtain */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 z-[100] bg-[hsl(216_12%_8%)] pointer-events-none"
      />

      {/* Hero Content */}
      <div id="home" className="container relative z-10 flex flex-col justify-center min-h-[100dvh] px-4">
        <div className="flex flex-col items-center justify-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center max-w-4xl text-center"
          >
            {/* Eyebrow */}
            <Label className="text-[#00B4A6] tracking-[0.4em] text-[0.65rem] mb-6 block font-bold">
              TRADE & PROJECT FINANCE ADVISORY
            </Label>

            {/* Headline */}
            <h1 className="text-white text-5xl md:text-8xl lg:text-[7.5rem] mb-8 leading-[0.9] tracking-tighter font-semibold italic text-center font-display">
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={word}
                  className={`word-reveal mr-[0.18em] inline-block ${isReady ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    animationDelay: isReady ? `${i * 0.18}s` : '0s',
                    animationPlayState: isReady ? 'running' : 'paused',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
 
            {/* Subheadline — re-centered */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Body className="text-white/60 text-lg md:text-xl max-w-[55ch] mb-12 leading-relaxed text-center mx-auto">
                40 years of specialised experience facilitating sovereign and institutional mandates 
                across the African continent, with over $32 billion in capital structured.
              </Body>
            </motion.div>
 
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 mt-4 mb-20 w-full sm:w-auto justify-center">
              <div
                className={`blade-wipe ${isReady ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.75s', animationPlayState: isReady ? 'running' : 'paused' }}
              >
                <a
                  href="#mandates"
                  className="block bg-[#00B4A6] text-white px-12 py-5 text-[0.7rem] tracking-[0.2em] uppercase font-bold hover:bg-[#00D1C1] transition-colors duration-200 text-center"
                >
                  View Mandates
                </a>
              </div>
              <div
                className={`blade-wipe ${isReady ? '' : 'opacity-0'}`}
                style={{ animationDelay: '0.9s', animationPlayState: isReady ? 'running' : 'paused' }}
              >
                <a
                  href="#contact"
                  className="block border border-white/20 text-white/80 px-12 py-5 text-[0.7rem] tracking-[0.2em] uppercase hover:border-[#00B4A6] hover:text-white transition-colors duration-200 text-center"
                >
                  Schedule Advisory Call →
                </a>
              </div>
            </div>
 
            {/* Stats Band */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl border-t border-white/10 pt-10 grid grid-cols-3 gap-12"
            >
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl md:text-5xl font-bold text-white leading-none mb-2">
                    <CountUp
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={1600}
                      delay={i * 200}
                    />
                  </p>
                  <p className="font-body text-[0.6rem] tracking-[0.2em] text-white/40 uppercase leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
