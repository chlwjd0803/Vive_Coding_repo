import React, { useState } from 'react';
import FoodSelector from './components/FoodSelector';
import StartButton from './components/StartButton';

const REGIONS = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
];

const HOTPLACES: { [region: string]: { name: string; lat: number; lng: number }[] } = {
  '서울특별시': [
    { name: '성수동', lat: 37.544617, lng: 127.055961 },
    { name: '홍대', lat: 37.556318, lng: 126.922651 },
    { name: '신촌', lat: 37.555134, lng: 126.936893 },
    { name: '강남', lat: 37.497942, lng: 127.027621 },
    { name: '잠실', lat: 37.513272, lng: 127.100197 },
    { name: '이태원', lat: 37.534508, lng: 126.994965 },
    { name: '종로', lat: 37.570377, lng: 126.983068 },
    { name: '명동', lat: 37.563757, lng: 126.982677 },
    { name: '여의도', lat: 37.521857, lng: 126.924426 },
    { name: '건대입구', lat: 37.540408, lng: 127.069913 },
  ],
  '부산광역시': [
    { name: '해운대', lat: 35.163222, lng: 129.163222 },
    { name: '광안리', lat: 35.153222, lng: 129.118222 },
    { name: '서면', lat: 35.157222, lng: 129.059222 },
    { name: '남포동', lat: 35.097222, lng: 129.034222 },
    { name: '송정', lat: 35.180222, lng: 129.198222 },
    { name: '동래', lat: 35.205222, lng: 129.083222 },
    { name: '기장', lat: 35.244222, lng: 129.222222 },
    { name: '센텀시티', lat: 35.170833, lng: 129.130833 },
    { name: '태종대', lat: 35.051944, lng: 129.085833 },
    { name: '다대포', lat: 35.045833, lng: 128.9675 },
  ],
  '대구광역시': [
    { name: '동성로', lat: 35.869417, lng: 128.594111 },
    { name: '수성못', lat: 35.829222, lng: 128.610758 },
    { name: '앞산', lat: 35.819722, lng: 128.5825 },
    { name: '경북대', lat: 35.893222, lng: 128.613222 },
    { name: '계명대', lat: 35.853222, lng: 128.489222 },
    { name: '영남대', lat: 35.837222, lng: 128.755222 },
    { name: '팔공산', lat: 35.868056, lng: 128.690278 },
    { name: '청라언덕', lat: 35.864222, lng: 128.588222 },
    { name: '동촌유원지', lat: 35.885222, lng: 128.639222 },
  ],
  '인천광역시': [
    { name: '송도', lat: 37.3825, lng: 126.643611 },
    { name: '차이나타운', lat: 37.474167, lng: 126.616389 },
    { name: '월미도', lat: 37.484722, lng: 126.601111 },
    { name: '을왕리', lat: 37.448056, lng: 126.370278 },
    { name: '구월동', lat: 37.448889, lng: 126.701944 },
    { name: '부평', lat: 37.489722, lng: 126.724167 },
    { name: '영종도', lat: 37.506389, lng: 126.523611 },
    { name: '소래포구', lat: 37.400278, lng: 126.733611 },
  ],
  '광주광역시': [
    { name: '충장로', lat: 35.147222, lng: 126.919444 },
    { name: '상무지구', lat: 35.1525, lng: 126.848611 },
    { name: '금남로', lat: 35.150278, lng: 126.916389 },
    { name: '양림동', lat: 35.139722, lng: 126.923611 },
    { name: '동명동', lat: 35.144722, lng: 126.923611 },
    { name: '광주호수생태공원', lat: 35.174722, lng: 126.893611 },
    { name: '국립아시아문화전당', lat: 35.166389, lng: 126.918611 },
  ],
  '대전광역시': [
    { name: '둔산동', lat: 36.351111, lng: 127.384167 },
    { name: '은행동', lat: 36.3275, lng: 127.4275 },
    { name: '유성온천', lat: 36.3625, lng: 127.344167 },
    { name: '대전역', lat: 36.3325, lng: 127.434167 },
    { name: '한밭수목원', lat: 36.366389, lng: 127.386111 },
    { name: '계룡산', lat: 36.346389, lng: 127.2275 },
    { name: '대청호', lat: 36.4025, lng: 127.480278 },
  ],
  '울산광역시': [
    { name: '삼산동', lat: 35.538611, lng: 129.311389 },
    { name: '태화강', lat: 35.534722, lng: 129.311111 },
    { name: '울산대공원', lat: 35.535278, lng: 129.259167 },
    { name: '장생포', lat: 35.495278, lng: 129.3725 },
    { name: '진하해수욕장', lat: 35.3725, lng: 129.3425 },
    { name: '간절곶', lat: 35.358611, lng: 129.343611 },
  ],
  '세종특별자치시': [
    { name: '세종호수공원', lat: 36.504167, lng: 127.259167 },
    { name: '고운동', lat: 36.5275, lng: 127.259167 },
    { name: '도담동', lat: 36.5075, lng: 127.259167 },
    { name: '아름동', lat: 36.5175, lng: 127.259167 },
    { name: '조치원', lat: 36.601111, lng: 127.2975 },
    { name: '정부세종청사', lat: 36.480278, lng: 127.289167 },
  ],
};

