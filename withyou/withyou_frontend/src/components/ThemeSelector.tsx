import React from 'react';

interface ThemeSelectorProps {
  themes: string[];
  selectedTheme: string;
  onSelect: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, onSelect }) => {
  return (
    <div>
      <h3>데이트 테마 선택</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => onSelect(theme)}
            style={{
              background: selectedTheme === theme ? '#ffb6b9' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector; 