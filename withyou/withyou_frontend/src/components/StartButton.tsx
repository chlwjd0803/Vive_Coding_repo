import React from 'react';

interface StartButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: '#ffb6b9',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 32px',
        fontSize: '1.1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginTop: '24px',
      }}
    >
      추천 시작하기
    </button>
  );
};

export default StartButton; 