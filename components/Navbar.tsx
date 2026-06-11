'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SuggestUniversity from '@/components/SuggestUniversity';

const links = [
  { href: '/home', label: 'Home' },
  { href: '/universities', label: 'Universities' },
  { href: '/open-school', label: 'Open School' },
  { href: '/programs', label: 'Programs' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          padding: 6px 12px;
          font-weight: 500;
          font-size: 0.86rem;
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          font-family: 'Poppins', system-ui, sans-serif;
          white-space: nowrap;
        }
        .nav-link-light { color: rgba(255,255,255,0.85); }
        .nav-link-light:hover { color: #fff; background: rgba(255,255,255,0.12); }
        .nav-link-light.active { color: #fff; background: rgba(255,255,255,0.18); font-weight: 500; }
        .nav-link-dark { color: #475569; }
        .nav-link-dark:hover { color: #1e40af; background: rgba(30,64,175,0.07); }
        .nav-link-dark.active { color: #1e40af; background: rgba(30,64,175,0.09); font-weight: 500; }

        .nav-search {
          padding: 0 1rem 0 2.2rem;
          height: 34px;
          font-size: 0.82rem;
          border-radius: 50px;
          outline: none;
          font-family: 'Poppins', system-ui, sans-serif;
          transition: all 0.3s;
          width: 180px;
        }
        .nav-search-light {
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .nav-search-light::placeholder { color: rgba(255,255,255,0.5); }
        .nav-search-light:focus { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); }
        .nav-search-dark {
          border: 1.5px solid #e2e8f0;
          background: #f1f5f9;
          color: #1e293b;
        }
        .nav-search-dark:focus { border-color: #93c5fd; background: #fff; }

        .btn-find {
          padding: 7px 18px;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.83rem;
          border: none;
          cursor: pointer;
          font-family: 'Poppins', system-ui, sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-find-light {
          background: rgba(255,255,255,0.18);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.35) !important;
        }
        .btn-find-light:hover { background: rgba(255,255,255,0.28); }
        .btn-find-dark {
          background: #4169e1;
          color: #fff;
          box-shadow: 0 2px 10px rgba(65,105,225,0.3);
        }
        .btn-find-dark:hover { background: #2a4db5; transform: translateY(-1px); }

        .btn-login {
          padding: 7px 16px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.83rem;
          text-decoration: none;
          font-family: 'Poppins', system-ui, sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-login-light {
          color: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .btn-login-light:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .btn-login-dark {
          color: #4169e1;
          border: 1.5px solid #bfdbfe;
        }
        .btn-login-dark:hover { background: rgba(65,105,225,0.06); border-color: #93c5fd; }

        @media (max-width: 1024px) {
          #nav-links { display: none !important; }
          #nav-actions { display: none !important; }
          #hamburger { display: flex !important; }
        }
      `}</style>

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0' : '0',
        transition: 'all 0.35s ease',
      }}>
        <header style={{
          maxWidth: '100%',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(226,232,240,0.8)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
          display: 'flex', alignItems: 'center',
          gap: '0.75rem',
          padding: '0 2rem',
          height: 80,
          transition: 'all 0.35s ease',
        }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

            {/* Logo */}
            <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0, marginRight: '0.5rem' }}>
              <img
                src={scrolled ? '/CDRC LOGOpng.png' : '/CDRC LOGO W.png'}
                alt="CDRC Logo"
                style={{ height: 70, width: 'auto', objectFit: 'contain', transition: 'opacity 0.35s' }}
              />
            </Link>

            {/* Nav links */}
            <nav id="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'center' }}>
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${scrolled ? 'nav-link-dark' : 'nav-link-light'}${pathname === link.href ? ' active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div id="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button
                className={`btn-find ${scrolled ? 'btn-find-dark' : 'btn-find-light'}`}
                onClick={() => {
                  const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement;
                  if (btn) btn.click();
                }}
              >
                Find My Course
              </button>
              <button
                className={`btn-find ${scrolled ? 'btn-find-dark' : 'btn-find-light'}`}
                onClick={() => window.dispatchEvent(new Event('openAptitudeTest'))}
                style={scrolled ? { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 2px 10px rgba(124,58,237,0.3)' } : {}}
              >
                🎓 Career Test
              </button>
              <button
                id="suggest-uni-nav-btn"
                onClick={() => setSuggestOpen(true)}
                style={{ padding: '7px 16px', borderRadius: '50px', fontWeight: 500, fontSize: '.83rem', border: scrolled ? '1.5px solid #4361EE' : '1.5px solid rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', background: 'transparent', color: scrolled ? '#4361EE' : '#fff', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = scrolled ? '#eef2ff' : 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                🏛️ Suggest University
              </button>
              <Link
                href="/login"
                className={`btn-login ${scrolled ? 'btn-login-dark' : 'btn-login-light'}${pathname === '/login' ? ' active' : ''}`}
              >
                Login
              </Link>
            </div>

            {/* Hamburger */}
            <button
              id="hamburger"
              onClick={() => setOpen(!open)}
              style={{
                display: 'none', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', gap: 5,
                width: 38, height: 38, marginLeft: 'auto',
                background: scrolled ? 'transparent' : 'rgba(255,255,255,0.1)',
                border: scrolled ? '1.5px solid #e2e8f0' : '1.5px solid rgba(255,255,255,0.3)',
                cursor: 'pointer', borderRadius: '50%', transition: 'all 0.3s',
              }}
            >
              <span style={{ display: 'block', width: 18, height: 2, background: scrolled ? '#1e40af' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: scrolled ? '#1e40af' : '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 2, background: scrolled ? '#1e40af' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        {open && (
          <div style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '1rem 1.25rem 1.25rem',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '10px 14px', borderRadius: 8,
                fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none',
                color: pathname === link.href ? '#4169e1' : '#475569',
                background: pathname === link.href ? 'rgba(65,105,225,0.07)' : 'transparent',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <button className="btn-find btn-find-dark" style={{ flex: 1, minWidth: 120 }}
                onClick={() => { setOpen(false); const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (btn) btn.click(); }}>
                Find My Course
              </button>
              <button className="btn-find btn-find-dark" style={{ flex: 1, minWidth: 120, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 2px 10px rgba(124,58,237,0.3)' }}
                onClick={() => { setOpen(false); window.dispatchEvent(new Event('openAptitudeTest')); }}>
                🎓 Career Test
              </button>
              <button onClick={() => { setOpen(false); setSuggestOpen(true); }}
                style={{ flex: 1, minWidth: 120, padding: '7px 12px', borderRadius: '50px', fontWeight: 500, fontSize: '.83rem', border: '1.5px solid #4361EE', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent', color: '#4361EE' }}>
                🏛️ Suggest Uni
              </button>
              <Link href="/login" onClick={() => setOpen(false)} className="btn-login btn-login-dark" style={{ flex: 1, minWidth: 80, textAlign: 'center' }}>
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
      {suggestOpen && <SuggestUniversity onClose={() => setSuggestOpen(false)} />}
    </>
  );
}
