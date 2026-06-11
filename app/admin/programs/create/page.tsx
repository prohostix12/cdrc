'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building, DollarSign, BookOpen, Globe, Award, Search, GraduationCap, Plus } from '@/components/Icon';

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
  label: { display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151', fontSize: '0.82rem', textTransform: 'uppercase' as const, letterSpacing: '0.04em' },
  input: { width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.92rem', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' as const, fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s' },
  hint: { fontSize: '0.73rem', color: '#94a3b8', marginTop: 5 },
  errorAlert: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '14px 18px', borderRadius: 12, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' },
  successAlert: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '14px 18px', borderRadius: 12, marginBottom: 20, fontSize: '0.9rem' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' as const, paddingTop: 8 },
  cancelBtn: { padding: '11px 24px', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit' },
  submitBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(30,64,175,0.35)' },
};

function SectionHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={S.sectionHeader}>
      <div style={S.sectionIcon}>{icon}</div>
      <div>
        <p style={S.sectionTitle}>{title}</p>
        <p style={S.sectionDesc}>{desc}</p>
      </div>
    </div>
  );
}

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = ACCENT;
  e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`;
  e.currentTarget.style.background = '#fff';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = '#e2e8f0';
  e.currentTarget.style.boxShadow = 'none';
  e.currentTarget.style.background = '#f8fafc';
};

export default function CreateProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [universities, setUniversities] = useState<Array<{ _id: string; name: string }>>([]);

  const [form, setForm] = useState({
    name: '', duration: '', university: '', universityId: '',
    category: '', courseType: '', level: '', qualification: '', mode: 'Online', fee: '', feePeriod: 'Total',
    description: '', eligibility: '',
    imageUrl: '', brochureUrl: '', youtubeUrl: '',
    syllabus: '', highlights: '', careerOptions: '', specializations: '',
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', robotsMeta: 'Index, Follow',
    ogTitle: '', ogImageUrl: '', ogDescription: '',
    featured: false, active: true,
  });

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success && d.data) setUniversities(d.data);
    }).catch(() => {});
  }, []);

  const set = (field: string, value: string | boolean) => {
    setForm(p => ({ ...p, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Program name is required'); return; }
    if (!form.duration.trim()) { setError('Duration is required'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const body = {
        name: form.name, duration: form.duration,
        university: form.university || universities.find(u => u._id === form.universityId)?.name || '',
        universityId: form.universityId,
        category: form.category, courseType: form.courseType, level: form.level, qualification: form.qualification, mode: form.mode,
        fee: form.fee ? Number(form.fee) : undefined, feePeriod: form.feePeriod,
        description: form.description, eligibility: form.eligibility,
        image: form.imageUrl, brochureUrl: form.brochureUrl, youtubeUrl: form.youtubeUrl,
        syllabus: form.syllabus.split(',').map(s => s.trim()).filter(Boolean),
        highlights: form.highlights.split(',').map(s => s.trim()).filter(Boolean),
        careerOptions: form.careerOptions.split(',').map(s => s.trim()).filter(Boolean),
        specializations: form.specializations.split(',').map(s => s.trim()).filter(Boolean),
        metaTitle: form.metaTitle, metaDescription: form.metaDescription,
        keywords: form.keywords, canonicalUrl: form.canonicalUrl,
        ogTitle: form.ogTitle, ogImage: form.ogImageUrl, ogDescription: form.ogDescription,
        featured: form.featured, active: form.active,
      };
      const res = await fetch('/api/programs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) { setSuccess('Program created successfully! Redirecting...'); setTimeout(() => router.push('/admin/programs'), 1500); }
      else setError(data.error || 'Failed to create program');
    } catch { setError('Error creating program'); }
    finally { setLoading(false); }
  };

  const inputProps = (field: string, type = 'text') => ({
    type, value: (form as unknown as Record<string, string>)[field] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(field, e.target.value),
    style: S.input, onFocus: focusStyle, onBlur: blurStyle,
  });

  const selectProps = (field: string) => ({
    value: (form as unknown as Record<string, string>)[field] || '',
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => set(field, e.target.value),
    style: S.input, onFocus: focusStyle, onBlur: blurStyle,
  });

  const textareaProps = (field: string, rows = 3) => ({
    value: (form as unknown as Record<string, string>)[field] || '',
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => set(field, e.target.value),
    rows, style: { ...S.input, resize: 'vertical' as const, minHeight: rows * 28 },
    onFocus: focusStyle, onBlur: blurStyle,
  });

  return (
    <div style={S.wrapper}>
      <main style={S.main}>
        <div style={S.container}>
          <div style={S.pageHeader}>
            <Link href="/admin/programs" style={S.backLink}>
              <ArrowLeft size={14} color="#64748b" /> Back to Programs
            </Link>
            <h1 style={S.pageTitle}>Create New Program</h1>
            <p style={S.pageSubtitle}>Fill in the details to add a new program to the platform</p>
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
          {success && (
            <div style={S.successAlert}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: 8 }}><polyline points="20 6 9 17 4 12"/></svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Basic Info */}
            <div style={S.section}>
              <SectionHeader icon={<GraduationCap size={18} color="#fff" />} title="Basic Information" desc="Enter the core details of the program" />
              <div style={S.grid2}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={S.label}>Program Name <span style={{ color: '#ef4444' }}>*</span></label>
                  <input {...inputProps('name')} placeholder="e.g., Master of Business Administration (MBA)" required />
                </div>
                <div>
                  <label style={S.label}>University</label>
                  <select {...selectProps('universityId')} onChange={e => { set('universityId', e.target.value); set('university', universities.find(u => u._id === e.target.value)?.name || ''); }}>
                    <option value="">Select University</option>
                    {universities.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                  <p style={S.hint}>Or type manually below if not listed</p>
                </div>
                <div>
                  <label style={S.label}>University Name (manual)</label>
                  <input {...inputProps('university')} placeholder="e.g., Amity University" />
                </div>
                <div>
                  <label style={S.label}>Course Type</label>
                  <select {...selectProps('courseType')}>
                    <option value="">Select Course Type</option>
                    {['Commerce', 'Arts', 'Science', 'Technology', 'Management', 'Other'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Category</label>
                  <select {...selectProps('category')}>
                    <option value="">Select Category</option>
                    {['MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech', 'PhD', 'Diploma', 'Certificate', 'Other'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Level</label>
                  <select {...selectProps('level')}>
                    <option value="">Select Level</option>
                    {['Undergraduate', 'Postgraduate', 'Doctorate', 'Diploma', 'Certificate'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Minimum Qualification Required</label>
                  <select {...selectProps('qualification')}>
                    <option value="">Select Qualification</option>
                    {['Below 12th', '12th Pass', 'Graduate', 'Post Graduate'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Duration <span style={{ color: '#ef4444' }}>*</span></label>
                  <select {...selectProps('duration')} required>
                    <option value="">Select Duration</option>
                    {['6 Months', '1 Year', '18 Months', '2 Years', '3 Years', '4 Years', '5 Years'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.label}>Mode</label>
                  <select {...selectProps('mode')}>
                    {['Online', 'Offline', 'Hybrid', 'Distance'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Fee */}
            <div style={S.section}>
              <SectionHeader icon={<DollarSign size={18} color="#fff" />} title="Fee Information" desc="Set the program fee structure" />
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Fee Amount (₹)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>₹</span>
                    <input {...inputProps('fee', 'number')} style={{ ...S.input, paddingLeft: 28 }} placeholder="150000" />
                  </div>
                  {form.fee && <p style={S.hint}>₹{Number(form.fee).toLocaleString('en-IN')}</p>}
                </div>
                <div>
                  <label style={S.label}>Fee Period</label>
                  <select {...selectProps('feePeriod')}>
                    {['Total', 'Per Year', 'Per Semester', 'Per Month'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={S.section}>
              <SectionHeader icon={<BookOpen size={18} color="#fff" />} title="Description & Eligibility" desc="Provide detailed information about the program" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={S.label}>Description</label>
                  <textarea {...textareaProps('description', 5)} placeholder="Provide a detailed description of the program, including key features, learning outcomes, and benefits..." />
                  <p style={S.hint}>{form.description.length} characters</p>
                </div>
                <div>
                  <label style={S.label}>Eligibility Criteria</label>
                  <textarea {...textareaProps('eligibility', 3)} placeholder="e.g., Bachelor's degree in any discipline with minimum 50% marks" />
                </div>
              </div>
            </div>

            {/* Program Details */}
            <div style={S.section}>
              <SectionHeader icon={<Award size={18} color="#fff" />} title="Program Details" desc="Add syllabus, highlights, career options, and specializations" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={S.label}>Syllabus / Subjects (comma separated)</label>
                  <textarea {...textareaProps('syllabus', 3)} placeholder="Management Principles, Financial Accounting, Marketing Management" />
                  {form.syllabus && <p style={S.hint}>{form.syllabus.split(',').filter(s => s.trim()).length} subjects</p>}
                </div>
                <div>
                  <label style={S.label}>Program Highlights (comma separated)</label>
                  <textarea {...textareaProps('highlights', 2)} placeholder="Industry-Ready Curriculum, Placement Support, Live Projects" />
                </div>
                <div>
                  <label style={S.label}>Career Options (comma separated)</label>
                  <textarea {...textareaProps('careerOptions', 2)} placeholder="Business Analyst, Marketing Manager, Entrepreneur" />
                </div>
                <div>
                  <label style={S.label}>Specializations (comma separated)</label>
                  <textarea {...textareaProps('specializations', 2)} placeholder="Marketing, Finance, Human Resources" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div style={S.section}>
              <SectionHeader icon={<Globe size={18} color="#fff" />} title="Media" desc="Add program image, brochure, and video links" />
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Program Image URL</label>
                  <input {...inputProps('imageUrl')} placeholder="https://example.com/program.jpg" />
                  {form.imageUrl && <img src={form.imageUrl} alt="preview" style={{ marginTop: 10, width: '100%', height: 80, objectFit: 'cover', borderRadius: 10, border: `1.5px solid ${ACCENT_BORDER}` }} onError={e => (e.currentTarget.style.display = 'none')} />}
                </div>
                <div>
                  <label style={S.label}>Brochure (Link or Upload)</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input {...inputProps('brochureUrl')} style={{ ...S.input, flex: 1 }} placeholder="Paste URL or upload a file" />
                    <label style={{ padding: '10px 16px', background: uploading ? '#94a3b8' : `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: '0.82rem', cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
                      {uploading ? 'Uploading...' : '📎 Upload'}
                      <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} disabled={uploading} onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setUploading(true);
                        try {
                          const fd = new FormData(); fd.append('file', file);
                          const res = await fetch('/api/upload', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (data.url) set('brochureUrl', data.url);
                        } catch {}
                        finally { setUploading(false); }
                      }} />
                    </label>
                  </div>
                  {form.brochureUrl && (
                    <div style={{ marginTop: 6, fontSize: '0.73rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                      ✓ Brochure: <a href={form.brochureUrl} target="_blank" rel="noreferrer" style={{ color: ACCENT, textDecoration: 'underline', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>{form.brochureUrl}</a>
                    </div>
                  )}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={S.label}>YouTube Video URL</label>
                  <input {...inputProps('youtubeUrl')} placeholder="https://www.youtube.com/watch?v=..." />
                  <p style={S.hint}>Will be displayed on the program detail page</p>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div style={S.section}>
              <SectionHeader icon={<Building size={18} color="#fff" />} title="Settings" desc="Configure visibility and featured status" />
              <div style={S.grid2}>
                {[['featured', 'Featured Program', 'Display on homepage and featured sections'], ['active', 'Active', 'Program is visible to students']].map(([k, lbl, desc]) => (
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
              <button type="button" onClick={() => router.push('/admin/programs')} style={S.cancelBtn}>Cancel</button>
              <button type="submit" disabled={loading} style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Creating...' : <><Plus size={15} color="#fff" /> Create Program</>}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
