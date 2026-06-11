'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search } from '@/components/Icon';
import ConfirmModal from '@/components/ConfirmModal';

interface University {
  _id?: string;
  name: string;
  slug: string;
  location: string;
  naac: string;
  accreditation: string;
  logoInitial: string;
  type?: string;
  programs: Array<{ name: string; duration: string }>;
}

export default function UniversitiesManagement() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: '', name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUniversities();
    
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      if (data.success) {
        setUniversities(data.data);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/universities/${deleteModal.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setDeleteModal({ isOpen: false, id: '', name: '' });
        fetchUniversities();
      } else {
        alert('Failed to delete university');
      }
    } catch (error) {
      console.error('Error deleting university:', error);
      alert('Error deleting university');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: 'clamp(1rem, 4vw, 2rem)',
        color: '#1f2937',
        borderBottom: '1px solid #e5e7eb',
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9,
            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
          }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'clamp(1rem, 3vw, 2rem)' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#1f2937', lineHeight: 1.2 }}>
                Manage Universities
              </h1>
              <p style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.1rem)', opacity: 0.9, color: '#6b7280' }}>
                {universities.length} universities in total
              </p>
            </div>
            <Link
              href="/admin/universities/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.5rem)',
                background: '#1e40af',
                color: '#fff',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 175, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Plus size={20} />
              Add University
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem)' }}>
        {/* Search Bar */}
        <div style={{
          background: '#fff',
          borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 'clamp(0.75rem, 2vw, 0.875rem) 1rem clamp(0.75rem, 2vw, 0.875rem) 3rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.75rem',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Universities List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading universities...
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
            padding: 'clamp(2rem, 6vw, 4rem)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: '#64748b' }}>
              {searchTerm ? 'No universities found matching your search.' : 'No universities yet. Add your first university!'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div style={{
              background: '#fff',
              borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: isMobile ? 'none' : 'block'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 500, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>University</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 500, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Location</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 500, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>University Type</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 500, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>NAAC</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 500, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUniversities.map((uni, index) => (
                      <tr key={uni._id || index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: 'clamp(40px, 8vw, 48px)',
                              height: 'clamp(40px, 8vw, 48px)',
                              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                              borderRadius: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 500,
                              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                            }}>
                              {uni.logoInitial || uni.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{uni.name}</div>
                              <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#64748b' }}>{uni.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                          {uni.location || 'N/A'}
                        </td>
                        <td style={{ padding: '1rem', color: '#64748b', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                          {uni.type || 'N/A'}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.375rem 0.75rem',
                            background: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '0.5rem',
                            fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                            fontWeight: 600
                          }}>
                            {uni.naac || uni.accreditation}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {uni._id ? (
                              <Link
                                href={`/admin/universities/edit/${uni._id}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.375rem',
                                  padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                                  background: '#dbeafe',
                                  color: '#1e40af',
                                  borderRadius: '0.5rem',
                                  textDecoration: 'none',
                                  fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                                  fontWeight: 600,
                                  transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#1e40af';
                                  e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#dbeafe';
                                  e.currentTarget.style.color = '#1e40af';
                                }}
                              >
                                <Edit size={16} />
                                Edit
                              </Link>
                            ) : (
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                                background: '#f1f5f9',
                                color: '#94a3b8',
                                borderRadius: '0.5rem',
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                                fontWeight: 600
                              }}>
                                <Edit size={16} />
                                No ID
                              </span>
                            )}
                            <button
                              onClick={() => handleDelete(uni._id || '', uni.name)}
                              disabled={!uni._id}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                                background: uni._id ? '#fee2e2' : '#f1f5f9',
                                color: uni._id ? '#dc2626' : '#94a3b8',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                                fontWeight: 600,
                                cursor: uni._id ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                if (uni._id) {
                                  e.currentTarget.style.background = '#dc2626';
                                  e.currentTarget.style.color = '#fff';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (uni._id) {
                                  e.currentTarget.style.background = '#fee2e2';
                                  e.currentTarget.style.color = '#dc2626';
                                }
                              }}
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div style={{
              display: isMobile ? 'block' : 'none'
            }}>
              <div style={{ display: 'grid', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
                {filteredUniversities.map((uni, index) => (
                  <div key={uni._id || index} style={{
                    background: '#fff',
                    borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
                    padding: 'clamp(1rem, 4vw, 1.5rem)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0'
                  }}>
                    {/* University Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 3vw, 1rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                      <div style={{
                        width: 'clamp(48px, 12vw, 60px)',
                        height: 'clamp(48px, 12vw, 60px)',
                        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
                      }}>
                        {uni.logoInitial || uni.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, color: '#1e293b', fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.25rem' }}>
                          {uni.name}
                        </div>
                        <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#64748b' }}>
                          {uni.slug}
                        </div>
                      </div>
                    </div>

                    {/* University Details */}
                    <div style={{ display: 'grid', gap: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#64748b', fontWeight: 500 }}>Location:</span>
                        <span style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: '#1e293b', fontWeight: 600 }}>
                          {uni.location || 'N/A'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#64748b', fontWeight: 500 }}>University Type:</span>
                        <span style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', color: '#1e293b', fontWeight: 600 }}>
                          {uni.type || 'N/A'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#64748b', fontWeight: 500 }}>NAAC:</span>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '0.5rem',
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                          fontWeight: 600
                        }}>
                          {uni.naac || uni.accreditation}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', flexWrap: 'wrap' }}>
                      {uni._id ? (
                        <Link
                          href={`/admin/universities/edit/${uni._id}`}
                          style={{
                            flex: 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: 'clamp(0.75rem, 2vw, 1rem)',
                            background: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '0.75rem',
                            textDecoration: 'none',
                            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                            fontWeight: 600,
                            transition: 'all 0.3s',
                            minWidth: '120px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1e40af';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#dbeafe';
                            e.currentTarget.style.color = '#1e40af';
                          }}
                        >
                          <Edit size={18} />
                          Edit
                        </Link>
                      ) : (
                        <div style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: 'clamp(0.75rem, 2vw, 1rem)',
                          background: '#f1f5f9',
                          color: '#94a3b8',
                          borderRadius: '0.75rem',
                          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                          fontWeight: 600,
                          minWidth: '120px'
                        }}>
                          <Edit size={18} />
                          No ID
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(uni._id || '', uni.name)}
                        disabled={!uni._id}
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: 'clamp(0.75rem, 2vw, 1rem)',
                          background: uni._id ? '#fee2e2' : '#f1f5f9',
                          color: uni._id ? '#dc2626' : '#94a3b8',
                          border: 'none',
                          borderRadius: '0.75rem',
                          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                          fontWeight: 600,
                          cursor: uni._id ? 'pointer' : 'not-allowed',
                          transition: 'all 0.3s',
                          minWidth: '120px'
                        }}
                        onMouseEnter={(e) => {
                          if (uni._id) {
                            e.currentTarget.style.background = '#dc2626';
                            e.currentTarget.style.color = '#fff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (uni._id) {
                            e.currentTarget.style.background = '#fee2e2';
                            e.currentTarget.style.color = '#dc2626';
                          }
                        }}
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete University?"
        message={`Are you sure you want to delete "${deleteModal.name}"? All programs associated with this university will remain, but their university link may be broken. This action cannot be undone.`}
        confirmLabel="Delete University"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => !isDeleting && setDeleteModal({ ...deleteModal, isOpen: false })}
      />
    </div>
  );
}
