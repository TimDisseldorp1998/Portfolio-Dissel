"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based abstract wave gradient — sweeping magenta/purple bands with
 * an orange hotspot and subtle starfield on a near-black background.
 * Runs at ~60fps, pauses under prefers-reduced-motion or when hidden.
 */
export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    type Star = { x: number; y: number; r: number; a: number };
    let stars: Star[] = [];

    type Wave = {
      baseY: number;
      amp: number;
      lineWidth: number;
      phase: number;
      speed: number;
      colorA: string;
      colorB: string;
      colorEnd: string;
    };
    let waves: Wave[] = [];

    function seed() {
      const magenta = (a: number) => `rgba(214, 92, 168, ${a})`;
      const purple = (a: number) => `rgba(86, 58, 218, ${a})`;
      const violet = (a: number) => `rgba(142, 92, 224, ${a})`;
      const orange = (a: number) => `rgba(255, 131, 61, ${a})`;

      waves = [
        {
          baseY: 0.72,
          amp: 0.55,
          lineWidth: 90,
          phase: 0.2,
          speed: 0.00019,
          colorA: magenta(0.9),
          colorB: purple(0.55),
          colorEnd: purple(0),
        },
        {
          baseY: 0.8,
          amp: 0.6,
          lineWidth: 120,
          phase: 1.1,
          speed: 0.00015,
          colorA: orange(0.55),
          colorB: magenta(0.5),
          colorEnd: violet(0),
        },
        {
          baseY: 0.88,
          amp: 0.7,
          lineWidth: 150,
          phase: 2.4,
          speed: 0.00013,
          colorA: magenta(0.7),
          colorB: purple(0.4),
          colorEnd: purple(0),
        },
        {
          baseY: 0.98,
          amp: 0.85,
          lineWidth: 190,
          phase: 0.8,
          speed: 0.0001,
          colorA: purple(0.55),
          colorB: violet(0.35),
          colorEnd: purple(0),
        },
        {
          baseY: 1.05,
          amp: 0.95,
          lineWidth: 240,
          phase: 3.1,
          speed: 0.00008,
          colorA: violet(0.4),
          colorB: purple(0.25),
          colorEnd: purple(0),
        },
      ];

      stars = [];
      const count = Math.floor((width * height) / 14000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() < 0.88 ? 0.6 : 1.3,
          a: 0.25 + Math.random() * 0.55,
        });
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }
    resize();

    function drawFrame(t: number) {
      if (!running) return;

      // Base dark background
      ctx!.globalCompositeOperation = "source-over";
      ctx!.filter = "none";
      const bg = ctx!.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#07070B");
      bg.addColorStop(1, "#0A0A0F");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, width, height);

      // Static starfield behind the waves
      for (const s of stars) {
        ctx!.fillStyle = `rgba(255, 255, 255, ${s.a})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Glowing sweeping waves
      ctx!.globalCompositeOperation = "lighter";
      ctx!.filter = "blur(22px)";

      for (const w of waves) {
        const drift = Math.sin(t * w.speed + w.phase) * height * 0.05;
        const baseY = height * w.baseY + drift;
        const amp = height * w.amp;

        const x0 = -width * 0.2;
        const y0 = baseY + amp * 0.3;
        const cp1x = width * 0.15;
        const cp1y = baseY - amp * 0.4 + drift * 0.5;
        const cp2x = width * 0.55;
        const cp2y = baseY - amp * 0.8 + drift * 0.35;
        const x1 = width * 1.2;
        const y1 = baseY - amp * 1.05;

        const grad = ctx!.createLinearGradient(
          0,
          baseY + amp * 0.3,
          width,
          baseY - amp
        );
        grad.addColorStop(0, w.colorEnd);
        grad.addColorStop(0.32, w.colorA);
        grad.addColorStop(0.66, w.colorB);
        grad.addColorStop(1, w.colorEnd);

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = w.lineWidth;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(x0, y0);
        ctx!.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1);
        ctx!.stroke();
      }

      // Bright hotspot where the waves converge
      const hotX = width * 0.58 + Math.sin(t * 0.0001) * width * 0.04;
      const hotY = height * 0.58 + Math.cos(t * 0.00012) * height * 0.03;
      const hotR = Math.max(width, height) * 0.4;
      const hot = ctx!.createRadialGradient(hotX, hotY, 0, hotX, hotY, hotR);
      hot.addColorStop(0, "rgba(255, 131, 61, 0.32)");
      hot.addColorStop(0.35, "rgba(214, 92, 168, 0.22)");
      hot.addColorStop(1, "rgba(86, 58, 218, 0)");
      ctx!.fillStyle = hot;
      ctx!.beginPath();
      ctx!.arc(hotX, hotY, hotR, 0, Math.PI * 2);
      ctx!.fill();

      // Reset compositing for vignette
      ctx!.filter = "none";
      ctx!.globalCompositeOperation = "source-over";

      // Deep vignette to focus attention
      const vignette = ctx!.createRadialGradient(
        width * 0.55,
        height * 0.65,
        Math.min(width, height) * 0.2,
        width * 0.55,
        height * 0.65,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, "rgba(10, 10, 15, 0)");
      vignette.addColorStop(1, "rgba(10, 10, 15, 0.75)");
      ctx!.fillStyle = vignette;
      ctx!.fillRect(0, 0, width, height);

      raf = requestAnimationFrame(drawFrame);
    }

    if (prefersReducedMotion) {
      drawFrame(0);
      running = false;
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    const handleResize = () => resize();
    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!prefersReducedMotion) {
        running = true;
        raf = requestAnimationFrame(drawFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
