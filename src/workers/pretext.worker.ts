/**
 * pretext.worker.ts
 *
 * Runs @chenglou/pretext layout and canvas drawing entirely on a background
 * thread via OffscreenCanvas. The main thread transfers canvas control once,
 * then posts RENDER messages on every prop change.
 *
 * Message protocol:
 *
 *   Main → Worker
 *   { type: 'RENDER'; canvas: OffscreenCanvas; ... }  ← first call, transfers canvas
 *   { type: 'RENDER'; ... }                            ← subsequent calls, no canvas
 *
 *   Worker → Main
 *   { type: 'READY' }          ← after first successful draw
 *   { type: 'ERROR'; msg: string }
 */

import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

export type RenderMessage = {
  type: 'RENDER';
  canvas?: OffscreenCanvas;
  text: string;
  fontFamily: string;
  fontSize: number;
  maxWidth: number;
  lineHeight: number;
  color: string;
  italic: boolean;
};

export type WorkerMessage = RenderMessage;

let offscreen: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { type } = e.data;

  if (type === 'RENDER') {
    const { canvas, text, fontFamily, fontSize, maxWidth, lineHeight, color, italic } = e.data;

    // First call: accept the transferred canvas
    if (canvas) {
      offscreen = canvas;
      ctx = offscreen.getContext('2d') as OffscreenCanvasRenderingContext2D | null;
    }

    if (!ctx || !offscreen) {
      self.postMessage({ type: 'ERROR', msg: 'No OffscreenCanvas context available.' });
      return;
    }

    try {
      const dpr = self.devicePixelRatio ?? 1;
      const fontSpec = `${italic ? 'italic ' : ''}${fontSize}px ${fontFamily}`;

      // Measure and layout via pretext (pure arithmetic after first prepare)
      const prepared = prepareWithSegments(text, fontSpec);
      const { lines, height } = layoutWithLines(prepared, maxWidth, fontSize * lineHeight);

      const width =
        lines && lines.length > 0
          ? Math.max(...lines.map((l) => l.width))
          : maxWidth;

      // Resize canvas backing store (also resets pixel buffer)
      offscreen.width = (width || maxWidth) * dpr;
      offscreen.height = height * dpr;

      // Reset transform matrix before each draw — resizing the canvas clears
      // pixels but NOT the context transform, so we must reset explicitly to
      // prevent dpr accumulation across repeated renders.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.font = fontSpec;
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;

      lines.forEach((line, i) => {
        ctx!.fillText(line.text, 0, i * fontSize * lineHeight);
      });

      self.postMessage({
        type: 'READY',
        width: width || maxWidth,
        height,
      });
    } catch (err) {
      self.postMessage({ type: 'ERROR', msg: String(err) });
    }
  }
};
