import React from 'react';

interface BudgetInputProps {
  budget: number;
  onChange: (value: number) => void;
}

const BudgetInput: React.FC<BudgetInputProps> = ({ budget, onChange }) => {
  return (
    <div>
      <h3>예산 입력</h3>
      <input
        type="number"
        min={0}
        value={budget}
        onChange={e => onChange(Number(e.target.value))}
        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '120px' }}
        placeholder="예산(원)"
      />
    </div>
  );
};

export default BudgetInput; 