'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Users, BookOpen, TrendingUp, Menu, X, Award, Mail, LogOut, Globe, Search } from '@/components/Icon';

const menuItems = [
  { icon: <TrendingUp size={22} />, label: 'Dashboard', href: '/admin' },
  { icon: <GraduationCap size={22} />, label: 'Universities', href: '/admin/universities' },
  { icon: <Award size={22} />, label: 'Open School', href: '/admin/open-school' },
  { icon: <BookOpen size={22} />, label: 'Programs', href: '/admin/programs' },
  { icon: <Users size={22} />, label: 'Skills', href: '/admin/skills' },
  { icon: <Search size={22} />, label: 'Course Finder', href: '/admin/course-finder' },
  { icon: <Globe size={22} />, label: 'Suggest University', href: '/admin/suggest-university' },
  { icon: <Users size={22} />, label: 'Enrollments', href: '/admin/enrollments' },
  { icon: <Mail size={22} />, label: 'Contact Messages', href: '/admin/contacts' },
  { icon: <Globe size={22} />, label: 'SEO Settings', href: '/admin/seo' },
  { icon: <Users size={22} />, label: 'Leads', href: '/admin/leads' },
  { icon: <BookOpen size={22} />, label: 'Aptitude Results', href: '/admin/aptitude' },
];

export default function AdminLayout({ children }: { children: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/login');
  };

  if (isChecking) {
    return (
      <>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc'
        }}>
          <div style={{
            display: 'inline-block',
            width: '50px',
            height: '50px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #1e40af',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-header {
            display: flex !important;
            z-index: 30 !important;
          }
          
          .sidebar {
            transform: translateX(${isMobileMenuOpen ? '0' : '-100%'});
            z-index: 25 !important;
          }
          
          .main-content {
            margin-left: 0 !important;
            padding-top: 64px !important;
            z-index: 20 !important;
            position: relative !important;
          }
          
          .mobile-overlay {
            display: ${isMobileMenuOpen ? 'block' : 'none'} !important;
            z-index: 15 !important;
          }
        }
        
        @media (min-width: 769px) {
          .main-content {
            z-index: 20 !important;
            position: relative !important;
          }
          
          .sidebar {
            z-index: 10 !important;
          }
        }
        
        /* Ensure all page headers have higher z-index */
        .main-content > * {
          position: relative;
          z-index: 21;
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
        {/* Mobile Header */}
        <div className="mobile-header" style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#fff',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 30
        }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1.25rem'
              }}>
                C
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>CDRC Admin</div>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Overlay for mobile */}
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 15
          }}
        />

        {/* Sidebar */}
        <aside className="sidebar" style={{
          width: '280px',
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          color: '#fff',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
          left: 0,
          top: 0
        }}>
          {/* Logo */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Link href="/admin" style={{ textDecoration: 'none', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                }}>
                  C
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 }}>CDRC</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 500 }}>Admin Panel</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav style={{ padding: '1rem 0', flex: 1 }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.6rem 1.25rem',
                    margin: '0.1rem 0.75rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    }
                  }}
                >
                  <div style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</div>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div style={{
            padding: '1rem 1.5rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            marginTop: 'auto'
          }}>

            <Link
              href="/"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                marginBottom: '0.5rem'
              }}
            >
              <Globe size={18} />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                color: '#fca5a5',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#fca5a5'; }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content" style={{
          marginLeft: '280px',
          flex: 1,
          minHeight: '100vh',
          position: 'relative',
          zIndex: 20
        }}>
          {children}
        </main>
      </div>
    </>
  );
}
