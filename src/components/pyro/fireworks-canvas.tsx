"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
}

const PALETTE = [
  "#fbbf24", // amber
  "#f59e0b", // amber-500
  "#f97316", // orange
  "#ef4444", // red
  "#fde68a", // light gold
  "#fca5a5", // light red
  "#fef3c7", // cream
];

export function FireworksCanvas({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let lastLaunch = 0;
    const maxParticles = Math.floor(600 * density);

    const burst = (x: number, y: number, color: string) => {
      const count = Math.floor(46 + Math.random() * 30);
      const speed = 1.6 + Math.random() * 2.2;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
        const v = speed * (0.55 + Math.random() * 0.6);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 0,
          maxLife: 60 + Math.random() * 50,
          color,
          size: 1 + Math.random() * 1.8,
        });
      }
      while (particles.length > maxParticles) particles.shift();
    };

    const launch = () => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      rockets.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: h + 8,
        vy: -(6.2 + Math.random() * 2.4),
        targetY: h * (0.14 + Math.random() * 0.32),
        color,
      });
    };

    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // launch cadence
      const interval = 1100 / density;
      if (t - lastLaunch > interval) {
        lastLaunch = t;
        if (rockets.length < 4) launch();
      }

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.988;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();
        // trail
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + 14);
        ctx.strokeStyle = r.color + "44";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (r.y <= r.targetY || r.vy > -1) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.028; // gravity
        p.vx *= 0.985;
        p.vy *= 0.985;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVisibility = () => {
      cancelAnimationFrame(rafRef.current);
      if (!document.hidden) rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
