'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Award, BookOpen, GraduationCap, CheckCircle, Clock } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

// Royal blue palette
const RB = '#4169e1';
const RBD = '#2a4db5';
const RBL = '#e8eef9';

interface University {
  _id?: string;
  name: string;
  slug: string;
  location: string;
  naac: string;
  image?: string;
  logo?: string;
  description: string;
  facilities: string[];
  ranking?: string;
  programs: Array<{ name: string; duration: string; description?: string }>;
}

function ProgramCard({ program, onEnroll }: {
  program: { name: string; duration: string; description?: string };
  onEnroll: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const desc = program.description || '';
  const words = desc.split(' ');
  const isLong = words.length > 25;
  const preview = isLong && !expanded ? words.slice(0, 25).join(' ') + '...' : desc;

  return (
    <div style={{ background: '#fff', borderRadius: '0.875rem', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = RB; el.style.boxShadow = `0 6px 20px rgba(65,105,225,0.12)`; el.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#e2e8f0'; el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'; el.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
        <div style={{ width: 38, height: 38, borderRadius: '0.625rem', background: RBL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BookOpen size={18} color={RB} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.2rem' }}>{program.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} color="#94a3b8" />
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{program.duration}</span>
          </div>
        </div>
      </div>
      {desc && (
        <div style={{ flex: 1, marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{preview}</p>
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: RB, fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', padding: '3px 0 0', display: 'block' }}>
              {expanded ? 'See Less ↑' : 'See More ↓'}
            </button>
          )}
        </div>
      )}
      <button onClick={() => onEnroll(program.name)}
        style={{ width: '100%', padding: '0.6rem', background: RB, color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 500, fontSize: '0.82rem', cursor: 'pointer', marginTop: 'auto', transition: 'background 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = RBD; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = RB; }}
      >Enroll Now</button>
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolve = (uni: any): University => ({
      ...uni,
      location: uni.location || 'India',
      naac: uni.naac || uni.ranking || uni.accreditation || 'UGC Approved',
      description: uni.description || `${uni.name} is a UGC-approved university offering quality online degree programs.`,
      facilities: uni.facilities?.length ? uni.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support', 'Live Classes', 'Career Guidance'],
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
          
          const uniPrograms = progs.filter((p: any) => {
             const pUni = (p.university || '').toLowerCase().replace(/[\s.\-]/g, '');
             return pUni && (pUni === foundNamespace || pUni.includes(foundNamespace) || foundNamespace.includes(pUni));
          });

          setUniversity({
            ...resolve(found),
            programs: uniPrograms.map((p: any) => ({
               name: p.name,
               duration: p.duration || '2 Years',
               description: p.description || (p.fee ? `Total Fee: ${p.fee}` : undefined)
            }))
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
      <div style={{ width: 40, height: 40, border: `4px solid #e2e8f0`, borderTop: `4px solid ${RB}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
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
        <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: RB, color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Universities
        </Link>
      </div>
    </div>
  );

  const handleEnroll = (p: string) => { setSelectedProgram(p); setIsEnrollmentOpen(true); };
  const hasImage = !!university.image;

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 480, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image - ONLY IF PROVIDED */}
        {hasImage && (
          <img
            src={university.image}
            alt={university.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        )}
        {/* Transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: hasImage 
          ? 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(67,97,238,0.55) 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)' // Darker blue gradient if no image
        }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '10rem 2rem 5rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Link href="/universities" style={{ color: 'inherit', textDecoration: 'none' }}>Universities</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Details</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {university.logo && (
                <div style={{ width: 80, height: 80, background: '#fff', borderRadius: 16, padding: 8, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={university.logo} alt={`${university.name} Logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              )}
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
                {university.name}
              </h1>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #f8fafc)', pointerEvents: 'none' }} />
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

        {/* About */}
        <AnimateOnScroll animation="fadeUp">
          <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color={RB} />
              </span>
              About the University
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>{university.description}</p>
            {university.ranking && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: '1rem', padding: '5px 12px', background: RBL, borderRadius: 50, color: RB, fontWeight: 500, fontSize: '0.78rem' }}>
                <Award size={13} color={RB} /> {university.ranking}
              </span>
            )}
          </div>
        </AnimateOnScroll>

        {/* Facilities */}
        {university.facilities?.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={15} color={RB} />
                </span>
                Facilities &amp; Features
              </h2>
              <div className="facilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {university.facilities.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <CheckCircle size={13} color={RB} />
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
                  <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={15} color={RB} />
                  </span>
                  Programs Offered
                </h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: RB, background: RBL, borderRadius: 50, padding: '3px 12px' }}>{university.programs.length} Programs</span>
              </div>
              <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {university.programs.map((program, index) => (
                  <ProgramCard key={index} program={program} onEnroll={handleEnroll} />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* CTA */}
        <AnimateOnScroll animation="fadeUp" delay={200}>
          <div style={{ marginTop: '1.5rem', background: `linear-gradient(135deg, ${RB}, ${RBD})`, borderRadius: '1.25rem', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Need help choosing a program?</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem' }}>Our counsellors are here to guide you.</p>
            </div>
            <Link href="/contact" style={{ padding: '0.8rem 1.75rem', background: '#fff', color: RB, borderRadius: 8, fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', flexShrink: 0 }}>
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
