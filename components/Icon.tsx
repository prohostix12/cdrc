import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number; color?: string };

const base = (size = 28, color = '#1e40af') => ({ width: size, height: size, fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const });

export const GraduationCap = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
  </svg>
);

export const Monitor = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);

export const Building = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M3 21h18M9 21V7l6-4v18M9 7H3v14M15 11h2M15 15h2M9 11H7M9 15H7"/>
  </svg>
);

export const DollarSign = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);

export const Phone = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

export const Award = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

export const Clock = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);

export const CheckCircle = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export const Globe = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

export const Briefcase = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v.01"/>
  </svg>
);

export const BookOpen = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
  </svg>
);

export const Mail = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

export const MapPin = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export const MessageCircle = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

export const TrendingUp = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

export const Users = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

export const Lock = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

export const Eye = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

export const EyeOff = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);


export const Plus = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const Edit = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export const Trash2 = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

export const Search = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

export const ArrowLeft = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

export const ArrowRight = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export const Menu = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export const X = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const LogOut = ({ size, color, ...p }: IconProps) => (
  <svg {...base(size, color)} viewBox="0 0 24 24" {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
