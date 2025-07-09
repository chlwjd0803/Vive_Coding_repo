import React, { useState } from 'react';
import { POPULAR_CITIES } from '../services/airPollutionService';
import './LocationSearch.css';

interface LocationSearchProps {
  onLocationSelect: (cityName: string) => void;
  currentLocation: string;
  isLoading?: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  currentLocation, 
  isLoading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopularCities, setShowPopularCities] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onLocationSelect(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleCurrentLocation = () => {
    onLocationSelect('current');
  };

  const handlePopularCitySelect = (cityName: string) => {
    onLocationSelect(cityName);
    setShowPopularCities(false);
  };

  return (
    <div className="location-search">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="시/도명을 입력하세요... (예: 서울, 부산, 경기)"
              className="search-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading || !searchTerm.trim()}
            >
              {isLoading ? '검색 중...' : '검색'}
            </button>
          </div>
        </form>
        
        <button
          onClick={handleCurrentLocation}
          className="current-location-button"
          disabled={isLoading}
        >
          📍 현재 위치
        </button>
      </div>

      <div className="popular-cities-section">
        <button
          onClick={() => setShowPopularCities(!showPopularCities)}
          className="popular-cities-toggle"
        >
          {showPopularCities ? '인기 도시 숨기기' : '인기 도시 보기'}
        </button>
        
        {showPopularCities && (
          <div className="popular-cities-grid">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => handlePopularCitySelect(city)}
                className="popular-city-button"
                disabled={isLoading}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentLocation && (
        <div className="current-location-display">
          <span className="current-location-label">현재 위치:</span>
          <span className="current-location-name">{currentLocation}</span>
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 