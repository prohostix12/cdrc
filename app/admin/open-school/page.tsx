'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, Award } from '@/components/Icon';

interface Program {
  name: string;
  subjects: string;
}

interface Board {
  _id?: string;
  name: string;
  icon: string;
  description: string;
  programs?: Program[];
}

export default function OpenSchoolManagement() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/open-school');
      const data = await response.json();
      setBoards(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const response = await fetch(`/api/open-school/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Board deleted successfully!');
        fetchBoards();
      } else {
        alert('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Error deleting board');
    }
  };

  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
                Manage Open School
              </h1>
              <p style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.1rem)', opacity: 0.9, color: '#6b7280' }}>
                {boards.length} boards in total
              </p>
            </div>
            <Link
              href="/admin/open-school/create"
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
              Add Board
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
              placeholder="Search boards by name or description..."
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

        {/* Boards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading boards...
          </div>
        ) : filteredBoards.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
            padding: 'clamp(2rem, 6vw, 4rem)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: '#64748b' }}>
              {searchTerm ? 'No boards found matching your search.' : 'No boards yet. Add your first board!'}
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 40vw, 350px), 1fr))', 
            gap: 'clamp(1rem, 3vw, 1.5rem)' 
          }}>
            {filteredBoards.map((board, index) => (
              <div key={board._id || index} style={{
                background: '#fff',
                borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'start', 
                  gap: 'clamp(0.75rem, 2vw, 1rem)', 
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)' 
                }}>
                  <div style={{
                    width: 'clamp(40px, 8vw, 48px)',
                    height: 'clamp(40px, 8vw, 48px)',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Award size={24} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
                      fontWeight: 500, 
                      color: '#1e293b', 
                      marginBottom: '0.5rem',
                      lineHeight: 1.3
                    }}>
                      {board.name}
                    </h3>
                    <p style={{ 
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
                      color: '#64748b', 
                      lineHeight: 1.6 
                    }}>
                      {board.description}
                    </p>
                  </div>
                </div>

                {board.programs && board.programs.length > 0 && (
                  <div style={{ 
                    marginBottom: 'clamp(0.75rem, 2vw, 1rem)', 
                    paddingTop: 'clamp(0.75rem, 2vw, 1rem)', 
                    borderTop: '1px solid #e2e8f0' 
                  }}>
                    <div style={{ 
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', 
                      fontWeight: 500, 
                      color: '#64748b', 
                      marginBottom: '0.5rem', 
                      textTransform: 'uppercase' 
                    }}>
                      Programs ({board.programs.length})
                    </div>
                    {board.programs.map((prog, idx) => (
                      <div key={idx} style={{ 
                        fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
                        color: '#475569',
                        marginBottom: '0.25rem',
                        paddingLeft: '0.5rem'
                      }}>
                        • {prog.name}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ 
                  display: 'flex', 
                  gap: 'clamp(0.5rem, 1.5vw, 0.75rem)', 
                  paddingTop: 'clamp(0.75rem, 2vw, 1rem)', 
                  borderTop: '1px solid #e2e8f0' 
                }}>
                  <Link
                    href={`/admin/open-school/edit/${board._id}`}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.375rem',
                      padding: 'clamp(0.5rem, 1.5vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)',
                      background: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
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
                  <button
                    onClick={() => handleDelete(board._id || '', board.name)}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.375rem',
                      padding: 'clamp(0.5rem, 1.5vw, 0.625rem) clamp(0.75rem, 2vw, 1rem)',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#dc2626';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fee2e2';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
