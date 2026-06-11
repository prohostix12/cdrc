'use client';
import { useState } from 'react';

interface Props {
  programName: string;
  brochureUrl: string;
  onClose: () => void;
}

const ACCENT = '#1e40af';

export default function BrochureLeadModal({ programName, brochureUrl, onClose }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: programName });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      // Save lead to dedicated leads collection
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone.replace(/\D/g, ''),
          email: form.email,
          course: form.course,
          source: 'Brochure Download',
        }),
      });
    } catch { /* non-blocking */ }
    setDone(true);
    setLoading(false);
    // Trigger download only if brochureUrl exists
    if (brochureUrl && brochureUrl.trim()) {
      const a = document.createElement('a');
      a.href = `/api/download?url=${encodeURIComponent(brochureUrl)}&filename=${encodeURIComponent(programName.replace(/\s+/g, '_') + '_Brochure.pdf')}`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setTimeout(onClose, 2500);
  }

  const inp = (field: keyof typeof form, placeholder: string, type = 'text') => ({
    type,
    value: form[field],
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      if (field === 'phone') val = val.replace(/\D/g, '');
      setForm(p => ({ ...p, [field]: val }));
      setErrors(p => ({ ...p, [field]: '' }));
    },
    style: {
      width: '100%', padding: '10px 14px', border: `1.5px solid ${errors[field] ? '#ef4444' : '#e2e8f0'}`,
      borderRadius: 10, fontSize: '0.92rem', outline: 'none', background: '#f8fafc',
      color: '#0f172a', boxSizing: 'border-box' as const, fontFamily: 'inherit',
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = '#fff'; },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = errors[field] ? '#ef4444' : '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; },
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 460, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, padding: '1.5rem 1.75rem', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500, margin: 0, lineHeight: 1.3 }}>Download Brochure</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', marginTop: 4 }}>{programName}</p>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ width: 60, height: 60, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ color: '#0f172a', fontWeight: 500, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {brochureUrl ? 'Your download has started!' : 'Request Received!'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                {brochureUrl ? 'Thank you! Our team will reach out to you shortly.' : 'Thank you! Our team will send you the brochure shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: '#64748b', fontSize: '0.83rem', margin: 0 }}>Please fill in your details to download the brochure.</p>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input {...inp('name', 'Your full name')} />
                {errors.name && <p style={{ color: '#ef4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.name}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input {...inp('phone', '+91 XXXXXXXXXX', 'tel')} />
                {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.phone}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input {...inp('email', 'you@email.com', 'email')} />
                {errors.email && <p style={{ color: '#ef4444', fontSize: '0.73rem', marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Course of Interest
                </label>
                <input {...inp('course', 'e.g., MBA, BCA...')} />
              </div>

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '11px', background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, fontSize: '0.92rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {loading ? 'Processing...' : 'Submit & Download Brochure'}
              </button>

              <p style={{ color: '#94a3b8', fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>
                Your information is safe with us. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
