'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Mail, Phone, Users, GraduationCap } from '@/components/Icon';

interface Enrollment {
  _id?: string;
  studentName: string;
  email: string;
  phone: string;
  university: string;
  program: string;
  message?: string;
  createdAt?: string;
  status?: string;
}

export default function EnrollmentsManagement() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchEnrollments();
    
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments');
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        fetchEnrollments();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getStatusStyle = (status?: string) => {
    const currentStatus = status || 'pending';
    switch (currentStatus) {
      case 'approved':
        return { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' };
      case 'rejected':
        return { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' };
      default:
        return { background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' };
    }
  };

  const filteredEnrollments = enrollments.filter(enr =>
    enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.program.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#1f2937', lineHeight: 1.2 }}>
              Enrollment Inquiries
            </h1>
            <p style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.1rem)', opacity: 0.9, color: '#6b7280' }}>
              {enrollments.length} inquiries received
            </p>
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
              placeholder="Search by student name, email, university, or program..."
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

        {/* Enrollments List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading enrollments...
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
            padding: 'clamp(2rem, 6vw, 4rem)',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: '#64748b' }}>
              {searchTerm ? 'No enrollments found matching your search.' : 'No enrollment inquiries yet.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 'clamp(0.75rem, 2vw, 1rem)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Program & University</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enr, index) => (
                  <tr key={enr._id || index} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s', ':hover': { background: '#f1f5f9' } } as React.CSSProperties}>
                    <td style={{ padding: '1rem 1.5rem', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem', marginBottom: '4px' }}>{enr.studentName}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}><Mail size={14} /> {enr.email}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {enr.phone}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem', marginBottom: '4px' }}>{enr.program}</div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><GraduationCap size={14} /> {enr.university}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#475569', maxWidth: '250px', verticalAlign: 'top' }}>
                      {enr.message ? (
                        <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.82rem', maxHeight: '80px', overflowY: 'auto' }}>
                          {enr.message}
                        </div>
                      ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b', verticalAlign: 'top' }}>
                      {enr.createdAt ? new Date(enr.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', verticalAlign: 'top' }}>
                      <select
                        value={enr.status || 'pending'}
                        onChange={(e) => handleStatusChange(enr._id || '', e.target.value)}
                        style={{
                          width: '120px',
                          padding: '0.5rem 0.6rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          outline: 'none',
                          ...getStatusStyle(enr.status)
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