const FOODS = ['한식', '양식', '일식', '중식', '아시안'];
const API_URL = 'http://localhost:8000/recommend-course';
const LABELS = ['데이트장소', '식당', '카페'];

const App: React.FC = () => {
  const [step, setStep] = useState<'select' | 'result'>('select');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedHotplace, setSelectedHotplace] = useState<{ name: string; lat: number; lng: number } | null>(null);
  const [selectedFood, setSelectedFood] = useState('');
  const [course, setCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  const canStart = selectedRegion && selectedHotplace && selectedFood;

  const fetchCourse = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: selectedHotplace?.lat,
          lng: selectedHotplace?.lng,
          food: selectedFood,
          retryKey: Math.random(),
        }),
      });
      if (!res.ok) throw new Error('추천 결과를 불러오지 못했습니다.');
      const data = await res.json();
      setCourse(data);
      setStep('result');
    } catch (e: any) {
      setError(e.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    fetchCourse();
  };

  const handleRetry = () => {
    setRetryKey(k => k + 1);
    fetchCourse();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffe0e9 100%)',
      fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
      padding: 0,
      margin: 0,
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 16px' }}>
        <h1 style={{ textAlign: 'center', color: '#ff6f91', fontWeight: 900, fontSize: '2.8rem', letterSpacing: '-2px', marginBottom: 32, textShadow: '0 2px 8px #ffd6e0' }}>
          With You
        </h1>
        {step === 'select' ? (
          <div style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 4px 24px rgba(255,182,185,0.12)',
            padding: 32,
            marginBottom: 32,
          }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 700, marginRight: 12, fontSize: '1.1rem', color: '#ff6f91' }}>지역 선택</label>
              <select
                value={selectedRegion}
                onChange={e => {
                  setSelectedRegion(e.target.value);
                  setSelectedHotplace(null);
                }}
                style={{ padding: '10px 18px', borderRadius: '12px', border: '1.5px solid #ffb6b9', fontSize: '1.1rem', background: '#fff' }}
              >
                <option value="">지역을 선택하세요</option>
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            {selectedRegion && HOTPLACES[selectedRegion] && (
              <div style={{ marginBottom: 28, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {HOTPLACES[selectedRegion].map(hot => (
                  <button
                    key={hot.name}
                    onClick={() => setSelectedHotplace(hot)}
                    style={{
                      background: selectedHotplace?.name === hot.name ? 'linear-gradient(90deg, #ffb6b9 0%, #ff6f91 100%)' : '#f8fafc',
                      color: selectedHotplace?.name === hot.name ? '#fff' : '#ff6f91',
                      border: selectedHotplace?.name === hot.name ? 'none' : '1.5px solid #ffb6b9',
                      borderRadius: '16px',
                      padding: '10px 22px',
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      boxShadow: selectedHotplace?.name === hot.name ? '0 2px 8px #ffd6e0' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {hot.name}
                  </button>
                ))}
              </div>
            )}
            <FoodSelector foods={FOODS} selectedFood={selectedFood} onSelect={setSelectedFood} />
            <div style={{ height: 24 }} />
            <StartButton onClick={handleStart} disabled={!canStart || loading} />
            {loading && <div style={{ marginTop: 24, color: '#888', textAlign: 'center', fontWeight: 500 }}>추천 코스를 불러오는 중...</div>}
            {error && <div style={{ marginTop: 24, color: '#ff6f91', textAlign: 'center', fontWeight: 700 }}>{error}</div>}
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 4px 24px rgba(255,182,185,0.12)',
            padding: 32,
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'center',
          }}>
            {course.map((place, idx) => (
              <div key={place.name} style={{
                width: '100%',
                maxWidth: 420,
                background: 'linear-gradient(90deg, #ffe0e9 0%, #fff 100%)',
                borderRadius: 18,
                boxShadow: '0 2px 12px #ffe0e9',
                padding: '24px 18px',
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#ff6f91', marginBottom: 8, letterSpacing: '-1px' }}>{LABELS[idx]}</div>
                <div style={{ fontWeight: 900, fontSize: '2.1rem', marginBottom: 10, color: '#222', textShadow: '0 2px 8px #ffd6e0' }}>
                  {place.mapUrl ? (
                    <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4a90e2', textDecoration: 'none' }}>
                      {place.name}
                    </a>
                  ) : (
                    place.name
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleRetry}
              style={{
                background: 'linear-gradient(90deg, #ffb6b9 0%, #ff6f91 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '14px 36px',
                fontSize: '1.15rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 12,
                boxShadow: '0 2px 8px #ffd6e0',
                transition: 'all 0.2s',
              }}
            >
              마음에 들지 않아요
            </button>
            {loading && <div style={{ marginTop: 24, color: '#888', textAlign: 'center', fontWeight: 500 }}>추천 코스를 불러오는 중...</div>}
            {error && <div style={{ marginTop: 24, color: '#ff6f91', textAlign: 'center', fontWeight: 700 }}>{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
