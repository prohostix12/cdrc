'use client';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faqData } from '@/lib/data';

interface Message { role: 'bot' | 'user'; text: string; suggestions?: string[]; timestamp: Date; }

function getBotResponse(msg: string): { text: string; suggestions: string[] } {
  const lower = msg.toLowerCase();
  for (const [key, data] of Object.entries(faqData)) {
    if (lower.includes(key)) return { text: data.response, suggestions: data.suggestions };
  }
  if (lower.includes('mba') || lower.includes('bba') || lower.includes('bca') || lower.includes('program'))
    return getBotResponse('top universities');
  if (lower.includes('cost') || lower.includes('price') || lower.includes('fee'))
    return getBotResponse('fees');
  if (lower.includes('apply') || lower.includes('enroll') || lower.includes('join'))
    return getBotResponse('admission');
  if (lower.includes('phone') || lower.includes('email') || lower.includes('address'))
    return getBotResponse('contact');
  if (lower.includes('university') || lower.includes('college'))
    return getBotResponse('top universities');
  if (lower.includes('class 10') || lower.includes('class 12') || lower.includes('sslc'))
    return getBotResponse('open school');
  return {
    text: "I'm here to help! I can provide information about:\n\n• Online Degree Programs\n• Open Schooling (SSLC & Plus Two)\n• Admission Process\n• Fee Structure\n• University Partners\n• Contact Information\n\nWhat would you like to know?",
    suggestions: ['online degrees', 'open school', 'fees', 'admission', 'contact'],
  };
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const sessionId = useRef(uuidv4());
  const startedAt = useRef(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'bot', text: "Hi! 👋 I'm your CDRC assistant. I can help you with:",
      suggestions: ['Online Degrees', 'Open Schooling', 'Fee Structure', 'Admission Process'],
      timestamp: new Date(),
    }]);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg, timestamp: new Date() }]);
    setInput('');
    setTimeout(() => {
      const resp = getBotResponse(msg);
      setMessages(prev => [...prev, { role: 'bot', text: resp.text, suggestions: resp.suggestions, timestamp: new Date() }]);
    }, 400);
  }

  function handleClose() {
    setOpen(false);
    if (messages.length > 1) {
      fetch('/api/chat-sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId.current, messages, startedAt: startedAt.current }),
      }).catch(() => {});
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button 
        onClick={() => open ? handleClose() : setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(30, 64, 175, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          zIndex: 50,
          transition: 'all 0.3s ease',
          fontFamily: '"Poppins", sans-serif'
        }}
        onMouseEnter={(e: any) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 64, 175, 0.5)';
        }}
        onMouseLeave={(e: any) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 175, 0.4)';
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat window */}
      {open && (
        <div 
          className="animate-slideUp chatbot-window"
          style={{
            position: 'fixed',
            bottom: '6.5rem',
            right: '1.5rem',
            width: 'min(420px, calc(100vw - 2rem))',
            height: 'min(600px, calc(100vh - 8rem))',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '1.25rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50,
            overflow: 'hidden',
            fontFamily: '"Poppins", sans-serif'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                💬
              </div>
              <div>
                <div style={{ 
                  color: '#fff', 
                  fontWeight: 500, 
                  fontSize: '1rem',
                  letterSpacing: '-0.01em'
                }}>
                  CDRC Assistant
                </div>
                <div style={{ 
                  color: 'rgba(255,255,255,0.85)', 
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  marginTop: '0.125rem'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    background: '#4ade80',
                    borderRadius: '50%',
                    display: 'inline-block',
                    boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
                  }} />
                  Online
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                fontWeight: 300,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            background: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((m, i) => (
              <div 
                key={i} 
                className="animate-messageSlide"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '0.875rem 1.125rem',
                  borderRadius: m.role === 'user' ? '1.125rem 1.125rem 0.25rem 1.125rem' : '1.125rem 1.125rem 1.125rem 0.25rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                  background: m.role === 'user' 
                    ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' 
                    : '#fff',
                  color: m.role === 'user' ? '#fff' : '#1f2937',
                  border: m.role === 'user' ? 'none' : '1px solid #e5e7eb',
                  boxShadow: m.role === 'user' 
                    ? '0 4px 12px rgba(30, 64, 175, 0.25)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}>
                  {m.text}
                </div>
                {m.suggestions && m.suggestions.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginTop: '0.625rem',
                    maxWidth: '90%'
                  }}>
                    {m.suggestions.map(s => (
                      <button 
                        key={s} 
                        onClick={() => sendMessage(s)}
                        style={{
                          background: '#fff',
                          border: '1px solid #e5e7eb',
                          color: '#1e40af',
                          padding: '0.5rem 1rem',
                          borderRadius: '1.5rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e: any) => {
                          e.currentTarget.style.background = '#eff6ff';
                          e.currentTarget.style.borderColor = '#3b82f6';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e: any) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '1.25rem',
            background: '#fff',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '0.625rem'
          }}>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '0.875rem 1.25rem',
                border: '1px solid #e5e7eb',
                borderRadius: '1.5rem',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#f9fafb',
                transition: 'all 0.2s ease',
                fontFamily: '"Poppins", sans-serif'
              }}
              onFocus={(e: any) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e: any) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button 
              onClick={() => sendMessage()}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: '#fff',
                border: 'none',
                padding: '0 1.25rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '1.125rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                minWidth: '52px'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.35)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.25)';
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
