'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, Award, MapPin, DollarSign, Search, BookOpen, Globe, Phone, GraduationCap, ArrowLeft, Plus, Trash2, Mail } from '@/components/Icon';

interface Program { name: string; duration: string; description: string; }

const ACCENT = '#1e40af';
const ACCENT_LIGHT = '#eff6ff';
const ACCENT_BORDER = '#bfdbfe';

const S: Record<string, React.CSSProperties> = {
  wrapper: { minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Poppins', system-ui, sans-serif" },
  main: { padding: '28px 32px' },
  container: { maxWidth: 900, margin: '0 auto' },
  pageHeader: { marginBottom: 28 },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 12, fontWeight: 500 },
  pageTitle: { fontSize: '1.6rem', fontWeight: 500, color: '#0f172a', margin: 0 },
  pageSubtitle: { color: '#64748b', fontSize: '0.9rem', marginTop: 4 },
  section: { background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20, border: '1px solid #f1f5f9' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' },
  sectionIcon: { width: 42, height: 42, borderRadius: 11, background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sectionTitle: { fontWeight: 500, color: '#0f172a', fontSize: '1rem', margin: 0 },
  sectionDesc: { color: '#94a3b8', fontSize: '0.78rem', margin: 0 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.1rem' },
  label: { display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.04em' },
  input: { width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.92rem', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s' },
  hint: { fontSize: '0.73rem', color: '#94a3b8', marginTop: 5 },
  errorAlert: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '14px 18px', borderRadius: 12, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' },
  successAlert: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '14px 18px', borderRadius: 12, marginBottom: 20, fontSize: '0.9rem' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap', paddingTop: 8 },
  cancelBtn: { padding: '11px 24px', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit' },
  submitBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(30,64,175,0.35)' },
};

function SectionHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={S.sectionHeader}>
      <div style={S.sectionIcon}>
        {icon}
      </div>
      <div>
        <p style={S.sectionTitle}>{title}</p>
        <p style={S.sectionDesc}>{desc}</p>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder = '', required = false, hint = '', value, onChange, span = false }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; hint?: string;
  value: string; onChange: (v: string) => void; span?: boolean;
}) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : {}}>
      <label style={S.label}>{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>
      <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)}
        required={required} placeholder={placeholder} style={S.input}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`; e.currentTarget.style.background = '#fff'; }}
        onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
      />
      {hint && <p style={S.hint}>{hint}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3, placeholder = '', hint = '', span = false }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; hint?: string; span?: boolean;
}) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : {}}>
      <label style={S.label}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        style={{ ...S.input, resize: 'vertical', minHeight: rows * 28 }}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`; e.currentTarget.style.background = '#fff'; }}
        onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }}
      />
      {hint && <p style={S.hint}>{hint}</p>}
    </div>
  );
}

