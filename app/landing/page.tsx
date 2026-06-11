'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MorphingShapes, HeroWave, TiltCard, ParallaxLayer, useTypingEffect, StatCard } from '@/components/HeroAnimations';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const ACCENT = '#4361EE';
const DARK = '#0f172a';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', interest: '' });
  const [submitting, setSubmitting] = useState(false);
  const typedPhrase = useTypingEffect(['Delivered Online', 'From Top Universities', 'At Your Own Pace']);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePopupClose = () => { setShowPopup(false); setPopupStep('intro'); setLeadForm({ name: '', email: '', phone: '', interest: '' }); };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...leadForm, source: 'Course Finder' }) });
    } catch {}
    setSubmitting(false);
    sessionStorage.setItem('cdrc_lead_submitted', '1');
    window.location.href = '/home?openCourseFinder=1';
  };

  const handleOpenCourseFinder = () => {
    handlePopupClose();
    const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement | null;
    if (btn) btn.click();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", color: DARK, overflowX: 'hidden' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes popupIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.88)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes overlayIn { from{opacity:0} to{opacity:1} }
        .hero-badge { animation: fadeUp .6s .1s ease both }
        .hero-h1   { animation: fadeUp .7s .2s ease both }
        .hero-sub  { animation: fadeUp .7s .35s ease both }
        .hero-btns { animation: fadeUp .7s .5s ease both }
        .float-card { animation: float 4s ease-in-out infinite }
        .float-card2 { animation: float 5s ease-in-out infinite }
        .nav-link { color: rgba(255,255,255,0.8); text-decoration:none; font-size:.88rem; font-weight:500; transition:color .2s }
        .nav-link:hover { color:#fff }
        .nav-link-dark { color:#475569; text-decoration:none; font-size:.88rem; font-weight:500; transition:color .2s }
        .nav-link-dark:hover { color:${ACCENT} }
        @media(max-width:767px){
          .hero-grid{grid-template-columns:1fr !important}
          .hero-img{display:none !important}
          .steps-grid{grid-template-columns:repeat(2,1fr) !important}
          .nav-links{display:none !important}
          .step-connector{display:none !important}
        }
        @media(max-width:479px){
          .steps-grid{grid-template-columns:1fr !important}
        }
        @media(max-width:1023px) and (min-width:640px){
          .features-grid{grid-template-columns:repeat(2,1fr) !important}
        }
        @media(max-width:639px){
          .features-grid{grid-template-columns:1fr !important}
          .cta-btns{flex-direction:column !important; align-items:stretch !important}
        }
        @media(min-width:1024px){
          .unis-grid{grid-template-columns:repeat(3,1fr) !important}
        }
        @media(max-width:1023px){
          .unis-grid{grid-template-columns:repeat(2,1fr) !important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(226,232,240,0.8)' : 'none', transition: 'all .35s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: ACCENT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none"><path d="M28 35L50 62L72 35L58 35L50 48L42 35Z" fill="white"/><path d="M38 62L50 78L62 62Z" fill="white" opacity=".85"/></svg>
          </div>
          <span style={{ fontWeight: 500, fontSize: '1.2rem', letterSpacing: '-0.03em', color: scrolled ? ACCENT : '#fff' }}>CDRC</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[['#features', 'Features'], ['#universities', 'Universities'], ['#how', 'How it Works']].map(([href, label]) => (
            <a key={href} href={href} className={scrolled ? 'nav-link-dark' : 'nav-link'}>{label}</a>
          ))}
        </div>
        <Link href="/" style={{ padding: '8px 20px', background: scrolled ? ACCENT : 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 8, fontWeight: 500, fontSize: '.85rem', textDecoration: 'none', border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)', transition: 'all .2s' }}>
          Explore Site
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', background: `linear-gradient(150deg, #1a1a3e 0%, ${ACCENT} 60%, #4895ef 100%)`, paddingTop: 80, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <MorphingShapes />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(96,165,250,.12) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <ParallaxLayer speed={0.15} style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '6px 16px', color: '#93c5fd', fontSize: '.78rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                India&apos;s Trusted Online Education Partner
              </div>
              <h1 className="hero-h1" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                Your Dream Degree,<br />
                <span style={{ color: '#90e0ef' }}>{typedPhrase}<span style={{ borderRight: '2px solid #90e0ef', marginLeft: 2, animation: 'blink 1s step-end infinite' }} /></span>
              </h1>
              <p className="hero-sub" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 480, marginBottom: '2.5rem' }}>
                CDRC connects you with UGC-approved online degrees from India&apos;s top NAAC-accredited universities. Study at your own pace, from anywhere.
              </p>
              <div className="hero-btns cta-btns" style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: ACCENT, padding: '13px 28px', borderRadius: 10, fontWeight: 500, fontSize: '.95rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                  Explore Programs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 600, fontSize: '.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}>
                  Talk to Counsellor
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                {[['UGC Approved', '#4ade80'], ['NAAC Accredited', '#90e0ef'], ['WES Recognized', '#c084fc']].map(([lbl, clr]) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.75)', fontSize: '.8rem', fontWeight: 500 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={clr} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {lbl}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating cards */}
            <div className="hero-img" style={{ position: 'relative', height: 480 }}>
              <div style={{ position: 'absolute', top: 20, left: 40, right: 0, height: 360, borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,23,42,.45) 0%,transparent 55%)' }} />
              </div>
              <TiltCard style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
                <div className="float-card" style={{ background: '#fff', borderRadius: 14, padding: '13px 17px', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: '#eef2ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: ACCENT, lineHeight: 1 }}>15,000+</div>
                    <div style={{ fontSize: '.72rem', color: '#64748b', fontWeight: 500 }}>Active Students</div>
                  </div>
                </div>
              </TiltCard>
              <TiltCard style={{ position: 'absolute', bottom: 60, right: 0, zIndex: 10 }}>
                <div className="float-card2" style={{ background: '#fff', borderRadius: 14, padding: '13px 17px', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: '#f0fdf4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#15803d', lineHeight: 1 }}>95%</div>
                    <div style={{ fontSize: '.72rem', color: '#64748b', fontWeight: 500 }}>Placement Rate</div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </ParallaxLayer>


        <HeroWave />
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: ACCENT, padding: '4px 14px', borderRadius: 20, fontSize: '.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Why CDRC</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 500, color: DARK, lineHeight: 1.15, marginBottom: '.75rem' }}>Everything you need to succeed</h2>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>From expert guidance to UGC-approved degrees — all in one place.</p>
            </div>
          </AnimateOnScroll>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>, title: 'UGC Approved Programs', desc: 'All programs are UGC-DEB approved and equivalent to regular degrees, valid for government jobs and higher studies.', accent: ACCENT },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>, title: 'Flexible Learning', desc: 'Study anywhere, anytime on any device. No fixed class schedules — learn at your own pace.', accent: ACCENT },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: '14+ Partner Universities', desc: 'Choose from top NAAC-accredited universities including Amity, Manipal, GLA, Jain, and more.', accent: ACCENT },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, title: 'Affordable Fees', desc: 'Programs starting from ₹10,000. EMI options and scholarships available for eligible students.', accent: ACCENT },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: 'Expert Guidance', desc: 'Our counselors help you choose the right program and university based on your career goals.', accent: ACCENT },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>, title: 'Proven Results', desc: '73% of graduates report career advancement within 2 years of completing their online degree.', accent: ACCENT },
            ].map((f, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 60}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1.5px solid #f1f5f9', transition: 'all .25s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c7d2fe'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(67,97,238,0.14)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ height: 5, background: f.accent }} />
                  <div style={{ padding: '1.75rem' }}>
                    <div style={{ width: 44, height: 44, background: '#eef2ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      {f.icon}
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, color: DARK, marginBottom: '.5rem' }}>{f.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '.875rem', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section id="universities" style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: ACCENT, padding: '4px 14px', borderRadius: 20, fontSize: '.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Partner Institutions</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 500, color: DARK, lineHeight: 1.15 }}>Top Universities We Work With</h2>
            </div>
          </AnimateOnScroll>
          <div className="unis-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { name: 'Amity University', grade: 'NAAC A++', color: '#4361EE' },
              { name: 'Manipal University', grade: 'NAAC A+', color: '#7c3aed' },
              { name: 'GLA University', grade: 'NAAC A', color: '#0f766e' },
              { name: 'Jain University', grade: 'NAAC A++', color: '#b45309' },
              { name: 'Chandigarh University', grade: 'NAAC A+', color: '#be185d' },
              { name: 'LPU', grade: 'NAAC A++', color: '#1d4ed8' },
            ].map((u, i) => (
              <AnimateOnScroll key={i} animation="scaleUp" delay={i * 80}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'all .25s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${u.color}33`; e.currentTarget.style.borderColor = u.color; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                  <div style={{ height: 5, background: u.color }} />
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ width: 44, height: 44, background: u.color, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '.875rem' }}>
                      {u.name[0]}
                    </div>
                    <h3 style={{ fontSize: '.95rem', fontWeight: 500, color: DARK, marginBottom: '.4rem' }}>{u.name}</h3>
                    <span style={{ display: 'inline-block', background: '#eef2ff', color: ACCENT, padding: '2px 10px', borderRadius: 6, fontSize: '.7rem', fontWeight: 500 }}>{u.grade}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ACCENT, color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 500, textDecoration: 'none', fontSize: '.9rem', boxShadow: `0 4px 16px ${ACCENT}40` }}>
              View All Universities
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: ACCENT, padding: '4px 14px', borderRadius: 20, fontSize: '.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Process</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 500, color: DARK, lineHeight: 1.15 }}>Get started in 4 simple steps</h2>
            </div>
          </AnimateOnScroll>
          <div style={{ position: 'relative' }}>
            <div className="step-connector" style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 2, background: `${ACCENT}22`, zIndex: 0 }} />
            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              {[
                { step: '01', title: 'Explore Programs', desc: 'Browse 500+ UGC-approved programs across top universities.' },
                { step: '02', title: 'Get Counselled', desc: 'Talk to our expert counselors — free of charge.' },
                { step: '03', title: 'Enroll Online', desc: 'Complete your admission process entirely online.' },
                { step: '04', title: 'Start Learning', desc: 'Access your course materials and begin your journey.' },
              ].map((s, i) => (
                <AnimateOnScroll key={i} animation="fadeUp" delay={i * 100}>
                  <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <div style={{ width: 56, height: 56, background: `${ACCENT}14`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.1rem', fontWeight: 600, color: ACCENT }}>
                      {s.step}
                    </div>
                    <h3 style={{ fontSize: '.95rem', fontWeight: 500, color: DARK, marginBottom: '.5rem' }}>{s.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '.82rem', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: `linear-gradient(150deg, #1a1a3e 0%, ${ACCENT} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 320, height: 320, background: 'radial-gradient(circle,rgba(59,130,246,.14) 0%,transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: 320, height: 320, background: 'radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%)', borderRadius: '50%' }} />
        <AnimateOnScroll animation="fadeUp">
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#fff', lineHeight: 1.15, marginBottom: '1rem' }}>
              Ready to advance your career?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
              Join 15,000+ students who are already learning with CDRC. Get started today — free counseling, no commitment.
            </p>
            <div className="cta-btns" style={{ display: 'flex', gap: '.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: ACCENT, padding: '14px 32px', borderRadius: 10, fontWeight: 500, fontSize: '.95rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 32px', borderRadius: 10, fontWeight: 600, fontSize: '.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}>
                Talk to Us
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: '1rem' }}>
          <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none"><path d="M28 35L50 62L72 35L58 35L50 48L42 35Z" fill="white"/><path d="M38 62L50 78L62 62Z" fill="white" opacity=".85"/></svg>
          </div>
          <span style={{ fontWeight: 500, fontSize: '1.1rem', color: '#fff' }}>CDRC</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '.82rem' }}>© 2025 CDRC. India&apos;s Trusted Online Education Partner.</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          {[['/', 'Home'], ['/programs', 'Programs'], ['/universities', 'Universities'], ['/contact', 'Contact']].map(([href, lbl]) => (
            <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              {lbl}
            </Link>
          ))}
        </div>
      </footer>

      {/* COURSE FINDER WELCOME POPUP */}
      {showPopup && (
        <>
          <div onClick={handlePopupClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)', zIndex: 2000, animation: 'overlayIn .3s ease both' }} />

          {popupStep === 'intro' && (
            /* ── GAMIFIED INTRO CARD ── */
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2001, width: '90%', maxWidth: 380, borderRadius: 28, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', animation: 'popupIn .45s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              <style>{`
                @keyframes rayRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes iconBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-10px) scale(1.08)} }
                @keyframes shimmerSlide { 0%{background-position:200% center} 100%{background-position:-200% center} }
                .cf-icon-bounce { animation: iconBounce 2.5s ease-in-out infinite }
              `}</style>

              {/* Purple radial background */}
              <div style={{ background: 'linear-gradient(160deg, #6c3de8 0%, #4361EE 50%, #2d2d8f 100%)', padding: '2.5rem 2rem 2rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                {/* Rotating rays */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 340, height: 340, marginTop: -170, marginLeft: -170, opacity: 0.12, animation: 'rayRotate 18s linear infinite', pointerEvents: 'none' }}>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 170, background: '#fff', transformOrigin: '50% 0%', transform: `rotate(${i * 30}deg) translateX(-50%)` }} />
                  ))}
                </div>
                {/* Decorative orbs */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle,rgba(255,255,255,0.15) 0%,transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -20, left: -20, width: 90, height: 90, background: 'radial-gradient(circle,rgba(255,200,50,0.12) 0%,transparent 70%)', borderRadius: '50%' }} />

                {/* Close */}
                <button onClick={handlePopupClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 2 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                {/* Big icon */}
                <div className="cf-icon-bounce" style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.25)', marginBottom: '1.25rem', backdropFilter: 'blur(8px)' }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                  {/* Glow ring */}
                  <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.15)' }} />
                </div>

                {/* Title */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '.4rem' }}>Smart Matching</div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#fff', lineHeight: 1.15, margin: '0 0 .5rem', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                    Find Your<br />Perfect Course
                  </h2>
                </div>
              </div>

              {/* Dark bottom panel */}
              <div style={{ background: '#1a1a2e', padding: '1.5rem 2rem 2rem' }}>
                {/* Feature pills row */}
                <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: '🎯', label: 'Personalised' },
                    { icon: '⚡', label: '2 Minutes' },
                    { icon: '🆓', label: 'Free' },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 12px' }}>
                      <span style={{ fontSize: '.85rem' }}>{icon}</span>
                      <span style={{ fontSize: '.72rem', fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '.04em' }}>{label}</span>
                    </div>
                  ))}
                </div>

                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '.82rem', lineHeight: 1.65, textAlign: 'center', marginBottom: '1.5rem' }}>
                  Answer a few quick questions and we&apos;ll match you with the best universities and programs for your goals.
                </p>

                {/* CTA button — shimmer effect */}
                <button
                  onClick={() => setPopupStep('form')}
                  style={{ width: '100%', padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, fontSize: '1rem', color: '#fff', background: `linear-gradient(90deg, #6c3de8, ${ACCENT}, #6c3de8)`, backgroundSize: '200% auto', animation: 'shimmerSlide 3s linear infinite', boxShadow: `0 6px 24px ${ACCENT}60`, letterSpacing: '.02em' }}
                >
                  Start Course Finder →
                </button>
                <button onClick={handlePopupClose} style={{ width: '100%', marginTop: '.75rem', padding: '10px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '.8rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  Maybe later
                </button>
              </div>
            </div>
          )}

          {(popupStep === 'form' || popupStep === 'success') && (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2001, width: '90%', maxWidth: 460, background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', animation: 'popupIn .4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
              {/* Header */}
              <div style={{ background: `linear-gradient(135deg, #1a1a3e 0%, ${ACCENT} 60%, #4895ef 100%)`, padding: '1.75rem 2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%)', borderRadius: '50%' }} />
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.875rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                </div>
                <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2, margin: '0 0 .4rem', letterSpacing: '-0.02em' }}>
                  {popupStep === 'form' ? 'Tell us about yourself' : "You're all set!"}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '.83rem', lineHeight: 1.5, margin: 0 }}>
                  {popupStep === 'form' ? "We'll use this to personalise your recommendations." : "Ready to find your perfect university and course?"}
                </p>
                <button onClick={handlePopupClose} style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                {popupStep === 'form' && (
                  <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                      { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: '#374151', marginBottom: 5 }}>{label}</label>
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={leadForm[key as keyof typeof leadForm]}
                          onChange={e => setLeadForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: '#374151', marginBottom: 5 }}>Area of Interest</label>
                      <select
                        value={leadForm.interest}
                        onChange={e => setLeadForm(f => ({ ...f, interest: e.target.value }))}
                        style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                      >
                        <option value="">Select a field...</option>
                        {['MBA / Management', 'BBA / Business', 'MCA / BCA (Tech)', 'B.Com / M.Com', 'Arts & Humanities', 'Science', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <button type="submit" disabled={submitting} style={{ marginTop: '.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: submitting ? '#94a3b8' : ACCENT, color: '#fff', padding: '13px', borderRadius: 10, fontWeight: 500, fontSize: '.92rem', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: submitting ? 'none' : `0 4px 16px ${ACCENT}40`, transition: 'background .2s' }}>
                      {submitting ? 'Submitting...' : 'Submit & Explore'}
                      {!submitting && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                    </button>
                  </form>
                )}
                {popupStep === 'success' && (
                  <div style={{ textAlign: 'center', padding: '.5rem 0' }}>
                    <div style={{ width: 60, height: 60, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: DARK, marginBottom: '.5rem' }}>Thanks, {leadForm.name.split(' ')[0] || 'there'}!</h3>
                    <p style={{ color: '#64748b', fontSize: '.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      We&apos;ve got your details. Now let our <strong style={{ color: DARK }}>Course Finder</strong> recommend the best universities and programs for you.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                      <button onClick={handleOpenCourseFinder} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ACCENT, color: '#fff', padding: '13px', borderRadius: 10, fontWeight: 500, fontSize: '.92rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 16px ${ACCENT}40` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                        Find My Course Now
                      </button>
                      <a href="/home" style={{ display: 'block', textAlign: 'center', color: '#94a3b8', fontSize: '.82rem', textDecoration: 'none', fontWeight: 500 }}
                        onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                        onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                        Skip, take me to the home page →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
