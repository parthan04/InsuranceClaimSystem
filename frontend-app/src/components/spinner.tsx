import type { FC } from 'react';

interface BlurredSpinnerProps {
  isLoading: boolean;
  message?: string;
  color?: string;
  size?: number;
  backdropOpacity?: number;
}

export const BlurredSpinner: FC<BlurredSpinnerProps> = ({ 
  isLoading,
  message = 'Loading...',
  color = '#378add',
  size = 60,
  backdropOpacity = 0.4
}) => {
  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `rgba(0, 0, 0, ${backdropOpacity})`,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: size,
              height: size,
              border: `4px solid ${color}33`,
              borderTop: `4px solid ${color}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              background: 'transparent',
            }}
          />
          {message && (
            <p
              style={{
                marginTop: '1rem',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlurredSpinner;