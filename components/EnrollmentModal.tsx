'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const RB = '#4169e1';
const RBD = '#2a4db5';
const RBL = '#e8eef9';

interface Props { university: string; program: string; onClose: () => void; }

export default function EnrollmentModal({ university, program, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ studentName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!mounted) return null;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.studentName.trim()) e.studentName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Must be 10 digits';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, university, program }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  const field = (hasError: boolean) => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1.5px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: '0.625rem', fontSize: '0.88rem', outline: 'none',
    background: '#f8fafc', color: '#0f172a',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxSizing: 'border-box' as const, transition: 'border-color 0.2s, background 0.2s',
  });

  const modalContent = (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`@media(max-width:480px){.enrollment-grid-2{grid-template-columns:1fr !important;}}`}</style>
      <div style={{ background: '#fff', borderRadius: '1.25rem', width: '100%', maxWidth: 500, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.2)', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* ── HEADER ── */}
        <div style={{ background: `linear-gradient(135deg, ${RB}, ${RBD})`, padding: '1.5rem 1.75rem', borderRadius: '1.25rem 1.25rem 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: '0.75rem', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🎓</div>
            <div>
              <h2 style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', margin: 0, lineHeight: 1.2 }}>Enrollment Inquiry</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.75rem', margin: '3px 0 0' }}>We&apos;ll contact you within 24 hours</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '3px 10px', color: '#fff', fontSize: '0.7rem', fontWeight: 600 }}>🏛 {university}</span>
            {program && <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '3px 10px', color: '#fff', fontSize: '0.7rem', fontWeight: 600 }}>📚 {program}</span>}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: '1.75rem' }}>
          {status === 'success' ? (
            /* ── SUCCESS STATE ── */
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem 2rem' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${RB}, ${RBD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: `0 8px 24px rgba(65,105,225,0.35)` }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ color: '#0f172a', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>Inquiry Submitted!</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Thank you, <strong style={{ color: '#0f172a' }}>{form.studentName}</strong>! Our counsellor will contact you at <strong style={{ color: '#0f172a' }}>{form.phone}</strong> within 24 hours.
              </p>
              <div style={{ background: RBL, borderRadius: '0.875rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: RB, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Enrollment Details</div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>🏛 {university}</div>
                {program && <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: 4 }}>📚 {program}</div>}
              </div>
              <button onClick={onClose} style={{ padding: '0.75rem 2rem', background: RB, color: '#fff', border: 'none', borderRadius: '0.625rem', fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          ) : (
            /* ── FORM ── */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#374151', marginBottom: '0.35rem' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Your full name" value={form.studentName}
                  onChange={e => { setForm(p => ({ ...p, studentName: e.target.value })); setErrors(p => ({ ...p, studentName: '' })); }}
                  style={field(!!errors.studentName)}
                  onFocus={e => { e.currentTarget.style.borderColor = RB; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.studentName ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                />
                {errors.studentName && <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.2rem' }}>{errors.studentName}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="enrollment-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#374151', marginBottom: '0.35rem' }}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                    style={field(!!errors.email)}
                    onFocus={e => { e.currentTarget.style.borderColor = RB; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.2rem' }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#374151', marginBottom: '0.35rem' }}>Phone <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="tel" placeholder="10-digit number" value={form.phone}
                    onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') })); setErrors(p => ({ ...p, phone: '' })); }}
                    style={field(!!errors.phone)}
                    onFocus={e => { e.currentTarget.style.borderColor = RB; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                  />
                  {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '0.2rem' }}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#374151', marginBottom: '0.35rem' }}>
                  Message <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea placeholder="Any questions or additional info..." value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...field(false), resize: 'vertical', minHeight: 72, fontFamily: 'inherit' }}
                  onFocus={e => { e.currentTarget.style.borderColor = RB; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                />
              </div>

              {status === 'error' && (
                <div style={{ padding: '0.7rem 1rem', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '0.625rem', color: '#991b1b', fontSize: '0.8rem', textAlign: 'center' }}>
                  Something went wrong. Please try again.
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
                <button type="button" onClick={onClose}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.625rem', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
                >Cancel</button>
                <button type="submit" disabled={status === 'loading'}
                  style={{ flex: 2, padding: '0.75rem', borderRadius: '0.625rem', background: status === 'loading' ? '#93c5fd' : RB, color: '#fff', border: 'none', fontWeight: 500, fontSize: '0.85rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer', transition: 'background 0.2s', boxShadow: `0 4px 14px rgba(65,105,225,0.3)` }}
                  onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.background = RBD; }}
                  onMouseLeave={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.background = RB; }}
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Enrollment →'}
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', margin: 0 }}>🔒 Your information is secure and will not be shared</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
