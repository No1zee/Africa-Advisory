"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
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

// ─── Main-thread fallback renderer ────────────────────────────────────────────
// Used when OffscreenCanvas / Worker is unavailable (old browsers, SSR guard).
function renderOnMainThread(
  canvas: HTMLCanvasElement,
  text: string,
  fontFamily: string,
  fontSize: number,
  maxWidth: number,
  lineHeight: number,
  color: string,
  italic: boolean
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const fontSpec = `${italic ? 'italic ' : ''}${fontSize}px ${fontFamily}`;

  const prepared = prepareWithSegments(text, fontSpec);
  const { lines, height } = layoutWithLines(prepared, maxWidth, fontSize * lineHeight);

  const width =
    lines && lines.length > 0
      ? Math.max(...lines.map((l) => l.width))
      : maxWidth;

  canvas.width = (width || maxWidth) * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width || maxWidth}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  ctx.font = fontSpec;
  ctx.textBaseline = 'top';
  ctx.fillStyle = color;

  lines.forEach((line, i) => {
    ctx.fillText(line.text, 0, i * fontSize * lineHeight);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export const PretextHeader: React.FC<Props> = React.memo(({
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
  const workerRef = useRef<Worker | null>(null);
  const offscreenTransferred = useRef(false);
  const [isFontReady, setIsFontReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [useWorker, setUseWorker] = useState(false);

  // Detect OffscreenCanvas support once on mount
  useEffect(() => {
    setMounted(true);
    const supportsOffscreen =
      typeof OffscreenCanvas !== 'undefined' &&
      typeof Worker !== 'undefined';
    setUseWorker(supportsOffscreen);

    if (typeof window !== 'undefined' && 'fonts' in document) {
      (document as unknown as { fonts: { ready: Promise<void> } }).fonts.ready.then(() => {
        setIsFontReady(true);
      });
    } else {
      requestAnimationFrame(() => setIsFontReady(true));
    }
  }, []);

  // Boot the worker when offscreen support is confirmed
  useEffect(() => {
    if (!useWorker) return;

    workerRef.current = new Worker(
      new URL('../workers/pretext.worker.ts', import.meta.url),
      { type: 'module' }
    );

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
      offscreenTransferred.current = false;
    };
  }, [useWorker]);

  // Container min-height to prevent layout shift while canvas sizes itself
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.minHeight = `${fontSize * lineHeight}px`;
    }
  }, [fontSize, lineHeight]);

  // ─── Render trigger ──────────────────────────────────────────────────────
  const triggerRender = useCallback(() => {
    if (!isFontReady || !canvasRef.current || !text || !mounted) return;

    const canvas = canvasRef.current;

    if (useWorker && workerRef.current) {
      // ── Worker path ──────────────────────────────────────────────────────
      const worker = workerRef.current;

      worker.onmessage = (e: MessageEvent) => {
        if (e.data.type === 'READY') {
          // Size the visible <canvas> wrapper to match what the worker drew
          if (canvas) {
            canvas.style.width = `${e.data.width}px`;
            canvas.style.height = `${e.data.height}px`;
          }
        }
      };

      if (!offscreenTransferred.current) {
        // Transfer canvas control to the worker on the first call
        const offscreen = canvas.transferControlToOffscreen();
        offscreenTransferred.current = true;
        worker.postMessage(
          {
            type: 'RENDER',
            canvas: offscreen,
            text, fontFamily, fontSize, maxWidth, lineHeight, color, italic,
          },
          [offscreen] // transfer ownership — zero-copy
        );
      } else {
        // Subsequent renders: just post params; worker already owns the canvas
        worker.postMessage({
          type: 'RENDER',
          text, fontFamily, fontSize, maxWidth, lineHeight, color, italic,
        });
      }
    } else {
      // ── Main-thread fallback ─────────────────────────────────────────────
      renderOnMainThread(canvas, text, fontFamily, fontSize, maxWidth, lineHeight, color, italic);
    }
  }, [text, isFontReady, fontSize, fontFamily, maxWidth, lineHeight, color, italic, mounted, useWorker]);

  useEffect(() => {
    triggerRender();
  }, [triggerRender]);

  return (
    <div
      ref={containerRef}
      className={`relative group/pretext inline-block min-w-[1em] ${className}`}
    >
      {/* Visual Canvas — either worker-driven (OffscreenCanvas) or main-thread */}
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
});

PretextHeader.displayName = "PretextHeader";
