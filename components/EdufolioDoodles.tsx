'use client';
import React from 'react';

export const StarDoodle = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} style={{ color: '#FCD34D', ...style }}>
    <path d="M20 2L23.5 15.5L38 18L26 24L30 38L20 30L10 38L14 24L2 18L16.5 15.5L20 2Z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ScribbleLoop = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={className} style={{ color: 'rgba(255,255,255,0.4)', ...style }}>
    <path d="M10 30C10 10 50 10 50 30C50 50 10 50 15 35C20 20 40 25 35 40" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EduArrow = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className={className} style={{ color: '#93C5FD', ...style }}>
    <path d="M5 35C25 30 50 45 70 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 15L70 10L72 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ScribbleUnderline = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="240" height="20" viewBox="0 0 240 20" fill="none" className={className} style={{ color: '#4cc9f0', ...style }}>
    <path d="M5 12C30 5 90 2 130 8C170 14 210 15 235 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 15C50 10 100 8 140 13C180 18 220 17 230 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const HighlightCircle = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className} style={{ color: 'rgba(255,255,255,0.2)', ...style }}>
    <ellipse cx="50" cy="50" rx="45" ry="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
  </svg>
);

export default function EdufolioDoodles() {
  return null; // This file is mainly for exports
}
