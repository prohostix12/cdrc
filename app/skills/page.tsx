'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';
import { getContrastColor } from '@/lib/colors';

interface Course { name: string; duration: string; description?: string; }
interface Skill {
  _id: string; name: string; description: string; category: string;
  duration: string; level: string; price: string; image?: string;
  courses: Course[]; slug: string;
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner: '#16a34a', Intermediate: '#d97706', Advanced: '#dc2626',
};

const ACCENT_COLORS = ['#4169e1', '#4169e1', '#4169e1', '#4169e1', '#4169e1', '#4169e1', '#4169e1', '#4169e1'];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [enrollModal, setEnrollModal] = useState<{ open: boolean; skill: string; course: string }>({ open: false, skill: '', course: '' });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => {
      if (d.success) setSkills(d.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];
  const filtered = skills.filter(s =>
    (activeCategory === 'All' || s.category === activeCategory) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Skill Development"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(67,97,238,0.5) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '14rem 2rem 10rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 500 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Skill Courses</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Upskill Your <span style={{ color: '#90e0ef' }}>Career Path</span> <br/> with CDRC
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Industry-relevant programs designed to boost your career with practical, hands-on learning from experts.
              </p>
              
              <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
                <svg style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input
                  type="text"
                  placeholder="Search skill courses..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '1.1rem 1.25rem 1.1rem 3.2rem', borderRadius: 50, border: 'none', fontSize: '0.95rem', outline: 'none', color: '#0f172a', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
      </section>

      {/* ── CATEGORY FILTER ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0.875rem 2rem', position: 'sticky', top: 56, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'all 0.2s', fontFamily: 'inherit',
              background: activeCategory === cat ? '#4169e1' : '#f1f5f9',
              color: activeCategory === cat ? '#fff' : '#475569',
            }}>
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {filtered.length} courses
          </span>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: '2.5rem 2rem 5rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>No skill courses found.</p>
              <Link href="/contact" style={{ display: 'inline-block', background: '#1e40af', color: '#fff', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Contact Us</Link>
            </div>
          ) : (
            <div className="grid-card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((skill, i) => {
                const isExpanded = expandedCards.has(skill._id);
                const words = skill.description.split(' ');
                const isLong = words.length > 20;
                const preview = isLong && !isExpanded ? words.slice(0, 20).join(' ') + '...' : skill.description;
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                const levelColor = LEVEL_COLOR[skill.level] || '#1e40af';

                return (
                  <AnimateOnScroll key={skill._id} animation="fadeUp" delay={(i % 6) * 60} style={{ height: '100%' }}>
                    <div style={{ height: '100%', background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 16px 40px ${accent}18`; el.style.borderColor = `${accent}44`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; el.style.borderColor = '#e2e8f0'; }}
                    >
                      {/* Image / Banner */}
                      <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`, flexShrink: 0 }}>
                        {skill.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={skill.image} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: '4rem', fontWeight: 600, color: getContrastColor(accent), opacity: 0.2, letterSpacing: '-0.04em' }}>{skill.name.charAt(0)}</div>
                          </div>
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
                        <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.92)', color: '#0f172a', fontSize: '0.65rem', fontWeight: 500, padding: '3px 9px', borderRadius: 6 }}>
                          {skill.category}
                        </span>
                        <span style={{ position: 'absolute', top: 12, right: 12, background: levelColor, color: getContrastColor(levelColor), fontSize: '0.65rem', fontWeight: 500, padding: '3px 9px', borderRadius: 6 }}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Body */}
                      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem' }}>{skill.name}</h3>

                        <div style={{ marginBottom: '0.875rem' }}>
                          <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{preview}</p>
                          {isLong && (
                            <button onClick={() => toggleExpand(skill._id)} style={{ background: 'none', border: 'none', color: accent, fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', padding: '3px 0 0', fontFamily: 'inherit' }}>
                              {isExpanded ? 'See Less ↑' : 'See More ↓'}
                            </button>
                          )}
                        </div>

                        {/* Expanded: duration, price, courses */}
                        {isExpanded && (
                          <>
                            {(skill.duration || skill.price) && (
                              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                                {skill.duration && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.8rem' }}>⏱ {skill.duration}</span>}
                                {skill.price && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.8rem' }}>₹ {skill.price}</span>}
                              </div>
                            )}
                          </>
                        )}

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                          <Link href={`/skills/${skill._id}`}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.65rem', border: `1.5px solid ${accent}`, borderRadius: 8, color: accent, fontWeight: 500, fontSize: '0.8rem', textDecoration: 'none', transition: 'background 0.2s', background: '#fff' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${accent}10`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; }}
                          >
                            Details
                          </Link>
                          {(skill as any).brochureUrl && (
                            <a href={(skill as any).brochureUrl} target="_blank" rel="noreferrer" download
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '0.65rem 0.75rem', background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0', borderRadius: 8, fontWeight: 500, fontSize: '0.8rem', textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#dcfce7'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0fdf4'; }}
                            >
                              📄 Brochure
                            </a>
                          )}
                          <button onClick={() => setEnrollModal({ open: true, skill: skill.name, course: skill.name })}
                            style={{ flex: 1, padding: '0.65rem', background: accent, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                          >
                            Enroll Now
                          </button>
                        </div>
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
      <section style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, color: '#0f172a', marginBottom: '0.75rem' }}>
              Ready to upskill your career?
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Talk to our counsellors for free guidance on the right skill course for you.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (btn) btn.click(); }}
                style={{ padding: '0.8rem 2rem', background: '#4169e1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Find My Course
              </button>
              <Link href="/contact" style={{ padding: '0.8rem 2rem', background: '#fff', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Talk to Counsellor
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {enrollModal.open && (
        <EnrollmentModal university="CDRC Skill Programs" program={enrollModal.course} onClose={() => setEnrollModal({ open: false, skill: '', course: '' })} />
      )}
      <style>{`
        @media (max-width: 640px) {
          .grid-card-container { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
