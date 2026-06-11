'use client';

import { useState, useEffect } from 'react';

interface AptitudeResult {
  _id: string;
  sessionId: string;
  scores: Record<string, number>;
  topCategory: string;
  answers: { questionId: number; optionIndex: number; categories: string[] }[];
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  TECH:   { label: 'Technology',   icon: '💻', color: '#3b82f6' },
  BIZ:    { label: 'Business',     icon: '📊', color: '#10b981' },
  HEALTH: { label: 'Healthcare',   icon: '🏥', color: '#ef4444' },
  ARTS:   { label: 'Arts & Design',icon: '🎨', color: '#f59e0b' },
  SCI:    { label: 'Science',      icon: '🔬', color: '#8b5cf6' },
  EDU:    { label: 'Education',    icon: '📖', color: '#06b6d4' },
};

export default function AptitudeAdminPage() {
  const [results, setResults] = useState<AptitudeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('ALL');

  useEffect(() => {
    fetch('/api/aptitude-test/result')
      .then(r => r.json())
      .then(d => { setResults(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = results.filter(r => {
    const matchesCat = filterCat === 'ALL' || r.topCategory === filterCat;
    const matchesSearch = !search || r.sessionId?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Category distribution counts
  const catCounts = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.topCategory] = (acc[r.topCategory] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>
          🎓 Aptitude Test Results
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>
          {results.length} total submissions — career interest analytics
        </p>
      </div>

      {/* Category summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {Object.entries(CATEGORY_LABELS).map(([cat, meta]) => (
          <div key={cat} style={{
            background: '#fff', borderRadius: '1rem', padding: '1.25rem',
            border: `2px solid ${filterCat === cat ? meta.color : '#e2e8f0'}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onClick={() => setFilterCat(filterCat === cat ? 'ALL' : cat)}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{meta.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', color: meta.color }}>
              {catCounts[cat] || 0}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{meta.label}</div>
          </div>
        ))}
        <div style={{
          background: '#fff', borderRadius: '1rem', padding: '1.25rem',
          border: `2px solid ${filterCat === 'ALL' ? '#7c3aed' : '#e2e8f0'}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
          onClick={() => setFilterCat('ALL')}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>📋</div>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#7c3aed' }}>{results.length}</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>All Results</div>
        </div>
      </div>

      {/* Search & filter bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by session ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: '200px', padding: '0.65rem 1rem',
            border: '1px solid #e2e8f0', borderRadius: '0.75rem',
            fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
            background: '#fff',
          }}
        />
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          style={{
            padding: '0.65rem 1rem', border: '1px solid #e2e8f0',
            borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none',
            fontFamily: 'inherit', background: '#fff', cursor: 'pointer',
          }}
        >
          <option value="ALL">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([cat, meta]) => (
            <option key={cat} value={cat}>{meta.icon} {meta.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading results…</div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '3rem', background: '#fff',
          borderRadius: '1rem', border: '1px solid #e2e8f0', color: '#94a3b8',
        }}>
          No results found.
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {['#', 'Session ID', 'Top Career', 'Score Breakdown', 'Answers', 'Date'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const meta = CATEGORY_LABELS[r.topCategory];
                return (
                  <tr key={r._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '0.9rem 1rem', color: '#94a3b8' }}>{i + 1}</td>
                    <td style={{ padding: '0.9rem 1rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#475569' }}>
                      {r.sessionId?.slice(0, 22) || '—'}
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        padding: '0.3rem 0.75rem',
                        background: `${meta?.color || '#94a3b8'}18`,
                        color: meta?.color || '#64748b',
                        borderRadius: '999px', fontWeight: 700, fontSize: '0.82rem',
                        border: `1px solid ${meta?.color || '#94a3b8'}30`,
                      }}>
                        {meta?.icon} {meta?.label || r.topCategory}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {Object.entries(r.scores || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([cat, score]) => (
                          <span key={cat} style={{
                            fontSize: '0.75rem', padding: '0.15rem 0.5rem',
                            background: '#f1f5f9', borderRadius: '999px', color: '#475569',
                          }}>
                            {CATEGORY_LABELS[cat]?.icon || cat} {score}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: '#64748b' }}>
                      {r.answers?.length || 0} / 10
                    </td>
                    <td style={{ padding: '0.9rem 1rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
