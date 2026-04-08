"use client";

import React, { useEffect, useRef } from 'react';

interface DensityDotsProps {
  className?: string;
  height?: number; 
  density?: number; 
  color?: string; 
}

export const DensityDots = ({ 
  className = "", 
  height = 400, 
  density = 0.8,
  color = "hsla(45, 100%, 80%, 0.3)" // gold-ish
}: DensityDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (rect.width === 0) return;

    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const dotSize = 1;
    const spacing = 4;
    const rows = Math.ceil(height / spacing);
    const cols = Math.ceil(rect.width / spacing);

    ctx.clearRect(0, 0, rect.width, height);
    ctx.fillStyle = color;

    for (let r = 0; r < rows; r++) {
      // Probability of dot decreases as we go down
      // Power curve for steep density at TOP, sparse at BOTTOM
      const densityFactor = Math.pow(1 - (r / rows), 3.5) * density;
      
      for (let c = 0; c < cols; c++) {
        if (Math.random() < densityFactor) {
          const x = c * spacing + (Math.random() * 2 - 1);
          const y = r * spacing + (Math.random() * 2 - 1);
          ctx.fillRect(x, r * spacing, dotSize, dotSize);
        }
      }
    }

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      if (newRect.width === 0) return;
      canvas.width = newRect.width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      ctx.clearRect(0, 0, newRect.width, height);
      ctx.fillStyle = color;
      const newCols = Math.ceil(newRect.width / spacing);
      for (let r = 0; r < rows; r++) {
        const factor = Math.pow(1 - (r / rows), 3.5) * density;
        for (let c = 0; c < newCols; c++) {
          if (Math.random() < factor) {
            ctx.fillRect(c * spacing, r * spacing, dotSize, dotSize);
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [height, density, color]);

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none h-[${height}px] ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-40 mix-blend-screen"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-base-obsidian to-transparent pointer-events-none" />
    </div>
  );
};
