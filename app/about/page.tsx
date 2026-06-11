'use client';
import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { GraduationCap, Award, Globe, Briefcase, ArrowRight, Clock, Monitor, CheckCircle, BookOpen } from '@/components/Icon';

const RB = '#1a237e';   // royal blue dark
const RBM = '#283593';  // royal blue mid
const RBL = '#3949ab';  // royal blue light
const RBA = '#5c6bc0';  // royal blue accent

const services = [
  { icon: <Clock size={28} color="#fff" />, title: '24 Hours Support', desc: 'Our dedicated team is available round the clock to assist you with any queries, no matter the time of day.' },
  { icon: <GraduationCap size={28} color="#fff" />, title: 'University Admissions', desc: 'Expert guidance for enrolling in 14+ UGC-approved universities with the right program for your goals.' },
  { icon: <Monitor size={28} color="#fff" />, title: 'Our Management', desc: 'Our management team comprises experienced education leaders dedicated to driving student excellence.' },
];

export default function AboutPage() {
  return (
    <div style={{ background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: 720, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0a102b' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80"
          alt="About CDCR"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(67,97,238,0.5) 100%)' }} />
        
        {/* Dot grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '14rem 2rem 10rem', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 500 }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              <span style={{ color: '#93c5fd' }}>About Us</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.05, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                About <span style={{ color: '#90e0ef' }}>Us</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 650, lineHeight: 1.7 }}>
                Kerala&apos;s most trusted education consultancy, helping thousands of students <br/> achieve their academic dreams since 2014.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom fade into page bg */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, #fff)', pointerEvents: 'none' }} />
      </section>

      {/* ── 2. ABOUT US — left image, right text ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <AnimateOnScroll animation="slideRight">
            <div style={{ borderRadius: '1rem', overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
              <Image src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80" alt="CDRC team" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideLeft">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: '0.75rem' }}>
                <span style={{ color: RBL, fontSize: '0.82rem', fontWeight: 500 }}>About Us</span>
                <span style={{ color: RBL }}>›</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 600, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                Your Gateway to<br />Quality Online Education
              </h2>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '1rem' }}>
                CDRC — Centre for Distance and Remote Courses — is Kerala's most trusted education consultancy, headquartered in Kanhangad, Kasargod. Since 2014, we have been helping students across India access UGC-approved online degree programs from top NAAC-accredited universities.
              </p>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '2rem' }}>
                We offer expert counselling, seamless admission support, and end-to-end guidance for 500+ programs across 14+ partner universities. Our degrees are fully recognized for government jobs, higher studies, and international careers through WES evaluation.
              </p>
              <Link href="/universities" style={{
                display: 'inline-block', padding: '0.75rem 1.75rem',
                background: RBL, color: '#fff', borderRadius: 8,
                fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem',
                boxShadow: `0 4px 16px ${RBL}40`,
              }}>Read Details</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 4. SERVICES — light grey, centered, 3 icon circles ── */}
      <section style={{ padding: '5rem 2rem', background: '#f4f6fb' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: '0.5rem' }}>
                <span style={{ color: RBL, fontSize: '0.82rem', fontWeight: 500 }}>Why Choose Us</span>
                <span style={{ color: RBL }}>›</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Our Services</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                We provide comprehensive education consultancy services to help students achieve their academic and career goals across India and internationally.
              </p>
            </div>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {services.map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 100}>
                <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${RBL}, ${RBA})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: `0 6px 20px ${RBL}35` }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.6rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MISSION — dark royal blue rounded card, left text + right image ── */}
      <section style={{ padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{
              background: `linear-gradient(135deg, ${RB} 0%, ${RBM} 100%)`,
              borderRadius: '1.5rem', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              minHeight: 380,
            }} className="about-mission-grid">
              <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: '1rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 500 }}>Our Mission</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>›</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                  Focused on<br />Your Education Journey
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  CDRC is dedicated to making quality higher education accessible to all. We partner with India's top UGC-approved universities to offer flexible online degrees that are fully recognized for government jobs, higher studies, and international careers.
                </p>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#fff', color: RB,
                  padding: '0.75rem 1.6rem', borderRadius: 8,
                  fontWeight: 500, textDecoration: 'none', fontSize: '0.88rem',
                  alignSelf: 'flex-start',
                }}>View More</Link>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                alt="Education journey"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 280 }}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 6. LEADERSHIP — centered, 2 owner cards ── */}
      <section style={{ padding: '5rem 2rem', background: '#f4f6fb' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: '0.5rem' }}>
                <span style={{ color: RBL, fontSize: '0.82rem', fontWeight: 500 }}>Leadership</span>
                <span style={{ color: RBL }}>›</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                The <span style={{ color: RBL }}>Visionaries</span> Behind CDRC
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                Our leadership team is dedicated to empowering students through accessible, high-quality distance education and personalized guidance.
              </p>
            </div>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { 
                name: 'Adv. Nizam Falah', 
                role: 'Director', 
                image: '/Adv Nizam Falah.jpeg',
              },
              { 
                name: 'Muneer A', 
                role: 'Director', 
                image: '/Muneer A.jpeg',
              },
            ].map((owner, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 100}>
                <div style={{ background: '#fff', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <div style={{ position: 'relative', height: 420, width: '100%' }}>
                    <Image src={owner.image} alt={owner.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div style={{ padding: '1.75rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>{owner.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: RBL, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>{owner.role}</div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-mission-grid { grid-template-columns: 1fr !important; }
          .about-mission-grid img { min-height: 220px !important; order: -1; }
        }
      `}</style>

    </div>
  );
}
