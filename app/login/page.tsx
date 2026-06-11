'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from '@/components/Icon';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password.trim()) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Redirect to admin panel
        router.push('/admin');
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 15s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        animation: 'float 12s ease-in-out infinite reverse'
      }} />

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '450px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        padding: '3rem 2.5rem',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        {/* Logo Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 30px rgba(30, 64, 175, 0.4)',
            transform: 'rotate(-5deg)',
            transition: 'transform 0.3s'
          }}>
            <span style={{
              color: '#fff',
              fontSize: '2.5rem',
              fontWeight: 600,
              transform: 'rotate(5deg)'
            }}>C</span>
          </div>
          
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 600,
            color: '#1a202c',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>Welcome Back</h1>
          
          <p style={{
            color: '#718096',
            fontSize: '0.95rem',
            fontWeight: 500
          }}>Sign in to CDRC Admin Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Login Error Message */}
          {loginError && (
            <div style={{
              padding: '1rem',
              background: '#fed7d7',
              border: '1px solid #fc8181',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              color: '#c53030',
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              {loginError}
            </div>
          )}
          
          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2d3748',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Enter your email here"
                value={form.email}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                onChange={e => {
                  setForm(p => ({ ...p, email: e.target.value.trim() }));
                  setErrors(p => ({ ...p, email: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.75rem',
                  border: `2px solid ${errors.email ? '#fc8181' : '#e2e8f0'}`,
                  borderRadius: '0.75rem',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#fff',
                  color: '#2d3748'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.email ? '#fc8181' : '#1e40af';
                  e.target.style.boxShadow = `0 0 0 3px ${errors.email ? 'rgba(252, 129, 129, 0.1)' : 'rgba(30, 64, 175, 0.1)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? '#fc8181' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            {errors.email && (
              <p style={{
                color: '#e53e3e',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                fontWeight: 500
              }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2d3748',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0aec0',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                onChange={e => {
                  setForm(p => ({ ...p, password: e.target.value.trim() }));
                  setErrors(p => ({ ...p, password: '' }));
                }}
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 2.75rem',
                  border: `2px solid ${errors.password ? '#fc8181' : '#e2e8f0'}`,
                  borderRadius: '0.75rem',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#fff',
                  color: '#2d3748'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.password ? '#fc8181' : '#1e40af';
                  e.target.style.boxShadow = `0 0 0 3px ${errors.password ? 'rgba(252, 129, 129, 0.1)' : 'rgba(30, 64, 175, 0.1)'}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? '#fc8181' : '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#a0aec0',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1e40af'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p style={{
                color: '#e53e3e',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                fontWeight: 500
              }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#4a5568',
              fontWeight: 500
            }}>
              <input
                type="checkbox"
                style={{
                  width: 18,
                  height: 18,
                  cursor: 'pointer',
                  accentColor: '#1e40af'
                }}
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              style={{
                fontSize: '0.875rem',
                color: '#1e40af',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e3a8a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1e40af'}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              color: '#fff',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: 500,
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s',
              boxShadow: '0 10px 25px rgba(30, 64, 175, 0.4)',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(30, 64, 175, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(30, 64, 175, 0.4)';
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: 16,
                  height: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite'
                }} />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Footer Links */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#a0aec0',
              fontSize: '0.875rem',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1e40af'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
          >
            <span style={{ fontSize: '1.1rem' }}>←</span> Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -20px); }
        }
      `}</style>
    </div>
  );
}
