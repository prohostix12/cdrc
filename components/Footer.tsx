'use client';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://wa.me/919846446055', label: 'WhatsApp', bg: 'bg-green-500',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  },
  {
    href: 'https://www.instagram.com/cdrc_india/', label: 'Instagram', bg: 'bg-pink-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  },
  {
    href: '#', label: 'Facebook', bg: 'bg-blue-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  },
  {
    href: '#', label: 'LinkedIn', bg: 'bg-blue-700',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  },
  {
    href: '#', label: 'YouTube', bg: 'bg-red-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
  },
];

export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af 100%)', 
      color: '#fff', 
      padding: '4rem 2rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', 
          top: '20%', 
          right: '10%', 
          width: '200px', 
          height: '200px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '50%', 
          filter: 'blur(40px)'
        }} />
        <div style={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '15%', 
          width: '150px', 
          height: '150px', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '50%', 
          filter: 'blur(30px)'
        }} />
      </div>
      
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '2.5rem', 
          marginBottom: '2.5rem' 
        }}
        className="footer-grid">

          {/* About CDRC */}
          <div>
            <h4 style={{ 
              color: '#fff', 
              fontWeight: 500, 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>About CDRC</h4>
            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '0.9rem', 
              lineHeight: 1.7, 
              marginBottom: '1.5rem',
              textShadow: '0 1px 5px rgba(0,0,0,0.2)'
            }}>
              Career Development & Research Centre provides quality online education through UGC-approved universities and open schooling programs.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              color: '#fff', 
              fontWeight: 500, 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>Quick Links</h4>
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/universities', label: 'Universities' },
              { href: '/open-school', label: 'Open School' },
              { href: '/programs', label: 'Programs' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ 
                display: 'block', 
                color: 'rgba(255,255,255,0.9)', 
                textDecoration: 'none', 
                marginBottom: '0.75rem', 
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              color: '#fff', 
              fontWeight: 500, 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>✉️</span>
                <span style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: '0.9rem',
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}>info@cdrc.edu.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>📞</span>
                <span style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: '0.9rem',
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}>0467-2211200</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>📱</span>
                <span style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: '0.9rem',
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}>+91 9846446055</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>📍</span>
                <span style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: '0.9rem', 
                  lineHeight: 1.6,
                  textShadow: '0 1px 5px rgba(0,0,0,0.2)'
                }}>
                  City Centre Building, 2nd Floor<br/>
                  Kanhangad, Kasargod<br/>
                  Kerala - 671315
                </span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h4 style={{ 
              color: '#fff', 
              fontWeight: 500, 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>Office Hours</h4>
            <div style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '0.9rem', 
              marginBottom: '1rem',
              textShadow: '0 1px 5px rgba(0,0,0,0.2)'
            }}>
              <div style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Monday - Saturday</div>
              <div style={{ marginBottom: '1rem' }}>9:30 AM - 5:30 PM</div>
              <div style={{ marginBottom: '1.5rem' }}>Sunday: Closed</div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <span style={{ color: '#fff', fontSize: '1.5rem' }}>💬</span>
              <span style={{ 
                color: '#fff', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}>24/7 Online Support Available</span>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.2)', 
          paddingTop: '2rem', 
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '0.9rem', 
            margin: 0,
            textShadow: '0 1px 5px rgba(0,0,0,0.2)'
          }}>
            © 2025 CDRC - Career Development & Research Centre. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
