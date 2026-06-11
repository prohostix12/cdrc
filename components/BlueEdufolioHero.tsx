'use client';
import React from 'react';
import Link from 'next/link';
import { StarDoodle, ScribbleLoop, EduArrow, ScribbleUnderline, HighlightCircle } from './EdufolioDoodles';

const FloatingElement = ({ children, style, delay = '0s', duration = '6s' }: { children: React.ReactNode, style?: React.CSSProperties, delay?: string, duration?: string }) => (
  <div style={{
    position: 'absolute',
    animation: `float-subtle-blue ${duration} ease-in-out infinite ${delay}`,
    zIndex: 10,
    ...style
  }}>
    <style>{`
      @keyframes float-subtle-blue {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(2deg); }
      }
    `}</style>
    {children}
  </div>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div style={{ textAlign: 'left' }}>
    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
  </div>
);

export default function BlueEdufolioHero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '90vh',
      background: 'linear-gradient(135deg, #1e40af 0%, #4169E1 50%, #60a5fa 100%)',
      overflow: 'hidden',
      paddingTop: '120px',
      paddingBottom: '80px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* BACKGROUND DECORATIONS - LAYERED GLASS ORBS */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(30,58,138,0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', width: '100%', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) 1fr', gap: '5rem', alignItems: 'center' }}>
          
          {/* LEFT CONTENT */}
          <div style={{ position: 'relative' }}>
            {/* Doodle above title */}
            <StarDoodle style={{ position: 'absolute', top: '-65px', left: '-25px', transform: 'rotate(-10deg)', color: '#FCD34D' }} />
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', padding: '8px 20px', color: '#fff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, background: '#fff', color: '#1e40af', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>🏆</span>
              India&apos;s Trusted Online Education Partner
            </div>

            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', position: 'relative', letterSpacing: '-0.02em' }}>
              Advance Your Career<br />
              <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                with <span style={{ color: '#90e0ef' }}>Online Degrees</span>
                <ScribbleUnderline style={{ position: 'absolute', bottom: '-15px', left: '0', color: '#90e0ef', width: '100%' }} />
              </div>
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '3.5rem', maxWidth: '500px', fontWeight: 400 }}>
              Get UGC-approved degrees from India&apos;s top NAAC-accredited universities. Study at your own pace, from anywhere in the world.
            </p>

            <div style={{ display: 'flex', gap: '4rem', marginBottom: '4.5rem' }}>
              <StatItem label="Active Students" value="15,000+" />
              <StatItem label="Placement Rate" value="95%" />
              <StatItem label="UGC Approved" value="100%" />
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/programs" style={{ background: '#fff', color: '#1e40af', padding: '15px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'; }}>
                Explore Programs
              </Link>
              <button 
                onClick={() => { const b = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (b) b.click(); }}
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(10px)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Find My Course
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT - THE DOODLE STACK */}
          <div style={{ position: 'relative', height: '580px' }}>
            
            {/* Background Scribbles */}
            <ScribbleLoop style={{ position: 'absolute', top: '5%', right: '10%', width: '120px', height: '120px', color: 'rgba(255,255,255,0.2)' }} />
            <HighlightCircle style={{ position: 'absolute', bottom: '15%', left: '0', color: 'rgba(255,255,255,0.15)' }} />
            
            {/* Main Image Container */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              maxWidth: '460px',
              height: '420px',
              borderRadius: '32px',
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
              zIndex: 2
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '22px', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Floating EDU Arrow */}
            <EduArrow style={{ position: 'absolute', top: '30%', left: '-30px', transform: 'rotate(-15deg)', zIndex: 10, color: '#90e0ef' }} />

            {/* MBA Card */}
            <FloatingElement style={{ top: '10%', right: '-20px' }} delay="0s">
              <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '14px 22px', borderRadius: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: 44, height: 44, background: '#EFF6FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🎓</div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e40af' }}>MBA</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Most Popular</div>
                </div>
              </div>
            </FloatingElement>

            {/* Placement Card */}
            <FloatingElement style={{ bottom: '10%', left: '-30px' }} delay="1.5s">
              <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '14px 22px', borderRadius: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: 44, height: 44, background: '#F0FDF4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🏆</div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d' }}>95%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Success Ratio</div>
                </div>
              </div>
            </FloatingElement>

            {/* Small floating images */}
            <div style={{ position: 'absolute', top: '0', left: '10%', width: 80, height: 80, borderRadius: '18px', border: '3px solid #fff', overflow: 'hidden', transform: 'rotate(-10deg)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', zIndex: 5 }}>
              <img src="https://images.unsplash.com/photo-1523240715639-93f8cf0af7ae?w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
