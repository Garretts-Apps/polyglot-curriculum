'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  aspectRatio: number; // 1 or 1.5
  isRound: boolean;
  angle: number;
  speed: number;
  spin: number;
  rotationOffset: number; // 360 or -360
  delay: number;
}

const COLORS = [
  'var(--accent-prompt)', // Green
  'var(--accent-info)',   // Blue
  'var(--accent-warn)',   // Orange
  'var(--accent-python)', // Yellow
  'var(--accent-csharp)', // Pink
  'var(--accent-rust)',   // Dark Orange
  '#a27eff',              // Purple
  '#ff79c6',              // Hot pink
];

export function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      // Avoid calling setState synchronously in effect body directly, schedule it
      const timer = setTimeout(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: 50, // center X percent
      y: 90, // start low
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: Math.random() * 8 + 6,
      aspectRatio: Math.random() > 0.5 ? 1.5 : 1.0,
      isRound: Math.random() > 0.5,
      angle: Math.random() * 80 + 50, // angle between 50 and 130 deg
      speed: Math.random() * 15 + 10,
      spin: Math.random() * 360,
      rotationOffset: Math.random() > 0.5 ? 360 : -360,
      delay: Math.random() * 0.2,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);

    // Auto cleanup after 3 seconds
    const timer = setTimeout(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParticles([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Inject animations dynamically */}
      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--tx), var(--ty), 0) rotate(var(--rot));
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => {
        // Convert polar to cartesian trajectory
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.speed * 40; // horizontal travel
        const ty = -Math.sin(rad) * p.speed * 40 + p.speed * 10; // vertical travel with gravity feel
        const rot = p.spin + p.rotationOffset;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              bottom: `${100 - p.y}%`,
              width: `${p.size}px`,
              height: `${p.size * p.aspectRatio}px`,
              backgroundColor: p.color,
              borderRadius: p.isRound ? '50%' : '2px',
              animationName: 'confetti-burst',
              animationDuration: '2s',
              animationTimingFunction: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
              animationDelay: `${p.delay}s`,
              animationFillMode: 'forwards',
              transformOrigin: 'center',
              boxShadow: `0 0 6px ${p.color}`,
              // custom css variables for keyframe interpolation
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ['--tx' as any]: `${tx}px`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ['--ty' as any]: `${ty}px`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ['--rot' as any]: `${rot}deg`,
            }}
          />
        );
      })}
    </div>
  );
}
