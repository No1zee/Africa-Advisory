"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Display, Label, Tabular, Body, Sovereign } from './Typography';
import { VARIANTS, TRANSITIONS } from './Motion';
import { SpotlightBackground } from './SpotlightBackground';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MANDATES = [
  {
    size: "$1.2B",
    sector: "Energy & Infrastructure",
    geography: "West Africa",
    outcome: "Sovereign debt restructuring and emergency capital injection for state utility.",
    year: "2024",
    image: "/assets/spotlight-1.png"
  },
  {
    size: "$820M",
    sector: "Transport & Logistics",
    geography: "East Africa",
    outcome: "Financial close on Public-Private Partnership for regional rail corridor.",
    year: "2023",
    image: "/assets/spotlight-2.png"
  },
  {
    size: "$450M",
    sector: "Commodities & Trade",
    geography: "Multi-Regional",
    outcome: "Structured cross-border trade finance facility for agricultural exports.",
    year: "2024",
    image: "/assets/spotlight-3.png"
  },
  {
    size: "$150M",
    sector: "ICT",
    geography: "Pan-African",
    outcome: "Debt financing for rapid deployment of high-speed telecommunications infrastructure.",
    year: "2023",
    image: "/assets/hero-bg.png"
  }
];

export const SelectedMandates = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Exit animation for the intro text - slowed down and more graceful
    gsap.to(introRef.current, {
      scrollTrigger: {
        trigger: ".mandate-session-0",
        start: "top 150%", // Start earlier due to buffer
        end: "top 60%",
        scrub: 1, // Higher scrub value for more "weight"
      },
      opacity: 0,
      scale: 1.1,
      filter: "blur(15px)",
      y: -20,
      ease: "power1.inOut"
    });

    // 2. Softened Glow Transition (replaces violent flash)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mandate-session-0",
        start: "top 120%", 
        end: "top 40%",
        scrub: 1.5,
      }
    });

    tl.to(flashRef.current, { 
      opacity: 0.7, // Cap opacity for a 'softer' feel
      duration: 0.5, 
      ease: "power2.in" 
    })
    .to(flashRef.current, { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.out" 
    });

    // 3. Individual session reveal
    const sections = gsap.utils.toArray('.mandate-session');
    sections.forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => gsap.to(section, { opacity: 1, duration: 1 }),
        onLeaveBack: () => gsap.to(section, { opacity: 0.5, duration: 1 }),
      });
    });
  }, { scope: containerRef });

  return (
    <section id="mandates" ref={containerRef} className="bg-base-obsidian relative">
      {/* Softened Transition Glow */}
      <div 
        ref={flashRef}
        className="fixed inset-0 bg-secondary-parchment/60 pointer-events-none z-[100] opacity-0 backdrop-blur-sm"
      />

      <div 
        ref={introRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none z-20"
      >
        <div className="container px-6 text-center">
            <Display className="text-3xl md:text-5xl lg:text-6xl text-secondary-parchment leading-tight">
                Africa Advisory,<br className="hidden md:block" /> Africa's Dealmaker
            </Display>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1px] bg-brand-teal/40 mx-auto mt-12"
            />
        </div>
      </div>

      {/* Transition Buffer to make user scroll slightly longer */}
      <div className="h-[60vh] md:h-[80vh] pointer-events-none" />

      {MANDATES.map((mandate, i) => (
        <div 
          key={i} 
          className={`mandate-session mandate-session-${i} relative min-h-screen flex items-center justify-center overflow-hidden border-t border-white/5`}
        >
          <SpotlightBackground 
            image={mandate.image} 
            active={true} 
            opacity={0.5}
            blur={10}
          />
          
          <div className="container relative z-10 px-6 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20%" }}
                transition={TRANSITIONS.EXQUISITE}
              >
                <div className="mb-8 flex flex-col items-center">
                    <Tabular className="text-5xl md:text-7xl lg:text-9xl text-gold mb-2 [text-shadow:0_4px_12px_rgba(0,0,0,0.8)] mask-reveal">
                        {mandate.size}
                    </Tabular>
                    <Sovereign className="text-brand-teal tracking-[0.5em] [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">{mandate.sector}</Sovereign>
                </div>
                
                <Body className="text-lg md:text-xl lg:text-2xl text-secondary-parchment/90 mb-10 leading-relaxed max-w-2xl">
                  {mandate.outcome}
                </Body>

                <div className="flex items-center justify-center gap-6 opacity-40">
                    <Label>{mandate.geography}</Label>
                    <div className="w-1 h-1 bg-jade rounded-full" />
                    <Label>{mandate.year}</Label>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Rhythmic Closer */}
      <div className="h-[50vh] flex items-center justify-center bg-gradient-to-b from-transparent to-base-obsidian">
      </div>
    </section>
  );
};
