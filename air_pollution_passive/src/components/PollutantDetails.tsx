import React from 'react';
import { AirPollutionData } from '../types/airPollution';
import './PollutantDetails.css';

interface PollutantDetailsProps {
  data: AirPollutionData;
}

const POLLUTANTS = [
  { key: 'pm10', label: 'PM10', unit: '㎍/㎥', description: '미세먼지(10㎛ 이하)' },
  { key: 'pm25', label: 'PM2.5', unit: '㎍/㎥', description: '초미세먼지(2.5㎛ 이하)' },
  { key: 'o3', label: 'O₃', unit: 'ppm', description: '오존' },
  { key: 'no2', label: 'NO₂', unit: 'ppm', description: '이산화질소' },
  { key: 'so2', label: 'SO₂', unit: 'ppm', description: '아황산가스' },
  { key: 'co', label: 'CO', unit: 'ppm', description: '일산화탄소' },
];

const getLevelColor = (key: string, value: number) => {
  if (value < 0) return '#ccc';
  if (key === 'pm10') {
    if (value <= 30) return '#00E400';
    if (value <= 80) return '#FFFF00';
    if (value <= 150) return '#FF7E00';
    return '#FF0000';
  }
  if (key === 'pm25') {
    if (value <= 15) return '#00E400';
    if (value <= 35) return '#FFFF00';
    if (value <= 75) return '#FF7E00';
    return '#FF0000';
  }
  return '#666';
};

const PollutantDetails: React.FC<PollutantDetailsProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="pollutant-details">
      <h3 className="details-title">대기오염 성분 상세</h3>
      <div className="pollutants-grid">
        {POLLUTANTS.map(({ key, label, unit, description }) => {
          const value = (data as any)[key] as number;
          const color = getLevelColor(key, value);
          return (
            <div key={key} className="pollutant-item">
              <div className="pollutant-header">
                <h4 className="pollutant-name">{label}</h4>
                <span className="pollutant-value" style={{ color }}>
                  {value >= 0 ? value : '-'}
                </span>
                <span className="pollutant-unit">{unit}</span>
              </div>
              <div className="pollutant-bar">
                <div
                  className="pollutant-bar-fill"
                  style={{
                    width: value >= 0 ? `${Math.min((value / 200) * 100, 100)}%` : '0%',
                    backgroundColor: color,
                  }}
                />
              </div>
              <p className="pollutant-description">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollutantDetails; 