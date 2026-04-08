"use client";

import React, { useEffect, useRef, useState } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface Props {
  text: string;
  font: string;
  maxWidth?: number;
  lineHeight?: number;
  haloColor?: string;
  textColor?: string;
  className?: string;
  letterSpacing?: number;
}

export const PretextHaloHeading: React.FC<Props> = ({
  text,
  font,
  maxWidth: propMaxWidth,
  lineHeight: propLineHeight, // Make optional to auto-calculate
  haloColor = 'rgba(243, 238, 234, 0.85)',
  textColor = '#4a3728', 
  className = '',
  letterSpacing = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setMeasuredWidth(width);
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || measuredWidth === 0) return;

    let timeoutId: NodeJS.Timeout;

    const render = () => {
      if (!canvasRef.current || measuredWidth === 0 || !containerRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // RESOLVE FONT: Canvas doesn't support 'clamp()' or 'vw' units in ctx.font
      // We resolve it by setting the font on a hidden parent and reading the computed style
      containerRef.current.style.font = font;
      const computedStyle = window.getComputedStyle(containerRef.current);
      const activeFont = computedStyle.font || font;
      const activeFontSize = parseFloat(computedStyle.fontSize);
      const activeLineHeight = propLineHeight || activeFontSize * 1.2;

      const dpr = window.devicePixelRatio || 1;
      const effectiveMaxWidth = propMaxWidth ? Math.min(propMaxWidth, measuredWidth) : measuredWidth;

      const prepared = prepareWithSegments(text, activeFont);
      const { lines, height } = layoutWithLines(prepared, effectiveMaxWidth, activeLineHeight);

      canvasRef.current.width = effectiveMaxWidth * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${effectiveMaxWidth}px`;
      canvasRef.current.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      ctx.font = activeFont;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      if (letterSpacing) {
        (ctx as any).letterSpacing = `${letterSpacing}px`;
      }

      ctx.clearRect(0, 0, effectiveMaxWidth, height);

      // Render Halo
      ctx.shadowBlur = 40;
      ctx.shadowColor = haloColor;
      ctx.fillStyle = haloColor; 
      for (let i = 0; i < lines.length; i++) {
        // Use activeLineHeight for drawing positions
        ctx.fillText(lines[i].text, effectiveMaxWidth / 2, i * activeLineHeight);
        ctx.fillText(lines[i].text, effectiveMaxWidth / 2, i * activeLineHeight);
      }

      // Render Foreground
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = textColor;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].text, effectiveMaxWidth / 2, i * activeLineHeight);
      }

      setIsReady(true);
    };

    timeoutId = setTimeout(render, 100);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        clearTimeout(timeoutId);
        render();
      });
    }

    return () => clearTimeout(timeoutId);
  }, [mounted, text, font, propMaxWidth, measuredWidth, propLineHeight, haloColor, textColor, letterSpacing]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full flex justify-center overflow-visible">
      <canvas 
        ref={canvasRef} 
        className={`block transition-opacity duration-1000 ${isReady ? 'opacity-100 animate-decrypt' : 'opacity-0'} ${className}`} 
      />
    </div>
  );
};
