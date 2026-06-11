'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Users, Clock, Eye, Trash2 } from '@/components/Icon';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the message from ${name}?`)) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Message deleted successfully!');
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
        fetchMessages();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1e40af',
            textDecoration: 'none',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1f2937' }}>
            Contact Messages
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            {messages.length} total messages
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <Mail size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#1e293b', marginBottom: '0.5rem' }}>
              No messages yet
            </h2>
            <p style={{ color: '#64748b' }}>
              Contact form submissions will appear here
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1.5fr' : '1fr', gap: '2rem' }}>
            {/* Messages List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    boxShadow: selectedMessage?._id === msg._id 
                      ? '0 4px 20px rgba(30, 64, 175, 0.15)' 
                      : '0 4px 20px rgba(0,0,0,0.08)',
                    border: selectedMessage?._id === msg._id 
                      ? '2px solid #1e40af' 
                      : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedMessage?._id !== msg._id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedMessage?._id !== msg._id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#fff',
                      fontWeight: 500,
                      fontSize: '1.25rem'
                    }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 500, 
                        color: '#1e293b',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {msg.name}
                      </h3>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#64748b',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  
                  {msg.subject && (
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: 600, 
                      color: '#1e293b',
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {msg.subject}
                    </p>
                  )}
                  
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#64748b',
                    marginBottom: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {msg.message}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #e2e8f0',
                    marginTop: '0.75rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      fontSize: '0.75rem',
                      color: '#94a3b8'
                    }}>
                      <Clock size={14} />
                      {formatDate(msg.createdAt)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(msg);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          background: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#1e40af';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#dbeafe';
                          e.currentTarget.style.color = '#1e40af';
                        }}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg._id, msg.name);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#dc2626';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fee2e2';
                          e.currentTarget.style.color = '#dc2626';
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            {selectedMessage && (
              <div style={{
                background: '#fff',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '2rem',
                maxHeight: 'calc(100vh - 4rem)',
                overflow: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#1e293b' }}>
                    Message Details
                  </h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#f1f5f9',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Close
                  </button>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Users size={20} color="#1e40af" />
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Name</p>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>{selectedMessage.name}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Mail size={20} color="#1e40af" />
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Email</p>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        style={{ fontSize: '1rem', fontWeight: 600, color: '#1e40af', textDecoration: 'none' }}
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {selectedMessage.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <Phone size={20} color="#1e40af" />
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Phone</p>
                        <a 
                          href={`tel:${selectedMessage.phone}`}
                          style={{ fontSize: '1rem', fontWeight: 600, color: '#1e40af', textDecoration: 'none' }}
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Clock size={20} color="#1e40af" />
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Received</p>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedMessage.subject && (
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Subject</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1e293b' }}>
                      {selectedMessage.subject}
                    </p>
                  </div>
                )}

                <div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Message</p>
                  <div style={{
                    padding: '1.5rem',
                    background: '#f8fafc',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: '#1e293b', 
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
