"use client";

import React, { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export const CorridorMap = () => {
  const container = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const nodes = [
    { id: 'west', cx: 300, cy: 450 },
    { id: 'east', cx: 700, cy: 500 },
    { id: 'south', cx: 550, cy: 850 },
    { id: 'north', cx: 500, cy: 150 },
    { id: 'central', cx: 500, cy: 500 }
  ];

  const pathways = [
    { from: 'north', to: 'central' },
    { from: 'west', to: 'central' },
    { from: 'east', to: 'central' },
    { from: 'south', to: 'central' },
    { from: 'west', to: 'south' },
    { from: 'east', to: 'south' }
  ];

  useGSAP(() => {
    if (!svgRef.current) return;

    // Path drawing animation scrubbed by scroll
    // Using fromTo for absolute precision in "silent luxury" motion
    gsap.fromTo(".pathway-line", 
      { 
        strokeDashoffset: 1000,
        opacity: 0,
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "none", // Scrubbing needs linear feel
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.5,
        }
      }
    );

    // Subtle node pulse entry
    gsap.from(".map-node", {
      scale: 0,
      opacity: 0,
      stagger: 0.2, // +0.1s
      duration: 2.0, // +0.5s
      ease: "power4.out",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 85%",
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 1000" 
        className="w-[120%] h-[120%] opacity-95"
      >
        {/* Africa Outline removed as requested */}

        {pathways.map((path, i) => {
          const fromNode = nodes.find(n => n.id === path.from)!;
          const toNode = nodes.find(n => n.id === path.to)!;
          
          return (
            <g key={i}>
              <path
                d={`M${fromNode.cx},${fromNode.cy} Q${(fromNode.cx + toNode.cx)/2 + 50},${(fromNode.cy + toNode.cy)/2} ${toNode.cx},${toNode.cy}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="pathway-line text-jade/10"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id} className="map-node">
            <circle
              cx={node.cx}
              cy={node.cy}
              r="4"
              className="fill-jade shadow-[0_0_10px_rgba(40,90,92,0.8)]"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="12"
              className="stroke-jade/30 fill-none"
            />
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-0 h-px bg-gold/20 blur-sm animate-scan-y pointer-events-none" />
    </div>
  );
};
