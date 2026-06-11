'use client';
import { useEffect, useState } from 'react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 w-11 h-11 bg-blue-800 text-white border-none rounded-full cursor-pointer text-lg shadow-lg z-50 flex items-center justify-center hover:bg-blue-900 transition-colors">
      ↑
    </button>
  );
}
