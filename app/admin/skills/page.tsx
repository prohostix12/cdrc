'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit } from '@/components/Icon';
import ConfirmModal from '@/components/ConfirmModal';

interface Skill { _id: string; name: string; category: string; level: string; duration: string; courses: { name: string }[]; }

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => { if (d.success) setSkills(d.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const deleteSkill = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    
    setIsDeleting(true);
    try {
      await fetch(`/api/skills/${deleteModal.id}`, { method: 'DELETE' });
      setSkills(prev => prev.filter(s => s._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: '', name: '' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Error deleting skill');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500, color: '#0f172a', margin: 0 }}>Skill Programs</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: '0.9rem' }}>{skills.length} skill programs</p>
        </div>
        <Link href="/admin/skills/create" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#4361EE', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Skill
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading...</div>
      ) : skills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>No skill programs yet.</p>
          <Link href="/admin/skills/create" style={{ background: '#4361EE', color: '#fff', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Create First Skill</Link>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Skill Name', 'Category', 'Level', 'Duration', 'Courses', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skills.map((s, i) => (
                <tr key={s._id} style={{ borderBottom: i < skills.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>{s.name}</td>
                  <td style={{ padding: '1rem 1.25rem' }}><span style={{ background: '#eef2ff', color: '#4361EE', padding: '3px 10px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>{s.category}</span></td>
                  <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.9rem' }}>{s.level}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.9rem' }}>{s.duration || '-'}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.9rem' }}>{s.courses?.length || 0}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link href={`/admin/skills/edit/${s._id}`} style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: '#eef2ff', color: '#4361EE', borderRadius: 7, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, gap: 4 }}>
                        <Edit size={14} /> Edit
                      </Link>
                      <button onClick={() => deleteSkill(s._id, s.name)} style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, gap: 4, fontFamily: 'inherit' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Skill?"
        message={`Are you sure you want to delete the skill program "${deleteModal.name}"? This action cannot be undone.`}
        confirmLabel="Delete Skill"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => !isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </div>
  );
}
