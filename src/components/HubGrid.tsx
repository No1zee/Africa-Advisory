"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Display, Label } from './Typography';

const HUBS = [
  {
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'SADC',
    role: 'Principal office and operations hub',
    coords: '26°12\'S · 28°02\'E',
    coordParts: { lat: '26°12\'S', lon: '28°02\'E' },
    badge: 'Est. 1984',
    description: 'Our founding headquarters and primary deal origination centre. Home to the continent\'s largest capital market infrastructure.',
  },
  {
    city: 'Lagos',
    country: 'Nigeria',
    region: 'ECOWAS',
    role: 'West Africa coverage',
    coords: '6°27\'N · 3°24\'E',
    coordParts: { lat: '6°27\'N', lon: '3°24\'E' },
    description: 'Gateway to the ECOWAS economic zone and Sub-Saharan Africa\'s largest economy. Critical for francophone and anglophone mandate coverage.',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    region: 'International',
    role: 'Capital markets & UK government advisory',
    coords: '51°30\'N · 0°07\'W',
    coordParts: { lat: '51°30\'N', lon: '0°07\'W' },
    description: 'Principal channel for international institutional capital, DFI engagement, and Bruce Jewels\'s British Government Advisory Committee mandates.',
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    region: 'EAC',
    role: 'East Africa coverage',
    coords: '1°17\'S · 36°49\'E',
    coordParts: { lat: '1°17\'S', lon: '36°49\'E' },
    description: 'Operations hub for East Africa\'s most dynamic emerging markets and access to the broader East African Community corridor.',
  },
];

const CORRIDOR_STATS = [
  { value: '$32B+', label: 'Capital Facilitated' },
  { value: '40+', label: 'Years Advisory' },
  { value: '14', label: 'Markets Served' },
  { value: '4', label: 'Primary Hubs' },
];

// Radar-terminal coordinate ticker component
function CoordTicker({ lat, lon }: { lat: string; lon: string }) {
  const GLITCH_CHARS = '0123456789°\'NSEW.·';
  const [displayLat, setDisplayLat] = useState(lat);
  const [displayLon, setDisplayLon] = useState(lon);
  const inView = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) inView.current = true; },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Run a glitchy decode sequence once on mount then periodically
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const scramble = (target: string, setter: (v: string) => void) => {
      let iter = 0;
      const max = target.length * 3;
      const id = setInterval(() => {
        setter(
          target
            .split('')
            .map((ch, i) => {
              if (i < iter / 3) return ch;
              if (ch === ' ' || ch === '·') return ch;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] ?? ch;
            })
            .join('')
        );
        iter++;
        if (iter > max) { clearInterval(id); setter(target); }
      }, 30);
    };

    const seq = () => {
      scramble(lat, setDisplayLat);
      const t = setTimeout(() => scramble(lon, setDisplayLon), 200);
      timeouts.push(t);
    };

    // Initial sequence after 600ms then every 8s
    const initial = setTimeout(seq, 600);
    const interval = setInterval(seq, 8000);
    timeouts.push(initial);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [lat, lon]);

  return (
    <span ref={ref} className="font-mono text-[0.48rem] text-white/20 tracking-[0.1em] coord-ticker">
      {displayLat} · {displayLon}
    </span>
  );
}

export const HubGrid = () => {
  return (
    <section id="network" className="relative py-28 lg:py-40 bg-[hsl(216_12%_6%)] overflow-hidden">
      {/* Subtle lat/lon grid lines — decorative */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] map-grid-pattern" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Label className="text-bronze tracking-[0.4em] text-[0.6rem] mb-4 block">
              Global Connectivity
            </Label>
            <Display as="h2" className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
              Pan-African<br />
              <span className="italic font-light text-white/60">Network Coverage</span>
            </Display>
          </motion.div>

          {/* Corridor Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 md:gap-10 lg:justify-end flex-wrap"
          >
            {CORRIDOR_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col border-l border-white/10 pl-6 first:border-0 first:pl-0">
                <span className="font-display text-3xl md:text-4xl text-bronze leading-none">
                  {stat.value}
                </span>
                <span className="text-[0.45rem] uppercase tracking-[0.2em] text-white/35 mt-2 font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* China–Africa Corridor Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group flex flex-col md:flex-row items-center justify-between border border-bronze/30 bg-bronze/5 px-8 py-10 mb-px overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bronze/40 to-transparent" />
          
          <div className="relative z-10 flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-12 h-12 border border-bronze/40 flex items-center justify-center text-bronze font-mono text-[0.65rem] shrink-0">
               COR
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-1">China–Africa Capital Access</h3>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[#00B4A6] font-semibold">
                Beijing · Hong Kong · Pan-African Hubs
              </p>
            </div>
          </div>
          
          <div className="relative z-10 text-left md:text-right md:max-w-md">
            <p className="text-white/60 text-sm leading-relaxed">
              Specialist connectivity bridging Asian institutional capital with 
              high-impact African project pipelines, facilitating bilateral liquidity 
              flows outside traditional banking frameworks.
            </p>
          </div>

          <div className="absolute -right-20 -top-20 w-64 h-64 bg-bronze/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>

        {/* Hub Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
        >
          {HUBS.map((hub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="hub-card group flex flex-col p-7 bg-[hsl(216_12%_6%)] hover:bg-[hsl(216_12%_9%)] transition-all duration-500 cursor-default relative overflow-hidden"
            >
              {/* Region pill + badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[0.48rem] uppercase tracking-[0.3em] text-bronze/60 border border-bronze/20 px-2.5 py-1">
                  {hub.region}
                </span>
                {hub.badge && (
                  <span className="text-[0.45rem] uppercase tracking-[0.2em] text-white/30 border border-white/10 px-2 py-1">
                    {hub.badge}
                  </span>
                )}
              </div>

              {/* Pin */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-bronze/60 text-xl leading-none mt-0.5">◦</span>
                <div>
                  <h3 className="font-display text-2xl text-white leading-none">{hub.city}</h3>
                  <p className="text-[0.5rem] uppercase tracking-[0.2em] text-white/30 mt-1">{hub.country}</p>
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">
                <span className="text-[0.52rem] uppercase tracking-[0.2em] text-bronze/70 font-semibold block mb-2">
                  {hub.role}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/40 text-[0.7rem] leading-relaxed">
                {hub.description}
              </p>

              {/* Coverage anchor */}
              <div className="mt-8 flex-1">
                <span className="text-[0.45rem] tracking-[0.25em] text-[#00B4A6]/60 uppercase font-semibold">
                  Coverage: {hub.region === 'SADC' ? 'Southern Africa Corridor' : 
                            hub.region === 'ECOWAS' ? 'West Africa Corridor' : 
                            hub.region === 'EAC' ? 'East Africa Corridor' : 
                            'Global Capital Corridors'} →
                </span>
              </div>

              {/* Radar coord footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <CoordTicker lat={hub.coordParts.lat} lon={hub.coordParts.lon} />
                <span className="w-1.5 h-1.5 rounded-full bg-bronze/40 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
