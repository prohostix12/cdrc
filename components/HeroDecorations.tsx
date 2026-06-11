import React from 'react';

export const DotGrid = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={className} style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 8px)',
    gridTemplateRows: 'repeat(5, 8px)',
    gap: '12px',
    opacity: 0.3,
    ...style
  }}>
    {Array.from({ length: 25 }).map((_, i) => (
      <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
    ))}
  </div>
);

export const PlusSymbol = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{
    position: 'absolute',
    color: 'rgba(255,255,255,0.2)',
    fontSize: '24px',
    fontWeight: 300,
    ...style
  }}>+</div>
);
