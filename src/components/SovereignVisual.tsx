"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HUBS = [
  { id: 'jhb', x: 580, y: 820, name: 'Johannesburg', label: 'HQ' },
  { id: 'ldn', x: 450, y: 150, name: 'London', label: 'Financial' },
  { id: 'dxb', x: 680, y: 350, name: 'Dubai', label: 'GCC Corridor' },
  { id: 'szn', x: 880, y: 400, name: 'Shenzhen', label: 'Asia Corridor' },
  { id: 'nbi', x: 650, y: 550, name: 'Nairobi', label: 'EAC Hub' },
  { id: 'lag', x: 420, y: 520, name: 'Lagos', label: 'ECOWAS Hub' },
];

const CORRIDORS = [
  { from: 'jhb', to: 'nbi' },
  { from: 'nbi', to: 'dxb' },
  { from: 'jhb', to: 'lag' },
  { from: 'ldn', to: 'lag' },
  { from: 'dxb', to: 'szn' },
  { from: 'jhb', to: 'szn' },
];

export const SovereignVisual = () => {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] overflow-hidden group">
      {/* Intelligence Grid Background */}
      <div className="absolute inset-0 intelligence-grid" />
      
      {/* Moving Scanline */}
      <div className="scanline" />

      {/* Main SVG Visualization */}
      <svg viewBox="0 0 1000 1000" className="w-full h-full p-10 lg:p-20 opacity-80">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Abstract Continental Silhouette (Subtle) */}
        <path 
          d="M350,250 L550,200 L750,350 L850,550 L750,850 L550,950 L350,850 L200,650 L150,450 L250,300 Z" 
          className="fill-white/[0.02] stroke-white/[0.05]" 
          strokeWidth="1"
        />

        {/* Corridors / Lines */}
        {CORRIDORS.map((corridor, i) => {
          const from = HUBS.find(h => h.id === corridor.from)!;
          const to = HUBS.find(h => h.id === corridor.to)!;
          
          return (
            <motion.path 
              key={`${corridor.from}-${corridor.to}`}
              d={`M${from.x},${from.y} L${to.x},${to.y}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 4, delay: i * 0.5 + 1.5, ease: "easeInOut" }}
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              className="stroke-[#00B4A6]/30"
              filter="url(#glow)"
            />
          );
        })}

        {/* Hub Nodes */}
        {HUBS.map((hub, i) => (
          <g key={hub.id}>
            {/* Outer Pulse */}
            <motion.circle 
              cx={hub.x} 
              cy={hub.y} 
              r="12"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
              className="fill-[#00B4A6]/20"
            />
            
            {/* Core Node */}
            <motion.circle 
              cx={hub.x} 
              cy={hub.y} 
              r="3.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: i * 0.3 + 1, ease: "backOut" }}
              className="fill-[#00B4A6]"
            />

            {/* Hub Label (Removed for Minimalist Aesthetic) */}
          </g>
        ))}
      </svg>

      {/* Decorative Frame */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-[#00B4A6]/40" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-[#00B4A6]/40" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-[#00B4A6]/40" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-[#00B4A6]/40" />
      
      {/* Animated coordinates string */}
      <div className="absolute top-12 left-12 flex flex-col gap-1">
        <span className="text-[0.4rem] font-mono text-[#00B4A6]/60 tracking-widest uppercase">Network Status: Live</span>
        <div className="w-12 h-[1px] bg-[#00B4A6]/20" />
      </div>
    </div>
  );
};
