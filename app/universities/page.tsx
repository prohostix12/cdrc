'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, MapPin, GraduationCap } from '@/components/Icon';
import { getContrastColor } from '@/lib/colors';

interface University {
  name: string;
  slug: string;
  naac?: string;
  location?: string;
  programs: Array<{ name: string; duration: string }>;
  image?: string;
  logo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUni = (u: any): University => ({
  name: u.name,
  slug: u.slug || u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  naac: u.naac || u.ranking || u.accreditation,
  location: u.location || 'India',
  programs: u.programs || [],
  image: u.image || undefined,
  logo: u.logo || undefined,
});


export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) setUniversities(d.data.map(mapUni));
      else setUniversities([]);
    }).catch(() => setUniversities([])).finally(() => setLoading(false));
  }, []);

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt="Universities"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Overlay matches contact page but is more transparent */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(67,97,238,0.4) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '14rem 2rem 10rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 500 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Universities</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Find Your Dream <span style={{ color: '#90e0ef' }}>University</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, marginBottom: '2rem', lineHeight: 1.5 }}>
                UGC-approved online degrees from India&apos;s top NAAC-accredited institutions.
              </p>
              
              <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
                <Search size={16} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
                <input
                  type="text"
                  placeholder="Search universities or locations..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '1rem 1.25rem 1rem 3.2rem', borderRadius: 50, border: 'none', fontSize: '0.95rem', outline: 'none', color: '#0f172a', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, #1e40af)', pointerEvents: 'none' }} />
      </section>

      {/* ── RESULTS COUNT ── */}
      <div style={{ padding: '1.5rem 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> universities
            {search && <> for &quot;<strong style={{ color: '#1e40af' }}>{search}</strong>&quot;</>}
          </p>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: '1.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
              <p style={{ color: '#64748b' }}>No universities found.</p>
            </div>
          ) : (
            <div className="grid-card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((uni, i) => {
                const actualImgSrc = (uni.image && uni.image.startsWith('http')) ? uni.image : undefined;
                let brandColor = '#4361EE';
                if (uni.image?.includes('blue')) brandColor = '#2563eb';
                else if (uni.image?.includes('green')) brandColor = '#16a34a';
                else if (uni.image?.includes('red')) brandColor = '#dc2626';
                else if (uni.image?.includes('purple')) brandColor = '#9333ea';
                else if (uni.image?.includes('orange')) brandColor = '#ea580c';
                else if (uni.image?.includes('yellow')) brandColor = '#ca8a04';
                else {
                  const fallbackColors = ['#4361EE', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'];
                  brandColor = fallbackColors[i % fallbackColors.length];
                }

                return (
                  <AnimateOnScroll key={i} animation="fadeUp" delay={(i % 6) * 60}>
                    <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        onMouseEnter={e => { 
                          const el = e.currentTarget as HTMLDivElement; 
                          el.style.transform = 'translateY(-6px)'; 
                          el.style.boxShadow = `0 20px 48px ${brandColor}40`; 
                          el.style.borderColor = brandColor; 
                          const img = el.querySelector('.uni-img') as HTMLImageElement;
                          if (img) img.style.transform = 'scale(1.06)';
                          const overlay = el.querySelector('.uni-color-overlay') as HTMLDivElement;
                          if (overlay) overlay.style.opacity = '0.7';
                        }}
                        onMouseLeave={e => { 
                          const el = e.currentTarget as HTMLDivElement; 
                          el.style.transform = 'translateY(0)'; 
                          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; 
                          el.style.borderColor = '#e2e8f0'; 
                          const img = el.querySelector('.uni-img') as HTMLImageElement;
                          if (img) img.style.transform = 'scale(1)';
                          const overlay = el.querySelector('.uni-color-overlay') as HTMLDivElement;
                          if (overlay) overlay.style.opacity = '0';
                        }}
                      >
                        {/* Image */}
                        <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#0a102b' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {actualImgSrc && (
                            <img className="uni-img" src={actualImgSrc} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                          )}
                          {/* Color overlay that fades in on hover */}
                          <div className="uni-color-overlay" style={{ position: 'absolute', inset: 0, background: brandColor, opacity: 0, transition: 'opacity 0.3s ease', mixBlendMode: 'multiply' }} />
                          {/* Permanent dark gradient for text legibility */}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                          
                          {/* Logo Overlay */}
                          {uni.logo && (
                            <div style={{ position: 'absolute', top: 12, left: 12, width: 44, height: 44, background: '#fff', borderRadius: 8, padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', zIndex: 2 }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={uni.logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                          )}

                          {uni.naac && (
                            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)', color: brandColor, fontSize: '0.65rem', fontWeight: 600, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.04em' }}>
                              {uni.naac}
                            </div>
                          )}
                          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                            <div style={{ display: 'inline-block', background: brandColor, color: getContrastColor(brandColor), fontSize: '0.6rem', fontWeight: 600, padding: '4px 10px', borderRadius: 4, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                              UGC Approved
                            </div>
                          </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.4rem' }}>{uni.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '1rem' }}>
                            <MapPin size={12} color="#94a3b8" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{uni.location}</span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                            {[`${uni.programs.length}+ Programs`, 'Online Mode', 'UG & PG'].map((tag, j) => (
                              <span key={j} style={{ padding: '3px 10px', background: `${brandColor}15`, color: brandColor, borderRadius: 50, fontSize: '0.72rem', fontWeight: 600 }}>{tag}</span>
                            ))}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '0.8rem', color: brandColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <GraduationCap size={14} color={brandColor} /> Explore Programs
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, color: '#0f172a', marginBottom: '0.75rem' }}>
              Not sure which university to pick?
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Our counsellors provide free, personalised guidance to help you choose the right university and program.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { const btn = document.getElementById('suggest-uni-nav-btn') as HTMLButtonElement; if (btn) btn.click(); }}
                style={{ padding: '0.8rem 2rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Suggest University
              </button>
              <Link href="/contact" style={{ padding: '0.8rem 2rem', background: '#fff', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Talk to Counsellor
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <style>{`
        @media (max-width: 640px) {
          .grid-card-container { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