export default function CreateUniversity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '', slug: '', type: 'Private', established: '',
    ranking: '', naac: 'A++', ugcApproved: true, aicteApproved: false,
    city: '', state: '', location: '',
    minFee: '', maxFee: '',
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', robotsMeta: 'Index, Follow',
    ogTitle: '', ogImageUrl: '', ogDescription: '',
    description: '', highlights: '', facilities: '',
    logoUrl: '', bannerUrl: '',
    website: '', email: '', phone: '',
    featured: false, active: true,
    logoInitial: '', accreditation: '', image: '',
  });

  const set = (field: string, value: string | boolean) => setForm(p => ({ ...p, [field]: value }));

  const handleName = (v: string) => {
    const slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(p => ({ ...p, name: v, slug, logoInitial: v[0]?.toUpperCase() || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('University name is required'); return; }
    if (!form.city.trim()) { setError('City is required'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const body = {
        name: form.name, slug: form.slug,
        logoInitial: form.logoInitial || form.name[0]?.toUpperCase(),
        accreditation: `UGC Approved | NAAC ${form.naac}`,
        naac: `NAAC ${form.naac}`,
        location: form.location || `${form.city}, ${form.state}`,
        description: form.description,
        facilities: form.facilities.split(',').map(s => s.trim()).filter(Boolean),
        ranking: form.ranking, 
        image: form.bannerUrl || form.logoUrl || '',
        logo: form.logoUrl || '',
        programs: [],
        type: form.type, established: form.established,
        ugcApproved: form.ugcApproved, aicteApproved: form.aicteApproved,
        city: form.city, state: form.state,
        minFee: form.minFee, maxFee: form.maxFee,
        metaTitle: form.metaTitle, metaDescription: form.metaDescription,
        keywords: form.keywords, website: form.website,
        email: form.email, phone: form.phone,
        featured: form.featured, active: form.active,
        highlights: form.highlights.split(',').map(s => s.trim()).filter(Boolean),
      };
      const res = await fetch('/api/universities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { setSuccess('University created successfully! Redirecting...'); setTimeout(() => router.push('/admin/universities'), 1500); }
      else { const err = await res.json(); setError(err.error || 'Failed to create university'); }
    } catch { setError('Error creating university'); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.wrapper}>
      <main style={S.main}>
        <div style={S.container}>
          {/* Header */}
          <div style={S.pageHeader}>
            <Link href="/admin/universities" style={S.backLink}>
              <ArrowLeft size={14} color="#64748b" /> Back to Universities
            </Link>
            <h1 style={S.pageTitle}>Create New University</h1>
            <p style={S.pageSubtitle}>Fill in the details to add a new university to the platform</p>
          </div>

          {error && (
            <div style={S.errorAlert}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </span>
              <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>
          )}
          {success && <div style={S.successAlert}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: 8 }}><polyline points="20 6 9 17 4 12"/></svg>
            {success}
          </div>}

          <form onSubmit={handleSubmit}>

            {/* Basic Info */}
            <div style={S.section}>
              <SectionHeader icon={<Building size={18} color="#fff" />} title="Basic Information" desc="Enter the basic details of the university" />
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>University Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} value={form.name} onChange={e => handleName(e.target.value)} required placeholder="e.g., Amity University"
                    onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }} />
                </div>
                <div>
                  <label style={S.label}>Slug <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} value={form.slug} onChange={e => set('slug', e.target.value)} required placeholder="amity-university"
                    onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#f8fafc'; }} />
                  {form.slug && <p style={S.hint}>URL: /universities/{form.slug}</p>}
                </div>
                <div>
                  <label style={S.label}>University Type</label>
                  <select value={form.type} onChange={e => set('type', e.target.value)} style={S.input}>
                    {['Private', 'Govt', 'Public', 'Deemed', 'Central', 'State', 'Autonomous'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <Field label="Established Year" name="established" placeholder="e.g., 2003" value={form.established} onChange={v => set('established', v)} />
              </div>
            </div>

            {/* Ratings */}
            <div style={S.section}>
              <SectionHeader icon={<Award size={18} color="#fff" />} title="Ratings & Approvals" desc="Add accreditation and approval details" />
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Rating / Ranking</label>
                  <select value={form.ranking} onChange={e => set('ranking', e.target.value)} style={S.input}>
                    <option value="">Select</option>
                    {['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>NAAC Grade</label>
                  <select value={form.naac} onChange={e => set('naac', e.target.value)} style={S.input}>
                    {['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, marginTop: 18 }}>
                {[['ugcApproved', 'UGC Approved'], ['aicteApproved', 'AICTE Approved']].map(([k, lbl]) => (
                  <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={(form as unknown as Record<string, boolean>)[k]}
                      onChange={e => set(k, e.target.checked)} style={{ width: 16, height: 16, accentColor: ACCENT }} />
                    {lbl}
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={S.section}>
              <SectionHeader icon={<MapPin size={18} color="#fff" />} title="Location" desc="Specify the university location" />
              <div style={S.grid2}>
                <Field label="City" name="city" placeholder="Noida" required value={form.city} onChange={v => set('city', v)} />
                <Field label="State" name="state" placeholder="Uttar Pradesh" value={form.state} onChange={v => set('state', v)} />
                <Field label="Full Location / Address" name="location" placeholder="Sector 125, Noida, Uttar Pradesh" value={form.location} onChange={v => set('location', v)} span />
              </div>
            </div>

            {/* Fee */}
            <div style={S.section}>
              <SectionHeader icon={<DollarSign size={18} color="#fff" />} title="Fee Structure" desc="Set the fee range for programs" />
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Minimum Fee (₹)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>₹</span>
                    <input style={{ ...S.input, paddingLeft: 28 }} type="number" value={form.minFee} onChange={e => set('minFee', e.target.value)} placeholder="50000"
                      onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }} />
                  </div>
                  {form.minFee && <p style={S.hint}>₹{Number(form.minFee).toLocaleString('en-IN')}</p>}
                </div>
                <div>
                  <label style={S.label}>Maximum Fee (₹)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>₹</span>
                    <input style={{ ...S.input, paddingLeft: 28 }} type="number" value={form.maxFee} onChange={e => set('maxFee', e.target.value)} placeholder="499999"
                      onFocus={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = '#fff'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }} />
                  </div>
                  {form.maxFee && <p style={S.hint}>₹{Number(form.maxFee).toLocaleString('en-IN')}</p>}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={S.section}>
              <SectionHeader icon={<BookOpen size={18} color="#fff" />} title="Description" desc="Provide detailed information about the university" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Textarea label="About University" value={form.description} onChange={v => set('description', v)} rows={5} placeholder="Write a detailed description about the university..." hint={`${form.description.length}/1000 characters`} />
                <Textarea label="Highlights (comma separated)" value={form.highlights} onChange={v => set('highlights', v)} rows={2} placeholder="100% Placement Assistance, Industry Partnerships, Flexible Learning" />
                <Textarea label="Facilities (comma separated)" value={form.facilities} onChange={v => set('facilities', v)} rows={2} placeholder="Digital Library, Online Labs, Student Portal, Career Services" />
              </div>
            </div>

            {/* Media */}
            <div style={S.section}>
              <SectionHeader icon={<Globe size={18} color="#fff" />} title="Media" desc="Add logo and banner image URLs" />
              <div style={S.grid2}>
                <div>
                  <Field label="Logo Image URL" name="logoUrl" placeholder="https://example.com/logo.png" hint="Recommended: Square image (200×200px)" value={form.logoUrl} onChange={v => set('logoUrl', v)} />
                  {form.logoUrl && <img src={form.logoUrl} alt="logo" style={{ marginTop: 10, width: 80, height: 80, objectFit: 'contain', borderRadius: 10, border: `1.5px solid ${ACCENT_BORDER}`, padding: 6, background: '#fff' }} onError={e => (e.currentTarget.style.display = 'none')} />}
                </div>
                <div>
                  <Field label="Banner Image URL" name="bannerUrl" placeholder="https://example.com/banner.jpg" hint="Recommended: Wide image (1200×400px)" value={form.bannerUrl} onChange={v => set('bannerUrl', v)} />
                  {form.bannerUrl && <img src={form.bannerUrl} alt="banner" style={{ marginTop: 10, width: '100%', height: 80, objectFit: 'cover', borderRadius: 10, border: `1.5px solid ${ACCENT_BORDER}` }} onError={e => (e.currentTarget.style.display = 'none')} />}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div style={S.section}>
              <SectionHeader icon={<Phone size={18} color="#fff" />} title="Contact Information" desc="Add contact details for the university" />
              <div style={S.grid2}>
                <Field label="Website" name="website" placeholder="https://www.university.edu" value={form.website} onChange={v => set('website', v)} />
                <Field label="Email" name="email" type="email" placeholder="admissions@university.edu" value={form.email} onChange={v => set('email', v)} />
                <Field label="Phone" name="phone" placeholder="+91 73560 04410" value={form.phone} onChange={v => set('phone', v)} />
              </div>
            </div>

            {/* Settings */}
            <div style={S.section}>
              <SectionHeader icon={<Award size={18} color="#fff" />} title="Settings" desc="Configure visibility and featured status" />
              <div style={S.grid2}>
                {[['featured', 'Featured University', 'Display on homepage and featured sections'], ['active', 'Active', 'University is visible to students']].map(([k, lbl, desc]) => (
                  <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, border: `2px solid ${(form as unknown as Record<string, boolean>)[k] ? ACCENT_BORDER : '#e2e8f0'}`, background: (form as unknown as Record<string, boolean>)[k] ? ACCENT_LIGHT : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <input type="checkbox" checked={(form as unknown as Record<string, boolean>)[k]} onChange={e => set(k, e.target.checked)} style={{ width: 18, height: 18, accentColor: ACCENT }} />
                    <div>
                      <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '0.88rem' }}>{lbl}</div>
                      <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={S.actions}>
              <button type="button" onClick={() => router.push('/admin/universities')} style={S.cancelBtn}>Cancel</button>
              <button type="submit" disabled={loading} style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? '⏳ Creating...' : <><Plus size={15} color="#fff" /> Create University</>}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
