"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 'jhb', x: 550, y: 850, name: 'Johannesburg', region: 'ZA' },
  { id: 'nbi', x: 650, y: 550, name: 'Nairobi', region: 'KE' },
  { id: 'ctn', x: 420, y: 520, name: 'Cotonou', region: 'BJ' },
  { id: 'szn', x: 850, y: 350, name: 'Shenzhen', region: 'CN' },
  { id: 'lag', x: 440, y: 530, name: 'Lagos', region: 'NG' },
];

import { TRANSITIONS } from './Motion';

export const NetworkMap = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-square md:aspect-video bg-surface-dark/30 rounded-lg overflow-hidden border border-foreground/5 group"
    >
      <motion.div 
        animate={{ 
          x: mousePos.x * 15, 
          y: mousePos.y * 15,
          rotateX: mousePos.y * -5,
          rotateY: mousePos.x * 5
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="w-full h-full perspective-1000"
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-accent/20 fill-none">
          {/* Simple Africa Outline (Abstracted) */}
          <path 
            d="M350,150 L550,100 L750,250 L850,450 L750,850 L550,950 L350,850 L200,650 L150,400 L250,200 Z" 
            className="stroke-foreground/10" 
            strokeWidth="1" 
          />
          
          {/* Corridor Lines */}
          <motion.path 
            d="M550,850 Q600,700 650,550" 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            strokeWidth="0.5"
            className="stroke-jade/40"
          />
          <motion.path 
            d="M650,550 Q750,450 850,350" 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
            strokeWidth="0.5"
            className="stroke-jade/40"
          />
          <motion.path 
            d="M550,850 Q450,700 420,520" 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, delay: 2, ease: "easeInOut" }}
            strokeWidth="0.5"
            className="stroke-jade/40"
          />

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.circle 
                cx={node.x} 
                cy={node.y} 
                r="3" 
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
                className="fill-jade" 
              />
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="8" 
                className="stroke-jade/20 stroke-[0.5]" 
              />
            </g>
          ))}
        </svg>
      </motion.div>
      
      {/* Reactive Overlay */}
      <motion.div 
        animate={{
          background: `radial-gradient(circle 200px at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, hsla(var(--jade), 0.1), transparent)`
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
      />
      
      <style jsx>{`
        @keyframes jade-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .animate-jade-pulse {
          animation: jade-pulse 2s infinite alternate;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};
