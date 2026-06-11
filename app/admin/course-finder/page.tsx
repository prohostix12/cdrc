'use client';
import { useState, useEffect } from 'react';

const BLANK_OPTION = { label: '' };
const BLANK_Q = { question: '', options: [{ label: '' }] };

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '2px solid #E2E8F0', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
const btnStyle = (color: string): React.CSSProperties => ({ padding: '10px 20px', background: color, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '8px' });
const iconBtn = (color: string): React.CSSProperties => ({ width: '36px', height: '36px', background: color + '22', color, border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' });

export default function CourseFinderPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const h = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/course-finder-questions', { 
        headers: h(), 
        cache: 'no-store' 
      });
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch { showToast('Failed to load questions', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const seed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/course-finder-questions/seed', { method: 'POST', headers: h() });
      const d = await res.json();
      showToast(d.message || 'Seeded!');
      load();
    } catch { showToast('Seed failed', 'error'); }
    finally { setSeeding(false); }
  };

  const openAdd = () => setModal({ mode: 'add', data: { ...BLANK_Q, options: [{ ...BLANK_OPTION }] } });
  const openEdit = (q: any) => setModal({ mode: 'edit', data: JSON.parse(JSON.stringify(q)) });

  const save = async () => {
    const { data, mode } = modal;
    if (!data.question.trim() || data.options.length === 0 || data.options.some((o: any) => !o.label.trim())) {
      showToast('Question and all option labels are required', 'error'); return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/course-finder-questions' : `/api/admin/course-finder-questions/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      // Auto-generate field from question, options value from label
      const autoField = data.field || data.question.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30);
      const cleanOptions = data.options.map((o: any) => ({
        label: o.label,
        value: o.value || o.label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
        icon: 'fa-circle',
      }));
      const autoOrder = mode === 'add' ? questions.length + 1 : data.order;
      const res = await fetch(url, { method, headers: h(), body: JSON.stringify({ ...data, field: autoField, order: autoOrder, isActive: true, options: cleanOptions }) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      showToast(mode === 'add' ? 'Question added!' : 'Question updated!');
      setModal(null); load();
    } catch (err: any) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const deleteQ = async (id: string, question: string) => {
    if (!window.confirm(`Delete question: "${question}"?`)) return;
    try {
      showToast('Deleting...');
      const res = await fetch(`/api/admin/course-finder-questions/${id}`, { method: 'DELETE', headers: h() });
      if (!res.ok) throw new Error('Failed to delete');
      setQuestions(prev => prev.filter(q => q._id !== id)); // Optimistic UI update
      showToast('Question deleted'); 
    } catch { showToast('Delete failed', 'error'); }
  };

  const toggleActive = async (q: any) => {
    try {
      await fetch(`/api/admin/course-finder-questions/${q._id}`, { method: 'PUT', headers: h(), body: JSON.stringify({ isActive: !q.isActive }) });
      showToast('Status updated'); load();
    } catch { showToast('Failed', 'error'); }
  };

  const setField = (key: string, val: any) => setModal((m: any) => ({ ...m, data: { ...m.data, [key]: val } }));
  const setOption = (i: number, key: string, val: any) => setModal((m: any) => {
    const opts = [...m.data.options]; opts[i] = { ...opts[i], [key]: val };
    return { ...m, data: { ...m.data, options: opts } };
  });
  const addOption = () => setModal((m: any) => ({ ...m, data: { ...m.data, options: [...m.data.options, { ...BLANK_OPTION }] } }));
  const removeOption = (i: number) => setModal((m: any) => ({ ...m, data: { ...m.data, options: m.data.options.filter((_: any, idx: number) => idx !== i) } }));

  return (
    <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 99999, padding: '14px 22px', borderRadius: '12px', background: toast.type === 'error' ? '#DC2626' : '#16A34A', color: '#fff', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', fontSize: '0.95rem' }}>
          {toast.msg}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 500, color: '#0F172A' }}>Course Finder Questions</h1>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem' }}>Manage the quiz questions shown in the "Find My Course" widget.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={openAdd} style={btnStyle('#1e40af')}>+ Add Question</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading questions...</div>
      ) : questions.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#334155', margin: '0 0 10px' }}>No questions yet</h3>
          <p style={{ color: '#64748B', margin: '0 0 20px' }}>Click below to populate the database with the standard quiz, or add your own.</p>
          <button onClick={seed} disabled={seeding} style={btnStyle('#10B981')}>
            {seeding ? 'Seeding...' : 'Seed Default Questions'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {questions.map((q, idx) => (
            <div key={q._id} style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: `4px solid ${q.isActive ? '#1e40af' : '#CBD5E1'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#EFF6FF', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>Q{idx + 1}</span>
                    <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>field: {q.field}</span>
                    <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>order: {q.order}</span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: q.isActive ? '#DCFCE7' : '#FEE2E2', color: q.isActive ? '#16A34A' : '#DC2626' }}>{q.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', color: '#0F172A' }}>{q.question}</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {q.options.map((o: any) => (
                      <span key={o.value} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#334155' }}>{o.label}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleActive(q)} style={iconBtn(q.isActive ? '#D97706' : '#16A34A')} title={q.isActive ? 'Deactivate' : 'Activate'}>{q.isActive ? '⊘' : '✓'}</button>
                  <button onClick={() => openEdit(q)} style={iconBtn('#3B82F6')} title="Edit">✎</button>
                  <button onClick={() => deleteQ(q._id, q.question)} style={iconBtn('#DC2626')} title="Delete">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflow: 'auto', padding: '35px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 500, color: '#0F172A' }}>{modal.mode === 'add' ? 'Add New Question' : 'Edit Question'}</h2>
              <button onClick={() => setModal(null)} style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748B' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <FormField label="Question *">
                <input value={modal.data.question} onChange={e => setField('question', e.target.value)} placeholder="e.g. What is your highest qualification?" style={inputStyle} />
              </FormField>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={labelStyle}>Options *</label>
                  <button onClick={addOption} style={{ ...btnStyle('#10B981'), padding: '6px 14px', fontSize: '0.85rem' }}>+ Add Option</button>
                </div>
                {modal.data.options.map((opt: any, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600, minWidth: '24px' }}>{i + 1}.</span>
                    <input
                      value={opt.label}
                      onChange={e => setOption(i, 'label', e.target.value)}
                      placeholder={`Option ${i + 1} label`}
                      style={{ ...inputStyle, margin: 0 }}
                    />
                    {modal.data.options.length > 1 && (
                      <button onClick={() => removeOption(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
              <button onClick={() => setModal(null)} style={{ padding: '12px 24px', background: '#F1F5F9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', color: '#64748B' }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ ...btnStyle('#1e40af'), padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : modal.mode === 'add' ? 'Add Question' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
