'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, X } from '@/components/Icon';

interface Program {
  name: string;
  subjects: string;
}

function EditOpenSchoolPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    programs: [] as Program[]
  });
  const [programForm, setProgramForm] = useState({ name: '', subjects: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/open-school/${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setForm({
              name: data.data.name || '',
              description: data.data.description || '',
              programs: data.data.programs || []
            });
          } else {
            setError('Failed to load board');
          }
          setFetching(false);
        })
        .catch(() => {
          setError('Failed to load board');
          setFetching(false);
        });
    }
  }, [id]);

  const addProgram = () => {
    if (!programForm.name || !programForm.subjects) {
      alert('Please fill in both program name and subjects');
      return;
    }
    setForm({
      ...form,
      programs: [...form.programs, { ...programForm }]
    });
    setProgramForm({ name: '', subjects: '' });
  };

  const removeProgram = (index: number) => {
    setForm({
      ...form,
      programs: form.programs.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/open-school/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, icon: '🎓' })
      });

      const data = await response.json();

      if (data.success) {
        alert('Board updated successfully!');
        router.push('/admin/open-school');
      } else {
        setError(data.error || 'Failed to update board');
      }
    } catch (err) {
      setError('An error occurred while updating the board');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading board...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2rem',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/admin/open-school" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fff',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            <ArrowLeft size={20} />
            Back to Open School
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 600 }}>
            Edit Board
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          background: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Board Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., NIOS (National Institute of Open Schooling)"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the board..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Programs Section */}
            <div style={{
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '0.75rem',
              border: '2px dashed #cbd5e1'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#1f2937', marginBottom: '1rem' }}>
                Programs
              </h3>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                  placeholder="Program name (e.g., Class 10)"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <input
                  type="text"
                  value={programForm.subjects}
                  onChange={(e) => setProgramForm({ ...programForm, subjects: e.target.value })}
                  placeholder="Subjects (e.g., All Subjects)"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={addProgram}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#1e40af',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem'
                  }}
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {form.programs.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {form.programs.map((prog, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: '#fff',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1f2937' }}>{prog.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{prog.subjects}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProgram(idx)}
                        style={{
                          padding: '0.375rem',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '0.75rem',
                color: '#991b1b',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
              <Link
                href="/admin/open-school"
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: '2px solid #e5e7eb',
                  background: '#fff',
                  color: '#6b7280',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                }}
              >
                {loading ? 'Updating...' : 'Update Board'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOpenSchoolPage;
