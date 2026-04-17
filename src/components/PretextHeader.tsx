"use client";

import React, { useRef, useEffect, useState } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface Props {
  text: string;
  fontFamily?: string;
  fontSize?: number;
  className?: string;
  maxWidth?: number;
  lineHeight?: number;
  color?: string;
  italic?: boolean;
}

export const PretextHeader: React.FC<Props> = ({
  text,
  fontFamily = "Instrument Serif, serif",
  fontSize = 84,
  className = "",
  maxWidth = 1200,
  lineHeight = 1.1,
  color = "currentColor",
  italic = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFontReady, setIsFontReady] = useState(false);

  // Check if target font is loaded
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        setIsFontReady(true);
      });
    } else {
      setIsFontReady(true);
    }
  }, []);

  // Update container style to avoid JSX inline styles lint
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.minHeight = `${fontSize * lineHeight}px`;
    }
  }, [fontSize, lineHeight]);

  useEffect(() => {
    if (!isFontReady || !canvasRef.current || !text) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Handling
    const dpr = window.devicePixelRatio || 1;
    const fontSpec = `${italic ? 'italic ' : ''}${fontSize}px ${fontFamily}`;
    
    // 1. Pretext: Prepare & Layout
    const prepared = prepareWithSegments(text, fontSpec);
    const { lines, height } = layoutWithLines(prepared, maxWidth, fontSize * lineHeight);
    const width = Math.max(...lines.map(line => line.width));

    // Set logical and physical dimensions
    canvas.width = (width || maxWidth) * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width || maxWidth}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.font = fontSpec;
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;

    // 2. Render Lines
    lines.forEach((line, i) => {
      ctx.fillText(line.text, 0, i * fontSize * lineHeight);
    });

  }, [text, isFontReady, fontSize, fontFamily, maxWidth, lineHeight, color, italic]);

  return (
    <div 
      ref={containerRef}
      className={`relative group/pretext inline-block min-w-[1em] ${className}`}
    >
      {/* Visual Canvas Render */}
      <canvas 
        ref={canvasRef} 
        className={`max-w-full h-auto select-none transition-opacity duration-700 ${isFontReady ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      
      {/* SEO & Screen Reader Fallback */}
      <div className="sr-only">
        <h2>{text}</h2>
      </div>
    </div>
  );
};
