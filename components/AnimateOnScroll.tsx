'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp' | 'stagger' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'rotateIn' | 'bounceIn' | 'flipIn' | 'slideUpBounce' | 'elasticIn' | 'spiralIn';
  delay?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimateOnScroll({ children, animation = 'fadeUp', delay = 0, className = '', style = {} }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initial: React.CSSProperties = {
    opacity: 0,
    transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.8s ease`,
    ...(animation === 'fadeUp'        && { transform: 'translateY(40px)' }),
    ...(animation === 'fadeDown'      && { transform: 'translateY(-40px)' }),
    ...(animation === 'fadeLeft'      && { transform: 'translateX(-40px)' }),
    ...(animation === 'fadeRight'     && { transform: 'translateX(40px)' }),
    ...(animation === 'slideLeft'     && { transform: 'translateX(60px)' }),
    ...(animation === 'slideRight'    && { transform: 'translateX(-60px)' }),
    ...(animation === 'scaleUp'       && { transform: 'scale(0.88)' }),
    ...(animation === 'zoomIn'        && { transform: 'scale(0.7)' }),
    ...(animation === 'rotateIn'      && { transform: 'rotate(-5deg) scale(0.9)' }),
    ...(animation === 'bounceIn'      && { transform: 'scale(0.3) translateY(50px)', transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }),
    ...(animation === 'flipIn'        && { transform: 'rotateY(90deg) scale(0.8)', transition: 'opacity 0.7s ease, transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }),
    ...(animation === 'slideUpBounce' && { transform: 'translateY(80px) scale(0.9)', transition: 'opacity 0.6s ease, transform 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }),
    ...(animation === 'elasticIn'     && { transform: 'scale(0.1) rotate(30deg)', transition: 'opacity 0.5s ease, transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }),
    ...(animation === 'spiralIn'      && { transform: 'rotate(180deg) scale(0.1)', transition: 'opacity 0.8s ease, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }),
    ...(animation === 'fadeIn'        && { filter: 'blur(4px)' }),
    ...(animation === 'stagger'       && { transform: 'translateY(30px)' }),
  };

  return (
    <div ref={ref} className={className} style={{ ...initial, ...style }}>
      {children}
    </div>
  );
}
