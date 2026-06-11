'use client';
import { useState } from 'react';
import { Search, Globe, Award } from '@/components/Icon';

const ACCENT = '#1e40af';
const ACCENT_LIGHT = '#eff6ff';
const ACCENT_BORDER = '#bfdbfe';

const S: Record<string, React.CSSProperties> = {
  page: { padding: '2rem', fontFamily: "'Poppins', system-ui, sans-serif", minHeight: '100vh', background: '#f8fafc' },
  pageHeader: { marginBottom: 28 },
  pageTitle: { fontSize: '1.6rem', fontWeight: 500, color: '#0f172a', margin: 0 },
  pageSubtitle: { color: '#64748b', fontSize: '0.9rem', marginTop: 4 },
  card: { background: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20, border: '1px solid #f1f5f9' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' },
  cardIcon: { width: 42, height: 42, borderRadius: 11, background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardTitle: { fontWeight: 500, color: '#0f172a', fontSize: '1rem', margin: 0 },
  cardDesc: { color: '#94a3b8', fontSize: '0.78rem', margin: 0 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.1rem' },
  label: { display: 'block', marginBottom: 6, fontWeight: 600, color: '#374151', fontSize: '0.82rem', textTransform: 'uppercase' as const, letterSpacing: '0.04em' },
  input: { width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.92rem', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' as const, fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s' },
  hint: { fontSize: '0.73rem', color: '#94a3b8', marginTop: 5 },
  successAlert: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '14px 18px', borderRadius: 12, marginBottom: 20, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 },
  saveBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', background: `linear-gradient(135deg, ${ACCENT}, #3b82f6)`, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(30,64,175,0.35)', transition: 'all 0.2s' },
};

const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = ACCENT;
  e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}18`;
  e.currentTarget.style.background = '#fff';
};
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = '#e2e8f0';
  e.currentTarget.style.boxShadow = 'none';
  e.currentTarget.style.background = '#f8fafc';
};

function CardHeader({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={S.cardHeader}>
      <div style={S.cardIcon}>{icon}</div>
      <div>
        <p style={S.cardTitle}>{title}</p>
        <p style={S.cardDesc}>{desc}</p>
      </div>
    </div>
  );
}

export default function SeoSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    siteTitle: 'CDRC - Find Your Dream University',
    metaDescription: 'Discover top universities and programs for your education journey.',
    keywords: 'education, universities, colleges, programs, courses',
    author: 'CDRC',
    ogImage: '',
    twitterHandle: '',
    canonicalBase: '',
    robots: 'index, follow',
    googleAnalytics: '',
    googleTagManager: '',
    facebookPixel: '',
    ogTitle: '',
    ogDescription: '',
    structuredDataOrg: 'CDRC',
    structuredDataUrl: '',
    structuredDataLogo: '',
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would POST to an API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = (field: string, placeholder = '') => ({
    value: (form as Record<string, string>)[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(field, e.target.value),
    placeholder, style: S.input, onFocus: focus, onBlur: blur,
  });

  return (
    <div style={S.page}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={S.pageHeader}>
          <h1 style={S.pageTitle}>Global SEO Settings</h1>
          <p style={S.pageSubtitle}>Configure site-wide SEO, meta tags, and analytics integrations</p>
        </div>

        {saved && (
          <div style={S.successAlert}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave}>

          {/* Basic SEO */}
          <div style={S.card}>
            <CardHeader icon={<Search size={18} color="#fff" />} title="Basic SEO" desc="Core meta tags for search engine visibility" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>Website Title</label>
                <input {...inp('siteTitle', 'CDRC - Find Your Dream University')} />
                <p style={S.hint}>The main title tag for your website homepage</p>
              </div>
              <div>
                <label style={S.label}>Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={e => set('metaDescription', e.target.value)}
                  placeholder="Discover top universities and programs for your education journey."
                  rows={3}
                  style={{ ...S.input, resize: 'vertical' as const }}
                  onFocus={focus} onBlur={blur}
                />
                <p style={S.hint}>Ideally between 150–160 characters ({form.metaDescription.length} chars)</p>
              </div>
              <div>
                <label style={S.label}>Keywords</label>
                <input {...inp('keywords', 'education, universities, colleges, programs, courses')} />
                <p style={S.hint}>Comma separated keywords</p>
              </div>
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Author</label>
                  <input {...inp('author', 'CDRC')} />
                </div>
                <div>
                  <label style={S.label}>OG Image URL</label>
                  <input {...inp('ogImage', 'https://example.com/banner.jpg')} />
                  <p style={S.hint}>Default social sharing image (1200×630px)</p>
                </div>
                <div>
                  <label style={S.label}>Canonical Base URL</label>
                  <input {...inp('canonicalBase', 'https://cdrc.edu.in')} />
                </div>
                <div>
                  <label style={S.label}>Robots Meta</label>
                  <select
                    value={form.robots}
                    onChange={e => set('robots', e.target.value)}
                    style={S.input}
                    onFocus={focus as unknown as React.FocusEventHandler<HTMLSelectElement>}
                    onBlur={blur as unknown as React.FocusEventHandler<HTMLSelectElement>}
                  >
                    <option>index, follow</option>
                    <option>noindex, follow</option>
                    <option>index, nofollow</option>
                    <option>noindex, nofollow</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div style={S.card}>
            <CardHeader icon={<Globe size={18} color="#fff" />} title="Open Graph / Social Sharing" desc="Control how your site appears when shared on social media" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>OG Title (overrides site title)</label>
                <input {...inp('ogTitle', 'CDRC – India\'s Trusted Online Education Partner')} />
              </div>
              <div>
                <label style={S.label}>OG Description (overrides meta description)</label>
                <textarea
                  value={form.ogDescription}
                  onChange={e => set('ogDescription', e.target.value)}
                  placeholder="Get UGC-approved degrees from India's top NAAC-accredited universities."
                  rows={2}
                  style={{ ...S.input, resize: 'vertical' as const }}
                  onFocus={focus} onBlur={blur}
                />
              </div>
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>Twitter / X Handle</label>
                  <input {...inp('twitterHandle', '@cdrc_edu')} />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div style={S.card}>
            <CardHeader icon={<Award size={18} color="#fff" />} title="Analytics & Tracking" desc="Connect analytics and marketing tools" />
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Google Analytics ID</label>
                <input {...inp('googleAnalytics', 'G-XXXXXXXXXX')} />
                <p style={S.hint}>e.g., G-XXXXXXXXXX or UA-XXXXXXXX-X</p>
              </div>
              <div>
                <label style={S.label}>Google Tag Manager ID</label>
                <input {...inp('googleTagManager', 'GTM-XXXXXXX')} />
                <p style={S.hint}>e.g., GTM-XXXXXXX</p>
              </div>
              <div>
                <label style={S.label}>Facebook Pixel ID</label>
                <input {...inp('facebookPixel', '123456789012345')} />
              </div>
            </div>
          </div>

          {/* Structured Data */}
          <div style={S.card}>
            <CardHeader icon={<Search size={18} color="#fff" />} title="Structured Data (Schema.org)" desc="Help search engines understand your organization" />
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Organization Name</label>
                <input {...inp('structuredDataOrg', 'CDRC')} />
              </div>
              <div>
                <label style={S.label}>Organization URL</label>
                <input {...inp('structuredDataUrl', 'https://cdrc.edu.in')} />
              </div>
              <div>
                <label style={S.label}>Logo URL</label>
                <input {...inp('structuredDataLogo', 'https://cdrc.edu.in/logo.png')} />
              </div>
            </div>
          </div>

          {/* Save */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 32 }}>
            <button type="submit" style={S.saveBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(30,64,175,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(30,64,175,0.35)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
