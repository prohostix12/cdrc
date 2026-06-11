'use client';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/ScrollTop';
import { usePathname } from 'next/navigation';

import CourseFinder from '@/components/CourseFinder';
import AptitudeTest from '@/components/AptitudeTest';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {isLoginPage || isAdminPage ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            <main style={{ paddingTop: 0 }}>
              {children}
            </main>
            <Footer />
            <ScrollTop />
            <CourseFinder />
            <AptitudeTest />
          </>
        )}
      </body>
    </html>
  );
}
