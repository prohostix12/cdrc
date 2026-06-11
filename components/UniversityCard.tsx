'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap } from '@/components/Icon';
import { useState } from 'react';

interface UniversityCardProps {
  name: string;
  slug: string;
  accreditation: string;
  programs: string;
  image?: string;
}

export default function UniversityCard({ name, slug, accreditation, programs, image }: UniversityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
      <div 
        style={{
          background: '#fff',
          borderRadius: '1.25rem',
          padding: '2rem',
          boxShadow: isHovered ? '0 12px 40px rgba(30, 64, 175, 0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
          border: `1px solid ${isHovered ? '#1e40af' : 'rgba(30, 64, 175, 0.1)'}`,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* University Icon or Image */}
        {image && image.startsWith('http') ? (
          <div style={{
            width: '100%',
            height: '180px',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            position: 'relative'
          }}>
            <Image 
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 20px rgba(30, 64, 175, 0.25)'
          }}>
            <GraduationCap size={36} color="#fff" />
          </div>
        )}

        {/* University Name */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 500,
          color: '#1e293b',
          marginBottom: '0.75rem',
          lineHeight: 1.3
        }}>
          {name}
        </h3>

        {/* Accreditation Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          width: 'fit-content'
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#1e40af'
          }}>
            {accreditation}
          </span>
        </div>

        {/* Programs Count */}
        <p style={{
          fontSize: '0.95rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          {programs}
        </p>

        {/* View Details Button */}
        {slug && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1e40af',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            View Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        )}
      </div>
    );

  if (!slug) {
    return <div style={{ height: '100%' }}>{cardContent}</div>;
  }

  return (
    <Link href={`/universities/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%', cursor: 'pointer' }}>
      {cardContent}
    </Link>
  );
}
