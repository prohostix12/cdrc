'use client';

import { Trash2, X } from './Icon';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isLoading = false
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .confirm-modal-content {
          animation: modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      
      <div 
        className="confirm-modal-content"
        style={{
          backgroundColor: '#fff',
          borderRadius: '1.25rem',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        {!isLoading && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          >
            <X size={18} />
          </button>
        )}

        {/* Content */}
        <div style={{ padding: '2.5rem 2rem' }}>
          {/* Icon Header */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '1.25rem',
            backgroundColor: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            margin: '0 auto 1.5rem auto'
          }}>
            <Trash2 size={32} color="#dc2626" />
          </div>

          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#1e293b',
            margin: '0 0 0.75rem 0',
            textAlign: 'center'
          }}>
            {title}
          </h3>
          
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: '1.6',
            margin: 0,
            textAlign: 'center'
          }}>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div style={{
          padding: '1.5rem 2rem 2.5rem 2rem',
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            disabled={isLoading}
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.875rem',
              borderRadius: '1rem',
              border: '1.5px solid #e2e8f0',
              backgroundColor: '#fff',
              color: '#475569',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#fff')}
          >
            {cancelLabel}
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '0.875rem',
              borderRadius: '1rem',
              border: 'none',
              backgroundColor: isLoading ? '#f87171' : '#dc2626',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#b91c1c')}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#dc2626')}
          >
            {isLoading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
