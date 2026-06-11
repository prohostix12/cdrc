'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, CheckCircle, X } from '@/components/Icon';
import ConfirmModal from '@/components/ConfirmModal';

const RBL = '#0a192f'; // Dark Blue
const BLANK_OPTION = { label: '' };
const BLANK_Q = { question: '', options: [{ label: '' }], field: '', order: 0, isActive: true };

export default function SuggestUniversityAdminPage() {
  const [activeTab, setActiveTab] = useState<'questions' | 'leads'>('questions');
  const [questions, setQuestions] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', text: '', type: 'question' as 'question' | 'lead' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (activeTab === 'questions') loadQuestions();
    else loadLeads();
  }, [activeTab]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/suggest-university-questions', { headers: getHeaders() });
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data.sort((a,b) => (a.order || 0) - (b.order || 0)) : []);
    } catch { showToast('Failed to load questions', 'error'); }
    finally { setLoading(false); }
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', { headers: getHeaders() });
      const data = await res.json();
      if (data.success) {
        // Filter leads for Suggest University
        const filtered = data.data.filter((l: any) => 
          l.source === 'Suggest University' || l.source === 'Suggest University Quiz'
        );
        setLeads(filtered);
      }
    } catch { showToast('Failed to load leads', 'error'); }
    finally { setLoading(false); }
  };

  const openAdd = () => setModal({ mode: 'add', data: { ...BLANK_Q, order: questions.length + 1 } });
  const openEdit = (q: any) => setModal({ mode: 'edit', data: JSON.parse(JSON.stringify(q)) });

  const saveQuestion = async () => {
    const { data, mode } = modal;
    if (!data.question.trim() || data.options.length === 0 || data.options.some((o: any) => !o.label.trim())) {
      showToast('Question and all options are required', 'error'); return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/suggest-university-questions' : `/api/admin/suggest-university-questions/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      
      const payload = {
        ...data,
        field: data.field || data.question.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30),
        options: data.options.map((o: any) => ({
          label: o.label,
          value: o.value || o.label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
          icon: 'fa-circle'
        }))
      };

      const res = await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Save failed');
      showToast(mode === 'add' ? 'Question added!' : 'Question updated!');
      setModal(null);
      loadQuestions();
    } catch { showToast('Error saving question', 'error'); }
    finally { setSaving(false); }
  };

  const deleteQ = (id: string, text: string) => {
    setDeleteModal({ isOpen: true, id, text, type: 'question' });
  };

  const deleteLead = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, text: name, type: 'lead' });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const url = deleteModal.type === 'question' 
        ? `/api/admin/suggest-university-questions/${deleteModal.id}`
        : `/api/leads/${deleteModal.id}`;
      
      const res = await fetch(url, { method: 'DELETE', headers: getHeaders() });
      if (!res.ok) throw new Error();
      showToast('Deleted successfully');
      setDeleteModal({ isOpen: false, id: '', text: '', type: 'question' });
      if (activeTab === 'questions') loadQuestions();
      else loadLeads();
    } catch { showToast('Delete failed', 'error'); }
    finally { setIsDeleting(false); }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l._id === id ? { ...l, status } : l));
        showToast('Status updated');
      }
    } catch { showToast('Failed to update status', 'error'); }
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.field || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 10000, padding: '12px 24px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: '#fff', borderRadius: 12, fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          {toast.msg}
        </div>
      )}

      {/* Modern Header */}
      <div style={{ background: '#fff', padding: 'clamp(1rem, 4vw, 2rem)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6b7280', textDecoration: 'none', marginBottom: 16, fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>Suggest University</h1>
              <p style={{ color: '#6b7280', margin: 0 }}>Manage assessment and track incoming leads</p>
            </div>
            {activeTab === 'questions' && (
              <button onClick={openAdd} style={{ padding: '12px 24px', background: RBL, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                <Plus size={20} color="#fff" /> Add Question
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 24, marginTop: 32, borderBottom: '1px solid #e5e7eb' }}>
            <button 
              onClick={() => setActiveTab('questions')}
              style={{ paddingBottom: 16, borderBottom: `2px solid ${activeTab === 'questions' ? RBL : 'transparent'}`, color: activeTab === 'questions' ? RBL : '#64748b', fontWeight: 600, background: 'none', border: 'none', borderBottomWidth: 2, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Questions ({questions.length})
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              style={{ paddingBottom: 16, borderBottom: `2px solid ${activeTab === 'leads' ? RBL : 'transparent'}`, color: activeTab === 'leads' ? RBL : '#64748b', fontWeight: 600, background: 'none', border: 'none', borderBottomWidth: 2, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Leads ({leads.length})
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
        {/* Search */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', position: 'relative' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            placeholder={activeTab === 'questions' ? "Search questions..." : "Search leads by name, email, or phone..."} 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} 
            onFocus={e => e.target.style.borderColor = RBL} 
            onBlur={e => e.target.style.borderColor = '#e2e8f0'} 
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading...</div>
        ) : activeTab === 'questions' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredQuestions.length === 0 ? (
              <div style={{ background: '#f8fafc', padding: '4rem', borderRadius: 12, textAlign: 'center', color: '#64748b', border: '2px dashed #e2e8f0' }}>No questions found.</div>
            ) : (
              filteredQuestions.map((q, i) => (
                <div key={q._id} style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <span style={{ padding: '4px 10px', background: '#eff6ff', color: RBL, borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>Step {q.order || i + 1}</span>
                      <span style={{ padding: '4px 10px', background: q.isActive ? '#dcfce7' : '#fee2e2', color: q.isActive ? '#16a34a' : '#dc2626', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{q.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>{q.question}</h3>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {q.options.map((o: any, idx: number) => (
                        <span key={idx} style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 8, fontSize: '0.8rem', border: '1px solid #e2e8f0' }}>{o.label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(q)} style={{ width: 40, height: 40, background: '#eff6ff', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Edit size={18} color={RBL} />
                    </button>
                    <button onClick={() => deleteQ(q._id, q.question)} style={{ width: 40, height: 40, background: '#fff1f2', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trash2 size={18} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['Student', 'Course / University / Assistance Request', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>No leads found for Suggest University.</td></tr>
                  ) : (
                    filteredLeads.map(l => (
                      <tr key={l._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', minWidth: 200 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{l.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{l.email} | {l.phone}</div>
                        </td>
                        <td style={{ padding: '16px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                           {l.course}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <select 
                            value={l.status || 'New'} 
                            onChange={e => updateLeadStatus(l._id, e.target.value)}
                            style={{ 
                              padding: '6px 12px', 
                              borderRadius: 50, 
                              border: 'none', 
                              fontSize: '0.75rem', 
                              fontWeight: 600,
                              background: l.status === 'Converted' ? '#dcfce7' : l.status === 'Contacted' ? '#fef9c3' : '#eff6ff',
                              color: l.status === 'Converted' ? '#15803d' : l.status === 'Contacted' ? '#a16207' : '#1e40af'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <button onClick={() => deleteLead(l._id, l.name)} style={{ background: '#fff1f2', border: 'none', padding: '8px', borderRadius: 8, cursor: 'pointer' }}>
                            <Trash2 size={16} color="#ef4444" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000, padding: 20 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 500, borderRadius: 24, padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{modal.mode === 'add' ? 'New Question' : 'Edit Question'}</h2>
              <button onClick={() => setModal(null)} style={{ background: '#f1f5f9', border: 'none', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} color="#64748b" /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Question Text</label>
                <input value={modal.data.question} onChange={e => setModal({...modal, data: {...modal.data, question: e.target.value}})} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor = RBL} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Step Order</label>
                    <input type="number" value={modal.data.order} onChange={e => setModal({...modal, data: {...modal.data, order: e.target.value === '' ? '' : parseInt(e.target.value)}})} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none' }} />
                 </div>
                 <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Internal Field</label>
                    <input value={modal.data.field} onChange={e => setModal({...modal, data: {...modal.data, field: e.target.value}})} placeholder="Auto-generated if empty" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #e2e8f0', outline: 'none' }} />
                 </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Options</label>
                  <button onClick={() => setModal({...modal, data: {...modal.data, options: [...modal.data.options, {label:''}]}})} style={{ background: '#eff6ff', color: RBL, border: 'none', padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>+ Add Option</button>
                </div>
                {modal.data.options.map((o: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input value={o.label} onChange={e => {
                      const opts = [...modal.data.options]; opts[idx].label = e.target.value;
                      setModal({...modal, data: {...modal.data, options: opts}});
                    }} placeholder={`Option ${idx+1}`} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', outline: 'none' }} />
                    <button onClick={() => {
                      const opts = modal.data.options.filter((_:any, i:number) => i !== idx);
                      setModal({...modal, data: {...modal.data, options: opts}});
                    }} style={{ background: '#fff1f2', border: 'none', padding: '8px', borderRadius: 8, cursor: 'pointer' }}><X size={14} color="#ef4444" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
               <button onClick={() => setModal(null)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
               <button onClick={saveQuestion} disabled={saving} style={{ flex: 2, padding: '12px', background: RBL, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save Question'}</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.type === 'question' ? "Delete Question?" : "Delete Lead?"}
        message={`Are you sure you want to delete "${deleteModal.text}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => !isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </div>
  );
}
