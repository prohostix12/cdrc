'use client';
import { useEffect, useRef, useState } from 'react';

// ── Typing effect hook ──────────────────────────────────────────────────────
export function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Counter animation hook ──────────────────────────────────────────────────
export function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Morphing SVG background ─────────────────────────────────────────────────
export function MorphingShapes() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}
      viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="mg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
      {/* Morphing blob 1 */}
      <path fill="url(#mg1)">
        <animate attributeName="d" dur="8s" repeatCount="indefinite"
          values="
            M600,100 C750,50 900,150 950,300 C1000,450 900,600 750,650 C600,700 400,650 300,500 C200,350 250,150 400,100 C500,70 550,120 600,100Z;
            M600,80 C780,30 950,180 980,350 C1010,520 880,650 700,670 C520,690 350,600 280,450 C210,300 280,120 450,80 C540,60 560,100 600,80Z;
            M600,100 C750,50 900,150 950,300 C1000,450 900,600 750,650 C600,700 400,650 300,500 C200,350 250,150 400,100 C500,70 550,120 600,100Z
          "
        />
      </path>
      {/* Morphing blob 2 */}
      <path fill="url(#mg1)" opacity="0.5">
        <animate attributeName="d" dur="12s" repeatCount="indefinite"
          values="
            M200,200 C300,100 500,80 600,200 C700,320 650,500 500,550 C350,600 150,520 100,380 C50,240 100,300 200,200Z;
            M180,180 C320,60 540,100 620,240 C700,380 620,560 460,580 C300,600 120,500 80,340 C40,180 80,280 180,180Z;
            M200,200 C300,100 500,80 600,200 C700,320 650,500 500,550 C350,600 150,520 100,380 C50,240 100,300 200,200Z
          "
        />
      </path>
      {/* Rotating ring */}
      <circle cx="1000" cy="150" r="120" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate" from="0 1000 150" to="360 1000 150" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="1000" cy="150" r="80" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="360 1000 150" to="0 1000 150" dur="15s" repeatCount="indefinite" />
      </circle>
      {/* Grid dots */}
      {[...Array(6)].map((_, row) =>
        [...Array(8)].map((_, col) => (
          <circle key={`${row}-${col}`} cx={80 + col * 140} cy={80 + row * 100} r="2" fill="#fff" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + (row + col) * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))
      )}
    </svg>
  );
}

// ── Wave SVG at bottom of hero ──────────────────────────────────────────────
export function HeroWave() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden', lineHeight: 0 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
        <path fill="rgba(255,255,255,0.06)">
          <animate attributeName="d" dur="6s" repeatCount="indefinite"
            values="
              M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z;
              M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80Z;
              M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z
            "
          />
        </path>
        <path fill="rgba(255,255,255,0.04)">
          <animate attributeName="d" dur="9s" repeatCount="indefinite"
            values="
              M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,80 L0,80Z;
              M0,50 C360,80 720,20 1080,60 C1260,80 1380,30 1440,50 L1440,80 L0,80Z;
              M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,80 L0,80Z
            "
          />
        </path>
      </svg>
    </div>
  );
}

// ── 3D tilt card wrapper ────────────────────────────────────────────────────
export function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}

// ── Parallax wrapper ────────────────────────────────────────────────────────
export function ParallaxLayer({ children, speed = 0.3, style }: { children: React.ReactNode; speed?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY * speed}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return <div ref={ref} style={style}>{children}</div>;
}

// ── Stat counter card ───────────────────────────────────────────────────────
export function StatCard({ value, suffix, label, icon, delay = 0 }: {
  value: number; suffix: string; label: string; icon: React.ReactNode; delay?: number;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setStarted(true), delay); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ padding: '1.5rem 2rem', background: 'rgba(255,255,255,0.08)', textAlign: 'center', transition: 'background 0.3s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.14)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)'; }}
    >
      <div style={{ fontSize: '2rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', marginTop: '4px', fontWeight: 500 }}>{label}</div>
    </div>
  );
}
