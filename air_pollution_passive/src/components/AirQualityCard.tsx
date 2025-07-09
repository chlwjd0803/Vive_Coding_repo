import React from 'react';
import { AirPollutionData } from '../types/airPollution';
import './AirQualityCard.css';

interface AirQualityCardProps {
  data: AirPollutionData;
  location: string;
}

// PM10 등급 기준 (환경부)
const getPm10Level = (value: number) => {
  if (value < 0) return { level: '정보 없음', color: '#ccc' };
  if (value <= 30) return { level: '좋음', color: '#00E400' };
  if (value <= 80) return { level: '보통', color: '#FFFF00' };
  if (value <= 150) return { level: '나쁨', color: '#FF7E00' };
  return { level: '매우 나쁨', color: '#FF0000' };
};

const AirQualityCard: React.FC<AirQualityCardProps> = ({ data, location }) => {
  if (!data) return null;
  const pm10 = data.pm10;
  const pm25 = data.pm25;
  const pm10Info = getPm10Level(pm10);
  const updateTime = data.dataTime || '-';

  return (
    <div className="air-quality-card">
      <div className="card-header">
        <h2 className="location-title">{location}</h2>
        <p className="update-time">업데이트: {updateTime}</p>
      </div>
      <div className="aqi-display">
        <div
          className="aqi-circle"
          style={{ backgroundColor: pm10Info.color, boxShadow: `0 0 20px ${pm10Info.color}40` }}
        >
          <span className="aqi-number">{pm10 >= 0 ? pm10 : '-'}</span>
          <span className="aqi-label">PM10</span>
        </div>
        <div className="aqi-info">
          <h3 className="aqi-level" style={{ color: pm10Info.color }}>{pm10Info.level}</h3>
          <p className="aqi-description">미세먼지(PM10) 기준</p>
          <p className="health-effect">초미세먼지(PM2.5): {pm25 >= 0 ? pm25 : '-'} ㎍/㎥</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard; 