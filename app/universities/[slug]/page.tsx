'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Award, BookOpen, GraduationCap, CheckCircle, Clock } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

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

function getColors(slug: string): [string, string] {
  return UNI_GRADIENTS[slug] || ['#4361EE', '#2a4db5'];
}

interface University {
  _id?: string;
  name: string;
  slug: string;
  logoInitial?: string;
  location: string;
  naac: string;
  image?: string;
  logo?: string;
  description: string;
  facilities: string[];
  ranking?: string;
  type?: string;
  established?: string;
  highlights?: string[];
  programs: Program[];
}

interface Program {
  name: string;
  duration: string;
  description?: string;
  fee?: number;
  mode?: string;
  category?: string;
  level?: string;
  specializations?: string[];
  eligibility?: string;
}

function ProgramCard({ program, brandColor, onEnroll }: {
  program: Program;
  brandColor: string;
  onEnroll: (name: string) => void;
}) {
  const lightBg = `${brandColor}10`;

  return (
    <div style={{
      background: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'all 0.25s', boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = brandColor; el.style.boxShadow = `0 8px 24px ${brandColor}20`; el.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#e2e8f0'; el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'; el.style.transform = 'translateY(0)'; }}
    >
      {/* Colored header strip */}
      <div style={{
        background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}cc 100%)`,
        padding: '1rem 1.25rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, margin: 0 }}>{program.name}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {program.duration && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                <Clock size={11} color="rgba(255,255,255,0.8)" /> {program.duration}
              </span>
            )}
            {program.mode && (
              <span style={{ fontSize: '0.68rem', color: '#fff', fontWeight: 600, padding: '2px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: 50 }}>
                {program.mode}
              </span>
            )}
            {program.level && (
              <span style={{ fontSize: '0.68rem', color: '#fff', fontWeight: 600, padding: '2px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: 50 }}>
                {program.level}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Fee */}
        {program.fee != null && program.fee > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: lightBg, borderRadius: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Total Fee</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: brandColor }}>₹{Number(program.fee).toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Eligibility */}
        {program.eligibility && (
          <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
            <strong style={{ color: '#475569' }}>Eligibility:</strong> {program.eligibility}
          </p>
        )}

        {/* Specializations */}
        {program.specializations && program.specializations.length > 0 && (
          <div style={{ marginBottom: '0.75rem', flex: 1 }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Specializations</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {program.specializations.slice(0, 5).map((s, j) => (
                <span key={j} style={{ fontSize: '0.68rem', padding: '2px 8px', background: '#f1f5f9', color: '#475569', borderRadius: 50, fontWeight: 500 }}>
                  {s}
                </span>
              ))}
              {program.specializations.length > 5 && (
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: lightBg, color: brandColor, borderRadius: 50, fontWeight: 600 }}>
                  +{program.specializations.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        <button onClick={() => onEnroll(program.name)}
          style={{
            width: '100%', padding: '0.7rem', marginTop: 'auto',
            background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
            color: '#fff', border: 'none', borderRadius: '0.625rem',
            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            transition: 'all 0.2s', fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 4px 12px ${brandColor}40`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          Enroll Now →
        </button>
      </div>
    </div>
  );
}

export default function UniversityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [c1, c2] = getColors(slug);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolve = (uni: any): Omit<University, 'programs'> => ({
      ...uni,
      logoInitial: uni.logoInitial || uni.name?.charAt(0) || 'U',
      location: uni.location || 'India',
      naac: uni.naac || uni.ranking || uni.accreditation || 'UGC Approved',
      description: uni.description || `${uni.name} is a UGC-approved university offering quality online degree programs.`,
      facilities: uni.facilities?.length ? uni.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support', 'Live Classes', 'Career Guidance'],
      highlights: uni.highlights || [],
      logo: uni.logo || undefined,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match = (uni: any) => uni.slug === slug || uni.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug;

    Promise.all([
      fetch('/api/universities').then(r => r.json()),
      fetch('/api/public/programs').then(r => r.json())
    ]).then(([uniData, progData]) => {
      if (uniData.success && uniData.data?.length) {
        const found = uniData.data.find(match);
        if (found) {
          const progs = Array.isArray(progData) ? progData : progData?.data || [];
          const foundNamespace = found.name.toLowerCase().replace(/[\s.\-]/g, '');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const uniPrograms = progs.filter((p: any) => {
            const pUni = (p.university || '').toLowerCase().replace(/[\s.\-]/g, '');
            return pUni && (pUni === foundNamespace || pUni.includes(foundNamespace) || foundNamespace.includes(pUni));
          });

          setUniversity({
            ...resolve(found),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            programs: uniPrograms.map((p: any) => ({
              name: p.name,
              duration: p.duration || '2 Years',
              description: p.description,
              fee: p.fee,
              mode: p.mode,
              category: p.category,
              level: p.level,
              specializations: p.specializations,
              eligibility: p.eligibility,
            })),
          });
        } else {
          setError('not found');
        }
      } else {
        setError('not found');
      }
      setLoading(false);
    }).catch(() => { setError('error'); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: `4px solid ${c1}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error || !university) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.5rem' }}>University Not Found</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {error === 'error' ? 'Something went wrong. Please try again.' : `No university found for "${slug}".`}
        </p>
        <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: c1, color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Universities
        </Link>
      </div>
    </div>
  );

  const handleEnroll = (p: string) => { setSelectedProgram(p); setIsEnrollmentOpen(true); };
  const hasImage = !!(university.image && university.image.startsWith('http'));

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: 480, display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: hasImage ? '#0a102b' : `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
      }}>
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={university.image} alt={university.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: hasImage
            ? `linear-gradient(135deg, rgba(15,23,42,0.75) 0%, ${c1}88 100%)`
            : 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '10rem 2rem 5rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Link href="/universities" style={{ color: 'inherit', textDecoration: 'none' }}>Universities</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Details</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Logo initial circle */}
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontWeight: 800, color: '#fff',
                border: '3px solid rgba(255,255,255,0.3)',
                marginBottom: '1.25rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                {university.logoInitial || university.name.charAt(0)}
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                {university.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
                  <MapPin size={14} color="rgba(255,255,255,0.7)" /> {university.location}
                </span>
                {university.naac && (
                  <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                    {university.naac}
                  </span>
                )}
                {university.type && (
                  <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 50, fontSize: '0.72rem', fontWeight: 600 }}>
                    {university.type}
                  </span>
                )}
                {university.established && (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Est. {university.established}</span>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #f8fafc)', pointerEvents: 'none' }} />
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

        {/* About */}
        <AnimateOnScroll animation="fadeUp">
          <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 28, background: `${c1}15`, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color={c1} />
              </span>
              About the University
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>{university.description}</p>

            {university.highlights && university.highlights.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {university.highlights.map((h, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', background: `${c1}10`, borderRadius: 50, color: c1, fontWeight: 600, fontSize: '0.78rem' }}>
                    <CheckCircle size={12} color={c1} /> {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* Facilities */}
        {university.facilities?.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: `${c1}15`, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={15} color={c1} />
                </span>
                Facilities &amp; Features
              </h2>
              <div className="facilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {university.facilities.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <CheckCircle size={13} color={c1} />
                    <span style={{ fontSize: '0.83rem', color: '#475569', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Programs */}
        {university.programs?.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={160}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 28, height: 28, background: `${c1}15`, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={15} color={c1} />
                  </span>
                  Programs Offered
                </h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: c1, background: `${c1}12`, borderRadius: 50, padding: '3px 12px' }}>{university.programs.length} Programs</span>
              </div>
              <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {university.programs.map((program, index) => (
                  <ProgramCard key={index} program={program} brandColor={c1} onEnroll={handleEnroll} />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* CTA */}
        <AnimateOnScroll animation="fadeUp" delay={200}>
          <div style={{ marginTop: '1.5rem', background: `linear-gradient(135deg, ${c1}, ${c2})`, borderRadius: '1.25rem', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Need help choosing a program?</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem' }}>Our counsellors are here to guide you.</p>
            </div>
            <Link href="/contact" style={{ padding: '0.8rem 1.75rem', background: '#fff', color: c1, borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', flexShrink: 0 }}>
              Talk to Counsellor →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      {isEnrollmentOpen && (
        <EnrollmentModal onClose={() => setIsEnrollmentOpen(false)} university={university.name} program={selectedProgram} />
      )}
      <style>{`
        @media (max-width: 640px) {
          .uni-banner { height: 260px !important; }
          .programs-grid { grid-template-columns: 1fr !important; }
          .facilities-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
