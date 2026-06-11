'use client';
import Link from 'next/link';
import { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';

const INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    label: 'Phone',
    lines: ['0467-2211200', '+91 9846446055', '+91 9562446055', '+91 7511100080'],
    href: (v: string) => `tel:${v.replace(/\s/g, '')}`,
    color: '#4361EE',
    bg: '#eef2ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    lines: ['info@cdrc.edu.in', 'admissions@cdrc.edu.in'],
    href: (v: string) => `mailto:${v}`,
    color: '#0f766e',
    bg: '#f0fdfa',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
    label: 'WhatsApp',
    lines: ['+91 9846446055'],
    href: () => 'https://wa.me/919846446055',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    lines: ['City Centre Building, 2nd Floor', 'Near Bus Stand, Kanhangad', 'Kasargod, Kerala – 671315'],
    href: () => '',
    color: '#b45309',
    bg: '#fffbeb',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '', required = false) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        style={{
          width: '100%', padding: '0.8rem 1rem', borderRadius: 10, fontFamily: 'inherit',
          fontSize: '0.92rem', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
          border: `1.5px solid ${errors[key] ? '#ef4444' : '#e2e8f0'}`,
          background: '#f8fafc', color: '#0f172a',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#4361EE'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,97,238,0.1)'; e.currentTarget.style.background = '#fff'; }}
        onBlur={e => { e.currentTarget.style.borderColor = errors[key] ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
      />
      {errors[key] && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="Contact Us"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
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
              <span style={{ color: '#93c5fd' }}>Contact Us</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Get in Touch <br/> <span style={{ color: '#90e0ef' }}>With Our Team</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 650, lineHeight: 1.7 }}>
                Have questions about admissions, fees, or programs? Our counselors are ready <br/> to guide you — Monday to Saturday, 9:30 AM to 5:30 PM.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #f8fafc)', pointerEvents: 'none' }} />
      </section>

      {/* Info cards */}
      <section style={{ padding: '4rem 2rem 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginTop: '-3rem' }} className="info-cards-grid">
            {INFO.map((c, i) => (
              <AnimateOnScroll key={c.label} animation="fadeUp" delay={i * 70}>
                <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: '1.5px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.25s', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 8px 28px ${c.color}22`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    {c.icon}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{c.label}</div>
                  {c.lines.map((line, j) => {
                    const href = c.href(line);
                    return href
                      ? <a key={j} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          style={{ display: 'block', color: c.color, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', lineHeight: 1.7 }}>{line}</a>
                      : <p key={j} style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{line}</p>;
                  })}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Form + hours */}
      <section style={{ padding: '5rem 2rem 6rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

          {/* Left — hours + map placeholder */}
          <AnimateOnScroll animation="slideRight">
            <div>
              <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4361EE', padding: '4px 14px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Office Hours</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 500, color: '#0f172a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                We&apos;re here<br />when you need us
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Drop by, call, or send us a message. Our team is ready to guide you through admissions, fees, and program selection.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {[
                  { day: 'Monday – Saturday', time: '9:30 AM – 5:30 PM', open: true },
                  { day: 'Sunday', time: 'Closed', open: false },
                ].map(row => (
                  <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1.25rem', borderRadius: 12, background: '#fff', border: '1.5px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>{row.day}</span>
                    <span style={{ fontWeight: 500, fontSize: '0.85rem', color: row.open ? '#16a34a' : '#94a3b8', background: row.open ? '#f0fdf4' : '#f8fafc', padding: '3px 12px', borderRadius: 50 }}>{row.time}</span>
                  </div>
                ))}
              </div>

              {/* Map embed placeholder */}
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid #e2e8f0', height: 220, background: '#e2e8f0', position: 'relative' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.0539388!2d74.9717!3d12.3547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a4e1b1b1b1b1%3A0x0!2sCity+Centre+Building%2C+Kanhangad%2C+Kasaragod%2C+Kerala+671315!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="220" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/City+Centre+Building+Kanhangad+Kasaragod+Kerala+671315"
                target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '0.875rem', color: '#4361EE', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Get Directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </AnimateOnScroll>

          {/* Right — form */}
          <AnimateOnScroll animation="slideLeft">
            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid #f1f5f9' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: 72, height: 72, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ color: '#0f172a', fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} style={{ marginTop: '1.5rem', background: '#4361EE', color: '#fff', padding: '10px 28px', borderRadius: 50, border: 'none', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.25rem' }}>Send a Message</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Fill in the form and we&apos;ll be in touch shortly.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-grid">
                    {field('name', 'Full Name', 'text', 'Your name', true)}
                    {field('email', 'Email', 'email', 'you@email.com', true)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-form-grid">
                    {field('phone', 'Phone', 'tel', '+91 XXXXXXXXXX')}
                    {field('subject', 'Subject', 'text', 'e.g. Admission Inquiry')}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Message <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      placeholder="Write your message here..."
                      value={form.message} rows={5}
                      onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                      style={{
                        width: '100%', padding: '0.8rem 1rem', borderRadius: 10, fontFamily: 'inherit',
                        fontSize: '0.92rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s, box-shadow 0.2s',
                        border: `1.5px solid ${errors.message ? '#ef4444' : '#e2e8f0'}`,
                        background: '#f8fafc', color: '#0f172a',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#4361EE'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(67,97,238,0.1)'; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = errors.message ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
                    />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                  </div>

                  {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.82rem' }}>Something went wrong. Please try again.</p>}

                  <button type="submit" disabled={status === 'loading'}
                    style={{ width: '100%', background: 'linear-gradient(135deg,#4361EE,#4895ef)', color: '#fff', padding: '0.9rem', border: 'none', borderRadius: 12, fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1, transition: 'all 0.2s', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(67,97,238,0.4)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {status === 'loading' ? 'Sending…' : <>Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>}
                  </button>
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .info-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-hero-grid { grid-template-columns: 1fr !important; }
          .contact-hero-stats { display: none !important; }
        }
        @media (max-width: 480px) {
          .info-cards-grid { grid-template-columns: 1fr !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
