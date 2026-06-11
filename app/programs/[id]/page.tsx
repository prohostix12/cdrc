'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle, GraduationCap, Users } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

interface Program {
  _id: string;
  name: string;
  duration: string;
  university: string;
  description?: string;
  youtubeUrl?: string;
  image?: string;
}

// Converts any YouTube URL format to an embeddable URL
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    // Handle youtu.be short links
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    // Handle youtube.com/watch?v=
    const watchMatch = url.match(/[?&]v=([\w-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    // Handle youtube.com/embed/ (already embedded)
    if (url.includes('youtube.com/embed/')) return url;
    return null;
  } catch {
    return null;
  }
}

const HIGHLIGHTS: Record<string, string[]> = {
  MBA: ['Business Strategy', 'Financial Management', 'Marketing Analytics', 'Operations Management', 'Leadership Skills', 'Business Ethics'],
  MCA: ['Software Engineering', 'Data Structures', 'Cloud Computing', 'Cybersecurity', 'AI & Machine Learning', 'Database Systems'],
  BBA: ['Business Fundamentals', 'Entrepreneurship', 'Digital Marketing', 'HR Management', 'Finance Basics', 'Business Communication'],
  BCA: ['Programming Languages', 'Database Management', 'Web Development', 'Networking', 'Software Testing', 'Mobile App Dev'],
  DEFAULT: ['Comprehensive Curriculum', 'Industry-Relevant Skills', 'Expert Faculty', 'Flexible Learning', 'Career Support', 'Live Sessions'],
};

const CAREER_ROLES: Record<string, string[]> = {
  MBA: ['Business Manager', 'Marketing Manager', 'Finance Analyst', 'HR Manager', 'Operations Head', 'Entrepreneur'],
  MCA: ['Software Developer', 'Data Scientist', 'Cloud Architect', 'Cybersecurity Analyst', 'IT Manager', 'Full Stack Dev'],
  BBA: ['Business Analyst', 'Sales Executive', 'Marketing Executive', 'HR Executive', 'Entrepreneur', 'Brand Manager'],
  BCA: ['Web Developer', 'Software Tester', 'Database Admin', 'Network Engineer', 'App Developer', 'UI/UX Designer'],
  DEFAULT: ['Industry Professional', 'Team Lead', 'Consultant', 'Analyst', 'Manager', 'Specialist'],
};

function getKey(name: string): string {
  const n = name.toUpperCase();
  for (const key of ['MBA', 'MCA', 'BBA', 'BCA']) {
    if (n.includes(key)) return key;
  }
  return 'DEFAULT';
}

const STEPS = [
  { num: '01', title: 'Apply Online', desc: 'Fill the enrollment form with your details' },
  { num: '02', title: 'Submit Documents', desc: 'Upload your academic certificates' },
  { num: '03', title: 'Pay Fees', desc: 'One-time or EMI payment options available' },
  { num: '04', title: 'Start Learning', desc: 'Access the portal and begin your journey' },
];

export default function ProgramDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    fetch('/api/programs').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) {
        const found = d.data.find((p: Program) => p._id?.toString() === id);
        if (found) setProgram(found); else setError('not found');
      } else setError('not found');
      setLoading(false);
    }).catch(() => { setError('error'); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 44, height: 44, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error || !program) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.5rem' }}>Program Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This program doesn&apos;t exist or has been removed.</p>
        <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: '#1e40af', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Programs
        </Link>
      </div>
    </div>
  );

  const key = getKey(program.name);
  const highlights = HIGHLIGHTS[key];
  const roles = CAREER_ROLES[key];
  const isUG = ['BA', 'BBA', 'BCA', 'BCOM', 'B COM', 'BSC'].some(p => program.name.toUpperCase().startsWith(p));

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .prog-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }
        .prog-sidebar { position: sticky; top: 80px; }
        @media (max-width: 768px) {
          .prog-grid { grid-template-columns: 1fr !important; }
          .prog-sidebar { position: static !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 640, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt={program.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(67,97,238,0.55) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '13rem 2rem 9rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Link href="/programs" style={{ color: 'inherit', textDecoration: 'none' }}>Programs</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>Program Details</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                <span style={{ background: isUG ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${isUG ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'}`, borderRadius: 50, padding: '4px 14px', color: isUG ? '#86efac' : '#93c5fd', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {isUG ? 'Undergraduate' : 'Postgraduate'}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 14px', color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontWeight: 600 }}>
                  UGC Approved
                </span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em', maxWidth: 800 }}>
                {program.name}
              </h1>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
      </section>

      {/* ── CONTENT ── */}
      <div className="prog-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* About */}
          <AnimateOnScroll animation="fadeUp">
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={14} color="#1e40af" />
                </span>
                About this Program
              </h2>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>
                {program.description || `${program.name} is a UGC-DEB approved online program offered through CDRC's partner universities. This ${program.duration} program equips students with industry-relevant skills through a flexible online format, allowing you to study at your own pace from anywhere in India.`}
              </p>
            </div>
          </AnimateOnScroll>

          {/* ── YouTube Video ── */}
          {program.youtubeUrl && getYouTubeEmbedUrl(program.youtubeUrl) && (
            <AnimateOnScroll animation="fadeUp" delay={40}>
              <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 28, height: 28, background: '#fef2f2', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 3 12 3 12 3s-4.1 0-6.8.2C4.5 4 3.2 4 2.2 5.2 1.3 6 1 8 1 8S.7 10.3.7 12.5v2.1c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8C3.3 23 4.8 22.9 5.5 23c2.1.2 8.5.2 8.5.2s4.1 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.5v-2.1C23.3 9.3 23 7 23 7zM9.7 15.5V8.5l6.6 3.5-6.6 3.5z"/></svg>
                  </span>
                  Program Overview Video
                </h2>
                <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
                  <iframe
                    src={getYouTubeEmbedUrl(program.youtubeUrl)!}
                    title={`${program.name} overview video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll animation="fadeUp" delay={60}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={14} color="#1e40af" />
                </span>
                What You&apos;ll Learn
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem' }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e40af', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Career Opportunities */}
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={14} color="#1e40af" />
                </span>
                Career Opportunities
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {roles.map((r, i) => (
                  <span key={i} style={{ padding: '6px 14px', background: '#eff6ff', color: '#1e40af', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, border: '1px solid #bfdbfe' }}>{r}</span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Admission Process */}
          <AnimateOnScroll animation="fadeUp" delay={140}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={14} color="#1e40af" />
                </span>
                Admission Process
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1, marginBottom: '0.5rem' }}>{s.num}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.3rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Sidebar */}
        <div className="prog-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Program Details</div>
              {[
                { label: 'Duration', value: program.duration },
                { label: 'Mode', value: 'Online' },
                { label: 'Approval', value: 'UGC-DEB' },
                { label: 'Level', value: isUG ? 'Undergraduate' : 'Postgraduate' },
                ...(program.university ? [{ label: 'University', value: program.university }] : []),
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                  <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{item.value}</span>
                </div>
              ))}
              <button onClick={() => setEnrollOpen(true)}
                style={{ width: '100%', padding: '0.85rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', marginTop: '1.25rem', marginBottom: '0.625rem', transition: 'background 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e3a8a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e40af'; }}
              >
                Apply Now
              </button>
              <Link href="/contact" style={{ display: 'block', padding: '0.75rem', border: '1.5px solid #1e40af', color: '#1e40af', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center', transition: 'background 0.2s', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#eff6ff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                Free Counselling
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={120}>
            <div style={{ background: '#0f172a', borderRadius: 14, padding: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem', marginBottom: '1rem' }}>Why Choose CDRC?</h3>
              {['UGC-DEB Approved Programs', 'Free Expert Counselling', 'Flexible Online Learning', 'EMI Payment Options', 'Placement Assistance'].map((item, i) => (
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
        <EnrollmentModal onClose={() => setEnrollOpen(false)} university={program.university || 'CDRC'} program={program.name} />
      )}
    </div>
  );
}
