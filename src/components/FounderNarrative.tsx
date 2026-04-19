"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Display, Label, Body } from './Typography';
import Image from 'next/image';

const CREDENTIAL_BADGES = [
  { value: '40+', label: 'Years of Advisory' },
  { value: "Africa's Dealmaker", label: 'Industry Recognition' },
  { value: 'Est. 1984', label: 'Johannesburg' },
];

// Triple-set for seamless marquee loop
const INSTITUTIONS = [
  'BIAO',
  'Standard Bank',
  'Amro Bank',
  'UBS',
  'HSBC',
  'UK Government Advisory Committee',
  'Paris Club',
  'London Club',
  'DFI Network',
];

const NARRATIVE_SECTIONS = [
  {
    heading: 'Institutional Foundations',
    body: `Bruce Jewels's career began at the former Bank International de l'Afrique Occidentale (BIAO), one of the continent's oldest commercial banking institutions. He subsequently held senior positions at Amro Bank, UBS, HSBC, and Standard Bank — accumulating the kind of institutional depth that defines the world's most accomplished advisory practitioners.`,
  },
  {
    heading: 'Sovereign Connectivity',
    body: `In recognition of his expertise and continental relationships, Bruce was appointed to the British Government's Advisory Committee on African Trade and Investment. This appointment reflects both deep technical competence and the exceptional trust placed in him by governments and multilateral institutions.`,
  },
  {
    heading: "Africa's Dealmaker",
    body: `Over four decades, Bruce Jewels has cultivated an unmatched network across francophone and anglophone Africa alike — navigating the distinct regulatory, cultural, and political landscapes of each sub-region with precision.`,
  },
];

export const FounderNarrative = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Portrait counter-scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Image moves slightly slower than scroll = depth effect
  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="leadership" className="relative py-28 lg:pt-40 lg:pb-20 bg-[hsl(216_12%_8%)] overflow-hidden">
      {/* Section Header */}
      <div className="container mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Label className="text-[#00B4A6] tracking-[0.4em] text-[0.6rem] mb-4 block">
              Leadership
            </Label>
            <Display as="h2" className="text-white text-4xl md:text-5xl lg:text-7xl leading-tight max-w-xl">
              Bruce Jewels<br />
              <span className="italic font-light text-white/50">Founder &amp; Principal</span>
            </Display>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pb-2"
          >
            <Body className="text-white/60 text-lg leading-relaxed max-w-lg italic border-l border-[#00B4A6]/40 pl-6">
              Bruce Jewels leverages 40 years of institutional depth to bridge 
              global liquidity with Africa&apos;s most ambitious mandates.
            </Body>
          </motion.div>
        </div>
      </div>

      {/* Always-On Institution Marquee */}
      <div className="container mb-20">
        <div className="border-y border-white/5 py-8 overflow-hidden">
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-slow flex items-center gap-16 opacity-40 hover:opacity-70 transition-opacity duration-700">
              {[...INSTITUTIONS, ...INSTITUTIONS, ...INSTITUTIONS].map((inst, i) => (
                <React.Fragment key={i}>
                  <span className="font-display text-[0.7rem] md:text-xs uppercase tracking-[0.4em] text-white whitespace-nowrap shrink-0">
                    {inst}
                  </span>
                  <span className="text-[#00B4A6]/30 shrink-0 text-xs">◆</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Profile */}
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
        
        {/* Left: Portrait with parallax + Credential Badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-1 flex flex-col gap-10"
        >
          {/* Portrait with parallax depth */}
          <div
            ref={portraitRef}
            className="relative aspect-[3/4.5] bg-white/[0.03] p-1 border border-white/10 group overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ y: portraitY }}
            >
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80"
                alt="Bruce Jewels - Principal Advisor"
                width={800}
                height={1200}
                className="w-full h-[115%] object-cover grayscale brightness-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>
            {/* Design accents */}
            <div className="absolute top-4 right-4 text-white/20 font-mono text-[0.5rem] tracking-widest uppercase rotate-90 origin-right pointer-events-none">
              Principal Advisor
            </div>
            {/* Edge glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            {/* Hover teal tint */}
            <div className="absolute inset-0 bg-[#00B4A6]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>

          {/* Key Differentiators (Badges) */}
          <div className="grid grid-cols-1 gap-6">
            {CREDENTIAL_BADGES.map((badge, i) => (
              <div key={i} className="group/badge">
                <span className="font-display text-2xl text-white block group-hover/badge:text-[#00B4A6] transition-colors">
                  {badge.value}
                </span>
                <span className="text-[0.5rem] tracking-[0.3em] text-white/30 mt-1 block group-hover/badge:text-white/50 transition-colors">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Narrative Sections */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 flex flex-col gap-12"
        >
          {NARRATIVE_SECTIONS.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Subheading */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-[#00B4A6]/40" />
                <span className="text-[0.58rem] tracking-[0.3em] text-[#00B4A6]/70 font-semibold">
                  {section.heading}
                </span>
              </div>

              {i < NARRATIVE_SECTIONS.length - 1 ? (
                <p className="text-white/60 text-base leading-[1.85] font-light">
                  {section.body}
                </p>
              ) : (
                <>
                  <p className="text-white/60 text-base leading-[1.85] font-light">
                    Over four decades, Bruce Jewels has cultivated an unmatched network across francophone and anglophone Africa alike — navigating the distinct regulatory, cultural, and political landscapes of each sub-region with precision. He has opened dialogues, structured mandates, and delivered financing solutions in situations where others could not even secure a meeting.
                  </p>

                  {/* Pull-Quote Blockquote */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative border-l-2 border-[#00B4A6] pl-7 py-2 my-4"
                  >
                    <p className="font-display text-xl md:text-2xl text-white/85 italic leading-relaxed">
                      &ldquo;He has painstakingly peeled the layers of African institutions and governments to get to the decision-makers.&rdquo;
                    </p>
                    <footer className="mt-4 text-[0.52rem] tracking-[0.25em] text-white/30">
                      — Senior Counterparty, West African Sovereign Mandate
                    </footer>
                  </motion.blockquote>

                  <p className="text-white/60 text-base leading-[1.85] font-light">
                    It is this combination of institutional pedigree, sovereign network, and deal-closing acuity that defines the Africa Advisory platform.
                  </p>
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="container mt-16 h-px bg-gradient-to-r from-[#00B4A6]/25 via-white/5 to-transparent"
      />
    </section>
  );
};
