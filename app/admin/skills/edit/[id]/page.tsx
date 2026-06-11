'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from '@/components/Icon';

interface Course { name: string; duration: string; description: string; }

const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.95rem', outline: 'none', background: '#fff', color: '#1e293b', boxSizing: 'border-box' };
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' };
const sectionStyle: React.CSSProperties = { background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1.5rem', border: '1px solid #f1f5f9' };
const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' };

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', category: 'Technology', level: 'Beginner', duration: '', price: '', image: '', brochureUrl: '' });
  const [courses, setCourses] = useState<Course[]>([{ name: '', duration: '', description: '' }]);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) set('brochureUrl', data.url);
      else alert('Upload failed');
    } catch { alert('Upload error'); }
    finally { setUploading(false); }
  };


  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => {
      if (d.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const skill = d.data.find((s: any) => s._id === id);
        if (skill) {
          setForm({ name: skill.name || '', description: skill.description || '', category: skill.category || 'Technology', level: skill.level || 'Beginner', duration: skill.duration || '', price: skill.price || '', image: skill.image || '', brochureUrl: skill.brochureUrl || '' });
          setCourses(skill.courses?.length ? skill.courses : [{ name: '', duration: '', description: '' }]);
        }
      }
      setFetching(false);
    }).catch(() => setFetching(false));
  }, [id]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, courses: courses.filter(c => c.name.trim()) }),
      });
      if (res.ok) router.push('/admin/skills');
      else { const err = await res.json(); alert(err.error || 'Failed'); }
    } catch { alert('Error updating skill'); }
    finally { setLoading(false); }
  };

  if (fetching) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: 'linear-gradient(135deg, #4361EE, #2d2d6b)', padding: '1.5rem 2rem', color: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/admin/skills" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none', opacity: 0.85, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Skills
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Edit Skill Program</h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <form onSubmit={handleSubmit}>

          <div style={sectionStyle}>
            <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '1rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>Basic Information</div>
            <div style={grid2}>
              <div>
                <label style={labelStyle}>Skill Name *</label>
                <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g., Digital Marketing" />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                  {['Technology', 'Business', 'Design', 'Marketing', 'Finance', 'Communication', 'Healthcare', 'General'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Level</label>
                <select value={form.level} onChange={e => set('level', e.target.value)} style={inputStyle}>
                  {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Duration</label>
                <input style={inputStyle} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g., 3 Months" />
              </div>
              <div>
                <label style={labelStyle}>Price (₹)</label>
                <input style={inputStyle} value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g., 5000" />
              </div>
              <div>
                <label style={labelStyle}>Banner Image URL</label>
                <input style={inputStyle} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label style={labelStyle}>Brochure (Link or Upload)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={form.brochureUrl} onChange={e => set('brochureUrl', e.target.value)} placeholder="Paste URL or upload a file" />
                  <label style={{ padding: '0.7rem 1rem', background: uploading ? '#94a3b8' : '#4361EE', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem', cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {uploading ? 'Uploading...' : '📎 Upload'}
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleBrochureUpload} style={{ display: 'none' }} disabled={uploading} />
                  </label>
                </div>
                {form.brochureUrl && (
                  <div style={{ marginTop: 6, fontSize: '0.8rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ✓ Brochure set: <a href={form.brochureUrl} target="_blank" rel="noreferrer" style={{ color: '#4361EE', textDecoration: 'underline', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>{form.brochureUrl}</a>
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <label style={labelStyle}>Description *</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={form.description} onChange={e => set('description', e.target.value)} required placeholder="Describe what students will learn..." />
            </div>
          </div>

          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontWeight: 500, color: '#0f172a', fontSize: '1rem' }}>Courses Included</div>
              <button type="button" onClick={() => setCourses([...courses, { name: '', duration: '', description: '' }])}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#4361EE', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'inherit' }}>
                <Plus size={15} /> Add Course
              </button>
            </div>
            {courses.map((c, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>Course {i + 1}</span>
                  {courses.length > 1 && (
                    <button type="button" onClick={() => setCourses(courses.filter((_, j) => j !== i))} style={{ padding: '4px 8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', fontFamily: 'inherit' }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div style={grid2}>
                  <div>
                    <label style={labelStyle}>Course Name *</label>
                    <input style={inputStyle} value={c.name} onChange={e => { const n = [...courses]; n[i].name = e.target.value; setCourses(n); }} placeholder="e.g., SEO Fundamentals" />
                  </div>
                  <div>
                    <label style={labelStyle}>Duration</label>
                    <input style={inputStyle} value={c.duration} onChange={e => { const n = [...courses]; n[i].duration = e.target.value; setCourses(n); }} placeholder="e.g., 2 Weeks" />
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={c.description} onChange={e => { const n = [...courses]; n[i].description = e.target.value; setCourses(n); }} placeholder="Brief course description..." />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/admin/skills" style={{ padding: '0.75rem 1.5rem', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>Cancel</Link>
            <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.75rem', background: loading ? '#94a3b8' : '#4361EE', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontFamily: 'inherit' }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
