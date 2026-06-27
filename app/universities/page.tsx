'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, MapPin, GraduationCap } from '@/components/Icon';

interface University {
  name: string;
  slug: string;
  logoInitial?: string;
  naac?: string;
  location?: string;
  programs: Array<{ name: string; duration: string }>;
  image?: string;
  logo?: string;
  type?: string;
  established?: string;
}

const UNI_GRADIENTS: Record<string, [string, string]> = {
  'amity-university-online':          ['#2563eb', '#1e40af'],
  'lpu-online':                       ['#7c3aed', '#5b21b6'],
  'manipal-university-online':        ['#059669', '#047857'],
  'jain-university-online':           ['#dc2626', '#b91c1c'],
  'chandigarh-university-online':     ['#d97706', '#b45309'],
  'dy-patil-university-online':       ['#0891b2', '#0e7490'],
  'shoolini-university-online':       ['#e11d48', '#be123c'],
  'upes-online':                      ['#4f46e5', '#4338ca'],
  'sikkim-manipal-university-online': ['#16a34a', '#15803d'],
  'sharda-university-online':         ['#9333ea', '#7e22ce'],
  'vignan-university-online':         ['#ea580c', '#c2410c'],
  'suresh-gyan-vihar-university-online': ['#0284c7', '#0369a1'],
  'uttaranchal-university-online':    ['#db2777', '#be185d'],
  'mangalayatan-university-online':   ['#65a30d', '#4d7c0f'],
  'dy-patil-vidyapeeth-online':       ['#6366f1', '#4f46e5'],
};

const FALLBACK_GRADIENTS: [string, string][] = [
  ['#4361EE', '#2a4db5'],
  ['#10b981', '#059669'],
  ['#f43f5e', '#e11d48'],
  ['#8b5cf6', '#7c3aed'],
  ['#f59e0b', '#d97706'],
  ['#06b6d4', '#0891b2'],
];

function getGradient(slug: string, idx: number): [string, string] {
  return UNI_GRADIENTS[slug] || FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUni = (u: any): University => ({
  name: u.name,
  slug: u.slug || u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  logoInitial: u.logoInitial || u.name?.charAt(0) || 'U',
  naac: u.naac || u.ranking || u.accreditation,
  location: u.location || 'India',
  programs: u.programs || [],
  image: u.image || undefined,
  logo: u.logo || undefined,
  type: u.type,
  established: u.established,
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
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80"
          alt="Universities"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(67,97,238,0.4) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '14rem 2rem 10rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
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
                const [c1, c2] = getGradient(uni.slug, i);
                const hasImg = !!(uni.image && uni.image.startsWith('http'));

                return (
                  <AnimateOnScroll key={i} animation="fadeUp" delay={(i % 6) * 60}>
                    <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        onMouseEnter={e => {
                          const el = e.currentTarget;
                          el.style.transform = 'translateY(-6px)';
                          el.style.boxShadow = `0 20px 48px ${c1}35`;
                          el.style.borderColor = c1;
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget;
                          el.style.transform = 'translateY(0)';
                          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                          el.style.borderColor = '#e2e8f0';
                        }}
                      >
                        {/* Card header — gradient bg or image */}
                        <div style={{
                          position: 'relative', height: 180, overflow: 'hidden',
                          background: hasImg ? '#0a102b' : `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
                        }}>
                          {hasImg && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={uni.image} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                            />
                          )}
                          {/* Dot pattern overlay */}
                          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                          {/* Bottom gradient for text contrast */}
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />

                          {/* Logo initial centered */}
                          <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: 72, height: 72, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem', fontWeight: 800, color: '#fff',
                            border: '2px solid rgba(255,255,255,0.3)',
                            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          }}>
                            {uni.logoInitial || uni.name.charAt(0)}
                          </div>

                          {/* NAAC badge */}
                          {uni.naac && (
                            <div style={{
                              position: 'absolute', top: 12, right: 12,
                              background: 'rgba(255,255,255,0.95)', color: c1,
                              fontSize: '0.65rem', fontWeight: 700, padding: '4px 10px',
                              borderRadius: 6, letterSpacing: '0.04em',
                            }}>
                              {uni.naac}
                            </div>
                          )}

                          {/* Type badge */}
                          {uni.type && (
                            <div style={{
                              position: 'absolute', top: 12, left: 12,
                              background: 'rgba(0,0,0,0.4)', color: '#fff',
                              fontSize: '0.6rem', fontWeight: 600, padding: '4px 10px',
                              borderRadius: 6, letterSpacing: '0.04em', backdropFilter: 'blur(4px)',
                              textTransform: 'uppercase',
                            }}>
                              {uni.type}
                            </div>
                          )}

                          {/* UGC approved label */}
                          <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                            <span style={{
                              display: 'inline-block', background: 'rgba(255,255,255,0.95)', color: c1,
                              fontSize: '0.6rem', fontWeight: 700, padding: '4px 10px',
                              borderRadius: 4, letterSpacing: '0.05em', textTransform: 'uppercase',
                            }}>
                              UGC Approved
                            </span>
                          </div>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.4rem' }}>{uni.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '1rem' }}>
                            <MapPin size={12} color="#94a3b8" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{uni.location}</span>
                            {uni.established && (
                              <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: 8 }}>Est. {uni.established}</span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                            {['Online Mode', 'UG & PG', 'Placement Support'].map((tag, j) => (
                              <span key={j} style={{ padding: '3px 10px', background: `${c1}12`, color: c1, borderRadius: 50, fontSize: '0.72rem', fontWeight: 600 }}>{tag}</span>
                            ))}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '0.8rem', color: c1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <GraduationCap size={14} color={c1} /> View Programs
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c1} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
