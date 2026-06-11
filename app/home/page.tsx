'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { GraduationCap, Award, Monitor, Building, DollarSign, Phone } from '@/components/Icon';
import { StatCard } from '@/components/HeroAnimations';
import { getContrastColor } from '@/lib/colors';
import { DotGrid, PlusSymbol } from '@/components/HeroDecorations';

const CARD_COLORS = ['#4361EE', '#4895ef', '#3a0ca3', '#7c3aed', '#0f766e', '#b45309'];


interface UniCard {
  name: string;
  slug: string;
  accreditation: string;
  initial: string;
  color: string;
  image?: string;
}

const features = [
  { title: 'UGC Approved Programs', desc: 'All programs are UGC-DEB approved and equivalent to regular degrees, valid for government jobs and higher studies.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80' },
  { title: 'Flexible Learning', desc: 'Study anywhere, anytime on any device. No fixed class schedules - learn at your own pace.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' },
  { title: '14+ Partner Universities', desc: 'Choose from top NAAC-accredited universities including Amity, Manipal, GLA, Jain, and more.', img: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&q=80' },
  { title: 'Affordable Fees', desc: 'Programs starting from Rs.10,000. EMI options and scholarships available for eligible students.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80' },
  { title: 'Expert Guidance', desc: 'Our counselors help you choose the right program and university based on your career goals.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80' },
  { title: 'Proven Results', desc: '73% of graduates report career advancement within 2 years of completing their online degree.', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80' },
];

const advantages = [
  { title: 'Flexibility and Convenience', desc: 'Study at your own pace, anytime, anywhere, and balance your studies with your work and personal life.' },
  { title: 'Cost Effectiveness', desc: 'Online programs can be more affordable compared to traditional on-campus programs.' },
  { title: 'Wide Range of Programs', desc: 'Choose from a variety of undergraduate and postgraduate degree programs across diverse fields.' },
  { title: 'Online Exam', desc: 'You can choose your space to write the exam. No worry about centre, travel, or location.' },
];

const PROGRAM_META: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  default: { color: '#4361EE', bg: '#eef2ff', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
  mba:     { color: '#7c3aed', bg: '#f5f3ff', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg> },
  mca:     { color: '#0f766e', bg: '#f0fdfa', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  bca:     { color: '#0f766e', bg: '#f0fdfa', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  bba:     { color: '#b45309', bg: '#fffbeb', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z"/></svg> },
  mcom:    { color: '#be185d', bg: '#fdf2f8', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  bcom:    { color: '#be185d', bg: '#fdf2f8', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  msc:     { color: '#1d4ed8', bg: '#eff6ff', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg> },
};

function getProgramMeta(name: string) {
  const key = name.toLowerCase().replace(/[\s.]/g, '');
  for (const prefix of Object.keys(PROGRAM_META)) {
    if (key.startsWith(prefix)) return PROGRAM_META[prefix];
  }
  return PROGRAM_META.default;
}

function FeaturedPrograms() {
  const [programs, setPrograms] = useState<Array<{ _id: string; name: string; duration: string; university: string }>>([]);

  useEffect(() => {
    fetch('/api/programs').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) setPrograms(d.data.slice(0, 6));
    }).catch(() => {});
  }, []);

  if (!programs.length) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
      {programs.map((p, i) => {
        const { color, bg, icon } = getProgramMeta(p.name);
        const isUG = ['ba', 'bba', 'bca', 'bcom', 'bsc'].some(x => p.name.toLowerCase().replace(/[\s.]/g, '').startsWith(x));
        return (
          <AnimateOnScroll key={p._id} animation="slideUpBounce" delay={i * 80}>
            <Link href={`/programs/${p._id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #f1f5f9', overflow: 'hidden', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = color; el.style.boxShadow = `0 16px 40px ${color}28`; el.style.transform = 'translateY(-6px) scale(1.02)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#f1f5f9'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; el.style.transform = 'translateY(0) scale(1)'; }}
              >
                {/* Colored top band */}
                <div style={{ height: 6, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />

                <div style={{ padding: '1.4rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {/* Icon + badge row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                      {icon}
                    </div>
                    <span style={{ background: isUG ? '#f0fdf4' : '#eff6ff', color: isUG ? '#15803d' : '#1e40af', fontSize: '0.65rem', fontWeight: 500, padding: '3px 10px', borderRadius: 50, textTransform: 'uppercase', letterSpacing: '0.06em', border: `1px solid ${isUG ? '#bbf7d0' : '#bfdbfe'}` }}>
                      {isUG ? 'Under Graduate' : 'Post Graduate'}
                    </span>
                  </div>

                  {/* Program name */}
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.3, margin: '0 0 0.3rem' }}>{p.name}</h3>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#64748b' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {p.duration}
                      </span>
                      {p.university && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#94a3b8' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                          {p.university}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 5, color, fontWeight: 600, fontSize: '0.83rem' }}>
                    View Program
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}

function UniversityHomeCard({ uni }: { uni: UniCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1.5px solid ${hovered ? uni.color : '#e2e8f0'}`, transition: 'all 0.3s ease', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? `0 16px 40px ${uni.color}22` : '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 8, background: uni.color }} />
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, background: uni.color, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 600, color: getContrastColor(uni.color), flexShrink: 0 }}>{uni.initial}</div>
            <div>
              <h3 style={{ fontSize: '0.97rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.3, margin: 0 }}>{uni.name}</h3>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '2px 8px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 500, marginTop: 4 }}>{uni.accreditation}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: uni.color, fontWeight: 600, fontSize: '0.82rem' }}>
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PopupLeadForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, course: form.interest, source: 'Course Finder' }),
      });
    } catch {}
    setSubmitting(false);
    setDone(true);
    setTimeout(onClose, 1500);
  };

  const inp: React.CSSProperties = { width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };

  if (done) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>✅</div>
      <p style={{ fontWeight: 500, color: '#0f172a' }}>Thank you! We&apos;ll be in touch soon.</p>
    </div>
  );

  return (
    <div style={{ padding: '1.5rem 2rem 2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
        {[
          { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
          { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
          { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', required: true },
        ].map(({ key, label, type, placeholder, required }) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
            <input type={type} required={required} placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              style={inp}
              onFocus={e => (e.target.style.borderColor = '#0051ba')}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
        ))}
        <div>
          <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>Area of Interest</label>
          <select value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} style={{ ...inp, cursor: 'pointer', background: '#fff' }}>
            <option value="">Select a field...</option>
            {['MBA / Management', 'BBA / Business', 'MCA / BCA (Tech)', 'B.Com / M.Com', 'Arts & Humanities', 'Science', 'Other'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <button type="submit" disabled={submitting}
          style={{ width: '100%', padding: '13px', background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #0051ba, #1a7fe8)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, fontSize: '.92rem', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,81,186,0.35)' }}>
          {submitting ? 'Submitting...' : 'Submit & Find My Course →'}
        </button>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          Maybe later
        </button>
      </form>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const [featuredUniversityCards, setFeaturedUniversityCards] = useState<UniCard[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('cdrc_lead_submitted')) {
      const t = setTimeout(() => setShowPopup(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handlePopupClose = () => setShowPopup(false);

  useEffect(() => {
    if (searchParams.get('openCourseFinder') === '1') {
      const tryOpen = (attempts = 0) => {
        const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement | null;
        if (btn) { btn.click(); }
        else if (attempts < 10) { setTimeout(() => tryOpen(attempts + 1), 200); }
      };
      setTimeout(() => tryOpen(), 400);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cards: UniCard[] = d.data.slice(0, 6).map((u: any, i: number) => {
          let brandColor = '#4361EE';
          if (u.image?.includes('blue')) brandColor = '#2563eb';
          else if (u.image?.includes('green')) brandColor = '#16a34a';
          else if (u.image?.includes('red')) brandColor = '#dc2626';
          else if (u.image?.includes('purple')) brandColor = '#9333ea';
          else if (u.image?.includes('orange')) brandColor = '#ea580c';
          else if (u.image?.includes('yellow')) brandColor = '#ca8a04';
          else brandColor = CARD_COLORS[i % CARD_COLORS.length];

          const definedSlug = u.slug || u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const imageSrc = u.image?.startsWith('http') ? u.image : undefined;

          return {
            name: u.name,
            slug: definedSlug,
            accreditation: u.naac || u.ranking || u.accreditation || 'UGC Approved',
            initial: u.name.charAt(0).toUpperCase(),
            color: brandColor,
            image: imageSrc,
          };
        });
        setFeaturedUniversityCards(cards);
      }
    }).catch(() => {});
  }, []);
  const iconComponents = [
    <GraduationCap key={0} size={22} color="#4361EE" />,
    <Monitor key={1} size={22} color="#4361EE" />,
    <Building key={2} size={22} color="#4361EE" />,
    <DollarSign key={3} size={22} color="#4361EE" />,
    <Phone key={4} size={22} color="#4361EE" />,
    <Award key={5} size={22} color="#4361EE" />,
  ];

  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .h-badge{animation:fadeUp .6s .1s ease both}
        .h-title{animation:fadeUp .7s .2s ease both}
        .h-sub  {animation:fadeUp .7s .35s ease both}
        .h-btns {animation:fadeUp .7s .5s ease both}
        .h-img  {animation:fadeUp .9s .25s ease both}
        .fc1{animation:float1 4s ease-in-out infinite}
        .fc2{animation:float2 5s ease-in-out infinite}
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 2.5rem !important; min-height: auto !important; padding-bottom: 2rem; }
          .hero-left { display: flex; flex-direction: column; align-items: center; }
          .h-btns { justify-content: center; width: 100%; }
          .hero-badges { justify-content: center; }
          .hero-right { height: auto !important; padding: 20px 0 40px; }
          .fc1, .fc2 { display: none !important; }
          .hg{grid-template-columns:1fr !important}
          .hr{display:none !important}
          .ag{grid-template-columns:1fr !important}
          .about-grid-3{grid-template-columns:1fr !important; min-height:auto !important;}
          .about-img-col{flex-direction:row !important;}
          .about-img-col > div{min-height:140px !important;}
        }
        @media(max-width:640px){
          .sg{grid-template-columns:1fr 1fr !important}
          .h-btns{flex-direction:column !important; align-items:stretch !important; gap: 0.75rem !important; width: 100%; }
          .h-btns a, .h-btns button { width: 100% !important; justify-content: center !important; }
          .hero-badges { justify-content: center !important; gap: 1rem !important; flex-wrap: wrap !important; }
          .h-title { font-size: 2.2rem !important; }
          .h-sub { font-size: 1rem !important; margin-bottom: 2rem !important; }
          .hero-right-img { border-radius: 20px !important; height: 280px !important; }
          .grid-card-container { grid-template-columns: 1fr !important; }
        }
        @media(max-width:480px){
          .sg{grid-template-columns:1fr !important}
          .hero-right-img { height: 220px !important; }
          .about-img-col{flex-direction:column !important;}
          section { padding: 3.5rem 1rem !important; }
        }
        @keyframes shimmer { 0%{transform:scaleX(0);transform-origin:left} 100%{transform:scaleX(1);transform-origin:left} }
        .benefit-divider { animation: shimmer 0.6s ease forwards; }
        @keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:0.6;transform:translateY(0)} }
        .benefit-num { animation: countUp 0.5s ease both; }
        @keyframes uniShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      {/* -- HERO -- */}
      <section style={{ background: '#4169E1', minHeight: '100vh', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
        {/* Royal blue layered mesh */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #2a4db5 0%, #4169E1 40%, #5a7fe8 70%, #3358d4 100%)', pointerEvents: 'none' }} />
        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,160,255,0.35) 0%, rgba(41,82,196,0.15) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,77,183,0.5) 0%, rgba(13,43,122,0.2) 50%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,180,255,0.15) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(20px)' }} />
        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        {/* Decorative Dot Grid Bottom Left */}
        <DotGrid style={{ position: 'absolute', bottom: '40px', left: '20px' }} />
        {/* Diagonal light streak */}
        <div style={{ position: 'absolute', top: 0, right: '20%', width: 2, height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent)', transform: 'rotate(15deg)', transformOrigin: 'top', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: '35%', width: 1, height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 60%, transparent)', transform: 'rotate(15deg)', transformOrigin: 'top', pointerEvents: 'none' }} />
        <style>{`
          @keyframes heroFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.95)} }
          @keyframes heroFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,30px) scale(1.08)} 66%{transform:translate(25px,-25px) scale(0.92)} }
          @keyframes heroFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
          @keyframes heroRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        `}</style>
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,160,255,0.3) 0%, transparent 70%)', animation: 'heroFloat1 8s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,120,220,0.35) 0%, transparent 70%)', animation: 'heroFloat2 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '40%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(150,200,255,0.2) 0%, transparent 70%)', animation: 'heroFloat3 6s ease-in-out infinite', pointerEvents: 'none' }} />
        {/* Pulsing ring */}
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 120, height: 120, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', animation: 'heroPulse 4s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 80, height: 80, margin: '20px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'heroPulse 4s ease-in-out infinite 1s', pointerEvents: 'none' }} />
        {/* Slow rotating ring bottom-right */}
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', animation: 'heroRotate 20s linear infinite', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 1fr', gap: '4rem', alignItems: 'center', minHeight: '82vh' }}>

            {/* LEFT COLUMN */}
            <div className="hero-left" style={{ position: 'relative' }}>
              <div className="h-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 50, padding: '6px 16px', color: '#fff', fontSize: '0.8rem', fontWeight: 600, marginBottom: '2.5rem', backdropFilter: 'blur(8px)' }}>
                <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                India&apos;s Trusted Online Education Partner
              </div>
              <h1 className="h-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', fontWeight: 600, lineHeight: 1.1, color: '#fff', marginBottom: '1.8rem', letterSpacing: '-0.02em' }}>
                Advance Your<br />
                Career<br />
                with <span style={{ color: '#90e0ef' }}>Online Degrees</span>
              </h1>
              <p className="h-sub" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.8rem', maxWidth: 480 }}>
                Get UGC-approved degrees from India&apos;s top NAAC-accredited universities. Study at your own pace, from anywhere in the world.
              </p>
              <div className="h-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <Link href="/programs"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 500, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,99,235,0.45)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2d4fd6'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(37,99,235,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#4361EE'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(37,99,235,0.45)'; }}
                >
                  Explore Programs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <button onClick={() => { const b = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (b) b.click(); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Find My Course
                </button>
              </div>
              <div className="hero-badges" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[['UGC Approved', '#4ade80'], ['NAAC Accredited', '#90e0ef'], ['WES Recognized', '#c084fc']].map(([lbl, clr]) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={clr} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    {lbl}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="hero-right" style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DotGrid style={{ position: 'absolute', top: -30, right: -40, zIndex: 0 }} />
              <PlusSymbol style={{ top: '15%', left: '0' }} />
              
              <div className="hero-right-img" style={{ position: 'relative', width: '100%', maxWidth: 460, height: 440, borderRadius: 32, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', zIndex: 2 }}>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 60%)' }} />
              </div>

              {/* FLOATING CARDS */}
              <div className="hero-card fc1" style={{ position: 'absolute', top: '25px', left: '-50px', background: '#fff', borderRadius: 20, padding: '16px 28px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
                <div style={{ width: 44, height: 44, background: '#eef2ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GraduationCap size={24} color="#4361EE" /></div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e40af', lineHeight: 1 }}>15,000+</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Students</div>
                </div>
              </div>

              <div className="hero-card fc2" style={{ position: 'absolute', bottom: '25px', right: '-50px', background: '#fff', borderRadius: 20, padding: '16px 28px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 10 }}>
                <div style={{ width: 44, height: 44, background: '#F0FDF4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={24} color="#15803d" /></div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#15803d', lineHeight: 1 }}>95%</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Placement Rate</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -- WHY CDRC -- */}
      <section style={{ padding: '5.5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Why CDRC</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 500, color: '#0f172a', lineHeight: 1.15, marginBottom: '0.75rem' }}>The smarter way to earn your degree</h2>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>Everything you need � from expert guidance to UGC-approved degrees � all in one place.</p>
            </div>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 55}>
                <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1.5px solid #f1f5f9', transition: 'all 0.25s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(67,97,238,0.12)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {/* Card image */}
                  <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                    <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(67,97,238,0.55) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 12, left: 14, width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {iconComponents[i]}
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.45rem', lineHeight: 1.3 }}>{f.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* -- ABOUT -- */}
      <section style={{ padding: '5.5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Centered heading */}
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 500, color: '#0f172a', marginBottom: '0.75rem' }}>About CDRC</h2>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                CDRC is dedicated to making quality higher education accessible to all students across India.
              </p>
            </div>
          </AnimateOnScroll>

          {/* 3-column grid */}
          <div className="about-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 1fr', gap: '1rem', minHeight: 420 }}>

            {/* Left column � 2 stacked images */}
            <AnimateOnScroll animation="slideRight">
              <div className="about-img-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', minHeight: 190, transition: 'transform 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80" alt="CDRC team" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
                </div>
                <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', minHeight: 190, transition: 'transform 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Center column � dark card with text */}
            <AnimateOnScroll animation="fadeUp" delay={100}>
              <div style={{ background: '#1a1a2e', borderRadius: 20, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', position: 'relative', overflow: 'hidden' }}>
                {/* subtle pattern */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'radial-gradient(circle, rgba(67,97,238,0.25) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, background: 'radial-gradient(circle, rgba(67,97,238,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(67,97,238,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(67,97,238,0.4)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#fff', lineHeight: 1.25, marginBottom: '1rem' }}>
                    A Team Committed<br />to Real Impact
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                    CDRC is built by a passionate team dedicated to making quality higher education accessible. With a focus on guidance, trust, and results, we help students transform their careers.
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[['14+', 'Universities'], ['500+', 'Programs'], ['10K+', 'Students']].map(([val, lbl]) => (
                      <div key={lbl}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#4361EE', lineHeight: 1 }}>{val}</div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', marginTop: 3, fontWeight: 500 }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right column � 2 stacked images */}
            <AnimateOnScroll animation="slideLeft">
              <div className="about-img-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', minHeight: 190, transition: 'transform 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  <img src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=500&q=80" alt="University" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', minHeight: 190, transition: 'transform 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80" alt="Guidance" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Learn More link */}
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 500, textDecoration: 'none', fontSize: '0.93rem', boxShadow: '0 4px 16px rgba(67,97,238,0.3)' }}>
                Learn More About Us
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      {/* -- ADVANTAGES -- */}
      <section style={{ padding: '5.5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Benefits</span>
                <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 500, color: '#0f172a', lineHeight: 1.15, margin: 0 }}>Why online degrees work</h2>
              </div>
              <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '11px 22px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', flexShrink: 0 }}>
                Explore Programs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {advantages.map((a, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 80}>
                <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', border: '1px solid #e2e8f0', transition: 'all 0.25s ease', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#4361EE'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(67,97,238,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {/* Large number */}
                  <div className="benefit-num" style={{ fontSize: '3rem', fontWeight: 600, color: '#4361EE', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', opacity: 0.6 }}>
                    0{i + 1}
                  </div>
                  {/* Divider */}
                  <div className="benefit-divider" style={{ width: 40, height: 3, background: '#4361EE', borderRadius: 2 }} />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#0f172a', lineHeight: 1.3, margin: 0 }}>{a.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{a.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* -- PARTNER UNIVERSITIES -- */}
      <section style={{ padding: '5.5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Partner Institutions</span>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 500, color: '#0f172a', lineHeight: 1.15, marginBottom: '0.75rem' }}>Our Partner Universities</h2>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>Top NAAC-accredited universities offering UGC-approved online programs</p>
            </div>
          </AnimateOnScroll>

          <div className="grid-card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {featuredUniversityCards.map((uni, i) => (
              <AnimateOnScroll key={uni.slug} animation="bounceIn" delay={i * 100}>
                <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', height: '100%', display: 'flex', flexDirection: 'column' }}
                    onMouseEnter={e => { 
                      const el = e.currentTarget as HTMLDivElement; 
                      el.style.transform = 'translateY(-8px)'; 
                      el.style.boxShadow = `0 24px 56px ${uni.color}35`; 
                      el.style.borderColor = uni.color; 
                      const img = el.querySelector('.uni-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1.06)';
                      const overlay = el.querySelector('.uni-color-overlay') as HTMLDivElement;
                      if (overlay) overlay.style.opacity = '0.7';
                    }}
                    onMouseLeave={e => { 
                      const el = e.currentTarget as HTMLDivElement; 
                      el.style.transform = 'translateY(0)'; 
                      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; 
                      el.style.borderColor = '#e2e8f0'; 
                      const img = el.querySelector('.uni-img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1)';
                      const overlay = el.querySelector('.uni-color-overlay') as HTMLDivElement;
                      if (overlay) overlay.style.opacity = '0';
                    }}>
                    {/* Image banner */}
                    <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: '#0a102b' }}>
                      {uni.image && (
                        <img className="uni-img" src={uni.image} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.5s ease' }} />
                      )}
                      
                      {/* Color overlay that fades in on hover */}
                      <div className="uni-color-overlay" style={{ position: 'absolute', inset: 0, background: uni.color, opacity: 0, transition: 'opacity 0.3s ease', mixBlendMode: 'multiply' }} />
                      {/* Permanent dark gradient for text legibility */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                      
                      {/* Bottom-left accreditation badge over image */}
                      <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                        <span style={{ display: 'inline-block', background: uni.color, color: getContrastColor(uni.color), fontSize: '0.65rem', fontWeight: 600, padding: '4px 10px', borderRadius: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {uni.accreditation}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem' }}>{uni.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: uni.color, fontWeight: 600, fontSize: '0.83rem', marginTop: 'auto', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                        View Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '13px 30px', borderRadius: 10, fontWeight: 500, textDecoration: 'none', fontSize: '0.95rem', boxShadow: '0 4px 16px rgba(67,97,238,0.3)' }}>
                View All Universities
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* -- FEATURED PROGRAMS -- */}
      <section style={{ padding: '5.5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>Popular Programs</span>
                <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 500, color: '#0f172a', lineHeight: 1.15, margin: 0 }}>Featured Programs</h2>
              </div>
              <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '11px 22px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', flexShrink: 0 }}>
                View All Programs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </AnimateOnScroll>
          <FeaturedPrograms />
        </div>
      </section>

      {/* -- CTA -- */}
      <section style={{ padding: '5.5rem 2rem', background: 'linear-gradient(150deg,#2d2d6b 0%,#4361EE 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 320, height: 320, background: 'radial-gradient(circle,rgba(59,130,246,0.14) 0%,transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 260, height: 260, background: 'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)', borderRadius: '50%' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, padding: '5px 14px', color: '#93c5fd', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Start Today
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 500, color: '#fff', marginBottom: '1rem', lineHeight: 1.15 }}>
              Ready to transform your career?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 2.5rem' }}>
              Join 10,000+ students who have advanced their careers with CDRC. Get free expert guidance and find the perfect program.
            </p>
            <div className="h-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ background: '#4361EE', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 500, textDecoration: 'none', fontSize: '0.93rem', boxShadow: '0 4px 18px rgba(37,99,235,0.4)', textAlign: 'center' }}>
                Free Consultation
              </Link>
              <Link href="/universities" style={{ background: 'rgba(255,255,255,0.07)', color: '#e2e8f0', padding: '13px 28px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: '0.93rem', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
                Explore Universities
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* AUTO POPUP — Course Finder promo */}
      {/* AUTO POPUP — Course Finder promo */}
      {showPopup && (
        <>
          <style>{`
            @keyframes modalEnter {
              0% { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
              100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes pulseGlow {
              0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4); }
              70% { box-shadow: 0 0 0 12px rgba(67, 97, 238, 0); }
              100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
            }
            @keyframes floatShape1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(25px, -25px) scale(1.1); }
            }
            @keyframes floatShape2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-25px, 25px) scale(1.05); }
            }
            @keyframes sweep {
              0% { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
          `}</style>
          
          {/* OVERLAY */}
          <div onClick={handlePopupClose} style={{ position:'fixed', inset:0, background:'rgba(10, 15, 30, 0.8)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', zIndex:2000, transition: 'all 0.5s ease' }} />
          
          {/* MODAL CONTAINER */}
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:2001, width:'92%', maxWidth:420, animation:'modalEnter 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
            
            {/* AMBIENT GLOWING SHAPES - MATCHING SITE'S THEME */}
            <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, background: '#4361EE', filter: 'blur(60px)', borderRadius: '50%', opacity: 0.65, animation: 'floatShape1 8s ease-in-out infinite', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: -50, left: -40, width: 180, height: 180, background: '#4895ef', filter: 'blur(70px)', borderRadius: '50%', opacity: 0.55, animation: 'floatShape2 9s ease-in-out infinite reverse', zIndex: -1 }}></div>

            {/* MAIN CARD */}
            <div style={{ background: 'rgba(23, 28, 45, 0.65)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)', borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', position: 'relative' }}>
              
              {/* SHIMMER EFFECT BORDER */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%', animation: 'sweep 3s linear infinite' }}></div>

              {/* CLOSE BUTTON */}
              <button onClick={handlePopupClose} style={{ position:'absolute', top:20, right:20, width:32, height:32, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%', cursor:'pointer', color:'#94a3b8', display:'flex', alignItems:'center', justifyContent:'center', transition: 'all 0.2s', zIndex: 10 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* Content Area */}
              <div style={{ padding: '3rem 2.5rem 2.5rem', textAlign: 'center' }}>
                 
                 {/* Premium Icon - Site Theme Colors */}
                 <div style={{ margin: '0 auto 1.5rem', width: 72, height: 72, background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.2), rgba(72, 149, 239, 0.2))', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 20px rgba(67, 97, 238, 0.15)' }}>
                   <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="url(#modalGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <defs>
                       <linearGradient id="modalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                         <stop offset="0%" stopColor="#4361EE" />
                         <stop offset="100%" stopColor="#4ade80" />
                       </linearGradient>
                     </defs>
                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                   </svg>
                 </div>
                 
                 <h2 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 500, margin: '0 0 0.75rem', lineHeight: 1.25, letterSpacing: '-0.03em', background: 'linear-gradient(to right, #fff, #bfdbfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                   Find Your <br/>True Calling
                 </h2>
                 <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 2rem', fontWeight: 400 }}>
                   Stop guessing your future. Our smart Course Finder aligns your ambitions with the perfect degree in under 60 seconds.
                 </p>

                {/* Features Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2.5rem' }}>
                   {[
                     { icon: '🚀', text: 'Career Aligned' },
                     { icon: '✨', text: 'Instant Match' },
                     { icon: '💸', text: '100% Free' },
                     { icon: '🔒', text: 'Secure' }
                   ].map((item, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                       onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                       onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                       <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                       <span style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: 600 }}>{item.text}</span>
                     </div>
                   ))}
                </div>

                <button
                  onClick={() => { handlePopupClose(); const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (btn) btn.click(); }}
                  style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #4361EE, #4895ef)', color: '#fff', border: 'none', borderRadius: 16, fontWeight: 500, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '1.25rem', animation: 'pulseGlow 2.5s infinite', transition: 'transform 0.2s, filter 0.2s', boxShadow: '0 12px 30px rgba(67, 97, 238, 0.35)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.filter = 'brightness(1.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                >
                  Match Me With A Course
                </button>
                
                <button onClick={handlePopupClose} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}>
                  I already know what I want
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}