import React, { useState } from 'react';
import AirQualityCard from './components/AirQualityCard';
import PollutantDetails from './components/PollutantDetails';
import LocationSearch from './components/LocationSearch';
import { AirPollutionData } from './types/airPollution';
import { getKoreaAirQuality } from './services/airPollutionService';
import './App.css';

const App: React.FC = () => {
  const [airPollutionList, setAirPollutionList] = useState<AirPollutionData[] | null>(null);
  const [selectedStation, setSelectedStation] = useState<AirPollutionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRegion, setCurrentRegion] = useState<string>('');

  const handleRegionSelect = async (regionName: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedStation(null);
    setCurrentRegion(regionName);
    try {
      const list = await getKoreaAirQuality(regionName);
      setAirPollutionList(list);
      if (list && list.length > 0) {
        setSelectedStation(list[0]);
      } else {
        setSelectedStation(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 가져오는 중 오류가 발생했습니다.');
      setAirPollutionList(null);
      setSelectedStation(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStationSelect = (stationName: string) => {
    if (!airPollutionList) return;
    const found = airPollutionList.find(item => item.stationName === stationName);
    setSelectedStation(found || null);
  };

  const handleRetry = () => {
    if (currentRegion) {
      handleRegionSelect(currentRegion);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">🌤️ 대기질 정보 (공공데이터포털)</h1>
          <p className="app-subtitle">시/도명을 검색하여 실시간 대기오염 정보를 확인하세요</p>
        </header>

        <main className="app-main">
          <LocationSearch
            onLocationSelect={handleRegionSelect}
            currentLocation={currentRegion}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">데이터를 가져오는 중...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">오류가 발생했습니다</h3>
              <p className="error-message">{error}</p>
              <button onClick={handleRetry} className="retry-button">
                다시 시도
              </button>
            </div>
          )}

          {airPollutionList && airPollutionList.length > 0 && !isLoading && !error && (
            <>
              <div className="station-selector">
                <label htmlFor="station-select">측정소(구/군) 선택: </label>
                <select
                  id="station-select"
                  value={selectedStation?.stationName || ''}
                  onChange={e => handleStationSelect(e.target.value)}
                >
                  {airPollutionList.map(station => (
                    <option key={station.stationName} value={station.stationName}>
                      {station.stationName}
                    </option>
                  ))}
                </select>
              </div>

              {selectedStation ? (
                <>
                  <AirQualityCard
                    data={selectedStation}
                    location={`${currentRegion} (${selectedStation.stationName})`}
                  />
                  <PollutantDetails data={selectedStation} />
                </>
              ) : (
                <div className="welcome-container">
                  <div className="welcome-icon">🌍</div>
                  <h2 className="welcome-title">측정소 데이터가 없습니다</h2>
                  <p className="welcome-message">
                    해당 지역에 대기질 데이터가 없습니다. 다른 시/도를 선택해보세요.
                  </p>
                </div>
              )}
            </>
          )}

          {(!airPollutionList || airPollutionList.length === 0) && !isLoading && !error && (
            <div className="welcome-container">
              <div className="welcome-icon">🌍</div>
              <h2 className="welcome-title">대기질 정보를 확인해보세요</h2>
              <p className="welcome-message">
                시/도명을 검색하거나 인기 시/도를 선택하여 실시간 대기질 정보를 확인할 수 있습니다.
              </p>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p className="footer-text">
            데이터 제공: <a href="https://www.data.go.kr/" target="_blank" rel="noopener noreferrer">공공데이터포털</a>
          </p>
          <p className="footer-disclaimer">
            이 정보는 참고용이며, 정확한 건강 관련 조언은 전문의와 상담하세요.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App; 