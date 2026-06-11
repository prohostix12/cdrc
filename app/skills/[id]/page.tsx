'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Award, Users } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';
import { getContrastColor } from '@/lib/colors';

interface Course { name: string; duration: string; description?: string; }
interface Skill {
  _id: string; name: string; description: string; category: string;
  duration: string; level: string; price: string; image?: string;
  brochureUrl?: string; courses: Course[]; slug: string;
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner: '#16a34a', Intermediate: '#d97706', Advanced: '#dc2626',
};

const WHAT_YOU_LEARN: Record<string, string[]> = {
  DEFAULT: ['Practical hands-on skills', 'Industry-relevant knowledge', 'Real-world projects', 'Expert mentorship', 'Career guidance', 'Certificate on completion'],
};

export default function SkillDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) {
        const found = d.data.find((s: Skill) => s._id === id || s.slug === id);
        if (found) setSkill(found); else setError('not found');
      } else setError('not found');
      setLoading(false);
    }).catch(() => { setError('error'); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 44, height: 44, border: '4px solid #e2e8f0', borderTop: '4px solid #4361EE', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error || !skill) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.5rem' }}>Skill Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This skill course doesn&apos;t exist or has been removed.</p>
        <Link href="/skills" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: '#4361EE', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Skills
        </Link>
      </div>
    </div>
  );

  const levelColor = LEVEL_COLOR[skill.level] || '#4361EE';
  const learns = WHAT_YOU_LEARN[skill.name] || WHAT_YOU_LEARN['DEFAULT'];

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .skill-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }
        .skill-sidebar { position: sticky; top: 80px; }
        @media (max-width: 768px) {
          .skill-grid { grid-template-columns: 1fr !important; }
          .skill-sidebar { position: static !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image */}
        <img
          src={skill.image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600'}
          alt={skill.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(67,97,238,0.55) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '13rem 2rem 9rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Link href="/skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skill Courses</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Skill Details</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                <span style={{ background: `${levelColor}25`, border: `1px solid ${levelColor}40`, borderRadius: 50, padding: '4px 14px', color: getContrastColor(levelColor), fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {skill.level}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 14px', color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontWeight: 600 }}>
                  {skill.category}
                </span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em', maxWidth: 800 }}>
                {skill.name}
              </h1>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
      </section>

      {/* ── CONTENT ── */}
      <div className="skill-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* About */}
          <AnimateOnScroll animation="fadeUp">
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eef2ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={14} color="#4361EE" />
                </span>
                About this Course
              </h2>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>{skill.description}</p>
            </div>
          </AnimateOnScroll>

          {/* What you'll learn */}
          <AnimateOnScroll animation="fadeUp" delay={60}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eef2ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={14} color="#4361EE" />
                </span>
                What You&apos;ll Learn
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem' }}>
                {learns.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4361EE', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Course Modules Removed per request */}
        </div>

        {/* Sidebar */}
        <div className="skill-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              {skill.price && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Course Fee</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a' }}>₹{skill.price}</div>
                </div>
              )}
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>Course Details</div>
              {[
                { label: 'Duration', value: skill.duration || 'Flexible' },
                { label: 'Level', value: skill.level },
                { label: 'Category', value: skill.category },
                { label: 'Modules', value: `${skill.courses?.length || 0} modules` },
                { label: 'Mode', value: 'Online' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                  <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
              <button onClick={() => setEnrollOpen(true)}
                style={{ width: '100%', padding: '0.875rem', background: '#4361EE', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', marginTop: '1.25rem', marginBottom: '0.625rem', transition: 'background 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2d2d6b'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4361EE'; }}
              >
                Enroll Now
              </button>
              {skill.brochureUrl && (
                <a href={skill.brochureUrl} target="_blank" rel="noreferrer" download
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '0.75rem', background: '#f0fdf4', color: '#15803d', border: '1.5px solid #bbf7d0', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box', marginBottom: '0.625rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#dcfce7'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0fdf4'; }}
                >
                  📄 Download Brochure
                </a>
              )}
              <Link href="/contact" style={{ display: 'block', padding: '0.75rem', border: '1.5px solid #4361EE', color: '#4361EE', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center', transition: 'background 0.2s', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#eef2ff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                Free Counselling
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={120}>
            <div style={{ background: '#0f172a', borderRadius: 14, padding: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem', marginBottom: '1rem' }}>Why Choose CDRC?</h3>
              {['Industry-Expert Instructors', 'Hands-on Projects', 'Flexible Learning Schedule', 'Certificate on Completion', 'Career Support'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem' }}>
                  <CheckCircle size={13} color="#60a5fa" />
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={160}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.25rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>📞</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.2rem' }}>Need Help?</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>Mon–Sat, 9AM–6PM</div>
              <a href="tel:+919846446055" style={{ display: 'block', padding: '0.6rem', background: '#f0fdf4', color: '#15803d', borderRadius: 8, fontWeight: 500, fontSize: '0.85rem', textDecoration: 'none' }}>
                +91 9846446055
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {enrollOpen && (
        <EnrollmentModal onClose={() => setEnrollOpen(false)} university="CDRC Skill Programs" program={skill.name} />
      )}
    </div>
  );
}
