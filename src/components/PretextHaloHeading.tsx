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

      // RESOLVE COLORS: Canvas doesn't understand var()
      const resolveColor = (colorStr: string) => {
        if (colorStr.includes('var(')) {
          // Create a dummy element to resolve CSS variable
          const dummy = document.createElement('div');
          dummy.style.color = colorStr;
          document.body.appendChild(dummy);
          const resolved = window.getComputedStyle(dummy).color;
          document.body.removeChild(dummy);
          return resolved;
        }
        return colorStr;
      };

      const activeTextColor = resolveColor(textColor);
      const activeHaloColor = resolveColor(haloColor);

      // RESOLVE FONT: Canvas doesn't support 'clamp()' or 'vw' units in ctx.font
      containerRef.current.style.font = font;
      const computedStyle = window.getComputedStyle(containerRef.current);
      const activeFont = computedStyle.font || font;
      const activeFontSize = parseFloat(computedStyle.fontSize);
      const activeLineHeight = propLineHeight || activeFontSize * 1.2;

      const dpr = window.devicePixelRatio || 1;
      // For display keywords, we want to AVOID wrapping. 
      // We'll use a very large maxWidth unless propMaxWidth is explicitly small.
      const effectiveMaxWidth = propMaxWidth || 2000; 

      const prepared = prepareWithSegments(text, activeFont);
      const { lines, height } = layoutWithLines(prepared, effectiveMaxWidth, activeLineHeight);

      // Find the actual widest line to avoid canvas being too wide
      const ctxMeasure = canvasRef.current.getContext('2d');
      let actualMaxWidth = 0;
      if (ctxMeasure) {
        ctxMeasure.font = activeFont;
        lines.forEach(line => {
          actualMaxWidth = Math.max(actualMaxWidth, ctxMeasure.measureText(line.text).width);
        });
      }
      const finalWidth = Math.min(effectiveMaxWidth, actualMaxWidth + 20); // Add small padding

      const blurPadding = 120; // Enough space for shadowBlur = 100
      const canvasWidth = finalWidth + (blurPadding * 2);
      const canvasHeight = height + (blurPadding * 2);

      canvasRef.current.width = canvasWidth * dpr;
      canvasRef.current.height = canvasHeight * dpr;
      canvasRef.current.style.width = `${canvasWidth}px`;
      canvasRef.current.style.height = `${canvasHeight}px`;

      ctx.scale(dpr, dpr);
      ctx.font = activeFont;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';

      if (letterSpacing) {
        (ctx as any).letterSpacing = `${letterSpacing}px`;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Render Halo (Atmospheric Glow)
      ctx.shadowBlur = 100;
      ctx.shadowColor = activeHaloColor;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].text, canvasWidth / 2, i * activeLineHeight + blurPadding);
      }

      // Render Foreground
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = activeTextColor;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i].text, canvasWidth / 2, i * activeLineHeight + blurPadding);
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
