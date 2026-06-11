'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, GraduationCap, BookOpen, TrendingUp, Plus, ArrowLeft } from '@/components/Icon';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUniversities: 0,
    totalPrograms: 0,
    totalEnrollments: 0,
    totalContacts: 0,
    totalOpenSchool: 0,
    totalSkills: 0,
    totalLeads: 0
  });
  const [migrating, setMigrating] = useState(false);
  const [migrateMessage, setMigrateMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch real data from APIs
      const [universitiesRes, enrollmentsRes, contactsRes, programsRes, openSchoolRes, skillsRes, leadsRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/enrollments'),
        fetch('/api/contact'),
        fetch('/api/programs'),
        fetch('/api/open-school'),
        fetch('/api/skills'),
        fetch('/api/leads'),
      ]);

      const universitiesData = await universitiesRes.json();
      const enrollmentsData = await enrollmentsRes.json();
      const contactsData = await contactsRes.json();
      const programsData = await programsRes.json();
      const openSchoolData = await openSchoolRes.json();
      const skillsData = await skillsRes.json();
      const leadsData = await leadsRes.json();

      setStats({
        totalUniversities: universitiesData.success ? universitiesData.data.length : 0,
        totalPrograms: programsData.success ? programsData.data.length : 0,
        totalEnrollments: enrollmentsData.success ? enrollmentsData.data.length : 0,
        totalContacts: contactsData.success ? contactsData.data.length : 0,
        totalOpenSchool: Array.isArray(openSchoolData) ? openSchoolData.reduce((acc: number, board: any) => acc + (board.programs?.length || 0), 0) : 0,
        totalSkills: skillsData.success ? skillsData.data.length : 0,
        totalLeads: leadsData.success ? leadsData.data.length : 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalUniversities: 0,
        totalPrograms: 0,
        totalEnrollments: 0,
        totalContacts: 0,
        totalOpenSchool: 0,
        totalSkills: 0,
        totalLeads: 0
      });
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrateMessage('');
    
    try {
      const response = await fetch('/api/universities/migrate', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setMigrateMessage(`✅ ${data.message}`);
      } else {
        setMigrateMessage(`❌ Migration failed: ${data.error}`);
      }
    } catch (error) {
      setMigrateMessage(`❌ Error: ${error}`);
    } finally {
      setMigrating(false);
    }
  };

  const statCards = [
    { icon: <GraduationCap size={28} />, label: 'Universities', value: stats.totalUniversities, change: '+12%', color: '#3b82f6', bgColor: '#eff6ff', link: '/admin/universities' },
    { icon: <BookOpen size={28} />, label: 'Programs', value: stats.totalPrograms, change: '+8%', color: '#10b981', bgColor: '#f0fdf4', link: '/admin/programs' },
    { icon: <Users size={28} />, label: 'Enrollments', value: stats.totalEnrollments, change: '+23%', color: '#f59e0b', bgColor: '#fffbeb', link: '/admin/enrollments' },
    { icon: <TrendingUp size={28} />, label: 'Contact Messages', value: stats.totalContacts, change: '+15%', color: '#8b5cf6', bgColor: '#faf5ff', link: '/admin/contacts' },
  ];

  return (
    <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', zIndex: 100 }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937', marginBottom: '0.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
      }}>
        <Link
          href="/admin/universities"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Universities</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} color="#3b82f6" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalUniversities}
          </div>
        </Link>

        <Link
          href="/admin/programs"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Programs</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalPrograms}
          </div>
        </Link>

        <Link
          href="/admin/open-school"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Open School Courses</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalOpenSchool}
          </div>
        </Link>

        <Link
          href="/admin/skills"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Skills</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#faf5ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={18} color="#8b5cf6" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalSkills}
          </div>
        </Link>

        <Link
          href="/admin/enrollments"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Enrollments</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#e9d5ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#a855f7" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalEnrollments}
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Contact Messages</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalContacts}
          </div>
        </Link>
        <Link
          href="/admin/leads"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 2vw, 0.75rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#6b7280', fontWeight: 500 }}>Total Leads</span>
            <div style={{ width: 'clamp(28px, 6vw, 32px)', height: 'clamp(28px, 6vw, 32px)', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#16a34a" />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: '#1f2937' }}>
            {stats.totalLeads}
          </div>
        </Link>
      </div>

      {/* Database Management */}
      <div style={{
        background: '#fff',
        borderRadius: 'clamp(8px, 2vw, 12px)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: 500, color: '#1f2937', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
          Database Management
        </h2>
        
        <div style={{ padding: 'clamp(1rem, 3vw, 1.25rem)', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fbbf24', marginBottom: '1rem' }}>
          <p style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: '#92400e', marginBottom: '1rem', lineHeight: 1.6 }}>
            <strong>Database Migration:</strong> Click below to add slugs to existing universities (required for detail pages to work)
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            style={{
              padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
              background: migrating ? '#9ca3af' : '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: migrating ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              transition: 'all 0.2s'
            }}
          >
            {migrating ? 'Migrating...' : 'Run Migration'}
          </button>
          {migrateMessage && (
            <p style={{ marginTop: '1rem', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', color: migrateMessage.includes('✅') ? '#16a34a' : '#dc2626', fontWeight: 500 }}>
              {migrateMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
