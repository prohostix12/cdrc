'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Board } from '@/lib/data';
import EnrollmentModal from '@/components/EnrollmentModal';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, BookOpen } from '@/components/Icon';

const RB = '#4169e1';
const RBD = '#2a4db5';
const RBL = '#e8eef9';

const OPEN_SCHOOL_IMAGES = [
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1546410531-ea4ec3bd32ba?w=800&q=80',
];
const CARD_COLORS = ['#4361EE', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'];

export default function OpenSchoolPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ university: string; program: string } | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/open-school').then(r => r.json()).then(data => {
      setBoards(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => { setBoards([]); setLoading(false); });
  }, []);

  const toggle = (key: string) => setExpanded(prev => {
    const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s;
  });

  const filtered = boards
    .filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'Name A-Z') {
        return a.name.localeCompare(b.name);
      }
      return 0; // Default to Most Popular (or API order)
    });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* New Background image - Bright Library Setting */}
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80"
          alt="Open School Background"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Deep overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,15,40,0.85) 0%, rgba(67,97,238,0.5) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '14rem 2rem 10rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 500 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Open School</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Complete Your <br/> <span style={{ color: '#90e0ef' }}>Class 10 & 12</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, marginBottom: '2.5rem', lineHeight: 1.6 }}>
                UGC & Govt. approved open schooling programs for students who want flexibility and certified results.
              </p>
              
              <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
                <Search size={16} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
                <input
                  type="text"
                  placeholder="Search boards (NIOS, BBOSE, etc)..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '1.1rem 1.25rem 1.1rem 3.2rem', borderRadius: 50, border: 'none', fontSize: '0.95rem', outline: 'none', color: '#0f172a', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
        
        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #f8fafc)', pointerEvents: 'none' }} />
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
            Showing <strong>{filtered.length}</strong> out of <strong>{boards.length}</strong> Boards Available
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.25rem', background: '#4169e1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer' }}>
              ⚙ Filter
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#64748b' }}>
              <span>Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: '#0f172a', outline: 'none', cursor: 'pointer', background: '#fff' }}
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Name A-Z">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS ── */}
      <section style={{ padding: '3.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: `4px solid #e2e8f0`, borderTop: `4px solid ${RB}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16 }}>
              <p style={{ color: '#64748b' }}>No boards found.</p>
            </div>
          ) : (
            <div className="grid-card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((board, i) => {
                const brandColor = CARD_COLORS[i % CARD_COLORS.length];
                const imgSrc = OPEN_SCHOOL_IMAGES[i % OPEN_SCHOOL_IMAGES.length];
                return (
                 <AnimateOnScroll key={i} animation="fadeUp" delay={i * 50} style={{ height: '100%' }}>
                  <div
                    style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', height: '100%' }}
                    onMouseEnter={e => { 
                      const el = e.currentTarget as HTMLDivElement; 
                      el.style.transform = 'translateY(-6px)'; 
                      el.style.boxShadow = `0 20px 48px ${brandColor}40`; 
                      el.style.borderColor = brandColor; 
                      const img = el.querySelector('.board-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1.06)';
                      const overlay = el.querySelector('.board-color-overlay') as HTMLDivElement;
                      if (overlay) overlay.style.opacity = '0.7';
                    }}
                    onMouseLeave={e => { 
                      const el = e.currentTarget as HTMLDivElement; 
                      el.style.transform = 'translateY(0)'; 
                      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; 
                      el.style.borderColor = '#e2e8f0'; 
                      const img = el.querySelector('.board-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1)';
                      const overlay = el.querySelector('.board-color-overlay') as HTMLDivElement;
                      if (overlay) overlay.style.opacity = '0';
                    }}
                  >
                    {/* Header bar */}
                    <div style={{ height: 8, background: brandColor }} />

                    {/* Card body */}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Title row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: 44, height: 44, background: `${brandColor}15`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <BookOpen size={20} color={brandColor} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.25rem' }}>{board.name}</h3>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ background: `${brandColor}15`, color: brandColor, fontSize: '0.65rem', fontWeight: 600, padding: '3px 12px', borderRadius: 50, textTransform: 'uppercase' }}>Govt. Approved</span>
                            <span style={{ background: '#f8fafc', color: '#64748b', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 50 }}>{board.programs?.length || 0} Programs</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {board.description && (
                        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.5rem' }}>{board.description}</p>
                      )}

                      {/* Stats row */}
                      <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                        {[
                          { label: 'Type', value: 'Open School' },
                          { label: 'Mode', value: 'Flexible' },
                          { label: 'Recognition', value: 'National' },
                        ].map((s, j) => (
                          <div key={j}>
                            <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{s.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Program list */}
                      <div style={{ flex: 1, marginBottom: '1.25rem' }}>
                        {board.programs?.slice(0, expanded.has(`board-${i}`) ? undefined : 2).map((p, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.4rem 0', borderBottom: j < (expanded.has(`board-${i}`) ? board.programs.length - 1 : 1) ? '1px solid #f8fafc' : 'none' }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: brandColor, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{p.name}</span>
                          </div>
                        ))}
                        {(board.programs?.length || 0) > 2 && (
                          <button onClick={() => toggle(`board-${i}`)} style={{ background: 'none', border: 'none', color: brandColor, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: '8px 0 0', display: 'block', fontFamily: 'inherit' }}>
                            {expanded.has(`board-${i}`) ? 'See Less ↑' : `+${(board.programs?.length || 0) - 2} more programs ↓`}
                          </button>
                        )}
                      </div>

                      {/* Enroll button */}
                      <button
                        onClick={() => setModal({ university: board.name, program: 'Open School Programs' })}
                        style={{ width: '100%', padding: '0.8rem', background: brandColor, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'filter 0.2s', fontFamily: 'inherit', marginTop: 'auto' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.9)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 2rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ background: `linear-gradient(135deg, ${RB}, ${RBD})`, borderRadius: 14, padding: '1.75rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', overflow: 'hidden' }} className="open-school-cta">
              <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-60px', right: '-60px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Talk to Experts</div>
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 500, color: '#fff' }}>Not sure which board to choose?</h3>
              </div>
              <Link href="/contact" style={{ padding: '0.75rem 1.75rem', background: '#90caf9', color: RBD, borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                Consult Now
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {modal && <EnrollmentModal university={modal.university} program={modal.program} onClose={() => setModal(null)} />}
      <style>{`
        @media (max-width: 640px) {
          .open-school-cta { flex-direction: column !important; text-align: center !important; padding: 1.5rem !important; }
          .open-school-cta a { align-self: center !important; }
          .grid-card-container { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
