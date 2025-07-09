import React from 'react';

interface FoodSelectorProps {
  foods: string[];
  selectedFood: string;
  onSelect: (food: string) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ foods, selectedFood, onSelect }) => {
  return (
    <div>
      <h3>음식 취향 선택</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        {foods.map((food) => (
          <button
            key={food}
            onClick={() => onSelect(food)}
            style={{
              background: selectedFood === food ? '#b5ead7' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodSelector; 