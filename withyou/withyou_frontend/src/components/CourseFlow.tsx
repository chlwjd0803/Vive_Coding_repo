import React from 'react';

export interface Place {
  name: string;
  imageUrl: string;
  mapUrl?: string;
}

interface CourseFlowProps {
  places: Place[];
  onRetry: () => void;
}

const CourseFlow: React.FC<CourseFlowProps> = ({ places, onRetry }) => {
  return (
    <div>
      <h3>추천 데이트 코스</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center', margin: '32px 0' }}>
        {places.map((place, idx) => (
          <div key={place.name} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: 8 }}>
              {place.mapUrl ? (
                <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2', textDecoration: 'none' }}>
                  {place.name}
                </a>
              ) : (
                place.name
              )}
            </div>
            {idx < places.length - 1 && (
              <div style={{ fontSize: 32, margin: '16px 0', color: '#aaa' }}>↓</div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onRetry}
        style={{
          background: '#b5ead7',
          color: '#333',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 36px',
          fontSize: '1.1rem',
          cursor: 'pointer',
        }}
      >
        마음에 들지 않아요
      </button>
    </div>
  );
};

export default CourseFlow; 